"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProfileForm from "@/components/ProfileForm";
import PathwayCard from "@/components/PathwayCard";
import DecisionMatrix from "@/components/DecisionMatrix";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import InstitutionComparison from "@/components/InstitutionComparison";
import ScholarshipSection from "@/components/ScholarshipSection";
import LoanSimulator from "@/components/LoanSimulator";
import AIExplanationPanel from "@/components/AIExplanationPanel";
import Footer from "@/components/Footer";

import { DEFAULT_DEMO_PROFILE } from "@/data/demoData";
import { generateDeterministicAIExplanation, generatePathways } from "@/lib/decisionEngine";
import { AIExplanationResponse, StudentProfile, WhatIfScenario } from "@/lib/types";
import {
  Route,
  Layers,
  Sparkles,
  Zap,
  Building2,
  Award,
  Calculator,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_DEMO_PROFILE);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [activeScenario, setActiveScenario] = useState<WhatIfScenario | null>(null);

  const [aiExplanation, setAiExplanation] = useState<AIExplanationResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isAiFallback, setIsAiFallback] = useState<boolean>(true);

  // Deterministic pathways calculation
  const basePathways = useMemo(() => generatePathways(profile, null), [profile]);
  const simulatedPathways = useMemo(
    () => generatePathways(profile, activeScenario),
    [profile, activeScenario]
  );

  // Call the server-side explanation API (with seamless fallback)
  const fetchAIExplanation = useCallback(async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          pathways: simulatedPathways,
          scenario: activeScenario,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiExplanation(data);
        setIsAiFallback(data.source !== "gemini-ai");
      } else {
        const fallback = generateDeterministicAIExplanation(
          profile,
          simulatedPathways,
          activeScenario
        );
        setAiExplanation(fallback);
        setIsAiFallback(true);
      }
    } catch {
      const fallback = generateDeterministicAIExplanation(
        profile,
        simulatedPathways,
        activeScenario
      );
      setAiExplanation(fallback);
      setIsAiFallback(true);
    } finally {
      setIsAiLoading(false);
    }
  }, [profile, simulatedPathways, activeScenario]);

  // Initial load
  useEffect(() => {
    fetchAIExplanation();
  }, [fetchAIExplanation]);

  const handleSelectPreset = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    setActiveScenario(null);
  };

  const handleStartSimulation = () => {
    setActiveTab("pathways");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        isAiFallback={isAiFallback}
      />

      {/* Active What-If Notification Banner if a scenario is engaged */}
      {activeScenario && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-center text-xs text-amber-200 flex items-center justify-center gap-3 animate-in fade-in duration-200">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>
            Active Simulation: <strong>{activeScenario.label}</strong> is altering pathway trade-offs
            and affordability.
          </span>
          <button
            onClick={() => setActiveScenario(null)}
            className="underline hover:text-white font-semibold flex items-center gap-1 ml-2 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-12">
            <Hero
              onStartSimulation={handleStartSimulation}
              onLoadDemo={() => handleSelectPreset(DEFAULT_DEMO_PROFILE)}
              currentProfile={profile}
            />

            {/* Quick Pathways Preview */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Route className="w-5 h-5 text-indigo-400" />
                    <span>Simulated Career Pathways Preview</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Multi-path alternatives tailored to {profile.fullName}&apos;s profile ({profile.class10Percentage}%).
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("pathways");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
                >
                  <span>View All 4 Pathways</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {simulatedPathways.slice(0, 2).map((p, idx) => (
                  <PathwayCard key={p.id} pathway={p} rank={idx + 1} />
                ))}
              </div>
            </section>

            {/* Quick Decision Matrix Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <span>Decision Matrix Summary</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transparent, deterministic scoring across Academic Fit, Budget, and Admission odds.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("matrix");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                >
                  <span>Open Full Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <DecisionMatrix pathways={simulatedPathways} />
            </section>

            {/* Quick AI Insights Teaser */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>AI Reasoning & Trade-off Insights</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Strategic analysis separating observed data, bottlenecks, and uncertainties.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("ai-explain");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
                >
                  <span>Full AI Explanation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <AIExplanationPanel
                explanation={aiExplanation}
                loading={isAiLoading}
                onRefresh={fetchAIExplanation}
              />
            </section>
          </div>
        )}

        {/* TAB: STUDENT PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-4">
              <h2 className="text-2xl font-bold text-white">Student Onboarding & Constraints</h2>
              <p className="text-xs text-slate-400 mt-1">
                Adjust academic performance, aptitude strengths, annual education budget, or test
                pre-configured personas.
              </p>
            </div>
            <ProfileForm
              profile={profile}
              onChangeProfile={(updated) => setProfile(updated)}
              onSubmit={() => {
                setActiveTab("pathways");
                fetchAIExplanation();
              }}
            />
          </div>
        )}

        {/* TAB: PATHWAYS */}
        {activeTab === "pathways" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Route className="w-6 h-6 text-indigo-400" />
                  <span>Simulated Education & Career Pathways</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Showing 4 structured alternatives from Class 10 through degree to initial career
                  launch.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("whatif")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Test What-If Scenarios</span>
                </button>
                <button
                  onClick={() => setActiveTab("matrix")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  View Decision Matrix
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {simulatedPathways.map((p, idx) => (
                <PathwayCard key={p.id} pathway={p} rank={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* TAB: DECISION MATRIX */}
        {activeTab === "matrix" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                <span>Comprehensive 5-Factor Decision Matrix</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing multi-dimensional viability without single-college bias.
              </p>
            </div>
            <DecisionMatrix pathways={simulatedPathways} />
          </div>
        )}

        {/* TAB: WHAT-IF SIMULATOR */}
        {activeTab === "whatif" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" />
                <span>Alternative & What-If Scenario Simulator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Simulate sudden financial constraints, lower board percentages, or career pivots to
                observe pathway resilience.
              </p>
            </div>
            <WhatIfSimulator
              baseProfile={profile}
              activeScenario={activeScenario}
              onSelectScenario={(scen) => setActiveScenario(scen)}
              basePathways={basePathways}
              simulatedPathways={simulatedPathways}
            />
          </div>
        )}

        {/* TAB: INSTITUTION COMPARISON */}
        {activeTab === "institutions" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-indigo-400" />
                <span>Regional & Benchmark Institution Comparison</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Compare tuition, program duration, cutoffs, and scholarship support side by side.
              </p>
            </div>
            <InstitutionComparison />
          </div>
        )}

        {/* TAB: SCHOLARSHIPS */}
        {activeTab === "scholarships" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <span>Scholarship & Funding Opportunities</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Government fee waivers and corporate assistance mapped to current student eligibility.
              </p>
            </div>
            <ScholarshipSection profile={profile} />
          </div>
        )}

        {/* TAB: LOAN SIMULATOR */}
        {activeTab === "loans" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-6 h-6 text-indigo-400" />
                <span>Education Loan EMI & Repayment Simulator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculate estimated monthly payments and compare bank loan terms using transparent
                financial formulas.
              </p>
            </div>
            <LoanSimulator />
          </div>
        )}

        {/* TAB: AI EXPLANATION */}
        {activeTab === "ai-explain" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <span>Dedicated AI Explanation & Trade-off Panel</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Detailed reasoning behind pathways, observed inputs, bottlenecks, and real-world
                uncertainty factors.
              </p>
            </div>
            <AIExplanationPanel
              explanation={aiExplanation}
              loading={isAiLoading}
              onRefresh={fetchAIExplanation}
            />
          </div>
        )}
      </main>

      {/* Redesigned Product Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
