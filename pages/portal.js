import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Portal() {
  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState([]);
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

    const { data: feesData, error: feesError } = await supabase
      .from("fees")
      .select("*")
      .eq("student_id", selectedStudent.id)
      .order("created_at", { ascending: false });

    if (feesError) {
      setMessage(feesError.message);
      return;
    }

    setFees(feesData || []);
    setMessage("");
  }

  const latestFee = fees?.[0] || null;

  const totalFee = latestFee ? Number(latestFee.total_fee || 0) : 0;
  const paidAmount = latestFee ? Number(latestFee.paid_amount || 0) : 0;
  const balance = latestFee ? Number(latestFee.balance || 0) : 0;
  const feeStatus = latestFee?.status || "No Record";

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

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Class</p>
                <h3 className="mt-3 text-3xl font-black">
                  {student.class || "Not assigned"}
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Fee Status</p>
                <h3 className="mt-3 text-3xl font-black text-[#d9a514] capitalize">
                  {feeStatus}
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Attendance</p>
                <h3 className="mt-3 text-3xl font-black text-green-600">
                  Coming Soon
                </h3>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-[2rem] p-8 shadow border border-gray-100">
                <h3 className="text-2xl font-black">Fee Balance</h3>

                {latestFee ? (
                  <div className="mt-6 space-y-4 text-lg">
                    <div className="flex justify-between border-b pb-3">
                      <span>Total Fees</span>
                      <span className="font-bold">
                        GHS {totalFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Amount Paid</span>
                      <span className="font-bold text-green-600">
                        GHS {paidAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Balance</span>
                      <span className="font-bold text-red-600">
                        GHS {balance.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="font-bold text-[#d9a514] capitalize">
                        {feeStatus}
                      </span>
                    </div>

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
                <h3 className="text-2xl font-black">Latest Results</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span>English</span>
                    <span className="font-bold">Coming Soon</span>
                  </div>

                  <div className="flex justify-between border-b pb-3">
                    <span>Mathematics</span>
                    <span className="font-bold">Coming Soon</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Science</span>
                    <span className="font-bold">Coming Soon</span>
                  </div>
                </div>

                <p className="mt-6 text-sm text-[#64748b]">
                  Exam and class test results will appear here after teachers or
                  admin upload them.
                </p>
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

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <h3 className="text-xl font-black">Announcements</h3>
                <p className="mt-3 text-[#64748b]">
                  School announcements will appear here.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <h3 className="text-xl font-black">Academic Calendar</h3>
                <p className="mt-3 text-[#64748b]">
                  Term dates and school events will appear here.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <h3 className="text-xl font-black">Report Card</h3>
                <p className="mt-3 text-[#64748b]">
                  Downloadable report cards will be added later.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
