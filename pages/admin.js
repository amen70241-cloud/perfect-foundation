import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: studentsData } = await supabase.from("students").select("*");
    const { data: teachersData } = await supabase.from("teachers").select("*");

    setStudents(studentsData?.length || 0);
    setTeachers(teachersData?.length || 0);
  }

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
            <h3 className="mt-3 text-3xl font-black">{students}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Teachers</p>
            <h3 className="mt-3 text-3xl font-black">{teachers}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Classes</p>
            <h3 className="mt-3 text-3xl font-black">--</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Admissions</p>
            <h3 className="mt-3 text-3xl font-black">--</h3>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-black mb-4">Recent Students</h2>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <StudentList />
          </div>
        </div>
      </section>
    </main>
  );
}

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    setStudents(data || []);
  }

  return (
    <div className="space-y-3">
      {students.map((s) => (
        <div
          key={s.id}
          className="flex justify-between border-b py-2 text-sm"
        >
          <span className="font-bold">{s.full_name}</span>
          <span className="text-gray-500">{s.class}</span>
        </div>
      ))}
    </div>
  );
}
