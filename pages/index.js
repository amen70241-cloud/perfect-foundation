export default function Home() {
  const whatsapp =
    "https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission%20for%20my%20child.";

  return (
    <main className="bg-[#f8f6ef] text-[#1e293b]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f8f6ef]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-[#f4b41a] flex items-center justify-center text-2xl shadow-lg">
              🎓
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

          <div className="text-4xl font-bold text-[#0f172a]">☰</div>
        </div>
      </header>

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

          <h2 className="mt-12 text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Perfect Foundation <br />
            <span className="text-[#f4b41a]">Academy</span>
          </h2>

          <p className="mt-10 text-2xl md:text-3xl italic leading-snug max-w-3xl">
            Building Excellence, Discipline, Faith, and a Strong Academic
            Foundation.
          </p>

          <p className="mt-8 text-lg md:text-xl leading-9 text-gray-200 max-w-3xl">
            Welcome to a school where every child is nurtured to grow in
            knowledge, character and faith — from Creche through Junior High
            School.
          </p>

          <div className="mt-12 grid gap-5 max-w-xl">
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
              href={whatsapp}
              className="bg-[#20b957] text-white text-center py-5 rounded-2xl text-xl md:text-2xl font-bold shadow-xl hover:shadow-2xl transition"
            >
              💬 WhatsApp Us
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
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
      <section className="px-6 py-24 bg-[#f8f6ef]">
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

      {/* FOUNDER SECTION */}
      <section className="px-6 py-24 bg-[#0f172a] text-white">
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
      <section id="programmes" className="px-6 py-24 bg-[#f8f6ef]">
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
<section className="px-6 py-24 bg-[#f8f6ef]">
  <div className="max-w-6xl mx-auto text-center">
    <p className="tracking-[0.4em] text-[#d9a514] font-bold">
      LIFE AT PFA
    </p>

    <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
      A glimpse into our classrooms & community.
    </h2>

    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          title: "Early Years",
          img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800",
        },
        {
          title: "Primary Class",
          img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
        },
        {
          title: "Caring Teachers",
          img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800",
        },
        {
          title: "Science Lab",
          img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="relative overflow-hidden rounded-3xl shadow-lg group"
        >
          <img
            src={item.img}
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-80" />

          <p className="absolute bottom-4 left-4 text-white text-xl font-bold">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  </div>
</section> 
{/* ADMISSIONS */}
<section id="admissions" className="px-6 py-24 bg-[#0f172a] text-white">
  <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start">
    <div>
      <p className="tracking-[0.4em] text-[#f4b41a] font-bold">
        ADMISSIONS
      </p>

      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
        Join the Perfect Foundation Academy family.
      </h2>

      <p className="mt-8 text-xl leading-9 text-gray-300">
        Admissions are open for Creche, Nursery, Kindergarten, Primary and JHS.
        Our team is ready to guide you from your first enquiry to your child’s
        first day in class.
      </p>

      <div className="mt-10 grid gap-5">
        <a
          href="https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission%20for%20my%20child."
          target="_blank"
          rel="noreferrer"
          className="bg-[#f4b41a] text-[#0f172a] text-center py-5 rounded-2xl text-xl font-black shadow-xl hover:shadow-2xl transition"
        >
          Start Admission Enquiry →
        </a>

        <a
          href="https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission%20for%20my%20child."
          target="_blank"
          rel="noreferrer"
          className="bg-[#20b957] text-white text-center py-5 rounded-2xl text-xl font-black shadow-xl hover:shadow-2xl transition"
        >
          💬 Enquire on WhatsApp
        </a>
      </div>
    </div>

    <form className="bg-white rounded-[2rem] p-8 shadow-2xl text-[#0f172a]">
      <h3 className="text-3xl font-black tracking-tight">
        Admission Enquiry Form
      </h3>

      <p className="mt-3 text-[#64748b]">
        Fill this form and the school will contact you.
      </p>

      <div className="mt-8 grid gap-5">
        <input
          className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]"
          placeholder="Parent / Guardian Name"
        />

        <input
          className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]"
          placeholder="Phone Number"
        />

        <input
          className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]"
          placeholder="Child’s Name"
        />

        <input
          className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]"
          placeholder="Child’s Age"
        />

        <select className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]">
          <option>Select desired class</option>
          <option>Creche</option>
          <option>Nursery</option>
          <option>Kindergarten</option>
          <option>Primary School</option>
          <option>Junior High School</option>
        </select>

        <textarea
          className="w-full border border-gray-200 rounded-2xl p-4 text-lg outline-none focus:border-[#f4b41a]"
          rows="4"
          placeholder="Message"
        />

        <button
          type="button"
          className="bg-[#f4b41a] text-[#0f172a] py-5 rounded-2xl text-xl font-black shadow-lg hover:shadow-xl transition"
        >
          Send Enquiry ✈
        </button>
      </div>
    </form>
  </div>
</section>
{/* EVENTS & ACHIEVEMENTS */}
<section className="px-6 py-24 bg-[#f8f6ef]">
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
<section className="px-6 py-24 bg-[#0f172a] text-white">
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
          href="#"
          className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition"
        >
          📄 Admission Form (PDF)
        </a>

        <a
          href="#"
          className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition"
        >
          📘 School Prospectus
        </a>

        <a
          href="#"
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
        href="#"
        className="mt-8 block text-center bg-[#f4b41a] text-[#0f172a] py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition"
      >
        Download Full Calendar
      </a>
    </div>
  </div>
</section>
      {/* FLOATING WHATSAPP */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-[#20b957] text-white flex items-center justify-center text-4xl shadow-2xl"
      >
        💬
      </a>
    </main>
  );
}
