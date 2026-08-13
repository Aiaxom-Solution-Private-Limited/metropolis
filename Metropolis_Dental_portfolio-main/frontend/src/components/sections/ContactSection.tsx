"use client";

import React from "react";
import { MapPin, Phone, Clock, ExternalLink, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  onOpenBookingModal?: () => void;
}

export default function ContactSection({ onOpenBookingModal }: ContactSectionProps) {
  const handleBookingClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const bookingElem = document.getElementById("booking");
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-slate-900 border-t border-slate-800 text-white overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-[#60A5FA]" />
            <span>VISIT US OR GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
            Contact Metropolis <br />
            <span className="font-serif italic font-normal text-slate-300">Dental Clinic</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-body leading-relaxed">
            Conveniently located in Ulubari, Guwahati. Reach out for consultations, emergency dental care, or clinic directions.
          </p>
        </div>

        {/* Info Grid & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl flex items-start gap-5 hover:border-slate-700 transition-colors">
              <div className="w-13 h-13 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#60A5FA] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinic Address</h4>
                <p className="text-base font-light text-white leading-snug">
                  Ground Floor, Ffort Building, Kachari Basti Road, Opposite Barbeque Nation, Ulubari, Guwahati, Assam
                </p>
                <a
                  href="https://maps.google.com/?q=Ground+Floor+Ffort+Building+Kachari+Basti+Road+Opposite+Barbeque+Nation+Ulubari+Guwahati+Assam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#60A5FA] hover:text-white font-medium pt-2 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl flex items-start gap-5 hover:border-slate-700 transition-colors">
              <div className="w-13 h-13 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-2 w-full">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Operating Hours</h4>
                <div className="space-y-1 text-sm font-light text-white">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-300">Mon – Sat:</span>
                    <span className="font-medium text-white">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">Sunday:</span>
                    <span className="font-medium text-white">10:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Lines Card */}
            <div className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl flex items-start gap-5 hover:border-slate-700 transition-colors">
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Phone Lines</h4>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href="tel:+918811082782"
                    className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>+91 88110 82782</span>
                  </a>
                  <a
                    href="tel:+91600014053"
                    className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>+91 60001 4053</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">Tap phone numbers above to call directly from mobile.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Google Maps Widget */}
          <div className="lg:col-span-7 h-full">
            <div className="w-full h-[480px] lg:h-[540px] rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
              <iframe
                title="Metropolis Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.9571342678074!2d91.7588863!3d26.165416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a598925555555%3A0x1!2sKachari%20Basti%20Rd%2C%20Ulubari%2C%20Guwahati%2C%20Assam%20781007!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "brightness(0.9) contrast(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#28395C] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Metropolis Dental Clinic</h5>
                    <p className="text-[11px] text-slate-400">Opposite Barbeque Nation, Ulubari, Guwahati</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Ground+Floor+Ffort+Building+Kachari+Basti+Road+Opposite+Barbeque+Nation+Ulubari+Guwahati+Assam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Clean Luxury Banner directly below contact grid */}
        <div className="relative p-10 sm:p-16 rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-center space-y-6">
          
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10 opacity-50 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest relative z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>METROPOLIS DENTAL STANDARDS</span>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Engineered solutions for complex oral rehabilitation.
            </h3>
            <p className="text-slate-300 text-lg sm:text-2xl font-serif italic">
              Uncompromising excellence in modern oral healthcare.
            </p>
          </div>

          <div className="pt-4 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={handleBookingClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#28395C]" />
              <span>Begin Your Dental Journey</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+918811082782"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-white/10 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call +91 88110 82782</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
