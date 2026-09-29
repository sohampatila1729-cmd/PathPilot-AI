import { NextRequest, NextResponse } from "next/server";
import { generateDeterministicAIExplanation } from "@/lib/decisionEngine";
import { AIExplanationResponse, Pathway, StudentProfile, WhatIfScenario } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      profile,
      pathways,
      scenario,
    }: {
      profile: StudentProfile;
      pathways: Pathway[];
      scenario?: WhatIfScenario | null;
    } = body;

    if (!profile || !pathways || !Array.isArray(pathways)) {
      return NextResponse.json(
        { error: "Invalid request payload: profile and pathways are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If API key is missing, immediately use deterministic local fallback
    if (!apiKey) {
      const fallbackResponse = generateDeterministicAIExplanation(profile, pathways, scenario);
      return NextResponse.json({
        ...fallbackResponse,
        source: "deterministic-fallback",
        apiKeyNotice: "GEMINI_API_KEY is not configured in .env.local. Served via deterministic local AI engine.",
      });
    }

    // Call Gemini API server-side
    // Model preference: gemini-1.5-flash or gemini-2.0-flash
    const model = "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt = `You are the lead academic counseling AI reasoning engine for PATHPILOT AI, an advanced decision-support simulator for students transitioning from Class 10 to higher education and careers.
Your goal is to provide deep, balanced, transparent, and non-prescriptive career pathway analysis.
You MUST NOT give false guarantees or claim absolute certainty.
Distinguish clearly between:
1. User-supplied inputs
2. Rule-based scores
3. Strategic insights and hidden trade-offs
4. Assumptions and inherent real-world uncertainties
5. Concrete, verifiable next steps for the student.

Always return a valid JSON object strictly matching this schema:
{
  "observedInputs": ["string array summarizing key student inputs"],
  "ruleBasedAnalysis": {
    "summary": "string explaining how the student's marks and budget shaped pathway scores",
    "strengthsIdentified": ["bullet 1", "bullet 2"],
    "criticalBottlenecks": ["bullet 1", "bullet 2"]
  },
  "aiInsights": {
    "pathwayComparison": "string comparing the top 2 pathways and their distinct value propositions",
    "hiddenTradeoffs": "string explaining trade-offs like diploma vs 10+2, hardware vs software, budget vs prestige",
    "strategicRecommendation": "string giving balanced decision advice"
  },
  "scenarioResult": {
    "scenarioName": "string or empty if no scenario",
    "impactSummary": "string explaining the simulation impact",
    "affectedPathways": ["list of pathway titles affected"],
    "compensatingActions": ["mitigation steps like scholarships or lateral routes"]
  },
  "uncertaintyNotes": ["list of uncertainties like exam cutoffs, policy changes, hiring shifts"],
  "nextStepsForStudent": ["verifiable next steps, official websites to check, documents to arrange"]
}`;

    const userMessage = {
      role: "user",
      parts: [
        {
          text: `Analyze the following student profile and evaluated pathways:
STUDENT PROFILE:
${JSON.stringify(profile, null, 2)}

EVALUATED PATHWAYS:
${JSON.stringify(
  pathways.map((p) => ({
    title: p.title,
    stream: p.stream,
    estimatedCost: p.estimatedTotalCostInr,
    overallScore: p.overallScore,
    academicFit: p.academicFit,
    budgetFit: p.budgetFit,
    admissionFeasibility: p.admissionFeasibility,
    pros: p.pros,
    tradeoffs: p.tradeoffs,
  })),
  null,
  2
)}

ACTIVE WHAT-IF SCENARIO:
${scenario ? JSON.stringify(scenario, null, 2) : "None (Base case evaluation)"}

Respond ONLY with the requested JSON object without markdown fences.`,
        },
      ],
    };

    // Controller for 7 second timeout so UI never hangs
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const apiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [userMessage],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          responseMimeType: "application/json",
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!apiResponse.ok) {
      console.warn(`Gemini API returned status ${apiResponse.status}. Falling back to deterministic engine.`);
      const fallbackResponse = generateDeterministicAIExplanation(profile, pathways, scenario);
      return NextResponse.json({
        ...fallbackResponse,
        source: "deterministic-fallback",
        apiKeyNotice: `Gemini API responded with status ${apiResponse.status}. Seamlessly switched to deterministic fallback.`,
      });
    }

    const data = await apiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Empty candidate response from Gemini API");
    }

    // Clean potential markdown quotes
    const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsedData: AIExplanationResponse = JSON.parse(cleanedText);

    return NextResponse.json({
      ...parsedData,
      source: "gemini-ai",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.warn("Exception during Gemini API explanation call:", err?.message || err);
    // 100% resilient fallback
    const body = await req.json().catch(() => ({}));
    const fallbackResponse = generateDeterministicAIExplanation(
      body.profile || {
        fullName: "Student",
        class10Percentage: 85,
        strongSubjects: ["Math"],
        interests: ["Tech"],
        aptitudeAreas: ["Logic"],
        annualBudgetInr: 300000,
        preferredLocation: "Pune",
        preferredEducationLevel: "Degree",
        targetCareer: "Software Engineer",
      },
      body.pathways || [],
      body.scenario || null
    );

    return NextResponse.json({
      ...fallbackResponse,
      source: "deterministic-fallback",
      apiKeyNotice: `Gemini connection unavailable (${err?.name || "Network / Key Error"}). Served via local deterministic AI engine.`,
    });
  }
}
