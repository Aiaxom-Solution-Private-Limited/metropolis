"use client";

import React, { useState, useEffect } from "react";
import { fetchWithAuth, getMediaUrl } from "@/lib/api";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileCheck,
  X,
  ArrowUp,
  ArrowDown,
  Edit3,
  Eye,
  Sparkles,
  Layers,
} from "lucide-react";

interface GalleryImageItem {
  id: number;
  object_key: string;
  original_filename: string;
  title: string;
  category: string;
  description: string;
  mime_type: string;
  file_size: number;
  display_order: number;
  url: string;
  created_at: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Infrastructure");
  const [uploadDescription, setUploadDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Edit Modal State
  const [editingImage, setEditingImage] = useState<GalleryImageItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Infrastructure");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Live Homepage Preview Modal
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<GalleryImageItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadGallery = async () => {
    try {
      const res = await fetchWithAuth("/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileSelect = (file: File) => {
    setUploadError("");
    setUploadSuccess("");

    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      setUploadError("Only JPG, PNG, and WebP images are supported.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Image size exceeds maximum limit of 15MB.");
      return;
    }

    setSelectedFile(file);
    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", uploadTitle || selectedFile.name);
      formData.append("category", uploadCategory);
      formData.append("description", uploadDescription);

      const res = await fetchWithAuth("/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Upload failed");
      }

      const newImage = await res.json();
      setUploadSuccess(
        `Uploaded successfully! Compressed to ${(newImage.file_size / 1024).toFixed(1)} KB (WebP).`
      );
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadTitle("");
      setUploadDescription("");
      loadGallery();
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Reorder Handler (Move Up / Move Down)
  const handleReorder = async (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const targetIdx = direction === "up" ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= newImages.length) return;

    // Swap items in local state for instant UX
    const temp = newImages[index];
    newImages[index] = newImages[targetIdx];
    newImages[targetIdx] = temp;

    // Re-assign display_order indices
    const updatedPayload = newImages.map((img, i) => ({
      id: img.id,
      display_order: i + 1,
    }));

    setImages(newImages);

    try {
      await fetchWithAuth("/admin/gallery/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
    } catch (err) {
      console.error("Failed to reorder gallery items:", err);
    }
  };

  // Edit Item Handler
  const openEditModal = (img: GalleryImageItem) => {
    setEditingImage(img);
    setEditTitle(img.title || img.original_filename);
    setEditCategory(img.category || "Infrastructure");
    setEditDescription(img.description || "");
    setEditFile(null);
    setEditPreviewUrl(getMediaUrl(img.url));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setSavingEdit(true);

    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("category", editCategory);
      formData.append("description", editDescription);
      if (editFile) {
        formData.append("file", editFile);
      }

      const res = await fetchWithAuth(`/admin/gallery/${editingImage.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        setEditingImage(null);
        loadGallery();
      }
    } catch (err) {
      console.error("Failed to update gallery image:", err);
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetchWithAuth(`/admin/gallery/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const formatKB = (bytes: number) => (bytes / 1024).toFixed(1) + " KB";

  return (
    <div className="space-y-8">
      {/* Header with Live Preview Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery Asset Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload, edit details, and reorder clinic images. Changes are immediately reflected on the homepage and main gallery.
          </p>
        </div>

        <button
          onClick={() => setShowLivePreview(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#28395C] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>Preview Homepage Demo</span>
        </button>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-slate-700" />
          <span>Upload Image to Gallery</span>
        </h2>

        {uploadError && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{uploadError}</span>
          </div>
        )}
        {uploadSuccess && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
          }}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
            isDragging
              ? "border-slate-900 bg-slate-50 scale-[0.99]"
              : selectedFile
              ? "border-emerald-400 bg-emerald-50/30"
              : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
          }`}
        >
          {previewUrl ? (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-md max-h-48">
                <img src={previewUrl} alt="Preview" className="object-cover max-h-48 w-auto" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Description Fields */}
              <div className="w-full space-y-3 text-left">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Executive Operatory Suite 1"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Transformations">Transformations</option>
                      <option value="Clinic Environment">Clinic Environment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Original Size
                    </label>
                    <div className="py-2 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
                      {formatKB(selectedFile?.size || 0)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Brief description of clinical facility or equipment..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-2 shadow-xs">
                <UploadCloud className="w-6 h-6 text-slate-700" />
              </div>
              <p className="text-xs font-semibold text-slate-900">
                Drag & Drop image here, or <span className="underline">browse</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                JPG, PNG, WebP (Max: 15MB) — Auto-compressed to WebP in Supabase Storage
              </p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </label>
          )}
        </div>

        {selectedFile && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUploadSubmit}
              disabled={uploading}
              className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing WebP & Supabase...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Upload to Gallery</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid with Reordering & Editing */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <span>Clinic Gallery Catalog ({images.length} Items)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Use ↑ / ↓ to rearrange display order
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-xs font-mono">Loading gallery catalog...</div>
        ) : images.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200/80 text-center text-slate-500 text-xs">
            No gallery images uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={getMediaUrl(img.url)}
                    alt={img.title || img.original_filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono text-emerald-700 font-bold border border-slate-200 shadow-xs">
                    #{idx + 1} • {formatKB(img.file_size)}
                  </div>

                  {/* Reorder Buttons (Move Up / Move Down) */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-700">
                    <button
                      onClick={() => handleReorder(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 text-white hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-white cursor-pointer"
                      title="Move Up in Order"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleReorder(idx, "down")}
                      disabled={idx === images.length - 1}
                      className="p-1 text-white hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-white cursor-pointer"
                      title="Move Down in Order"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-2 border-t border-slate-100 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                      {img.category || "Infrastructure"}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                      {img.title || img.original_filename}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 font-body">
                      {img.description || "High-precision clinical preview."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(img.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(img)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(img)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all cursor-pointer"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Details Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Edit Gallery Image Details
              </h3>
              <button onClick={() => setEditingImage(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Transformations">Transformations</option>
                  <option value="Clinic Environment">Clinic Environment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Replace Image File (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && setEditFile(e.target.files[0])}
                  className="w-full text-xs text-slate-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Homepage Preview Modal */}
      {showLivePreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-slate-300 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#28395C]">
                  LIVE HOMEPAGE DEMO PREVIEW
                </span>
                <h3 className="text-xl font-bold text-slate-900">Gallery Section Preview</h3>
              </div>
              <button
                onClick={() => setShowLivePreview(false)}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {images.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-12">No items to preview.</p>
            ) : (
              <div className="space-y-6">
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                  <img
                    src={getMediaUrl(images[previewIndex]?.url || "")}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#28395C]">
                      {images[previewIndex]?.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{images[previewIndex]?.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{images[previewIndex]?.description}</p>
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="grid grid-cols-6 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setPreviewIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        previewIndex === idx ? "border-[#28395C] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={getMediaUrl(img.url)} alt={img.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                <h3 className="text-base font-bold text-slate-900">Delete Image</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title || deleteTarget.original_filename}</strong> from PostgreSQL and Supabase Storage?
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
