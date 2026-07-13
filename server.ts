import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// ==========================================
// IN-MEMORY DATA STORES (SEED DATA)
// ==========================================

// Students of Class 7-B
interface Student {
  roll: number;
  name: string;
  height: number; // in cm
  impairment?: "vision" | "hearing" | "none";
}

let students: Student[] = [
  { roll: 1, name: "Biltu (2nd Captain)", height: 142, impairment: "none" },
  { roll: 2, name: "Miltu (3rd Captain)", height: 145, impairment: "none" },
  { roll: 3, name: "Safwan", height: 130, impairment: "none" },
  { roll: 4, name: "Kuddus (1st Captain)", height: 152, impairment: "none" },
  { roll: 5, name: "Fahim", height: 168, impairment: "none" },
  { roll: 6, name: "Tanvir", height: 165, impairment: "none" },
  { roll: 7, name: "Shuvo", height: 135, impairment: "hearing" },
  { roll: 8, name: "Mim", height: 138, impairment: "vision" },
  { roll: 9, name: "Sadia", height: 148, impairment: "none" },
  { roll: 10, name: "Rony", height: 150, impairment: "none" },
  { roll: 11, name: "Zeeshan", height: 162, impairment: "none" },
  { roll: 12, name: "Nabid", height: 140, impairment: "none" },
  { roll: 13, name: "Siyam", height: 158, impairment: "none" },
  { roll: 14, name: "Arpan", height: 161, impairment: "none" },
  { roll: 15, name: "Joy", height: 132, impairment: "none" },
];

// Complaints logged anonymously
interface Complaint {
  id: string;
  category: "Tiffin Theft" | "Bribes" | "Syllabus Bloat" | "PT Veto" | "Washroom Toll" | "Other";
  description: string;
  timestamp: string;
  rollNumberUsed: string; // Cryptographically masked or simply hashed
}

let complaints: Complaint[] = [];

// Ledgers of Kuddus's Extortions
interface LedgerEntry {
  id: string;
  type: "washroom_tax" | "tiffin_theft";
  amountTaka: number;
  item?: string;
  calories?: number;
  timestamp: string;
}

let ledger: LedgerEntry[] = [
  { id: "led-1", type: "washroom_tax", amountTaka: 2, timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString() },
  { id: "led-2", type: "washroom_tax", amountTaka: 2, timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString() },
  { id: "led-3", type: "tiffin_theft", amountTaka: 15, item: "Homemade Fried Rice", calories: 350, timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString() },
  { id: "led-4", type: "tiffin_theft", amountTaka: 20, item: "Chicken Sandwich", calories: 420, timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString() },
  { id: "led-5", type: "washroom_tax", amountTaka: 2, timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
  { id: "led-6", type: "tiffin_theft", amountTaka: 10, item: "Singara & Samosa", calories: 250, timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() },
];

// Active SOS Rescue flares
interface SOSAlert {
  id: string;
  location: "Library" | "Playground" | "Corridor" | "Classroom" | "Canteen";
  timestamp: string;
  status: "ACTIVE" | "RESCUED";
}

let sosAlerts: SOSAlert[] = [
  { id: "sos-1", location: "Corridor", timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), status: "RESCUED" }
];

// Pre-seeded School Rulebook
const RULEBOOK = [
  { id: "R101", title: "Democratic Captaincy", text: "All class decisions, including seating arrangements and exam schedules, must be approved by at least two out of the three student captains (1st, 2nd, and 3rd captains)." },
  { id: "R102", title: "Mandatory Homework Rule", text: "Homework is mandatory for all students, including class captains. No captain has the authority to exempt themselves or others from school assignments." },
  { id: "R103", title: "No Extortion in Class", text: "A class captain cannot enforce any taxes, levies, or tolls on fellow students. Any collection of money, tiffin or goods is strictly prohibited and constitutes extortion." },
  { id: "R104", title: "Height-Based Fair Seating", text: "Seating arrangements in the classroom must prioritize student physical needs (like vision or hearing impairment), followed by ascending order of height (shortest in the front, tallest in the back) to ensure a clear line of sight for all." },
  { id: "R105", title: "Washroom Access Liberty", text: "The washroom during school hours is a basic human right. No fees, tolls, or welfare fund contributions can be demanded for washroom access." },
  { id: "R106", title: "Sports Period Mandate", text: "Sports periods (PT) are intended for physical exercise. Organizing non-physical sports (like Ludu) to avoid physical activity is a direct violation of the physical education curriculum." }
];

