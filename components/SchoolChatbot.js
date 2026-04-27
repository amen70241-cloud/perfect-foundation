import { useState } from "react";

export default function SchoolChatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋 I’m the Perfect Foundation Academy assistant. Ask me about admissions, programmes, fees, downloads, location, or portal login.",
    },
  ]);
  const [input, setInput] = useState("");

  function getReply(question) {
    const q = question.toLowerCase();

    if (q.includes("admission") || q.includes("apply")) {
      return "Admissions are open for Creche, Nursery, KG, Primary and JHS. You can download the admission form from the Downloads section or contact the school through WhatsApp.";
    }

    if (q.includes("programme") || q.includes("class")) {
      return "Perfect Foundation Academy offers Creche, Nursery, KG, Primary and JHS.";
    }

    if (q.includes("fee") || q.includes("payment")) {
      return "For fees, please contact the school office or accountant. Parents can also check fee status through the student portal.";
    }

    if (q.includes("location") || q.includes("address")) {
      return "Perfect Foundation Academy is located at Oshuman, Top Radio area, Accra, Ghana.";
    }

    if (q.includes("download") || q.includes("form") || q.includes("prospectus")) {
      return "Scroll to the Downloads section to access forms, prospectus and school documents.";
    }

    if (q.includes("portal") || q.includes("login")) {
      return "Click Portal Login to access Admin, Teacher, Accountant or Student/Parent portal.";
    }

    return "You can ask me about admissions, programmes, fees, downloads, location, contact or portal login.";
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "bot", text: getReply(userText) },
    ]);

    setInput("");
  }

  return (
    <details className="fixed bottom-6 left-6 z-[999999] group">
      <summary className="list-none cursor-pointer">
        <div className="w-20 h-20 rounded-full bg-[#071326] shadow-2xl flex items-center justify-center relative overflow-hidden border border-cyan-300/40">
          <span className="absolute inset-0 bg-cyan-400/20 animate-ping rounded-full"></span>
          <span className="absolute w-16 h-16 rounded-full border-2 border-cyan-300 animate-spin"></span>
          <span className="relative z-10 text-3xl">🎓</span>
        </div>
      </summary>

      <div className="absolute bottom-24 left-0 w-[90vw] max-w-sm bg-white rounded-[2rem] shadow-2xl border overflow-hidden">
        <div className="bg-[#071326] text-white p-5">
          <h3 className="text-xl font-black">PFA School Assistant</h3>
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
    </details>
  );
}
