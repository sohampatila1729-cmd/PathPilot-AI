"use client";

import React from "react";
import { Compass, Sparkles, ArrowRight } from "lucide-react";

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleNav = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* LEFT SECTION (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                PATHPILOT AI
              </span>
            </div>
            <p className="text-slate-300 font-medium leading-relaxed max-w-sm">
              AI-powered education and career pathway exploration for students and families.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm">
              Explore multiple pathways, compare trade-offs, and understand how your choices may shape
              your future.
            </p>
          </div>

          {/* CENTER SECTION (4 cols): HOW PATHPILOT THINKS */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>How PathPilot Thinks</span>
            </h5>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">&bull;</span>
                <span>Multiple pathways, not a single answer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span>Transparent decision factors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <span>What-if scenario exploration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">&bull;</span>
                <span>AI-assisted explanations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>Clear assumptions and uncertainty</span>
              </li>
            </ul>
          </div>

          {/* RIGHT SECTION (3 cols): EXPLORE */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Explore
            </h5>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => handleNav("profile")}
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1.5 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  <span>Student Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("pathways")}
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1.5 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  <span>Career Pathways</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("matrix")}
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1.5 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  <span>Decision Matrix</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("whatif")}
                  className="hover:text-indigo-300 transition-colors flex items-center gap-1.5 group text-left"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  <span>What-If Simulator</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p className="text-slate-400">
            &copy; 2026 PathPilot AI. Empowering better education and career decisions.
          </p>
          <p className="text-slate-500 max-w-xl text-center sm:text-right text-[10px] leading-relaxed">
            PathPilot AI is a decision-support tool. Verify current admission, scholarship and
            financial information with official sources before making important decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
