import { useState, useEffect } from "react";
import Header from "../components/Header";
import HappinessMeter from "../components/HappinessMeter";
import ChatInterface from "../components/ChatInterface";
import MedicalAI from "../components/MedicalAI";
import Footer from "../components/Footer";

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        theme === "light"
          ? "bg-[#FDFCFE] text-[#2D2438]"
          : "bg-[#0A0A0F] text-[#E0E0E0] font-mono"
      }`}
    >
      {/* Theme Specific Background Elements */}
      {theme === "dark" && (
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#A855F7] shadow-[0_0_15px_#A855F7]"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-[#10B981] shadow-[0_0_15px_#10B981]"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-[#F97316] shadow-[0_0_15px_#F97316]"></div>
        </div>
      )}

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-[1200px] mx-auto px-4 py-8 relative z-10">
        {activeTab === "dashboard" && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center space-y-6 pt-16 pb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-[#A855F7]/10 text-purple-700 dark:text-[#A855F7] text-sm font-bold border border-purple-200 dark:border-[#A855F7]/30 mb-4">
                ✨ Hackathon Project for Mental Health
              </div>
              <h1
                className={`text-6xl md:text-8xl font-black tracking-tight leading-none ${
                  theme === "dark"
                    ? "text-[#A855F7] drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                    : "text-[#4C1D95]"
                }`}
              >
                Reclaiming <br />{" "}
                <span
                  className={
                    theme === "dark" ? "text-[#10B981]" : "text-[#7C3AED]"
                  }
                >
                  Your Joy.
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-70 max-w-2xl mx-auto font-medium">
                Our AI-powered platform helps you navigate depression with
                positivity, family support, and medical insight.
              </p>

              <div className="flex justify-center gap-4 pt-6">
                <button
                  onClick={() => setActiveTab("friend-talk")}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 ${
                    theme === "light"
                      ? "bg-purple-600 text-white shadow-xl shadow-purple-200"
                      : "bg-[#A855F7] text-black shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  }`}
                >
                  Start Talking
                </button>
                <button
                  onClick={() => setActiveTab("medical")}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 border ${
                    theme === "light"
                      ? "border-purple-200 text-purple-700 bg-white"
                      : "border-[#10B981]/50 text-[#10B981] bg-black"
                  }`}
                >
                  Medical Advice
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <HappinessMeter theme={theme} />
              <div
                className={`p-10 rounded-3xl border flex flex-col justify-center space-y-8 ${
                  theme === "light"
                    ? "bg-white/50 border-purple-100 shadow-xl"
                    : "bg-black/40 border-[#F97316]/30 backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                }`}
              >
                <h3
                  className={`text-3xl font-black ${theme === "dark" ? "text-[#F97316]" : "text-purple-900"}`}
                >
                  Your Activity
                </h3>
                <div className="space-y-6">
                  <StatCard
                    label="Daily Mood"
                    value="Improving"
                    sub="Positive outlook detected"
                    theme={theme}
                    color="purple"
                  />
                  <StatCard
                    label="AI Support"
                    value="3 Personas"
                    sub="Used this week"
                    theme={theme}
                    color="blue"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "friend-talk" && <ChatInterface theme={theme} />}
        {activeTab === "medical" && <MedicalAI theme={theme} />}
      </main>

      <Footer theme={theme} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Space+Grotesk:wght@400;700&display=swap');
        
        :root {
          --primary-purple: #8B5CF6;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        .dark body {
          font-family: 'Space Grotesk', sans-serif;
        }

        .neon-border {
          box-shadow: 0 0 5px #A855F7, inset 0 0 5px #A855F7;
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, sub, theme, color }) {
  const colors = {
    purple:
      theme === "light"
        ? "bg-purple-100 text-purple-700"
        : "bg-[#A855F7]/20 text-[#A855F7]",
    blue:
      theme === "light"
        ? "bg-blue-100 text-blue-700"
        : "bg-[#10B981]/20 text-[#10B981]",
  };
  return (
    <div
      className={`p-6 rounded-2xl border ${theme === "light" ? "bg-white border-gray-100" : "bg-white/5 border-white/10"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-bold opacity-60 uppercase tracking-widest">
          {label}
        </span>
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${colors[color]}`}
        >
          Live
        </div>
      </div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-sm opacity-50">{sub}</p>
    </div>
  );
}
