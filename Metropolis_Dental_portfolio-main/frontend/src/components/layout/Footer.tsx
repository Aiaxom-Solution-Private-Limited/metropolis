"use client";

import React from "react";
import { Shield, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-luxury-slate border-t border-white/10 text-luxury-muted py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-clinical-500/20 border border-clinical-500/30 flex items-center justify-center text-clinical-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider">METROPOLIS DENTAL CLINIC</h4>
            <p className="text-xs text-luxury-muted">Guwahati, Assam, India</p>
          </div>
        </div>

        {/* Doctor Credits */}
        <div className="text-center md:text-right">
          <p className="text-xs text-slate-300">
            Lead Practitioner: <strong className="text-white font-medium">Dr. Pratim Talukdar</strong> (BDS, MDS)
          </p>
          <p className="text-[11px] text-luxury-muted">Specialist in Oral Implantology & Prosthodontics</p>
        </div>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Metropolis Dental Clinic & Implant Centre. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Clinical Standards</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Patient Portal</a>
        </div>
      </div>
    </footer>
  );
}
