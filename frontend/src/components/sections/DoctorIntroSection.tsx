"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe2, Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export default function DoctorIntroSection() {
  return (
    <section id="doctor" className="relative py-32 px-6 md:px-12 text-slate-900 z-10 border-t border-slate-800 overflow-hidden min-h-screen flex items-center">
      {/* Full-Bleed Background Image of the Entire Section */}
      <img
        src="/images/about_me_dental.jpg"
        alt="Metropolis Dental - Doctor Section Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Soft Dark Overlay for Crystal Clear Text */}
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: -40 }}
          whileInView={{ y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
            Meet <span className="font-serif italic text-amber-200">Dr. Pratim Talukdar</span>
          </h2>
          <p className="text-slate-200 text-base sm:text-lg font-body leading-relaxed max-w-2xl drop-shadow">
            Leading Prosthodontist & Implantologist | Associate Professor at PA Sangma International Medical College & Hospital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Liquid Glass Doctor Profile Card (Slides fast from LEFT) */}
          <motion.div
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            viewport={{ amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between relative overflow-hidden text-white">
              
              {/* Liquid Gloss Light Specular Reflection */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center mb-6 shadow-lg">
                  <GraduationCap className="w-7 h-7 text-amber-300" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                  Dr. Pratim Talukdar
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-6 drop-shadow-sm">
                  BDS (2010), MDS in Prosthodontics (2014)
                </p>

                <p className="text-sm text-slate-100 leading-relaxed font-body mb-8 drop-shadow-sm">
                  Associate Professor at PA Sangma International Medical College & Hospital. Dedicated to pioneering advanced computer-guided implantology and full-mouth rehabilitation.
                </p>
              </div>

              {/* Specializations Grid */}
              <div className="pt-6 border-t border-white/20">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-200 block mb-3 drop-shadow-sm">
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
                      className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-2xl border border-white/30 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-sky-300" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Liquid Glass Honors & Fellowships (Slides fast from RIGHT) */}
          <motion.div
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            viewport={{ amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Landmark Achievement Liquid Glass Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#28395C]/65 via-[#28395C]/45 to-white/10 backdrop-blur-2xl backdrop-saturate-150 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden border border-white/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1 drop-shadow-sm">
                    HISTORIC MILESTONE IN NORTHEAST INDIA
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug drop-shadow-sm">
                    Mastership in Implant Dentistry (GCOI)
                  </h4>
                  <p className="text-sm text-slate-100 leading-relaxed font-body drop-shadow-sm">
                    First dental surgeon from Northeast India to earn a prestigious Mastership in Implant Dentistry from the <strong className="text-white">Global College of Oral Implantologists (GCOI)</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* International Fellowships Liquid Glass Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/25 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Globe2 className="w-5 h-5 text-sky-300" />
                  <h5 className="text-sm font-bold text-white drop-shadow-sm">FICOI (USA) Fellowship</h5>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-body drop-shadow-sm">
                  Fellow of the International Congress of Oral Implantologists (USA), recognizing international clinical surgical standards.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/25 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-sky-300" />
                  <h5 className="text-sm font-bold text-white drop-shadow-sm">FADI (USA) Fellowship</h5>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-body drop-shadow-sm">
                  Fellow of the Academy of Dentistry International (USA), demonstrating elite mastery in prosthetic dentistry.
                </p>
              </div>
            </div>

            {/* Academic Qualifications Liquid Glass Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/25 text-white space-y-6 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 drop-shadow-sm">
                ACADEMIC QUALIFICATIONS & ALMA MATER
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-white block drop-shadow-sm">
                      MDS in Prosthodontics — BBDU, Lucknow (2014)
                    </span>
                    <span className="text-xs text-slate-200 font-body drop-shadow-sm">
                      Advanced post-graduate specialization in prosthetic restoration, full-mouth rehab, and surgical implantology.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-white block drop-shadow-sm">
                      BDS — Dr. BR Ambedkar University, Agra (2010)
                    </span>
                    <span className="text-xs text-slate-200 font-body drop-shadow-sm">
                      Foundational Bachelor of Dental Surgery degree with distinction in clinical oral surgery.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
