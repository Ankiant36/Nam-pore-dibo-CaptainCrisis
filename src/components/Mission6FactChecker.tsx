import React from "react";
import { Activity, Clock } from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission6FactCheckerProps {
  t: TranslationDict;
  lang: "en" | "bn";
  m6Claim: string;
  setM6Claim: (val: string) => void;
  m6Result: any;
  isVerifying: boolean;
  handleFactCheck: () => void;
}

export default function Mission6FactChecker({
  t,
  lang,
  m6Claim,
  setM6Claim,
  m6Result,
  isVerifying,
  handleFactCheck
}: Mission6FactCheckerProps) {
  return (
    <div id="mission6-view" className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-[#7C3AED]" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m6Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m6Desc}
        </p>
      </div>

      {/* Form split view */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">
            {lang === "en" ? "Verify Kuddus's claim rule" : "কুদ্দুসের দাবি করা নিয়ম যাচাই ক্ষেত্র"}
          </h3>

          {/* Pre-seed buttons */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setM6Claim("Kuddus claims class captains are completely exempt from mandatory school homework!")
              }
              className="px-3 py-1.5 bg-slate-500/10 hover:bg-slate-500/20 text-[11px] font-bold text-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              Homework claim (হোমওয়ার্ক)
            </button>
            <button
              onClick={() =>
                setM6Claim("Kuddus says the 2 Taka fee is a legal welfare fund contribution authorized by the headmaster.")
              }
              className="px-3 py-1.5 bg-slate-500/10 hover:bg-slate-500/20 text-[11px] font-bold text-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              Toll claim (চাঁদাবাজি)
            </button>
          </div>
        </div>

        <input
          id="claim-text"
          type="text"
          value={m6Claim}
          onChange={e => setM6Claim(e.target.value)}
          placeholder={t.m6FormClaimHelp}
          className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] text-slate-200 placeholder-slate-500"
        />

        <button
          id="verify-claim-btn"
          onClick={handleFactCheck}
          disabled={isVerifying}
          className="w-full py-3 bg-[#7C3AED] hover:bg-purple-600 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#7C3AED]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isVerifying ? (
            <>
              <Clock className="w-5 h-5 animate-spin" />
              <span>{t.m6Verifying}</span>
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              <span>{t.m6VerifyBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Verification results display */}
      {m6Result && (
        <div id="fact-checker-results" className="glass-panel p-6 rounded-2xl space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs text-[#7C3AED] font-bold uppercase tracking-wider block mb-1">
                {t.m6Verdict}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-extrabold tracking-widest uppercase border ${
                    m6Result.status === "TRUE"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse"
                  }`}
                >
                  Verdict: {m6Result.status}
                </span>
                <span className="text-xs text-slate-400">
                  {t.m6Confidence}: <strong className="text-white font-mono">{m6Result.confidence}%</strong>
                </span>
              </div>
            </div>

            <div className="bg-[#0B1220] px-4 py-2 rounded-xl border border-white/5 text-xs">
              {t.m6MatchingRule}: <strong className="text-purple-400">{m6Result.matchingRuleId}</strong>
            </div>
          </div>

          <div className="my-2 border-t border-white/5" />

          {/* Rule text quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-500/5 border border-white/5 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                {t.m6RuleQuote}
              </span>
              <blockquote className="text-xs font-mono text-slate-300 leading-relaxed italic border-l-2 border-purple-500 pl-3">
                "{m6Result.exactQuote}"
              </blockquote>
            </div>

            <div className="p-4 bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Intelligence Explanation
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                {m6Result.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