// ==========================================
// GEMINI LAZY INITIALIZER
// ==========================================
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Go to Settings > Secrets to configure it.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Complaint / Warning Tracker API (Mission 1)
app.get("/api/complaints", (req, res) => {
  res.json({
    complaints,
    strikeCount: complaints.length,
    warnings: Math.min(2, complaints.length),
    isImpeached: complaints.length >= 3
  });
});

app.post("/api/complaints", (req, res) => {
  const { category, description, rollNumber } = req.body;
  if (!category || !description || !rollNumber) {
    return res.status(400).json({ error: "Missing required fields: category, description, rollNumber" });
  }

  // Cryptographically masked roll number (simple hash implementation for safety)
  const rollStr = String(rollNumber).trim();
  let hash = 0;
  for (let i = 0; i < rollStr.length; i++) {
    hash = (hash << 5) - hash + rollStr.charCodeAt(i);
    hash |= 0;
  }
  const maskedRoll = "masked_" + Math.abs(hash).toString(16);

  const newComplaint: Complaint = {
    id: `complaint-${Date.now()}`,
    category,
    description,
    timestamp: new Date().toISOString(),
    rollNumberUsed: maskedRoll
  };

  complaints.push(newComplaint);

  res.json({
    success: true,
    complaint: newComplaint,
    strikeCount: complaints.length,
    warnings: Math.min(2, complaints.length),
    isImpeached: complaints.length >= 3
  });
});

app.post("/api/complaints/reset", (req, res) => {
  complaints = [];
  res.json({ success: true, complaints, strikeCount: 0 });
});


// 2. Seating Planner API (Mission 2)
app.get("/api/seat-planner/students", (req, res) => {
  res.json(students);
});

app.post("/api/seat-planner/students", (req, res) => {
  const { name, roll, height, impairment } = req.body;
  if (!name || !roll || !height) {
    return res.status(400).json({ error: "Missing name, roll, or height" });
  }

  // Remove existing with same roll
  students = students.filter(s => s.roll !== parseInt(roll));

  const newStudent: Student = {
    roll: parseInt(roll),
    name,
    height: parseInt(height),
    impairment: impairment || "none"
  };

  students.push(newStudent);
  res.json({ success: true, students });
});

app.delete("/api/seat-planner/students/:roll", (req, res) => {
  const roll = parseInt(req.params.roll);
  students = students.filter(s => s.roll !== roll);
  res.json({ success: true, students });
});

// Compute grid arrangement
app.get("/api/seat-planner/layout", (req, res) => {
  const rows = 4;
  const cols = 4;

  // Let's create an advanced seating algorithm
  // Criteria 1: Students with vision or hearing impairments MUST be in Row 0 (front).
  // Criteria 2: Rest sorted by height ascending.
  // Criteria 3: Kuddus (Roll 4) tries to hide behind tall students. Let's see if Kuddus is blocked.

  const impaired = students.filter(s => s.impairment === "vision" || s.impairment === "hearing");
  const normal = students.filter(s => s.impairment !== "vision" && s.impairment !== "hearing");

  // Sort normal by height ascending
  normal.sort((a, b) => a.height - b.height);

  const finalLayout: (Student | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));

  // Let's place impaired students first in row 0
  let impairedIndex = 0;
  for (let c = 0; c < cols && impairedIndex < impaired.length; c++) {
    finalLayout[0][c] = impaired[impairedIndex++];
  }

  // Fill the remaining spots starting from row 0, then row 1, etc.
  let normalIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (finalLayout[r][c] === null) {
        if (normalIndex < normal.length) {
          finalLayout[r][c] = normal[normalIndex++];
        }
      }
    }
  }

  // Determine line-of-sight metrics:
  // Kuddus is Roll 4. Find where he is placed.
  let kuddusRow = -1;
  let kuddusCol = -1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (finalLayout[r][c]?.roll === 4) {
        kuddusRow = r;
        kuddusCol = c;
      }
    }
  }

  // Calculate Line of Sight Clarity for Kuddus
  // A clear line of sight means Kuddus is visible to the teacher (stationed at the front, row -1, centered).
  // If there's anyone sitting directly in front of him (rows < kuddusRow in the same column) who is taller than him,
  // then Kuddus's visibility drops.
  let isBlocked = false;
  let blockedBy: Student[] = [];
  if (kuddusRow > 0 && kuddusCol !== -1) {
    const kuddusHeight = finalLayout[kuddusRow][kuddusCol]?.height || 152;
    for (let r = 0; r < kuddusRow; r++) {
      const studentInFront = finalLayout[r][kuddusCol];
      if (studentInFront && studentInFront.height > kuddusHeight) {
        isBlocked = true;
        blockedBy.push(studentInFront);
      }
    }
  }

  const lineOfSightScore = isBlocked ? Math.max(10, 100 - blockedBy.length * 40) : 100;

  res.json({
    layout: finalLayout,
    rows,
    cols,
    kuddusPosition: { row: kuddusRow, col: kuddusCol },
    lineOfSightScore,
    isBlocked,
    blockedBy
  });
});


