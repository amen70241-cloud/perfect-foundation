import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const classes = [
  "Creche",
  "Nursery",
  "Kindergarten",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JHS 1",
  "JHS 2",
  "JHS 3",
];

export default function Teacher() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("Primary 1");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("present");

  const [term, setTerm] = useState("Term 1");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [remarks, setRemarks] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("full_name", { ascending: true });

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*, students(full_name)")
      .order("created_at", { ascending: false });

    const { data: resultsData } = await supabase
      .from("results")
      .select("*, students(full_name)")
      .order("created_at", { ascending: false });

    setStudents(studentsData || []);
    setAttendance(attendanceData || []);
    setResults(resultsData || []);
  }

  const classStudents = students.filter(
    (student) => student.class === selectedClass
  );

  function calculateGrade(value) {
    const mark = Number(value);

    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    return "E";
  }

  async function saveAttendance(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("attendance").insert([
      {
        student_id: selectedStudent,
        class: selectedClass,
        status: attendanceStatus,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSelectedStudent("");
    setAttendanceStatus("present");
    setMessage("Attendance saved successfully.");
    loadData();
  }

  async function saveResult(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("results").insert([
      {
        student_id: selectedStudent,
        class: selectedClass,
        term,
        subject,
        score: Number(score),
        grade: calculateGrade(score),
        teacher_remarks: remarks,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSubject("");
    setScore("");
    setRemarks("");
    setMessage("Result saved successfully.");
    loadData();
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Teacher Portal</h1>
            <p className="text-gray-300">Perfect Foundation Academy</p>
          </div>

          <a href="/" className="text-[#f4b41a] font-bold">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {message && (
          <div className="mb-6 bg-white rounded-2xl p-4 shadow font-bold">
            {message}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-4">
          <Stat title="Assigned Class" value={selectedClass} />
          <Stat title="Students" value={classStudents.length} />
          <Stat title="Attendance Records" value={attendance.length} />
          <Stat title="Results Added" value={results.length} />
        </div>

        <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border">
          <h2 className="text-2xl font-black">Select Class</h2>

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedStudent("");
            }}
            className="mt-5 w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
          >
            {classes.map((className) => (
              <option key={className}>{className}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={saveAttendance}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Mark Attendance</h2>
            <p className="mt-2 text-[#64748b]">
              Mark students as present, absent, or late.
            </p>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option value="">Select student</option>
                {classStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name}
                  </option>
                ))}
              </select>

              <select
                value={attendanceStatus}
                onChange={(e) => setAttendanceStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>

              <button className="bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black">
                Save Attendance
              </button>
            </div>
          </form>

          <form
            onSubmit={saveResult}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Enter Results</h2>
            <p className="mt-2 text-[#64748b]">
              Add class test or exam scores and teacher remarks.
            </p>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              >
                <option value="">Select student</option>
                {classStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name}
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
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject e.g. English"
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Score e.g. 85"
                required
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Teacher remarks"
                rows="3"
                className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
              />

              <button className="bg-[#0f172a] text-white py-4 rounded-2xl font-black">
                Save Result
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Recent Attendance</h2>

            <div className="mt-6 space-y-3">
              {attendance.slice(0, 8).map((item) => (
                <div key={item.id} className="border-b pb-3">
                  <p className="font-bold">
                    {item.students?.full_name || "Student"}
                  </p>
                  <p className="text-sm text-[#64748b]">
                    {item.class} • {item.status} • {item.attendance_date}
                  </p>
                </div>
              ))}

              {attendance.length === 0 && (
                <p className="text-[#64748b]">No attendance records yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Recent Results</h2>

            <div className="mt-6 space-y-3">
              {results.slice(0, 8).map((item) => (
                <div key={item.id} className="border-b pb-3">
                  <p className="font-bold">
                    {item.students?.full_name || "Student"}
                  </p>
                  <p className="text-sm text-[#64748b]">
                    {item.subject} • {item.score}% • Grade {item.grade}
                  </p>
                </div>
              ))}

              {results.length === 0 && (
                <p className="text-[#64748b]">No results added yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border">
      <p className="text-[#64748b] font-bold">{title}</p>
      <h3 className="mt-3 text-2xl font-black">{value}</h3>
    </div>
  );
}
