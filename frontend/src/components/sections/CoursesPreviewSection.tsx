"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, ArrowUpRight, Clock, Award, Sparkles } from "lucide-react";
import { COURSES_DATA, Course } from "@/data/courses";
import CourseEnquireModal from "@/components/courses/CourseEnquireModal";
import { API_BASE, getMediaUrl } from "@/lib/api";

export default function CoursesPreviewSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES_DATA.slice(0, 3));

  useEffect(() => {
    async function loadDynamicCourses() {
      try {
        const res = await fetch(`${API_BASE}/courses`);
        if (res.ok) {
          const apiCourses = await res.json();
          if (apiCourses && apiCourses.length > 0) {
            const mapped: Course[] = apiCourses.map((c: any) => ({
              id: `api-${c.id}`,
              title: c.title,
              category: c.category || "Clinical Residency",
              duration: c.duration || "Intensive Masterclass",
              description: c.description,
              bannerImage: getMediaUrl(c.image_url),
              previewImages: [
                getMediaUrl(c.image_url),
                "/images/about_me_dental.jpg",
                "/images/implant_course.png",
              ],
              highlights: ["CBCT & Digital Planning", "Hands-On Surgical Surgery", "Live Mentorship"],
              level: "Mastery Level",
            }));
            setCoursesList(mapped.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Using static course catalog fallback:", err);
      }
    }

    loadDynamicCourses();
  }, []);

  const handleEnquire = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <section
      id="courses-preview"
      className="relative py-28 px-6 md:px-12 bg-slate-950 text-white border-t border-slate-800/80 overflow-hidden"
    >
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#28395C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>METROPOLIS DENTAL ACADEMY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Selected Clinical <br />
              <span className="font-serif italic font-normal text-slate-300">Masterclasses & Residency</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-slate-400 text-sm max-w-md md:text-right font-body leading-relaxed">
              Empowering dental surgeons with hands-on surgical & prosthetic modules led by Dr. Pratim Talukdar.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 group cursor-pointer"
            >
              <span>View All Masterclasses</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Vertical Course List */}
        <div className="divide-y divide-slate-800/80 border-t border-b border-slate-800/80">
          {coursesList.map((course) => {
            const isHovered = hoveredCourseId === course.id;

            return (
              <div
                key={course.id}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                onClick={() => handleEnquire(course)}
                className={`group py-8 md:py-10 px-2 sm:px-4 cursor-pointer transition-all duration-500 rounded-2xl ${
                  isHovered ? "bg-slate-900/60 shadow-2xl" : "hover:bg-slate-900/30"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#60A5FA]">
                        {course.category}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-[#60A5FA] transition-colors duration-300">
                      {course.title}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-400 font-body leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {course.highlights.map((h, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium"
                        >
                          <Award className="w-3 h-3 text-[#60A5FA]" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                      Explore Module
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#28395C] border border-white/10 group-hover:border-[#28395C] flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* EXPANDED SECTION */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isHovered ? "max-h-[260px] opacity-100 pt-6 mt-4 border-t border-slate-800/60" : "max-h-0 opacity-0 pt-0 mt-0"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {course.previewImages.map((imgSrc, imgIdx) => {
                      const delayClass =
                        imgIdx === 0
                          ? "delay-[75ms]"
                          : imgIdx === 1
                          ? "delay-[225ms]"
                          : "delay-[375ms]";

                      return (
                        <div
                          key={imgIdx}
                          className={`relative h-40 sm:h-44 rounded-2xl overflow-hidden border border-slate-800/90 shadow-xl bg-slate-900 transition-all duration-500 ease-out ${
                            isHovered
                              ? `opacity-100 scale-100 translate-y-0 ${delayClass}`
                              : "opacity-0 scale-95 translate-y-3 duration-300"
                          }`}
                        >
                          <img
                            src={imgSrc}
                            alt={`${course.title} detail ${imgIdx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 font-mono">
                            <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                            <span>Preview 0{imgIdx + 1}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-mono">
            Looking for group institutional workshops or personal surgical training?{" "}
            <Link href="/courses" className="text-[#60A5FA] underline font-bold hover:text-white">
              View full curriculum & details
            </Link>
          </p>
        </div>

      </div>

      <CourseEnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCourse={selectedCourse}
      />
    </section>
  );
}
