import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Gallery() {
  const [events, setEvents] = useState([]);

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
        <div className="grid gap-8 md:grid-cols-3">
          {events.map((item) => (
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

          {events.length === 0 && (
            <p className="text-[#64748b]">No gallery items available yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
