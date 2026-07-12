import React from "react";
import { Coins, Sparkles, Flame } from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission4CorruptLedgerProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  ledgerData: any;
  m4Type: string;
  setM4Type: (val: string) => void;
  m4Amount: string;
  setM4Amount: (val: string) => void;
  m4Item: string;
  setM4Item: (val: string) => void;
  m4Calories: string;
  setM4Calories: (val: string) => void;
  handleLedgerSubmit: (e: React.FormEvent) => void;
}

export default function Mission4CorruptLedger({
  t,
  lang,
  theme,
  ledgerData,
  m4Type,
  setM4Type,
  m4Amount,
  setM4Amount,
  m4Item,
  setM4Item,
  m4Calories,
  setM4Calories,
  handleLedgerSubmit
}: Mission4CorruptLedgerProps) {
  // Dynamically calculate Week 4 metrics based on user submissions in the session
  const basePreSeededCash = 51;
  const basePreSeededFood = 3;

  // Added amount calculation
  const addedCash = Math.max(0, (ledgerData.totalCashExtorted || 0) - basePreSeededCash);
  const addedFood = Math.max(0, (ledgerData.totalFoodItems || 0) - basePreSeededFood);

  // Weekly data mapping
  const w1Cash = 4;
  const w2Cash = 6;
  const w3Cash = 10;
  const w4Cash = 12 + addedCash; // Week 4 goes up dynamically as user logs entries!

  const w1Food = 1;
  const w2Food = 1.2;
  const w3Food = 2;
  const w4Food = 3 + addedFood; // Week 4 food items count goes up dynamically!

  // Define graph scaling limits
  const maxGraphCash = Math.max(30, w4Cash + 5);
  const maxGraphFood = Math.max(10, w4Food + 2);

  // SVG Coordinates mapping (where Y=100 is bottom, Y=0 is top)
  const y1Cash = 100 - (w1Cash / maxGraphCash) * 100;
  const y2Cash = 100 - (w2Cash / maxGraphCash) * 100;
  const y3Cash = 100 - (w3Cash / maxGraphCash) * 100;
  const y4Cash = 100 - (w4Cash / maxGraphCash) * 100;

  const y1Food = 100 - (w1Food / maxGraphFood) * 100;
  const y2Food = 100 - (w2Food / maxGraphFood) * 100;
  const y3Food = 100 - (w3Food / maxGraphFood) * 100;
  const y4Food = 100 - (w4Food / maxGraphFood) * 100;

  return (
    <div id="mission4-view" className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D9488]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <Coins className="w-6 h-6 text-[#0D9488]" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m4Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m4Desc}
        </p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Cash */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
              Total Cash Extorted
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-[#10B981]">
              ৳{ledgerData.totalCashExtorted}
            </h3>
            <p className="text-[11px] text-slate-500 leading-normal">
              Total funds funneled into captain accounts
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl relative z-10">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Snacks */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
              Food Items Confiscated
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-teal-400">
              {ledgerData.totalFoodItems}
            </h3>
            <p className="text-[11px] text-slate-500 leading-normal">
              Singular snacks extorted from class tiffins
            </p>
          </div>
          <div className="p-3 bg-teal-500/10 text-teal-400 rounded-2xl relative z-10">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Calories */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
              Caloric Surplus
            </span>
            <h3 className="text-3xl font-black font-display tracking-tight text-emerald-400">
              +{ledgerData.caloricDisparity} kcal
            </h3>
            <p className="text-[11px] text-slate-500 leading-normal">
              Net thermodynamic gain with zero kinetic offset
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl relative z-10">
            <Flame className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid layout stats and charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form to log extortions */}
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-white">{t.m4AddEntry}</h3>

          <form onSubmit={handleLedgerSubmit} className="space-y-4">
            {/* Atrocity type */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Extortion Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="ledger-type-washroom"
                  type="button"
                  onClick={() => setM4Type("washroom_tax")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    m4Type === "washroom_tax"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-[#0B1220] border-white/5 text-slate-400"
                  }`}
                >
                  Washroom Tax (৳২)
                </button>
                <button
                  id="ledger-type-tiffin"
                  type="button"
                  onClick={() => setM4Type("tiffin_theft")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    m4Type === "tiffin_theft"
                      ? "bg-[#0D9488]/10 border-[#0D9488] text-teal-400"
                      : "bg-[#0B1220] border-white/5 text-slate-400"
                  }`}
                >
                  Tiffin Heist (৳২০%)
                </button>
              </div>
            </div>

            {/* Conditionals */}
            {m4Type === "tiffin_theft" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t.m4FormItem}
                  </label>
                  <input
                    id="ledger-item"
                    type="text"
                    value={m4Item}
                    onChange={e => setM4Item(e.target.value)}
                    required
                    placeholder="E.g., Chicken Sandwich"
                    className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#0D9488] text-slate-200 placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {t.m4FormAmount}
                    </label>
                    <input
                      id="ledger-amount"
                      type="number"
                      value={m4Amount}
                      onChange={e => setM4Amount(e.target.value)}
                      required
                      placeholder="E.g., 20"
                      className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#0D9488] text-slate-200 placeholder-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {t.m4FormCalories}
                    </label>
                    <input
                      id="ledger-calories"
                      type="number"
                      value={m4Calories}
                      onChange={e => setM4Calories(e.target.value)}
                      placeholder="E.g., 400"
                      className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#0D9488] text-slate-200 placeholder-slate-500"
                    />
                  </div>
                </div>
              </>
            )}

            {m4Type === "washroom_tax" && (
              <div className="p-4 bg-slate-500/5 rounded-xl text-xs text-slate-400 text-center border border-white/5">
                Standard washroom extortion fee: <strong className="text-white">2 Taka</strong> per break. Disguised under "Class Welfare Fund".
              </div>
            )}

            <button
              id="add-ledger-entry-btn"
              type="submit"
              className="w-full py-3 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              {t.m4AddEntry}
            </button>
          </form>

          {/* Ledger History List */}
          <div className="border-t border-white/5 pt-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-300">Transaction History</h4>
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {ledgerData.ledger?.map((entry: any) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-200">
                      {entry.type === "washroom_tax" ? "Washroom Toll" : entry.item}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {entry.calories ? `${entry.calories} kcal | ` : ""}
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">
                    ৳{entry.amountTaka}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right layout: Charts & Weaponry Conversions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Extortion Timeline Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden space-y-6">
            
            {/* Header info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black text-white">Extortion Timeline</h3>
                <p className="text-xs text-slate-400 mt-1">Weekly breakdown of cash and food item seizures</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Cash (৳)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Food Items
                </span>
              </div>
            </div>

            {/* Slider Navigation arrows */}
            <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 text-slate-400 hover:text-white transition-all flex items-center justify-center z-10 cursor-pointer">
              &lt;
            </button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 text-slate-400 hover:text-white transition-all flex items-center justify-center z-10 cursor-pointer">
              &gt;
            </button>

            {/* Graph Plotting */}
            <div className="h-60 w-full relative px-8 flex flex-col justify-between">
              
              {/* Background Grid Lines */}
              <div className="absolute inset-x-8 inset-y-0 flex flex-col justify-between pointer-events-none">
                {[15, 12, 9, 6, 3, 0].map(val => (
                  <div key={val} className="w-full flex items-center gap-3">
                    <span className="text-[9px] font-mono text-slate-600 w-4 text-right">{val}</span>
                    <div className="flex-1 border-b border-white/5" />
                  </div>
                ))}
              </div>

              {/* Curve drawings inside SVG */}
              <div className="flex-1 relative mt-2">
                <svg className="absolute inset-0 w-full h-full animate-pulse-subtle" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Green Curve - Cash */}
                  <path
                    d={`M 10,${y1Cash} C 30,${y2Cash} 40,${y2Cash} 50,${y2Cash} C 60,${y3Cash} 75,${y4Cash} 90,${y4Cash}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Teal Curve - Food Items */}
                  <path
                    d={`M 10,${y1Food} C 30,${y2Food} 40,${y2Food} 50,${y2Food} C 60,${y3Food} 75,${y4Food} 90,${y4Food}`}
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Intersecting vertical line for active Week 2 */}
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />

                  {/* Active Dots for Week 2 */}
                  <circle cx="50" cy={y2Cash} r="4.5" fill="#10B981" stroke="#0B1220" strokeWidth="2.5" />
                  <circle cx="50" cy={y2Food} r="4.5" fill="#0D9488" stroke="#0B1220" strokeWidth="2.5" />
                </svg>

                {/* Glowing Floating Tooltip on Week 2 */}
                <div 
                  style={{ left: "50%", top: "40%" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#0B1220] border border-white/10 rounded-lg p-2 shadow-xl text-[10px] space-y-1 z-20 w-28 text-left transition-all duration-300"
                >
                  <p className="font-bold text-slate-300">Week 2 Record</p>
                  <p className="text-emerald-400 font-semibold">Cash (৳): 6</p>
                  <p className="text-teal-400 font-semibold">Food Items: 1</p>
                </div>
              </div>

              {/* X-Axis labels */}
              <div className="h-6 flex justify-between px-8 text-[9px] font-mono text-slate-500 pt-1 border-t border-white/5">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
          </div>

          {/* Bottom Row - Split buy power and Corruption Index */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* What Kuddus Could Buy Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What Kuddus Could Buy
              </h3>
              
              <div className="space-y-4">
                {/* Product 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 font-bold">Premium Jhalmuri Packs</span>
                    <span className="text-teal-400 font-bold">
                      {Math.floor(ledgerData.totalCashExtorted / 5)} / 100 Packs
                    </span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(100, (ledgerData.totalCashExtorted / 500) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Product 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 font-bold">Cricket Bats</span>
                    <span className="text-emerald-400 font-bold">
                      {ledgerData.conversions?.cricketBatsCount || 0} / 120 Taka
                    </span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(100, (ledgerData.totalCashExtorted / 120) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Corruption Index Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Corruption Index
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rising 15% week over week. All caloric intake has zero kinetic displacement due to Kuddus vetoing physical training classes.
                </p>
              </div>

              {/* Sparkline chart bar representation using emerald/teal */}
              <div className="flex justify-end gap-2 items-end pt-4">
                <div className="w-5 h-6 bg-slate-800 rounded-sm" />
                <div className="w-5 h-10 bg-slate-800 rounded-sm" />
                <div className="w-5 h-14 bg-teal-500/30 rounded-sm" />
                <div className="w-5 h-20 bg-emerald-500/80 rounded-sm animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
