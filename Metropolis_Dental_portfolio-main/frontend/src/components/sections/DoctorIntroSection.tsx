"use client";

import React from "react";
import { Award, GraduationCap, Globe2, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DoctorIntroSection() {
  return (
    <section id="doctor" className="relative py-32 px-6 md:px-12 bg-white text-slate-900 z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#28395C] text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-[#28395C]" />
            <span>CLINICAL LEADERSHIP & EXPERTISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-4">
            Meet <span className="font-serif italic text-[#28395C]">Dr. Pratim Talukdar</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-body leading-relaxed">
            Leading Prosthodontist & Implantologist | Associate Professor at PA Sangma International Medical College & Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Doctor Profile Card with Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl -z-10" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#28395C] text-white flex items-center justify-center mb-6 shadow-md">
                  <GraduationCap className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  Dr. Pratim Talukdar
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#28395C] mb-6">
                  BDS (2010), MDS in Prosthodontics (2014)
                </p>

                <p className="text-sm text-slate-600 leading-relaxed font-body mb-8">
                  Associate Professor at PA Sangma International Medical College & Hospital. Dedicated to pioneering advanced computer-guided implantology and full-mouth rehabilitation.
                </p>
              </div>

              {/* Specializations Grid */}
              <div className="pt-6 border-t border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  CORE CLINICAL SPECIALIZATIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Dental Implants",
                    "Bone Grafting",
                    "Full-Mouth Rehabilitation",
                  ].map((spec, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#28395C]" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Honors, International Fellowships & Education Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Landmark Achievement Banner */}
            <div className="p-8 rounded-3xl bg-[#28395C] text-white shadow-xl relative overflow-hidden border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                    HISTORIC MILESTONE IN NORTHEAST INDIA
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    Mastership in Implant Dentistry (GCOI)
                  </h4>
                  <p className="text-sm text-white/85 leading-relaxed font-body">
                    First dental surgeon from Northeast India to earn a prestigious Mastership in Implant Dentistry from the <strong className="text-white">Global College of Oral Implantologists (GCOI)</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* International Fellowships Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Globe2 className="w-5 h-5 text-[#28395C]" />
                  <h5 className="text-sm font-bold text-slate-900">FICOI (USA) Fellowship</h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Fellow of the International Congress of Oral Implantologists (USA), recognizing international clinical surgical standards.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#28395C]" />
                  <h5 className="text-sm font-bold text-slate-900">FADI (USA) Fellowship</h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Fellow of the Academy of Dentistry International (USA), demonstrating elite mastery in prosthetic dentistry.
                </p>
              </div>
            </div>

            {/* Academic & Education Timeline */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                ACADEMIC QUALIFICATIONS & ALMA MATER
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#28395C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      MDS in Prosthodontics — BBDU, Lucknow (2014)
                    </span>
                    <span className="text-xs text-slate-600 font-body">
                      Advanced post-graduate specialization in prosthetic restoration, full-mouth rehab, and surgical implantology.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#28395C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      BDS — Dr. BR Ambedkar University, Agra (2010)
                    </span>
                    <span className="text-xs text-slate-600 font-body">
                      Foundational Bachelor of Dental Surgery degree with distinction in clinical oral surgery.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
