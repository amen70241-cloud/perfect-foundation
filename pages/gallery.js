import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Gallery() {
  const router = useRouter();
  const { category } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const filteredEvents = category
  ? events.filter((item) => item.category === category)
  : events;
const galleryCategories = [
  "All",
  "Early Years",
  "Primary Class",
  "Caring Teachers",
  "Morning Assembly",
  "Graduation Ceremony",
  "Sports Day",
  "Culture Day",
  "Speech and Prize Giving Day",
  "Career Day",
  "Faith Activities",
  "Classroom Life",
  "Educational Trips",
];
  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data } = await supabase
      .from("website_events")
      .select("*")
      .order("event_date", { ascending: false });

    setEvents(data || []);
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Gallery & Events</h1>
            <p className="text-gray-300 mt-2">
              A glimpse into school life, events and achievements.
            </p>
          </div>

          <a href="/" className="text-[#f4b41a] font-bold">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
    <div className="mb-10 flex flex-wrap gap-3 justify-center">
  {galleryCategories.map((cat) => (
    <a
      key={cat}
      href={cat === "All" ? "/gallery" : `/gallery?category=${encodeURIComponent(cat)}`}
      className={`px-5 py-3 rounded-full text-sm font-bold border ${
        (cat === "All" && !category) || category === cat
          ? "bg-[#f4b41a] text-[#0f172a] border-[#f4b41a]"
          : "bg-white text-[#0f172a] border-gray-200"
      }`}
    >
      {cat}
    </a>
  ))}
</div>
        <div className="grid gap-8 md:grid-cols-3">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow border border-gray-100"
            >
              {item.image_url ? (
               <img
  src={item.image_url}
  alt={item.title}
  onClick={() => setSelectedImage(item)}
  className="w-full h-64 object-cover cursor-pointer"
/>
              ) : (
                <div className="w-full h-64 bg-[#0f172a] flex items-center justify-center text-[#f4b41a] text-5xl">
                  🎓
                </div>
              )}

              <div className="p-6">
                <p className="text-[#d9a514] font-bold uppercase tracking-[0.2em] text-xs">
                  {item.category}
                </p>

                <h2 className="mt-3 text-2xl font-black">{item.title}</h2>

                <p className="mt-2 text-sm text-[#64748b]">
                  {item.event_date || "No date"}
                </p>

                <p className="mt-4 text-[#64748b]">{item.description}</p>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <p className="text-[#64748b]">No gallery items available yet.</p>
          )}
        </div>
      </section>
          {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedImage.image_url}
        alt={selectedImage.title}
        className="w-full max-h-[75vh] object-contain bg-black"
      />

      <div className="p-6">
        <p className="text-[#d9a514] font-bold uppercase text-sm">
          {selectedImage.category}
        </p>
        <h2 className="text-2xl font-black text-[#0f172a] mt-2">
          {selectedImage.title}
        </h2>
        {selectedImage.description && (
          <p className="text-[#64748b] mt-2">{selectedImage.description}</p>
        )}

        <button
          type="button"
          onClick={() => setSelectedImage(null)}
          className="mt-5 px-6 py-3 rounded-full bg-[#0f172a] text-white font-bold"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
