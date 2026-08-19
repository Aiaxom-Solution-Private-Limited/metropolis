"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/lib/api";
import {
  Settings,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  KeyRound,
  User,
  Check,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user, token } = useAuth();

  // Email form state
  const [newEmail, setNewEmail] = useState("");
  const [emailCurrentPassword, setEmailCurrentPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailError, setEmailError] = useState("");

  // Password form state
  const [pwdCurrentPassword, setPwdCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    if (user?.email) {
      setNewEmail(user.email);
    }
  }, [user]);

  // Handle Email Update
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSuccess("");
    setEmailError("");

    if (!newEmail || !newEmail.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!emailCurrentPassword) {
      setEmailError("Current password is required to verify changes.");
      return;
    }

    setEmailLoading(true);

    try {
      const res = await fetchWithAuth("/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          current_password: emailCurrentPassword,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to update email.");
      }

      setEmailSuccess("Admin email updated successfully! Please reload to see updated session.");
      setEmailCurrentPassword("");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setEmailError(err.message || "Failed to update email.");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSuccess("");
    setPwdError("");

    if (!pwdCurrentPassword) {
      setPwdError("Current password is required.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("New password and confirm password do not match.");
      return;
    }

    setPwdLoading(true);

    try {
      const res = await fetchWithAuth("/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: pwdCurrentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to change password.");
      }

      setPwdSuccess("Password changed successfully! Keep your new password stored safely.");
      setPwdCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdError(err.message || "Failed to change password.");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans antialiased text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#28395C] p-0.5 flex items-center justify-center shadow-sm">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Admin Account Settings
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Manage your administrative login credentials, email address, and security authentication settings.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold self-start sm:self-auto">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Bcrypt Password Protection</span>
        </div>
      </div>

      {/* Account Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Email / Username Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Admin Email Address</h2>
                <p className="text-xs text-slate-500">Update your primary administrative login email.</p>
              </div>
            </div>

            {/* Email Success Alert */}
            {emailSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{emailSuccess}</span>
              </div>
            )}

            {/* Email Error Alert */}
            {emailError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{emailError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateEmail} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  New Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Current Password (To Confirm)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={emailCurrentPassword}
                    onChange={(e) => setEmailCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={emailLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {emailLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Email...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save New Email Address</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Card 2: Password Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Change Password</h2>
                <p className="text-xs text-slate-500">Update your admin password with secure hashing.</p>
              </div>
            </div>

            {/* Password Success Alert */}
            {pwdSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{pwdSuccess}</span>
              </div>
            )}

            {/* Password Error Alert */}
            {pwdError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{pwdError}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={pwdCurrentPassword}
                    onChange={(e) => setPwdCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={pwdLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {pwdLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
