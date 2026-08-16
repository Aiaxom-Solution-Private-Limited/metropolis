"use client";

import React, { useState } from "react";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, ThumbsUp, Sparkles } from "lucide-react";

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
    tags: ["Doctor Friendliness", "Explanation of Health Issue", "Treatment Satisfaction"],
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
    text: "I had root canal treatment done on two teeth by Dr. Pratim Talukdar. The treatment was excellent, and the clinic was very hygienic. The doctor explained the procedure clearly, and overall, I am satisfied with the treatment despite the long waiting time.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Root Canal Treatment", "Hygienic Clinic", "Clear Procedure Explanation"],
  },
  {
    id: 4,
    text: "Treatment plan was rightly decided and extreme care was taken during the procedure. Comfort of the patient was taken into consideration.",
    rating: 5,
    badge: "Verified Patient",
    tags: ["Right Treatment Plan", "Extreme Patient Care", "Comfort First"],
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="testimonials" className="relative py-32 px-6 md:px-12 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#28395C] text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#28395C]" />
              <span>VERIFIED PATIENT EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              Real Patient Stories & <br />
              <span className="font-serif italic text-[#28395C]">Clinical Testimonials.</span>
            </h2>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#28395C] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#28395C] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Grid Layout (4 Cards in 2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((rev, index) => (
            <div
              key={rev.id}
              onClick={() => setActiveIndex(index)}
              className={`p-8 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                activeIndex === index
                  ? "border-[#28395C] shadow-xl ring-2 ring-[#28395C]/10"
                  : "border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg"
              }`}
            >
              <div>
                {/* Header: Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{rev.badge}</span>
                  </div>
                </div>

                {/* Review Text Body */}
                <p className="text-slate-700 text-sm sm:text-base font-body leading-relaxed mb-8">
                  "{rev.text}"
                </p>
              </div>

              {/* Footer: Structured Key Metrics / Tags */}
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  KEY HIGHLIGHTS & RATING TAGS
                </span>
                <div className="flex flex-wrap gap-2">
                  {rev.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5"
                    >
                      <ThumbsUp className="w-3 h-3 text-[#28395C]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "w-8 bg-[#28395C]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
