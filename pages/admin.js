import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState(0);
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: teachersData } = await supabase.from("teachers").select("*");

    setStudents(studentsData || []);
    setTeachers(teachersData?.length || 0);
  }

  async function addStudent(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("students").insert([
      {
        full_name: fullName,
        class: className,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setFullName("");
    setClassName("");
    setMessage("Student added successfully.");
    fetchData();
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
            <h3 className="mt-3 text-3xl font-black">{students.length}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Teachers</p>
            <h3 className="mt-3 text-3xl font-black">{teachers}</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Classes</p>
            <h3 className="mt-3 text-3xl font-black">14</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow border">
            <p className="text-[#64748b] font-bold">Admissions</p>
            <h3 className="mt-3 text-3xl font-black">--</h3>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={addStudent}
            className="bg-white rounded-[2rem] p-8 shadow border border-gray-100"
          >
            <h2 className="text-2xl font-black">Add Student</h2>
            <p className="mt-2 text-[#64748b]">
              Register a new student into the system.
            </p>

            <div className="mt-6 grid gap-4">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Student full name"
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option value="">Select class</option>
                <option>Creche</option>
                <option>Nursery</option>
                <option>Kindergarten</option>
                <option>Primary 1</option>
                <option>Primary 2</option>
                <option>Primary 3</option>
                <option>Primary 4</option>
                <option>Primary 5</option>
                <option>Primary 6</option>
                <option>JHS 1</option>
                <option>JHS 2</option>
                <option>JHS 3</option>
              </select>

              <button
                type="submit"
                className="bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black"
              >
                Add Student
              </button>

              {message && (
                <p className="text-sm font-bold text-[#0f172a]">{message}</p>
              )}
            </div>
          </form>

          <div className="bg-white rounded-[2rem] p-8 shadow border border-gray-100">
            <h2 className="text-2xl font-black">Student List</h2>

            <div className="mt-6 space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between border-b pb-3"
                >
                  <span className="font-bold">{student.full_name}</span>
                  <span className="text-[#64748b]">{student.class}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
