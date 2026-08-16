"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroAnimation from "@/components/Hero/HeroAnimation";
import DoctorIntroSection from "@/components/sections/DoctorIntroSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CoursesPreviewSection from "@/components/sections/CoursesPreviewSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import AppointmentModal from "@/components/booking/AppointmentModal";
import { useLenisScroll } from "@/hooks/useLenis";

export default function Home() {
  useLenisScroll();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-[#677274] text-slate-900 overflow-x-hidden selection:bg-[#28395C] selection:text-white">
      {/* Floating Transparent Luxury Navbar */}
      <Navbar onOpenBookingModal={() => setIsBookingOpen(true)} />

      {/* Hero Pinned 100vw x 100vh Full Bleed Canvas Animation */}
      <HeroAnimation onOpenBookingModal={() => setIsBookingOpen(true)} />

      {/* 1. Doctor Profile Section */}
      <div id="doctor">
        <DoctorIntroSection />
      </div>

      {/* 2. Testimonials Section (Positioned below Dr. Pratim info) */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* 3. Courses Preview Section */}
      <div id="courses-preview">
        <CoursesPreviewSection />
      </div>

      {/* 4. Gallery Preview Section */}
      <div id="gallery-preview">
        <GalleryPreviewSection />
      </div>

      {/* 5. Contact Section & "Begin your dental journey" Banner */}
      <div id="contact">
        <ContactSection onOpenBookingModal={() => setIsBookingOpen(true)} />
      </div>

      {/* Luxury Footer */}
      <Footer />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
