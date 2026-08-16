"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COURSES_DATA, Course } from "@/data/courses";
import CourseEnquireModal from "@/components/courses/CourseEnquireModal";
import AppointmentModal from "@/components/booking/AppointmentModal";
import { GraduationCap, Clock, Award, Sparkles, MessageCircle, ArrowRight, ShieldCheck, UserCheck, Phone, CheckCircle2 } from "lucide-react";

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleEnquire = (course: Course) => {
    setSelectedCourse(course);
    setIsEnquireModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} />

      {/* Hero Banner Section for Courses */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#0F172A] via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800">
        
        {/* Background Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mx-auto">
            <GraduationCap className="w-4 h-4 text-[#60A5FA]" />
            <span>METROPOLIS DENTAL ACADEMY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            Clinical Training & <br />
            <span className="font-serif italic font-normal text-slate-300">Dental Masterclasses</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Hands-on surgical & aesthetic training modules designed for dental practitioners, led by Dr. Pratim Talukdar (Specialist Implantologist & Prosthodontist).
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Hands-On Workshops</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>Small Batch Personal Mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Live Surgical Demonstrations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Courses Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-white">Available Training Modules</h2>
              <p className="text-sm text-slate-400 mt-1">Select a course to view details or register an inquiry with our coordinator.</p>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-bold">{COURSES_DATA.length}</span> Modules
            </div>
          </div>

          {/* Grid Layout Displaying Training Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {COURSES_DATA.map((course) => (
              <div
                key={course.id}
                className="group rounded-[2rem] bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Course Banner Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={course.bannerImage}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                    <span>{course.category}</span>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[11px] font-semibold">
                    <span>{course.level}</span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-slate-200 text-xs font-medium bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:text-[#60A5FA] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">
                      {course.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Key Module Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                          >
                            <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Course Card CTA */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <button
                      onClick={() => handleEnquire(course)}
                      className="flex-1 py-4 px-6 rounded-2xl bg-[#28395C] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-white/10 flex items-center justify-center gap-2.5 cursor-pointer group/btn"
                    >
                      <span>Learn More / Enquire</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleEnquire(course)}
                      className="w-13 h-13 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title="Enquire via WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Box */}
          <div className="mt-16 p-8 sm:p-10 rounded-[2rem] bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-light text-white">Custom Dental Workshop or Institutional Inquiry?</h3>
              <p className="text-sm text-slate-400">Contact Dr. Pratim Talukdar directly for customized group hands-on modules.</p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi%20Dr.%20Talukdar,%20I'm%20interested%20in%20a%20customized%20dental%20workshop."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2.5 shrink-0 shadow-lg cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Course Inquiry Modal */}
      <CourseEnquireModal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        selectedCourse={selectedCourse}
      />

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </main>
  );
}
