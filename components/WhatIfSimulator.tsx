"use client";

import React from "react";
import { Pathway, StudentProfile, WhatIfScenario } from "@/lib/types";
import { DEMO_WHAT_IF_PRESETS } from "@/data/demoData";
import {
  TrendingDown,
  TrendingUp,
  Sliders,
  RotateCcw,
  Zap,
  ArrowRight,
  ShieldAlert,
  Sparkles,
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
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/20 bg-amber-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Live What-If Scenario Simulator</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SENSITIVITY ANALYSIS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Stress-test education pathways against budget cuts, unexpected exam percentiles, or
                drastic career pivots. See how trade-offs instantly evolve.
              </p>
            </div>
          </div>

          {activeScenario && (
            <button
              onClick={() => onSelectScenario(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset to Base Baseline</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Scenario Cards */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Select a Scenario to Simulate:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEMO_WHAT_IF_PRESETS.map((scen) => {
            const isSelected = activeScenario?.id === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => onSelectScenario(isSelected ? null : scen)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40"
                    : "glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
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

      {/* Before vs After Impact Comparison */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">
              {activeScenario ? `Simulation Impact: ${activeScenario.label}` : "Base Pathway State (No Scenario Active)"}
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            {activeScenario ? "Showing Real-Time Delta" : "Select a scenario above to test impacts"}
          </span>
        </div>

        {/* Pathway Comparison Table */}
        <div className="space-y-3">
          {simulatedPathways.map((simP, idx) => {
            const baseP = basePathways[idx];
            const deltaScore = simP.overallScore - baseP.overallScore;
            const deltaBudget = simP.budgetFit - baseP.budgetFit;
            const deltaAdmission = simP.admissionFeasibility - baseP.admissionFeasibility;

            return (
              <div
                key={simP.id}
                className="bg-slate-900/70 p-4 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                    <h5 className="text-sm font-bold text-white">{simP.title}</h5>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{simP.stream}</p>
                </div>

                {/* Metrics Delta */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs">
                  {/* Budget Fit Delta */}
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Budget Fit</div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{simP.budgetFit}%</span>
                      {deltaBudget !== 0 && (
                        <span
                          className={`text-[10px] font-bold flex items-center ${
                            deltaBudget > 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {deltaBudget > 0 ? `+${deltaBudget}%` : `${deltaBudget}%`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Admission Odds Delta */}
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Admission Odds</div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{simP.admissionFeasibility}%</span>
                      {deltaAdmission !== 0 && (
                        <span
                          className={`text-[10px] font-bold flex items-center ${
                            deltaAdmission > 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {deltaAdmission > 0 ? `+${deltaAdmission}%` : `${deltaAdmission}%`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Overall Composite Score */}
                  <div className="text-right pl-2 border-l border-slate-800">
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
