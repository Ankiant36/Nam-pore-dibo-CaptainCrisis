import React from "react";
import {
  Sparkles,
  Flame,
  Users,
  Bell,
  ArrowRight,
  TrendingUp,
  Activity,
  Coins,
  Shield,
  AlertTriangle,
  ShieldAlert,
  FileText,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { TranslationDict } from "../translations";

interface OverviewDashboardProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  warnings: number;
  isImpeached: boolean;
  strikeCount: number;
  complaints: any[];
  ledgerData: any;
  seatLayoutData: any;
  notifications: string[];
  setActiveTab: (tab: "overview" | "mission1" | "mission2" | "mission3" | "mission4" | "mission5" | "mission6") => void;
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
  triggerToast: (message: string, type?: "success" | "warning" | "error" | "info") => void;
  isCaptainMode?: boolean;
}

export default function OverviewDashboard({
  t,
  lang,
  theme,
  warnings,
  isImpeached,
  strikeCount,
  complaints,
  ledgerData,
  seatLayoutData,
  notifications,
  setActiveTab,
  setNotifications,
  triggerToast,
  isCaptainMode = false
}: OverviewDashboardProps) {
  // Compute dynamic Captain Threat Level
  const getThreatLevel = () => {
    if (isImpeached) return { pct: 0, label: "PEACE RESTORED", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (strikeCount >= 2) return { pct: 95, label: "CRITICAL THREAT", color: "text-rose-500", bg: "bg-rose-500/10" };
    if (strikeCount === 1) return { pct: 65, label: "HIGH WARNING", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { pct: 40, label: "ELEVATED RISK", color: "text-blue-500", bg: "bg-blue-500/10" };
  };

  const threat = getThreatLevel();

  // Calculate dynamic impeachment percent
  // 3 complaints required for 100% impeachment
  const impeachmentPct = isImpeached ? 100 : Math.min(100, Math.round((complaints.length / 3) * 100));

  const [decreeText, setDecreeText] = React.useState("");

  const handleIssueDecree = () => {
    if (!decreeText.trim()) return;
    const cleanDecree = decreeText.trim();
    const newDecree = lang === "en" 
      ? `♛ OFFICIAL CAPTAIN DECREE: "${cleanDecree}"`
      : `♛ অফিসিয়াল ক্যাপ্টেন ডিক্রি: "${cleanDecree}"`;
    setNotifications(prev => [newDecree, ...prev]);
    setDecreeText("");
    triggerToast(lang === "en" ? "Decree broadcasted to class!" : "ডিক্রি পুরো ক্লাসে প্রচার করা হয়েছে!", "success");
  };

  return (
    <div id="overview-view" className="space-y-8 animate-fade-in">
      {/* Warnings Banner if active */}
      {warnings > 0 && !isImpeached && (
        <div
          id="warning-status-banner"
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-4 text-amber-300 animate-pulse"
        >
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">{t.warningAlert}</p>
            <p className="text-xs text-amber-400/80 mt-0.5">
              {lang === "en"
                ? `Rashid Sir has logged ${warnings} out of 3 total warning strikes on Kuddus.`
                : `রশিদ স্যার কুদ্দুসের বিরুদ্ধে ৩টির মধ্যে ${warnings}টি ওয়ার্নিং স্ট্রাইক রেকর্ড করেছেন।`}
            </p>
          </div>
        </div>
      )}

      {/* 👑 SPECIAL CAPTAIN COMMAND DECK (Only shown in Captain Mode) */}
      {isCaptainMode && (
        <div className="p-6 rounded-2xl border bg-gradient-to-br from-amber-500/10 via-zinc-950/20 to-amber-500/5 border-amber-500/30 shadow-lg relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">♛</span>
              <div>
                <h3 className="text-base font-black text-amber-500 uppercase tracking-widest">
                  {lang === "en" ? "Captain's Sovereign Command Deck" : "ক্যাপ্টেন সার্বভৌম কমান্ড ডেক"}
                </h3>
                <p className="text-[10px] text-amber-400/70">
                  {lang === "en" 
                    ? "Classroom surveillance bypass mode active. Anonymity is overridden." 
                    : "শ্রেণীকক্ষ নজরদারি বাইপাস মোড চালু। অভিযোগকারী ফিল্টার নিষ্ক্রিয়।"}
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
              {lang === "en" ? "Captain Access Granted" : "ক্যাপ্টেন অ্যাক্সেস অনুমোদিত"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: De-anonymized Complaints */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                {lang === "en" ? "De-Anonymized Resistance Intel" : "অনাবৃত গোপন অভিযোগ তালিকা"}
              </h4>
              
              <div className="bg-black/40 border border-amber-500/10 rounded-xl p-4 h-[160px] overflow-y-auto space-y-3">
                {complaints.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic text-center py-8">
                    {lang === "en" 
                      ? "Classroom is silent. No resistance activities detected." 
                      : "শ্রেণীকক্ষ শান্ত। কোন অসন্তোষ বা গোপন অভিযোগ পাওয়া যায়নি।"}
                  </p>
                ) : (
                  complaints.map((c, idx) => (
                    <div key={idx} className="border-b border-amber-500/5 pb-2 last:border-b-0 text-xs">
                      <div className="flex items-center justify-between font-bold text-amber-500/80 mb-1">
                        <span>{lang === "en" ? "COMPLAINT #" : "অভিযোগ #"}{idx + 1}</span>
                        <span className="text-[10px] bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded uppercase">
                          {lang === "en" ? "Author ID: " : "উৎস: "} Roll #{c.studentRoll || "07"}
                        </span>
                      </div>
                      <p className="text-zinc-300 italic">"{c.description}"</p>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        {lang === "en" ? "Category: " : "শ্রেণীবিভাগ: "} {c.category || "General"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Panel: Issue sovereign decrees */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {lang === "en" ? "Publish Sovereign Class Decrees" : "সার্বভৌম শ্রেণী ডিক্রি প্রকাশ করুন"}
                </h4>
                <p className="text-xs text-zinc-400">
                  {lang === "en"
                    ? "Issue orders directly to the Class 7-B notice board. Decrees appear instantly as announcements."
                    : "সরাসরি ৭-বি নোটিশ বোর্ডে ডিক্রি বা নির্দেশ জারি করুন। এটি সাথে সাথে বুলেটিন বোর্ডে যুক্ত হবে।"}
                </p>
                <input
                  type="text"
                  value={decreeText}
                  onChange={e => setDecreeText(e.target.value)}
                  placeholder={lang === "en" ? "e.g., Tomorrow is a half-day for Class 7-B!" : "যেমন: আগামীকাল ক্লাস ৭-বি এর জন্য হাফ-ডে!"}
                  className="w-full px-4 py-2 bg-black/40 border border-amber-500/20 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={handleIssueDecree}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-xl transition-all shadow-md shadow-amber-950/50 mt-2"
              >
                {lang === "en" ? "Broadcast Sovereign Decree" : "ডিক্রি জারি করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid 6 Columns - Dashboard KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* KPI 1: Threat Level */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              Threat Level
            </span>
            <div className="pt-1">
              <span className={`text-xs font-black px-3 py-1 rounded-lg uppercase ${threat.bg} ${threat.color}`}>
                {threat.label}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              {isImpeached ? "Kuddus removed safely" : "Kuddus regime active"}
            </p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Anonymous Reports */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              Anonymous Reports
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-zinc-800 dark:text-white">
              {complaints.length}
            </h3>
            <p className="text-xs text-[#0D9488] font-semibold">
              +{complaints.length} this week
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-[#0D9488] rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Captain Reputation */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              Captain Reputation
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-zinc-800 dark:text-white">
              {isImpeached ? "0%" : `${Math.max(5, 95 - complaints.length * 30)}%`}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Approval rating
            </p>
          </div>
          <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-2xl">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Mission Completion */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              Mission Completion
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-zinc-800 dark:text-white">
              {isImpeached ? "6/6" : `${Math.min(6, Math.max(1, complaints.length + 1))}/6`}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Missions deployed
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 5: Students Protected */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              Students Protected
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-zinc-800 dark:text-white">
              22
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Active resistance members
            </p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 6: AI Insights Today */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest block">
              AI Insights Today
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-zinc-800 dark:text-white">
              5
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Anomaly detections
            </p>
          </div>
          <div className="p-3 bg-pink-500/10 text-pink-500 rounded-2xl">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Split View matching Image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Card: Impeachment Progress */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
              Impeachment Case Tracker
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              3 verified anonymous student complaints required to trigger school office ouster of Kuddus.
            </p>

            {/* Giant Horizontal Progress Bar */}
            <div className="w-full space-y-6 py-4">
              <div className="flex justify-between items-end mb-1">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#0D9488] uppercase font-black block">
                    ACTIVE CASE SEVERITY
                  </span>
                  <span className="text-2xl font-black text-white">
                    {complaints.length === 0
                      ? "0 / 3 Strikes Active"
                      : complaints.length === 1
                      ? "1 / 3 - Strike One Active"
                      : complaints.length === 2
                      ? "2 / 3 - Critical Strike Active!"
                      : "3 / 3 - IMPEACHMENT ENFORCED!"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block">
                    CASE INTEGRITY INDEX
                  </span>
                  <span className="text-xl font-bold font-mono text-[#0D9488]">
                    {impeachmentPct}% Complete
                  </span>
                </div>
              </div>

              {/* Giant Progress Bar Track */}
              <div className="relative h-7 bg-slate-950 rounded-full border border-white/5 overflow-hidden flex items-center p-1 shadow-inner">
                {/* Glowing fill */}
                <div
                  style={{ width: `${impeachmentPct}%` }}
                  className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20 ${
                    complaints.length >= 3 || isImpeached ? "animate-pulse" : ""
                  }`}
                />

                {/* Grid markings at 33.3%, 66.6%, 100% */}
                <div className="absolute inset-x-0 inset-y-0 flex justify-between px-2 pointer-events-none items-center">
                  {/* Mark 0% */}
                  <div className="w-0.5 h-3 bg-white/10" />
                  {/* Mark 1/3 */}
                  <div className={`relative flex flex-col items-center justify-center ${complaints.length >= 1 ? 'text-white' : 'text-slate-600'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 ${complaints.length >= 1 ? 'bg-emerald-500 border-white' : 'bg-slate-900 border-slate-700'}`} />
                    <span className="absolute top-4 text-[9px] font-mono uppercase tracking-widest">Strike 1</span>
                  </div>
                  {/* Mark 2/3 */}
                  <div className={`relative flex flex-col items-center justify-center ${complaints.length >= 2 ? 'text-white' : 'text-slate-600'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 ${complaints.length >= 2 ? 'bg-teal-500 border-white' : 'bg-slate-900 border-slate-700'}`} />
                    <span className="absolute top-4 text-[9px] font-mono uppercase tracking-widest">Strike 2</span>
                  </div>
                  {/* Mark 3/3 */}
                  <div className={`relative flex flex-col items-center justify-center ${complaints.length >= 3 ? 'text-white' : 'text-slate-600'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 ${complaints.length >= 3 ? 'bg-emerald-400 border-white animate-ping' : 'bg-slate-900 border-slate-700'}`} />
                    <span className="absolute top-4 text-[9px] font-mono uppercase tracking-widest">Strike 3</span>
                  </div>
                  {/* End */}
                  <div className="w-0.5 h-3 bg-white/10" />
                </div>
              </div>

              {/* Warnings details cards */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
                <div className={`p-4 rounded-xl border transition-all ${complaints.length >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-black/10 border-white/5'}`}>
                  <div className="flex items-center gap-2 mb-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>STRIKE 1: WARNING</span>
                  </div>
                  <p className="text-[11px] leading-normal text-slate-400">
                    {complaints.length >= 1 
                      ? "First formal warning recorded for school office review."
                      : "Awaiting first major classroom protocol violation report."}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${complaints.length >= 2 ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-black/10 border-white/5'}`}>
                  <div className="flex items-center gap-2 mb-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>STRIKE 2: LAST WARNING</span>
                  </div>
                  <p className="text-[11px] leading-normal text-slate-400">
                    {complaints.length >= 2 
                      ? "Critical escalation logged. Final warning issued by class authority."
                      : "Requires second verified student submission to trigger."}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${complaints.length >= 3 || isImpeached ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-black/10 border-white/5'}`}>
                  <div className="flex items-center gap-2 mb-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STRIKE 3: IMPEACHED</span>
                  </div>
                  <p className="text-[11px] leading-normal text-slate-400">
                    {complaints.length >= 3 || isImpeached
                      ? "Impeachment file generated and dispatched to Rashid Sir. Peace restored!"
                      : "Case closed upon third submission. Full ouster executed."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("mission1")}
            className="w-full mt-6 py-3.5 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4.5 h-4.5" />
            <span>File Anonymous Report</span>
          </button>
        </div>

        {/* Right Column: AI Intelligence Feed timeline */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                AI Intelligence Feed
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6">Real-time anomaly analysis</p>

            <div className="space-y-4">
              {/* Alert 1 */}
              <div className="p-4 rounded-xl border-l-4 border-rose-500 bg-rose-500/5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-rose-500 uppercase tracking-wider">
                    Anomaly Detected
                  </span>
                  <span className="text-[10px] text-zinc-500">12 min ago</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                  Unusual washroom tax pattern — 6 collections in one day, 300% above average.
                </p>
              </div>

              {/* Alert 2 */}
              <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wider">
                    Risk Assessment
                  </span>
                  <span className="text-[10px] text-zinc-500">1h ago</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                  Kuddus approval rating dropped 4% after Seat Plan abuse report.
                </p>
              </div>

              {/* Alert 3 */}
              <div className="p-4 rounded-xl border-l-4 border-[#0D9488] bg-emerald-500/5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#0D9488] uppercase tracking-wider">
                    Prediction
                  </span>
                  <span className="text-[10px] text-zinc-500">2h ago</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                  Based on current complaint velocity, 3rd strike estimated within 48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex items-center justify-between text-[10px] text-zinc-400 mt-6">
            <span>STRIKE PROTOCOL ACTIVE</span>
            <button
              onClick={() => {
                setNotifications(prev => ["Refreshed telemetry links.", ...prev]);
                triggerToast("Telemetry re-synchronized", "info");
              }}
              className="font-bold hover:underline text-[#0D9488]"
            >
              Force Sync
            </button>
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards row */}
      <div className="pt-4">
        <h3 className="text-base font-bold text-zinc-800 dark:text-white mb-4">
          Quick Access Mission Hub
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission 3 */}
          <div
            onClick={() => setActiveTab("mission3")}
            className="glass-panel p-5 rounded-2xl hover:border-blue-500/30 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-600/10 text-blue-500 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-white mb-1">
                {lang === "en" ? "Syllabus Negotiator" : "সিলেবাস অপ্টিমাইজার"}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                {lang === "en" ? "Weed out biographies, barcodes, indices." : "সূচিপত্র, লেখকের পরিচিতি এআই দিয়ে বাদ দিন।"}
              </p>
            </div>
          </div>

          {/* Mission 5 */}
          <div
            onClick={() => setActiveTab("mission5")}
            className="glass-panel p-5 rounded-2xl hover:border-rose-500/30 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-rose-600/10 text-rose-500 rounded-xl">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500 transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-white mb-1">
                {lang === "en" ? "SOS Rescue Flare" : "করিডোর এসওএস সঙ্কেত"}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                {lang === "en" ? "Launch urgent flare if Kuddus corners you." : "চাঁদা বা চুরির তাৎক্ষণিক সঙ্কেত পাঠান।"}
              </p>
            </div>
          </div>

          {/* Mission 6 */}
          <div
            onClick={() => setActiveTab("mission6")}
            className="glass-panel p-5 rounded-2xl hover:border-[#7C3AED]/30 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-[#7C3AED]/10 text-[#7C3AED] rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#7C3AED] transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-white mb-1">
                {lang === "en" ? "Kuddus Fact-Checker" : "কুদ্দুস ফ্যাক্ট চেকার"}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                {lang === "en" ? "Instantly verify fabricated rules." : "বানানো নিয়ম অফিশিয়াল রুলবুকে চেক করুন।"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
