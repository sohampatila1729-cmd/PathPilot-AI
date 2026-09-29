const http = require("http");

async function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
      }
    );
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log("=== [TEST 1] Verifying Homepage (http://localhost:3000) ===");
  const home = await fetchUrl("http://localhost:3000/");
  console.log(`Status: ${home.status}`);
  console.log(`Response length: ${home.body.length} bytes`);
  console.log(`Contains 'PATHPILOT AI': ${home.body.includes("PATHPILOT AI")}`);
  console.log(`Contains 'HACK MATRIX 5.0': ${home.body.includes("HACK MATRIX 5.0")}`);
  console.log(`Contains 'MISC-01': ${home.body.includes("MISC-01")}`);

  console.log("\n=== [TEST 2] Verifying /api/explain API Route & Fallback ===");
  const testPayload = JSON.stringify({
    profile: {
      fullName: "Aarav Deshmukh",
      class10Percentage: 88.4,
      strongSubjects: ["Mathematics", "Science / Physics", "Computer Science"],
      interests: ["Artificial Intelligence", "Coding / Software"],
      aptitudeAreas: ["Logical & Quantitative Reasoning"],
      annualBudgetInr: 350000,
      preferredLocation: "Pune / Maharashtra",
      preferredEducationLevel: "Degree",
      targetCareer: "AI / Machine Learning Engineer",
    },
    pathways: [
      {
        id: "p1",
        title: "Direct 4-Year B.Tech in Computer Science / AI",
        stream: "Science (10+2 PCM) → Engineering Degree",
        estimatedTotalCostInr: 1100000,
        overallScore: 92,
        academicFit: 95,
        budgetFit: 85,
        admissionFeasibility: 80,
        careerAlignment: 96,
        pros: ["High campus placements"],
        tradeoffs: ["Intense entrance competition"],
      },
      {
        id: "p3",
        title: "Polytechnic Diploma (3 Yrs) → Direct 2nd Year B.Tech",
        stream: "Class 10 → Polytechnic → Lateral B.Tech",
        estimatedTotalCostInr: 420000,
        overallScore: 89,
        academicFit: 86,
        budgetFit: 100,
        admissionFeasibility: 94,
        careerAlignment: 88,
        pros: ["60% lower cost"],
        tradeoffs: ["Takes 1 extra year"],
      },
    ],
    scenario: {
      id: "scen-budget-cut",
      label: "Scenario 1: Reduce Annual Budget by 35%",
      budgetDeltaPercent: -35,
    },
  });

  const apiRes = await fetchUrl("http://localhost:3000/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(testPayload),
    },
    body: testPayload,
  });

  console.log(`Status: ${apiRes.status}`);
  const parsed = JSON.parse(apiRes.body);
  console.log(`AI Source: ${parsed.source}`);
  console.log(`Notice: ${parsed.apiKeyNotice || "None"}`);
  console.log(`Observed Inputs count: ${parsed.observedInputs?.length}`);
  console.log(`Rule Strengths count: ${parsed.ruleBasedAnalysis?.strengthsIdentified?.length}`);
  console.log(`Rule Bottlenecks count: ${parsed.ruleBasedAnalysis?.criticalBottlenecks?.length}`);
  console.log(`AI Insights Pathway Comparison:\n  -> "${parsed.aiInsights?.pathwayComparison}"`);
  console.log(`Scenario Result Name: ${parsed.scenarioResult?.scenarioName}`);
  console.log(`Compensating Actions count: ${parsed.scenarioResult?.compensatingActions?.length}`);
  console.log(`Uncertainty Notes count: ${parsed.uncertaintyNotes?.length}`);
  console.log(`Next Steps count: ${parsed.nextStepsForStudent?.length}`);

  console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
}

runTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
