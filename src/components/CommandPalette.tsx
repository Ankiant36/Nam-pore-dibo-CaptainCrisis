import React from "react";
import { Command } from "lucide-react";
import { TranslationDict } from "../translations";

interface CommandPaletteProps {
  lang: "en" | "bn";
  t: TranslationDict;
  commandInput: string;
  setCommandInput: (val: string) => void;
  setShowCommandPalette: (val: boolean) => void;
  executeCommand: (cmd: string) => void;
}

export default function CommandPalette({
  lang,
  t,
  commandInput,
  setCommandInput,
  setShowCommandPalette,
  executeCommand
}: CommandPaletteProps) {
  return (
    <div
      id="command-palette-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-6 pt-32"
      onClick={() => setShowCommandPalette(false)}
    >
      <div
        className="w-full max-w-xl bg-[#111827] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-slide-in-down"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <Command className="w-5 h-5 text-slate-400" />
          <input
            id="command-palette-input"
            type="text"
            autoFocus
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder={lang === "en" ? "Type a command or mission title (e.g., 'Mission 1')..." : "কমান্ড লিখুন (যেমন: 'Mission 2')..."}
            className="w-full bg-transparent border-none text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
            onKeyDown={e => {
              if (e.key === "Enter") {
                executeCommand(commandInput);
              }
            }}
          />
        </div>
        <div className="p-4 bg-black/10 text-xs text-slate-400 space-y-3">
          <span className="font-bold uppercase tracking-widest block text-[10px]">
            {t.commandPaletteTitle}
          </span>
          <ul className="space-y-2">
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 1")}>
              <span>Log Atrocity (Mission 1)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Strike</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 2")}>
              <span>Seating Planner (Mission 2)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Seat</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 3")}>
              <span>Syllabus Summarizer (Mission 3)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Syllabus</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 4")}>
              <span>Tiffin & Extortion Ledger (Mission 4)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Ledger</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 5")}>
              <span>Corridor Rescue SOS (Mission 5)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">SOS</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("Mission 6")}>
              <span>Fabricated Rules Checker (Mission 6)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Fact</kbd>
            </li>
            <div className="border-t border-white/5 my-2" />
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("theme")}>
              <span>Toggle Visual Dark/Light Theme</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Theme</kbd>
            </li>
            <li className="flex justify-between items-center hover:bg-white/5 p-2 rounded cursor-pointer" onClick={() => executeCommand("lang")}>
              <span>Toggle Language (English / বাংলা)</span>
              <kbd className="bg-slate-500/20 px-1 py-0.5 rounded text-[10px] font-mono">Lang</kbd>
            </li>
          </ul>
          <p className="text-[10px] text-slate-500 pt-2 border-t border-white/5">
            Press Enter to run command. Press Esc to exit.
          </p>
        </div>
      </div>
    </div>
  );
}
