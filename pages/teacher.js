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
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("Primary 1");
  const [teacherName, setTeacherName] = useState("");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("present");

  const [term, setTerm] = useState("Term 1");
  const [resultType, setResultType] = useState("Exam");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [remarks, setRemarks] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, [selectedClass]);

  useEffect(() => {
    loadSubjects();
    setSelectedStudent("");
    setSubject("");
  }, [selectedClass]);

  async function loadData() {
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("full_name", { ascending: true });

    const { data: staffData } = await supabase
      .from("staff")
      .select("*")
      .eq("role", "Teacher")
      .eq("assigned_class", selectedClass)
      .limit(1);

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*, students(full_name)")
      .order("created_at", { ascending: false });

    const { data: resultsData } = await supabase
      .from("results")
      .select("*, students(full_name)")
      .order("created_at", { ascending: false });

    setStudents(studentsData || []);
    setTeacherName(staffData?.[0]?.full_name || "");
    setAttendance(attendanceData || []);
    setResults(resultsData || []);
  }

  async function loadSubjects() {
    const { data, error } = await supabase
      .from("class_subjects")
      .select("*")
      .eq("class", selectedClass)
      .order("subject", { ascending: true });

    if (error) {
      setSubjects([]);
      return;
    }

    setSubjects(data || []);
  }

  const classStudents = students.filter(
    (student) => student.class === selectedClass
  );

  const classResults = results.filter(
    (item) => item.class === selectedClass && item.term === term
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
        result_type: resultType,
        subject,
        score: Number(score),
        grade: calculateGrade(score),
        teacher_remarks: remarks,
        published: false,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSubject("");
    setScore("");
    setRemarks("");
    setMessage("Result saved as draft. Click Publish Results when ready.");
    loadData();
  }

  async function publishResults() {
    setMessage("");

    const { error } = await supabase
      .from("results")
      .update({ published: true })
      .eq("class", selectedClass)
      .eq("term", term);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Results published for ${selectedClass} - ${term}.`);
    loadData();
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Teacher Portal</h1>
            <p className="text-gray-300">Perfect Foundation Academy</p>

            {teacherName && (
              <p className="mt-2 text-[#f4b41a] font-bold">
                {teacherName}
              </p>
            )}
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
          <Stat title="Selected Class" value={selectedClass} />
          <Stat title="Teacher" value={teacherName || "Not assigned"} />
          <Stat title="Students" value={classStudents.length} />
          <Stat title="Results Drafts" value={classResults.length} />
        </div>

        <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border">
          <h2 className="text-2xl font-black">Class & Term</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
            >
              {classes.map((className) => (
                <option key={className}>{className}</option>
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

            <select
              value={resultType}
              onChange={(e) => setResultType(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#f4b41a]"
            >
              <option>Exam</option>
              <option>Class Test</option>
              <option>Mid-Term Test</option>
              <option>End of Term Exam</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form onSubmit={saveAttendance} className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Mark Attendance</h2>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4"
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
                className="w-full border border-gray-200 rounded-2xl p-4"
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

          <form onSubmit={saveResult} className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Enter Results</h2>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4"
              >
                <option value="">Select student</option>
                {classStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name}
                  </option>
                ))}
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4"
              >
                <option value="">Select subject</option>
                {subjects.map((item) => (
                  <option key={item.id} value={item.subject}>
                    {item.subject}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Score e.g. 85"
                required
                className="w-full border border-gray-200 rounded-2xl p-4"
              />

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Teacher remarks"
                rows="3"
                className="w-full border border-gray-200 rounded-2xl p-4"
              />

              <button className="bg-[#0f172a] text-white py-4 rounded-2xl font-black">
                Save Result as Draft
              </button>

              <button
                type="button"
                onClick={publishResults}
                className="bg-green-600 text-white py-4 rounded-2xl font-black"
              >
                Publish Results for {selectedClass} - {term}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-[2rem] p-8 shadow border">
          <h2 className="text-2xl font-black">Results for {selectedClass}</h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-[#64748b]">
                  <th className="py-4 pr-4">Student</th>
                  <th className="py-4 pr-4">Subject</th>
                  <th className="py-4 pr-4">Score</th>
                  <th className="py-4 pr-4">Grade</th>
                  <th className="py-4 pr-4">Type</th>
                  <th className="py-4 pr-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {classResults.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 pr-4 font-bold">
                      {item.students?.full_name || "Student"}
                    </td>
                    <td className="py-4 pr-4">{item.subject}</td>
                    <td className="py-4 pr-4">{item.score}%</td>
                    <td className="py-4 pr-4">{item.grade}</td>
                    <td className="py-4 pr-4">{item.result_type}</td>
                    <td className="py-4 pr-4">
                      {item.published ? "Published" : "Draft"}
                    </td>
                  </tr>
                ))}

                {classResults.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-6 text-[#64748b]">
                      No results entered for this class and term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Class Students</h2>

          {classStudents.length === 0 ? (
            <p className="text-gray-500">No students found</p>
          ) : (
            classStudents.map((student) => (
              <div key={student.id} className="border-b py-2">
                <p className="font-bold">{student.full_name}</p>
                <p className="text-xs text-gray-500">
                  {student.gender || "Not set"}
                </p>
              </div>
            ))
          )}
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