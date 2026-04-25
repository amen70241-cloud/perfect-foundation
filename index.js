export default function Home() {
  return (
    <div className="font-sans">
      
      {/* HERO */}
      <section className="bg-slate-900 text-white p-10 text-center">
        <h1 className="text-4xl font-bold">
          Perfect Foundation Academy
        </h1>
        <p className="mt-4 text-lg">
          Building Excellence, Discipline, Faith, and a Strong Academic Foundation
        </p>

        <a
          href="https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy"
          target="_blank"
          className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold"
        >
          Enquire on WhatsApp
        </a>
      </section>

      {/* ABOUT */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="mt-4 max-w-xl mx-auto">
          Perfect Foundation Academy provides quality education from Creche to JHS,
          focusing on discipline, academic excellence, and strong moral values.
        </p>
      </section>

      {/* FOUNDER */}
      <section className="bg-gray-100 p-10 text-center">
        <h2 className="text-2xl font-bold">Founder & Director</h2>
        <p className="mt-4 font-semibold">
          Reverend Pastor Emmanuel Brightmoore Nugah
        </p>
        <p className="mt-2">
          Senior Lecturer – University of Ghana, Legon <br />
          Founder – Ordained Betterlife Chapel Int’l Church
        </p>
      </section>

      {/* PROGRAMMES */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold">Programmes</h2>
        <div className="grid md:grid-cols-5 gap-4 mt-6">
          {["Creche","Nursery","KG","Primary","JHS"].map((item) => (
            <div key={item} className="border p-4 rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-gray-100 p-10 text-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-white shadow">Graduation Ceremony</div>
          <div className="p-4 bg-white shadow">Speech & Prize Giving</div>
          <div className="p-4 bg-white shadow">Career & Culture Day</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-4">+233244986221</p>
        <p>Oshuman, Top Radio, Accra Ghana</p>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center p-5 mt-10">
        © 2026 Perfect Foundation Academy
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/233244986221?text=Hello%20Perfect%20Foundation%20Academy"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg"
      >
        WhatsApp
      </a>

    </div>
  );
}