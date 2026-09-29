"use client";

import React from "react";
import { Compass, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { ALTERNATIVE_DEMO_PROFILES } from "@/data/demoData";
import { StudentProfile } from "@/lib/types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectPreset: (profile: StudentProfile) => void;
  isAiFallback: boolean;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onSelectPreset,
  isAiFallback,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      {/* Hackathon Header Tagline */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/60 px-4 py-1 text-center text-xs font-medium text-indigo-200 border-b border-indigo-500/20 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>HACK MATRIX 5.0 (Kali Yuga) &bull; Track: MISC-01 &bull; PCCOE, Pune</span>
        <span className="hidden sm:inline text-slate-400">|</span>
        <span className="hidden sm:inline text-slate-300">Class 10 to Career Path Simulator</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                PATHPILOT AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">Education & Career Journey Simulator</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "profile", label: "Student Profile" },
            { id: "pathways", label: "Pathways" },
            { id: "matrix", label: "Decision Matrix" },
            { id: "whatif", label: "What-If Simulator" },
            { id: "institutions", label: "Colleges" },
            { id: "scholarships", label: "Scholarships" },
            { id: "loans", label: "Loan EMI" },
            { id: "ai-explain", label: "AI Insights" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Preset Dropdown */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Preset Picker */}
          <div className="relative group">
            <button
              id="demo-profile-dropdown"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-cyan-500 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Profiles</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-72 p-2 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Instant Demo Persona
              </div>
              {ALTERNATIVE_DEMO_PROFILES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectPreset(item.profile);
                    setActiveTab("pathways");
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all"
                >
                  <p className="text-xs font-medium text-slate-200">{item.profile.fullName}</p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.profile.class10Percentage}% &bull; {item.profile.targetCareer} &bull; ₹
                    {(item.profile.annualBudgetInr / 100000).toFixed(1)}L/yr
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Engine Status indicator */}
          <div
            title={
              isAiFallback
                ? "Running in Deterministic Local AI Fallback Mode (Always Reliable)"
                : "Connected to Gemini AI Flash API"
            }
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-slate-900/80 border-slate-700/70 text-slate-300"
          >
            {isAiFallback ? (
              <>
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline text-cyan-300">Local AI Engine</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-300">Gemini Online</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
