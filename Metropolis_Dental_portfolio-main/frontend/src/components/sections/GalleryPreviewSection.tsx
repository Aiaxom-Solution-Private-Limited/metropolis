"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight, Eye, Sparkles } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import LightboxModal from "@/components/gallery/LightboxModal";

export default function GalleryPreviewSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take first 6 items for the homepage preview
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery-preview" className="relative py-28 px-6 md:px-12 bg-slate-950 border-t border-slate-800 text-white overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Camera className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>CLINICAL INFRASTRUCTURE & TRANSFORMATIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Tour Our Clinic & <br />
              <span className="font-serif italic font-normal text-slate-300">Smile Gallery</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-slate-400 text-sm max-w-md md:text-right font-body">
              Explore Metropolis Dental Clinic & Implant Centre's ultra-clean surgical suites, 3D CBCT diagnostic tools, and real patient transformations.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 group cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Responsive Grid Preview (Masonry/Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleImageClick(idx)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl cursor-pointer transition-all duration-500 hover:border-slate-600 hover:shadow-2xl"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                <span>{item.category}</span>
              </div>

              {/* Hover Eye Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <Eye className="w-4 h-4 text-blue-400" />
              </div>

              {/* Card Footer Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base sm:text-lg font-light text-white mb-1 group-hover:text-[#60A5FA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 font-body">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Redirect Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA] shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Want to See More Clinical Photos & Before/After Shots?</h4>
              <p className="text-xs text-slate-400">View all infrastructure rooms, surgical suites, and transformation galleries.</p>
            </div>
          </div>
          <Link
            href="/gallery"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-widest transition-all duration-200 text-center shrink-0 shadow-lg"
          >
            Explore Full Gallery
          </Link>
        </div>

      </div>

      {/* Lightbox Modal View */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={previewItems}
        currentIndex={currentIndex}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </section>
  );
}
