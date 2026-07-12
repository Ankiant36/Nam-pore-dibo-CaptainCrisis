export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  dashboard: string;
  missions: string;
  threatLevel: string;
  anonymousReports: string;
  captainReputation: string;
  missionCompletion: string;
  studentsProtected: string;
  todayAiInsights: string;
  impeachedTitle: string;
  impeachedDesc: string;
  resetApp: string;
  warningAlert: string;
  strikesUntilImpeachment: string;
  
  // Sidebar & Navigation
  sidebarHome: string;
  sidebarMission1: string;
  sidebarMission2: string;
  sidebarMission3: string;
  sidebarMission4: string;
  sidebarMission5: string;
  sidebarMission6: string;
  sidebarCollapse: string;
  sidebarExpand: string;
  
  // Top nav
  searchPlaceholder: string;
  notifications: string;
  offlineMode: string;
  onlineMode: string;
  userProfile: string;

  // Language & Themes
  toggleTheme: string;
  toggleLang: string;
  darkMode: string;
  lightMode: string;

  // Mission 1: Whistleblower
  m1Title: string;
  m1Desc: string;
  m1FormCategory: string;
  m1FormDesc: string;
  m1FormRoll: string;
  m1FormRollHelp: string;
  m1SubmitBtn: string;
  m1SuccessMsg: string;
  m1WarningsCount: string;
  m1StrikesLeft: string;
  m1EvidenceUpload: string;
  m1EvidenceHelp: string;
  m1ExifStripped: string;

  // Mission 2: Seat Planner
  m2Title: string;
  m2Desc: string;
  m2FormName: string;
  m2FormRoll: string;
  m2FormHeight: string;
  m2FormImpairment: string;
  m2AddStudentBtn: string;
  m2StudentList: string;
  m2TeacherPodium: string;
  m2FrontRow: string;
  m2BackRow: string;
  m2LineOfSight: string;
  m2LosGood: string;
  m2LosBlocked: string;
  m2NoImpairment: string;
  m2HearingImpairment: string;
  m2VisionImpairment: string;

  // Mission 3: Syllabus Negotiator
  m3Title: string;
  m3Desc: string;
  m3Placeholder: string;
  m3NegotiateBtn: string;
  m3Negotiating: string;
  m3CleanTopics: string;
  m3WeededTrash: string;
  m3StudyPlan: string;

  // Mission 4: Ledger
  m4Title: string;
  m4Desc: string;
  m4WashroomTax: string;
  m4TiffinTheft: string;
  m4AddEntry: string;
  m4FormAmount: string;
  m4FormItem: string;
  m4FormCalories: string;
  m4StatsCash: string;
  m4StatsCalories: string;
  m4StatsEnergy: string;
  m4StatsDisparity: string;
  m4Conversions: string;
  m4ConversionsDesc: string;
  m4JhalmuriPackets: string;
  m4CricketBats: string;
  m4LuduBoards: string;

  // Mission 5: SOS
  m5Title: string;
  m5Desc: string;
  m5TriggerSOS: string;
  m5SelectLocation: string;
  m5ActiveAlerts: string;
  m5StatusActive: string;
  m5StatusRescued: string;
  m5ActionRescue: string;
  m5NoActiveAlerts: string;

  // Mission 6: Fact-Checker
  m6Title: string;
  m6Desc: string;
  m6FormClaim: string;
  m6FormClaimHelp: string;
  m6VerifyBtn: string;
  m6Verifying: string;
  m6Verdict: string;
  m6Confidence: string;
  m6MatchingRule: string;
  m6RuleQuote: string;

  // Global Components
  toastAdded: string;
  toastRescued: string;
  toastImpeached: string;
  toastReset: string;
  emptyState: string;
  commandPaletteTitle: string;
  commandPaletteHelp: string;
}

