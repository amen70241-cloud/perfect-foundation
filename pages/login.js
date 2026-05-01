import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("admin@pfa.com");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function chooseLogin(type) {
    setLoginType(type);

    if (type === "admin") {
      setEmail("admin@pfa.com");
    } else if (type === "student") {
      setEmail("student@pfa.com");
    } else if (type === "accountant") {
      setEmail("accountant@pfa.com");
    } else if (type === "teacher") {
      setEmail("teacher@pfa.com");
    }

    setPassword("");
    setMessage("");
  }

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

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profileData) {
      setMessage("Login successful, but no role profile found.");
      return;
    }

    if (profileData.role === "admin") {
      window.location.href = "/admin";
    } else if (profileData.role === "accountant") {
      window.location.href = "/accountant";
    } else if (profileData.role === "teacher") {
      window.location.href = "/teacher";
    } else {
      window.location.href = "/portal";
    }
  }

  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 py-10">
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
            Select your portal and login.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => chooseLogin("admin")}
            className={`py-4 rounded-2xl font-black border ${
              loginType === "admin"
                ? "bg-[#f4b41a] text-[#0f172a] border-[#f4b41a]"
                : "bg-white text-[#0f172a] border-gray-200"
            }`}
          >
            Admin Login
          </button>

          <button
            type="button"
            onClick={() => chooseLogin("student")}
            className={`py-4 rounded-2xl font-black border ${
              loginType === "student"
                ? "bg-[#f4b41a] text-[#0f172a] border-[#f4b41a]"
                : "bg-white text-[#0f172a] border-gray-200"
            }`}
          >
            Student / Parent Login
          </button>

          <button
            type="button"
            onClick={() => chooseLogin("accountant")}
            className={`py-4 rounded-2xl font-black border ${
              loginType === "accountant"
                ? "bg-[#f4b41a] text-[#0f172a] border-[#f4b41a]"
                : "bg-white text-[#0f172a] border-gray-200"
            }`}
          >
            Accountant Login
          </button>

          <button
            type="button"
            onClick={() => chooseLogin("teacher")}
            className={`py-4 rounded-2xl font-black border ${
              loginType === "teacher"
                ? "bg-[#f4b41a] text-[#0f172a] border-[#f4b41a]"
                : "bg-white text-[#0f172a] border-gray-200"
            }`}
          >
            Teacher Login
          </button>
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-2xl p-4 pr-14 outline-none focus:border-[#f4b41a]"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          {message && (
            <p className="text-center text-sm font-bold text-red-600">
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