"use client";

import React, { useState } from "react";
import { Compass, Sparkles, UserCheck, ChevronDown } from "lucide-react";
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
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "profile", label: "Student Profile" },
    { id: "pathways", label: "Pathways" },
    { id: "matrix", label: "Decision Matrix" },
    { id: "whatif", label: "What-If Simulator" },
    { id: "institutions", label: "Colleges" },
    { id: "scholarships", label: "Scholarships" },
    { id: "loans", label: "Loan EMI" },
    { id: "ai-explain", label: "AI Insights" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Signature Rotating Logo */}
        <div
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Return to Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <Compass className="w-5 h-5 text-indigo-400 transform transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent group-hover:to-cyan-200 transition-colors">
              PATHPILOT AI
            </span>
            <p className="text-[11px] text-slate-400 leading-none">
              Education & Career Pathway Simulator
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800/70">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-indigo-600/30 border border-indigo-500/40 -z-10 shadow-sm shadow-indigo-500/20" />
                )}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Actions: Demo Persona Selector */}
        <div className="flex items-center gap-2.5">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              id="demo-profile-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-200" />
              <span>Demo Profiles</span>
              <ChevronDown className="w-3 h-3 text-indigo-200 opacity-80" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-72 p-2 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  Load Instant Demo Persona
                </div>
                {ALTERNATIVE_DEMO_PROFILES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectPreset(item.profile);
                      setActiveTab("pathways");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {item.profile.fullName}
                      </p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {item.profile.class10Percentage}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 truncate mt-0.5">
                      {item.profile.targetCareer} &bull; ₹
                      {(item.profile.annualBudgetInr / 100000).toFixed(1)}L/yr
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Scrolling Tab Strip */}
      <div className="lg:hidden px-4 py-2 border-t border-slate-800/60 overflow-x-auto flex items-center space-x-1 scrollbar-none bg-slate-950/60">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600/30 text-indigo-200 font-semibold border border-indigo-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
