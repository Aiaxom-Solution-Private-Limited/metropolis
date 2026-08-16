"use client";

import React, { useState } from "react";
import { Calendar, Phone, Mail, Clock, CheckCircle, AlertCircle, User, MessageSquare, Clock3, Sparkles, ArrowRight } from "lucide-react";

export default function AppointmentCTASection() {
  // Today's date string formatted YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    preferredDate: "",
    timeSlot: "10:00 AM - 11:30 AM",
    notes: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Phone number mobile validation helper
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, "");
    const mobileRegex = /^[0-9]{10,12}$/;
    if (!cleaned) {
      return "Phone number is required.";
    }
    if (!mobileRegex.test(cleaned)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return "";
  };

  // Date validation helper (disallow past dates)
  const validateDate = (dateVal: string) => {
    if (!dateVal) {
      return "Preferred date is required.";
    }
    const selectedDate = new Date(dateVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      return "Invalid date request: Please select today or a future date.";
    }
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, phone: val });
    if (phoneError) setPhoneError(validatePhone(val));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, preferredDate: val });
    if (dateError) setDateError(validateDate(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Phone & Date
    const pErr = validatePhone(formData.phone);
    const dErr = validateDate(formData.preferredDate);

    if (pErr || dErr) {
      setPhoneError(pErr);
      setDateError(dErr);
      return;
    }

    setPhoneError("");
    setDateError("");
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative py-32 px-6 md:px-12 bg-[#0F172A] border-t border-slate-800 text-white overflow-hidden">
      
      {/* Decorative Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10 lg:py-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>ONLINE APPOINTMENT DESK</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
              Begin Your <br />
              <span className="font-serif italic font-normal text-slate-300">Dental Journey.</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg font-body leading-relaxed mb-10">
              Schedule your private, high-precision consultation at Metropolis Dental & Implant Centre with Dr. Pratim Talukdar.
            </p>

            <div className="space-y-6 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Phone className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Direct Clinic Line</p>
                  <p className="text-base font-semibold text-white">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Concierge Desk</p>
                  <p className="text-base font-semibold text-white">care@metropolisdental.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Clock className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Consultation Hours</p>
                  <p className="text-base font-semibold text-white">Mon – Sat: 10:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column (Bigger, Minimal & Aesthetic Form Card) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl transition-all">
            
            <div className="mb-10 pb-6 border-b border-slate-800/80">
              <h3 className="text-3xl font-light text-white mb-2 tracking-tight">Reserve Appointment</h3>
              <p className="text-sm text-slate-400">
                Complete the details below to request your slot with Dr. Pratim Talukdar.
              </p>
            </div>

            {submitted ? (
              <div className="py-14 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-light text-white">Appointment Request Logged</h4>
                <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed font-body">
                  Thank you, <strong className="text-white font-semibold">{formData.patientName}</strong>! We have recorded your requested slot for <strong className="text-white font-semibold">{formData.preferredDate}</strong> ({formData.timeSlot}). Our team will reach out at <strong className="text-white font-semibold">{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                
                {/* 1. Patient Full Name (Required) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                    Patient Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-500 absolute left-4.5 top-4" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 text-base focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 2. Phone Number (Required with mobile validation) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-slate-500 absolute left-4.5 top-4" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => setPhoneError(validatePhone(formData.phone))}
                        className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border text-white placeholder-slate-600 text-base focus:outline-none transition-all ${
                          phoneError
                            ? "border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                            : "border-slate-800 focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10"
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>

                  {/* 3. Email Address (Optional) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                      Email Address <span className="text-slate-500 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-slate-500 absolute left-4.5 top-4" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 text-base focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 4. Preferred Date (Datepicker, disable past dates + explicit validation message) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                      Preferred Date <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 text-slate-500 absolute left-4.5 top-4 pointer-events-none" />
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={handleDateChange}
                        onBlur={() => setDateError(validateDate(formData.preferredDate))}
                        className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border text-white text-base focus:outline-none transition-all cursor-pointer [color-scheme:dark] ${
                          dateError
                            ? "border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                            : "border-slate-800 focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10"
                        }`}
                      />
                    </div>
                    {dateError && (
                      <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{dateError}</span>
                      </p>
                    )}
                  </div>

                  {/* 5. Preferred Time Slot (Dropdown based on clinic hours) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                      Preferred Time Slot <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Clock3 className="w-5 h-5 text-slate-500 absolute left-4.5 top-4 pointer-events-none" />
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white text-base focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10 transition-all cursor-pointer appearance-none"
                      >
                        <option value="10:00 AM - 11:30 AM">10:00 AM – 11:30 AM (Morning)</option>
                        <option value="11:30 AM - 01:00 PM">11:30 AM – 01:00 PM (Morning)</option>
                        <option value="02:00 PM - 03:30 PM">02:00 PM – 03:30 PM (Afternoon)</option>
                        <option value="03:30 PM - 05:00 PM">03:30 PM – 05:00 PM (Afternoon)</option>
                        <option value="05:00 PM - 07:00 PM">05:00 PM – 07:00 PM (Evening)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 6. Service Required / Notes (Optional text area) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2.5">
                    Service Required / Notes <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-5 h-5 text-slate-500 absolute left-4.5 top-4" />
                    <textarea
                      rows={3}
                      placeholder="Specify requested service (e.g., Dental Implant Consultation, Root Canal, Cosmetic Smile Design) or any specific symptoms..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 text-base focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-400/10 transition-all"
                    />
                  </div>
                </div>

                {/* 7. Submit Button (Big, Aesthetic, Non-functional for backend request) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4.5 px-6 rounded-2xl bg-[#28395C] hover:bg-slate-800 text-white font-semibold text-base transition-all duration-300 shadow-xl border border-white/10 flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]"
                  >
                    <Calendar className="w-5 h-5 text-[#60A5FA]" />
                    <span>Submit Appointment Request</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

