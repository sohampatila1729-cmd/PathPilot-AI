"use client";

import React, { useState } from "react";
import { Pathway } from "@/lib/types";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  IndianRupee,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

interface PathwayCardProps {
  pathway: Pathway;
  rank: number;
}

export default function PathwayCard({ pathway, rank }: PathwayCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (score >= 70) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
    if (score >= 55) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-rose-400 bg-rose-500/10 border-rose-500/30";
  };

  const colorBadge =
    pathway.colorScheme === "indigo"
      ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
      : pathway.colorScheme === "emerald"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : pathway.colorScheme === "violet"
      ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
      : "bg-teal-500/10 text-teal-300 border-teal-500/30";

  const factorDescriptions: Record<string, string> = {
    academic:
      "Calculated from Class 10 board score and prerequisite alignment with 11-12th PCM/curriculum demands.",
    interest:
      "Measures semantic overlap between declared technical interests (AI, coding, robotics) and pathway disciplines.",
    budget:
      "Compares annual family budget allocation over total program duration against estimated tuition and living costs.",
    admission:
      "Estimates historical entrance cutoff accessibility (MHT-CET, JEE, Polytechnic board merit).",
    career:
      "Evaluates long-term industry market demand and career alignment with target aspirations.",
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden shadow-lg group">
      {/* Top Banner */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
              #{rank}
            </span>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${colorBadge}`}>
              {pathway.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {pathway.stream}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Decision-Support Index:</span>
            <span
              className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${getScoreColor(
                pathway.overallScore
              )}`}
            >
              {pathway.overallScore} / 100
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-indigo-200 transition-colors">
          {pathway.title}
        </h3>

        {/* Key Summary Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 my-3 bg-slate-900/60 rounded-xl px-4 border border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 flex items-center gap-1 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Duration
            </span>
            <span className="font-bold text-slate-200">{pathway.durationYears} Years from 10th</span>
          </div>
          <div>
            <span className="text-slate-400 flex items-center gap-1 mb-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Estimated Cost
            </span>
            <span className="font-bold text-slate-200">
              ₹{(pathway.estimatedTotalCostInr / 100000).toFixed(2)} Lakhs
            </span>
          </div>
          <div>
            <span className="text-slate-400 flex items-center gap-1 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Admission Odds
            </span>
            <span className="font-bold text-slate-200">{pathway.admissionFeasibility}% Feasible</span>
          </div>
          <div>
            <span className="text-slate-400 flex items-center gap-1 mb-0.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Confidence
            </span>
            <span className="font-bold text-slate-200">{pathway.confidenceLevel}</span>
          </div>
        </div>

        {/* Multi-Factor Progress Meters with Interactive Tooltips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 text-[11px]">
          {/* Academic Fit */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveTooltip("academic")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex justify-between text-slate-400 mb-1 items-center">
              <span className="hover:text-indigo-300 transition-colors flex items-center gap-0.5">
                Academic Fit <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
              <span className="font-bold text-slate-200">{pathway.academicFit}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${pathway.academicFit}%` }}
              />
            </div>
            {activeTooltip === "academic" && (
              <div className="absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-slate-300 shadow-xl pointer-events-none">
                {factorDescriptions.academic}
              </div>
            )}
          </div>

          {/* Interest Fit */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveTooltip("interest")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex justify-between text-slate-400 mb-1 items-center">
              <span className="hover:text-cyan-300 transition-colors flex items-center gap-0.5">
                Interest Fit <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
              <span className="font-bold text-slate-200">{pathway.interestFit}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${pathway.interestFit}%` }}
              />
            </div>
            {activeTooltip === "interest" && (
              <div className="absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-slate-300 shadow-xl pointer-events-none">
                {factorDescriptions.interest}
              </div>
            )}
          </div>

          {/* Budget Fit */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveTooltip("budget")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex justify-between text-slate-400 mb-1 items-center">
              <span className="hover:text-emerald-300 transition-colors flex items-center gap-0.5">
                Budget Fit <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
              <span className="font-bold text-slate-200">{pathway.budgetFit}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${pathway.budgetFit}%` }}
              />
            </div>
            {activeTooltip === "budget" && (
              <div className="absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-slate-300 shadow-xl pointer-events-none">
                {factorDescriptions.budget}
              </div>
            )}
          </div>

          {/* Admission Odds */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveTooltip("admission")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex justify-between text-slate-400 mb-1 items-center">
              <span className="hover:text-amber-300 transition-colors flex items-center gap-0.5">
                Admission Odds <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
              <span className="font-bold text-slate-200">{pathway.admissionFeasibility}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${pathway.admissionFeasibility}%` }}
              />
            </div>
            {activeTooltip === "admission" && (
              <div className="absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-slate-300 shadow-xl pointer-events-none">
                {factorDescriptions.admission}
              </div>
            )}
          </div>

          {/* Career Alignment */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setActiveTooltip("career")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex justify-between text-slate-400 mb-1 items-center">
              <span className="hover:text-purple-300 transition-colors flex items-center gap-0.5">
                Career Align <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
              <span className="font-bold text-slate-200">{pathway.careerAlignment}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${pathway.careerAlignment}%` }}
              />
            </div>
            {activeTooltip === "career" && (
              <div className="absolute right-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-slate-300 shadow-xl pointer-events-none">
                {factorDescriptions.career}
              </div>
            )}
          </div>
        </div>

        {/* Career Outcomes Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 mr-1" />
          <span className="text-[11px] font-semibold text-slate-400">Exit Roles:</span>
          {pathway.careerOutcomes.map((role, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700/60"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Visual Roadmap / Timeline of Education Steps */}
      <div className="px-5 sm:px-6 py-4 bg-slate-950/40 border-t border-slate-800/80">
        <div className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
          <span>Progression Timeline (Class 10 &rarr; Industry Launch)</span>
        </div>

        <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-500/30">
          {pathway.steps.map((step, idx) => (
            <div key={idx} className="relative group/step">
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-slate-900 group-hover/step:scale-150 group-hover/step:bg-cyan-400 transition-all duration-200" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover/step:text-indigo-200 transition-colors">
                    {step.stage}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 font-medium">
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">{step.milestone}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  <span className="text-slate-500">Institution:</span> {step.institutionType}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {step.keySubjectsOrSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Section: Assumptions, Uncertainties, Pros & Trade-offs */}
      <div className="border-t border-slate-800/80">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-2.5 flex items-center justify-between text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-slate-900/40 hover:bg-slate-900/80 transition-colors"
        >
          <span>
            {expanded
              ? "Hide Assumptions, Uncertainties & Strategic Trade-offs"
              : "View In-Depth Assumptions, Uncertainties & Strategic Trade-offs"}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="p-5 sm:p-6 bg-slate-950/70 border-t border-slate-800/80 space-y-4 text-xs animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strategic Advantages</span>
                </div>
                <ul className="space-y-1 text-slate-300">
                  {pathway.pros.map((pro, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trade-offs */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-rose-500/20">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Critical Trade-offs & Hurdles</span>
                </div>
                <ul className="space-y-1 text-slate-300">
                  {pathway.tradeoffs.map((to, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">&bull;</span>
                      <span>{to}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Assumptions & Uncertainties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <h5 className="font-bold text-slate-300 mb-1.5 flex items-center gap-1">
                  <span>Underlying Assumptions</span>
                </h5>
                <ul className="space-y-1 text-slate-400">
                  {pathway.keyAssumptions.map((assump, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400">&bull;</span>
                      <span>{assump}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-amber-300/90 mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Real-World Uncertainties</span>
                </h5>
                <ul className="space-y-1 text-slate-400">
                  {pathway.uncertainties.map((unc, uIdx) => (
                    <li key={uIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">&bull;</span>
                      <span>{unc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
