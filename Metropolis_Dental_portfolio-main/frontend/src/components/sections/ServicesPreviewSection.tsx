"use client";

import React from "react";
import { ArrowUpRight, ShieldAlert, Sparkles, Layers, Activity } from "lucide-react";

const SERVICES = [
  {
    tag: "IMPLANTOLOGY",
    title: "Single & Multiple Dental Implants",
    description: "Titanium and zirconia root replacements that fuse directly with jawbone for lifelong stability and natural aesthetics.",
    icon: Layers,
  },
  {
    tag: "PROSTHODONTICS",
    title: "All-on-4 / All-on-6 Full Mouth Rehab",
    description: "Complete arch restoration attached securely to 4 or 6 strategically placed implants in a single day.",
    icon: Activity,
  },
  {
    tag: "AESTHETICS",
    title: "Porcelain Veneers & Digital Smile Design",
    description: "Custom ultra-thin ceramic veneers engineered to match your unique facial anatomy and natural smile arc.",
    icon: Sparkles,
  },
  {
    tag: "ENDODONTICS",
    title: "Painless Root Canal Therapy",
    description: "Rotary & laser-assisted root canal decontamination protecting compromised natural teeth.",
    icon: ShieldAlert,
  },
];

export default function ServicesPreviewSection() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-clinical-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <span>Clinical Specialties</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Engineered Solutions for <br />
              <span className="font-serif italic font-normal text-slate-200">Complex Oral Rehabilitation.</span>
            </h2>
          </div>

          <a
            href="#booking"
            className="inline-flex items-center gap-2 text-xs font-semibold text-clinical-400 hover:text-white uppercase tracking-widest transition-colors duration-200"
          >
            <span>Consult Specialist</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 md:p-10 rounded-3xl glass-panel border border-white/10 hover:border-clinical-500/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-widest text-clinical-400 px-3 py-1 rounded-full bg-clinical-500/10 border border-clinical-500/20">
                      {srv.tag}
                    </span>
                    <Icon className="w-6 h-6 text-luxury-muted group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-light text-white mb-4 tracking-wide group-hover:text-clinical-400 transition-colors duration-300">
                    {srv.title}
                  </h3>

                  <p className="text-luxury-muted text-sm font-body leading-relaxed mb-8">{srv.description}</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs text-slate-400 font-medium">Precision Surgical Standard</span>
                  <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white group-hover:bg-clinical-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
