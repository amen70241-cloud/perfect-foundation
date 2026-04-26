import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Portal() {
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    setStudents(data || []);
    setStudent(data?.[0] || null);
  }

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
        {!student ? (
          <div className="bg-white rounded-3xl p-8 shadow border">
            <h2 className="text-2xl font-black">No student found</h2>
            <p className="mt-3 text-[#64748b]">
              Add a student from the admin dashboard first.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 shadow-xl">
              <p className="text-[#f4b41a] font-bold tracking-[0.3em]">
                WELCOME
              </p>
              <h2 className="mt-4 text-4xl font-black">{student.full_name}</h2>
              <p className="mt-3 text-gray-300">
                {student.class} • Perfect Foundation Academy
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Class</p>
                <h3 className="mt-3 text-3xl font-black">{student.class}</h3>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Attendance</p>
                <h3 className="mt-3 text-3xl font-black text-green-600">
                  Coming Soon
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
                <p className="text-[#64748b] font-bold">Fee Status</p>
                <h3 className="mt-3 text-3xl font-black text-[#d9a514]">
                  Coming Soon
                </h3>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border border-gray-100">
              <h3 className="text-2xl font-black">All Registered Students</h3>

              <div className="mt-6 space-y-3">
                {students.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <span className="font-bold">{s.full_name}</span>
                    <span className="text-[#64748b]">{s.class}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
