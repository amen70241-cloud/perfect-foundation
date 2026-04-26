import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Portal() {
  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState([]);
  const [results, setResults] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("Loading portal...");

  useEffect(() => {
    loadPortalData();
  }, []);

  async function loadPortalData() {
    setMessage("Loading portal...");

    const { data: studentsData, error: studentsError } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (studentsError) {
      setMessage(studentsError.message);
      return;
    }

    const selectedStudent = studentsData?.[0] || null;
    setStudent(selectedStudent);

    if (!selectedStudent) {
      setMessage("No student record found.");
      return;
    }

    const { data: feesData } = await supabase
      .from("fees")
      .select("*")
      .eq("student_id", selectedStudent.id)
      .order("created_at", { ascending: false });

    const { data: resultsData } = await supabase
      .from("results")
      .select("*")
      .eq("student_id", selectedStudent.id)
      .eq("published", true)
      .order("created_at", { ascending: false });

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*")
      .eq("student_id", selectedStudent.id)
      .order("created_at", { ascending: false });

    setFees(feesData || []);
    setResults(resultsData || []);
    setAttendance(attendanceData || []);
    setMessage("");
  }

  const latestFee = fees?.[0] || null;

  const totalFee = latestFee ? Number(latestFee.total_fee || 0) : 0;
  const paidAmount = latestFee ? Number(latestFee.paid_amount || 0) : 0;
  const balance = latestFee ? Number(latestFee.balance || 0) : 0;
  const feeStatus = latestFee?.status || "No Record";

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce((sum, item) => sum + Number(item.score || 0), 0) /
            results.length
        )
      : null;

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Student / Parent Portal</h1>
            <p className="text-[#64748b]">Perfect Foundation Academy</p>
          </div>

          <div className="flex gap-4">
            <a href="/" className="font-bold text-[#0f172a]">
              Home
            </a>

            <a href="/login" className="font-bold text-red-600">
              Logout
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {message && (
          <div className="bg-white rounded-3xl p-8 shadow border">
            <h2 className="text-2xl font-black">Portal Message</h2>
            <p className="mt-3 text-[#64748b]">{message}</p>
          </div>
        )}

        {!message && student && (
          <>
            <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 shadow-xl">
              <p className="text-[#f4b41a] font-bold tracking-[0.3em]">
                WELCOME
              </p>

              <h2 className="mt-4 text-4xl font-black">
                {student.full_name}
              </h2>

              <p className="mt-3 text-gray-300">
                {student.class} • Perfect Foundation Academy
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-4">
              <Stat title="Class" value={student.class || "Not assigned"} />
              <Stat title="Fee Status" value={feeStatus} highlight />
              <Stat
                title="Average Score"
                value={averageScore ? `${averageScore}%` : "No Results"}
              />
              <Stat title="Attendance Records" value={attendance.length} />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-[2rem] p-8 shadow border border-gray-100">
                <h3 className="text-2xl font-black">Fee Balance</h3>

                {latestFee ? (
                  <div className="mt-6 space-y-4 text-lg">
                    <Row label="Total Fees" value={`GHS ${totalFee.toLocaleString()}`} />
                    <Row
                      label="Amount Paid"
                      value={`GHS ${paidAmount.toLocaleString()}`}
                      green
                    />
                    <Row
                      label="Balance"
                      value={`GHS ${balance.toLocaleString()}`}
                      red
                    />
                    <Row label="Status" value={feeStatus} gold />

                    <p className="mt-6 text-sm text-[#64748b]">
                      Fees are updated by the school accountant. Online payment
                      is not enabled yet.
                    </p>
                  </div>
                ) : (
                  <p className="mt-6 text-[#64748b]">
                    No fee record has been added for this student yet.
                  </p>
                )}
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow border border-gray-100">
                <h3 className="text-2xl font-black">Published Results</h3>

                {results.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {results.map((item) => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between gap-4">
                          <span className="font-bold">{item.subject}</span>
                          <span className="font-black">
                            {item.score}% • Grade {item.grade}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[#64748b]">
                          {item.term} • {item.result_type}
                        </p>
                        {item.teacher_remarks && (
                          <p className="mt-2 text-sm text-[#64748b]">
                            Remark: {item.teacher_remarks}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 text-[#64748b]">
                    No published results available yet.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border border-gray-100">
              <h3 className="text-2xl font-black">Payment History</h3>

              {fees.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b text-[#64748b]">
                        <th className="py-4 pr-4">Term</th>
                        <th className="py-4 pr-4">Total Fee</th>
                        <th className="py-4 pr-4">Paid</th>
                        <th className="py-4 pr-4">Balance</th>
                        <th className="py-4 pr-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {fees.map((fee) => (
                        <tr key={fee.id} className="border-b">
                          <td className="py-4 pr-4">{fee.term}</td>
                          <td className="py-4 pr-4">
                            GHS {Number(fee.total_fee || 0).toLocaleString()}
                          </td>
                          <td className="py-4 pr-4 text-green-600 font-bold">
                            GHS {Number(fee.paid_amount || 0).toLocaleString()}
                          </td>
                          <td className="py-4 pr-4 text-red-600 font-bold">
                            GHS {Number(fee.balance || 0).toLocaleString()}
                          </td>
                          <td className="py-4 pr-4">
                            <span className="bg-[#f4b41a]/20 text-[#9a6b00] px-4 py-2 rounded-full font-bold capitalize">
                              {fee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-6 text-[#64748b]">
                  No payment history available yet.
                </p>
              )}
            </div>

            <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border border-gray-100">
              <h3 className="text-2xl font-black">Attendance History</h3>

              {attendance.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {attendance.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-3">
                      <span>{item.attendance_date}</span>
                      <span className="font-bold capitalize">{item.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-[#64748b]">
                  No attendance record available yet.
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <InfoCard title="Announcements" text="School announcements will appear here." />
              <InfoCard title="Academic Calendar" text="Term dates and school events will appear here." />
              <InfoCard title="Report Card" text="Downloadable report cards will be added later." />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Stat({ title, value, highlight }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
      <p className="text-[#64748b] font-bold">{title}</p>
      <h3
        className={`mt-3 text-2xl font-black ${
          highlight ? "text-[#d9a514] capitalize" : ""
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

function Row({ label, value, green, red, gold }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span>{label}</span>
      <span
        className={`font-bold ${
          green
            ? "text-green-600"
            : red
            ? "text-red-600"
            : gold
            ? "text-[#d9a514] capitalize"
            : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-[#64748b]">{text}</p>
    </div>
  );
}
