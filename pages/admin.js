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

const promotionMap = {
  Creche: "Nursery",
  Nursery: "Kindergarten",
  Kindergarten: "Primary 1",
  "Primary 1": "Primary 2",
  "Primary 2": "Primary 3",
  "Primary 3": "Primary 4",
  "Primary 4": "Primary 5",
  "Primary 5": "Primary 6",
  "Primary 6": "JHS 1",
  "JHS 1": "JHS 2",
  "JHS 2": "JHS 3",
  "JHS 3": "Graduated",
};
export default function Admin() {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [calendar, setCalendar] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [studentSurname, setStudentSurname] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentOtherNames, setStudentOtherNames] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [staffName, setStaffName] = useState("");
  const [staffSurname, setStaffSurname] = useState("");
  const [staffFirstName, setStaffFirstName] = useState("");
  const [staffOtherNames, setStaffOtherNames] = useState("");
  const [staffGender, setStaffGender] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffClass, setStaffClass] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [editingStaffId, setEditingStaffId] = useState(null);

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");

  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("");
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  const [calendarTitle, setCalendarTitle] = useState("");
  const [calendarDate, setCalendarDate] = useState("");
  const [calendarDescription, setCalendarDescription] = useState("");

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("class", { ascending: true })
      .order("surname", { ascending: true });

    const { data: staffData } = await supabase
      .from("staff")
      .select("*")
      .order("surname", { ascending: false });

    const { data: announcementsData } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: enquiriesData } = await supabase
      .from("admission_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: galleryData } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: calendarData } = await supabase
      .from("academic_calendar")
      .select("*")
      .order("event_date", { ascending: true });

    setStudents(studentsData || []);
    setStaff(staffData || []);
    setAnnouncements(announcementsData || []);
    setEnquiries(enquiriesData || []);
    setGallery(galleryData || []);
    setCalendar(calendarData || []);
  }

  async function saveStudent(e) {
  e.preventDefault();
  setMessage("");
    const generatedStudentName = `${studentSurname} ${studentFirstName} ${studentOtherNames}`.trim();
  if (editingStudentId) {
    const { error } = await supabase
      .from("students")
      .update({
  surname: studentSurname,
  first_name: studentFirstName,
  other_names: studentOtherNames,
  full_name: generatedStudentName,
  class: studentClass,
  gender: studentGender,
})
      .eq("id", editingStudentId);

    if (error) return setMessage(error.message);

    setMessage("Student updated successfully.");
  } else {
    const response = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  surname: studentSurname,
  first_name: studentFirstName,
  other_names: studentOtherNames,
  full_name: generatedStudentName,
        role: "student",
        class_name: studentClass,
        gender: studentGender,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Could not create student login.");
      return;
    }

    setMessage(
      `Student added. Login email: ${result.email} | Password: ${result.password}`
    );
  }

  setStudentName("");
