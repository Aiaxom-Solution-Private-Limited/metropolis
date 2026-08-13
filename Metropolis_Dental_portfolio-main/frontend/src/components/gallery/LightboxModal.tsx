"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Shield } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-opacity duration-300 p-4 sm:p-8">
      
      {/* Background Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">METROPOLIS GALLERY</span>
            <p className="text-[11px] text-slate-400">Image {currentIndex + 1} of {items.length}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer pointer-events-auto border border-white/10"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View Container */}
      <div className="relative z-10 w-full max-w-5xl h-[80vh] flex flex-col md:flex-row items-center justify-center gap-6 overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-4 sm:p-6">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 w-12 h-12 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border border-white/10 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 w-12 h-12 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border border-white/10 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Image Display */}
        <div className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950">
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            className="object-contain transition-all duration-300"
            priority
          />
        </div>

        {/* Image Information Panel */}
        <div className="w-full md:w-80 shrink-0 p-4 sm:p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              {currentItem.category}
            </span>
            <h3 className="text-xl font-light text-white mb-2 leading-snug">
              {currentItem.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-body">
              {currentItem.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> High Resolution
            </span>
            <span>Use ← → to navigate</span>
          </div>
        </div>

      </div>

    </div>
  );
}
