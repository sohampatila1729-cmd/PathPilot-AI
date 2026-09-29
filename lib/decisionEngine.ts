import {
  AIExplanationResponse,
  LoanCalculationInput,
  LoanCalculationResult,
  Pathway,
  StudentProfile,
  WhatIfScenario,
} from "./types";

export function calculateLoanEmi(input: LoanCalculationInput): LoanCalculationResult {
  const { loanAmountInr, annualInterestRatePercent, tenureYears } = input;
  if (loanAmountInr <= 0 || tenureYears <= 0) {
    return {
      monthlyEmiInr: 0,
      totalRepaymentInr: 0,
      totalInterestInr: 0,
      principalInr: loanAmountInr,
      effectiveMonthlyCost: 0,
    };
  }

  const monthlyRate = annualInterestRatePercent / (12 * 100);
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate === 0) {
    emi = loanAmountInr / totalMonths;
  } else {
    const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
    emi = (loanAmountInr * monthlyRate * compoundFactor) / (compoundFactor - 1);
  }

  const totalRepayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - loanAmountInr);

  return {
    monthlyEmiInr: Math.round(emi),
    totalRepaymentInr: Math.round(totalRepayment),
    totalInterestInr: Math.round(totalInterest),
    principalInr: loanAmountInr,
    effectiveMonthlyCost: Math.round(emi),
  };
}

