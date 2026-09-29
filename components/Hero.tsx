"use client";

import React from "react";
import { ArrowRight, Route, Cpu, Sparkles, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { StudentProfile } from "@/lib/types";

interface HeroProps {
  onStartSimulation: () => void;
  onLoadDemo: (profile?: StudentProfile) => void;
  currentProfile: StudentProfile;
}

export default function Hero({ onStartSimulation, onLoadDemo, currentProfile }: HeroProps) {
  return (
    <div className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/12 to-cyan-500/15 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Product Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 mb-6 shadow-sm shadow-indigo-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Education & Career Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Explore Your Possible Journey from{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Class 10 to Career
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            PathPilot AI does not simply push a single college. It simulates multiple possible
            education-to-career journeys—revealing transparent trade-offs across academic fit,
            affordability, entrance feasibility, and long-term career outcomes.
          </p>

          {/* Interactive Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-explore-pathways-btn"
              onClick={onStartSimulation}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <span>Explore 4 Simulated Pathways</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-load-demo-btn"
              onClick={() => onLoadDemo()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 hover:border-slate-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Load Aarav&apos;s Demo Profile (88.4%)</span>
            </button>
          </div>

          {/* Current Profile Summary Strip */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Current Simulation:</span>
            <span className="font-semibold text-white">{currentProfile.fullName}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-indigo-300 font-medium">
              {currentProfile.class10Percentage}% in Class 10
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-emerald-300 font-medium">
              Budget: ₹{(currentProfile.annualBudgetInr / 100000).toFixed(1)}L/yr
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-cyan-300 font-medium">{currentProfile.targetCareer}</span>
          </div>
        </div>

        {/* Feature Cards Grid with Micro-Interactions */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Route className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-indigo-200 transition-colors">
              Multi-Path Simulation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates 4 distinct step-by-step roadmaps: direct STEM degrees, polytechnic diplomas,
              and applied computational paths.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-200 transition-colors">
              5-Factor Decision Matrix
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent, deterministic scoring across Academic Fit, Interest, Budget, Admission
              Feasibility, and Career Alignment.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-200 transition-colors">
              Live What-If Simulator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stress-test options: cut budget by 35%, alter entrance percentiles, or pivot careers to
              immediately see shifting trade-offs.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-emerald-200 transition-colors">
              AI Strategic Reasoning
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes multi-factor trade-offs, financial reality, and actionable milestones for
              long-term career success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
