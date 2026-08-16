export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "Infrastructure" | "Equipment" | "Transformations" | "Clinic Environment";
  description: string;
  aspectRatio?: "square" | "tall" | "wide";
}

export const GALLERY_CATEGORIES = [
  "All",
  "Infrastructure",
  "Equipment",
  "Transformations",
  "Clinic Environment",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    src: "/images/clinic/unnamed.jpg",
    title: "Executive Reception & Waiting Lounge",
    category: "Infrastructure",
    description: "Ultra-clean, comfortable, and quiet concierge desk designed for maximum patient privacy and relaxation.",
    aspectRatio: "wide",
  },
  {
    id: "gallery-2",
    src: "/images/clinic/unnamed (1).jpg",
    title: "High-Precision Operatory Suite 1",
    category: "Infrastructure",
    description: "Fully sanitized, modern operatory suite equipped with ergonomic treatment chairs and shadowless LED lamps.",
    aspectRatio: "square",
  },
  {
    id: "gallery-3",
    src: "/images/clinic/unnamed (2).jpg",
    title: "State-of-the-Art Dental Implant Suite",
    category: "Equipment",
    description: "Dedicated surgical room equipped with computer-guided implant motor units and sterile surgical drape setup.",
    aspectRatio: "tall",
  },
  {
    id: "gallery-4",
    src: "/images/clinic/unnamed (3).jpg",
    title: "Class-B Autoclave Sterilization Hub",
    category: "Equipment",
    description: "Hospital-grade multi-stage sterilization protocols ensuring 100% infection prevention.",
    aspectRatio: "square",
  },
  {
    id: "gallery-5",
    src: "/images/clinic/unnamed (4).jpg",
    title: "3D Digital Intraoral Scanner & CBCT",
    category: "Equipment",
    description: "High-precision digital impression technology eliminating traditional messy impression trays.",
    aspectRatio: "wide",
  },
  {
    id: "gallery-6",
    src: "/images/clinic/unnamed (5).jpg",
    title: "Cosmetic Veneers Smile Transformation",
    category: "Transformations",
    description: "Full arch porcelain veneer restoration restoring natural aesthetics, symmetry, and confidence.",
    aspectRatio: "square",
  },
  {
    id: "gallery-7",
    src: "/images/clinic/unnamed (6).jpg",
    title: "Microscopic Endodontic Workspace",
    category: "Equipment",
    description: "High-magnification surgical microscope for high-precision root canal and micro-restorative procedures.",
    aspectRatio: "tall",
  },
  {
    id: "gallery-8",
    src: "/images/clinic/unnamed (7).jpg",
    title: "Implant Bridge Smile Reconstruction",
    category: "Transformations",
    description: "Computer-guided immediate loading implant bridge restoring complete masticatory function.",
    aspectRatio: "wide",
  },
  {
    id: "gallery-9",
    src: "/images/clinic/unnamed (8).jpg",
    title: "Private Consultation & Diagnostics Office",
    category: "Clinic Environment",
    description: "Dedicated office for Dr. Pratim Talukdar to review treatment plans and 3D CBCT scans with patients.",
    aspectRatio: "square",
  },
  {
    id: "gallery-10",
    src: "/images/clinic/unnamed (9).jpg",
    title: "Advanced Teeth Whitening & Hygiene Bay",
    category: "Clinic Environment",
    description: "Specialized operatory for laser teeth whitening and pain-free ultrasonic prophylaxis.",
    aspectRatio: "square",
  },
  {
    id: "gallery-11",
    src: "/images/clinic/unnamed (10).jpg",
    title: "Modern Clinical Corridor & Patient Care Area",
    category: "Infrastructure",
    description: "Spacious, climate-controlled clinical corridor featuring HEPA air filtration systems.",
    aspectRatio: "wide",
  },
];
