"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithAuth, getMediaUrl } from "@/lib/api";
import {
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Database,
  Layers,
  HardDrive,
  Sparkles,
  Clock,
  ExternalLink,
} from "lucide-react";

interface GalleryImageItem {
  id: number;
  object_key: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  url: string;
  created_at: string;
}

interface CourseItem {
  id: number;
  title: string;
  description: string;
  image_object_key: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminDashboardPage() {
  const [galleryList, setGalleryList] = useState<GalleryImageItem[]>([]);
  const [coursesList, setCoursesList] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [galleryRes, coursesRes] = await Promise.all([
          fetchWithAuth("/admin/gallery"),
          fetchWithAuth("/admin/courses"),
        ]);

        const galleryData = galleryRes.ok ? await galleryRes.json() : [];
        const coursesData = coursesRes.ok ? await coursesRes.json() : [];

        setGalleryList(galleryData);
        setCoursesList(coursesData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalStorageBytes = galleryList.reduce((acc, item) => acc + (item.file_size || 0), 0);
  const formattedStorage =
    totalStorageBytes > 0
      ? (totalStorageBytes / (1024 * 1024)).toFixed(1) + " MB"
      : "0 MB";

  const activeCoursesCount = coursesList.filter((c) => c.is_active).length;
  const latestCourse = coursesList[0] || null;

  // Build Recent Activity Feed from real DB records
  const recentActivities = [
    ...galleryList.map((g) => ({
      id: `gallery-${g.id}`,
      type: "Gallery",
      title: g.original_filename,
      date: new Date(g.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rawDate: new Date(g.created_at).getTime(),
      status: "Active",
      link: "/admin/gallery",
    })),
    ...coursesList.map((c) => ({
      id: `course-${c.id}`,
      type: "Course",
      title: c.title,
      date: new Date(c.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rawDate: new Date(c.created_at).getTime(),
      status: c.is_active ? "Active" : "Inactive",
      link: "/admin/courses",
    })),
  ]
    .sort((a, b) => b.rawDate - a.rawDate)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* 1. Welcome / Hero Card (Clean White SaaS Style) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ADMIN PORTAL</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Metropolis Dental Admin Portal
          </h1>

          <p className="text-slate-500 text-sm leading-relaxed font-body">
            Manage your clinic gallery assets and postgraduate training courses with automatic WebP server-side compression and Supabase object storage.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-mono">
            FastAPI + Supabase Active
          </div>
        </div>
      </div>

      {/* 2. Quick Statistics Section (Inspired by Reference Pill Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Gallery Images */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none">
              {loading ? "..." : galleryList.length}
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-1">Gallery Images</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Images in Supabase</p>
          </div>
        </div>

        {/* Card 2: Active Courses */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none">
              {loading ? "..." : activeCoursesCount}
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-1">Active Courses</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Training programmes</p>
          </div>
        </div>

        {/* Card 3: Total Courses */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none">
              {loading ? "..." : coursesList.length}
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-1">Total Courses</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Active + inactive</p>
          </div>
        </div>

        {/* Card 4: Media Storage */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-none">
              {loading ? "..." : formattedStorage}
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-1">Media Storage</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Supabase Storage</p>
          </div>
        </div>
      </div>

      {/* 3. Two-Column Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Gallery Overview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Gallery Overview</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Total uploads: <strong className="text-slate-900">{galleryList.length}</strong>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                Supabase WebP
              </span>
            </div>

            {/* Thumbnail Preview Grid */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Recently Uploaded Images
              </p>
              {galleryList.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No gallery images uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {galleryList.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group relative"
                    >
                      <img
                        src={getMediaUrl(img.url)}
                        alt={img.original_filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Link
              href="/admin/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm group"
            >
              <span>Manage Gallery</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Course Overview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Training Courses</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong className="text-slate-900">{activeCoursesCount}</strong> Active Courses
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                Clinical Residency
              </span>
            </div>

            {/* Latest Course Banner Box */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Latest Curriculum Program
              </p>
              {latestCourse ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {latestCourse.title}
                    </h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        latestCourse.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {latestCourse.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 font-body">
                    {latestCourse.description}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Updated: {new Date(latestCourse.updated_at).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No training courses created yet.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm group"
            >
              <span>View Courses</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* 4. Recent Content Activity Table (Inspired by Reference Manage Jobs Table) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recently Added Content</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest gallery uploads and masterclass creations in PostgreSQL.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 font-semibold">
            {recentActivities.length} Records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Content</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentActivities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                    No recent activity found.
                  </td>
                </tr>
              ) : (
                recentActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-semibold">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                          act.type === "Gallery"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        }`}
                      >
                        {act.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800 max-w-xs truncate">
                      {act.title}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-500">{act.date}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          act.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            act.status === "Active" ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {act.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={act.link}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Quick Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/gallery"
          className="group p-6 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#28395C] transition-colors">
              Manage Gallery Images
            </h4>
            <p className="text-xs text-slate-500">
              Upload, preview WebP auto-compression, and delete gallery images.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/courses"
          className="group p-6 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#28395C] transition-colors">
              Manage Training Courses
            </h4>
            <p className="text-xs text-slate-500">
              Create, edit descriptions, replace images, and activate courses.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>

    </div>
  );
}