setStudentSurname("");
setStudentFirstName("");
setStudentOtherNames("");
setStudentClass("");
setStudentGender("");
  setEditingStudentId(null);
  loadData();
}
async function promoteClass(currentClass) {
  const nextClass = promotionMap[currentClass];

  if (!nextClass) {
    setMessage("No next class found.");
    return;
  }

  const confirmPromotion = window.confirm(
    `Promote all students from ${currentClass} to ${nextClass}?`
  );

  if (!confirmPromotion) return;

  const { error } = await supabase
    .from("students")
    .update({ class: nextClass })
    .eq("class", currentClass);

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage(`Students promoted from ${currentClass} to ${nextClass}.`);
  loadData();
}
  function editStudent(student) {
  setEditingStudentId(student.id);
  setStudentName(student.full_name || "");
  setStudentSurname(student.surname || "");
  setStudentFirstName(student.first_name || "");
  setStudentOtherNames(student.other_names || "");
  setStudentClass(student.class || "");
  setStudentGender(student.gender || "");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  async function promoteStudent(student) {
  const nextClass = promotionMap[student.class];

  if (!nextClass) {
    setMessage("No next class found for this student.");
    return;
  }

  const confirmPromotion = window.confirm(
    `Promote ${`${student.surname || ""} ${student.first_name || ""} ${student.other_names || ""}`.trim()} from ${student.class} to ${nextClass}?`
  );

  if (!confirmPromotion) return;

  const { error } = await supabase
    .from("students")
    .update({ class: nextClass })
    .eq("id", student.id);

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage(`${student.full_name} promoted to ${nextClass}.`);
  loadData();
}

async function deleteStudent(student) {
  const confirmDelete = window.confirm(
    `Delete ${student.surname || ""} ${student.first_name || ""} ${student.other_names || ""}? This may also remove linked records.`
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", student.id);

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage(`${student.surname || ""} ${student.first_name || ""} ${student.other_names || ""} deleted successfully.`);
  loadData();
}
  async function saveStaff(e) {
  e.preventDefault();
  setMessage("");
  const generatedStaffName = `${staffSurname} ${staffFirstName} ${staffOtherNames}`.trim();
  const roleMap = {
    Admin: "admin",
    Teacher: "teacher",
    Accountant: "accountant",
    Headteacher: "teacher",
  };

  const authRole = roleMap[staffRole] || "teacher";

  if (editingStaffId) {
    const { error } = await supabase
      .from("staff")
      .update({
  surname: staffSurname,
  first_name: staffFirstName,
  other_names: staffOtherNames,
  full_name: generatedStaffName,
  role: staffRole,
  assigned_class: staffClass,
  phone: staffPhone,
  gender: staffGender,
})
      .eq("id", editingStaffId);

    if (error) return setMessage(error.message);

    setMessage("Staff updated successfully.");
  } else {
    const response = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  surname: staffSurname,
  first_name: staffFirstName,
  other_names: staffOtherNames,
  full_name: generatedStaffName,
  gender: staffGender,
  role: authRole,
  staff_role: staffRole,
  assigned_class: staffClass,
  phone: staffPhone,
}),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Could not create staff login.");
      return;
    }

    setMessage(
      `Staff added. Login email: ${result.email} | Password: ${result.password}`
    );
  }

  setStaffName("");
  setStaffSurname("");
  setStaffFirstName("");
  setStaffOtherNames("");
  setStaffRole("");
  setStaffClass("");
  setStaffPhone("");
  setStaffGender("");
  setEditingStaffId(null);
  loadData();
}
  function editStaff(member) {
  setEditingStaffId(member.id);
  setStaffName(member.full_name || "");
  setStaffSurname(member.surname || "");
  setStaffFirstName(member.first_name || "");
  setStaffOtherNames(member.other_names || "");
  setStaffRole(member.role || "");
  setStaffClass(member.assigned_class || "");
  setStaffPhone(member.phone || "");
  setStaffGender(member.gender || "");
}

  async function createAnnouncement(e) {
    e.preventDefault();

    const { error } = await supabase.from("announcements").insert([
      {
        title: announcementTitle,
        message: announcementMessage,
      },
    ]);

    if (error) return setMessage(error.message);

    setAnnouncementTitle("");
    setAnnouncementMessage("");
    setMessage("Announcement created.");
    loadData();
  }

 async function addGalleryImage(e) {
  e.preventDefault();
  setMessage("");

  if (editingGalleryId) {
    const { error } = await supabase
      .from("gallery_images")
      .update({
        title: galleryTitle,
        image_url: galleryUrl,
        category: galleryCategory,
      })
      .eq("id", editingGalleryId);

    if (error) return setMessage(error.message);

    setMessage("Gallery photo updated.");
  } else {
    const { error } = await supabase.from("gallery_images").insert([
      {
        title: galleryTitle,
        image_url: galleryUrl,
        category: galleryCategory,
      },
    ]);

    if (error) return setMessage(error.message);

    setMessage("Gallery photo added.");
  }

  setGalleryTitle("");
  setGalleryUrl("");
  setGalleryCategory("");
  setEditingGalleryId(null);
  loadData();
}
 function editGalleryImage(item) {
  setEditingGalleryId(item.id);
  setGalleryTitle(item.title || "");
  setGalleryUrl(item.image_url || "");
  setGalleryCategory(item.category || "");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteGalleryImage(item) {
  const confirmDelete = window.confirm(
    `Delete gallery photo "${item.title || "Untitled"}"?`
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", item.id);

  if (error) return setMessage(error.message);

  setMessage("Gallery photo deleted.");
  loadData();
}
  async function addCalendarEvent(e) {
    e.preventDefault();

    const { error } = await supabase.from("academic_calendar").insert([
      {
        title: calendarTitle,
        event_date: calendarDate,
        description: calendarDescription,
      },
    ]);

    if (error) return setMessage(error.message);

    setCalendarTitle("");
    setCalendarDate("");
    setCalendarDescription("");
    setMessage("Calendar event added.");
    loadData();
  }

  const filteredStudents = students.filter((student) => {
  const studentDisplayName = `${student.surname || ""} ${student.first_name || ""} ${student.other_names || ""}`.trim();

  const matchesSearch = studentDisplayName
  .toLowerCase()
  .includes(search.toLowerCase());

    const matchesClass =
      classFilter === "all" || student.class === classFilter;

    return matchesSearch && matchesClass;
  });

  const groupedStudents = classes
    .map((className) => ({
      className,
      students: filteredStudents.filter((s) => s.class === className),
    }))
    .filter((group) => group.students.length > 0);

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
  <header className="bg-[#0f172a] text-white px-6 py-6">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-black">Admin Dashboard</h1>
        <p className="text-gray-300">Perfect Foundation Academy</p>
      </div>

      <div className="flex gap-4">
        <a href="/website-manager" className="text-[#f4b41a] font-bold">
          Website Manager
        </a>

        <a href="/" className="text-[#f4b41a] font-bold">
          Home
        </a>
      </div>
    </div>
  </header>
      <section className="max-w-6xl mx-auto px-6 py-10">
        {message && (
          <div className="mb-6 bg-white border rounded-2xl p-4 font-bold">
            {message}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-5">
          <Stat title="Students" value={students.length} />
          <Stat title="Staff" value={staff.length} />
          <Stat title="Classes" value={classes.length} />
          <Stat title="Announcements" value={announcements.length} />
          <Stat title="Enquiries" value={enquiries.length} />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={saveStudent}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">
              {editingStudentId ? "Edit Student" : "Add Student"}
            </h2>

            <div className="mt-6 grid gap-4">
              <input
  value={studentSurname}
  onChange={(e) => setStudentSurname(e.target.value)}
  placeholder="Surname"
  required
  className="input"
/>

<input
  value={studentFirstName}
  onChange={(e) => setStudentFirstName(e.target.value)}
  placeholder="First name"
  required
  className="input"
/>

<input
  value={studentOtherNames}
  onChange={(e) => setStudentOtherNames(e.target.value)}
  placeholder="Other names optional"
  className="input"
/>
              <select
  value={studentGender}
  onChange={(e) => setStudentGender(e.target.value)}
  className="w-full border border-gray-300 rounded-xl p-3 mb-3"
>
  <option value="">Select gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
                className="input"
              >
                <option value="">Assign student to class</option>
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <button className="btn-gold">
                {editingStudentId ? "Update Student" : "Add Student"}
              </button>
            </div>
          </form>

          <form
            onSubmit={saveStaff}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">
              {editingStaffId ? "Edit Staff" : "Add Staff"}
            </h2>

            <div className="mt-6 grid gap-4">
             <input
  value={staffSurname}
  onChange={(e) => setStaffSurname(e.target.value)}
  placeholder="Surname"
  required
  className="input"
/>

<input
  value={staffFirstName}
  onChange={(e) => setStaffFirstName(e.target.value)}
  placeholder="First name"
  required
  className="input"
/>

<input
  value={staffOtherNames}
  onChange={(e) => setStaffOtherNames(e.target.value)}
  placeholder="Other names optional"
  className="input"
/>

              <select
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value)}
                required
                className="input"
              >
                <option value="">Select staff role</option>
                <option>Admin</option>
                <option>Teacher</option>
                <option>Accountant</option>
                <option>Headteacher</option>
              </select>

              <select
                value={staffClass}
                onChange={(e) => setStaffClass(e.target.value)}
                className="input"
              >
                <option value="">Assign class</option>
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input
                value={staffPhone}
                onChange={(e) => setStaffPhone(e.target.value)}
                placeholder="Phone number"
                className="input"
              />
              <select
  value={staffGender}
  onChange={(e) => setStaffGender(e.target.value)}
  required
  className="input"
>
  <option value="">Select gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
              <button className="btn-gold">
                {editingStaffId ? "Update Staff" : "Add Staff"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 bg-white rounded-[2rem] p-8 shadow border">
          <h2 className="text-2xl font-black">Students by Class</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name"
              className="input"
            />

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mt-8 grid gap-6">
            {groupedStudents.map((group) => (
              <div key={group.className} className="border rounded-3xl p-6">
               <div className="flex justify-between items-center gap-4">
  <h3 className="text-xl font-black text-[#d9a514]">
    {group.className}
  </h3>

  <button
    type="button"
    onClick={() => promoteClass(group.className)}
    className="bg-[#0f172a] text-white px-4 py-2 rounded-xl text-sm font-black"
  >
    Promote to {promotionMap[group.className] || "Next Class"}
  </button>
</div>

                <div className="mt-4 space-y-3">
                  {group.students.map((student) => (
                    <div
                      key={student.id}
                      className="flex justify-between items-start border-b pb-3"
                    >
                      <div>
  {`${student.surname || ""} ${student.first_name || ""} ${student.other_names || ""}`.trim() || student.full_name}
  <p className="text-xs text-gray-500">
    {student.class} • {student.gender || "Not set"}
  </p>
</div>
                      <div className="flex gap-3">
  <button
    type="button"
    onClick={() => editStudent(student)}
    className="text-sm font-bold text-[#0f172a]"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => promoteStudent(student)}
    className="text-sm font-bold text-green-600"
  >
    Promote
  </button>

  <button
    type="button"
    onClick={() => deleteStudent(student)}
    className="text-sm font-bold text-red-600"
  >
    Delete
  </button>
</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {groupedStudents.length === 0 && (
              <p className="text-[#64748b]">No students found.</p>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={createAnnouncement}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Create Announcement</h2>

            <div className="mt-6 grid gap-4">
              <input
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Announcement title"
                required
                className="input"
              />

              <textarea
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                placeholder="Announcement message"
                required
                rows="4"
                className="input"
              />

              <button className="btn-dark">Create Announcement</button>
            </div>
          </form>
         <div className="mt-8">
  <h3 className="text-lg font-black text-[#0f172a] mb-4">
    Gallery Photos
  </h3>

  {gallery.length === 0 && (
    <p className="text-[#64748b]">No gallery photos added yet.</p>
  )}

  <div className="grid gap-4 md:grid-cols-2">
    {gallery.map((item) => (
      <div
        key={item.id}
        className="border rounded-2xl p-3 bg-white"
      >
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title || "Gallery photo"}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        )}

        <p className="font-bold text-[#0f172a]">
          {item.title || "Untitled"}
        </p>

        <p className="text-sm text-[#64748b]">
          {item.category || "No category"}
        </p>

        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={() => editGalleryImage(item)}
            className="text-sm font-bold text-[#0f172a]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deleteGalleryImage(item)}
            className="text-sm font-bold text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
          <form
            onSubmit={addGalleryImage}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Upload Gallery Photo</h2>
            <p className="mt-2 text-[#64748b]">
              Paste an image URL for now. Real file upload can come later.
            </p>

            <div className="mt-6 grid gap-4">
              <input
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
                placeholder="Photo title"
                required
                className="input"
              />

              <input
                value={galleryUrl}
                onChange={(e) => setGalleryUrl(e.target.value)}
                placeholder="Image URL"
                required
                className="input"
              />
             <select
  value={galleryCategory}
  onChange={(e) => setGalleryCategory(e.target.value)}
  required
  className="input"
>
  <option value="">Select Gallery Category</option>
  <option value="Early Years">Early Years</option>
  <option value="Primary Class">Primary Class</option>
  <option value="Caring Teachers">Caring Teachers</option>
  <option value="Morning Assembly">Morning Assembly</option>
  <option value="Graduation Ceremony">Graduation Ceremony</option>
  <option value="Sports Day">Sports Day</option>
  <option value="Culture Day">Culture Day</option>
  <option value="Speech and Prize Giving Day">Speech and Prize Giving Day</option>
  <option value="Career Day">Career Day</option>
  <option value="Faith Activities">Faith Activities</option>
  <option value="Classroom Life">Classroom Life</option>
  <option value="Educational Trips">Educational Trips</option>
  <option value="PTA / Parent Engagement">PTA / Parent Engagement</option>
</select>
              <button className="btn-dark">{editingGalleryId ? "Update Gallery Photo" : "Add Gallery Photo"}</button>
            </div>
          </form>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={addCalendarEvent}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Upload Academic Calendar</h2>

            <div className="mt-6 grid gap-4">
              <input
                value={calendarTitle}
                onChange={(e) => setCalendarTitle(e.target.value)}
                placeholder="Event title"
                required
                className="input"
              />

              <input
                type="date"
                value={calendarDate}
                onChange={(e) => setCalendarDate(e.target.value)}
                required
                className="input"
              />

              <textarea
                value={calendarDescription}
                onChange={(e) => setCalendarDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                className="input"
              />

              <button className="btn-dark">Add Calendar Event</button>
            </div>
          </form>

        <div className="bg-white rounded-[2rem] p-8 shadow border">
  <h2 className="text-2xl font-black">Admissions Enquiries</h2>

  <p className="mt-2 text-[#64748b]">
    New admission enquiries submitted from the public website.
  </p>

  <div className="mt-6 space-y-4">
    {enquiries.length === 0 && (
      <p className="text-[#64748b]">No enquiries yet.</p>
    )}

    {enquiries.map((item) => (
      <div key={item.id} className="border-b pb-4">
        <p className="font-black text-lg">{item.child_name}</p>
        <p className="text-sm text-[#64748b]">
          Applying for: {item.child_class || "Not selected"}
        </p>
        <p><span className="font-bold">Parent:</span> {item.parent_name}</p>
        <p><span className="font-bold">Phone:</span> {item.parent_phone}</p>

        {item.parent_email && (
          <p><span className="font-bold">Email:</span> {item.parent_email}</p>
        )}

        {item.message && (
          <p><span className="font-bold">Message:</span> {item.message}</p>
        )}
      </div>
    ))}
  </div>
</div>

<div className="mt-10 grid gap-8 md:grid-cols-3">
  <List title="Staff List" items={staff} editFn={editStaff} />
  <SimpleList title="Announcements" items={announcements} />
  <SimpleList title="Calendar Events" items={calendar} />
</div>

</div>

</section>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1rem;
          outline: none;
        }

        .input:focus {
          border-color: #f4b41a;
        }

        .btn-gold {
          background: #f4b41a;
          color: #0f172a;
          padding: 1rem;
          border-radius: 1rem;
          font-weight: 900;
        }

        .btn-dark {
          background: #0f172a;
          color: white;
          padding: 1rem;
          border-radius: 1rem;
          font-weight: 900;
        }
      `}</style>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border">
      <p className="text-[#64748b] font-bold">{title}</p>
      <h3 className="mt-3 text-3xl font-black">{value}</h3>
    </div>
  );
}

function List({ title, items, editFn }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow border">
      <h3 className="text-xl font-black">{title}</h3>

      <div className="mt-5 space-y-3">
        {items.length === 0 && <p className="text-[#64748b]">No records yet.</p>}

        {items.map((item) => (
          <div key={item.id} className="border-b pb-3">
            <p className="font-bold">{item.full_name}</p>
            <p className="text-sm text-[#64748b]">
              {item.role} {item.assigned_class ? `• ${item.assigned_class}` : ""}
            </p>
            <button
              onClick={() => editFn(item)}
              className="mt-2 text-sm font-bold text-[#d9a514]"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleList({ title, items }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow border">
      <h3 className="text-xl font-black">{title}</h3>

      <div className="mt-5 space-y-3">
        {items.length === 0 && <p className="text-[#64748b]">No records yet.</p>}

        {items.map((item) => (
          <div key={item.id} className="border-b pb-3">
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-[#64748b]">
              {item.message || item.description || item.event_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
