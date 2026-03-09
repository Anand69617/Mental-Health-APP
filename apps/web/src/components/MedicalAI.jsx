import { useState, useRef, useEffect } from "react";
import { Stethoscope, Send, Loader2, Info, CheckCircle2 } from "lucide-react";

export default function MedicalAI({ theme }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello. I am the FeelGood Medical Assistant. Please describe any symptoms or mental health concerns you have. I will provide clinical insights and guidance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

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
          mode: "medical",
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
            "I apologize, but I'm unable to provide medical information at this moment due to a technical issue. Please consult a licensed professional.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div
        className={`p-8 rounded-3xl border relative overflow-hidden ${
          theme === "light"
            ? "bg-white border-blue-100 shadow-xl"
            : "bg-black/60 border-[#10B981]/30 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              theme === "light"
                ? "bg-blue-600 shadow-lg shadow-blue-200"
                : "bg-[#10B981] shadow-[0_0_20px_#10B981]"
            }`}
          >
            <Stethoscope className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Clinical Support
            </h2>
            <p className="opacity-60 font-semibold uppercase text-xs tracking-widest">
              Medical Intelligence AI
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl mb-8 flex items-start space-x-3 text-sm ${
            theme === "light"
              ? "bg-blue-50 text-blue-700 border border-blue-100"
              : "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
          }`}
        >
          <Info className="flex-shrink-0 mt-0.5" size={18} />
          <p>
            This AI provides clinical information and suggestions. It is not a
            diagnosis. In case of emergency, please contact professional medical
            services immediately.
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl mb-8 ${
            theme === "light"
              ? "bg-purple-50 border border-purple-100"
              : "bg-[#A855F7]/10 border border-[#A855F7]/30"
          }`}
        >
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Info size={20} />
            Mental Health Helplines (India)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div
              className={`p-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-white/5"}`}
            >
              <div className="font-semibold">National Helpline</div>
              <div className="opacity-80">1800-599-0019 (Toll-free)</div>
            </div>
            <div
              className={`p-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-white/5"}`}
            >
              <div className="font-semibold">Vandrevala Foundation</div>
              <div className="opacity-80">1860-2662-345 / 1800-2333-330</div>
            </div>
            <div
              className={`p-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-white/5"}`}
            >
              <div className="font-semibold">NIMHANS</div>
              <div className="opacity-80">080-46110007</div>
            </div>
            <div
              className={`p-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-white/5"}`}
            >
              <div className="font-semibold">iCall</div>
              <div className="opacity-80">9152987821</div>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto mb-8 pr-2"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start space-x-4 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === "assistant"
                    ? theme === "light"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-[#10B981] text-black"
                    : theme === "light"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-[#F97316] text-black"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Stethoscope size={16} />
                ) : (
                  <CheckCircle2 size={16} />
                )}
              </div>
              <div
                className={`flex-1 p-5 rounded-2xl ${
                  msg.role === "user"
                    ? theme === "light"
                      ? "bg-purple-50"
                      : "bg-white/5 border border-white/10"
                    : theme === "light"
                      ? "bg-blue-50"
                      : "bg-white/5 border border-white/10"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center p-4">
              <Loader2
                className={`animate-spin ${theme === "light" ? "text-blue-600" : "text-[#10B981]"}`}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about symptoms, treatments, or wellness strategies..."
            className={`flex-1 px-6 py-4 rounded-2xl border transition-all ${
              theme === "light"
                ? "bg-white border-gray-200 focus:border-blue-600 outline-none"
                : "bg-white/5 border-white/10 focus:border-[#10B981] outline-none text-white"
            }`}
          />
          <button
            onClick={sendMessage}
            className={`px-8 py-4 rounded-2xl font-bold transition-all ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-[#10B981] text-black hover:shadow-[0_0_20px_#10B981] active:scale-95"
            }`}
          >
            CONSULT
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
