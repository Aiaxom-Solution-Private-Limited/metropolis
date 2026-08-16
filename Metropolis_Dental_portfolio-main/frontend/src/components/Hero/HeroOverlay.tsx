"use client";

import React, { useMemo } from "react";
import { Calendar, ArrowRight, Award, ShieldCheck, Clock } from "lucide-react";
import { mapRange } from "@/utils/math";

interface HeroOverlayProps {
  scrollProgress: number;
  onOpenBookingModal?: () => void;
}

export default function HeroOverlay({ scrollProgress, onOpenBookingModal }: HeroOverlayProps) {
  // Hero text animation timeline:
  // 0% -> 35%: Opacity 1 -> 0, TranslateY 0 -> -60px
  const opacity = useMemo(() => {
    if (scrollProgress >= 0.35) return 0;
    return mapRange(scrollProgress, 0, 0.35, 1, 0);
  }, [scrollProgress]);

  const translateY = useMemo(() => {
    if (scrollProgress >= 0.35) return -60;
    return mapRange(scrollProgress, 0, 0.35, 0, -60);
  }, [scrollProgress]);

  const pointerEvents = opacity > 0.05 ? "auto" : "none";

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const bookingElem = document.getElementById("booking");
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents,
      }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-transform duration-75 ease-out"
    >
      {/* 
        Headline highlighting Dr. Pratim Talukdar's expertise in prosthodontics and implants
        (Tab above tooth removed as requested)
      */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-slate-900 max-w-4xl leading-[1.08] mb-6">
        Prosthodontics & Implantology <br />
        <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#28395C] via-slate-800 to-emerald-600">
          by Dr. Pratim Talukdar.
        </span>
      </h1>

      {/* Paragraph */}
      <p className="text-slate-600 text-base md:text-lg max-w-2xl font-body font-normal leading-relaxed mb-8">
        World-class dental implant restorations, precision crown engineering, and surgical smile design at Metropolis Dental Clinic.
      </p>

      {/* Prominent CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <button
          onClick={handleBookingClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#28395C] hover:bg-slate-900 text-white font-medium text-sm transition-all duration-300 shadow-xl shadow-[#28395C]/20 hover:-translate-y-0.5 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <a
          href="#doctor"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-pill hover:bg-white text-slate-800 text-sm font-semibold transition-all duration-300 border border-slate-300 shadow-sm"
        >
          <span>Explore Specialist Profile</span>
        </a>
      </div>

      {/* Quick Highlights: Expert Implantologist, State-of-the-Art Hygiene, On-Time Appointments */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm">
          <Award className="w-4 h-4 text-[#28395C]" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">Expert Implantologist</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">State-of-the-Art Hygiene</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm">
          <Clock className="w-4 h-4 text-[#28395C]" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">On-Time Appointments</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">Scroll to explore anatomy</span>
        <div className="w-4 h-8 rounded-full border border-slate-400/40 p-1 flex justify-center">
          <div className="w-1 h-1.5 bg-slate-800 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
