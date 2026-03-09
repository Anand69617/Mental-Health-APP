import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Users, Home, Heart } from "lucide-react";

export default function ChatInterface({ theme }) {
  const [persona, setPersona] = useState("balanced");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there. I'm here to listen. How was your day? We can talk about anything on your mind.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const personas = [
    { id: "parent", label: "Parent", icon: Home, color: "bg-blue-500" },
    { id: "sibling", label: "Sibling", icon: Heart, color: "bg-pink-500" },
    { id: "friend", label: "Friend", icon: Users, color: "bg-orange-500" },
    { id: "balanced", label: "Balanced", icon: User, color: "bg-purple-500" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "friend_talk",
          persona,
          messages: [...messages, userMsg],
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a little trouble connecting right now. Can we try again in a moment?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[700px]">
      {/* Sidebar Personas */}
      <div
        className={`lg:col-span-1 p-6 rounded-3xl border h-fit ${
          theme === "light"
            ? "bg-white border-purple-100"
            : "bg-white/5 border-white/10"
        }`}
      >
        <h3 className="text-xl font-bold mb-6">Talk to...</h3>
        <div className="space-y-3">
          {personas.map((p) => {
            const Icon = p.icon;
            const isActive = persona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all ${
                  isActive
                    ? theme === "light"
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-[#A855F7] text-black shadow-[0_0_15px_#A855F7]"
                    : theme === "light"
                      ? "bg-purple-50 text-purple-900 hover:bg-purple-100"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${isActive ? "bg-white/20" : p.color + "/20"}`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-current"}
                  />
                </div>
                <span className="font-bold">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`lg:col-span-3 rounded-3xl border flex flex-col overflow-hidden ${
          theme === "light"
            ? "bg-white border-purple-100 shadow-xl"
            : "bg-black/40 border-white/10 backdrop-blur-xl"
        }`}
      >
        <div
          className={`p-4 border-b flex items-center justify-between ${
            theme === "light"
              ? "bg-purple-50 border-purple-100"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === "light" ? "bg-purple-600" : "bg-[#A855F7]"
              }`}
            >
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold">
                {personas.find((p) => p.id === persona).label} Mode
              </p>
              <p className="text-xs opacity-60">Always here for you</p>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px]"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? theme === "light"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-[#F97316] text-black rounded-tr-none font-bold"
                    : theme === "light"
                      ? "bg-gray-100 text-gray-900 rounded-tl-none"
                      : "bg-white/10 text-white rounded-tl-none border border-white/10"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className={`p-4 rounded-2xl rounded-tl-none ${
                  theme === "light"
                    ? "bg-gray-100"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <Loader2 className="animate-spin-slow" size={20} />
              </div>
            </div>
          )}
        </div>

        <div
          className={`p-6 border-t ${
            theme === "light" ? "border-purple-100" : "border-white/10"
          }`}
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tell me more..."
              className={`flex-1 px-6 py-4 rounded-2xl border transition-all ${
                theme === "light"
                  ? "bg-white border-gray-200 focus:border-purple-600 outline-none"
                  : "bg-white/5 border-white/10 focus:border-[#A855F7] outline-none text-white"
              }`}
            />
            <button
              onClick={sendMessage}
              className={`p-4 rounded-2xl transition-all ${
                theme === "light"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-[#A855F7] text-black hover:scale-105 active:scale-95"
              }`}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
