export default function Accountant() {
  const students = [
    {
      name: "Nana Kwame Mensah",
      className: "Primary 4",
      total: "GHS 2,500",
      paid: "GHS 1,800",
      balance: "GHS 700",
      status: "Partial",
    },
    {
      name: "Ama Serwaa Boateng",
      className: "JHS 1",
      total: "GHS 3,200",
      paid: "GHS 3,200",
      balance: "GHS 0",
      status: "Paid",
    },
    {
      name: "Kofi Asante",
      className: "KG 2",
      total: "GHS 1,800",
      paid: "GHS 500",
      balance: "GHS 1,300",
      status: "Unpaid",
    },
  ];

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
            <h3 className="mt-3 text-3xl font-black">GHS 42,000</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Collected</p>
            <h3 className="mt-3 text-3xl font-black text-green-600">
              GHS 31,500
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Outstanding</p>
            <h3 className="mt-3 text-3xl font-black text-red-600">
              GHS 10,500
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Students</p>
            <h3 className="mt-3 text-3xl font-black">120</h3>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">Student Fee Records</h2>
              <p className="mt-2 text-[#64748b]">
                Accountant updates fees manually. Parents/students only view.
              </p>
            </div>

            <button className="bg-[#f4b41a] text-[#0f172a] px-6 py-4 rounded-2xl font-black">
              + Add Payment
            </button>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-4">Student</th>
                  <th>Class</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.name} className="border-b">
                    <td className="py-4 font-bold">{student.name}</td>
                    <td>{student.className}</td>
                    <td>{student.total}</td>
                    <td className="text-green-600 font-bold">{student.paid}</td>
                    <td className="text-red-600 font-bold">{student.balance}</td>
                    <td>
                      <span className="bg-[#f4b41a]/20 text-[#9a6b00] px-4 py-2 rounded-full font-bold">
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
