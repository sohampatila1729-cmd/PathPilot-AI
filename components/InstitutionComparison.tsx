"use client";

import React, { useState } from "react";
import { Institution } from "@/lib/types";
import { DEMO_INSTITUTIONS } from "@/data/demoData";
import { Building2, Check, Info, ShieldCheck, ExternalLink } from "lucide-react";

export default function InstitutionComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "inst-coep",
    "inst-pccoe",
    "inst-gppune",
  ]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const activeInstitutions = DEMO_INSTITUTIONS.filter((inst) =>
    selectedIds.includes(inst.id)
  );

  return (
    <div className="space-y-6">
      {/* Benchmark Data Notice Banner */}
      <div className="glass-panel p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-bold text-indigo-300 uppercase tracking-wide">
            [Representative Institution Benchmarks]
          </span>
          <p className="mt-0.5 text-slate-400 leading-relaxed">
            Tuition estimates, entrance cutoffs, and program structures below represent regional
            benchmark models for decision-support simulation. Always verify real-time cutoffs and fee
            schedules on official admissions portals (such as cetcell.mahacet.org and respective
            institutions).
          </p>
        </div>
      </div>

      {/* Institution Picker Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select 2 or 3 Institutions to Compare Side-by-Side:
          </span>
          <span className="text-xs text-indigo-400 font-medium">
            {selectedIds.length} / 3 Selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEMO_INSTITUTIONS.map((inst) => {
            const isSelected = selectedIds.includes(inst.id);
            return (
              <button
                key={inst.id}
                onClick={() => toggleSelect(inst.id)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/40"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold truncate text-[11px]">
                    {inst.name.split(" ")[0]}
                  </span>
                  {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{inst.type}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
              <tr>
                <th className="p-4 w-44 font-bold text-slate-400 uppercase text-[10px]">
                  Comparison Dimension
                </th>
                {activeInstitutions.map((inst) => (
                  <th key={inst.id} className="p-4 min-w-[240px]">
                    <div className="font-extrabold text-sm text-white">{inst.name}</div>
                    <div className="text-[11px] text-indigo-400 font-medium mt-0.5">
                      {inst.type}
                    </div>
                    <div className="text-[10px] text-slate-400">{inst.location}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {/* Annual Tuition */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Approx. Annual Tuition</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4">
                    <span className="text-base font-extrabold text-emerald-400">
                      ₹{inst.approxAnnualTuitionInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-slate-400"> / year</span>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Approx Total: ₹{((inst.approxAnnualTuitionInr * inst.approxTotalDurationYears) / 100000).toFixed(1)}L
                    </div>
                  </td>
                ))}
              </tr>

              {/* Total Duration */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Program Duration</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4 font-semibold text-slate-200">
                    {inst.approxTotalDurationYears} Academic Years
                  </td>
                ))}
              </tr>

              {/* Key Programs */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Key Flagship Programs</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4">
                    <ul className="space-y-1">
                      {inst.programs.map((prog, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Admission Criteria & Entrance */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Admission Channel</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4 text-xs text-slate-300 leading-relaxed">
                    {inst.admissionRequirements}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {inst.entranceExams.map((exam, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-indigo-300 border border-slate-700"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Scholarship Availability */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Scholarship Support</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        inst.scholarshipAvailability === "High"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {inst.scholarshipAvailability} Availability
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Eligible for state fee concessions (e.g. MahaDBT EBC 50%) & AICTE schemes.
                    </p>
                  </td>
                ))}
              </tr>

              {/* Strengths & Caveats */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Strategic Advantage</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4 text-xs text-slate-300 leading-relaxed">
                    {inst.notablePros}
                  </td>
                ))}
              </tr>

              {/* Eligibility Notes */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-900/40">Eligibility Notes</td>
                {activeInstitutions.map((inst) => (
                  <td key={inst.id} className="p-4 text-[11px] text-slate-400 leading-relaxed">
                    {inst.eligibilityNotes}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
