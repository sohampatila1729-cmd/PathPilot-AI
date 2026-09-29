"use client";

import React, { useEffect, useState } from "react";
import { Pathway } from "@/lib/types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Layers, Info, CheckCircle2, ShieldCheck, Scale } from "lucide-react";

interface DecisionMatrixProps {
  pathways: Pathway[];
}

export default function DecisionMatrix({ pathways }: DecisionMatrixProps) {
  const [mounted, setMounted] = useState(false);
  const [activeChart, setActiveChart] = useState<"radar" | "bar">("radar");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format data for Radar Chart
  // Radar metrics: Academic Fit, Interest Fit, Budget Fit, Admission Ease, Career Alignment
  const radarData = [
    {
      metric: "Academic Fit",
      ...pathways.reduce((acc, p, idx) => ({ ...acc, [`P${idx + 1}`]: p.academicFit }), {}),
    },
    {
      metric: "Interest Fit",
      ...pathways.reduce((acc, p, idx) => ({ ...acc, [`P${idx + 1}`]: p.interestFit }), {}),
    },
    {
      metric: "Budget Fit",
      ...pathways.reduce((acc, p, idx) => ({ ...acc, [`P${idx + 1}`]: p.budgetFit }), {}),
    },
    {
      metric: "Admission Odds",
      ...pathways.reduce(
        (acc, p, idx) => ({ ...acc, [`P${idx + 1}`]: p.admissionFeasibility }),
        {}
      ),
    },
    {
      metric: "Career Align",
      ...pathways.reduce((acc, p, idx) => ({ ...acc, [`P${idx + 1}`]: p.careerAlignment }), {}),
    },
  ];

  // Format data for Bar Chart
  const barData = pathways.map((p, idx) => ({
    name: `Pathway ${idx + 1}`,
    shortTitle: p.title.length > 25 ? p.title.slice(0, 25) + "..." : p.title,
    Academic: p.academicFit,
    Interest: p.interestFit,
    Budget: p.budgetFit,
    Admission: p.admissionFeasibility,
    Career: p.careerAlignment,
    Overall: p.overallScore,
  }));

  const pathwayColors = ["#6366f1", "#a855f7", "#10b981", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Top Disclaimer & Philosophy Banner */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 flex items-start gap-3">
        <Scale className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-semibold text-white mb-1">
            Transparent Decision Matrix &bull; Multi-Criteria Trade-off Analysis
          </p>
          <p className="text-slate-400 leading-relaxed">
            PathPilot AI does not deliver a single dogmatic recommendation. These 5 dimensional
            indicators reflect trade-offs calculated deterministically from student inputs and
            regional benchmark data. An option with a slightly lower academic fit might offer 3x
            higher budget safety or zero admission stress.
          </p>
        </div>
      </div>

      {/* Visual Chart Container */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Comparative Multi-Factor Evaluation
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simultaneous comparison of all 4 pathways across 5 key viability dimensions.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveChart("radar")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChart === "radar"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Radar Comparison
            </button>
            <button
              onClick={() => setActiveChart("bar")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChart === "bar"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Side-by-Side Bar Chart
            </button>
          </div>
        </div>

        {/* Chart Rendering */}
        <div className="h-[360px] w-full">
          {!mounted ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
              Loading visual decision matrix...
            </div>
          ) : activeChart === "radar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                {pathways.map((p, idx) => (
                  <Radar
                    key={p.id}
                    name={`P${idx + 1}: ${p.title.slice(0, 18)}...`}
                    dataKey={`P${idx + 1}`}
                    stroke={pathwayColors[idx % pathwayColors.length]}
                    fill={pathwayColors[idx % pathwayColors.length]}
                    fillOpacity={0.2}
                  />
                ))}
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Academic" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Interest" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Budget" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Admission" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Career" fill="#a855f7" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Granular Decision Matrix Score Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">Full Dimensional Breakdown Table</h4>
          <span className="text-[11px] text-slate-400">Scale: 0 (Unviable) to 100 (Optimal)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Pathway</th>
                <th className="py-3 px-3 text-center">Academic Fit</th>
                <th className="py-3 px-3 text-center">Interest Fit</th>
                <th className="py-3 px-3 text-center">Budget Fit</th>
                <th className="py-3 px-3 text-center">Admission Odds</th>
                <th className="py-3 px-3 text-center">Career Align</th>
                <th className="py-3 px-3 text-center">Est. Total Cost</th>
                <th className="py-3 px-4 text-right">Composite Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {pathways.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-xs">{p.title}</div>
                    <div className="text-[11px] text-slate-400">{p.stream}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-indigo-400">
                    {p.academicFit}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-cyan-400">
                    {p.interestFit}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-400">
                    {p.budgetFit}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-amber-400">
                    {p.admissionFeasibility}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-purple-400">
                    {p.careerAlignment}%
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-slate-300">
                    ₹{(p.estimatedTotalCostInr / 100000).toFixed(2)}L
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-extrabold text-sm px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {p.overallScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