export function generatePathways(
  baseProfile: StudentProfile,
  activeScenario?: WhatIfScenario | null
): Pathway[] {
  // Apply What-If scenario modifications to a working profile copy
  const effectiveProfile: StudentProfile = {
    ...baseProfile,
    class10Percentage: Math.max(
      40,
      Math.min(100, baseProfile.class10Percentage + (activeScenario?.academicPercentageDelta || 0))
    ),
    annualBudgetInr: Math.max(
      20000,
      Math.round(
        baseProfile.annualBudgetInr * (1 + (activeScenario?.budgetDeltaPercent || 0) / 100)
      )
    ),
    targetCareer: activeScenario?.targetCareerOverride || baseProfile.targetCareer,
    preferredLocation: activeScenario?.locationOverride || baseProfile.preferredLocation,
  };

  const percentage = effectiveProfile.class10Percentage;
  const budget = effectiveProfile.annualBudgetInr;
  const career = effectiveProfile.targetCareer.toLowerCase();
  const subjects = effectiveProfile.strongSubjects.map((s) => s.toLowerCase());
  const interests = effectiveProfile.interests.map((i) => i.toLowerCase());

  const hasMath = subjects.some((s) => s.includes("math"));
  const hasScience = subjects.some((s) => s.includes("science") || s.includes("physics"));
  const hasCS = subjects.some((s) => s.includes("comp") || s.includes("code"));

  // ==========================================
  // PATHWAY 1: Direct Rigorous STEM Degree (B.Tech CS / AI)
  // ==========================================
  const p1Cost = 1100000; // ~₹11L across 4 yrs tuition + living
  const p1BudgetFit = Math.min(100, Math.round(((budget * 4) / p1Cost) * 85));
  let p1AcademicFit = Math.round(percentage * 0.95);
  if (hasMath && hasScience) p1AcademicFit = Math.min(98, p1AcademicFit + 5);

  let p1InterestFit = 82;
  if (interests.some((i) => i.includes("ai") || i.includes("coding") || i.includes("soft"))) {
    p1InterestFit = 96;
  }

  let p1CareerAlignment = 85;
  if (career.includes("ai") || career.includes("software") || career.includes("developer")) {
    p1CareerAlignment = 96;
  } else if (career.includes("data")) {
    p1CareerAlignment = 90;
  }

  const p1Feasibility = Math.min(
    95,
    Math.max(50, Math.round(percentage * 0.88 + (hasMath ? 6 : 0)))
  );

  const p1Overall = Math.round(
    p1AcademicFit * 0.25 +
      p1InterestFit * 0.25 +
      p1BudgetFit * 0.2 +
      p1Feasibility * 0.15 +
      p1CareerAlignment * 0.15
  );

  const pathway1: Pathway = {
    id: "pathway-direct-btech-cs",
    title: "Direct 4-Year B.Tech in Computer Science / Artificial Intelligence",
    badge: "Most Direct Career Route",
    stream: "Science (10+2 PCM) → Engineering Degree",
    colorScheme: "indigo",
    durationYears: 4,
    estimatedTotalCostInr: p1Cost,
    careerOutcomes: [
      "AI & Machine Learning Engineer",
      "Cloud & Distributed Systems Architect",
      "Full Stack Software Engineer",
      "Algorithms Engineer",
    ],
    steps: [
      {
        stage: "Class 11 & 12 (Junior College / CBSE)",
        institutionType: "Junior College / Senior Secondary",
        milestone: "10+2 Science Stream with PCM & CS elective",
        duration: "2 Years",
        keySubjectsOrSkills: ["Physics", "Chemistry", "Higher Mathematics", "Computer Science / Python", "Entrance Prep"],
      },
      {
        stage: "Competitive Entrance Examination",
        institutionType: "State & National Testing Agencies",
        milestone: "MHT-CET / JEE Main qualifying percentile (>95%ile targeted)",
        duration: "Year 2 Exit",
        keySubjectsOrSkills: ["Advanced Problem Solving", "Speed & Accuracy", "Mock Testing"],
      },
      {
        stage: "Undergraduate Degree",
        institutionType: "Autonomous / Tier-1/2 Engineering College (e.g. COEP / PCCOE / VIT)",
        milestone: "B.Tech in CS / AI & Data Science with capstone project",
        duration: "4 Years",
        keySubjectsOrSkills: ["Data Structures & Algorithms", "Deep Learning", "Systems Design", "Internships"],
      },
      {
        stage: "Industry Launchpad",
        institutionType: "Tech Enterprise / AI Startup",
        milestone: "Entry into campus placements or tech fellowship",
        duration: "Immediate upon graduation",
        keySubjectsOrSkills: ["Production Code", "MLOps", "Agile Collaboration"],
      },
    ],
    academicFit: p1AcademicFit,
    interestFit: p1InterestFit,
    budgetFit: p1BudgetFit,
    admissionFeasibility: p1Feasibility,
    careerAlignment: p1CareerAlignment,
    overallScore: p1Overall,
    confidenceLevel: percentage >= 85 ? "High" : "Moderate",
    keyAssumptions: [
      "Student successfully qualifies Class 12 PCM with >75% aggregate.",
      "Clears entrance cutoff for accredited autonomous institutions.",
      "Family can allocate ~₹2.75L - ₹3.5L per year or leverage an education loan for fees.",
    ],
    uncertainties: [
      "Entrance exam percentile volatility year-on-year.",
      "Branch allotment cutoffs shift based on applicant demand.",
      "Rapidly changing AI tooling requirements in tech recruitment.",
    ],
    pros: [
      "Highest average starting CTC and placement campus volume.",
      "Direct global eligibility for MS / Higher Education abroad.",
      "Structured 4-year peer learning and hackathon exposure.",
    ],
    tradeoffs: [
      "Requires intensive 2-year competitive exam coaching during 11th-12th.",
      "High tuition if joining private institutions without scholarship.",
      "Extreme competition for Open/General category seats.",
    ],
  };

  // ==========================================
  // PATHWAY 2: Applied Hardware & Robotics (B.Tech E&TC / Mechatronics)
  // ==========================================
  const p2Cost = 950000;
  const p2BudgetFit = Math.min(100, Math.round(((budget * 4) / p2Cost) * 88));
  let p2AcademicFit = Math.round(percentage * 0.92);
  let p2InterestFit = 80;
  if (interests.some((i) => i.includes("robot") || i.includes("hardware") || i.includes("auto"))) {
    p2InterestFit = 97;
  }

  let p2CareerAlignment = 76;
  if (career.includes("robot") || career.includes("hardware") || career.includes("embedded")) {
    p2CareerAlignment = 98;
  } else if (career.includes("ai") || career.includes("software")) {
    p2CareerAlignment = 82; // Edge AI / Embedded AI overlap
  }

  const p2Feasibility = Math.min(
    95,
    Math.max(55, Math.round(percentage * 0.91 + (hasScience ? 5 : 0)))
  );

  const p2Overall = Math.round(
    p2AcademicFit * 0.25 +
      p2InterestFit * 0.25 +
      p2BudgetFit * 0.2 +
      p2Feasibility * 0.15 +
      p2CareerAlignment * 0.15
  );

  const pathway2: Pathway = {
    id: "pathway-electronics-robotics",
    title: "B.Tech in Electronics & Telecommunication / Robotics & Automation",
    badge: "Hardware-Software Synergy",
    stream: "Science (10+2 PCM) → Systems & Hardware Engineering",
    colorScheme: "violet",
    durationYears: 4,
    estimatedTotalCostInr: p2Cost,
    careerOutcomes: [
      "Robotics & Automation Engineer",
      "Embedded Systems / IoT Developer",
      "Edge AI & Sensor Fusion Engineer",
      "Firmware Verification Specialist",
    ],
    steps: [
      {
        stage: "Class 11 & 12 (Junior College)",
        institutionType: "Junior College (Science Stream)",
        milestone: "10+2 with Physics, Mathematics, Chemistry & Electronics Vocational",
        duration: "2 Years",
        keySubjectsOrSkills: ["Physics & Electromagnetism", "Calculus", "Basic Circuit Analysis"],
      },
      {
        stage: "Undergraduate Engineering",
        institutionType: "Engineering Institute (COEP / PCCOE / VIIT)",
        milestone: "B.Tech in E&TC or Robotics & Mechatronics",
        duration: "4 Years",
        keySubjectsOrSkills: ["Microcontrollers (ARM/RISC-V)", "ROS (Robot Operating System)", "Signal Processing", "C/C++ & Embedded Linux"],
      },
      {
        stage: "Robotics / Core Hardware Industry Entry",
        institutionType: "Automotive, Defense, Industrial Automation Hub (e.g. Pune/Bhosari industrial belt)",
        milestone: "Embedded Systems Engineer or Automation Consultant",
        duration: "Post Graduation",
        keySubjectsOrSkills: ["Hardware-in-the-loop Testing", "PLC Programming", "Real-Time OS"],
      },
    ],
    academicFit: p2AcademicFit,
    interestFit: p2InterestFit,
    budgetFit: p2BudgetFit,
    admissionFeasibility: p2Feasibility,
    careerAlignment: p2CareerAlignment,
    overallScore: p2Overall,
    confidenceLevel: "High",
    keyAssumptions: [
      "Cutoff percentiles for E&TC/Robotics are typically 3-5% more accessible than CS open seats.",
      "Student enjoys both physical hardware labs and low-level programming.",
    ],
    uncertainties: [
      "Hardware startup ecosystems in India are smaller than pure SaaS, though growing rapidly via EV/Defense initiatives.",
    ],
    pros: [
      "Shielded from pure generative-AI coding disruption due to physical lab and robotics skills.",
      "Dual eligibility for both IT software companies and core industrial giants.",
      "Slightly lower admission cutoffs than computer science.",
    ],
    tradeoffs: [
      "Requires physical lab attendance; remote work opportunities are fewer in hardware.",
      "Starting compensation in core engineering can take 2-3 years to scale compared to immediate tech SaaS packages.",
    ],
  };

  // ==========================================
  // PATHWAY 3: Cost-Optimized Polytechnic Diploma to Lateral Degree (DSE)
  // ==========================================
  const p3Cost = 420000; // Much lower cost: 3 yrs polytechnic @ 20k/yr + 3 yrs lateral engineering
  const p3BudgetFit = Math.min(100, Math.round(((budget * 5) / p3Cost) * 100));
  const p3AcademicFit = Math.min(96, Math.max(68, Math.round(percentage * 0.98)));
  let p3InterestFit = 78;
  if (interests.some((i) => i.includes("hands-on") || i.includes("auto") || i.includes("coding"))) {
    p3InterestFit = 88;
  }

  let p3CareerAlignment = 75;
  if (career.includes("software") || career.includes("automation") || career.includes("engineer")) {
    p3CareerAlignment = 88;
  }

  // Diploma admission is based directly on 10th board marks without JEE stress!
  const p3Feasibility = percentage >= 70 ? 94 : 78;

  const p3Overall = Math.round(
    p3AcademicFit * 0.25 +
      p3InterestFit * 0.25 +
      p3BudgetFit * 0.2 +
      p3Feasibility * 0.15 +
      p3CareerAlignment * 0.15
  );

  const pathway3: Pathway = {
    id: "pathway-polytechnic-lateral",
    title: "Polytechnic Diploma (3 Yrs) → Direct 2nd Year B.Tech (Lateral Entry)",
    badge: "Budget-Friendly & Practical",
    stream: "Class 10 → 3-Year Polytechnic Diploma → Direct Second Year Engineering (DSE)",
    colorScheme: "emerald",
    durationYears: 6, // 3 yrs diploma + 3 yrs degree
    estimatedTotalCostInr: p3Cost,
    careerOutcomes: [
      "Automation & Industrial Systems Engineer",
      "Software Development Engineer (via lateral B.Tech)",
      "Technical Operations & Quality Engineer",
      "Junior Systems Engineer (Direct from Diploma)",
    ],
    steps: [
      {
        stage: "Polytechnic Diploma (Post-10th)",
        institutionType: "Government / Aided Polytechnic (e.g. Govt Polytechnic Pune)",
        milestone: "Diploma in Computer / Mechanical / Electronics Engineering",
        duration: "3 Years",
        keySubjectsOrSkills: ["Hands-on Laboratory Practice", "Applied Mathematics", "Programming Fundamentals", "Industrial Drafting"],
      },
      {
        stage: "Lateral Entry to Degree (DSE)",
        institutionType: "Direct Second Year B.Tech (CAP Lateral Round)",
        milestone: "Admitted into 3rd semester of B.Tech without taking 11th-12th or JEE",
        duration: "3 Years",
        keySubjectsOrSkills: ["Advanced Engineering Mathematics", "Specialized Branch Core", "Major Project"],
      },
      {
        stage: "Degree Graduation & Career",
        institutionType: "Tech or Core Engineering Sector",
        milestone: "Awarded same B.Tech degree as 4-year students",
        duration: "Total 6 years from Class 10",
        keySubjectsOrSkills: ["Strong practical troubleshooting", "Full engineering degree equivalence"],
      },
    ],
    academicFit: p3AcademicFit,
    interestFit: p3InterestFit,
    budgetFit: p3BudgetFit,
    admissionFeasibility: p3Feasibility,
    careerAlignment: p3CareerAlignment,
    overallScore: p3Overall,
    confidenceLevel: "High",
    keyAssumptions: [
      "Direct admission based strictly on Class 10 marks without taking JEE/MHT-CET.",
      "Lateral entry (DSE) seats reserved (10% over-and-above intake) in Maharashtra engineering colleges.",
      "Student maintains >75% in diploma final year to secure preferred engineering college.",
    ],
    uncertainties: [
      "Lateral DSE seat capacity is limited in top-tier computer branches.",
      "Takes 1 additional year compared to direct 10+2 → 4yr B.Tech.",
    ],
    pros: [
      "Massive cost savings (~60% lower total expenditure).",
      "Hands-on technical confidence from age 16 with zero entrance exam pressure.",
      "Provides a fallback credential: student can take up employment right after diploma if family finances require it.",
    ],
    tradeoffs: [
      "6 years total duration to B.Tech instead of 5-6 years.",
      "Limited lateral seats in top 5 autonomous colleges for general category.",
    ],
  };

  // ==========================================
  // PATHWAY 4: Interdisciplinary Data Science & Applied Computational Systems
  // ==========================================
  const p4Cost = 820000;
  const p4BudgetFit = Math.min(100, Math.round(((budget * 4) / p4Cost) * 92));
  const p4AcademicFit = Math.round(percentage * 0.94);
  let p4InterestFit = 80;
  if (interests.some((i) => i.includes("data") || i.includes("problem") || i.includes("ai"))) {
    p4InterestFit = 94;
  }

  let p4CareerAlignment = 82;
  if (career.includes("data") || career.includes("analytics") || career.includes("quant")) {
    p4CareerAlignment = 98;
  } else if (career.includes("ai")) {
    p4CareerAlignment = 91;
  }

  const p4Feasibility = Math.min(94, Math.round(percentage * 0.93));

  const p4Overall = Math.round(
    p4AcademicFit * 0.25 +
      p4InterestFit * 0.25 +
      p4BudgetFit * 0.2 +
      p4Feasibility * 0.15 +
      p4CareerAlignment * 0.15
  );

  const pathway4: Pathway = {
    id: "pathway-data-science-applied",
    title: "Applied B.Tech / B.Sc (Hons) in Data Science & Computational Intelligence",
    badge: "High Growth Modern Domain",
    stream: "Science / Mathematics (10+2) → Specialized Data & AI Track",
    colorScheme: "teal",
    durationYears: 4,
    estimatedTotalCostInr: p4Cost,
    careerOutcomes: [
      "Data Scientist / Business Analytics Lead",
      "Machine Learning Operations (MLOps) Specialist",
      "Quantitative Research Associate",
      "Business Intelligence & Big Data Architect",
    ],
    steps: [
      {
        stage: "Class 11 & 12 (Higher Secondary)",
        institutionType: "Science / Mathematics & Statistics Stream",
        milestone: "10+2 with high focus on Mathematics, Probability & Computer Science",
        duration: "2 Years",
        keySubjectsOrSkills: ["Statistics", "Calculus", "Linear Algebra", "Python Programming"],
      },
      {
        stage: "Specialized Undergraduate Program",
        institutionType: "University Department / Tech Institute",
        milestone: "Degree in Data Science / Computational Intelligence",
        duration: "3-4 Years",
        keySubjectsOrSkills: ["Statistical Machine Learning", "Big Data (Spark/Hadoop)", "SQL & Data Warehousing", "Data Visualization"],
      },
      {
        stage: "FinTech / Analytics Career Launch",
        institutionType: "Global Analytics / Financial Technology firm",
        milestone: "Associate Data Scientist or Quantitative Analyst",
        duration: "Post Degree",
        keySubjectsOrSkills: ["Predictive Modeling", "A/B Testing", "Cloud Big Data Pipelines"],
      },
    ],
    academicFit: p4AcademicFit,
    interestFit: p4InterestFit,
    budgetFit: p4BudgetFit,
    admissionFeasibility: p4Feasibility,
    careerAlignment: p4CareerAlignment,
    overallScore: p4Overall,
    confidenceLevel: "Moderate",
    keyAssumptions: [
      "Student demonstrates strong affinity for statistics and logical patterns beyond general coding.",
      "Specialized data science degrees offer dedicated industry internships in Year 3/4.",
    ],
    uncertainties: [
      "Emerging degree titles may require explanation when applying for legacy public sector/GATE exams.",
    ],
    pros: [
      "Direct pathway into high-paying analytics and FinTech domains.",
      "Focuses heavily on mathematical modeling, which remains resilient against basic AI automation.",
      "Slightly broader admission criteria than conventional computer engineering.",
    ],
    tradeoffs: [
      "Narrower hardware understanding compared to E&TC or general CS.",
      "Requires continuous independent portfolio building on platforms like Kaggle and GitHub.",
    ],
  };

  return [pathway1, pathway2, pathway3, pathway4];
}

