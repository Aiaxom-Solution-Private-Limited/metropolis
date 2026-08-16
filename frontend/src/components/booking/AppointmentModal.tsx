"use client";

import React, { useState } from "react";
import { X, Calendar, User, Phone, Mail, CheckCircle2, Shield, Clock3, MessageSquare, AlertCircle, ArrowRight } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
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
  const [isSuccess, setIsSuccess] = useState(false);

  // Mobile validation helper
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, "");
    const mobileRegex = /^[0-9]{10,12}$/;
    if (!cleaned) return "Phone number is required.";
    if (!mobileRegex.test(cleaned)) return "Please enter a valid 10-digit mobile number.";
    return "";
  };

  // Date validation helper (disallow past dates)
  const validateDate = (dateVal: string) => {
    if (!dateVal) return "Preferred date is required.";
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
    const pErr = validatePhone(formData.phone);
    const dErr = validateDate(formData.preferredDate);

    if (pErr || dErr) {
      setPhoneError(pErr);
      setDateError(dErr);
      return;
    }
    setPhoneError("");
    setDateError("");
    setIsSuccess(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card (Enlarged & Minimal Aesthetic) */}
      <div
        className={`relative z-10 w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Header */}
        <div className="bg-[#28395C] text-white p-6 sm:p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10 shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-wide text-white">Book Consultation</h3>
              <p className="text-xs text-white/70">Dr. Pratim Talukdar — Metropolis Dental</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-light text-slate-900">Appointment Request Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-body">
                Thank you, <strong className="text-slate-900 font-semibold">{formData.patientName}</strong>. We have logged your request for <strong className="text-slate-900 font-semibold">{formData.preferredDate}</strong> ({formData.timeSlot}). Our clinical team will contact <strong className="text-slate-900 font-semibold">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-4 px-8 py-3.5 rounded-full bg-[#28395C] text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all cursor-pointer shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Patient Full Name (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number (Required with mobile validation) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={() => setPhoneError(validatePhone(formData.phone))}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all ${
                        phoneError ? "border-rose-500" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>

                {/* Email Address (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                    Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferred Date (Datepicker, disable past dates + validation) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      onBlur={() => setDateError(validateDate(formData.preferredDate))}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all cursor-pointer ${
                        dateError ? "border-rose-500" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {dateError && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{dateError}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Time Slot (Dropdown based on clinic hours) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                    Preferred Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock3 className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all cursor-pointer"
                    >
                      <option value="10:00 AM - 11:30 AM">10:00 AM – 11:30 AM</option>
                      <option value="11:30 AM - 01:00 PM">11:30 AM – 01:00 PM</option>
                      <option value="02:00 PM - 03:30 PM">02:00 PM – 03:30 PM</option>
                      <option value="03:30 PM - 05:00 PM">03:30 PM – 05:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM – 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Required / Notes (Optional text area) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">
                  Service Required / Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <textarea
                    rows={2}
                    placeholder="Specify requested service or clinical notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#28395C] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#28395C] hover:bg-slate-900 text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-[#28395C]/20 flex items-center justify-center gap-2.5 mt-4 cursor-pointer group active:scale-[0.99]"
              >
                <Calendar className="w-5 h-5 text-[#60A5FA]" />
                <span>Confirm Appointment Request</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

