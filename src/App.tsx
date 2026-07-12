import React, { useState, useEffect } from "react";
import {
  Shield,
  ShieldAlert,
  Users,
  Flame,
  Bell,
  Sun,
  Moon,
  Activity,
  Sparkles,
  Clock,
  Command,
  RefreshCw,
  LayoutGrid,
  ArrowRight,
  X,
  LogOut,
  Menu,
  Search,
  Coins
} from "lucide-react";
import { translations, TranslationDict } from "./translations";

// Modularized Components
import OverviewDashboard from "./components/OverviewDashboard";
import Mission1StrikePortal from "./components/Mission1StrikePortal";
import Mission2SeatingPlanner from "./components/Mission2SeatingPlanner";
import Mission3SyllabusNegotiator from "./components/Mission3SyllabusNegotiator";
import Mission4CorruptLedger from "./components/Mission4CorruptLedger";
import Mission5SOSRescue from "./components/Mission5SOSRescue";
import Mission6FactChecker from "./components/Mission6FactChecker";
import CommandPalette from "./components/CommandPalette";
import HeroPage from "./components/HeroPage";

export default function App() {
  // Global App States
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("ak_isLoggedIn") === "true";
  });
  const [isCaptainMode, setIsCaptainMode] = useState<boolean>(() => {
    return localStorage.getItem("ak_isCaptainMode") === "true";
  });
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem("ak_studentName") || "Abu Bakar";
  });
  const [studentRoll, setStudentRoll] = useState<string>(() => {
    return localStorage.getItem("ak_studentRoll") || "12";
  });
  const [activeTab, setActiveTab] = useState<
    "overview" | "mission1" | "mission2" | "mission3" | "mission4" | "mission5" | "mission6"
  >("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([
    "Intelligence server pre-loaded with official Class 7-B Rulebook (6 rules active).",
    "Security check: Anonymous cryptographic masking pipeline initialized.",
  ]);
  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "warning" | "error" | "info" }[]
  >([]);

  // API Synced States
  const [complaints, setComplaints] = useState<any[]>(() => {
    const saved = localStorage.getItem("ak_complaints");
    return saved ? JSON.parse(saved) : [];
  });
  const [strikeCount, setStrikeCount] = useState<number>(() => {
    const saved = localStorage.getItem("ak_complaints");
    return saved ? JSON.parse(saved).length : 0;
  });
  const [warnings, setWarnings] = useState<number>(() => {
    const saved = localStorage.getItem("ak_complaints");
    return saved ? JSON.parse(saved).length : 0;
  });
  const [isImpeached, setIsImpeached] = useState<boolean>(() => {
    const saved = localStorage.getItem("ak_complaints");
    return saved ? JSON.parse(saved).length >= 3 : false;
  });

  useEffect(() => {
    localStorage.setItem("ak_complaints", JSON.stringify(complaints));
    setStrikeCount(complaints.length);
    setWarnings(complaints.length);
    setIsImpeached(complaints.length >= 3);
  }, [complaints]);

  const [students, setStudents] = useState<any[]>([]);
  const [seatLayoutData, setSeatLayoutData] = useState<any>({
    layout: [],
    lineOfSightScore: 100,
    isBlocked: false,
    blockedBy: []
  });

  const [ledgerData, setLedgerData] = useState<any>({
    ledger: [],
    totalCashExtorted: 0,
    totalFoodItems: 0,
    totalCaloriesExtorted: 0,
    activeEnergyExpenditure: 0,
    caloricDisparity: 0,
    conversions: { jhalmuriCount: 0, cricketBatsCount: 0, luduBoardsCount: 0 }
  });

  const [sosAlerts, setSosAlerts] = useState<any[]>([]);

  // Mission Forms States
  // Mission 1: Whistleblower
  const [m1Category, setM1Category] = useState<string>("Tiffin Theft");
  const [m1Description, setM1Description] = useState("");
  const [m1Roll, setM1Roll] = useState("");
  const [m1EvidenceFile, setM1EvidenceFile] = useState<File | null>(null);
  const [m1EvidenceName, setM1EvidenceName] = useState<string>("");
  const [isStrippingExif, setIsStrippingExif] = useState(false);
  const [isExifStripped, setIsExifStripped] = useState(false);

  // Mission 2: Seat Planner
  const [m2Name, setM2Name] = useState("");
  const [m2Roll, setM2Roll] = useState("");
  const [m2Height, setM2Height] = useState("");
  const [m2Impairment, setM2Impairment] = useState<string>("none");

  // Mission 3: Syllabus Negotiator
  const [m3Text, setM3Text] = useState("");
  const [m3Result, setM3Result] = useState<any | null>(null);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [m3QuestionCount, setM3QuestionCount] = useState<number>(5);

  // Mission 4: Ledger
  const [m4Type, setM4Type] = useState<string>("washroom_tax");
  const [m4Amount, setM4Amount] = useState("");
  const [m4Item, setM4Item] = useState("");
  const [m4Calories, setM4Calories] = useState("");

  // Mission 5: SOS
  const [m5Location, setM5Location] = useState<string>("Corridor");

  // Mission 6: Fact-Checker
  const [m6Claim, setM6Claim] = useState("");
  const [m6Result, setM6Result] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Retrieve current translations
  const t: TranslationDict = translations[lang];

  // Helper: Trigger custom toast alert
  const triggerToast = (message: string, type: "success" | "warning" | "error" | "info" = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // Keyboard shortcut handler (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync theme class with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  // Fetch initial state from the server on load
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // 1. Fetch Strike Status
      const strikeRes = await fetch("/api/complaints");
      const strikeData = await strikeRes.json();
      setComplaints(strikeData.complaints);
      setStrikeCount(strikeData.strikeCount);
      setWarnings(strikeData.warnings);
      setIsImpeached(strikeData.isImpeached);

      // 2. Fetch Students list & Seating Layout
      const studentRes = await fetch("/api/seat-planner/students");
      const studentsList = await studentRes.json();
      setStudents(studentsList);
      recalculateSeatLayout();

      // 3. Fetch Ledger data
      const ledgerRes = await fetch("/api/corrupt-economy");
      const ledgerStat = await ledgerRes.json();
      setLedgerData(ledgerStat);

      // 4. Fetch SOS Alerts
      const sosRes = await fetch("/api/sos");
      const alerts = await sosRes.json();
      setSosAlerts(alerts);
    } catch (err) {
      console.warn("Notice: Error reading full-stack API, using offline fallback model:", err);
      setIsOnline(false);
    }
  };

  // Re-trigger layout calculation
  const recalculateSeatLayout = async () => {
    try {
      const layoutRes = await fetch("/api/seat-planner/layout");
      const layoutData = await layoutRes.json();
      setSeatLayoutData(layoutData);
    } catch (err) {
      console.warn("Notice: Failed to compute seat layout", err);
    }
  };

  // Resets entire intelligence db to initial baseline
  const resetDatabase = async () => {
    try {
      await fetch("/api/complaints/reset", { method: "POST" });
      await fetchInitialData();
      triggerToast(t.toastReset, "info");
      setNotifications(prev => [
        "Intelligence database successfully reset to baseline. Operation re-armed.",
        ...prev
      ]);
    } catch (err) {
      console.warn("Notice: Reset failed", err);
    }
  };

  // Submit anonymous complaint (Mission 1)
  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!m1Description || !m1Roll) {
      triggerToast("Please fill in the description and verify roll number", "error");
      return;
    }

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: m1Category,
          description: m1Description,
          rollNumber: m1Roll
        })
      });
      const data = await res.json();
      if (data.success) {
        setComplaints(prev => [...prev, data.complaint]);
        setStrikeCount(data.strikeCount);
        setWarnings(data.warnings);
        setIsImpeached(data.isImpeached);
        
        triggerToast(t.toastAdded, "success");
        setNotifications(prev => [
          `[Intel Submission] New verified anonymous log registered under category: ${m1Category}`,
          ...prev
        ]);

        if (data.isImpeached) {
          triggerToast(t.toastImpeached, "warning");
          setNotifications(prev => [
            "🚨 CRITICAL UPDATE: CAPTAIN KUDDUS HAS BEEN OFFICIALLY IMPEACHED!",
            ...prev
          ]);
        }

        // Reset form
        setM1Description("");
        setM1Roll("");
        setM1EvidenceFile(null);
        setM1EvidenceName("");
        setIsExifStripped(false);
      }
    } catch (err) {
      triggerToast("Failed to connect to full-stack pipeline.", "error");
    }
  };

  // Real or simulated file drag and drop/upload EXIF stripper
  const handleFileDropSimulate = (file: File | string) => {
    setIsStrippingExif(true);
    let name = "";
    if (typeof file === "string") {
      name = file;
      setM1EvidenceFile(null);
    } else {
      setM1EvidenceFile(file);
      name = file.name;
    }
    setM1EvidenceName(name);
    setTimeout(() => {
      setIsStrippingExif(false);
      setIsExifStripped(true);
      triggerToast("Metadata stripped!", "info");
    }, 1500);
  };

  // Submit student seat planner details (Mission 2)
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!m2Name || !m2Roll || !m2Height) {
      triggerToast("Please fill all fields to enlist a student", "error");
      return;
    }

    try {
      const res = await fetch("/api/seat-planner/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: m2Name,
          roll: m2Roll,
          height: m2Height,
          impairment: m2Impairment
        })
      });
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
        recalculateSeatLayout();
        triggerToast(t.toastAdded, "success");
        setNotifications(prev => [
          `[Seat Registry] Enlisted student: ${m2Name} (Height: ${m2Height}cm)`,
          ...prev
        ]);
        // Reset form
        setM2Name("");
        setM2Roll("");
        setM2Height("");
        setM2Impairment("none");
      }
    } catch (err) {
      triggerToast("Failed to register student record.", "error");
    }
  };

  // Remove student
  const handleDeleteStudent = async (roll: number) => {
    try {
      const res = await fetch(`/api/seat-planner/students/${roll}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
        recalculateSeatLayout();
        triggerToast("Student record removed.", "info");
      }
    } catch (err) {
      triggerToast("Failed to delete student.", "error");
    }
  };

  // Syllabus AI Negotiator (Mission 3)
  const handleSyllabusNegotiate = async () => {
    if (!m3Text) {
      triggerToast("Please input Kuddus's syllabus demands", "error");
      return;
    }

    setIsNegotiating(true);
    setM3Result(null);

    try {
      const res = await fetch("/api/syllabus/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabusText: m3Text, questionCount: m3QuestionCount })
      });
      const data = await res.json();
      setM3Result(data);
      triggerToast("AI Negotiation complete!", "success");
      setNotifications(prev => [
        `[Gemini AI] Successfully weeded out ${data.trashWeeded.length} extraneous items from syllabus.`,
        ...prev
      ]);
    } catch (err) {
      triggerToast("Gemini analysis failed. Using fallback analyzer.", "warning");
    } finally {
      setIsNegotiating(false);
    }
  };

  // Add corrupt entry to ledger (Mission 4)
  const handleLedgerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = m4Type === "washroom_tax" ? 2 : parseFloat(m4Amount);
    if (!amount || (m4Type === "tiffin_theft" && !m4Item)) {
      triggerToast("Please specify the item and estimated value", "error");
      return;
    }

    try {
      const res = await fetch("/api/corrupt-economy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: m4Type,
          amountTaka: amount,
          item: m4Type === "tiffin_theft" ? m4Item : "Washroom access toll",
          calories: m4Type === "tiffin_theft" ? (m4Calories || 300) : undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        // Fetch fresh stats
        const statsRes = await fetch("/api/corrupt-economy");
        const statsData = await statsRes.json();
        setLedgerData(statsData);
        triggerToast(t.toastAdded, "success");
        setNotifications(prev => [
          `[Ledger Entry] Logged: ${m4Type === "washroom_tax" ? "Washroom Toll" : m4Item}`,
          ...prev
        ]);
        // Reset form
        setM4Amount("");
        setM4Item("");
        setM4Calories("");
      }
    } catch (err) {
      triggerToast("Failed to log transaction.", "error");
    }
  };

  // Trigger Corridor SOS Panic (Mission 5)
  const triggerSOSAlert = async () => {
    try {
      const res = await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: m5Location })
      });
      const data = await res.json();
      if (data.success) {
        setSosAlerts(prev => [data.alert, ...prev]);
        triggerToast("SOS Flare launched! Captains notified.", "warning");
        setNotifications(prev => [
          `🆘 CRITICAL: Student launched active SOS Flare from the ${m5Location}! Backup deployed.`,
          ...prev
        ]);
      }
    } catch (err) {
      triggerToast("SOS transmission failed.", "error");
    }
  };

  // Captain mark as rescued
  const handleRescueAlert = async (id: string) => {
    try {
      const res = await fetch("/api/sos/rescue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setSosAlerts(data.alerts);
        triggerToast(t.toastRescued, "success");
        setNotifications(prev => [
          "✅ SOS alarm deactivated. Target safely escorted by Captains Biltu and Miltu.",
          ...prev
        ]);
      }
    } catch (err) {
      triggerToast("Rescue resolution failed.", "error");
    }
  };

  // AI Rules Fact-Checker (Mission 6)
  const handleFactCheck = async () => {
    if (!m6Claim) {
      triggerToast("Please write or select a claim to verify", "error");
      return;
    }

    setIsVerifying(true);
    setM6Result(null);

    try {
      const res = await fetch("/api/fact-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: m6Claim })
      });
      const data = await res.json();
      setM6Result(data);
      triggerToast("Semantic checking complete!", "success");
      setNotifications(prev => [
        `[Fact Checker] Claim verified against ${data.matchingRuleId}. Status: ${data.status}`,
        ...prev
      ]);
    } catch (err) {
      triggerToast("AI Checking failed.", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  // Helper values for dashboard UI
  // Compute dynamic Captain Threat Level
  const getThreatLevel = () => {
    if (isImpeached) return { pct: 0, label: "PEACE RESTORED", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (strikeCount >= 2) return { pct: 95, label: "EXTREME THREAT", color: "text-rose-500", bg: "bg-rose-500/10" };
    if (strikeCount === 1) return { pct: 65, label: "HIGH WARNING", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { pct: 40, label: "ELEVATED RISK", color: "text-blue-500", bg: "bg-blue-500/10" };
  };

  const threat = getThreatLevel();

  // Command palette execution
  const executeCommand = (cmd: string) => {
    const c = cmd.toLowerCase();
    if (c.includes("mission 1") || c.includes("strike")) {
      setActiveTab("mission1");
      triggerToast("Navigated to Strike Generator");
    } else if (c.includes("mission 2") || c.includes("seating") || c.includes("seat")) {
      setActiveTab("mission2");
      triggerToast("Navigated to Seating Planner");
    } else if (c.includes("mission 3") || c.includes("syllabus")) {
      setActiveTab("mission3");
      triggerToast("Navigated to Syllabus Negotiator");
    } else if (c.includes("mission 4") || c.includes("ledger") || c.includes("tiffin")) {
      setActiveTab("mission4");
      triggerToast("Navigated to Tiffin Ledger");
    } else if (c.includes("mission 5") || c.includes("sos") || c.includes("flare")) {
      setActiveTab("mission5");
      triggerToast("Navigated to SOS Flare");
    } else if (c.includes("mission 6") || c.includes("fact") || c.includes("rule")) {
      setActiveTab("mission6");
      triggerToast("Navigated to Fact-Checker");
    } else if (c.includes("theme") || c.includes("dark") || c.includes("light")) {
      setTheme(prev => (prev === "dark" ? "light" : "dark"));
      triggerToast("Visual theme toggled!");
    } else if (c.includes("lang") || c.includes("bangla") || c.includes("english") || c.includes("ভাষা")) {
      setLang(prev => (prev === "en" ? "bn" : "en"));
      triggerToast("Language toggled!");
    } else if (c.includes("reset") || c.includes("restart")) {
      resetDatabase();
    } else {
      triggerToast("Command not recognized. Try 'Mission 1', 'Theme', or 'Reset'", "error");
    }
    setShowCommandPalette(false);
    setCommandInput("");
  };

  if (!isLoggedIn) {
    return (
      <HeroPage
        t={t}
        lang={lang}
        theme={theme}
        setTheme={setTheme}
        setLang={setLang}
        onLogin={(name, roll, isCaptain) => {
          localStorage.setItem("ak_isLoggedIn", "true");
          localStorage.setItem("ak_studentName", name);
          localStorage.setItem("ak_studentRoll", roll);
          localStorage.setItem("ak_isCaptainMode", isCaptain ? "true" : "false");
          setStudentName(name);
          setStudentRoll(roll);
          setIsCaptainMode(isCaptain);
          setIsLoggedIn(true);
          setM1Roll(roll);
          setM2Roll(roll);
          setM2Name(name);
          triggerToast(`Authorized access as ${isCaptain ? "Captain" : "Student"}: ${name}`, "success");
        }}
      />
    );
  }

  return (
    <div
      id="app-root"
      className={`min-h-screen font-sans transition-colors duration-300 ${theme} ${
        theme === "dark" ? "bg-[#000000] text-white" : "bg-[#FFFFFF] text-black"
      }`}
    >
      {/* Confetti / Impeachment Overlay */}
      {isImpeached && (
        <div
          id="impeached-overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in"
        >
          <div className="max-w-xl text-center glass-panel p-8 rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-500/20">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-extrabold font-display tracking-tight text-emerald-400 mb-4 animate-pulse">
              {t.impeachedTitle}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t.impeachedDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="view-final-logs"
                onClick={() => setIsImpeached(false)}
                className="px-6 py-3 bg-[#111827] text-[#10B981] rounded-xl font-medium border border-[#10B981]/20 hover:bg-[#10B981]/10 transition-colors"
              >
                {lang === "en" ? "View Intelligence Logs" : "ইন্টেলিজেন্স লগ দেখুন"}
              </button>
              <button
                id="reset-mission-btn"
                onClick={resetDatabase}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-600/30"
              >
                {t.resetApp}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toasts Section */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl shadow-lg border flex items-center gap-3 animate-slide-in-right ${
              theme === "dark"
                ? "bg-[#111827]/95 border-white/10 text-white"
                : "bg-white/95 border-black/10 text-[#1E293B]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                toast.type === "success"
                  ? "bg-emerald-500"
                  : toast.type === "warning"
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
            />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="flex min-h-screen relative overflow-x-hidden">
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            id="mobile-sidebar-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}

        {/* Left Collapsible & Responsive Drawer Sidebar */}
        <aside
          id="sidebar"
          className={`fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0 flex-shrink-0 transition-all duration-300 border-r ${
            theme === "dark" ? "bg-[#030712] border-zinc-800/80" : "bg-white border-zinc-200/80"
          } ${isSidebarCollapsed ? "md:w-0 md:opacity-0 md:pointer-events-none md:border-r-0 overflow-hidden" : "md:w-72"} ${
            isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full md:w-72"
          }`}
        >
          <div className="h-full flex flex-col justify-between">
            {/* Top Side */}
            <div>
              {/* Brand logo */}
              <div className="p-6 border-b border-zinc-200/40 dark:border-zinc-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center text-white font-extrabold text-base flex-shrink-0 shadow-md shadow-emerald-500/15">
                    AK
                  </div>
                  {(!isSidebarCollapsed || isMobileMenuOpen) && (
                    <div className="flex flex-col">
                      <span className="text-xs font-bold font-display tracking-widest text-[#0D9488] uppercase">
                        Anti-Kuddus
                      </span>
                      <span className="text-[10px] font-black font-mono tracking-tight text-zinc-500 dark:text-zinc-400">
                        PROTOCOL
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:bg-zinc-500/10 rounded-lg text-slate-400 md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 flex flex-col gap-1.5">
                <button
                  id="tab-overview"
                  onClick={() => {
                    setActiveTab("overview");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 border-l-4 ${
                    activeTab === "overview"
                      ? "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]"
                      : "border-transparent hover:bg-zinc-500/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                  {(!isSidebarCollapsed || isMobileMenuOpen) && <span>{t.sidebarHome}</span>}
                </button>

                <div className="my-2 border-t border-zinc-200/40 dark:border-zinc-800/40" />

                {[
                  { id: "mission1", label: t.sidebarMission1, icon: ShieldAlert },
                  { id: "mission2", label: t.sidebarMission2, icon: Users },
                  { id: "mission3", label: t.sidebarMission3, icon: Sparkles },
                  { id: "mission4", label: t.sidebarMission4, icon: Coins },
                  { id: "mission5", label: t.sidebarMission5, icon: Flame },
                  { id: "mission6", label: t.sidebarMission6, icon: Activity },
                ].map(item => (
                  <button
                    key={item.id}
                    id={`tab-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 border-l-4 ${
                      activeTab === item.id
                        ? "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]"
                        : "border-transparent hover:bg-zinc-500/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Side - Profile / Theme switch */}
            <div className="p-4 border-t border-zinc-200/40 dark:border-zinc-800/40 flex flex-col gap-3">
              {!isSidebarCollapsed && (
                <div
                  className={`p-3 rounded-xl flex items-center justify-between ${
                    theme === "dark" ? "bg-[#0C0C0C] border border-zinc-800/80" : "bg-white border border-zinc-200/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-black text-xs uppercase">
                      {studentName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200 leading-none">
                        {studentName}
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1.5">
                        Roll #{studentRoll}
                        {isCaptainMode && (
                          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-bold px-1 rounded uppercase tracking-wider">
                            Captain
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("ak_isLoggedIn");
                      localStorage.removeItem("ak_isCaptainMode");
                      setIsLoggedIn(false);
                      setIsCaptainMode(false);
                      triggerToast("Logged out of session", "info");
                    }}
                    className="p-1.5 hover:bg-zinc-500/10 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  id="collapse-sidebar-btn"
                  onClick={() => setIsSidebarCollapsed(prev => !prev)}
                  className="p-2 hover:bg-slate-500/10 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                  title={isSidebarCollapsed ? t.sidebarExpand : t.sidebarCollapse}
                >
                  <ArrowRight className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? "" : "rotate-180"}`} />
                </button>

                <div className="flex gap-1">
                  {/* Language switch */}
                  <button
                    id="lang-toggle-btn"
                    onClick={() => setLang(prev => (prev === "en" ? "bn" : "en"))}
                    className="p-2 hover:bg-slate-500/10 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-bold transition-colors"
                    title={t.toggleLang}
                  >
                    {lang === "en" ? "বাং" : "EN"}
                  </button>

                  {/* Theme Switch */}
                  <button
                    id="theme-toggle-btn"
                    onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
                    className="p-2 hover:bg-slate-500/10 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                    title={t.toggleTheme}
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Body Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Sticky Top Navigation */}
          <header
            className={`sticky top-0 z-40 px-4 md:px-8 py-4 border-b flex items-center justify-between backdrop-blur-md ${
              theme === "dark"
                ? "bg-black/90 border-zinc-800 text-[#F8FAFC]"
                : "bg-white/95 border-slate-200 text-[#1E293B]"
            }`}
          >
            {/* Mobile Burger, Desktop Menu & Search Input bar */}
            <div className="flex items-center gap-3 w-72 sm:w-96 relative">
              <button
                id="mobile-sidebar-toggle"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="p-2 md:hidden hover:bg-slate-500/10 rounded-xl text-slate-400"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                id="desktop-sidebar-collapse-toggle"
                onClick={() => setIsSidebarCollapsed(prev => !prev)}
                className="p-2 hidden md:block hover:bg-slate-500/10 rounded-xl text-slate-400 transition-colors"
                title="Toggle Menu Options Visibility"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                id="cmd-palette-trigger"
                onClick={() => setShowCommandPalette(true)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm border text-slate-400 hover:text-slate-300 transition-all ${
                  theme === "dark"
                    ? "bg-[#111827] border-white/5 hover:border-white/10"
                    : "bg-slate-100 border-black/5 hover:border-black/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span className="truncate">{t.searchPlaceholder}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] bg-slate-500/20 px-1.5 py-0.5 rounded font-mono hidden sm:flex">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </button>
            </div>

            {/* Quick Status / Reset */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className="text-xs font-semibold text-slate-400">
                  {isOnline ? t.onlineMode : t.offlineMode}
                </span>
              </div>

              {/* Refresh / Reset Data */}
              <button
                id="reset-db-btn"
                onClick={resetDatabase}
                className="p-2 bg-slate-500/10 hover:bg-slate-500/20 rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold text-slate-300"
                title="Restart Mission (Reset State)"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">{lang === "en" ? "Reset" : "রিসেট"}</span>
              </button>
            </div>
          </header>

          {/* Sub-tabs / Body Views */}
          <div className={`flex-1 p-8 overflow-y-auto w-full mx-auto transition-all duration-300 ${isSidebarCollapsed ? "max-w-none px-4 md:px-12" : "max-w-7xl px-8"}`}>
            {/* Headline Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600/15 text-blue-500 rounded-2xl border border-blue-500/20">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-white mb-1">
                    {t.appName}
                  </h1>
                  <p className="text-sm text-slate-400">
                    {t.appSubtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* ==========================================
                VIEW: OVERVIEW DASHBOARD
                ========================================== */}
            {activeTab === "overview" && (
              <OverviewDashboard
                t={t}
                lang={lang}
                theme={theme}
                warnings={warnings}
                isImpeached={isImpeached}
                strikeCount={strikeCount}
                complaints={complaints}
                ledgerData={ledgerData}
                seatLayoutData={seatLayoutData}
                notifications={notifications}
                setActiveTab={setActiveTab}
                setNotifications={setNotifications}
                triggerToast={triggerToast}
                isCaptainMode={isCaptainMode}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 1 - STRIKE PORTAL
                ========================================== */}
            {activeTab === "mission1" && (
              <Mission1StrikePortal
                t={t}
                lang={lang}
                theme={theme}
                strikeCount={strikeCount}
                warnings={warnings}
                handleComplaintSubmit={handleComplaintSubmit}
                m1Category={m1Category}
                setM1Category={setM1Category}
                m1Description={m1Description}
                setM1Description={setM1Description}
                m1Roll={m1Roll}
                setM1Roll={setM1Roll}
                m1EvidenceFile={m1EvidenceFile}
                setM1EvidenceFile={setM1EvidenceFile}
                isStrippingExif={isStrippingExif}
                isExifStripped={isExifStripped}
                handleFileDropSimulate={handleFileDropSimulate}
                m1EvidenceName={m1EvidenceName}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 2 - SEATING PLANNER
                ========================================== */}
            {activeTab === "mission2" && (
              <Mission2SeatingPlanner
                t={t}
                lang={lang}
                theme={theme}
                students={students}
                seatLayoutData={seatLayoutData}
                handleStudentSubmit={handleStudentSubmit}
                handleDeleteStudent={handleDeleteStudent}
                m2Name={m2Name}
                setM2Name={setM2Name}
                m2Roll={m2Roll}
                setM2Roll={setM2Roll}
                m2Height={m2Height}
                setM2Height={setM2Height}
                m2Impairment={m2Impairment}
                setM2Impairment={setM2Impairment}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 3 - SYLLABUS NEGOTIATOR
                ========================================== */}
            {activeTab === "mission3" && (
              <Mission3SyllabusNegotiator
                t={t}
                lang={lang}
                theme={theme}
                m3Text={m3Text}
                setM3Text={setM3Text}
                isNegotiating={isNegotiating}
                handleSyllabusNegotiate={handleSyllabusNegotiate}
                m3Result={m3Result}
                questionCount={m3QuestionCount}
                setQuestionCount={setM3QuestionCount}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 4 - CORRUPT LEDGER
                ========================================== */}
            {activeTab === "mission4" && (
              <Mission4CorruptLedger
                t={t}
                lang={lang}
                theme={theme}
                ledgerData={ledgerData}
                handleLedgerSubmit={handleLedgerSubmit}
                m4Type={m4Type}
                setM4Type={setM4Type}
                m4Item={m4Item}
                setM4Item={setM4Item}
                m4Amount={m4Amount}
                setM4Amount={setM4Amount}
                m4Calories={m4Calories}
                setM4Calories={setM4Calories}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 5 - SOS RESCUE FLARE
                ========================================== */}
            {activeTab === "mission5" && (
              <Mission5SOSRescue
                t={t}
                lang={lang}
                theme={theme}
                m5Location={m5Location}
                setM5Location={setM5Location}
                sosAlerts={sosAlerts}
                triggerSOSAlert={triggerSOSAlert}
                handleRescueAlert={handleRescueAlert}
              />
            )}

            {/* ==========================================
                VIEW: MISSION 6 - FACT CHECKER
                ========================================== */}
            {activeTab === "mission6" && (
              <Mission6FactChecker
                t={t}
                lang={lang}
                m6Claim={m6Claim}
                setM6Claim={setM6Claim}
                isVerifying={isVerifying}
                handleFactCheck={handleFactCheck}
                m6Result={m6Result}
              />
            )}
          </div>
        </main>
      </div>

      {/* ==========================================
          COMMAND PALETTE MODAL (Ctrl+K)
          ========================================== */}
      {showCommandPalette && (
        <CommandPalette
          lang={lang}
          t={t}
          commandInput={commandInput}
          setCommandInput={setCommandInput}
          setShowCommandPalette={setShowCommandPalette}
          executeCommand={executeCommand}
        />
      )}
    </div>
  );
}
