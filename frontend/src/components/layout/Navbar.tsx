"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Shield, Calendar, ArrowRight, Phone, Award } from "lucide-react";

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

function ToothIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.5 3C15.8 3 14.5 4 12 5.5C9.5 4 8.2 3 6.5 3C3.5 3 2 5.5 2 9C2 12.5 3.5 15 5 18C6.2 20.4 7.5 22 8.5 22C9.5 22 9.8 20 10.2 18C14.2 20 14.5 22 15.5 22C16.5 22 17.8 20.4 19 18C22 15 22 12.5 22 9C22 5.5 20.5 3 17.5 3Z" />
    </svg>
  );
}

function AnimatedHamburgerX({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5 flex flex-col justify-center items-center pointer-events-none">
      {/* Top line */}
      <span
        className={`absolute h-[2.5px] w-5 bg-white rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
        }`}
      />
      {/* Middle line */}
      <span
        className={`absolute h-[2.5px] w-5 bg-white rounded-full transition-all duration-400 ease-in-out ${
          isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
        }`}
      />
      {/* Bottom line */}
      <span
        className={`absolute h-[2.5px] w-5 bg-white rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
        }`}
      />
    </div>
  );
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State & Ref for liquid floating hover bubble inside desktop pill
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bubbleStyle, setBubbleStyle] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Dr. Pratim Talukdar", href: "/#doctor" },
    { label: "Courses", href: "/courses" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  const updateBubblePosition = (element: HTMLElement) => {
    if (!navContainerRef.current || !element) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();

    setBubbleStyle({
      left: targetRect.left - containerRect.left,
      top: targetRect.top - containerRect.top,
      width: targetRect.width,
      height: targetRect.height,
    });
  };

  const handleOptionHover = (index: number, e: React.MouseEvent<HTMLElement>) => {
    setHoveredIndex(index);
    updateBubblePosition(e.currentTarget);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setBubbleStyle(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setSidebarOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const targetElem = document.getElementById(id);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
        setTimeout(() => {
          const elem = document.getElementById(id);
          if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    } else {
      router.push(href);
    }
  };

  const handleBookingClick = () => {
    setSidebarOpen(false);
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const bookingElem = document.getElementById("booking");
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/#contact");
      }
    }
  };

  return (
    <>
      {/* Main Header Container */}
      <header className="fixed top-0 left-0 right-0 z-[110] py-6 px-6 sm:px-10 lg:px-14 bg-transparent pointer-events-none">
        <div className="w-full flex items-center justify-between pointer-events-auto relative">
          
          {/* Logo (Top-Left Corner) */}
          <a href="/" className="group flex items-center gap-3 shrink-0">
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
            Desktop Center Pill / Scrolled Circle Trigger:
            - Unscrolled: Dead-centered horizontal pill (#28395C).
            - Scrolled: Morphs smoothly to top-right circle trigger button.
          */}
          <div
            className={`hidden md:flex items-center absolute left-1/2 top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "translate-x-[calc(50vw-5.5rem)] z-[120]"
                : "-translate-x-1/2 z-40"
            }`}
          >
            <div
              onClick={() => {
                if (scrolled) setSidebarOpen(!sidebarOpen);
              }}
              className={`relative flex items-center bg-[#28395C] text-white shadow-xl border border-white/15 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                scrolled
                  ? "w-12 h-12 rounded-full cursor-pointer hover:scale-105 justify-center p-0"
                  : "w-auto px-7 py-3 rounded-full justify-between gap-1.5"
              }`}
            >
              {/* Horizontal Pill Links (Visible when unscrolled) */}
              <div
                ref={navContainerRef}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center gap-1.5 transition-all duration-500 ${
                  scrolled
                    ? "opacity-0 scale-75 pointer-events-none absolute"
                    : "opacity-100 scale-100 relative"
                }`}
              >
                {/* Dynamic Floating Glass Bubble Highlight */}
                {bubbleStyle && hoveredIndex !== null && !scrolled && (
                  <div
                    className="absolute rounded-full pointer-events-none z-0 transition-all duration-200 ease-out"
                    style={{
                      left: bubbleStyle.left,
                      top: bubbleStyle.top,
                      width: bubbleStyle.width,
                      height: bubbleStyle.height,
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/20 to-white/25 border border-white/40 shadow-sm backdrop-blur-md" />
                  </div>
                )}

                {/* Nav Links */}
                {navItems.map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={(e) => handleOptionHover(idx, e)}
                    className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                      hoveredIndex === idx
                        ? "text-white font-bold drop-shadow-sm"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Book Appointment CTA Button */}
                <button
                  onClick={handleBookingClick}
                  onMouseEnter={(e) => handleOptionHover(navItems.length, e)}
                  className={`relative z-10 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    hoveredIndex === navItems.length
                      ? "text-white bg-white/20 shadow-sm"
                      : "text-white bg-white/15 hover:bg-white/25"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* 3-Bar Hamburger Morphing into X (Visible ONLY when scrolled down) */}
              <div
                className={`transition-all duration-500 flex items-center justify-center ${
                  scrolled
                    ? "opacity-100 scale-100 relative"
                    : "opacity-0 scale-50 absolute pointer-events-none"
                }`}
              >
                <AnimatedHamburgerX isOpen={sidebarOpen} />
              </div>
            </div>
          </div>

          {/* Mobile Circle Trigger Button (Top-Right) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-[#28395C] text-white flex items-center justify-center shadow-md cursor-pointer ml-auto relative z-[120]"
            aria-label="Toggle Navigation Drawer"
          >
            <AnimatedHamburgerX isOpen={sidebarOpen} />
          </button>

        </div>
      </header>

      {/* Backdrop Tint */}
      <div
        className={`fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-1000 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* 
        Radial Morphing Drawer Panel:
        Expands organically from circle button center over 1.2s.
        Sidebar content displays immediately without any slow delayed fade-in.
      */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#28395C]/95 backdrop-blur-2xl text-white shadow-[0_0_60px_rgba(0,0,0,0.5)] p-8 sm:p-10 flex flex-col justify-between overflow-y-auto border-l border-white/20 z-[100] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          clipPath: sidebarOpen
            ? "circle(150vw at calc(100% - 3.5rem) 3.5rem)"
            : "circle(0px at calc(100% - 3.5rem) 3.5rem)",
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
      >
        {/* Sidebar Content (Displays Immediately) */}
        <div
          className={`h-full flex flex-col justify-between transition-opacity duration-150 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div>
            {/* Drawer Top Header (Title & Logo on left) */}
            <div className="flex items-center justify-between pb-8 border-b border-white/15 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md p-0.5 border border-white/25 shadow-md">
                  <div className="w-full h-full bg-[#28395C] rounded-[14px] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-white drop-shadow-sm">METROPOLIS DENTAL</h3>
                  <p className="text-[9px] tracking-widest uppercase text-white/70">Dr. Pratim Talukdar</p>
                </div>
              </div>
            </div>

            {/* Navigation Options */}
            <nav className="mt-8 flex flex-col gap-2">
              {/* Option 1 */}
              <button
                type="button"
                onClick={() => handleNavClick("/#doctor")}
                className="group flex items-center justify-between py-3.5 px-3 rounded-xl transition-all duration-300 hover:scale-105 hover:translate-x-2 hover:bg-white/10 text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:rotate-12 transition-all duration-300 shadow-sm">
                    <ToothIcon className="w-5 h-5 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="text-base font-medium text-white/85 group-hover:text-white group-hover:font-bold tracking-wide transition-all">
                    Dr. Pratim Talukdar
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
              </button>

              {/* Option 2 */}
              <button
                type="button"
                onClick={() => handleNavClick("/courses")}
                className="group flex items-center justify-between py-3.5 px-3 rounded-xl transition-all duration-300 hover:scale-105 hover:translate-x-2 hover:bg-white/10 text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:rotate-12 transition-all duration-300 shadow-sm">
                    <ToothIcon className="w-5 h-5 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="text-base font-medium text-white/85 group-hover:text-white group-hover:font-bold tracking-wide transition-all">
                    Training Courses
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
              </button>

              {/* Option 3 */}
              <button
                type="button"
                onClick={() => handleNavClick("/gallery")}
                className="group flex items-center justify-between py-3.5 px-3 rounded-xl transition-all duration-300 hover:scale-105 hover:translate-x-2 hover:bg-white/10 text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:rotate-12 transition-all duration-300 shadow-sm">
                    <ToothIcon className="w-5 h-5 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="text-base font-medium text-white/85 group-hover:text-white group-hover:font-bold tracking-wide transition-all">
                    Clinic & Smile Gallery
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
              </button>

              {/* Option 4 */}
              <button
                type="button"
                onClick={() => handleNavClick("/contact")}
                className="group flex items-center justify-between py-3.5 px-3 rounded-xl transition-all duration-300 hover:scale-105 hover:translate-x-2 hover:bg-white/10 text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:rotate-12 transition-all duration-300 shadow-sm">
                    <ToothIcon className="w-5 h-5 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="text-base font-medium text-white/85 group-hover:text-white group-hover:font-bold tracking-wide transition-all">
                    Contact Us & Directions
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
              </button>
            </nav>

            {/* Clinical Highlights Badge */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 space-y-2 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Specialist Implantologist & Prosthodontist</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-body">
                Led by Dr. Pratim Talukdar (BDS, MDS). Flapless computer-guided surgeries & guaranteed on-time consultations.
              </p>
            </div>

            {/* Book Appointment CTA Button */}
            <button
              type="button"
              onClick={handleBookingClick}
              className="mt-6 group flex items-center justify-between p-4 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/35 hover:scale-[1.03] transition-all duration-300 text-left w-full cursor-pointer shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-bold text-white tracking-wide">Book Appointment</span>
              </div>
              <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
            </button>
          </div>

          {/* Phone Info Banner at the very bottom */}
          <div className="pt-6 mt-8 border-t border-white/15 flex items-center justify-center gap-2 text-xs text-white/70">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210 — Metropolis Dental Clinic</span>
          </div>
        </div>
      </div>
    </>
  );
}
