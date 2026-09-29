"use client";

import React, { useState } from "react";
import { Pathway, StudentProfile, WhatIfScenario } from "@/lib/types";
import { DEMO_WHAT_IF_PRESETS } from "@/data/demoData";
import {
  Sliders,
  RotateCcw,
  Zap,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";

interface WhatIfSimulatorProps {
  baseProfile: StudentProfile;
  activeScenario: WhatIfScenario | null;
  onSelectScenario: (scenario: WhatIfScenario | null) => void;
  basePathways: Pathway[];
  simulatedPathways: Pathway[];
}

export default function WhatIfSimulator({
  baseProfile,
  activeScenario,
  onSelectScenario,
  basePathways,
  simulatedPathways,
}: WhatIfSimulatorProps) {
  // Local slider overrides for custom experimentation
  const [customBudgetDelta, setCustomBudgetDelta] = useState<number>(0);
  const [customScoreDelta, setCustomScoreDelta] = useState<number>(0);

  const handleCustomSliderChange = (budgetDelta: number, scoreDelta: number) => {
    setCustomBudgetDelta(budgetDelta);
    setCustomScoreDelta(scoreDelta);
    if (budgetDelta === 0 && scoreDelta === 0) {
      onSelectScenario(null);
    } else {
      onSelectScenario({
        id: "scen-custom",
        label: `Custom Simulation (${budgetDelta > 0 ? `+${budgetDelta}%` : `${budgetDelta}%`} Budget, ${scoreDelta > 0 ? `+${scoreDelta}%` : `${scoreDelta}%`} Marks)`,
        description: "User-defined parametric sensitivity test across budget and score boundaries.",
        budgetDeltaPercent: budgetDelta,
        academicPercentageDelta: scoreDelta,
      });
    }
  };

  const getAffordabilityLabel = (budgetFit: number) => {
    if (budgetFit >= 85) return { text: "High", color: "text-emerald-400" };
    if (budgetFit >= 65) return { text: "Moderate", color: "text-cyan-400" };
    if (budgetFit >= 45) return { text: "Constrained", color: "text-amber-400" };
    return { text: "Severe Deficit", color: "text-rose-400" };
  };

  // Derive active change explanation
  const getScenarioExplanation = () => {
    if (!activeScenario) {
      return "Select a scenario preset above or use the interactive sliders to stress-test your pathways against real-world shifts.";
    }
    if (activeScenario.budgetDeltaPercent && activeScenario.budgetDeltaPercent < 0) {
      return "Reducing the annual budget constrains private university and direct B.Tech affordability, making subsidized autonomous colleges, state fee waivers (MahaDBT EBC), and the Polytechnic-to-Degree route significantly more attractive and financially resilient.";
    }
    if (activeScenario.targetCareerOverride?.includes("Robotics")) {
      return "Pivoting toward Robotics and Embedded Systems elevates Electronics & Telecommunication (E&TC) and Mechatronics streams, aligning lab-based hardware skills with industrial automation demand.";
    }
    if (activeScenario.locationOverride?.includes("Abroad")) {
      return "Targeting global international universities escalates tuition by 3x-5x, requiring comprehensive foreign education loan planning or high-tier merit fellowships.";
    }
    if (activeScenario.academicPercentageDelta && activeScenario.academicPercentageDelta < 0) {
      return "Simulating lower board marks tests entry threshold sensitivity. While direct open-category competitive college cutoffs tighten, the Polytechnic Diploma route remains virtually 100% accessible.";
    }
    return "Custom sensitivity adjustments applied. Review the metrics below to observe pathway shifts.";
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/20 bg-amber-950/20 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Live What-If Sensitivity Simulator</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  REAL-TIME SENSITIVITY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Stress-test education pathways against budget cuts, score fluctuations, or career
                pivots to understand which pathways hold firm and which require backup plans.
              </p>
            </div>
          </div>

          {activeScenario && (
            <button
              onClick={() => {
                onSelectScenario(null);
                setCustomBudgetDelta(0);
                setCustomScoreDelta(0);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shrink-0 hover:-translate-y-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset to Base State</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Scenario Cards */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          1. Choose a Preset What-If Scenario:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEMO_WHAT_IF_PRESETS.map((scen) => {
            const isSelected = activeScenario?.id === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => {
                  onSelectScenario(isSelected ? null : scen);
                  setCustomBudgetDelta(0);
                  setCustomScoreDelta(0);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 -translate-y-0.5"
                    : "glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? "text-amber-300" : "text-white"
                    }`}
                  >
                    {scen.label.split(":")[0]}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  {scen.label.split(":")[1]?.trim() || scen.label}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {scen.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fine-Tuning Interactive Sliders */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>2. Or Drag Live Sliders for Custom Exploration:</span>
          </span>
          <span className="text-[11px] text-slate-400">Continuous sensitivity testing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Budget Delta Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-slate-300 font-medium">Budget Adjustment</label>
              <span className="text-xs font-bold text-amber-400">
                {customBudgetDelta > 0 ? `+${customBudgetDelta}%` : `${customBudgetDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={customBudgetDelta}
              onChange={(e) =>
                handleCustomSliderChange(parseInt(e.target.value), customScoreDelta)
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-50% (Budget Cut)</span>
              <span>Baseline</span>
              <span>+50% (Expanded)</span>
            </div>
          </div>

          {/* Academic Score Delta Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-slate-300 font-medium">Academic Score Shift</label>
              <span className="text-xs font-bold text-indigo-400">
                {customScoreDelta > 0 ? `+${customScoreDelta}%` : `${customScoreDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="10"
              step="1"
              value={customScoreDelta}
              onChange={(e) =>
                handleCustomSliderChange(customBudgetDelta, parseInt(e.target.value))
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20% (Unexpected Dip)</span>
              <span>Baseline</span>
              <span>+10% (Score Surge)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual BEFORE vs AFTER Comparison Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Before vs. After Simulation Impact</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeScenario ? activeScenario.label : "Current Baseline (No scenario engaged)"}
            </p>
          </div>
          {activeScenario && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              SIMULATION ACTIVE
            </span>
          )}
        </div>

        {/* Dynamic Explanation Callout */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{getScenarioExplanation()}</p>
        </div>

        {/* Pathways Delta Cards */}
        <div className="space-y-3 pt-2">
          {simulatedPathways.map((simP, idx) => {
            const baseP = basePathways[idx];
            const deltaScore = simP.overallScore - baseP.overallScore;
            const deltaBudget = simP.budgetFit - baseP.budgetFit;
            const deltaAdmission = simP.admissionFeasibility - baseP.admissionFeasibility;

            const beforeAfford = getAffordabilityLabel(baseP.budgetFit);
            const afterAfford = getAffordabilityLabel(simP.budgetFit);

            return (
              <div
                key={simP.id}
                className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <h5 className="text-sm font-bold text-white">{simP.title}</h5>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{simP.stream}</p>
                </div>

                {/* Before vs After Affordability Pill */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px]">
                    <span className="text-slate-500 block text-[9px] uppercase">Affordability</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-semibold ${beforeAfford.color}`}>
                        {beforeAfford.text} ({baseP.budgetFit}%)
                      </span>
                      {deltaBudget !== 0 && (
                        <>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span className={`font-bold ${afterAfford.color}`}>
                            {afterAfford.text} ({simP.budgetFit}%)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Overall Composite Score */}
                  <div className="text-right pl-3 border-l border-slate-800 min-w-[90px]">
                    <div className="text-[10px] text-slate-400 uppercase">Composite Index</div>
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-sm font-extrabold text-white">{simP.overallScore}</span>
                      {deltaScore !== 0 && (
                        <span
                          className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                            deltaScore > 0
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {deltaScore > 0 ? `+${deltaScore}` : deltaScore}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
