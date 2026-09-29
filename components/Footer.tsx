"use client";

import React from "react";
import { Compass, Heart, Shield, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60 text-xs">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">PATHPILOT AI</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              An AI-powered education and career decision-support simulator built for Round 1 of
              HACK MATRIX 5.0 (Kali Yuga) at Pimpri Chinchwad College of Engineering (PCCOE), Pune.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>Track: MISC-01</span>
              <span>&bull;</span>
              <span>SDG 4 (Quality Education)</span>
              <span>&bull;</span>
              <span>SDG 8 (Decent Work)</span>
            </div>
          </div>

          {/* Col 2: Core Philosophy */}
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-2.5 text-[11px]">
              Decision Support Philosophy
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>&bull; Non-prescriptive simulation</li>
              <li>&bull; Transparent 5-factor scoring</li>
              <li>&bull; What-If sensitivity testing</li>
              <li>&bull; Uncompromising fallback reliability</li>
            </ul>
          </div>

          {/* Col 3: Submission Metadata */}
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-2.5 text-[11px]">
              Submission Context
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>HACK MATRIX 5.0 &bull; Kali Yuga</li>
              <li>Host: PCCOE, Pune</li>
              <li>Round 01: Prototype & Video</li>
              <li>Stack: Next.js &bull; TS &bull; Gemini Flash</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p>
            &copy; 2026 PathPilot AI. Built for HACK MATRIX 5.0. Synthetic & benchmark data for demo
            purposes.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed for Hackathon Round 1 Demo Readiness</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
