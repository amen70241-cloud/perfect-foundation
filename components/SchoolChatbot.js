import { useState } from "react";

export default function SchoolChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋 I’m the Perfect Foundation Academy assistant. Ask me about admissions, programmes, fees, downloads, location, or portal login.",
    },
  ]);
  const [input, setInput] = useState("");

  function getReply(question) {
    const q = question.toLowerCase();

    if (q.includes("admission") || q.includes("apply") || q.includes("enroll")) {
      return "Admissions are open for Creche, Nursery, KG, Primary and JHS. You can download the admission form from the Downloads section or contact the school office through WhatsApp.";
    }

    if (q.includes("programme") || q.includes("class") || q.includes("grade")) {
      return "Perfect Foundation Academy offers Creche, Nursery, KG, Primary and JHS education with strong focus on academics, discipline, faith and character formation.";
    }

    if (q.includes("fee") || q.includes("fees") || q.includes("payment")) {
      return "For school fees, please contact the school office or accountant. Parents can also check fee status through the student/parent portal when records are updated.";
    }

    if (q.includes("location") || q.includes("where") || q.includes("address")) {
      return "Perfect Foundation Academy is located at Oshuman, Top Radio area, Accra, Ghana.";
    }

    if (q.includes("download") || q.includes("prospectus") || q.includes("calendar") || q.includes("form")) {
      return "Please scroll to the Downloads section to access the prospectus, admission form, academic calendar and other school documents.";
    }

    if (q.includes("portal") || q.includes("login")) {
      return "Click Portal Login to access Admin, Teacher, Accountant, or Student/Parent portals. Login details are provided by the school administrator.";
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("whatsapp")) {
      return "You can contact the school using the WhatsApp button or the contact details in the footer section.";
    }

    return "Thank you for your question. You can ask me about admissions, programmes, fees, downloads, location, contact, or portal login.";
  }

  function sendMessage(e) {
    e.preventDefault();

    if (!input.trim()) return;

    const userText = input.trim();
    const botReply = getReply(userText);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "bot", text: botReply },
    ]);

    setInput("");
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-4 right-4 z-[9999] max-w-sm bg-white rounded-[2rem] shadow-2xl border overflow-hidden mx-auto md:left-6 md:right-auto md:w-96">
          <div className="bg-[#0f172a] text-white p-5 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black">PFA School Assistant</h3>
              <p className="text-sm text-gray-300">Ask about the school</p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-3xl font-black"
            >
              ×
            </button>
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
              placeholder="Ask a question..."
              className="flex-1 border rounded-2xl px-4 py-3 outline-none focus:border-[#f4b41a]"
            />

            <button
              type="submit"
              className="bg-[#0f172a] text-white px-4 rounded-2xl font-bold"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-[9999] w-16 h-16 rounded-full bg-[#0f172a] text-white shadow-2xl text-2xl hover:scale-110 transition flex items-center justify-center"
      >
        🎓
      </button>
    </>
  );
}
