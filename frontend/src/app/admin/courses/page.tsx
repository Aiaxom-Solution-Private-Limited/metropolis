"use client";

import React, { useState, useEffect } from "react";
import { fetchWithAuth, getMediaUrl } from "@/lib/api";
import {
  Plus,
  BookOpen,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  UploadCloud,
  Loader2,
  X,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface CourseItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  description: string;
  image_object_key: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Implantology & Surgical Dentistry");
  const [duration, setDuration] = useState("3 Days Intensive Hands-On");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Live Homepage Masterclass Preview Modal
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewHoverId, setPreviewHoverId] = useState<number | null>(null);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<CourseItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadCourses = async () => {
    try {
      const res = await fetchWithAuth("/admin/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle("");
    setCategory("Implantology & Surgical Dentistry");
    setDuration("3 Days Intensive Hands-On");
    setDescription("");
    setIsActive(true);
    setImageFile(null);
    setPreviewUrl(null);
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (course: CourseItem) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category || "Clinical Residency");
    setDuration(course.duration || "Intensive Masterclass");
    setDescription(course.description);
    setIsActive(course.is_active);
    setImageFile(null);
    setPreviewUrl(getMediaUrl(course.image_url));
    setFormError("");
    setShowModal(true);
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!editingCourse && !imageFile) {
      setFormError("Course image is required for new courses.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("duration", duration);
      formData.append("description", description);
      formData.append("is_active", String(isActive));
      if (imageFile) {
        formData.append("file", imageFile);
      }

      let res: Response;
      if (editingCourse) {
        res = await fetchWithAuth(`/admin/courses/${editingCourse.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetchWithAuth("/admin/courses", {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to save course.");
      }

      setShowModal(false);
      loadCourses();
    } catch (err: any) {
      setFormError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reorder Handler (Move Up / Move Down)
  const handleReorder = async (index: number, direction: "up" | "down") => {
    const newCourses = [...courses];
    const targetIdx = direction === "up" ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= newCourses.length) return;

    // Swap items in local state for immediate response
    const temp = newCourses[index];
    newCourses[index] = newCourses[targetIdx];
    newCourses[targetIdx] = temp;

    const updatedPayload = newCourses.map((c, i) => ({
      id: c.id,
      display_order: i + 1,
    }));

    setCourses(newCourses);

    try {
      await fetchWithAuth("/admin/courses/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
    } catch (err) {
      console.error("Failed to reorder courses:", err);
    }
  };

  const toggleActiveStatus = async (course: CourseItem) => {
    try {
      const formData = new FormData();
      formData.append("is_active", String(!course.is_active));

      const res = await fetchWithAuth(`/admin/courses/${course.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        loadCourses();
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetchWithAuth(`/admin/courses/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete course:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Course & Masterclass Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage clinical residency programs, edit curriculum descriptions, and reorder homepage presentation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLivePreview(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#28395C] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Preview Masterclass Demo</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Courses List with Reordering */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-mono">Loading training courses...</div>
      ) : courses.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-slate-200/80 text-center text-slate-500 text-xs">
          No courses created yet. Click "Add New Course" above to create your first educational curriculum.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                <img
                  src={getMediaUrl(course.image_url)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono text-slate-800 font-bold border border-slate-200 shadow-xs">
                  Order #{idx + 1}
                </div>

                {/* Status Badge */}
                <button
                  onClick={() => toggleActiveStatus(course)}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 cursor-pointer border transition-all shadow-xs ${
                    course.is_active
                      ? "bg-emerald-50/90 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-900/80 text-white border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  {course.is_active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>

                {/* Reorder Up/Down */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-slate-700">
                  <button
                    onClick={() => handleReorder(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-white hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReorder(idx, "down")}
                    disabled={idx === courses.length - 1}
                    className="p-1 text-white hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#28395C]">
                      {course.category || "Clinical Residency"}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">{course.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-wide">{course.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed font-body">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Updated: {new Date(course.updated_at).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(course)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(course)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                {editingCourse ? "Edit Masterclass Course" : "Create New Masterclass Course"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced Implant Treatment Planning"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Implantology & Surgical"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Days Intensive Hands-On"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide comprehensive details about course objectives and clinical modules..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Cover Image
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-2xl p-4 text-center bg-slate-50/50 flex flex-col items-center justify-center">
                  {previewUrl ? (
                    <div className="relative group w-full max-h-40 overflow-hidden rounded-2xl">
                      <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover rounded-2xl" />
                      <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold text-white cursor-pointer transition-opacity">
                        <span>Replace Cover Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer py-4 flex flex-col items-center">
                      <UploadCloud className="w-7 h-7 text-slate-600 mb-1" />
                      <span className="text-xs font-semibold text-slate-800">Select course cover image</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 font-mono">WebP Auto-Compressed to Supabase</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 bg-slate-100 text-slate-900 cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Activate and display course on public website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Homepage Masterclass Preview Modal */}
      {showLivePreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#60A5FA]">
                  LIVE HOMEPAGE MASTERCLASSES PREVIEW
                </span>
                <h3 className="text-xl font-light text-white">Selected Clinical Masterclasses</h3>
              </div>
              <button
                onClick={() => setShowLivePreview(false)}
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {courses.filter(c => c.is_active).slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  onMouseEnter={() => setPreviewHoverId(c.id)}
                  onMouseLeave={() => setPreviewHoverId(null)}
                  className="py-6 space-y-3 cursor-pointer hover:bg-slate-900/40 p-3 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
                    <span>{c.category || "Clinical Residency"}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-normal">{c.duration}</span>
                  </div>

                  <h4 className="text-lg font-light text-white hover:text-[#60A5FA] transition-colors">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>

                  {/* Expandable Image on Hover */}
                  {previewHoverId === c.id && (
                    <div className="mt-3 relative h-40 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={getMediaUrl(c.image_url)} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Course</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title}</strong>?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer flex items-center gap-2 shadow-sm"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
