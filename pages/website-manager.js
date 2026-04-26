import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function WebsiteManager() {
  const [downloads, setDownloads] = useState([]);
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [downloadTitle, setDownloadTitle] = useState("");
  const [downloadFile, setDownloadFile] = useState(null);
  const [downloadCategory, setDownloadCategory] = useState("Admissions");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState("General");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImageFile, setEventImageFile] = useState(null);

  const [schoolMotto, setSchoolMotto] = useState("");
  const [schoolLogoFile, setSchoolLogoFile] = useState(null);
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

  function makeFileName(file) {
    const cleanName = file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    return `${Date.now()}-${cleanName}`;
  }

  async function uploadFile(bucket, file) {
    if (!file) return null;

    const fileName = makeFileName(file);

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function addDownload(e) {
    e.preventDefault();
    setMessage("");

    if (!downloadFile) {
      setMessage("Please choose a PDF/file to upload.");
      return;
    }

    try {
      setUploading(true);

      const fileUrl = await uploadFile("website-files", downloadFile);

      const { error } = await supabase.from("website_downloads").insert([
        {
          title: downloadTitle,
          file_url: fileUrl,
          category: downloadCategory,
        },
      ]);

      if (error) throw new Error(error.message);

      setDownloadTitle("");
      setDownloadFile(null);
      setDownloadCategory("Admissions");
      setMessage("Download uploaded successfully.");
      loadData();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    setMessage("");

    try {
      setUploading(true);

      let imageUrl = "";

      if (eventImageFile) {
        imageUrl = await uploadFile("website-images", eventImageFile);
      }

      const { error } = await supabase.from("website_events").insert([
        {
          title: eventTitle,
          event_date: eventDate,
          category: eventCategory,
          description: eventDescription,
          image_url: imageUrl,
        },
      ]);

      if (error) throw new Error(error.message);

      setEventTitle("");
      setEventDate("");
      setEventCategory("General");
      setEventDescription("");
      setEventImageFile(null);
      setMessage("Event / gallery item uploaded successfully.");
      loadData();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function saveSettings(e) {
    e.preventDefault();
    setMessage("");

    try {
      setUploading(true);

      let finalLogoUrl = schoolLogoUrl;

      if (schoolLogoFile) {
        finalLogoUrl = await uploadFile("website-images", schoolLogoFile);
      }

      const payload = {
        school_motto: schoolMotto,
        school_logo_url: finalLogoUrl,
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

        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase
          .from("website_settings")
          .insert([payload]);

        if (error) throw new Error(error.message);
      }

      setSchoolLogoUrl(finalLogoUrl);
      setSchoolLogoFile(null);
      setMessage("Website settings saved successfully.");
      loadData();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#0f172a]">
      <header className="bg-[#0f172a] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Website Manager</h1>
            <p className="text-gray-300">Upload files, images and website content</p>
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
            <h2 className="text-2xl font-black">Upload Download File</h2>
            <p className="mt-2 text-[#64748b]">
              Upload prospectus, admission forms, academic calendar PDFs, etc.
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
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setDownloadFile(e.target.files?.[0] || null)}
                required
                className="input"
              />

              <button disabled={uploading} className="btn-gold">
                {uploading ? "Uploading..." : "Upload Download"}
              </button>
            </div>
          </form>

          <form
            onSubmit={addEvent}
            className="bg-white rounded-[2rem] p-8 shadow border"
          >
            <h2 className="text-2xl font-black">Upload Gallery / Event Image</h2>
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
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => setEventImageFile(e.target.files?.[0] || null)}
                className="input"
              />

              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Short description"
                rows="4"
                className="input"
              />

              <button disabled={uploading} className="btn-dark">
                {uploading ? "Uploading..." : "Upload Gallery Item"}
              </button>
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
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => setSchoolLogoFile(e.target.files?.[0] || null)}
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

          {schoolLogoUrl && (
            <div className="mt-6">
              <p className="font-bold">Current Logo:</p>
              <img
                src={schoolLogoUrl}
                alt="School logo"
                className="mt-3 w-24 h-24 rounded-2xl object-cover border"
              />
            </div>
          )}

          <button disabled={uploading} className="btn-gold mt-6">
            {uploading ? "Saving..." : "Save Website Settings"}
          </button>
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
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="mb-3 w-full h-40 object-cover rounded-2xl"
                    />
                  )}
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
          background: white;
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

        button:disabled {
          opacity: 0.6;
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
