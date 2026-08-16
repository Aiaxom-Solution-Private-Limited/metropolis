"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LightboxModal from "@/components/gallery/LightboxModal";
import AppointmentModal from "@/components/booking/AppointmentModal";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/data/gallery";
import { Camera, Eye, Sparkles, Filter, ShieldCheck, HeartHandshake, Layers } from "lucide-react";
import { API_BASE, getMediaUrl } from "@/lib/api";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [itemsList, setItemsList] = useState<GalleryItem[]>(GALLERY_ITEMS);

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
            setItemsList(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic gallery:", err);
      }
    }

    loadDynamicGallery();
  }, []);

  // Filter gallery items based on active tab
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return itemsList;
    return itemsList.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, itemsList]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0F172A] via-slate-900 to-slate-950 border-b border-slate-800 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mx-auto">
            <Camera className="w-4 h-4 text-[#60A5FA]" />
            <span>VISUAL CLINIC TOUR & TRANSFORMATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            Metropolis Dental <br />
            <span className="font-serif italic font-normal text-slate-300">Photo & Smile Gallery</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Step inside Metropolis Dental Clinic & Implant Centre. Experience our sterile surgical suites, high-precision CBCT digital tools, and real patient smile reconstructions.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Sterile Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>3D Digital Diagnostics</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-indigo-400" />
              <span>Verified Transformations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>
            {GALLERY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-white text-slate-950 shadow-lg scale-105"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Interactive Grid / Masonry Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(idx)}
                className="group relative h-80 sm:h-96 rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-xl cursor-pointer transition-all duration-500 hover:border-slate-600 hover:shadow-2xl flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold z-10">
                  <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                  <span>{item.category}</span>
                </div>

                {/* Hover Eye Icon */}
                <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-10 shadow-lg">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light text-white mb-2 group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center text-slate-500">
              No gallery images found in this category.
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentIndex}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </main>
  );
}
