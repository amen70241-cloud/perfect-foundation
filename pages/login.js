import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("admin@pfa.com");
  const [password, setPassword] = useState("Admin12345");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful. Redirecting...");
    window.location.href = "/portal";
  }

  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-[2rem] p-8 shadow-2xl w-full max-w-md"
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="text-center bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-center text-sm font-bold text-[#0f172a]">
              {message}
            </p>
          )}
        </div>

        <a
          href="/"
          className="block mt-8 text-center text-[#64748b] font-bold"
        >
          ← Back to website
        </a>
      </form>
    </main>
  );
}
