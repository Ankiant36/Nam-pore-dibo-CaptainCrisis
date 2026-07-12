import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Activity, Users, ArrowRight, X, Sparkles, Moon, Sun, Lock, Key } from "lucide-react";
import { TranslationDict } from "../translations";

interface HeroPageProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  setLang: React.Dispatch<React.SetStateAction<"en" | "bn">>;
  onLogin: (name: string, roll: string, isCaptain: boolean) => void;
}

export default function HeroPage({ t, lang, theme, setTheme, setLang, onLogin }: HeroPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [nameInput, setNameInput] = useState("");
  const [rollInput, setRollInput] = useState("");
  const [isCaptain, setIsCaptain] = useState(false);
  const [captainCode, setCaptainCode] = useState("");
  const [captainError, setCaptainError] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [secretSig, setSecretSig] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCaptain && captainCode.trim() !== "7BCAPTAIN") {
      setCaptainError(lang === "en" ? "Incorrect Captain passcode! Try '7BCAPTAIN'" : "ভুল ক্যাপ্টেন পাসকোড! '7BCAPTAIN' ট্রাই করুন");
      return;
    }
    setCaptainError("");
    const finalName = nameInput.trim() || (authTab === "signin" ? "Abu Bakar" : "New Student");
    const finalRoll = rollInput.trim() || (authTab === "signin" ? "12" : "07");
    onLogin(finalName, finalRoll, isCaptain);
  };

  const handleLearnMore = () => {
    // Scroll smoothly to features or show info
    const element = document.getElementById("hero-features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateCryptoKey = () => {
    if (!nameInput || !rollInput) return;
    const cleanName = nameInput.toUpperCase().replace(/\s+/g, "");
    const mockKey = `STUDENT-7B-${cleanName}-${rollInput}-${Math.floor(Math.random() * 900 + 100)}`;
    setGeneratedKey(mockKey);
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between overflow-hidden font-sans transition-colors duration-500 ${theme} ${
        theme === "dark" ? "bg-[#030712] text-zinc-100" : "bg-[#F9FAFB] text-zinc-900"
      }`}
    >
      {/* Blurred, glowy hackathon background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/src/assets/images/hackathon_bg_1783877859592.jpg"
          alt="Hackathon Classroom Background"
          className="w-full h-full object-cover opacity-15 filter blur-[15px] scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/30 via-[#030712]/80 to-[#030712]" />
      </div>

      {/* Background Ambient Glow spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 dark:bg-teal-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Global Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-emerald-500/20">
            <Shield className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-zinc-800 dark:text-zinc-100">
            Captain Crisis
          </span>
        </div>

        {/* Header Right Interactions */}
        <div className="flex items-center gap-4">
          {/* Lang Toggle */}
          <button
            onClick={() => setLang(prev => (prev === "en" ? "bn" : "en"))}
            className="text-xs font-bold px-3 py-1.5 hover:bg-zinc-500/10 rounded-lg text-zinc-500 dark:text-zinc-400 transition-colors"
          >
            {lang === "en" ? "বাং" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
            className="p-2 hover:bg-zinc-500/10 rounded-xl text-zinc-500 dark:text-zinc-400 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => {
              setAuthTab("signin");
              setShowLoginModal(true);
            }}
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 transition-colors cursor-pointer"
          >
            {lang === "en" ? "Sign In" : "সাইন ইন"}
          </button>

          <button
            onClick={() => {
              setAuthTab("signup");
              setShowLoginModal(true);
            }}
            className="px-4 py-2 text-sm font-bold text-white bg-[#0D9488] hover:bg-[#0D9488]/90 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            {lang === "en" ? "Get Access" : "অ্যাক্সেস নিন"}
          </button>
        </div>
      </header>

      {/* Main Content Hero area */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center space-y-10">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs text-[#0D9488] font-bold tracking-wide shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Student Alliance — Voice of the Students</span>
        </motion.div>

        {/* Heading Statement */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight font-display leading-[1.05]"
          >
            <span className="text-zinc-900 dark:text-white">The Fall of </span>
            <span className="text-[#0D9488] dark:text-[#10B981] block sm:inline">Kodu</span>
            <span className="text-[#0D9488] dark:text-[#10B981] block leading-none">Kuddus</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            A unified student protocol designed to organize resistance against classroom tyranny.
            Track every violation, compile evidence, and deliver the three strikes required for
            impeachment — systematically and decisively.
          </motion.p>
        </div>

        {/* Center CTA Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <button
            onClick={() => {
              setAuthTab("signin");
              setShowLoginModal(true);
            }}
            className="px-8 py-4 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 cursor-pointer group"
          >
            <span>{lang === "en" ? "Enter the Protocol" : "প্রোটোকল চালু করুন"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleLearnMore}
            className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-500/5 hover:bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 font-bold text-base rounded-xl transition-all cursor-pointer"
          >
            {lang === "en" ? "Learn More" : "বিস্তারিত জানুন"}
          </button>
        </motion.div>

        {/* Bottom Highlights Feature grid */}
        <div id="hero-features" className="w-full pt-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Feature 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/50 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:border-emerald-500/20 transition-all group"
            >
              <div className="p-3 bg-emerald-500/10 text-[#0D9488] rounded-xl group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {lang === "en" ? "Anonymous Reporting" : "বেনামী অভিযোগ সেবা"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Cryptographically masked whistleblower system ensuring student safety.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/50 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:border-emerald-500/20 transition-all group"
            >
              <div className="p-3 bg-emerald-500/10 text-[#0D9488] rounded-xl group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {lang === "en" ? "Real-Time Intelligence" : "রিয়েল-টাইম ইন্টেলিজেন্স"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Live threat monitoring, caloric tracking, and AI-powered insights.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/50 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:border-emerald-500/20 transition-all group"
            >
              <div className="p-3 bg-emerald-500/10 text-[#0D9488] rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {lang === "en" ? "Coordinated Resistance" : "সমন্বিত প্রতিরোধ কার্যক্রম"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  6 active mission modules working as one unified, resilient class protocol.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8 border-t border-zinc-200/30 dark:border-zinc-800/30 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <p>© 2026 Class 7-B Student Alliance — Anti-Kuddus Protocol Hub. All rights protected under standard student protocol.</p>
      </footer>

      {/* Authenticate Modal Overlay */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl relative overflow-hidden ${
                theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-zinc-500/15 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="flex items-center gap-2 text-[#0D9488] mb-4">
                <Lock className="w-5 h-5" />
                <span className="font-display font-black tracking-widest text-xs uppercase">
                  Student Verification Portal
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
                {authTab === "signin" 
                  ? (lang === "en" ? "Authorized Entry" : "অনুমোদিত প্রবেশ")
                  : (lang === "en" ? "Enlist Co-Conspirator" : "নতুন যোদ্ধা নিবন্ধন")}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                {authTab === "signin"
                  ? (lang === "en" ? "Verify your Grade 7 credentials to access the active resistance dashboard." : "সিস্টেমে প্রবেশের জন্য আপনার নাম এবং রোল নম্বর দিন।")
                  : (lang === "en" ? "Generate your secure cryptographic signature to join the anonymous network." : "নিরাপদ ক্রিপ্টোগ্রাফিক স্বাক্ষর তৈরি করে আমাদের বেনামী প্রতিরোধ নেটওয়ার্কে যোগ দিন।")}
              </p>

              {/* Tabs */}
              <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-6">
                <button
                  type="button"
                  onClick={() => setAuthTab("signin")}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                    authTab === "signin"
                      ? "border-[#0D9488] text-[#0D9488]"
                      : "border-transparent text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  {lang === "en" ? "Sign In" : "সাইন ইন"}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("signup")}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                    authTab === "signup"
                      ? "border-[#0D9488] text-[#0D9488]"
                      : "border-transparent text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  {lang === "en" ? "Sign Up" : "রেজিস্ট্রেশন"}
                </button>
              </div>

              {/* Form fields */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    {lang === "en" ? "Student Name" : "শিক্ষার্থীর নাম"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "en" ? "E.g., Abu Bakar" : "যেমন: আবু বকর"}
                    value={nameInput}
                    onChange={e => {
                      setNameInput(e.target.value);
                      if (authTab === "signup") generateCryptoKey();
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#0D9488] ${
                      theme === "dark" ? "bg-black border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    {lang === "en" ? "Roll Number" : "রোল নম্বর"}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    placeholder="E.g., 12"
                    value={rollInput}
                    onChange={e => {
                      setRollInput(e.target.value);
                      if (authTab === "signup") generateCryptoKey();
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#0D9488] ${
                      theme === "dark" ? "bg-black border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  />
                </div>

                {/* Captain privileges check */}
                <div className="flex items-center gap-2 py-1">
                  <input
                    id="captain-privilege-chk"
                    type="checkbox"
                    checked={isCaptain}
                    onChange={e => {
                      setIsCaptain(e.target.checked);
                      if (!e.target.checked) {
                        setCaptainCode("");
                        setCaptainError("");
                      }
                    }}
                    className="rounded border-zinc-300 dark:border-zinc-700 text-[#0D9488] focus:ring-[#0D9488] h-4 w-4 bg-[#0B1220]"
                  />
                  <label htmlFor="captain-privilege-chk" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    {lang === "en" ? "Log in with Captain privileges" : "ক্যাপ্টেন হিসেবে প্রবেশ করুন"}
                  </label>
                </div>

                {isCaptain && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 pt-1"
                  >
                    <label className="block text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                      {lang === "en" ? "Captain Passcode Required" : "ক্যাপ্টেন পাসকোড আবশ্যক"}
                    </label>
                    <input
                      type="password"
                      placeholder={lang === "en" ? "Hint: 7BCAPTAIN" : "পাসকোড দিন: 7BCAPTAIN"}
                      value={captainCode}
                      onChange={e => setCaptainCode(e.target.value)}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-500 ${
                        theme === "dark" 
                          ? "bg-black border-zinc-800 text-white" 
                          : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    />
                    {captainError && (
                      <p className="text-xs text-rose-500 font-bold mt-1">
                        {captainError}
                      </p>
                    )}
                  </motion.div>
                )}

                {authTab === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-1"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                        {lang === "en" ? "Secret Signature Phrase" : "গোপন স্বাক্ষর শব্দগুচ্ছ"}
                      </label>
                      <input
                        type="text"
                        placeholder="E.g., CO-CONSPIRATOR-7B"
                        value={secretSig}
                        onChange={e => setSecretSig(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#0D9488] ${
                          theme === "dark" ? "bg-black border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                        }`}
                      />
                    </div>

                    {generatedKey && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 break-all space-y-1">
                        <span className="font-bold text-zinc-300 block">GENERATED KEY SIGNATURE:</span>
                        <span>{generatedKey}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <Key className="w-4.5 h-4.5" />
                  <span>
                    {authTab === "signin"
                      ? (lang === "en" ? "Authorize & Enter" : "অনুমোদন করুন ও প্রবেশ করুন")
                      : (lang === "en" ? "Create Sign-up Identity" : "আইডেন্টিটি তৈরি করুন")}
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