export const translations: Record<"en" | "bn", TranslationDict> = {
  en: {
    appName: "CaptainCrisis",
    appSubtitle: "Helping Class 7 students against a bad class captain",
    dashboard: "Class 7 Help Center",
    missions: "Help Tasks",
    threatLevel: "Captain's Bad Behavior Score",
    anonymousReports: "Secret Student Reports",
    captainReputation: "Captain's Trust Rating",
    missionCompletion: "Classroom Rescue Progress",
    studentsProtected: "Protected Students",
    todayAiInsights: "Today's Helpful Advice",
    impeachedTitle: "WE WON! THE CAPTAIN IS REMOVED!",
    impeachedDesc: "Kuddus is no longer the captain! Our class teacher Rashid Sir removed him because of 3 proven reports. Class 7 is now a happy, peaceful place!",
    resetApp: "Restart Application",
    warningAlert: "WARNING: Kuddus got warnings from Rashid Sir! If he gets 3 warnings, he will be removed.",
    strikesUntilImpeachment: "Warnings Received",

    // Sidebar
    sidebarHome: "Home Overview",
    sidebarMission1: "1. Secret Complaint Box",
    sidebarMission2: "2. Fair Seat Planner",
    sidebarMission3: "3. Easy Syllabus Filter",
    sidebarMission4: "4. Stolen Tiffin Tracker",
    sidebarMission5: "5. Emergency Help Button",
    sidebarMission6: "6. Class Rule Checker",
    sidebarCollapse: "Collapse menu",
    sidebarExpand: "Expand menu",

    // Top nav
    searchPlaceholder: "Search for anything... (Ctrl+K)",
    notifications: "Class Activity Log",
    offlineMode: "Offline Mode",
    onlineMode: "Status: Connected",
    userProfile: "Class 7 Student",

    // Language & Themes
    toggleTheme: "Change Theme",
    toggleLang: "Change Language",
    darkMode: "Full Dark Mode",
    lightMode: "Full Light Mode",

    // Mission 1
    m1Title: "Secret Complaint Box",
    m1Desc: "Write down any bad things Captain Kuddus did today. Your name and roll number will be kept completely secret. When 3 true complaints reach Rashid Sir, Kuddus will be replaced!",
    m1FormCategory: "What did the captain do?",
    m1FormDesc: "Explain what happened (Tell us the full story)",
    m1FormRoll: "Your Roll Number",
    m1FormRollHelp: "We only check this to make sure you are a student of Class 7. Nobody else can see it.",
    m1SubmitBtn: "Submit Complaint to Teacher",
    m1SuccessMsg: "Your complaint was sent safely. Your identity is hidden!",
    m1WarningsCount: "Warnings from Teacher",
    m1StrikesLeft: "Warnings remaining before Kuddus is replaced",
    m1EvidenceUpload: "Upload Proof (Optional)",
    m1EvidenceHelp: "Drop photos or screenshots here. We will clean all hidden file information so no one knows who took the photo.",
    m1ExifStripped: "🔒 Safe: Hidden details removed! Your identity is protected.",

    // Mission 2
    m2Title: "Fair Seat Planner",
    m2Desc: "Kuddus puts tall students in the front so our teacher cannot see him sleeping in the back. Enter student heights and special needs below to get a fair seating arrangement.",
    m2FormName: "Student Name",
    m2FormRoll: "Roll Number",
    m2FormHeight: "Height (in cm)",
    m2FormImpairment: "Special Needs",
    m2AddStudentBtn: "Add Student to List",
    m2StudentList: "Registered Students",
    m2TeacherPodium: "Teacher's Desk",
    m2FrontRow: "Front Bench",
    m2BackRow: "Back Bench",
    m2LineOfSight: "Teacher's View",
    m2LosGood: "CLEAR (Teacher can see Kuddus easily!)",
    m2LosBlocked: "BLOCKED (Kuddus is hiding behind someone!)",
    m2NoImpairment: "No special needs",
    m2HearingImpairment: "Difficulty hearing (Prefers front row)",
    m2VisionImpairment: "Difficulty seeing (Prefers front row)",

    // Mission 3
    m3Title: "Easy Syllabus Filter",
    m3Desc: "When Kuddus makes up a very long and scary exam syllabus (like asking us to memorize the index pages or the publisher's biography), paste it here. Our helper will filter it and make a simple 3-day study plan.",
    m3Placeholder: "Paste the long syllabus here (for example: 'Exam tomorrow on chapters 1 to 5, book index pages, and writer's history')...",
    m3NegotiateBtn: "Filter Syllabus with Helper",
    m3Negotiating: "Filtering the syllabus...",
    m3CleanTopics: "Real Exam Topics",
    m3WeededTrash: "Unnecessary Topics Removed",
    m3StudyPlan: "Simple 3-Day Study Plan",

    // Mission 4
    m4Title: "Stolen Tiffin Tracker",
    m4Desc: "Keep a record of money Kuddus collected unfairly (like charging 2 Taka to use the washroom) or snacks he took. Let's trace how much he took and how many calories he consumed!",
    m4WashroomTax: "Washroom Pass Fee (2 Taka)",
    m4TiffinTheft: "Stolen Lunch Item",
    m4AddEntry: "Record Incident",
    m4FormAmount: "Value (in Taka)",
    m4FormItem: "Snack Name (e.g., Singara, Sandwich, Apple)",
    m4FormCalories: "Calories (kcal)",
    m4StatsCash: "Total Taken Money",
    m4StatsCalories: "Total Taken Calories",
    m4StatsEnergy: "Kuddus's Used Energy",
    m4StatsDisparity: "Food Stolen vs Energy Used",
    m4Conversions: "Taken Money Value in School Items",
    m4ConversionsDesc: "With this amount of money, our class could have bought:",
    m4JhalmuriPackets: "Packets of Jhalmuri",
    m4CricketBats: "Cricket Bats",
    m4LuduBoards: "Ludo Boards",

    // Mission 5
    m5Title: "Emergency Help Button",
    m5Desc: "Is Kuddus behaving badly, bullying, or trying to take your food right now? Press this button to send an alert so classmates can come help you.",
    m5TriggerSOS: "SEND EMERGENCY HELP SIGNAL",
    m5SelectLocation: "Where are you?",
    m5ActiveAlerts: "Active Help Signals",
    m5StatusActive: "🆘 NEED HELP",
    m5StatusRescued: "✅ SAFE",
    m5ActionRescue: "Mark as Safe",
    m5NoActiveAlerts: "Classroom is peaceful. No active help signals.",

    // Mission 6
    m6Title: "Class Rule Checker",
    m6Desc: "Did Kuddus tell you that class captains do not have to do homework, or that you must pay him 2 Taka? Type what he said here. We will check the Class 7 rulebook to see if he is telling the truth.",
    m6FormClaim: "What did Kuddus claim?",
    m6FormClaimHelp: "Type the rule Kuddus made up (for example: 'Captains do not need to submit homework' or 'Fee is required for class projects').",
    m6VerifyBtn: "Check if True or Lie",
    m6Verifying: "Checking class rules...",
    m6Verdict: "Is he telling the truth?",
    m6Confidence: "AI Confidence Score",
    m6MatchingRule: "Rule Number",
    m6RuleQuote: "What the official rulebook says",

    // Global Components
    toastAdded: "Successfully recorded!",
    toastRescued: "Help is on the way! Student is marked as safe.",
    toastImpeached: "🚨 KUDDUS IS NO LONGER CAPTAIN!",
    toastReset: "Database restarted. Mission cleared.",
    emptyState: "No records found. Everything seems peaceful!",
    commandPaletteTitle: "Search for features (Ctrl+K)",
    commandPaletteHelp: "Type the name of any screen or feature to go there."
  },
  bn: {
    appName: "ক্যাপ্টেন ক্রাইসিস",
    appSubtitle: "৭ম শ্রেণীর শিক্ষার্থীদের ক্যাপ্টেন কুদ্দুসের অনিয়ম থেকে রক্ষার সাহায্য কেন্দ্র",
    dashboard: "সাহায্য ও তথ্য কেন্দ্র",
    missions: "সহায়তা কার্যক্রম",
    threatLevel: "ক্যাপ্টেনের অনিয়মের মাত্রা",
    anonymousReports: "গোপন অভিযোগসমূহ",
    captainReputation: "ক্যাপ্টেনের প্রতি আস্থার সূচক",
    missionCompletion: "শ্রেণীকক্ষ পুনরুদ্ধার কার্যক্রমের অগ্রগতি",
    studentsProtected: "নিরাপত্তা পাওয়া শিক্ষার্থী",
    todayAiInsights: "আজকের প্রয়োজনীয় পরামর্শ",
    impeachedTitle: "আমাদের জয় হয়েছে! ক্যাপ্টেন অপসারিত!",
    impeachedDesc: "কুদ্দুসকে আর ক্যাপ্টেনের দায়িত্বে রাখা হচ্ছে না। ৩টি অভিযোগ প্রমাণিত হওয়ায় আমাদের শ্রেণীশিক্ষক রশিদ স্যার তাকে অব্যাহতি দিয়েছেন। ৭ম শ্রেণী এখন সম্পূর্ণ শান্ত ও সুন্দর!",
    resetApp: "অ্যাপ্লিকেশন পুনরায় শুরু করুন",
    warningAlert: "সতর্কতা: রশিদ স্যারের পক্ষ থেকে কুদ্দুসকে সতর্ক করা হয়েছে। ৩টি সতর্কবার্তা পেলে তাকে ক্যাপ্টেনের দায়িত্ব থেকে অব্যাহতি দেওয়া হবে।",
    strikesUntilImpeachment: "প্রাপ্ত সতর্কবার্তা",

    // Sidebar
    sidebarHome: "হোম ওভারভিউ",
    sidebarMission1: "১. গোপন অভিযোগ বক্স",
    sidebarMission2: "২. সঠিক আসন বিন্যাস",
    sidebarMission3: "৩. সহজ সিলেবাস ফিল্টার",
    sidebarMission4: "৪. টিফিনের চাঁদা ট্র্যাকার",
    sidebarMission5: "৫. জরুরী সাহায্য বাটন",
    sidebarMission6: "৬. শ্রেণী নিয়মাবলী পরীক্ষা",
    sidebarCollapse: "মেনু বন্ধ করুন",
    sidebarExpand: "মেনু খুলুন",

    // Top nav
    searchPlaceholder: "যেকোনো বিষয় খুঁজুন... (Ctrl+K)",
    notifications: "শ্রেণী কার্যক্রমের আপডেট",
    offlineMode: "অফলাইন মোড",
    onlineMode: "সিস্টেম স্ট্যাটাস: সংযুক্ত",
    userProfile: "৭ম শ্রেণীর শিক্ষার্থী",

    // Language & Themes
    toggleTheme: "থিম পরিবর্তন",
    toggleLang: "ভাষা পরিবর্তন",
    darkMode: "ফুল ডার্ক মোড",
    lightMode: "ফুল লাইট মোড",

    // Mission 1
    m1Title: "গোপন অভিযোগ বক্স",
    m1Desc: "আজ ক্যাপ্টেন কুদ্দুস যে অনিয়ম করেছে তা এখানে লিখে রাখুন। আপনার নাম এবং রোল নম্বর সম্পূর্ণ গোপন রাখা হবে। ৩টি যাচাইকৃত অভিযোগ রশিদ স্যারের কাছে পৌঁছালে কুদ্দুসকে ক্যাপ্টেনের দায়িত্ব থেকে অব্যাহতি দেওয়া হবে।",
    m1FormCategory: "অনিয়মের ধরণ",
    m1FormDesc: "অভিযোগের বিস্তারিত বিবরণ (কী ঘটেছে তা স্পষ্টভাবে লিখুন)",
    m1FormRoll: "আপনার রোল নম্বর",
    m1FormRollHelp: "রোল নম্বরটি শুধুমাত্র আপনি এই শ্রেণীর শিক্ষার্থী কিনা তা নিশ্চিত করার জন্য ব্যবহৃত হবে। এটি অন্য কেউ দেখতে পারবে না।",
    m1SubmitBtn: "অভিযোগ জমা দিন",
    m1SuccessMsg: "আপনার অভিযোগ সফলভাবে পাঠানো হয়েছে। আপনার রোল নম্বর গোপন রাখা হয়েছে।",
    m1WarningsCount: "শিক্ষকের দেওয়া সতর্কবার্তা",
    m1StrikesLeft: "অব্যাহতি পাওয়ার পূর্বে বাকি সতর্কবার্তা",
    m1EvidenceUpload: "প্রমাণ আপলোড করুন (ঐচ্ছিক)",
    m1EvidenceHelp: "এখানে ছবি আপলোড করতে পারেন। আপনার পরিচয় সম্পূর্ণ গোপন রাখার জন্য ছবি থেকে যাবতীয় মেটাডেটা স্বয়ংক্রিয়ভাবে মুছে ফেলা হবে।",
    m1ExifStripped: "🔒 সুরক্ষিত: আপলোড করা ছবি থেকে মেটাডেটা মুছে ফেলা হয়েছে। আপনার পরিচয় নিরাপদ।",

    // Mission 2
    m2Title: "সঠিক আসন বিন্যাস",
    m2Desc: "কুদ্দুস ক্লাসের লম্বা শিক্ষার্থীদের সামনের বেঞ্চে বসিয়ে শিক্ষকের দৃষ্টি ব্লক করে রাখে, যাতে সে পেছনের বেঞ্চে ঘুমাতে পারে। সঠিক আসন বিন্যাস তৈরি করতে শিক্ষার্থীদের উচ্চতা ও বিশেষ শারীরিক চাহিদার তথ্য নিচে দিন।",
    m2FormName: "শিক্ষার্থীর নাম",
    m2FormRoll: "রোল নম্বর",
    m2FormHeight: "উচ্চতা (সেমি)",
    m2FormImpairment: "বিশেষ শারীরিক চাহিদা",
    m2AddStudentBtn: "শিক্ষার্থী যুক্ত করুন",
    m2StudentList: "নিবন্ধিত শিক্ষার্থীদের তালিকা",
    m2TeacherPodium: "শিক্ষকের ডেস্ক",
    m2FrontRow: "সামনের বেঞ্চ",
    m2BackRow: "পেছনের বেঞ্চ",
    m2LineOfSight: "শিক্ষকের দৃষ্টিসীমা",
    m2LosGood: "পরিষ্কার (শিক্ষক কুদ্দুসকে সহজেই দেখতে পাবেন)",
    m2LosBlocked: "অবরুদ্ধ (কুদ্দুস শিক্ষকের চোখের আড়ালে থাকবে)",
    m2NoImpairment: "কোনো বিশেষ চাহিদা নেই",
    m2HearingImpairment: "শুনতে সমস্যা (সামনের বেঞ্চে বসার অগ্রাধিকার)",
    m2VisionImpairment: "দেখতে সমস্যা (সামনের বেঞ্চে বসার অগ্রাধিকার)",

    // Mission 3
    m3Title: "সহজ সিলেবাস ফিল্টার",
    m3Desc: "কুদ্দুস যখন অতিরিক্ত পড়া বা কঠিন পরীক্ষার সিলেবাস দিয়ে ভয় দেখায় (যেমন বইয়ের সূচিপত্র বা প্রকাশকের তথ্য মুখস্থ করা), তখন সেই সিলেবাস এখানে দিন। আমাদের ফিল্টার অপ্রয়োজনীয় বিষয়গুলো বাদ দিয়ে ৩ দিনের সহজ পড়ার রুটিন তৈরি করে দেবে।",
    m3Placeholder: "কুদ্দুসের দেওয়া জটিল সিলেবাসটি এখানে পেস্ট করুন (যেমন: আগামীকালের পরীক্ষার জন্য ১ থেকে ৫ অধ্যায়, বইয়ের সূচিপত্র এবং লেখকের ইতিহাস পড়তে হবে)...",
    m3NegotiateBtn: "সিলেবাস ফিল্টার করুন",
    m3Negotiating: "সিলেবাস ফিল্টার করা হচ্ছে...",
    m3CleanTopics: "পরীক্ষার মূল বিষয়সমূহ",
    m3WeededTrash: "অপ্রয়োজনীয় বিষয় যা বাদ দেওয়া হয়েছে",
    m3StudyPlan: "৩ দিনের সহজ পড়ার রুটিন",

    // Mission 4
    m4Title: "টিফিনের চাঁদা ট্র্যাকার",
    m4Desc: "কুদ্দুসের জোর করে নেওয়া চাঁদা (যেমন টয়লেট ব্যবহারের জন্য ২ টাকা নেওয়া) বা কেড়ে নেওয়া খাবারের হিসাব রাখুন। আমরা হিসাব দেখবো সে কত টাকা এবং কত ক্যালরি খাবার নিয়েছে!",
    m4WashroomTax: "টয়লেট ব্যবহারের ফি (২ টাকা)",
    m4TiffinTheft: "কেড়ে নেওয়া টিফিন বা খাবার",
    m4AddEntry: "তথ্য সংরক্ষণ করুন",
    m4FormAmount: "টাকার পরিমাণ",
    m4FormItem: "খাবারের নাম (যেমন: সিঙ্গারা, স্যান্ডউইচ, আপেল)",
    m4FormCalories: "ক্যালরি (kcal)",
    m4StatsCash: "মোট নেওয়া চাঁদার টাকা",
    m4StatsCalories: "মোট নেওয়া খাবারের ক্যালরি",
    m4StatsEnergy: "কুদ্দুসের ব্যয়িত শক্তি",
    m4StatsDisparity: "নেওয়া খাবার বনাম ব্যয়িত শক্তি",
    m4Conversions: "নেওয়া চাঁদার টাকার ব্যবহারিক হিসাব",
    m4ConversionsDesc: "চাঁদার সমপরিমাণ টাকা দিয়ে পুরো ক্লাস যা কিনতে পারতো:",
    m4JhalmuriPackets: "ঝালমুড়ি প্যাকেট",
    m4CricketBats: "ক্রিকেট ব্যাট",
    m4LuduBoards: "লুডু বোর্ড",

    // Mission 5
    m5Title: "জরুরী সাহায্য বাটন",
    m5Desc: "কুদ্দুস কি এই মুহূর্তে আপনার সাথে খারাপ ব্যবহার করছে বা আপনার খাবার কেড়ে নেওয়ার চেষ্টা করছে? সাথে সাথে সাহায্য চাইতে নিচের বাটনটি চাপুন। সহপাঠীরা দ্রুত এগিয়ে আসবে।",
    m5TriggerSOS: "জরুরী সাহায্য সংকেত পাঠান",
    m5SelectLocation: "আপনি কোথায় আছেন?",
    m5ActiveAlerts: "চলমান সাহায্য সংকেত",
    m5StatusActive: "🆘 সাহায্য প্রয়োজন",
    m5StatusRescued: "✅ নিরাপদ",
    m5ActionRescue: "নিরাপদ চিহ্নিত করুন",
    m5NoActiveAlerts: "শ্রেণীকক্ষ শান্ত রয়েছে। কোনো জরুরী সংকেত নেই।",

    // Mission 6
    m6Title: "শ্রেণী নিয়মাবলী পরীক্ষা",
    m6Desc: "কুদ্দুস কি দাবি করেছে যে ক্যাপ্টেনদের বাড়ির কাজ করতে হয় না বা তাকে ২ টাকা দিতে হবে? তার দাবিটি নিচে লিখুন। আমরা ৭ম শ্রেণীর অফিসিয়াল নিয়মাবলীর সাথে মিলিয়ে সত্য পরীক্ষা করবো।",
    m6FormClaim: "কুদ্দুসের দাবি",
    m6FormClaimHelp: "কুদ্দুস যে দাবিটি করেছে তা লিখুন (যেমন: 'ক্যাপ্টেনের বাড়ির কাজ জমা দিতে হয় না' বা 'শ্রেণীর উন্নয়ন কাজের জন্য চাঁদা দিতে হবে')।",
    m6VerifyBtn: "সত্যতা পরীক্ষা করুন",
    m6Verifying: "নিয়মাবলী পরীক্ষা করা হচ্ছে...",
    m6Verdict: "সে কি সত্য বলছে?",
    m6Confidence: "নিশ্চয়তার হার (AI)",
    m6MatchingRule: "সংশ্লিষ্ট নিয়ম নম্বর",
    m6RuleQuote: "অফিসিয়াল নিয়মাবলীতে যা বলা আছে",

    // Global
    toastAdded: "সফলভাবে রেকর্ড করা হয়েছে!",
    toastRescued: "সাহায্য পাঠানো হয়েছে। শিক্ষার্থী নিরাপদ!",
    toastImpeached: "🚨 কুদ্দুসকে ক্যাপ্টেনের দায়িত্ব থেকে অব্যাহতি দেওয়া হয়েছে!",
    toastReset: "ডেটাবেস পুনরায় আরম্ভ করা হয়েছে।",
    emptyState: "কোনো তথ্য পাওয়া যায়নি। সবকিছু শান্ত ও নিরাপদ রয়েছে!",
    commandPaletteTitle: "সার্চ করুন (Ctrl+K)",
    commandPaletteHelp: "যেকোনো স্ক্রিনে সরাসরি যাওয়ার জন্য নাম টাইপ করুন।"
  }
};
