export default function Login() {
  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <div className="bg-white rounded-[2rem] p-8 shadow-2xl w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#0f172a] text-[#f4b41a] flex items-center justify-center text-4xl">
            🎓
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#0f172a]">
            Perfect Foundation Academy
          </h1>

          <p className="mt-3 text-[#64748b]">
            Login to access your school portal.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
          />

          <select className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]">
            <option>Select login type</option>
            <option>Student</option>
            <option>Parent</option>
            <option>Teacher</option>
            <option>Accountant</option>
            <option>Admin</option>
          </select>

          <a
            href="/portal"
            className="text-center bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black shadow-lg"
          >
            Login to Portal
          </a>

          <a
            href="/accountant"
            className="text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black shadow-lg"
          >
            Accountant Demo
          </a>
        </div>

        <a
          href="/"
          className="block mt-8 text-center text-[#64748b] font-bold"
        >
          ← Back to website
        </a>
      </div>
    </main>
  );
}
