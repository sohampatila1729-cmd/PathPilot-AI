"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/lib/types";
import { ALTERNATIVE_DEMO_PROFILES, DEFAULT_DEMO_PROFILE } from "@/data/demoData";
import { Sparkles, Check, RefreshCw, User, Award, DollarSign, Target, MapPin, BookOpen } from "lucide-react";

interface ProfileFormProps {
  profile: StudentProfile;
  onChangeProfile: (updated: StudentProfile) => void;
  onSubmit: () => void;
}

const COMMON_SUBJECTS = [
  "Mathematics",
  "Science / Physics",
  "Chemistry",
  "Computer Science",
  "Social Sciences",
  "Economics",
  "Technical Drawing",
  "Biology",
];

const COMMON_INTERESTS = [
  "Artificial Intelligence",
  "Coding / Software",
  "Robotics",
  "Hands-on Hardware",
  "Data Analytics",
  "Problem Solving",
  "Automobile Tech",
  "Financial Modeling",
  "Design & UI/UX",
];

const COMMON_APTITUDES = [
  "Logical & Quantitative Reasoning",
  "Spatial Aptitude",
  "Abstract Thinking",
  "Mechanical Comprehension",
  "Statistical Analysis",
  "Verbal Aptitude",
];

export default function ProfileForm({ profile, onChangeProfile, onSubmit }: ProfileFormProps) {
  const [formState, setFormState] = useState<StudentProfile>(profile);
  const [saveToast, setSaveToast] = useState(false);

  const toggleArrayItem = (list: string[], item: string): string[] => {
    if (list.includes(item)) {
      return list.filter((i) => i !== item);
    } else {
      return [...list, item];
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeProfile(formState);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
    onSubmit();
  };

  const handlePresetSelect = (preset: StudentProfile) => {
    setFormState(preset);
    onChangeProfile(preset);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <User className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Student Academic & Financial Profile</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Provide student data to simulate tailored Class 10 to Career pathways.
            </p>
          </div>

          {/* Quick Demo Persona Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Instant Personas:</span>
            {ALTERNATIVE_DEMO_PROFILES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(p.profile)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600/30 text-slate-200 border border-slate-700 hover:border-indigo-500/40 transition-all"
              >
                {p.profile.fullName.split(" ")[0]} ({p.profile.class10Percentage}%)
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleApply} className="space-y-6">
          {/* Row 1: Full Name & Class 10 Percentage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Student Full Name
              </label>
              <div className="relative">
                <input
                  id="student-name-input"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Aarav Deshmukh"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Class 10 Board Percentage
                </label>
                <span className="text-sm font-bold text-indigo-400">
                  {formState.class10Percentage}%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  id="student-percentage-slider"
                  type="range"
                  min="45"
                  max="99"
                  step="0.1"
                  value={formState.class10Percentage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      class10Percentage: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <input
                  type="number"
                  min="40"
                  max="100"
                  step="0.1"
                  value={formState.class10Percentage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      class10Percentage: parseFloat(e.target.value) || 60,
                    })
                  }
                  className="w-20 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-center text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Strong Academic Subjects */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Strong Subjects in Class 10 (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SUBJECTS.map((sub) => {
                const selected = formState.strongSubjects.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        strongSubjects: toggleArrayItem(formState.strongSubjects, sub),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400"
                        : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {sub} {selected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Primary Interests */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Core Technical & Career Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_INTERESTS.map((interest) => {
                const selected = formState.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        interests: toggleArrayItem(formState.interests, interest),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400"
                        : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {interest} {selected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Aptitude Areas */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Observed Aptitude Strengths
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_APTITUDES.map((apt) => {
                const selected = formState.aptitudeAreas.includes(apt);
                return (
                  <button
                    key={apt}
                    type="button"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        aptitudeAreas: toggleArrayItem(formState.aptitudeAreas, apt),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400"
                        : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {apt} {selected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Financial Capacity (Annual Education Budget) */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Target Annual Family Education Budget (INR)
                </label>
              </div>
              <span className="text-sm font-bold text-emerald-400">
                ₹{formState.annualBudgetInr.toLocaleString("en-IN")} / year
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                id="student-budget-slider"
                type="range"
                min="20000"
                max="1000000"
                step="10000"
                value={formState.annualBudgetInr}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    annualBudgetInr: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex gap-1.5">
                {[50000, 150000, 350000, 600000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFormState({ ...formState, annualBudgetInr: amt })}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-medium"
                  >
                    ₹{(amt / 100000).toFixed(1)}L
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Tip: Average Government Polytechnic is ~₹15k/yr; Autonomous colleges (COEP/PCCOE) are ~₹1.2L - ₹1.8L/yr; Private universities are ~₹3.5L - ₹5L/yr.
            </p>
          </div>

          {/* Row 6: Target Career & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Dream Career
              </label>
              <input
                id="student-target-career-input"
                type="text"
                value={formState.targetCareer}
                onChange={(e) => setFormState({ ...formState, targetCareer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                placeholder="e.g. AI / Machine Learning Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Location Preference
              </label>
              <select
                value={formState.preferredLocation}
                onChange={(e) => setFormState({ ...formState, preferredLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Pune / Maharashtra">Pune / Maharashtra</option>
                <option value="India (Any)">India (Any Region)</option>
                <option value="Abroad / International">Abroad / International</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Preferred Initial Route
              </label>
              <select
                value={formState.preferredEducationLevel}
                onChange={(e) =>
                  setFormState({ ...formState, preferredEducationLevel: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Degree">Direct Degree (10+2 → B.Tech)</option>
                <option value="Diploma to Degree">Polytechnic Diploma to Degree (DSE)</option>
                <option value="Vocational">Applied Technical / Vocational</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handlePresetSelect(DEFAULT_DEMO_PROFILE)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default Aarav Profile</span>
            </button>

            <button
              id="simulate-pathways-submit-btn"
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              {saveToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Profile Applied & Simulated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Update Simulator Pathways</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