// 3. Syllabus Negotiator (AI Integration) - Mission 3
app.post("/api/syllabus/negotiate", async (req, res) => {
  const { syllabusText, questionCount } = req.body;
  if (!syllabusText) {
    return res.status(400).json({ error: "Syllabus statement is required" });
  }

  try {
    const ai = getGeminiClient();
    const lengthFactor = syllabusText.length;
    // Determine dynamic values based on size
    const daysToGenerate = lengthFactor < 100 ? 2 : lengthFactor < 250 ? 3 : lengthFactor < 450 ? 5 : 7;
    const questionsToGenerate = questionCount ? parseInt(questionCount) : (lengthFactor < 100 ? 3 : lengthFactor < 250 ? 4 : 5);

    const prompt = `You are the "Syllabus Negotiator" AI agent for Class 7-B.
Kuddus, the corrupt class captain, has announced a monstrous, ridiculous syllabus for an upcoming quiz to panic the students.
He includes ridiculous non-examinable garbage like the writer's biography, index, barcode, and multiple Chapters.

Your job:
1. Parse Kuddus's syllabus statement and extract the core actual academic topics.
2. Contextual RAG: Weed out the obvious non-examinable garbage (e.g. author biographies, index, barcodes, covers) and flag them as "Trash Weeded Out".
3. Generate a clean list of essential study topics.
4. Smart Study Planner: Output a time-blocked study countdown guide exactly of ${daysToGenerate} days depending on the size of the syllabus. Each day should represent a realistic step.
5. Practice Mock Quiz: Generate exactly ${questionsToGenerate} realistic multiple choice practice questions (with options, correct option index, and a brief explanation) based on the actual clean academic topics to help students pass Kuddus's quiz.
6. AI Notes Generator: Generate exactly ${questionsToGenerate} smart flashcards or bulleted summaries of core academic concepts to help them review.

You must respond with a JSON object in this format:
{
  "summary": "Short empowering message for Class 7-B students in Bangla or English",
  "cleanTopics": ["Topic 1", "Topic 2", "Topic 3"],
  "trashWeeded": ["Author biography", "Barcode on page 140"],
  "studySchedule": [
    { "day": "Day 1", "task": "Study Topic 1", "timeNeeded": "30 mins" },
    { "day": "Day 2", "task": "Study Topic 2 & 3", "timeNeeded": "45 mins" }
  ],
  "mockQuestions": [
    {
      "id": "q1",
      "question": "Sample multiple choice question based on the real syllabus topics",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctOptionIndex": 0,
      "explanation": "Why Option A is correct and how it helps defeat Kuddus's extreme syllabus."
    }
  ],
  "studyNotes": [
    {
      "title": "Topic Key Note Title",
      "content": "Bite-sized high-yield conceptual summary or study tip for this topic."
    }
  ]
}

Ensure your response is valid JSON only.

Syllabus Statement from Kuddus:
"${syllabusText}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            cleanTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
            trashWeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
            studySchedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  task: { type: Type.STRING },
                  timeNeeded: { type: Type.STRING }
                },
                required: ["day", "task", "timeNeeded"]
              }
            },
            mockQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctOptionIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctOptionIndex", "explanation"]
              }
            },
            studyNotes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["summary", "cleanTopics", "trashWeeded", "studySchedule", "mockQuestions", "studyNotes"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.warn("Gemini Syllabus API notice (running fallback):", error.message || error);
    
    // High-quality dynamic local fallback for offline/missing key scenarios
    const cleanTopics: string[] = ["Main Chapter 1: Introduction", "Core Chapter 2: Key Concepts"];
    const trashWeeded: string[] = ["Author biography", "Barcode scanner code", "Cover design analysis"];
    
    if (syllabusText.toLowerCase().includes("biography") || syllabusText.toLowerCase().includes("barcode") || syllabusText.toLowerCase().includes("index")) {
      if (syllabusText.match(/chapter[s]?\s+\d+\s+to\s+\d+/i)) {
        cleanTopics.push("Chapters matched from text");
      }
    }

    const words = syllabusText.split(/\s+/).length;
    const fallbackDays = words < 15 ? 2 : words < 30 ? 3 : 5;
    const schedule = [];
    for (let d = 1; d <= fallbackDays; d++) {
      schedule.push({
        day: `Day ${d}`,
        task: `Review syllabus segment ${d} & core formulae`,
        timeNeeded: `${20 + d * 5} mins`
      });
    }

    const mockQList = [
      {
        id: "q1",
        question: "Which of the following is NOT an actual examinable topic?",
        options: [
          "Chapter 1 Introduction",
          "Textbook Author Biography & Barcode on Cover",
          "Chapter 2 Key Concepts",
          "Review Quiz"
        ],
        correctOptionIndex: 1,
        explanation: "Rashid Sir's guidelines explicitly say that book barcodes and author biographies are non-examinable trash! Don't waste your precious energy on them."
      },
      {
        id: "q2",
        question: "How long is the recommended optimized study countdown plan?",
        options: ["1 Day", "3 Days", "5 Days", "7 Days"],
        correctOptionIndex: 1,
        explanation: "The Syllabus Optimizer organizes a compact, efficient countdown study guide to keep Class 7-B completely prepared without exhaustion."
      }
    ];

    if (fallbackDays > 3) {
      mockQList.push({
        id: "q3",
        question: "When facing heavy syllabus requirements, what is the best strategy?",
        options: [
          "Memorize every single text character including copyright symbols",
          "Run a contextual query filter to weed out garbage elements",
          "Pay Kuddus a washroom toll tax to decrease the size",
          "Completely skip the test"
        ],
        correctOptionIndex: 1,
        explanation: "Filtering out non-examinable parts is the optimal way to save time and master the core materials without extra stress."
      });
    }

    res.json({
      summary: "⚠️ [AI Safe-Fallback Mode Active] We've stripped the obvious nonsense. Here is a dynamic rationalized syllabus for Class 7-B!",
      cleanTopics,
      trashWeeded,
      studySchedule: schedule,
      mockQuestions: mockQList,
      studyNotes: [
        { title: "Smart Strategy", content: "Focus strictly on inner chapter subheadings. Do not waste energy on the publisher page or forewords." },
        { title: "Active Recall", content: "Review each topic for 15 minutes, then attempt to write a 3-sentence summary from memory." }
      ]
    });
  }
});


// 3b. Voice AI Assistant Chat - Mission 3
app.post("/api/voice-assistant/chat", async (req, res) => {
  const { message, lang } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are "Syllabus Advisor", a friendly and sharp-witted student from Class 7-B.
You help your fellow classmates fight against the corrupt policies of Class Captain Kuddus, especially Kuddus's absurdly bloated exam syllabuses.
The user is talking to you via a Voice AI Assistant chat.
You must respond in a friendly, conversational, short manner (max 2-3 sentences) so it's easy to read back using Text-to-Speech.
Use the same language as the user's message (${lang === "bn" ? "Bangla" : "English"}). If the message has Bengali words or if the preference is Bengali, respond in Bengali.
Be supportive, slightly humorous, and highly practical about studying and outsmarting Kuddus.
User's query: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.warn("Voice assistant fallback response used:", error.message || error);
    // Dynamic Bangla/English intelligent fallback
    const isBn = lang === "bn" || /[\u0980-\u09FF]/.test(message);
    if (isBn) {
      const answers = [
        "বেশি নম্বর-প্রাপ্তি ও বেশি আসা বিষয়গুলো আগে পড়ুন। সবকিছু মুখস্থ না করে মূল ধারণাগুলো ভালোভাবে বুঝুন।গুরুত্বপূর্ণ প্রশ্ন ও পূর্ববর্তী বছরের প্রশ্ন অনুশীলন করুন।সূত্র, সংজ্ঞা, সারসংক্ষেপ বা গুরুত্বপূর্ণ পয়েন্টগুলো দ্রুত রিভিশন করুন।শেষে একটি সংক্ষিপ্ত রিভিশন দিয়ে পড়া বিষয়গুলো ঝালিয়ে নিন।পুরো সিলেবাস শেষ করার চেয়ে বেশি নম্বর পাওয়ার দিকে গুরুত্ব দিন।",
        "কুদ্দুস আমাদের ভয় দেখাতে চায় যাতে আমরা ওর কাছ থেকে টাকা দিয়ে নোট কিনি। আমরা তা করব না!"
      ];
      res.json({ response: answers[Math.floor(Math.random() * answers.length)] });
    } else {
      const answers = [
        "Prioritize high-weight and frequently asked topics.Focus on understanding core concepts rather than memorizing everything.Practice important questions and previous exam papers.Review key formulas, definitions, summaries, or important points. Finish with a quick revision to reinforce what you've studied.Aim to maximize your score instead of covering every single detail.",
        "Remember, we don't buy notes from Kuddus. We study smart, help each other, and defeat his corruption!"
      ];
      res.json({ response: answers[Math.floor(Math.random() * answers.length)] });
    }
  }
});


// 4. Corrupt Economy API (Mission 4)
app.get("/api/corrupt-economy", (req, res) => {
  // Compute totals
  let totalCashExtorted = 0;
  let totalFoodItems = 0;
  let totalCaloriesExtorted = 0;

  ledger.forEach(entry => {
    if (entry.type === "washroom_tax") {
      totalCashExtorted += entry.amountTaka;
    } else if (entry.type === "tiffin_theft") {
      totalCashExtorted += entry.amountTaka; // count estimated value of tiffins
      totalFoodItems += 1;
      totalCaloriesExtorted += entry.calories || 0;
    }
  });

  // Weaponry and premium jhalmuri conversions
  // Premium Jhalmuri: 5 Taka
  // Cricket Bats: 1200 Taka
  // Ludu Boards: 100 Taka
  const jhalmuriCount = Math.floor(totalCashExtorted / 5);
  const cricketBatsCount = parseFloat((totalCashExtorted / 1200).toFixed(2));
  const luduBoardsCount = Math.floor(totalCashExtorted / 100);

  // Active Energy Expenditure is modeled as zero due to Ludu lifestyle
  const activeEnergyExpenditure = 0;
  const caloricDisparity = totalCaloriesExtorted - activeEnergyExpenditure;

  res.json({
    ledger,
    totalCashExtorted,
    totalFoodItems,
    totalCaloriesExtorted,
    activeEnergyExpenditure,
    caloricDisparity,
    conversions: {
      jhalmuriCount,
      cricketBatsCount,
      luduBoardsCount
    }
  });
});

app.post("/api/corrupt-economy", (req, res) => {
  const { type, amountTaka, item, calories } = req.body;
  if (!type) {
    return res.status(400).json({ error: "Type is required ('washroom_tax' or 'tiffin_theft')" });
  }

  const newEntry: LedgerEntry = {
    id: `led-${Date.now()}`,
    type,
    amountTaka: parseFloat(amountTaka || 0),
    item,
    calories: type === "tiffin_theft" ? parseInt(calories || 250) : undefined,
    timestamp: new Date().toISOString()
  };

  ledger.push(newEntry);
  res.json({ success: true, entry: newEntry });
});


// 5. SOS Alert API (Mission 5)
app.get("/api/sos", (req, res) => {
  res.json(sosAlerts);
});

app.post("/api/sos", (req, res) => {
  const { location } = req.body;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const newAlert: SOSAlert = {
    id: `sos-${Date.now()}`,
    location,
    timestamp: new Date().toISOString(),
    status: "ACTIVE"
  };

  sosAlerts.unshift(newAlert); // Put new at front
  res.json({ success: true, alert: newAlert });
});

app.post("/api/sos/rescue", (req, res) => {
  const { id } = req.body;
  sosAlerts = sosAlerts.map(alert => {
    if (alert.id === id) {
      return { ...alert, status: "RESCUED" };
    }
    return alert;
  });
  res.json({ success: true, alerts: sosAlerts });
});


// 6. Kuddus Fact-Checker API (Mission 6)
app.post("/api/fact-checker", async (req, res) => {
  const { claim } = req.body;
  if (!claim) {
    return res.status(400).json({ error: "Claim text is required" });
  }

  try {
    const ai = getGeminiClient();
    const rulebookText = RULEBOOK.map(r => `Rule ${r.id} (${r.title}): ${r.text}`).join("\n");

    const prompt = `You are the "Kuddus Fact-Checker" semantic engine for Class 7-B.
Kuddus, the corrupt class captain, frequently invents fake rules to justify sleeping in class, skipping homework, or extorting students.

Your task is to analyze the student's claimed rule statement, search the official school rulebook, and output:
1. Status: TRUE or FALSE. (TRUE if Kuddus's claim is officially supported. FALSE if his claim is a lie or directly contradicts the rules).
2. Confidence: A percentage score between 0 and 100 representing how clearly the rules support or debunk the claim.
3. MatchingRuleId: The rule ID (e.g. R102, R105) that applies.
4. ExactQuote: The exact quote of the real rule to expose Kuddus on the spot.
5. Explanation: A sharp, sarcastic but school-appropriate response in English or Bangla that debunks his lie.

Here is the official rulebook:
${rulebookText}

Claim to check:
"${claim}"

You must respond with a JSON object in this exact format:
{
  "status": "TRUE" or "FALSE",
  "confidence": 85,
  "matchingRuleId": "R102",
  "exactQuote": "The exact wording of the matched rule",
  "explanation": "Brief explanation debunking or validating"
}

Ensure your response is valid JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ["TRUE", "FALSE"] },
            confidence: { type: Type.INTEGER },
            matchingRuleId: { type: Type.STRING },
            exactQuote: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["status", "confidence", "matchingRuleId", "exactQuote", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.warn("Gemini Fact Checker API notice (running fallback):", error.message || error);

    // High-quality local keyword string-matching fallback
    const claimLower = claim.toLowerCase();
    let matchedRule = RULEBOOK[2]; // Default to extortion
    let status = "FALSE";
    let confidence = 50;
    let explanation = "Could not find a direct semantic match, but we checked the rules database.";

    if (claimLower.includes("homework") || claimLower.includes("home work")) {
      matchedRule = RULEBOOK[1];
      status = "FALSE";
      confidence = 95;
      explanation = "Kuddus says captains don't do homework. Rule 102 clearly debunks this: homework is mandatory for EVERYONE!";
    } else if (claimLower.includes("washroom") || claimLower.includes("toilet") || claimLower.includes("taka") || claimLower.includes("welfare")) {
      matchedRule = RULEBOOK[4];
      status = "FALSE";
      confidence = 98;
      explanation = "Kuddus demands a 2-Taka toll for washroom breaks. Rule 105 says washroom access is a basic human right!";
    } else if (claimLower.includes("ludu") || claimLower.includes("pt") || claimLower.includes("sports")) {
      matchedRule = RULEBOOK[5];
      status = "FALSE";
      confidence = 95;
      explanation = "Kuddus uses PT period to host Ludu tournaments. Rule 106 forbids this: PT is for active exercise, not Kuddus's laziness.";
    } else if (claimLower.includes("seat") || claimLower.includes("front") || claimLower.includes("tall")) {
      matchedRule = RULEBOOK[3];
      status = "FALSE";
      confidence = 90;
      explanation = "Kuddus arranges tall boys in front so he can sleep. Rule 104 requires height-based arrangement or impairment-first seating!";
    } else if (claimLower.includes("decision") || claimLower.includes("captain") || claimLower.includes("biltu")) {
      matchedRule = RULEBOOK[0];
      status = "FALSE";
      confidence = 92;
      explanation = "Kuddus claims Biltu and Miltu have no say. Rule 101 says all captaincy decisions require a democracy!";
    }

    res.json({
      status,
      confidence,
      matchingRuleId: matchedRule.id,
      exactQuote: matchedRule.text,
      explanation: `⚠️ [AI Safe-Fallback Mode] ${explanation}`
    });
  }
});


// ==========================================
// VITE OR STATIC FILE SERVING
// ==========================================
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Anti-Kuddus Server v2026] Mission Control activated on port ${PORT}`);
  });
}

start();
