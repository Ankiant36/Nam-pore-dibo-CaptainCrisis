import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Clock, 
  CheckCircle, 
  Trash2, 
  Mic, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  FileUp, 
  FileText, 
  Award, 
  Trophy,
  Check,
  ChevronRight,
  Eye,
  RefreshCw,
  Send,
  MessageSquare
} from "lucide-react";
import { TranslationDict } from "../translations";

interface Mission3SyllabusNegotiatorProps {
  t: TranslationDict;
  lang: "en" | "bn";
  theme: "dark" | "light";
  m3Text: string;
  setM3Text: (val: string) => void;
  m3Result: any;
  isNegotiating: boolean;
  handleSyllabusNegotiate: () => void;
  questionCount?: number;
  setQuestionCount?: (val: number) => void;
}

export default function Mission3SyllabusNegotiator({
  t,
  lang,
  theme,
  m3Text,
  setM3Text,
  m3Result,
  isNegotiating,
  handleSyllabusNegotiate,
  questionCount = 5,
  setQuestionCount
}: Mission3SyllabusNegotiatorProps) {
  // Speech & Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive Voice Chatbot States
  const [voiceMessages, setVoiceMessages] = useState<Array<{ sender: "user" | "ai"; text: string; time: string }>>([
    {
      sender: "ai",
      text: lang === "en"
        ? "Hey there! I am your Class 7-B AI Syllabus Companion. Click the microphone to talk, or write down your question. I will reply and speak back to you out loud!"
        : "হে দোস্ত! আমি তোমার ক্লাস ৭-বি এর এআই সিলেবাস সহচর। কথা বলতে মাইক্রোফোনে চাপ দাও বা তোমার প্রশ্ন লেখো। আমি উত্তর মুখে বলে দেব!"
    }
  ]);
  const [chatInputText, setChatInputText] = useState("");
  const [isAssistantListening, setIsAssistantListening] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // File Upload states for Syllabus
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);

  // Interactive Tracker states
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
  const [notesFlipped, setNotesFlipped] = useState<Record<number, boolean>>({});

  // Clean speaking on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speech-to-Text for Voice Chat
  const startAssistantSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === "en" ? "Speech recognition is not supported in this browser. Please use Chrome or Edge." : "স্পিচ রিকগনিশন আপনার ব্রাউজারে সাপোর্ট করে না। দয়া করে ক্রোম বা এজ ব্যবহার করুন।");
      return;
    }

    if (isAssistantListening) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "en" ? "en-US" : "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsAssistantListening(true);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsAssistantSpeaking(false);
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsAssistantListening(false);
      if (transcript.trim()) {
        sendVoiceMessage(transcript);
      }
    };

    recognition.onerror = () => {
      setIsAssistantListening(false);
    };

    recognition.onend = () => {
      setIsAssistantListening(false);
    };

    recognition.start();
  };

  // Text-to-Speech specifically for Voice Chat answers
  const speakAssistantText = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    const containsBangla = /[\u0980-\u09FF]/.test(text);
    utterance.lang = containsBangla ? "bn-BD" : "en-US";
    utterance.rate = containsBangla ? 0.95 : 1.0;

    utterance.onstart = () => {
      setIsAssistantSpeaking(true);
    };
    utterance.onend = () => {
      setIsAssistantSpeaking(false);
    };
    utterance.onerror = () => {
      setIsAssistantSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Send a user message to backend and get response
  const sendVoiceMessage = async (textToSend?: string) => {
    const finalMsg = (textToSend || chatInputText).trim();
    if (!finalMsg) return;

    // Clear input
    setChatInputText("");

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg = { sender: "user" as const, text: finalMsg, time: userTime };
    setVoiceMessages(prev => [...prev, newUserMsg]);
    setIsAssistantLoading(true);

    try {
      const res = await fetch("/api/voice-assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMsg, lang })
      });

      const data = await res.json();
      const aiResponseText = data.response || "No response received.";
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setVoiceMessages(prev => [...prev, { sender: "ai" as const, text: aiResponseText, time: aiTime }]);
      setIsAssistantLoading(false);

      // Speak back the AI response immediately!
      speakAssistantText(aiResponseText);
    } catch (err) {
      console.warn("Failed to talk to voice chatbot:", err);
      setIsAssistantLoading(false);
      const aiResponseText = lang === "en" 
        ? "Network error. Make sure our anti-Kuddus server is running!" 
        : "সার্ভারে সমস্যা হচ্ছে। কুদ্দুস কি ইন্টারনেট বন্ধ করে দিল?";
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setVoiceMessages(prev => [...prev, { sender: "ai" as const, text: aiResponseText, time: aiTime }]);
      speakAssistantText(aiResponseText);
    }
  };

  // Reset trackers when a new result is negotiated
  useEffect(() => {
    setCompletedTasks({});
    setNotesFlipped({});
    setSelectedAnswers({});
    setActiveQuestionIndex(0);
  }, [m3Result]);

  // Speech-to-Text (STT) implementation
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === "en" ? "Speech recognition is not supported in this browser. Please use Chrome or Edge." : "স্পিচ রিকগনিশন আপনার ব্রাউজারে সাপোর্ট করে না। দয়া করে ক্রোম বা এজ ব্যবহার করুন।");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "en" ? "en-US" : "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setM3Text(m3Text ? m3Text + " " + transcript : transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-to-Speech (TTS) implementation
  const toggleSpeakText = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Auto-detect lang based on contents
    const containsBangla = /[\u0980-\u09FF]/.test(text);
    utterance.lang = containsBangla ? "bn-BD" : "en-US";
    utterance.rate = containsBangla ? 0.95 : 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Clean speaking on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle syllabus paper upload / OCR
  const handleSyllabusFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSyllabusFile(file);
      setIsOcrProcessing(true);

      // Simulate AI Vision OCR processing
      setTimeout(() => {
        setIsOcrProcessing(false);
        const fileNameLower = file.name.toLowerCase();
        let simulatedText = "";

        if (fileNameLower.includes("math")) {
          simulatedText = "Math Quiz Syllabus: Chapter 1 (Set theory), Chapter 2 (Subsets), Chapter 3 (Integers), Chapter 4 (Algebraic fractions) up to Chapter 10. Page 2 has the mathematician biography of Sir Isaac Newton and Page 140 has book print barcode #8903829.";
        } else if (fileNameLower.includes("science") || fileNameLower.includes("phy")) {
          simulatedText = "General Science Class Syllabus: Chapter 4 (Light & Optics), Chapter 5 (Sound energy), and Chapter 6 (Force). Includes drawing all 15 scientific experimental layouts on page 84 and reciting the book printing copyright text.";
        } else {
          simulatedText = `Scanned Syllabus [${file.name}]: Chapter 2 to Chapter 8. Requires writing all summaries, index list, page counts, and textbook author biographies on page 3.`;
        }

        setM3Text(simulatedText);
      }, 1800);
    }
  };

  // Compute stats for progress tracking
  const totalTasks = m3Result?.studySchedule?.length || 0;
  const completedTasksCount = Object.keys(completedTasks).filter(k => completedTasks[Number(k)]).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  // Compute quiz accuracy
  const quizLength = m3Result?.mockQuestions?.length || 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.keys(selectedAnswers).reduce((acc, qIdx) => {
    const q = m3Result?.mockQuestions[Number(qIdx)];
    if (q && selectedAnswers[Number(qIdx)] === q.correctOptionIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div id="mission3-view" className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-teal-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white">{t.m3Title}</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t.m3Desc}
        </p>
      </div>

      {/* 2-Column Responsive Layout for Syllabus Input & Voice Companion Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Monstrous Syllabus Input Field & OCR Upload */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {lang === "en" ? "Monstrous Syllabus Statement" : "দানবীয় সিলেবাস ইনপুট ক্ষেত্র"}
                </h3>
                <span className="text-xs text-teal-400 font-mono font-bold bg-teal-500/10 px-2 py-1 rounded">
                  AI Active
                </span>
              </div>

              {/* File and Photo Syllabus Upload Option */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Syllabus file click upload zone */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-800/80 hover:border-teal-500/30 p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-[#070B14] hover:bg-[#0A1222] transition-all text-center"
                >
                  <input 
                    type="file" 
                    accept="image/*,application/pdf,.txt" 
                    ref={fileInputRef} 
                    onChange={handleSyllabusFileChange} 
                    className="hidden" 
                  />
                  <FileUp className="w-6 h-6 text-teal-500 mb-2" />
                  <p className="text-xs font-bold text-slate-300">
                    {lang === "en" ? "Upload Syllabus Photo / Document" : "সিলেবাস ছবি বা ফাইল আপলোড করুন"}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Supports JPG, PNG, PDF, TXT (Simulates visual OCR)
                  </p>
                </div>

                {/* Voice to AI input control */}
                <div 
                  onClick={startSpeechRecognition}
                  className={`border-2 border-dashed p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all text-center ${
                    isListening 
                      ? "border-rose-500 bg-rose-500/5 animate-pulse" 
                      : "border-zinc-800/80 hover:border-teal-500/30 bg-[#070B14] hover:bg-[#0A1222]"
                  }`}
                >
                  <Mic className={`w-6 h-6 mb-2 ${isListening ? "text-rose-500" : "text-teal-500"}`} />
                  <p className="text-xs font-bold text-slate-300">
                    {isListening 
                      ? (lang === "en" ? "Listening to your dictation... Click to Stop" : "ডিকটেশন শোনা হচ্ছে... থামাতে ক্লিক করুন")
                      : (lang === "en" ? "Dictate via Voice (Voice to AI)" : "ভয়েস ডিকটেশন (ভয়েস টু এআই)")
                    }
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    {lang === "en" ? "Dictate syllabus details out loud" : "মুখে সিলেবাস বলুন, এআই স্বয়ংক্রিয় টাইপ করবে"}
                  </p>
                </div>
              </div>

              {/* Visual OCR Scanning effect */}
              {isOcrProcessing && (
                <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-xs text-teal-400 animate-pulse flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning upload document... Extracting syllabus tables and stripping author biographies...</span>
                </div>
              )}

              {/* Text Input area */}
              <div className="relative">
                <textarea
                  id="syllabus-statement"
                  value={m3Text}
                  onChange={e => setM3Text(e.target.value)}
                  rows={4}
                  placeholder={t.m3Placeholder}
                  className="w-full px-4 py-3 bg-[#070B14] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-teal-500 text-slate-200 placeholder-slate-500 font-sans"
                />
                {syllabusFile && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-zinc-900/90 border border-white/10 text-[9px] text-slate-400 font-mono px-2 py-1 rounded">
                    <FileText className="w-3 h-3 text-teal-400" />
                    <span className="truncate max-w-[120px]">{syllabusFile.name}</span>
                  </div>
                )}
              </div>

              {/* Practice Quiz Length Selector */}
              <div className="space-y-2 mt-4 bg-teal-500/5 border border-teal-500/10 p-3.5 rounded-xl">
                <label className="text-xs font-bold text-teal-400 block">
                  {lang === "en" ? "Practice Quiz Length:" : "কুইজের প্রশ্ন সংখ্যা:"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[3, 5, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount && setQuestionCount(num)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border transition-all cursor-pointer ${
                        questionCount === num
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/40 shadow-sm"
                          : "bg-[#070B14] text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-300"
                      }`}
                    >
                      {num} {lang === "en" ? "Questions" : "টি প্রশ্ন"}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-500">
                  {lang === "en" 
                    ? "Gemini will generate exactly this many questions and matching study flashcards." 
                    : "জেমিনি ঠিক এই কয়টি প্রশ্ন এবং সাথে মিলিয়ে স্টাডি ফ্ল্যাশকার্ড তৈরি করবে।"}
                </p>
              </div>
            </div>

            {/* Negotiation Button */}
            <button
              id="negotiate-syllabus-btn"
              onClick={handleSyllabusNegotiate}
              disabled={isNegotiating}
              className="w-full mt-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isNegotiating ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>{t.m3Negotiating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.m3NegotiateBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: 🎙️ Voice AI Assistant Chat Bot */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-6 rounded-2xl h-[480px] flex flex-col justify-between border border-teal-500/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-400 relative">
                  <MessageSquare className="w-4 h-4" />
                  {isAssistantSpeaking && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                    {lang === "en" ? "Voice AI Companion" : "ভয়েস এআই সহকারী"}
                    {isAssistantSpeaking && (
                      <span className="text-[9px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded animate-pulse">
                        {lang === "en" ? "Speaking" : "বলছে"}
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-zinc-500">
                    {lang === "en" ? "Interactive Speech & Sound Sync" : "স্পিচ ও সাউন্ড সিনক্রোনাইজড চ্যাট"}
                  </p>
                </div>
              </div>

              {/* Mute toggle button */}
              <button
                onClick={() => {
                  setIsMuted(prev => !prev);
                  if (!isMuted && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    setIsAssistantSpeaking(false);
                  }
                }}
                className={`p-2 rounded-lg transition-all ${
                  isMuted ? "bg-rose-500/10 text-rose-400" : "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20"
                }`}
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Chat Messages Scrolling Window */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-[220px]" style={{ scrollbarWidth: "thin" }}>
              {voiceMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-teal-600 text-white rounded-br-none"
                        : "bg-[#070B14] border border-white/5 text-slate-300 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isAssistantLoading && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="bg-[#070B14] border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Active Voice Equalizer Wave when listening or speaking */}
            {(isAssistantListening || isAssistantSpeaking) && (
              <div className="pb-3 flex items-center justify-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-teal-500 ${
                      isAssistantListening ? "animate-pulse" : "animate-bounce"
                    }`}
                    style={{
                      height: `${12 + Math.sin(i + 1) * 16}px`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: isAssistantListening ? "1s" : "0.6s"
                    }}
                  />
                ))}
              </div>
            )}

            {/* Chat Input Bar */}
            <div className="flex items-center gap-2 border-t border-white/5 pt-3">
              {/* Voice Rec / Mic Button */}
              <button
                onClick={startAssistantSpeechRecognition}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  isAssistantListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-[#070B14] hover:bg-teal-500/10 text-teal-400 border border-teal-500/20"
                }`}
                title={lang === "en" ? "Speak to AI Assistant" : "মুখে কথা বলুন"}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={chatInputText}
                onChange={e => setChatInputText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") sendVoiceMessage();
                }}
                placeholder={
                  isAssistantListening
                    ? (lang === "en" ? "Listening to voice..." : "কথা শুনছি...")
                    : (lang === "en" ? "Ask companion a question..." : "সহকারীকে প্রশ্ন করুন...")
                }
                disabled={isAssistantListening}
                className="flex-1 bg-[#070B14] border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />

              <button
                onClick={() => sendVoiceMessage()}
                disabled={isAssistantListening || !chatInputText.trim()}
                className="p-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* AI Outputs */}
      {m3Result && (
        <div className="space-y-8">
          {/* Study Progress Tracker Dashboard */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden animate-fade-in border border-zinc-800/50">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-white uppercase tracking-wider">
                    {lang === "en" ? "Study Progress Tracker" : "স্টাডি প্রগ্রেস ট্র্যাকার"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === "en" ? "Track your study accomplishments and quiz scores dynamically" : "আপনার সিলেবাস শেষ করার অগ্রগতি এবং কুইজের স্কোর ট্র্যাক করুন"}
                  </p>
                </div>
              </div>

              {/* Dynamic Readiness Score */}
              <div className="flex items-center gap-4 bg-zinc-900/80 p-3 rounded-xl border border-white/5 self-start md:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono font-bold text-teal-400 block tracking-widest">
                    CLASS READINESS LEVEL
                  </span>
                  <span className="text-lg font-black text-white">
                    {progressPercent}% Complete
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-teal-500/20 flex items-center justify-center font-bold text-sm text-teal-400 font-mono relative">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-500 transition-all duration-300" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${progressPercent}%, 0 ${progressPercent}%)` }} />
                  {progressPercent}
                </div>
              </div>
            </div>

            {/* Overall progress visual bar */}
            <div className="mt-6 space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>{lang === "en" ? "Tasks checked" : "সম্পন্ন করা ধাপসমূহ"}: {completedTasksCount} of {totalTasks}</span>
                <span>{lang === "en" ? "Quiz accuracy" : "কুইজের সঠিকতা"}: {answeredCount > 0 ? `${correctCount}/${answeredCount}` : "0"}</span>
              </div>
              <div className="w-full bg-slate-500/15 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div id="syllabus-ai-results" className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Left Panel: Topics Filtered & Trash weeded out */}
            <div className="glass-panel p-6 rounded-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block mb-1">
                      Syllabus Intelligence Summary
                    </span>
                    <h3 className="text-md font-semibold text-white leading-relaxed font-sans">
                      {m3Result.summary}
                    </h3>
                  </div>
                  {/* TTS Button */}
                  <button
                    onClick={() => toggleSpeakText(m3Result.summary)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isSpeaking 
                        ? "bg-rose-500/20 border-rose-500 text-rose-500" 
                        : "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20"
                    }`}
                    title={lang === "en" ? "Listen to summary voice" : "ভয়েসের মাধ্যমে শুনুন"}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
                  </button>
                </div>

                {/* Topics */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {t.m3CleanTopics}
                  </h4>
                  <div className="space-y-2">
                    {m3Result.cleanTopics?.map((topic: string, i: number) => (
                      <div key={i} className="flex gap-3 items-center text-sm p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-emerald-300">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trash */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-rose-400">
                    {t.m3WeededTrash}
                  </h4>
                  <div className="space-y-2">
                    {m3Result.trashWeeded?.map((trash: string, i: number) => (
                      <div key={i} className="flex gap-3 items-center text-sm p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-rose-300/70 line-through">
                        <Trash2 className="w-4 h-4 flex-shrink-0" />
                        <span>{trash}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Smart Study Countdown Schedule with checks */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-lg font-bold text-white">
                  {lang === "en" ? `${totalTasks}-Day Countdown Study Planner` : `${totalTasks} দিনের স্মার্ট স্টাডি প্ল্যান`}
                </h3>
                <span className="text-xs font-bold text-zinc-500 font-mono">
                  {lang === "en" ? "Click days to complete" : "ধাপগুলোতে ক্লিক করে সম্পন্ন করুন"}
                </span>
              </div>

              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-[2px] before:bg-white/5">
                {m3Result.studySchedule?.map((schedule: any, i: number) => {
                  const isDone = !!completedTasks[i];
                  return (
                    <div key={i} className="flex gap-6 items-start relative pl-8">
                      {/* Checkbox button */}
                      <button
                        onClick={() => {
                          setCompletedTasks(prev => ({
                            ...prev,
                            [i]: !prev[i]
                          }));
                        }}
                        className={`absolute left-1 top-1.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                          isDone 
                            ? "bg-teal-500 border-teal-600 text-white shadow-md shadow-teal-500/20" 
                            : "border-zinc-700 bg-zinc-900/50 hover:border-teal-500 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <div 
                        onClick={() => {
                          setCompletedTasks(prev => ({
                            ...prev,
                            [i]: !prev[i]
                          }));
                        }}
                        className={`p-4 rounded-xl border flex-1 flex flex-col md:flex-row justify-between md:items-center gap-2 cursor-pointer transition-all ${
                          isDone 
                            ? "bg-teal-950/20 border-teal-500/40 opacity-70" 
                            : "bg-black/20 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div>
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isDone ? "text-teal-400 line-through" : "text-teal-400"}`}>
                            {schedule.day}
                          </span>
                          <h4 className={`text-sm font-semibold mt-0.5 ${isDone ? "text-slate-500 line-through" : "text-slate-200"}`}>
                            {schedule.task}
                          </h4>
                        </div>
                        <span className="self-start md:self-center text-[10px] bg-slate-500/15 text-slate-400 font-bold px-2 py-1 rounded">
                          {schedule.timeNeeded}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Notes Generator - Flashcards */}
          {m3Result.studyNotes && m3Result.studyNotes.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-400 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">
                    {lang === "en" ? "AI Generated Notes & Study Cards" : "এআই জেনারেটেড সংক্ষিপ্ত নোট ও স্টাডি কার্ড"}
                  </h3>
                </div>
                <span className="text-xs text-zinc-500 font-mono">
                  {lang === "en" ? "Click to flip card" : "কার্ডে ক্লিক করে বিস্তারিত দেখুন"}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {m3Result.studyNotes.map((note: any, idx: number) => {
                  const isFlipped = !!notesFlipped[idx];
                  return (
                    <div 
                      key={idx}
                      onClick={() => setNotesFlipped(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="group h-40 [perspective:1000px] cursor-pointer"
                    >
                      <div className={`relative h-full w-full rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] ${
                        isFlipped 
                          ? "[transform:rotateY(180deg)] border-teal-500/30 bg-teal-950/20" 
                          : "border-white/5 bg-[#070B14] hover:border-teal-500/20"
                      }`}>
                        {/* Front Side */}
                        <div className="absolute inset-0 h-full w-full rounded-2xl p-5 flex flex-col justify-between [backface-visibility:hidden]">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-teal-500 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded">
                              FLASHCARD #{idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-3 line-clamp-2">
                              {note.title}
                            </h4>
                          </div>
                          <span className="text-[10px] text-zinc-500 flex items-center gap-1 group-hover:text-teal-400 transition-colors">
                            {lang === "en" ? "Reveal study note" : "নোটটি দেখুন"}
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Back Side */}
                        <div className="absolute inset-0 h-full w-full rounded-2xl p-5 bg-teal-950/10 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                              KEY CONCEPT
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed pt-1">
                              {note.content}
                            </p>
                          </div>
                          <span className="text-[9px] text-teal-500 font-bold uppercase mt-2">
                            {lang === "en" ? "Click to Flip Back" : "ফ্লিপ ব্যাক করতে ক্লিক করুন"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Quiz Prep with Dynamic questions count */}
          {m3Result.mockQuestions && m3Result.mockQuestions.length > 0 && (
            <div id="syllabus-mock-quiz" className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden animate-fade-in border border-zinc-800/50 shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
                  <h3 className="text-lg font-bold text-white">
                    {lang === "en" ? "AI Prep Quiz & Practice Arena" : "এআই প্রস্তুতি কুইজ ও প্র্যাকটিস এরিনা"}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded">
                  Question {activeQuestionIndex + 1} of {m3Result.mockQuestions.length}
                </span>
              </div>

              {/* Active Question Panel */}
              {(() => {
                const q = m3Result.mockQuestions[activeQuestionIndex];
                if (!q) return null;
                const selectedOpt = selectedAnswers[activeQuestionIndex];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div className="space-y-4">
                    <h4 className="text-sm md:text-base font-semibold text-slate-100 leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {q.options.map((option: string, oIdx: number) => {
                        let btnStyle = "bg-[#070B14] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10";
                        
                        if (isAnswered) {
                          if (oIdx === q.correctOptionIndex) {
                            btnStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium";
                          } else if (oIdx === selectedOpt) {
                            btnStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300";
                          } else {
                            btnStyle = "bg-[#070B14] border-white/5 text-slate-500 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => {
                              setSelectedAnswers(prev => ({ ...prev, [activeQuestionIndex]: oIdx }));
                            }}
                            className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all duration-200 flex items-start gap-3 disabled:cursor-not-allowed cursor-pointer ${btnStyle}`}
                          >
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/10 font-mono text-[10px] flex items-center justify-center border border-white/5 text-slate-400">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-snug">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation & Feedback */}
                    {isAnswered && (
                      <div className={`p-4 rounded-xl border animate-fade-in leading-relaxed ${
                        selectedOpt === q.correctOptionIndex 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                          : "bg-rose-500/5 border-rose-500/20 text-rose-300"
                      }`}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">
                          {selectedOpt === q.correctOptionIndex 
                            ? (lang === "en" ? "✓ Correct Answer!" : "✓ সঠিক উত্তর!") 
                            : (lang === "en" ? "✗ Incorrect Answer" : "✗ ভুল উত্তর")}
                        </p>
                        <p className="text-xs md:text-sm text-slate-300">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <button
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                >
                  {lang === "en" ? "← Previous" : "← পূর্ববর্তী"}
                </button>
                
                {/* Reset Quiz Button */}
                {Object.keys(selectedAnswers).length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setActiveQuestionIndex(0);
                    }}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-mono tracking-wider font-bold text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                  >
                    {lang === "en" ? "RESET QUIZ" : "কুইজ রিসেট"}
                  </button>
                )}

                <button
                  disabled={activeQuestionIndex === m3Result.mockQuestions.length - 1}
                  onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Next →" : "পরবর্তী →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
