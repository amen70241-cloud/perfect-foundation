import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    loadDownloads();
  }, []);

  async function loadDownloads() {
    const { data } = await supabase
      .from("website_downloads")
      .select("*")
      .order("created_at", { ascending: false });

    setDownloads(data || []);
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Downloads</h1>
            <p className="text-gray-300 mt-2">
              Prospectus, admission forms, academic calendar and school documents.
            </p>
          </div>

          <a href="/" className="text-[#f4b41a] font-bold">
            Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2rem] p-8 shadow border border-gray-100"
            >
              <p className="text-[#d9a514] font-bold uppercase tracking-[0.2em] text-sm">
                {item.category}
              </p>

              <h2 className="mt-4 text-2xl font-black">{item.title}</h2>

              <a
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-[#f4b41a] text-[#0f172a] px-6 py-4 rounded-2xl font-black"
              >
                Download File
              </a>
            </div>
          ))}

          {downloads.length === 0 && (
            <p className="text-[#64748b]">No downloads available yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
