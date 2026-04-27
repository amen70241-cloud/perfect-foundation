import { useState } from "react";

export default function SchoolChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋 I’m the Perfect Foundation Academy assistant. Ask me about admissions, programmes, downloads, fees, location, or contact.",
    },
  ]);
  const [input, setInput] = useState("");

  function getReply(question) {
    const q = question.toLowerCase();

    if (q.includes("admission") || q.includes("apply") || q.includes("enroll")) {
      return "Admissions are open for Creche, Nursery, KG, Primary and JHS. You can visit the school office, call/WhatsApp the school, or download the admission form from the Downloads section.";
    }

    if (q.includes("programme") || q.includes("class") || q.includes("grade")) {
      return "Perfect Foundation Academy offers Creche, Nursery, Kindergarten, Primary and JHS education with strong focus on academics, discipline, faith and character formation.";
    }

    if (q.includes("fees") || q.includes("fee") || q.includes("payment")) {
      return "For school fees, please contact the school office or accountant. Parents can also use the student/parent portal to view fee status when records are updated.";
    }

    if (q.includes("location") || q.includes("where") || q.includes("address")) {
      return "The school is located at Oshuman, Top Radio area, Accra, Ghana. Please contact the school directly for detailed directions.";
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("whatsapp")) {
      return "You can contact Perfect Foundation Academy through the WhatsApp button on this website or through the contact details in the footer.";
    }

    if (q.includes("download") || q.includes("prospectus") || q.includes("calendar") || q.includes("form")) {
      return "You can find documents like admission forms, prospectus and academic calendar in the Downloads section of the website.";
    }

    if (q.includes("portal") || q.includes("login")) {
      return "Use Portal Login to access Admin, Teacher, Accountant, or Student/Parent portals. Students and staff receive login details from the school administrator.";
    }

    return "Thanks for your question. For detailed help, please contact the school through WhatsApp or visit the admissions office. You can also ask me about admissions, fees, programmes, downloads, location, or portal login.";
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const reply = getReply(userMessage);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      { from: "bot", text: reply },
    ]);

    setInput("");
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-28 right-6 z-[60] w-[90vw] max-w-sm bg-white rounded-[2rem] shadow-2xl border overflow-hidden">
          <div className="bg-[#0f172a] text-white p-5">
            <h3 className="text-xl font-black">PFA Assistant</h3>
            <p className="text-sm text-gray-300">Ask about the school</p>
          </div>

          <div className="h-80 overflow-y-auto p-5 space-y-4 bg-[#f8f6ef]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl text-sm leading-6 ${
                  msg.from === "bot"
                    ? "bg-white text-[#0f172a]"
                    : "bg-[#f4b41a] text-[#0f172a] ml-8 font-bold"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-2xl px-4 py-3 outline-none focus:border-[#f4b41a]"
            />
            <button className="bg-[#0f172a] text-white px-4 rounded-2xl font-bold">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[70] w-16 h-16 rounded-full bg-[#0f172a] text-white shadow-2xl text-2xl hover:scale-110 transition"
      >
        {open ? "×" : "🤖"}
      </button>
    </>
  );
}
