"use client";

import React, { useEffect, useState } from "react";
import { Shield, Calendar, Menu, X, ArrowRight, Phone, Award } from "lucide-react";

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSidebarOpen(false);
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
    <>
      {/* Outer Header: 100% Transparent spanning near top corners */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 px-6 sm:px-10 lg:px-14 bg-transparent pointer-events-none">
        <div className="w-full flex items-center justify-between pointer-events-auto relative">
          
          {/* Logo (Top-Left Corner) */}
          <a href="#" className="group flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#28395C] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#28395C]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-slate-900 drop-shadow-sm">METROPOLIS</span>
              <span className="text-[10px] tracking-widest uppercase text-slate-700 font-body font-semibold">
                DENTAL & IMPLANT CENTRE
              </span>
            </div>
          </a>

          {/* 
            Silky Smooth Morphing Middle Navbar Container:
            - Unscrolled: Centered horizontal pill (#28395C with white text).
            - Scrolled: Glides smoothly to the top-right corner near the screen edge.
            - Unscrolled again: Glides smoothly back to center.
          */}
          <div
            className={`hidden md:flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? "translate-x-[calc(50vw-6rem)]"
                : "translate-x-0"
            }`}
          >
            <div
              onClick={() => {
                if (scrolled) setSidebarOpen(!sidebarOpen);
              }}
              className={`relative flex items-center bg-[#28395C] text-white shadow-xl border border-white/15 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled
                  ? "w-12 h-12 rounded-full cursor-pointer hover:scale-105 justify-center p-0"
                  : "w-auto px-7 py-3 rounded-full justify-between"
              }`}
            >
              {/* Horizontal Pill Links (Visible when unscrolled) */}
              <div
                className={`flex items-center gap-8 transition-all duration-500 ${
                  scrolled
                    ? "opacity-0 scale-90 pointer-events-none absolute"
                    : "opacity-100 scale-100 relative"
                }`}
              >
                <a
                  href="/#doctor"
                  className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  Dr. Pratim Talukdar
                </a>
                <a
                  href="/courses"
                  className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  Courses
                </a>
                <a
                  href="/gallery"
                  className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  Gallery
                </a>
                <a
                  href="/contact"
                  className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  Contact Us
                </a>
                <button
                  onClick={handleBookingClick}
                  className="text-xs font-bold uppercase tracking-widest text-white bg-white/15 hover:bg-white/25 px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Circle Toggle Icon (Visible when scrolled) */}
              <div
                className={`transition-all duration-500 flex items-center justify-center ${
                  scrolled
                    ? "opacity-100 scale-100 relative"
                    : "opacity-0 scale-75 absolute pointer-events-none"
                }`}
              >
                {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </div>
            </div>
          </div>

          {/* Right Action CTA (Top-Right Corner when unscrolled, fades out when scrolled) */}
          <div
            className={`hidden md:flex items-center gap-4 transition-all duration-500 ${
              scrolled ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            }`}
          >
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#28395C] text-white text-xs font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-[#28395C] text-white flex items-center justify-center shadow-md cursor-pointer ml-auto"
            aria-label="Toggle Navigation Drawer"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Permanent Mounted Sidebar Drawer Container */}
      <div
        className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-400 ease-in-out ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-400"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Drawer Panel */}
        <aside
          className={`relative z-10 w-full max-w-md bg-[#28395C] text-white h-full shadow-2xl p-8 flex flex-col justify-between overflow-y-auto border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-8 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-white">METROPOLIS DENTAL</h3>
                  <p className="text-[10px] tracking-widest uppercase text-white/70">Dr. Pratim Talukdar</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-10 flex flex-col gap-6">
              <a
                href="/#doctor"
                onClick={() => setSidebarOpen(false)}
                className="text-lg font-light text-white/90 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
              >
                <span>Dr. Pratim Talukdar</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href="/courses"
                onClick={() => setSidebarOpen(false)}
                className="text-lg font-light text-white/90 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
              >
                <span>Training Courses</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href="/gallery"
                onClick={() => setSidebarOpen(false)}
                className="text-lg font-light text-white/90 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
              >
                <span>Clinic & Smile Gallery</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href="/contact"
                onClick={() => setSidebarOpen(false)}
                className="text-lg font-light text-white/90 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
              >
                <span>Contact Us & Directions</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </nav>

            {/* Clinical Highlights Card inside Drawer */}
            <div className="mt-10 p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Specialist Implantologist & Prosthodontist</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-body">
                Led by Dr. Pratim Talukdar (BDS, MDS). Flapless computer-guided surgeries & guaranteed on-time consultations.
              </p>
            </div>
          </div>

          {/* Bottom Booking Action in Drawer */}
          <div className="pt-8 border-t border-white/15 space-y-4">
            <button
              onClick={handleBookingClick}
              className="w-full py-4 rounded-xl bg-white text-[#28395C] font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#28395C]" />
              <span>Book Appointment</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-white/70">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 98765 43210 — Metropolis Dental Clinic</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
