export default function Admin() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Admin Dashboard</h1>
            <p className="text-gray-300">Perfect Foundation Academy</p>
          </div>

          <a href="/" className="text-[#f4b41a] font-bold">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Students</p>
            <h3 className="mt-3 text-3xl font-black">420</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Teachers</p>
            <h3 className="mt-3 text-3xl font-black">28</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Classes</p>
            <h3 className="mt-3 text-3xl font-black">14</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Admissions</p>
            <h3 className="mt-3 text-3xl font-black">36</h3>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            "Manage Students",
            "Manage Staff",
            "Manage Classes",
            "Admissions Enquiries",
            "Announcements",
            "Events & Gallery",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl p-8 shadow border border-gray-100"
            >
              <h3 className="text-2xl font-black">{item}</h3>
              <p className="mt-3 text-[#64748b]">
                Admin module placeholder. We will connect this to Supabase next.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
