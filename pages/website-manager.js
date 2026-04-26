import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function WebsiteManager() {
  const [downloads, setDownloads] = useState([]);
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState("");

  const [downloadTitle, setDownloadTitle] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadCategory, setDownloadCategory] = useState("Admissions");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState("General");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");

  const [schoolMotto, setSchoolMotto] = useState("");
  const [schoolLogoUrl, setSchoolLogoUrl] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: downloadsData } = await supabase
      .from("website_downloads")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: eventsData } = await supabase
      .from("website_events")
      .select("*")
      .order("event_date", { ascending: false });

    const { data: settingsData } = await supabase
      .from("website_settings")
      .select("*")
      .limit(1)
      .single();

    setDownloads(downloadsData || []);
    setEvents(eventsData || []);

    if (settingsData) {
      setSettings(settingsData);
      setSchoolMotto(settingsData.school_motto || "");
      setSchoolLogoUrl(settingsData.school_logo_url || "");
      setContactPhone(settingsData.contact_phone || "");
      setWhatsappNumber(settingsData.whatsapp_number || "");
      setEmail(settingsData.email || "");
      setLocation(settingsData.location || "");
    }
  }

  async function addDownload(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("website_downloads").insert([
      {
        title: downloadTitle,
        file_url: downloadUrl,
        category: downloadCategory,
      },
    ]);

    if (error) return setMessage(error.message);

    setDownloadTitle("");
    setDownloadUrl("");
    setDownloadCategory("Admissions");
    setMessage("Download added successfully.");
    loadData();
  }

  async function addEvent(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("website_events").insert([
      {
        title: eventTitle,
        event_date: eventDate,
        category: eventCategory,
        description: eventDescription,
        image_url: eventImageUrl,
      },
    ]);

    if (error) return setMessage(error.message);

    setEventTitle("");
    setEventDate("");
    setEventCategory("General");
    setEventDescription("");
    setEventImageUrl("");
    setMessage("Event added successfully.");
    loadData();
  }

  async function saveSettings(e) {
    e.preventDefault();
    setMessage("");

    const payload = {
      school_motto: schoolMotto,
      school_logo_url: schoolLogoUrl,
      contact_phone: contactPhone,
      whatsapp_number: whatsappNumber,
      email,
      location,
      updated_at: new Date().toISOString(),
    };

    if (settings?.id) {
      const { error } = await supabase
        .from("website_settings")
        .update(payload)
        .eq("id", settings.id);

      if (error) return setMessage(error.message);
    } else {
      const { error } = await supabase.from("website_settings").insert([payload]);
      if (error) return setMessage(error.message);
    }

    setMessage("Website settings saved successfully.");
    loadData();
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Website Manager</h1>
            <p className="text-gray-300">Manage public website content</p>
          </div>

          <a href="/admin" className="text-[#f4b41a] font-bold">
            Back to Admin
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {message && (
          <div className="mb-6 bg-white rounded-2xl p-4 shadow font-bold">
            {message}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Stat title="Downloads" value={downloads.length} />
          <Stat title="Events / Gallery" value={events.length} />
          <Stat title="Website Settings" value={settings ? "Saved" : "Not Set"} />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={addDownload}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Add Download</h2>
            <p className="mt-2 text-[#64748b]">
              Add prospectus, admission forms, academic calendar PDFs, etc.
            </p>

            <div className="mt-6 grid gap-4">
              <input
                value={downloadTitle}
                onChange={(e) => setDownloadTitle(e.target.value)}
                placeholder="Title e.g. Admission Form"
                required
                className="input"
              />

              <select
                value={downloadCategory}
                onChange={(e) => setDownloadCategory(e.target.value)}
                className="input"
              >
                <option>Admissions</option>
                <option>Academic Calendar</option>
                <option>Prospectus</option>
                <option>Fees</option>
                <option>General</option>
              </select>

              <input
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                placeholder="PDF or file URL"
                required
                className="input"
              />

              <button className="btn-gold">Add Download</button>
            </div>
          </form>

          <form
            onSubmit={addEvent}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Add Event / Gallery Item</h2>
            <p className="mt-2 text-[#64748b]">
              Add graduation, speech day, culture day, career day photos.
            </p>

            <div className="mt-6 grid gap-4">
              <input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Event title"
                required
                className="input"
              />

              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="input"
              />

              <select
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                className="input"
              >
                <option>Graduation</option>
                <option>Speech & Prize Giving</option>
                <option>Career Day</option>
                <option>Culture Day</option>
                <option>Academic Achievement</option>
                <option>Classroom Life</option>
                <option>General</option>
              </select>

              <input
                value={eventImageUrl}
                onChange={(e) => setEventImageUrl(e.target.value)}
                placeholder="Image URL"
                className="input"
              />

              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Short description"
                rows="4"
                className="input"
              />

              <button className="btn-dark">Add Event</button>
            </div>
          </form>
        </div>

        <form
          onSubmit={saveSettings}
          className="mt-10 bg-white rounded-[2rem] p-8 shadow border"
        >
          <h2 className="text-2xl font-black">School Branding & Contact</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={schoolMotto}
              onChange={(e) => setSchoolMotto(e.target.value)}
              placeholder="School motto"
              className="input"
            />

            <input
              value={schoolLogoUrl}
              onChange={(e) => setSchoolLogoUrl(e.target.value)}
              placeholder="School logo URL"
              className="input"
            />

            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Contact phone"
              className="input"
            />

            <input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="WhatsApp number"
              className="input"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="School email"
              className="input"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="School location"
              className="input"
            />
          </div>

          <button className="btn-gold mt-6">Save Website Settings</button>
        </form>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Current Downloads</h2>

            <div className="mt-6 space-y-4">
              {downloads.length === 0 && (
                <p className="text-[#64748b]">No downloads added yet.</p>
              )}

              {downloads.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-[#64748b]">{item.category}</p>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d9a514] font-bold text-sm"
                  >
                    Open File
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow border">
            <h2 className="text-2xl font-black">Current Events / Gallery</h2>

            <div className="mt-6 space-y-4">
              {events.length === 0 && (
                <p className="text-[#64748b]">No events added yet.</p>
              )}

              {events.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-[#64748b]">
                    {item.category} • {item.event_date || "No date"}
                  </p>
                  <p className="text-sm mt-2">{item.description}</p>
                </div>
              ))}
            </div>
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
          padding: 1rem 1.4rem;
          border-radius: 1rem;
          font-weight: 900;
        }

        .btn-dark {
          background: #0f172a;
          color: white;
          padding: 1rem 1.4rem;
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
      <h3 className="mt-3 text-2xl font-black">{value}</h3>
    </div>
  );
}
