"use client";

import React, { useState } from "react";
import { calculateLoanEmi } from "@/lib/decisionEngine";
import { DEMO_LOAN_SCHEMES } from "@/data/demoData";
import { IndianRupee, Calculator, ShieldCheck, Info, Sparkles, Building } from "lucide-react";

export default function LoanSimulator() {
  const [loanAmount, setLoanAmount] = useState<number>(750000); // ₹7.5 Lakhs (standard collateral-free threshold)
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState<number>(10); // 10 years

  const calculation = calculateLoanEmi({
    loanAmountInr: loanAmount,
    annualInterestRatePercent: interestRate,
    tenureYears: tenureYears,
  });

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="glass-panel p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-semibold text-white">Transparent Standard EMI Formula Estimation</p>
          <p className="text-slate-400 leading-relaxed mt-0.5">
            Calculated via standard reducing-balance reducing amortization:{" "}
            <code className="text-indigo-300">EMI = P &times; r &times; (1+r)^n / ((1+r)^n - 1)</code>
            . Under Indian RBI/IBA guidelines, education loans up to ₹7.5 Lakhs typically do not
            require collateral. Moratorium usually covers the course period + 6 to 12 months.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Controls */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Education Loan Parameters</h3>
          </div>

          {/* Slider 1: Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Required Loan Principal
              </label>
              <span className="text-sm font-extrabold text-emerald-400">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              id="loan-amount-slider"
              type="range"
              min="100000"
              max="4000000"
              step="25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹1 Lakh</span>
              <span>₹7.5 Lakhs (Collateral Limit)</span>
              <span>₹40 Lakhs</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[300000, 750000, 1200000, 2000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLoanAmount(amt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 font-medium"
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Annual Interest Rate (% p.a.)
              </label>
              <span className="text-sm font-extrabold text-indigo-400">{interestRate}%</span>
            </div>
            <input
              id="loan-rate-slider"
              type="range"
              min="7.0"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>7.0% (Subsidized)</span>
              <span>8.5% (PSU Banks)</span>
              <span>15.0% (NBFCs)</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Repayment Tenure (Years Post Moratorium)
              </label>
              <span className="text-sm font-extrabold text-cyan-400">{tenureYears} Years</span>
            </div>
            <input
              id="loan-tenure-slider"
              type="range"
              min="3"
              max="15"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>3 Years</span>
              <span>7-10 Years (Standard)</span>
              <span>15 Years</span>
            </div>
          </div>
        </div>

        {/* Right: Calculated EMI Output Card */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Estimated Monthly Repayment
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                ₹{calculation.monthlyEmiInr.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-slate-400">/ month</span>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Total Interest Payable</span>
                <span className="text-lg font-bold text-amber-400">
                  ₹{calculation.totalInterestInr.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  ({Math.round((calculation.totalInterestInr / calculation.principalInr) * 100)}% of principal)
                </span>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Total Amount Repaid</span>
                <span className="text-lg font-bold text-slate-200">
                  ₹{calculation.totalRepaymentInr.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Over {tenureYears * 12} monthly installments
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Principal: ₹{(calculation.principalInr / 100000).toFixed(1)}L</span>
                <span>Interest: ₹{(calculation.totalInterestInr / 100000).toFixed(1)}L</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{
                    width: `${Math.round(
                      (calculation.principalInr / calculation.totalRepaymentInr) * 100
                    )}%`,
                  }}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{
                    width: `${Math.round(
                      (calculation.totalInterestInr / calculation.totalRepaymentInr) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Eligible for Tax Deduction under Section 80E (interest deduction for up to 8 continuous
              years).
            </span>
          </div>
        </div>
      </div>

      {/* Realistic Bank Scheme Benchmarks */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-400" />
          Pre-Configured Education Loan Schemes for Comparison
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_LOAN_SCHEMES.map((scheme, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{scheme.bankName}</span>
                  <span className="text-xs font-extrabold text-indigo-400">
                    {scheme.interestRatePercent}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium mb-2">{scheme.schemeName}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{scheme.features}</p>
              </div>
              <button
                onClick={() => setInterestRate(scheme.interestRatePercent)}
                className="w-full py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700 transition-all"
              >
                Apply {scheme.interestRatePercent}% Rate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
