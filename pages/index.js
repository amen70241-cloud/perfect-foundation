export default function Home() {
  const whatsapp =
    "https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission%20for%20my%20child.";

  const programmes = [
    ["Creche", "1–2 yrs", "A safe and caring start for little learners."],
    ["Nursery", "2–3 yrs", "Songs, stories and structured play."],
    ["Kindergarten", "4–5 yrs", "Early literacy, numeracy and confidence."],
    ["Primary", "P1–P6", "Strong academic foundation and discipline."],
    ["JHS", "JHS 1–3", "Focused preparation for excellence."],
  ];

  const gallery = [
    ["Early Years", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800"],
    ["Primary Class", "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"],
    ["Caring Teachers", "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"],
    ["Science Lab", "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800"],
  ];

  return (
    <main className="bg-[#f8f6ef] text-[#14213d]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8f6ef]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#14213d] text-[#f4b41a] flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h1 className="text-2xl font-extrabold font-serif leading-tight">
                Perfect Foundation
              </h1>
              <p className="tracking-[0.35em] text-[#d9a514] text-sm font-bold">
                ACADEMY
              </p>
            </div>
          </div>
          <div className="text-4xl font-bold">☰</div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,33,61,.85),rgba(20,33,61,.75)),url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200')",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 text-white">
          <div className="inline-flex items-center gap-3 border border-[#d9a514] rounded-full px-6 py-3 text-[#f4b41a] font-bold tracking-widest">
            ● A GHANAIAN PRIVATE SCHOOL
          </div>

          <h2 className="mt-12 text-6xl md:text-7xl font-black font-serif leading-tight">
            Perfect Foundation <br />
            <span className="text-[#f4b41a]">Academy</span>
          </h2>

          <p className="mt-10 text-3xl italic font-serif max-w-3xl">
            Building Excellence, Discipline, Faith, and a Strong Academic
            Foundation.
          </p>

          <p className="mt-8 text-xl leading-9 max-w-3xl text-gray-200">
            Welcome to a school where every child is nurtured to grow in
            knowledge, character and faith — from Creche through Junior High
            School.
          </p>

          <div className="mt-12 grid gap-5 max-w-xl">
            <a
              href="#admissions"
              className="bg-[#f4b41a] text-[#14213d] text-center py-5 rounded-2xl text-2xl font-extrabold shadow-xl"
            >
              Enquire Now →
            </a>
            <a
              href="#programmes"
              className="border-2 border-white text-white text-center py-5 rounded-2xl text-2xl font-bold"
            >
              📖 View Our Programmes
            </a>
            <a
              href={whatsapp}
              className="bg-[#20b957] text-white text-center py-5 rounded-2xl text-2xl font-bold"
            >
              💬 WhatsApp Us
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
            <div className="border-l-4 border-[#f4b41a] pl-6">
              <h3 className="text-4xl font-black font-serif text-[#f4b41a]">5</h3>
              <p>Levels</p>
            </div>
            <div className="border-l-4 border-[#f4b41a] pl-6">
              <h3 className="text-4xl font-black font-serif text-[#f4b41a]">100%</h3>
              <p>Caring Staff</p>
            </div>
            <div className="border-l-4 border-[#f4b41a] pl-6">
              <h3 className="text-4xl font-black font-serif text-[#f4b41a]">Faith</h3>
              <p>Based Values</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="tracking-[0.4em] text-[#d9a514] font-bold">
            ABOUT OUR SCHOOL
          </p>
          <h2 className="mt-8 text-5xl md:text-6xl font-black font-serif leading-tight">
            A foundation built on knowledge, character & faith.
          </h2>
          <p className="mt-8 text-2xl leading-10 text-gray-600 max-w-4xl">
            Perfect Foundation Academy is a Ghanaian private school committed to
            nurturing children academically, morally and spiritually. We serve
            learners from Creche, Nursery, Kindergarten, Primary and Junior High
            School.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              ["🏅", "Our Mission", "To provide quality, faith-based education that nurtures disciplined, confident and academically strong children."],
              ["✨", "Our Vision", "To raise responsible future leaders with strong values, creativity and academic excellence."],
              ["🛡️", "Our Values", "Excellence, discipline, faith, integrity, care and academic growth."],
            ].map((item) => (
              <div key={item[1]} className="bg-white rounded-3xl p-10 shadow-xl border">
                <div className="w-16 h-16 bg-[#14213d] text-[#f4b41a] rounded-2xl flex items-center justify-center text-3xl">
                  {item[0]}
                </div>
                <h3 className="mt-8 text-3xl font-black font-serif">{item[1]}</h3>
                <p className="mt-5 text-xl leading-8 text-gray-600">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-[#14213d] text-white px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/images/founder.jpg"
              alt="Founder and Director"
              className="rounded-[2rem] border-8 border-[#d9a514] shadow-2xl w-full object-cover"
            />
            <div className="absolute -bottom-6 right-0 bg-[#f4b41a] text-[#14213d] px-8 py-5 rounded-2xl font-black text-xl font-serif">
              Founder & Director
            </div>
          </div>

          <div>
            <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
              MEET OUR FOUNDER
            </p>
            <h2 className="mt-8 text-5xl font-black font-serif leading-tight">
              Reverend Pastor Emmanuel Brightmoore Nugah
            </h2>
            <p className="mt-8 text-2xl leading-10 text-gray-200">
              A devoted educator, faith leader and visionary, Reverend Pastor
              Emmanuel Brightmoore Nugah founded Perfect Foundation Academy with
              a clear conviction: that every Ghanaian child deserves an education
              grounded in academic excellence, godly character and lifelong
              discipline.
            </p>
            <p className="mt-6 text-2xl leading-10 text-gray-200">
              He serves alongside his wife,{" "}
              <span className="text-[#f4b41a] font-bold">Mrs. Susana Nugah</span>,
              whose warmth and dedication continue to shape the academy’s
              nurturing family culture.
            </p>

            <div className="mt-10 space-y-5">
              <p className="text-xl">🎓 Senior Lecturer, University of Ghana, Legon — Theatre Arts Department</p>
              <p className="text-xl">⛪ Founder, Ordained Betterlife Chapel Int’l Church</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-center tracking-[0.4em] text-[#d9a514] font-bold">
            OUR PROGRAMMES
          </p>
          <h2 className="mt-6 text-center text-5xl font-black font-serif">
            From Creche to JHS
          </h2>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((p) => (
              <div key={p[0]} className="bg-white rounded-3xl p-10 shadow-xl border">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-[#14213d] text-white flex items-center justify-center text-3xl">
                    📚
                  </div>
                  <span className="bg-green-100 text-green-700 rounded-full px-5 py-2 font-bold">
                    {p[1]}
                  </span>
                </div>
                <h3 className="mt-10 text-4xl font-black font-serif">{p[0]}</h3>
                <p className="mt-5 text-xl leading-8 text-gray-600">{p[2]}</p>
                <div className="mt-8 w-20 h-1 bg-[#f4b41a]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section id="admissions" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="tracking-[0.4em] text-[#d9a514] font-bold">
              ADMISSIONS
            </p>
            <h2 className="mt-6 text-5xl font-black font-serif leading-tight">
              Join the Perfect Foundation Academy family.
            </h2>
            <p className="mt-8 text-2xl leading-10 text-gray-600">
              Admissions are open throughout the year for Creche, Nursery, KG,
              Primary and JHS. Our team is ready to guide you every step of the
              way.
            </p>

            <div className="mt-10 grid gap-5">
              <a
                href={whatsapp}
                className="bg-[#f4b41a] text-[#14213d] text-center py-5 rounded-2xl text-xl font-black"
              >
                Start Admission Enquiry →
              </a>
              <a
                href={whatsapp}
                className="bg-[#20b957] text-white text-center py-5 rounded-2xl text-xl font-black"
              >
                💬 Enquire on WhatsApp
              </a>
              <a
                href="#downloads"
                className="border-2 border-gray-300 text-center py-5 rounded-2xl text-xl font-bold"
              >
                Download Forms
              </a>
            </div>
          </div>

          <form className="bg-[#14213d] p-8 rounded-[2rem] shadow-2xl">
            <div className="bg-white rounded-[2rem] p-8 space-y-5">
              <input className="w-full border rounded-xl p-4 text-lg" placeholder="Parent / Guardian Name" />
              <input className="w-full border rounded-xl p-4 text-lg" placeholder="Phone Number" />
              <input className="w-full border rounded-xl p-4 text-lg" placeholder="Child’s Name" />
              <input className="w-full border rounded-xl p-4 text-lg" placeholder="Child’s Age" />
              <select className="w-full border rounded-xl p-4 text-lg">
                <option>Select a class / level</option>
                <option>Creche</option>
                <option>Nursery</option>
                <option>Kindergarten</option>
                <option>Primary</option>
                <option>JHS</option>
              </select>
              <textarea className="w-full border rounded-xl p-4 text-lg" placeholder="How can we help you?" rows="4" />
              <button className="w-full bg-[#f4b41a] text-[#14213d] py-5 rounded-2xl text-xl font-black">
                Send Enquiry ✈
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <p className="tracking-[0.4em] text-[#d9a514] font-bold">
            LIFE AT PFA
          </p>
          <h2 className="mt-6 text-5xl font-black font-serif leading-tight">
            A glimpse into our classrooms & community.
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {gallery.map((g) => (
              <div key={g[0]} className="relative overflow-hidden rounded-3xl shadow-xl">
                <img src={g[1]} className="h-64 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213d] to-transparent" />
                <p className="absolute bottom-5 left-5 text-white text-2xl font-black font-serif">
                  {g[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-center tracking-[0.4em] text-[#d9a514] font-bold">
            EVENTS & ACHIEVEMENTS
          </p>
          <h2 className="mt-6 text-center text-5xl font-black font-serif">
            Celebrating every milestone
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {["Graduation Ceremony", "Speech & Prize Giving", "Career & Culture Day"].map(
              (event) => (
                <div key={event} className="bg-[#f8f6ef] rounded-3xl p-8 shadow-xl border">
                  <div className="text-5xl">🏆</div>
                  <h3 className="mt-6 text-3xl font-black font-serif">{event}</h3>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    A special school event for celebrating learning, talent,
                    discipline and community.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="downloads" className="px-6 py-24 bg-[#14213d] text-white">
        <div className="max-w-6xl mx-auto">
          <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
            DOWNLOADS
          </p>
          <h2 className="mt-6 text-5xl font-black font-serif">
            Admissions documents
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {["Admission Form", "Academic Calendar", "School Prospectus"].map(
              (file) => (
                <div key={file} className="border border-white/20 rounded-3xl p-8">
                  <div className="text-4xl">⬇️</div>
                  <h3 className="mt-5 text-2xl font-black">{file}</h3>
                  <p className="mt-3 text-gray-300">PDF upload placeholder</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black font-serif">Contact Us</h2>
          <div className="mt-8 text-2xl leading-10 text-gray-600">
            <p>📞 Phone / WhatsApp: +233244986221</p>
            <p>📍 Address: Oshuman, Top Radio, Accra, Ghana</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071326] text-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black font-serif">
            Perfect Foundation Academy
          </h2>
          <p className="mt-4 text-[#f4b41a] tracking-[0.3em]">
            CRECHE • NURSERY • KG • PRIMARY • JHS
          </p>
          <p className="mt-8 text-gray-300 text-xl max-w-3xl">
            A Ghanaian private school building excellence, discipline, faith and
            a strong academic foundation in every child.
          </p>
          <p className="mt-10 text-gray-400">
            © 2026 Perfect Foundation Academy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={whatsapp}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-[#20b957] text-white flex items-center justify-center text-4xl shadow-2xl"
      >
        💬
      </a>
    </main>
  );
}
