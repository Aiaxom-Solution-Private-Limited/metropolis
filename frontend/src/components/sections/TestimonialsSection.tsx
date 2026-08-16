"use client";

import React, { useRef } from "react";
import { Star, CheckCircle2, ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface ReviewItem {
  id: number;
  text: string;
  rating: number;
  badge: string;
  tags: string[];
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    text: "Dr. Pratim Talukdar is an expert and sincere dentist. The clinic is very clean and equipped with modern tools, and the staff made sure I was comfortable. He explained the treatment clearly, was friendly, and the appointment started right on time with reasonable fees.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Doctor Friendliness", "Clear Explanation", "Treatment Satisfaction"],
  },
  {
    id: 2,
    text: "Doctor is very polite and patient. The staff is also very friendly and helpful. Treatment procedure was carried on very smoothly.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Polite & Patient Doctor", "Smooth Procedure", "Friendly & Helpful Staff"],
  },
  {
    id: 3,
    text: "I had root canal treatment done on two teeth by Dr. Pratim Talukdar. The treatment was excellent, and the clinic was very hygienic. The doctor explained the procedure clearly, and overall, I am satisfied with the treatment.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Root Canal Treatment", "Hygienic Clinic", "Procedure Explanation"],
  },
  {
    id: 4,
    text: "Treatment plan was rightly decided and extreme care was taken during the procedure. Comfort of the patient was taken into consideration at every step.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Right Treatment Plan", "Extreme Patient Care", "Comfort First"],
  },
];

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeftByCard = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRightByCard = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative py-28 px-6 md:px-12 bg-[#fafafb] text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">
              OUR REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-none">
              What Our <span className="font-serif italic text-[#28395C]">Patients Say</span>
            </h2>
          </div>

          {/* Minimal Dark Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeftByCard}
              className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm active:scale-95 cursor-pointer"
              aria-label="Previous Testimonials"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollRightByCard}
              className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm active:scale-95 cursor-pointer"
              aria-label="Next Testimonials"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Clean Horizontal Testimonials Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-6 -mx-6 px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="group relative w-[85vw] sm:w-[380px] md:w-[400px] shrink-0 rounded-3xl bg-white border border-slate-200/90 p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-500 ease-out overflow-hidden"
            >
              {/* Color Waves Rising from Below to Middle on Hover */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-amber-400/40 via-orange-300/25 to-transparent blur-xl rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-y-8 group-hover:translate-y-0" />
              <div className="absolute -bottom-10 inset-x-4 h-1/2 bg-gradient-to-t from-[#28395C]/25 via-sky-400/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 pointer-events-none translate-y-6 group-hover:translate-y-0" />

              {/* Card Content (z-10 relative) */}
              <div className="relative z-10">
                {/* Top Bar: 5-Star Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">5.0</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200/60 text-emerald-700 group-hover:bg-white/80 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{rev.badge}</span>
                  </div>
                </div>

                {/* Oversized Quote Icon */}
                <Quote className="w-7 h-7 text-[#28395C]/30 mb-3 stroke-[1.5] group-hover:text-[#28395C] transition-colors" />

                {/* Patient Testimonial Content */}
                <p className="text-slate-800 text-sm sm:text-base font-normal font-body leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Footer Highlight Tags (Clean text only, no icon) */}
              <div className="relative z-10 pt-5 border-t border-slate-100 group-hover:border-slate-200/60 transition-colors">
                <div className="flex flex-wrap gap-2">
                  {rev.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 group-hover:bg-white/90 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
