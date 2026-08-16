"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";
import AppointmentModal from "@/components/booking/AppointmentModal";

export default function ContactPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} />

      {/* Main Contact Section */}
      <div className="pt-24">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </main>
  );
}
