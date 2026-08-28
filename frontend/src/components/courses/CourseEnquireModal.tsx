"use client";

import React from "react";
import { X, GraduationCap, MessageCircle, Phone, ArrowRight, Clock } from "lucide-react";
import { Course, COURSES_DATA } from "@/data/courses";

interface CourseEnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: Course | null;
}

export default function CourseEnquireModal({ isOpen, onClose, selectedCourse }: CourseEnquireModalProps) {
  if (!isOpen) return null;

  const currentCourse = selectedCourse || COURSES_DATA[0];

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Dr. Pratim Talukdar,\n\nI would like to inquire about enrolling in the course: "${currentCourse.title}".\n\nPlease share the upcoming batch dates, curriculum details, and enrollment process.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#28395C] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wide">Course Inquiry</h3>
              <p className="text-xs text-white/70">Clinical Mentorship by Dr. Pratim Talukdar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Course Details Preview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#28395C] bg-[#28395C]/10 px-2.5 py-1 rounded-full">
                {currentCourse.category || "Clinical Residency"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentCourse.duration || "Intensive Module"}
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900 leading-snug">
              {currentCourse.title}
            </h4>

            {currentCourse.description && (
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentCourse.description}
              </p>
            )}
          </div>

          <div className="text-center space-y-1">
            <h5 className="text-sm font-semibold text-slate-900">Direct Academy Inquiry</h5>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Connect directly with Dr. Pratim Talukdar & team on WhatsApp for instant curriculum, batch dates, and fee details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2.5 cursor-pointer group active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Connect Direct on WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+919876543210"
              className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200/80"
            >
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Call Clinic (+91 98765 43210)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
