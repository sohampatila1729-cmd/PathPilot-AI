"use client";

import React from "react";
import { AIExplanationResponse } from "@/lib/types";
import {
  Sparkles,
  Cpu,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

interface AIExplanationPanelProps {
  explanation: AIExplanationResponse | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function AIExplanationPanel({
  explanation,
  loading,
  onRefresh,
}: AIExplanationPanelProps) {
  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-10 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <div>
          <h4 className="text-base font-bold text-white">Synthesizing AI Reasoning...</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Evaluating academic fit, trade-offs, and risk factors via server-side Gemini 1.5 Flash
            engine.
          </p>
        </div>
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center">
        <p className="text-xs text-slate-400 mb-4">No AI explanation generated yet.</p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
        >
          Generate AI Reasoning
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Status & Trigger Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              explanation.source === "gemini-ai"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
            }`}
          >
            {explanation.source === "gemini-ai" ? (
              <Sparkles className="w-5 h-5 animate-pulse" />
            ) : (
              <Cpu className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">AI Decision-Support Insights</h3>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  explanation.source === "gemini-ai"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                }`}
              >
                {explanation.source === "gemini-ai"
                  ? "Gemini 1.5 Flash Active"
                  : "Deterministic Local AI Engine"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Transparent breakdown separating observed data, deterministic formulas, and AI reasoning.
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
          <span>Regenerate Insights</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 1. Observed Inputs & 2. Rule-Based Analysis */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: OBSERVED INPUTS */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <FileCheck className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Observed Student Inputs
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {explanation.observedInputs.map((inputStr, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-indigo-400 font-bold">&bull;</span>
                  <span>{inputStr}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: MODEL / RULE-BASED ANALYSIS */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Model & Rule-Based Analysis
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              {explanation.ruleBasedAnalysis.summary}
            </p>

            {/* Strengths */}
            <div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Identified Academic Strengths</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {explanation.ruleBasedAnalysis.strengthsIdentified.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">&bull;</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottlenecks */}
            <div>
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Bottlenecks & Hurdle Factors</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {explanation.ruleBasedAnalysis.criticalBottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">&bull;</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: 3. AI Insights, 4. Scenario Result, 5. Uncertainties, 6. Next Steps */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 3: AI INSIGHTS & HIDDEN TRADE-OFFS */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-slate-900/50 to-purple-950/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-indigo-500/20">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                3. AI Insights & Hidden Trade-offs
              </h4>
            </div>

            <div>
              <span className="text-xs font-bold text-white block mb-1">
                Comparative Value Proposition:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {explanation.aiInsights.pathwayComparison}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-indigo-500/20">
              <span className="text-xs font-bold text-cyan-300 block mb-1">
                Hidden Trade-offs & Unseen Realities:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {explanation.aiInsights.hiddenTradeoffs}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-300 block mb-1">
                Strategic AI Recommendation:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {explanation.aiInsights.strategicRecommendation}
              </p>
            </div>
          </div>

          {/* Section 4: SCENARIO RESULT (If applicable) */}
          {explanation.scenarioResult && (
            <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-amber-500/30 bg-amber-950/20 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  4. What-If Scenario Result: {explanation.scenarioResult.scenarioName}
                </h4>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {explanation.scenarioResult.impactSummary}
              </p>
              <div>
                <span className="text-[11px] font-bold text-amber-400 block mb-1">
                  Compensating Actions to Restore Viability:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {explanation.scenarioResult.compensatingActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">&bull;</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section 5: UNCERTAINTIES & SENSITIVITY */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                5. Inherent Real-World Uncertainties
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {explanation.uncertaintyNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: NEXT STEPS FOR STUDENT */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-emerald-500/30 bg-emerald-950/20 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                6. Actionable Next Steps to Verify
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {explanation.nextStepsForStudent.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
