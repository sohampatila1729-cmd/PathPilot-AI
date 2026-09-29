export interface StudentProfile {
  fullName: string;
  class10Percentage: number;
  strongSubjects: string[];
  interests: string[];
  aptitudeAreas: string[];
  annualBudgetInr: number;
  preferredLocation: string; // e.g. "Pune / Maharashtra", "India (Any)", "Abroad"
  preferredEducationLevel: string; // "Degree", "Diploma to Degree", "Vocational"
  targetCareer: string;
}

export interface EducationStep {
  stage: string; // "Class 11-12" | "Undergrad" | "Entry Career"
  institutionType: string;
  milestone: string;
  duration: string;
  keySubjectsOrSkills: string[];
}

export interface Pathway {
  id: string;
  title: string;
  badge: string;
  stream: string;
  colorScheme: "indigo" | "emerald" | "amber" | "violet" | "teal";
  durationYears: number;
  estimatedTotalCostInr: number;
  careerOutcomes: string[];
  steps: EducationStep[];
  academicFit: number; // 0 - 100
  interestFit: number; // 0 - 100
  budgetFit: number; // 0 - 100
  admissionFeasibility: number; // 0 - 100
  careerAlignment: number; // 0 - 100
  overallScore: number; // weighted composite
  confidenceLevel: "High" | "Moderate" | "Exploratory";
  keyAssumptions: string[];
  uncertainties: string[];
  pros: string[];
  tradeoffs: string[];
}

export interface Institution {
  id: string;
  name: string;
  location: string;
  type: "Government / Autonomous" | "Private University" | "Polytechnic / State";
  programs: string[];
  approxAnnualTuitionInr: number;
  approxTotalDurationYears: number;
  admissionRequirements: string;
  entranceExams: string[];
  scholarshipAvailability: "High" | "Medium" | "Competitive";
  notablePros: string;
  eligibilityNotes: string;
  isDemoData: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  eligibilityCriteria: string;
  approxBenefit: string;
  requiredDocuments: string[];
  matchReason: string;
  incomeThresholdInr?: number;
  minAcademicPercentage?: number;
  category: "Merit" | "Means-cum-Merit" | "Girls in STEM" | "Technical Education";
}

export interface LoanCalculationInput {
  loanAmountInr: number;
  annualInterestRatePercent: number;
  tenureYears: number;
}

export interface LoanCalculationResult {
  monthlyEmiInr: number;
  totalRepaymentInr: number;
  totalInterestInr: number;
  principalInr: number;
  effectiveMonthlyCost: number;
}

export interface WhatIfScenario {
  id: string;
  label: string;
  description: string;
  budgetDeltaPercent?: number; // e.g., -30 for 30% reduction
  targetCareerOverride?: string;
  locationOverride?: string;
  academicPercentageDelta?: number; // e.g. -5% or +5%
}

export interface AIExplanationResponse {
  observedInputs: string[];
  ruleBasedAnalysis: {
    summary: string;
    strengthsIdentified: string[];
    criticalBottlenecks: string[];
  };
  aiInsights: {
    pathwayComparison: string;
    hiddenTradeoffs: string;
    strategicRecommendation: string;
  };
  scenarioResult?: {
    scenarioName: string;
    impactSummary: string;
    affectedPathways: string[];
    compensatingActions: string[];
  };
  uncertaintyNotes: string[];
  nextStepsForStudent: string[];
  source: "gemini-ai" | "deterministic-fallback";
  timestamp: string;
}
