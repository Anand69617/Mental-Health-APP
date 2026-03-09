import { useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

export default function HappinessMeter({ theme }) {
  const [score, setScore] = useState(65);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(
    "You're doing well! Keeping a positive outlook helps maintain this balance.",
  );

  const analyzeHappiness = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "happiness_assessment",
          messages: [{ role: "user", content: input }],
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();

      const scoreMatch = data.text.match(/SCORE:\s*(\d+)/);
      if (scoreMatch) {
        setScore(parseInt(scoreMatch[1]));
      }
      setAnalysis(data.text.replace(/SCORE:\s*\d+/, "").trim());
      setInput("");
    } catch (err) {
      console.error(err);
      setAnalysis(
        "I'm sorry, I couldn't process that right now. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-8 rounded-3xl border transition-all duration-500 ${
        theme === "light"
          ? "bg-white border-purple-100 shadow-2xl shadow-purple-200/50"
          : "bg-black border-[#10B981]/30 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles
            className={theme === "light" ? "text-purple-500" : "text-[#10B981]"}
          />
          Happiness Level
        </h3>
        <span
          className={`text-4xl font-black ${
            theme === "light" ? "text-purple-600" : "text-[#10B981]"
          }`}
        >
          {score}%
        </span>
      </div>

      <div className="relative h-4 w-full bg-gray-100 dark:bg-white/10 rounded-full mb-10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
            theme === "light"
              ? "bg-gradient-to-r from-purple-400 to-purple-600"
              : "bg-gradient-to-r from-[#A855F7] via-[#10B981] to-[#F97316]"
          }`}
          style={{ width: `${score}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      <div
        className={`p-5 rounded-2xl mb-8 border ${
          theme === "light"
            ? "bg-purple-50 border-purple-100"
            : "bg-white/5 border-white/10"
        }`}
      >
        <p className="text-sm leading-relaxed opacity-80 italic">
          "{analysis}"
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold opacity-60 ml-1">
          How are you feeling right now?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your feelings here..."
            className={`flex-1 px-5 py-3 rounded-2xl border transition-all ${
              theme === "light"
                ? "bg-white border-gray-200 focus:border-purple-500 outline-none"
                : "bg-white/5 border-white/10 focus:border-[#10B981] outline-none text-white"
            }`}
          />
          <button
            onClick={analyzeHappiness}
            disabled={loading}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              theme === "light"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-[#10B981] text-black hover:scale-105 active:scale-95 shadow-[0_0_15px_#10B981]"
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse-soft {
          0% { opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { opacity: 0.2; }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
