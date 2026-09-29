"use client";

import React from "react";
import { ArrowRight, Route, ShieldAlert, Cpu, Sparkles, TrendingUp, Layers } from "lucide-react";
import { StudentProfile } from "@/lib/types";

interface HeroProps {
  onStartSimulation: () => void;
  onLoadDemo: (profile?: StudentProfile) => void;
  currentProfile: StudentProfile;
}

export default function Hero({ onStartSimulation, onLoadDemo, currentProfile }: HeroProps) {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Problem Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-6 shadow-sm">
            <Route className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problem MISC-01 &bull; Beyond One-Size-Fits-All College Advice</span>
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

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-explore-pathways-btn"
              onClick={onStartSimulation}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Explore 4 Simulated Pathways</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-load-demo-btn"
              onClick={() => onLoadDemo()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Load Aarav&apos;s Demo Profile (88.4%)</span>
            </button>
          </div>

          {/* Current Profile Summary Strip */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Current Simulation:</span>
            <span className="font-semibold text-white">{currentProfile.fullName}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-indigo-300">{currentProfile.class10Percentage}% in Class 10</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-emerald-300">Budget: ₹{(currentProfile.annualBudgetInr / 100000).toFixed(1)}L/yr</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-cyan-300">{currentProfile.targetCareer}</span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl hover:border-indigo-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Route className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Multi-Path Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates 4 distinct step-by-step roadmaps: direct STEM degrees, polytechnic diplomas,
              and applied computational paths.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">5-Factor Decision Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent, deterministic scoring across Academic Fit, Interest, Budget, Admission
              Feasibility, and Career Alignment.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl hover:border-amber-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Live What-If Simulator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stress-test options: cut budget by 35%, alter entrance percentiles, or pivot careers to
              immediately see shifting trade-offs.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl hover:border-emerald-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Hybrid AI + Fallback Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Combines server-side Gemini 1.5 Flash insights with deterministic fallback logic so the
              demo never crashes or hangs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
