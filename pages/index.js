import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [websiteSettings, setWebsiteSettings] = useState(null);
const [websiteDownloads, setWebsiteDownloads] = useState([]);
const [websiteEvents, setWebsiteEvents] = useState([]);
const [admissionForm, setAdmissionForm] = useState({
  child_name: "",
  child_class: "",
  parent_name: "",
  parent_phone: "",
  parent_email: "",
  message: "",
});

const [admissionMessage, setAdmissionMessage] = useState("");
useEffect(() => {
  loadWebsiteContent();
}, []);

async function loadWebsiteContent() {
  const { data: downloadsData } = await supabase
    .from("website_downloads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: eventsData } = await supabase
    .from("website_events")
    .select("*")
    .order("event_date", { ascending: false })
    .limit(6);
  const { data: settingsData } = await supabase
  .from("website_settings")
  .select("*")
  .limit(1)
  .single();

setWebsiteSettings(settingsData || null);
  setWebsiteDownloads(downloadsData || []);
  setWebsiteEvents(eventsData || []);
}
  const whatsapp =
    "https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy";
  const schoolLogo = websiteSettings?.school_logo_url;
const schoolMotto =
  websiteSettings?.school_motto ||
  "Building Excellence, Discipline, Faith, and a Strong Academic Foundation";

const contactPhone = websiteSettings?.contact_phone || "+233244986221";
const whatsappNumber = websiteSettings?.whatsapp_number || "+233244986221";
const schoolEmail = websiteSettings?.email || "info@pfa.edu";
const schoolLocation =
  websiteSettings?.location || "Oshuman, Top Radio, Accra, Ghana";

const cleanWhatsApp = whatsappNumber.replace(/\D/g, "");
const whatsappLink = `https://wa.me/${cleanWhatsApp}?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20make%20an%20enquiry.`;
 async function submitAdmissionForm(e) {
  e.preventDefault();
  setAdmissionMessage("Submitting...");

  const { error } = await supabase.from("admission_enquiries").insert([
    {
      child_name: admissionForm.child_name,
      child_class: admissionForm.child_class,
      parent_name: admissionForm.parent_name,
      parent_phone: admissionForm.parent_phone,
      parent_email: admissionForm.parent_email,
      message: admissionForm.message,
      status: "New",
    },
  ]);

  if (error) {
    setAdmissionMessage(error.message);
    return;
  }

  setAdmissionMessage("Admission enquiry submitted successfully. The school will contact you.");
  setAdmissionForm({
    child_name: "",
    child_class: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    message: "",
  });
}
  return (
    <main className="bg-[#f8f6ef] text-[#1e293b]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8f6ef]/95 backdrop-blur border-b border-gray-200 nav-shadow transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-[#f4b41a] flex items-center justify-center text-2xl shadow-lg overflow-hidden">
  {schoolLogo ? (
    <img
      src={schoolLogo}
      alt="Perfect Foundation Academy logo"
      className="w-full h-full object-cover"
    />
  ) : (
    "🎓"
  )}
</div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight text-[#0f172a]">
                Perfect Foundation
              </h1>
              <p className="tracking-[0.35em] text-[#d9a514] text-sm font-bold">
                ACADEMY
              </p>
            </div>
          </div>

          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-4xl font-bold text-[#0f172a]"
>
  ☰
</button>
        </div>
      </header>
{menuOpen && (
  <div className="fixed top-24 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 w-72 fade-up">
    <div className="grid gap-4 text-lg font-bold text-[#0f172a]">
      <a href="#programmes" onClick={() => setMenuOpen(false)}>
        Programmes
      </a>

      <a href="#admissions" onClick={() => setMenuOpen(false)}>
        Admissions
      </a>

      <a href="/#downloads" onClick={() => setMenuOpen(false)}>
        Downloads
      </a>

      <a href="/#gallery" onClick={() => setMenuOpen(false)}>
        Gallery
      </a>

      <a href="#contact" onClick={() => setMenuOpen(false)}>
        Contact
      </a>

      <a href="/login" onClick={() => setMenuOpen(false)}>
        Portal Login
      </a>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setMenuOpen(false)}
        className="bg-[#20b957] text-white text-center py-3 rounded-2xl"
      >
        WhatsApp Us
      </a>
    </div>
  </div>
)}
      {/* HERO */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.88),rgba(15,23,42,.78)),url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200')",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 text-white">
          <div className="inline-flex items-center gap-3 border border-[#f4b41a] rounded-full px-6 py-3 text-[#f4b41a] font-bold tracking-widest bg-white/5">
            ● A GHANAIAN PRIVATE SCHOOL
          </div>

          <h2 className="fade-up mt-12 text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Perfect Foundation <br />
            <span className="text-[#f4b41a]">Academy</span>
          </h2>

          <p className="fade-up delay-1 mt-10 text-2xl md:text-3xl italic leading-snug max-w-3xl">
            {schoolMotto}
          </p>

          <p className="mt-8 text-lg md:text-xl leading-9 text-gray-200 max-w-3xl">
            Welcome to a school where every child is nurtured to grow in
            knowledge, character and faith — from Creche through Junior High
            School.
          </p>

          <div className="fade-up delay-2 mt-12 grid gap-5 max-w-xl">
            <a
              href="#admissions"
              className="bg-[#f4b41a] text-[#0f172a] text-center py-5 rounded-2xl text-xl md:text-2xl font-extrabold shadow-xl hover:shadow-2xl transition"
            >
              Enquire Now →
            </a>

            <a
              href="#programmes"
              className="border-2 border-white text-white text-center py-5 rounded-2xl text-xl md:text-2xl font-bold hover:bg-white hover:text-[#0f172a] transition"
            >
              📖 View Our Programmes
            </a>

            <a
              href={whatsappLink}
              className="bg-[#20b957] text-white text-center py-5 rounded-2xl text-xl md:text-2xl font-bold shadow-xl hover:shadow-2xl transition"
            >
              💬 WhatsApp Us
            </a>
          </div>

          <div className="fade-up delay-3 mt-16 grid grid-cols-3 gap-6 max-w-2xl">
            <div className="border-l-4 border-[#f4b41a] pl-5">
              <h3 className="text-3xl md:text-4xl font-black text-[#f4b41a]">
                5
              </h3>
              <p className="text-gray-200">Levels</p>
            </div>

            <div className="border-l-4 border-[#f4b41a] pl-5">
              <h3 className="text-3xl md:text-4xl font-black text-[#f4b41a]">
                100%
              </h3>
              <p className="text-gray-200">Caring Staff</p>
            </div>

            <div className="border-l-4 border-[#f4b41a] pl-5">
              <h3 className="text-3xl md:text-4xl font-black text-[#f4b41a]">
                Faith
              </h3>
              <p className="text-gray-200">Based Values</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <p className="tracking-[0.4em] text-[#d9a514] font-bold">
              ABOUT OUR SCHOOL
            </p>

            <h2 className="mt-8 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#0f172a]">
              A foundation built on knowledge, character & faith.
            </h2>

            <p className="mt-8 text-xl md:text-2xl leading-10 text-[#64748b]">
              Perfect Foundation Academy is a Ghanaian private school committed
              to nurturing children academically, morally and spiritually. We
              serve learners from Creche, Nursery, Kindergarten, Primary and
              Junior High School.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-[#0f172a] text-[#f4b41a] rounded-2xl flex items-center justify-center text-3xl">
                🏅
              </div>
              <h3 className="mt-8 text-3xl font-black text-[#0f172a]">
                Our Mission
              </h3>
              <p className="mt-5 text-lg leading-8 text-[#64748b]">
                To provide quality, faith-based education that nurtures
                disciplined, confident and academically strong children prepared
                to excel in life and serve their communities with integrity.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-[#f4b41a] text-[#0f172a] rounded-2xl flex items-center justify-center text-3xl">
                ✨
              </div>
              <h3 className="mt-8 text-3xl font-black text-[#0f172a]">
                Our Vision
              </h3>
              <p className="mt-5 text-lg leading-8 text-[#64748b]">
                To raise responsible future leaders with strong values,
                creativity, discipline and academic excellence.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-[#0f172a] text-[#f4b41a] rounded-2xl flex items-center justify-center text-3xl">
                🛡️
              </div>
              <h3 className="mt-8 text-3xl font-black text-[#0f172a]">
                Our Values
              </h3>
              <p className="mt-5 text-lg leading-8 text-[#64748b]">
                Excellence, discipline, faith, integrity, care, respect,
                creativity and academic growth.
              </p>
            </div>
          </div>

          <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </section>
{/* CORE VALUES */}
<section id="values" className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto text-center">
    <p className="tracking-[0.4em] text-[#d9a514] font-bold">
      OUR CORE VALUES
    </p>

    <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
      {[
        ["🎖️", "Excellence"],
        ["🛡️", "Discipline"],
        ["✝️", "Faith"],
        ["✨", "Integrity"],
        ["🤝", "Care"],
        ["📖", "Academic Growth"],
      ].map(([icon, title]) => (
        <div
          key={title}
          className="bg-white rounded-[2rem] p-8 min-h-[190px] flex flex-col items-center justify-center shadow border border-gray-100"
        >
          <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center text-3xl">
            {icon}
          </div>
          <h3 className="mt-6 text-2xl font-black text-[#0f172a]">
            {title}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>
{/* WHY CHOOSE US */}
<section id="why-choose-us" className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto">
    <p className="tracking-[0.4em] text-[#d9a514] font-bold">
      WHY CHOOSE US
    </p>

    <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-[#0f172a] max-w-4xl">
      Six reasons parents trust Perfect Foundation Academy.
    </h2>

    <div className="mt-14 grid gap-8 md:grid-cols-2">
      {[
        ["🏆", "Strong Academic Foundation", "A rigorous curriculum designed to give every child a firm head-start for life."],
        ["👥", "Caring, Qualified Teachers", "Teachers who know each child by name and nurture their unique potential."],
        ["🛡️", "Discipline & Character Formation", "We shape respectful, responsible and confident young Ghanaians."],
        ["✝️", "Faith-Based Moral Values", "Christian principles woven into daily learning and assemblies."],
        ["🏠", "Safe & Supportive Environment", "Secure facilities and a warm community where every child belongs."],
        ["💬", "Parent-Friendly Communication", "We partner closely with parents — open, prompt and transparent."],
      ].map(([icon, title, text]) => (
        <div
          key={title}
          className="bg-white rounded-[2rem] p-10 shadow border border-gray-100"
        >
          <div className="w-20 h-20 rounded-3xl bg-[#f4b41a]/10 text-[#d9a514] flex items-center justify-center text-3xl">
            {icon}
          </div>

          <h3 className="mt-10 text-3xl font-black text-[#0f172a]">
            {title}
          </h3>

          <p className="mt-5 text-xl leading-9 text-[#64748b]">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* FOUNDER SECTION */}
      <section className="scroll-fade px-6 py-24 bg-[#0f172a] text-white">
        <div className="max-w-6xl mx-auto grid gap-14 md:grid-cols-2 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#f4b41a] rounded-full blur-3xl opacity-30"></div>

            <div className="relative bg-white/10 border border-white/10 rounded-[2rem] p-4 shadow-2xl">
              <img
                src="/images/founder.jpg"
                alt="Reverend Pastor Emmanuel Brightmoore Nugah and Mrs. Susana Nugah"
                className="w-full h-[460px] object-cover rounded-[1.5rem]"
              />

              <div className="absolute -bottom-7 left-6 right-6 bg-[#f4b41a] text-[#0f172a] rounded-2xl p-5 shadow-xl">
                <p className="text-sm font-bold tracking-[0.25em]">
                  FOUNDER & DIRECTOR
                </p>
                <h3 className="mt-1 text-xl font-black">
                  Rev. Pastor Emmanuel Brightmoore Nugah
                </h3>
              </div>
            </div>
          </div>

          <div className="pt-10 md:pt-0">
            <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
              MEET OUR FOUNDER
            </p>

            <h2 className="mt-8 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Leadership rooted in education, faith and service.
            </h2>

            <p className="mt-8 text-xl leading-9 text-gray-300">
              Perfect Foundation Academy was founded by{" "}
              <span className="text-[#f4b41a] font-bold">
                Reverend Pastor Emmanuel Brightmoore Nugah
              </span>
              , a visionary educator and faith leader committed to building a
              strong academic and moral foundation for children.
            </p>

            <p className="mt-6 text-xl leading-9 text-gray-300">
              He is a Senior Lecturer at the University of Ghana, Legon —
              Theatre Arts Department, and the Founder of Ordained Betterlife
              Chapel Int’l Church.
            </p>

            <p className="mt-6 text-xl leading-9 text-gray-300">
              He serves alongside his wife,{" "}
              <span className="text-[#f4b41a] font-bold">Mrs. Susana Nugah</span>
              , whose warmth, care and support reflect the family-centered
              values of the academy.
            </p>

            <div className="mt-10 grid gap-5">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <p className="text-[#f4b41a] font-bold">🎓 Academic Leadership</p>
                <p className="mt-2 text-gray-300">
                  Senior Lecturer, University of Ghana, Legon — Theatre Arts
                  Department.
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <p className="text-[#f4b41a] font-bold">⛪ Faith & Service</p>
                <p className="mt-2 text-gray-300">
                  Founder, Ordained Betterlife Chapel Int’l Church.
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <p className="text-[#f4b41a] font-bold">💛 School Vision</p>
                <p className="mt-2 text-gray-300">
                  Raising disciplined, confident and academically strong children
                  with values for life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

           {/* PROGRAMMES */}
      <section id="programmes" className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="tracking-[0.4em] text-[#d9a514] font-bold">
              OUR PROGRAMMES
            </p>

            <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
              Learning pathways from Creche to JHS.
            </h2>

            <p className="mt-6 text-xl leading-8 text-[#64748b]">
              Perfect Foundation Academy supports every stage of a child’s
              development with care, structure, discipline and strong academic
              preparation.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                level: "Creche",
                age: "Early Years",
                icon: "🧸",
                text: "A safe, warm and caring environment for the youngest learners.",
              },
              {
                level: "Nursery",
                age: "Pre-School",
                icon: "🎨",
                text: "Play-based learning that builds speech, confidence and social skills.",
              },
              {
                level: "Kindergarten",
                age: "KG",
                icon: "✏️",
                text: "Early literacy, numeracy, creativity and preparation for primary school.",
              },
              {
                level: "Primary School",
                age: "Basic 1–6",
                icon: "📚",
                text: "Strong academic foundation with discipline, confidence and moral values.",
              },
              {
                level: "Junior High School",
                age: "JHS 1–3",
                icon: "🎓",
                text: "Focused preparation for BECE, leadership, responsibility and future success.",
              },
            ].map((item) => (
              <div
                key={item.level}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#0f172a] text-[#f4b41a] flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>

                  <span className="bg-[#f4b41a]/20 text-[#9a6b00] px-4 py-2 rounded-full text-sm font-bold">
                    {item.age}
                  </span>
                </div>

                <h3 className="mt-8 text-3xl font-black text-[#0f172a]">
                  {item.level}
                </h3>

                <p className="mt-5 text-lg leading-8 text-[#64748b]">
                  {item.text}
                </p>

                <div className="mt-8 h-1 w-20 bg-[#f4b41a] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
<section id="gallery" className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto">
    <div className="text-center">
      <p className="tracking-[0.4em] text-[#d9a514] font-bold">
        LIFE AT PFA
      </p>
      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#0f172a]">
        A glimpse into our school community
      </h2>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {websiteEvents.length === 0 && (
        <p className="text-gray-500">No gallery items added yet.</p>
      )}

      {websiteEvents.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-[2rem] overflow-hidden shadow border border-gray-100"
        >
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-[#0f172a] flex items-center justify-center text-[#f4b41a] text-5xl">
              🎓
            </div>
          )}

          <div className="p-6">
            <p className="text-[#d9a514] text-xs font-bold tracking-[0.2em] uppercase">
              {item.category}
            </p>

            <h3 className="mt-3 text-2xl font-black text-[#0f172a]">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-500">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* EVENTS */}
<section id="events" className="scroll-fade px-6 py-24 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center">
      <p className="tracking-[0.4em] text-[#d9a514] font-bold">
        EVENTS
      </p>
      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#0f172a]">
        Latest school events
      </h2>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {websiteEvents.length === 0 && (
        <p className="text-gray-500">No events added yet.</p>
      )}

      {websiteEvents.map((item) => (
        <div
          key={item.id}
          className="bg-[#f8f6ef] rounded-[2rem] p-8 shadow border border-gray-100"
        >
          <p className="text-[#d9a514] font-bold">
            {item.event_date || "Date coming soon"}
          </p>

          <h3 className="mt-3 text-2xl font-black text-[#0f172a]">
            {item.title}
          </h3>

          <p className="mt-3 text-gray-500">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ADMISSIONS */}
<section id="admissions" className="scroll-fade px-6 py-24 bg-[#0f172a] text-white">
  <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start">
    <div>
      <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
        ADMISSIONS
      </p>

      <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
        Join the Perfect Foundation Academy family.
      </h2>

      <p className="mt-8 text-xl leading-9 text-gray-300">
        Admissions are open for Creche, Nursery, Kindergarten, Primary and JHS.
        Our team is ready to guide you from your first enquiry to your child’s
        first day in class.
      </p>

      <div className="mt-10 grid gap-4">
        <a
          href="#admissions"
          className="bg-[#f4b41a] text-[#0f172a] text-center py-4 rounded-2xl font-black"
        >
          Start Admission Enquiry →
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#20b957] text-white text-center py-4 rounded-2xl font-black"
        >
          💬 Enquire on WhatsApp
        </a>
      </div>
    </div>

    <div className="bg-white text-[#0f172a] rounded-[2rem] p-8 shadow-2xl">
      <h3 className="text-3xl font-black">
        Admission Enquiry Form
      </h3>

      <p className="mt-3 text-[#64748b]">
        Fill this form and the school office will contact you.
      </p>

      {admissionMessage && (
        <p className="mt-4 font-bold text-[#d9a514]">
          {admissionMessage}
        </p>
      )}

      <form onSubmit={submitAdmissionForm} className="mt-8 grid gap-4">
        <input
          value={admissionForm.child_name}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              child_name: e.target.value,
            })
          }
          placeholder="Child's full name"
          required
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] placeholder:text-gray-400 focus:border-[#f4b41a]"
        />

        <select
          value={admissionForm.child_class}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              child_class: e.target.value,
            })
          }
          required
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] focus:border-[#f4b41a]"
        >
          <option value="">Select desired class</option>
          <option value="Creche">Creche</option>
          <option value="Nursery">Nursery</option>
          <option value="KG 1">KG 1</option>
          <option value="KG 2">KG 2</option>
          <option value="Primary 1">Primary 1</option>
          <option value="Primary 2">Primary 2</option>
          <option value="Primary 3">Primary 3</option>
          <option value="Primary 4">Primary 4</option>
          <option value="Primary 5">Primary 5</option>
          <option value="Primary 6">Primary 6</option>
          <option value="JHS 1">JHS 1</option>
          <option value="JHS 2">JHS 2</option>
          <option value="JHS 3">JHS 3</option>
        </select>

        <input
          value={admissionForm.parent_name}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              parent_name: e.target.value,
            })
          }
          placeholder="Parent / Guardian name"
          required
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] placeholder:text-gray-400 focus:border-[#f4b41a]"
        />

        <input
          value={admissionForm.parent_phone}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              parent_phone: e.target.value,
            })
          }
          placeholder="Parent phone / WhatsApp"
          required
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] placeholder:text-gray-400 focus:border-[#f4b41a]"
        />

        <input
          type="email"
          value={admissionForm.parent_email}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              parent_email: e.target.value,
            })
          }
          placeholder="Parent email optional"
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] placeholder:text-gray-400 focus:border-[#f4b41a]"
        />

        <textarea
          value={admissionForm.message}
          onChange={(e) =>
            setAdmissionForm({
              ...admissionForm,
              message: e.target.value,
            })
          }
          placeholder="Message / enquiry"
          rows="4"
          className="w-full border border-gray-200 rounded-2xl p-4 outline-none text-[#0f172a] placeholder:text-gray-400 focus:border-[#f4b41a]"
        />

        <button
          type="submit"
          className="bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black"
        >
          Submit Admission Enquiry
        </button>
      </form>
    </div>
  </div>
</section>
{/* EVENTS & ACHIEVEMENTS */}
<section className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto">
    <div className="text-center max-w-3xl mx-auto">
      <p className="tracking-[0.4em] text-[#d9a514] font-bold">
        EVENTS & ACHIEVEMENTS
      </p>

      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
        Celebrating learning, culture and excellence.
      </h2>

      <p className="mt-6 text-xl leading-8 text-[#64748b]">
        Perfect Foundation Academy celebrates every milestone — from graduation
        ceremonies to speech and prize giving, career day and culture day.
      </p>
    </div>

    <div className="mt-14 grid gap-8 md:grid-cols-3">
      {[
        {
          title: "Graduation Ceremonies",
          icon: "🎓",
          text: "A joyful celebration of pupils completing important academic stages with family, staff and invited guests.",
        },
        {
          title: "Speech & Prize Giving",
          icon: "🏆",
          text: "Recognising academic excellence, discipline, leadership, service, creativity and outstanding performance.",
        },
        {
          title: "Career & Culture Day",
          icon: "🌍",
          text: "Helping pupils appreciate culture, identity and future career paths through presentations and performances.",
        },
      ].map((event) => (
        <div
          key={event.title}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0f172a] text-[#f4b41a] flex items-center justify-center text-3xl">
            {event.icon}
          </div>

          <h3 className="mt-8 text-3xl font-black text-[#0f172a]">
            {event.title}
          </h3>

          <p className="mt-5 text-lg leading-8 text-[#64748b]">
            {event.text}
          </p>

          <div className="mt-8 h-1 w-20 bg-[#f4b41a] rounded-full" />
        </div>
      ))}
    </div>
  </div>
</section>
{/* DOWNLOADS & ACADEMIC CALENDAR */}
<section id="downloads" className="scroll-fade px-6 py-24 bg-[#0f172a] text-white">
  <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start">
    
    {/* LEFT SIDE */}
    <div>
      <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
        DOWNLOADS
      </p>

      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
        Important school documents.
      </h2>

      <p className="mt-6 text-xl leading-9 text-gray-300">
        Access admission forms, school prospectus and academic calendar for the term.
      </p>

      <div className="mt-10 grid gap-5">
        <a
          href="/downloads"
          className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition"
        >
          📄 Admission Form (PDF)
        </a>

        <a
          href="/downloads"
          className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition"
        >
          📘 School Prospectus
        </a>

        <a
          href="/downloads"
          className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition"
        >
          📅 Academic Calendar
        </a>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="bg-white rounded-[2rem] p-8 shadow-2xl text-[#0f172a]">
      <h3 className="text-3xl font-black tracking-tight">
        Academic Calendar Preview
      </h3>

      <div className="mt-8 grid gap-4">
        <div className="flex justify-between border-b pb-3">
          <span>Term Begins</span>
          <span className="font-bold">September 2026</span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Mid-Term Break</span>
          <span className="font-bold">October</span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Examinations</span>
          <span className="font-bold">December</span>
        </div>

        <div className="flex justify-between">
          <span>Vacation</span>
          <span className="font-bold">December</span>
        </div>
      </div>

      <a
        href="/downloads"
        className="mt-8 block text-center bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition"
      >
        Download Full Calendar
      </a>
    </div>
  </div>
</section>
{/* CONTACT + FOOTER */}
<section id="contact" className="scroll-fade px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start">
    <div>
      <p className="tracking-[0.4em] text-[#d9a514] font-bold">
        CONTACT US
      </p>

      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
        Speak with Perfect Foundation Academy.
      </h2>

      <p className="mt-6 text-xl leading-9 text-[#64748b]">
        Contact the school office for admissions, visits, enquiries and general
        information.
      </p>
<div className="mt-8 space-y-2 text-lg text-[#0f172a] font-medium">
  <p>📞 Phone / WhatsApp: {contactPhone}</p>
  <p>📧 Email: {schoolEmail}</p>
  <p>📍 Address: {schoolLocation}</p>
</div>
      <div className="mt-10 grid gap-5 text-lg">
        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
          📞 <span className="font-bold">Phone / WhatsApp:</span> +233244986221
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
          📍 <span className="font-bold">Address:</span> Oshuman, Top Radio,
          Accra, Ghana
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
          🕒 <span className="font-bold">Office Hours:</span> Monday – Friday
        </div>
      </div>

      <a
        href="{whatsappLink}?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission%20for%20my%20child."
        target="_blank"
        rel="noreferrer"
        className="mt-10 inline-block bg-[#20b957] text-white px-8 py-5 rounded-2xl text-xl font-black shadow-xl hover:shadow-2xl transition"
      >
        💬 Chat on WhatsApp
      </a>
    </div>

    <div className="bg-[#0f172a] text-white rounded-[2rem] p-10 shadow-2xl">
      <div className="w-20 h-20 rounded-3xl bg-[#f4b41a] text-[#0f172a] flex items-center justify-center text-4xl">
        🎓
      </div>

      <h3 className="mt-8 text-3xl font-black">
        Perfect Foundation Academy
      </h3>

      <p className="mt-5 text-gray-300 text-lg leading-8">
        A Ghanaian private school building excellence, discipline, faith and a
        strong academic foundation in every child.
      </p>

      <div className="mt-8 h-[1px] bg-white/20" />

      <div className="mt-8 grid gap-3 text-gray-300">
        <p>Creche</p>
        <p>Nursery</p>
        <p>Kindergarten</p>
        <p>Primary School</p>
        <p>Junior High School</p>
      </div>
    </div>
  </div>
</section>

<footer className="bg-[#071326] text-white px-6 py-16">
  <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
    <div>
      <h2 className="text-3xl font-black">Perfect Foundation Academy</h2>

      <p className="mt-3 text-[#f4b41a] tracking-[0.25em] text-sm">
        EXCELLENCE • DISCIPLINE • FAITH
      </p>

      <p className="mt-6 text-gray-300 leading-8">
        {schoolMotto}
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-black mb-5">Quick Links</h3>

      <div className="grid grid-cols-2 gap-3 text-gray-300 text-lg">
        <a href="#about" className="hover:text-[#f4b41a]">About</a>
        <a href="#programmes" className="hover:text-[#f4b41a]">Programmes</a>
        <a href="#admissions" className="hover:text-[#f4b41a]">Admissions</a>
        <a href="#downloads" className="hover:text-[#f4b41a]">Downloads</a>
        <a href="#gallery" className="hover:text-[#f4b41a]">Gallery</a>
        <a href="#contact" className="hover:text-[#f4b41a]">Contact</a>
      </div>

      <div className="mt-8 space-y-3 text-gray-300">
        <p>📞 {contactPhone}</p>
        <p>📧 {schoolEmail}</p>
        <p>📍 {schoolLocation}</p>
      </div>
    </div>
  </div>

  <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-gray-400">
    <p>© 2026 Perfect Foundation Academy. All rights reserved.</p>

    <a href="/login" className="hover:text-[#f4b41a]">
      Staff Login
    </a>
  </div>
</footer>
    {/* FLOATING WHATSAPP */}
<a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-[#25D366] text-white flex items-center justify-center text-3xl shadow-xl hover:scale-110 transition animate-pulse"
>
  <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
  <span className="relative z-10">💬</span>
</a>
</main>
);
}
