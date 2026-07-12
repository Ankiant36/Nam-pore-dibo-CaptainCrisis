import React from "react";
import { Flame, CheckCircle, MapPin } from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission5SOSRescueProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  m5Location: string;
  setM5Location: (val: string) => void;
  sosAlerts: any[];
  triggerSOSAlert: () => void;
  handleRescueAlert: (id: string) => void;
}

export default function Mission5SOSRescue({
  t,
  lang,
  theme,
  m5Location,
  setM5Location,
  sosAlerts,
  triggerSOSAlert,
  handleRescueAlert
}: Mission5SOSRescueProps) {
  return (
    <div id="mission5-view" className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-rose-500 animate-pulse" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m5Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m5Desc}
        </p>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Launch panic button */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between items-center text-center space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === "en" ? "Trapped / Cornered? Deploy Panic Flare" : "বিপদে পড়েছেন? জরুরী সঙ্কেত পাঠান"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Select your location from the directory below and hit the panic button. Biltu and Miltu will deploy to your coordinates immediately.
            </p>
          </div>

          {/* Location dropdown */}
          <div className="w-full max-w-xs">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest text-left">
              {t.m5SelectLocation}
            </label>
            <select
              id="sos-location"
              value={m5Location}
              onChange={e => setM5Location(e.target.value)}
              className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-rose-500 text-slate-200"
            >
              <option value="Corridor">Corridor (করিডোর)</option>
              <option value="Library">Library (লাইব্রেরি)</option>
              <option value="Playground">Playground (খেলার মাঠ)</option>
              <option value="Classroom">Classroom (ক্লাসরুম)</option>
              <option value="Canteen">Canteen (ক্যান্টিন)</option>
            </select>
          </div>

          {/* Huge red SOS button */}
          <button
            id="sos-button"
            onClick={triggerSOSAlert}
            className="w-48 h-48 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-black font-display text-2xl tracking-widest shadow-xl shadow-rose-600/30 flex items-center justify-center relative group overflow-hidden cursor-pointer active:scale-95 transition-all"
          >
            {/* Pulsing visual circles */}
            <span className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
            SOS
          </button>

          <p className="text-[10px] text-slate-500">
            🔒 Your identity is protected. Broadcast logs are fully client-side transient sandboxed.
          </p>
        </div>

        {/* Right Column: Captains Monitor Panel */}
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{t.m5ActiveAlerts}</h3>
            <span className="text-[10px] font-bold bg-[#111827] px-2.5 py-1 rounded-full border border-white/5 text-slate-400">
              {lang === "en" ? "Captains Terminal" : "ক্যাপ্টেনস মনিটর"}
            </span>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {sosAlerts.length === 0 ? (
              <div className="p-8 text-center bg-black/20 rounded-xl border border-white/5">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">{t.m5NoActiveAlerts}</p>
              </div>
            ) : (
              sosAlerts.map(alert => {
                const isActive = alert.status === "ACTIVE";
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                      isActive
                        ? "bg-rose-500/10 border-rose-500/30 animate-pulse"
                        : "bg-slate-500/5 border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className={`p-3 rounded-xl ${
                          isActive ? "bg-rose-500/20 text-rose-400" : "bg-slate-500/10 text-slate-400"
                        }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-200">
                          Location: {alert.location}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1">
                          Time:{" "}
                          {new Date(alert.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? "bg-rose-500/20 text-rose-400" : "bg-slate-500/15 text-slate-400"
                        }`}
                      >
                        {isActive ? t.m5StatusActive : t.m5StatusRescued}
                      </span>

                      {isActive && (
                        <button
                          id={`rescue-btn-${alert.id}`}
                          onClick={() => handleRescueAlert(alert.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                        >
                          {t.m5ActionRescue}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
