import React from "react";
import { Users, Trash2 } from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission2SeatingPlannerProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  students: any[];
  seatLayoutData: any;
  m2Name: string;
  setM2Name: (val: string) => void;
  m2Roll: string;
  setM2Roll: (val: string) => void;
  m2Height: string;
  setM2Height: (val: string) => void;
  m2Impairment: string;
  setM2Impairment: (val: string) => void;
  handleStudentSubmit: (e: React.FormEvent) => void;
  handleDeleteStudent: (roll: number) => void;
}

export default function Mission2SeatingPlanner({
  t,
  lang,
  theme,
  students,
  seatLayoutData,
  m2Name,
  setM2Name,
  m2Roll,
  setM2Roll,
  m2Height,
  setM2Height,
  m2Impairment,
  setM2Impairment,
  handleStudentSubmit,
  handleDeleteStudent
}: Mission2SeatingPlannerProps) {
  return (
    <div id="mission2-view" className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m2Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m2Desc}
        </p>
      </div>

      {/* Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Student Records form */}
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-white">
            {lang === "en" ? "Add Student details" : "শিক্ষার্থীর তথ্য যুক্ত করুন"}
          </h3>

          <form onSubmit={handleStudentSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.m2FormName}
              </label>
              <input
                id="student-name"
                type="text"
                value={m2Name}
                onChange={e => setM2Name(e.target.value)}
                required
                placeholder="E.g., Fahim"
                className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500"
              />
            </div>

            {/* Roll & Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t.m2FormRoll}
                </label>
                <input
                  id="student-roll"
                  type="number"
                  value={m2Roll}
                  onChange={e => setM2Roll(e.target.value)}
                  required
                  placeholder="E.g., 5"
                  className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t.m2FormHeight}
                </label>
                <input
                  id="student-height"
                  type="number"
                  value={m2Height}
                  onChange={e => setM2Height(e.target.value)}
                  required
                  placeholder="E.g., 168"
                  className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Priority Needs */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.m2FormImpairment}
              </label>
              <select
                id="student-impairment"
                value={m2Impairment}
                onChange={e => setM2Impairment(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1220] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-200"
              >
                <option value="none">{t.m2NoImpairment}</option>
                <option value="hearing">{t.m2HearingImpairment}</option>
                <option value="vision">{t.m2VisionImpairment}</option>
              </select>
            </div>

            {/* Dynamic Desk Position Recommendation */}
            {m2Height && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <span>💡 Best Desk Position Recommendation</span>
                </div>
                <p className="text-slate-200">
                  Recommended Location: <strong className="text-blue-400">
                    {m2Impairment === "vision" || m2Impairment === "hearing"
                      ? "Row 1 (Front Row)"
                      : parseInt(m2Height) < 140
                      ? "Row 1 or 2 (Front/Middle-Front)"
                      : parseInt(m2Height) <= 155
                      ? "Row 2 or 3 (Middle Rows)"
                      : "Row 3 or 4 (Back Rows)"}
                  </strong>
                </p>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {m2Impairment === "vision"
                    ? "Priority is given due to Vision Impairment requirements for blackboard visibility."
                    : m2Impairment === "hearing"
                    ? "Priority is given due to Hearing Impairment requirements for teacher proximity."
                    : `Determined based on student height of ${m2Height}cm to maintain an optimal ascending line of sight for all classmates.`}
                </p>
              </div>
            )}

            <button
              id="add-student-btn"
              type="submit"
              className="w-full py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              {t.m2AddStudentBtn}
            </button>
          </form>

          {/* Student List section */}
          <div className="border-t border-white/5 pt-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-300">{t.m2StudentList}</h4>
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {students.map(student => (
                <div
                  key={student.roll}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200">
                      {student.name} (Roll: {student.roll})
                    </span>
                    <span className="text-slate-500 mt-0.5">
                      Height: {student.height} cm | Priority:{" "}
                      {student.impairment === "none"
                        ? "None"
                        : student.impairment === "hearing"
                        ? "Hearing"
                        : "Vision"}
                    </span>
                  </div>
                  <button
                    id={`delete-student-${student.roll}`}
                    onClick={() => handleDeleteStudent(student.roll)}
                    className="p-1.5 hover:bg-rose-500/15 rounded-lg text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Classroom layout visual display & line of sight score */}
        <div className="lg:col-span-2 space-y-8">
          {/* Line of Sight analysis card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                {t.m2LineOfSight}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                {seatLayoutData.isBlocked ? t.m2LosBlocked : t.m2LosGood}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {seatLayoutData.isBlocked
                  ? `⚠️ EXPOSED: Kuddus has placed tall boy ${seatLayoutData.blockedBy?.[0]?.name} in front row. Recalculating ascendency will prevent Kuddus sleeping.`
                  : "🟢 OPTIMIZED: The classroom grid ascending index forces Kuddus directly into clear sight. Sleeping blocked!"}
              </p>
            </div>

            {/* LOS Meter */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black font-mono text-blue-400">
                {seatLayoutData.lineOfSightScore}%
              </span>
              <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Sightline Integrity</span>
            </div>
          </div>

          {/* Interactive Grid UI */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            {/* Teacher's podium badge */}
            <div className="w-44 py-2 mx-auto bg-slate-500/10 border border-slate-500/20 rounded-lg text-center text-xs font-bold text-slate-300 flex items-center justify-center gap-2 shadow-inner">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              {t.m2TeacherPodium}
            </div>

            {/* 4x4 Seat Display Grid */}
            <div className="grid grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, rowIndex) =>
                  Array(4)
                    .fill(null)
                    .map((_, colIndex) => {
                      const studentInSeat = seatLayoutData.layout?.[rowIndex]?.[colIndex];
                      const isKuddus = studentInSeat?.roll === 4;
                      const hasPriority =
                        studentInSeat?.impairment === "vision" ||
                        studentInSeat?.impairment === "hearing";

                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`relative p-3.5 rounded-xl border flex flex-col justify-between aspect-video transition-all ${
                            isKuddus
                              ? "bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/10"
                              : studentInSeat
                              ? (theme === "dark" ? "bg-[#0B1220] border-white/5" : "bg-white border-black/5")
                              : "border-dashed border-slate-500/10"
                          }`}
                        >
                          <span className="absolute top-1 right-1 text-[9px] text-slate-500 font-mono">
                            {rowIndex === 0 ? "Front" : rowIndex === 3 ? "Back" : ""} R{rowIndex + 1}
                          </span>

                          {studentInSeat ? (
                            <>
                              <div className="flex flex-col">
                                <span
                                  className={`text-xs font-bold truncate ${
                                    isKuddus ? "text-rose-400" : "text-slate-200"
                                  }`}
                                >
                                  {studentInSeat.name}
                                </span>
                                <span className="text-[10px] text-slate-500 mt-1 font-mono">
                                  Roll: {studentInSeat.roll} | {studentInSeat.height}cm
                                </span>
                              </div>

                              {hasPriority && (
                                <span className="self-start mt-2 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-bold tracking-tight">
                                  Priority
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-[10px] text-slate-600 font-mono italic">Empty</span>
                            </div>
                          )}
                        </div>
                      );
                    })
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
