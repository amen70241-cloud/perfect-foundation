export default function Portal() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Student Portal</h1>
            <p className="text-[#64748b]">Perfect Foundation Academy</p>
          </div>

          <a href="/" className="font-bold text-[#0f172a]">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 shadow-xl">
          <p className="text-[#f4b41a] font-bold tracking-[0.3em]">
            WELCOME
          </p>
          <h2 className="mt-4 text-4xl font-black">
            Nana Kwame Mensah
          </h2>
          <p className="mt-3 text-gray-300">
            Primary 4 • 2026 Academic Year
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <p className="text-[#64748b] font-bold">Class</p>
            <h3 className="mt-3 text-3xl font-black">Primary 4</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <p className="text-[#64748b] font-bold">Attendance</p>
            <h3 className="mt-3 text-3xl font-black text-green-600">96%</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <p className="text-[#64748b] font-bold">Fee Status</p>
            <h3 className="mt-3 text-3xl font-black text-[#d9a514]">
              Partial
            </h3>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-3xl p-8 shadow border border-gray-100">
            <h3 className="text-2xl font-black">Fee Balance</h3>

            <div className="mt-6 space-y-4 text-lg">
              <div className="flex justify-between border-b pb-3">
                <span>Total Fees</span>
                <span className="font-bold">GHS 2,500</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Amount Paid</span>
                <span className="font-bold text-green-600">GHS 1,800</span>
              </div>

              <div className="flex justify-between">
                <span>Balance</span>
                <span className="font-bold text-red-600">GHS 700</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-[#64748b]">
              Fees are updated by the school accountant. Online payment is not
              enabled yet.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow border border-gray-100">
            <h3 className="text-2xl font-black">Latest Results</h3>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span>English</span>
                <span className="font-bold">82%</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Mathematics</span>
                <span className="font-bold">78%</span>
              </div>

              <div className="flex justify-between">
                <span>Science</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl p-8 shadow border border-gray-100">
          <h3 className="text-2xl font-black">Announcements</h3>
          <p className="mt-4 text-[#64748b] text-lg">
            PTA meeting comes off next Friday. Parents are kindly encouraged to attend.
          </p>
        </div>
      </section>
    </main>
  );
}