export function generateDeterministicAIExplanation(
  profile: StudentProfile,
  pathways: Pathway[],
  scenario?: WhatIfScenario | null
): AIExplanationResponse {
  const topPathway = [...pathways].sort((a, b) => b.overallScore - a.overallScore)[0];
  const lowestCostPathway = [...pathways].sort(
    (a, b) => a.estimatedTotalCostInr - b.estimatedTotalCostInr
  )[0];

  const observedInputs = [
    `Class 10 Academic Score: ${profile.class10Percentage}%`,
    `Declared Strong Subjects: ${profile.strongSubjects.join(", ")}`,
    `Aptitude Profile: ${profile.aptitudeAreas.join(", ")}`,
    `Target Long-Term Career: "${profile.targetCareer}"`,
    `Allocated Annual Education Budget: ₹${profile.annualBudgetInr.toLocaleString("en-IN")}`,
    `Preferred Geographic Scope: ${profile.preferredLocation}`,
    `Preferred Education Level: ${profile.preferredEducationLevel}`,
  ];

  const ruleBasedAnalysis = {
    summary: `Based on an academic baseline of ${profile.class10Percentage}% and a target career in ${profile.targetCareer}, the deterministic engine evaluated ${pathways.length} structured progression pathways.`,
    strengthsIdentified: [
      `Strong alignment between core subjects (${profile.strongSubjects.slice(0, 2).join(", ")}) and technical STEM degree requirements.`,
      `The student's budget (₹${(profile.annualBudgetInr / 100000).toFixed(1)}L/yr) comfortably supports state autonomous colleges and polytechnic routes, while private tier-1 institutions would require merit scholarships or an education loan.`,
      `Target career "${profile.targetCareer}" has multiple viable routes rather than a single bottleneck college.`,
    ],
    criticalBottlenecks: [
      profile.class10Percentage < 80
        ? `Academic percentage (${profile.class10Percentage}%) places direct admission to top-3 state colleges in open categories at moderate feasibility; polytechnic or tier-2 autonomous institutes are safer benchmarks.`
        : `Competitive entrance cutoffs (MHT-CET / JEE) in Maharashtra computer branches require top 2-5 percentile performance regardless of 10th score.`,
      profile.annualBudgetInr < 250000
        ? `Annual budget is below average private university tuition; emphasis must be placed on MahaDBT / AICTE fee waivers or Government Polytechnic tracks.`
        : `Long-term return on investment depends on developing demonstrable project repositories and internships during graduation.`,
    ],
  };

  const aiInsights = {
    pathwayComparison: `Option 1 (${topPathway.title}) leads with an overall decision index of ${topPathway.overallScore}/100, providing the most straightforward route to tier-1 tech roles. However, Option 3 (${lowestCostPathway.title}) presents an exceptional cost-to-risk ratio, cutting financial exposure by over 60% with zero entrance exam pressure.`,
    hiddenTradeoffs: `The common misconception is that failing to secure a direct CS seat in a premier college ends the software trajectory. In reality, the Electronics & Robotics pathway (${pathways[1]?.title}) provides an identical campus recruitment avenue for major tech firms while adding rare hardware and IoT expertise.`,
    strategicRecommendation: `If financial predictability and low exam stress are paramount, register for both Centralized Diploma rounds and 11th-12th Science simultaneously. If top-tier research or international MS is the ultimate goal, pursue 10+2 Science with rigorous focus on Mathematics and entrance mocks.`,
  };

  let scenarioResult: AIExplanationResponse["scenarioResult"] = undefined;
  if (scenario) {
    scenarioResult = {
      scenarioName: scenario.label,
      impactSummary: scenario.budgetDeltaPercent
        ? `Simulating a ${scenario.budgetDeltaPercent}% budget variation shifted the affordability index across private universities, elevating the Polytechnic-to-Degree pathway as the most robust financial shock-absorber.`
        : `Simulated parameter changes adjusted admission feasibility and stream suitability without destabilizing core technical career outcomes.`,
      affectedPathways: [
        topPathway.title,
        lowestCostPathway.title,
      ],
      compensatingActions: [
        "Incorporate government fee concessions such as the Rajarshi Shahu Maharaj EBC scheme (50% tuition waiver).",
        "Consider a low-interest nationalized bank education loan (SBI Scholar Loan @ 8.4%) to bridge any tuition deficit.",
        "Target autonomous institutes with high placement-to-fee ratios (PCCOE, COEP, VIT Pune).",
      ],
    };
  }

  const uncertaintyNotes = [
    "Board exam percentiles vary significantly between CBSE, ICSE, and Maharashtra State Board.",
    "Future college fees and reservation policies are subject to regulatory updates by the Maharashtra Fee Regulating Authority (FRA).",
    "Tech market hiring priorities fluctuate; practical GitHub portfolios and coding proficiencies outweigh institution prestige over a 5-year horizon.",
  ];

  const nextStepsForStudent = [
    "Verify exact domicile documents and family income certificate (from Tahsildar) to confirm eligibility for 50% MahaDBT tuition waivers.",
    "Attend open houses or virtual tours of both Junior Colleges (Science) and Government Polytechnic Pune.",
    "Solve 3-5 past entrance exam papers (MHT-CET / Foundation Math) to gauge comfort level with competitive exam prep.",
    "Bookmark official admission portals: cetcell.mahacet.org and dtemaharashtra.gov.in.",
  ];

  return {
    observedInputs,
    ruleBasedAnalysis,
    aiInsights,
    scenarioResult,
    uncertaintyNotes,
    nextStepsForStudent,
    source: "deterministic-fallback",
    timestamp: new Date().toISOString(),
  };
}
