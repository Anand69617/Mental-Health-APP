import { Heart, Github, Twitter, Instagram } from "lucide-react";

export default function Footer({ theme }) {
  return (
    <footer
      className={`mt-20 border-t py-12 transition-colors duration-500 ${
        theme === "light"
          ? "bg-white border-purple-100"
          : "bg-black border-[#A855F7]/30"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === "light" ? "bg-purple-600" : "bg-[#A855F7]"
                }`}
              >
                <Heart className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold">FEELGOOD</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              Empowering individuals to reclaim their joy through advanced AI
              empathy and professional guidance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Emergency Resources</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>National Suicide Prevention: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>Emergency Services: 911</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Connect With Us</h4>
            <div className="flex space-x-4">
              <SocialIcon icon={Twitter} theme={theme} />
              <SocialIcon icon={Instagram} theme={theme} />
              <SocialIcon icon={Github} theme={theme} />
            </div>
          </div>
        </div>

        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center text-xs opacity-40 gap-4 ${
            theme === "light" ? "border-purple-50" : "border-white/10"
          }`}
        >
          <span>© 2026 FeelGood Hackathon Project. Created with Love.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100">
              Terms of Service
            </a>
            <a href="#" className="hover:opacity-100">
              Medical Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon, theme }) {
  return (
    <button
      className={`p-2.5 rounded-xl transition-all ${
        theme === "light"
          ? "bg-purple-50 text-purple-600 hover:bg-purple-100"
          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
      }`}
    >
      <Icon size={20} />
    </button>
  );
}
