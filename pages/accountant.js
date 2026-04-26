import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Accountant() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [term, setTerm] = useState("Term 1");
  const [totalFee, setTotalFee] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("full_name", { ascending: true });

    const { data: feesData } = await supabase
      .from("fees")
      .select("*, students(full_name, class)")
      .order("created_at", { ascending: false });

    setStudents(studentsData || []);
    setFees(feesData || []);
  }

  async function saveFee(e) {
    e.preventDefault();
    setMessage("");

    const total = Number(totalFee);
    const paid = Number(paidAmount);
    const status = paid >= total ? "paid" : paid > 0 ? "partial" : "unpaid";

    const { error } = await supabase.from("fees").insert([
      {
        student_id: studentId,
        term,
        total_fee: total,
        paid_amount: paid,
        status,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setStudentId("");
    setTerm("Term 1");
    setTotalFee("");
    setPaidAmount("");
    setMessage("Fee record saved successfully.");
    loadData();
  }

  const totalExpected = fees.reduce(
    (sum, item) => sum + Number(item.total_fee || 0),
    0
  );

  const totalPaid = fees.reduce(
    (sum, item) => sum + Number(item.paid_amount || 0),
    0
  );

  const outstanding = totalExpected - totalPaid;

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Financial Accountant</h1>
            <p className="text-gray-300">Fees & Payments Dashboard</p>
          </div>

          <a href="/" className="font-bold text-[#f4b41a]">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Expected Fees</p>
            <h3 className="mt-3 text-2xl font-black">
              GHS {totalExpected.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Collected</p>
            <h3 className="mt-3 text-2xl font-black text-green-600">
              GHS {totalPaid.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Outstanding</p>
            <h3 className="mt-3 text-2xl font-black text-red-600">
              GHS {outstanding.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Students</p>
            <h3 className="mt-3 text-2xl font-black">{students.length}</h3>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={saveFee}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-3xl font-black">Update Student Fees</h2>
            <p className="mt-2 text-[#64748b]">
              Record fees received offline. Parents/students will only view.
            </p>

            <div className="mt-6 grid gap-4">
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option value="">Select student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} — {student.class}
                  </option>
                ))}
              </select>

              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>

              <input
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
                placeholder="Total fee amount"
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                placeholder="Amount paid"
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <button
                type="submit"
                className="bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black"
              >
                Save Fee Record
              </button>

              {message && (
                <p className="text-sm font-bold text-[#0f172a]">{message}</p>
              )}
            </div>
          </form>

          <div className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-3xl font-black">Recent Fee Records</h2>

            <div className="mt-6 space-y-4">
              {fees.map((fee) => (
                <div key={fee.id} className="border-b pb-4">
                  <p className="font-black">
                    {fee.students?.full_name || "Unknown student"}
                  </p>
                  <p className="text-sm text-[#64748b]">
                    {fee.students?.class} • {fee.term}
                  </p>
                  <p className="mt-2 text-sm">
                    Total: GHS {Number(fee.total_fee).toLocaleString()} | Paid:
                    GHS {Number(fee.paid_amount).toLocaleString()} | Balance:
                    GHS {Number(fee.balance).toLocaleString()}
                  </p>
                  <p className="mt-1 font-bold text-[#d9a514]">
                    Status: {fee.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
