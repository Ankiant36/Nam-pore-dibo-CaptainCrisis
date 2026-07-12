import React, { useRef } from "react";
import { ShieldAlert, Upload, Clock, Lock, Trash2, Eye } from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission1StrikePortalProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  strikeCount: number;
  warnings: number;
  handleComplaintSubmit: (e: React.FormEvent) => void;
  m1Category: string;
  setM1Category: (val: string) => void;
  m1Description: string;
  setM1Description: (val: string) => void;
  m1Roll: string;
  setM1Roll: (val: string) => void;
  m1EvidenceFile: File | null;
  setM1EvidenceFile: (val: File | null) => void;
  isStrippingExif: boolean;
  isExifStripped: boolean;
  handleFileDropSimulate: (file: File | string) => void;
  m1EvidenceName: string;
}

export default function Mission1StrikePortal({
  t,
  lang,
  theme,
  strikeCount,
  warnings,
  handleComplaintSubmit,
  m1Category,
  setM1Category,
  m1Description,
  setM1Description,
  m1Roll,
  setM1Roll,
  m1EvidenceFile,
  setM1EvidenceFile,
  isStrippingExif,
  isExifStripped,
  handleFileDropSimulate,
  m1EvidenceName
}: Mission1StrikePortalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileDropSimulate(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileDropSimulate(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="mission1-view" className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-rose-500" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m1Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m1Desc}
        </p>
      </div>

      {/* Main grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Strike submission form */}
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-white">
            {lang === "en" ? "Anonymous Submission Terminal" : "বেনামী অভিযোগ টার্মিনাল"}
          </h3>

          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            {/* Category selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.m1FormCategory}
              </label>
              <select
                id="complaint-category"
                value={m1Category}
                onChange={e => setM1Category(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-slate-200"
              >
                <option value="Tiffin Theft">Tiffin Theft (টিফিন চুরি)</option>
                <option value="Bribes">Bribes & Extortion (ঘুষ ও চাঁদা)</option>
                <option value="Syllabus Bloat">Syllabus Bloat (সিলেবাস কারচুপি)</option>
                <option value="PT Veto">PT Veto & Ludu (খেলা বাতিল)</option>
                <option value="Washroom Toll">Washroom Toll (ওয়াশরুম ট্যাক্স)</option>
                <option value="Other">Other Atrocities (অন্যান্য)</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.m1FormDesc}
              </label>
              <textarea
                id="complaint-description"
                value={m1Description}
                onChange={e => setM1Description(e.target.value)}
                required
                rows={4}
                placeholder={
                  lang === "en"
                    ? "E.g., Kuddus took 20% quality control tax on fried rice..."
                    : "যেমন: কুদ্দুস আমার স্যান্ডউইচ কেড়ে নিয়ে খেয়েছে..."
                }
                className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-slate-200 placeholder-slate-500"
              />
            </div>

            {/* Secret roll input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {t.m1FormRoll}
              </label>
              <input
                id="complaint-roll"
                type="number"
                value={m1Roll}
                onChange={e => setM1Roll(e.target.value)}
                required
                placeholder={lang === "en" ? "Enter your Roll Number (e.g., 14)" : "আপনার রোল নম্বর লিখুন (যেমন: ১৪)"}
                className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-slate-200 placeholder-slate-500"
              />
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                {t.m1FormRollHelp}
              </p>
            </div>

            {/* Submit */}
            <button
              id="submit-complaint-btn"
              type="submit"
              className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#7C3AED]/20 cursor-pointer"
            >
              {t.m1SubmitBtn}
            </button>
          </form>
        </div>

        {/* Right Column: Progress & EXIF Stripper */}
        <div className="space-y-8">
          {/* Progress Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {lang === "en" ? "Impeachment Progress Radar" : "বরখাস্তের অগ্রগতি মনিটর"}
            </h3>

            {/* Custom Strikes Graphic */}
            <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
              {[1, 2, 3].map(strike => {
                const isActive = strikeCount >= strike;
                return (
                  <div key={strike} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? "bg-rose-500/20 border-rose-500 text-rose-500 shadow-lg shadow-rose-500/20"
                          : "bg-slate-500/5 border-slate-500/20 text-slate-500"
                      }`}
                    >
                      <span className="font-mono font-bold text-sm">#{strike}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {strike === 3
                        ? (lang === "en" ? "IMPEACHMENT" : "বরখাস্ত")
                        : (lang === "en" ? `Strike ${strike}` : `স্ট্রাইক ${strike}`)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>{t.m1WarningsCount}: {warnings}/2</span>
                <span>{t.m1StrikesLeft}: {3 - strikeCount}</span>
              </div>
              <div className="w-full bg-slate-500/15 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-rose-500 h-full transition-all duration-500"
                  style={{ width: `${(strikeCount / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Drag-and-Drop Photo Evidence Card with Real Upload support */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Upload className="w-5 h-5" />
              <h3 className="text-md font-bold text-white">{t.m1EvidenceUpload}</h3>
            </div>

            {/* Hidden Input file selector */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drop area */}
            <div
              id="evidence-drop-zone"
              onClick={triggerFileSelect}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-500/20 hover:border-blue-500/40 p-8 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-[#0B1220]/50 hover:bg-[#0B1220]/80 transition-all text-center"
            >
              <Upload className="w-8 h-8 text-slate-500 mb-3" />
              <p className="text-xs text-slate-300 font-semibold mb-1">
                {lang === "en" ? "Drag & drop photograph here, or click to upload" : "আপনার তোলা ছবি এখানে ড্র্যাগ করে ছাড়ুন, অথবা সিলেক্ট করতে ক্লিক করুন"}
              </p>
              <p className="text-[10px] text-slate-500">{t.m1EvidenceHelp}</p>
            </div>

            {/* Real photo preview if uploaded */}
            {m1EvidenceFile && (
              <div className="p-4 bg-slate-500/5 border border-white/5 rounded-xl flex flex-col gap-3 relative overflow-hidden animate-fade-in">
                <span className="text-xs text-blue-400 font-mono flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  Real Evidence Photograph Preview:
                </span>
                <div className="relative rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={URL.createObjectURL(m1EvidenceFile)}
                    alt="Uploaded evidence preview"
                    className="w-full max-h-48 object-contain bg-black/40"
                  />
                </div>
                <p className="text-[9px] text-slate-500 leading-normal">
                  Note: The image is fully sanitized on load. EXIF camera details, location sensors, and original device timestamp arrays are deleted from raw memory before queue submission.
                </p>
              </div>
            )}

            {isStrippingExif && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-400 animate-pulse flex items-center gap-3">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Sanitizing image... Stripping EXIF tags, GPS coordinate, & timestamp signatures...</span>
              </div>
            )}

            {isExifStripped && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-3">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">{t.m1ExifStripped}</p>
                  <p className="text-[10px] text-emerald-500/80 mt-0.5">Sanitized Filename: {m1EvidenceName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
