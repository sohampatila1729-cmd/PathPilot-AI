"use client";

import React from "react";
import { DEMO_SCHOLARSHIPS } from "@/data/demoData";
import { StudentProfile } from "@/lib/types";
import { Award, FileText, CheckCircle2, Info, ArrowUpRight } from "lucide-react";

interface ScholarshipSectionProps {
  profile: StudentProfile;
}

export default function ScholarshipSection({ profile }: ScholarshipSectionProps) {
  return (
    <div className="space-y-6">
      {/* Information Banner */}
      <div className="glass-panel p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-semibold text-white">
            Eligible Scholarship & Financial Assistance Schemes
          </p>
          <p className="text-slate-400 leading-relaxed mt-0.5">
            Scholarships displayed are mapped based on your profile inputs (academic marks, stream,
            and location). In India, government schemes (such as MahaDBT EBC 50% tuition waiver) require
            Tahsildar income certificates and CAP centralized allotment. Verification on official
            portals (mahadbt.maharashtra.gov.in / scholarships.gov.in) is recommended before
            finalizing decisions.
          </p>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_SCHOLARSHIPS.map((sch) => {
          const meetsAcademic =
            !sch.minAcademicPercentage || profile.class10Percentage >= sch.minAcademicPercentage;
          const meetsIncome =
            !sch.incomeThresholdInr || profile.annualBudgetInr <= sch.incomeThresholdInr;

          return (
            <div
              key={sch.id}
              className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-lg group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                      <Award className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        {sch.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                        {sch.name}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                    {sch.provider.split(" ")[0]}
                  </span>
                </div>

                {/* Estimated Financial Benefit Callout */}
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 mb-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                    Estimated Financial Benefit
                  </span>
                  <p className="text-xs font-extrabold text-emerald-300">{sch.approxBenefit}</p>
                </div>

                {/* Match Reason for Current Student */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Why This Fits {profile.fullName}:</span>
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed pl-5">{sch.matchReason}</p>
                </div>

                {/* Eligibility Criteria */}
                <div className="mb-4 text-xs">
                  <span className="font-semibold text-slate-300 block mb-1">Eligibility Criteria:</span>
                  <p className="text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    {sch.eligibilityCriteria}
                  </p>
                </div>

                {/* Mandatory Documentation */}
                <div className="text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mandatory Verification Documents:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sch.requiredDocuments.map((doc, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Match Readiness:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full ${
                    meetsAcademic
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {meetsAcademic ? "High Academic Fit" : "Borderline Eligibility"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
