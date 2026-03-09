import {
  Moon,
  Sun,
  LayoutDashboard,
  MessageCircle,
  Stethoscope,
  Heart,
} from "lucide-react";

export default function Header({
  theme,
  toggleTheme,
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "friend-talk", label: "Talk to Family", icon: Heart },
    { id: "medical", label: "Medical AI", icon: Stethoscope },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 ${
        theme === "light"
          ? "bg-white/80 border-purple-100"
          : "bg-black/80 border-[#A855F7]/30"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === "light"
                ? "bg-purple-600"
                : "bg-[#A855F7] shadow-[0_0_15px_#A855F7]"
            }`}
          >
            <Heart className="text-white" size={24} />
          </div>
          <span
            className={`text-2xl font-black tracking-tighter ${
              theme === "light" ? "text-purple-900" : "text-white"
            }`}
          >
            FEELGOOD
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? theme === "light"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/50"
                    : theme === "light"
                      ? "text-gray-600 hover:bg-gray-100"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                <span className="font-semibold text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={toggleTheme}
          className={`p-3 rounded-2xl transition-all duration-300 ${
            theme === "light"
              ? "bg-purple-50 text-purple-600 hover:bg-purple-100"
              : "bg-white/5 text-[#F97316] hover:bg-white/10 border border-[#F97316]/30"
          }`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}
