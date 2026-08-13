"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight, Clock, Award, Sparkles, MessageCircle } from "lucide-react";
import { COURSES_DATA, Course } from "@/data/courses";
import CourseEnquireModal from "@/components/courses/CourseEnquireModal";

export default function CoursesPreviewSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Take the first 2 courses for the homepage preview
  const previewCourses = COURSES_DATA.slice(0, 2);

  const handleEnquire = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <section id="courses-preview" className="relative py-28 px-6 md:px-12 bg-slate-900 border-t border-slate-800 text-white overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>CLINICAL ACADEMY & TRAINING</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Specialized Dental <br />
              <span className="font-serif italic font-normal text-slate-300">Training & Masterclasses</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-slate-400 text-sm max-w-md md:text-right font-body">
              Empowering dental surgeons and practitioners with advanced hands-on surgical, aesthetic, and implantology modules led by Dr. Pratim Talukdar.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 group cursor-pointer"
            >
              <span>Check Out All Courses</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 2 Courses Grid Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {previewCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-3xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Banner Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={course.bannerImage}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                  <span>{course.category}</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-slate-300 text-xs font-medium bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:text-[#60A5FA] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">
                    {course.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {course.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                      >
                        <Award className="w-3 h-3 text-blue-400" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleEnquire(course)}
                    className="flex-1 py-3.5 px-5 rounded-xl bg-[#28395C] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Learn More / Enquire</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleEnquire(course)}
                    className="w-12 h-12 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner redirect */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Explore Full Masterclass Catalog</h4>
              <p className="text-xs text-slate-400">Discover all upcoming hands-on modules in implantology, prosthodontics & endodontics.</p>
            </div>
          </div>
          <Link
            href="/courses"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-widest transition-all duration-200 text-center shrink-0 shadow-lg"
          >
            Check Out All Courses
          </Link>
        </div>

      </div>

      {/* Course Inquiry Modal */}
      <CourseEnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCourse={selectedCourse}
      />
    </section>
  );
}
