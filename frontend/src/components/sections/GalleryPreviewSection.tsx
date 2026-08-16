"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import LightboxModal from "@/components/gallery/LightboxModal";
import { API_BASE, getMediaUrl } from "@/lib/api";

export default function GalleryPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS.slice(0, 6));

  // Touch / Drag swipe state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch(`${API_BASE}/gallery`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped: GalleryItem[] = data.map((img: any) => ({
              id: `api-${img.id}`,
              title: img.title || img.original_filename.replace(/\.[^/.]+$/, ""),
              category: (img.category as any) || "Infrastructure",
              src: getMediaUrl(img.url),
              description: img.description || `High-resolution clinical preview of ${img.title || img.original_filename}.`,
            }));
            setItems(mapped.slice(0, 11));
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic gallery:", err);
      }
    }

    loadDynamicGallery();
  }, []);

  const total = items.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Drag / Touch Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchStartX(clientX);
    setTouchEndX(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchEndX(clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    setIsDragging(false);
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeItem = items[activeIndex] || items[0];

  // Helper index calculators for peeking neighbors
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return (
    <section
      id="gallery-preview"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#FAF9F6] text-slate-900 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 px-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#28395C] block mb-3">
              OUR CLINIC
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-900 leading-tight tracking-tight">
              Inside Metropolis <br />
              <span className="font-serif italic font-normal text-slate-700">
                Dental & Implant Centre
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            <p className="text-slate-600 text-sm sm:text-base font-body leading-relaxed md:text-right">
              Explore our modern clinical environment, advanced dental technology, surgical suites, and patient spaces.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#28395C] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={containerRef}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full select-none cursor-grab active:cursor-grabbing"
        >
          <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[540px] py-4">
            
            {/* PREVIOUS IMAGE */}
            <div
              onClick={handlePrev}
              className="absolute left-[-15%] sm:left-[-5%] md:left-[2%] w-[65%] sm:w-[50%] md:w-[42%] h-[300px] sm:h-[380px] md:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg opacity-40 hover:opacity-75 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform scale-90 -translate-x-4 cursor-pointer z-10 hidden sm:block bg-slate-200"
            >
              <img
                src={items[prevIndex]?.src}
                alt={items[prevIndex]?.title}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* MAIN CENTER IMAGE */}
            <div className="relative w-full sm:w-[85%] md:w-[72%] h-[340px] sm:h-[440px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 group bg-slate-900 border border-slate-200/60">
              <img
                src={activeItem?.src}
                alt={activeItem?.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye className="w-4 h-4 text-[#28395C]" />
                  <span>View Full Photo</span>
                </div>
              </div>
            </div>

            {/* NEXT IMAGE */}
            <div
              onClick={handleNext}
              className="absolute right-[-15%] sm:right-[-5%] md:right-[2%] w-[65%] sm:w-[50%] md:w-[42%] h-[300px] sm:h-[380px] md:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg opacity-40 hover:opacity-75 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform scale-90 translate-x-4 cursor-pointer z-10 hidden sm:block bg-slate-200"
            >
              <img
                src={items[nextIndex]?.src}
                alt={items[nextIndex]?.title}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

          </div>

          {/* Controls Bar */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2 sm:px-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-300 bg-white hover:bg-[#28395C] text-slate-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-300 bg-white hover:bg-[#28395C] text-slate-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer active:scale-95"
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-medium text-slate-900">
                  {activeItem?.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-body max-w-lg line-clamp-1">
                  {activeItem?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                Slide
              </span>
              <div className="px-4 py-2 rounded-full bg-slate-200/80 text-slate-900 font-mono text-sm font-bold tracking-wider">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={items}
        currentIndex={activeIndex}
        onNavigate={(idx) => setActiveIndex(idx)}
      />
    </section>
  );
}
