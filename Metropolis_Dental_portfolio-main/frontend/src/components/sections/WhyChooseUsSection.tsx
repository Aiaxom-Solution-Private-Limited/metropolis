"use client";

import React from "react";
import { Cpu, ShieldCheck, Microscope, Sparkles, HeartPulse } from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "3D CBCT Guided Surgery",
    description: "Ultra-precise digital implant placement with zero guesswork, minimal downtime, and rapid healing.",
  },
  {
    icon: Microscope,
    title: "Microscopic Endodontics",
    description: "High-magnification root canal procedures preserving max natural tooth structure.",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Sterilization",
    description: "Strict Class-B autoclave infection control standards exceeding global safety protocols.",
  },
  {
    icon: HeartPulse,
    title: "Tailored Patient Care",
    description: "A calm, unhurried sanctuary atmosphere designed to eliminate clinical anxiety.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="relative py-32 px-6 md:px-12 bg-luxury-slate/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-clinical-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>The Metropolis Standard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
            Uncompromising Excellence in <br />
            <span className="font-serif italic font-normal text-slate-200">Modern Oral Healthcare.</span>
          </h2>
          <p className="text-luxury-muted text-base font-body">
            Combining biological science, high-tech robotics, and luxury hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl glass-panel border border-white/10 hover:border-clinical-500/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-clinical-500/10 border border-clinical-500/20 flex items-center justify-center text-clinical-400 group-hover:scale-110 group-hover:bg-clinical-500 group-hover:text-white transition-all duration-300 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 tracking-wide">{feat.title}</h3>
                  <p className="text-luxury-muted text-sm font-body leading-relaxed">{feat.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-clinical-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn Protocol</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
