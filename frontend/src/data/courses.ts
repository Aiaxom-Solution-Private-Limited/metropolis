export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  bannerImage: string;
  previewImages: string[];
  highlights: string[];
  level: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: "advanced-implant-planning",
    title: "Advanced Implant Treatment Planning",
    category: "Implantology & Surgical Dentistry",
    duration: "3 Days Intensive Hands-On",
    description: "CBCT-based diagnosis, bone assessment, implant positioning, and comprehensive treatment planning.",
    bannerImage: "/images/implant_course.png",
    previewImages: [
      "/images/implant_course.png",
      "/images/about_me_dental.jpg",
      "/images/prostho_course.png",
    ],
    highlights: ["CBCT Diagnosis", "Bone Assessment", "Implant Positioning"],
    level: "Advanced Clinical",
  },
  {
    id: "immediate-implant-placement",
    title: "Immediate Implant Placement & Loading",
    category: "Implantology & Surgical Dentistry",
    duration: "2 Days Masterclass",
    description: "Clinical principles for placing implants immediately after extraction and understanding immediate loading protocols.",
    bannerImage: "/images/smile_course.png",
    previewImages: [
      "/images/smile_course.png",
      "/images/implant_course.png",
      "/images/endo_course.png",
    ],
    highlights: ["Post-Extraction Placement", "Immediate Loading Protocols", "Soft Tissue Preservation"],
    level: "Advanced Clinical",
  },
  {
    id: "full-mouth-implant-rehab",
    title: "Full-Mouth Implant Rehabilitation",
    category: "Implantology & Prosthodontics",
    duration: "4 Days Comprehensive Module",
    description: "Treatment planning and prosthetic rehabilitation for patients requiring multiple implants or complete-arch restoration.",
    bannerImage: "/images/prostho_course.png",
    previewImages: [
      "/images/prostho_course.png",
      "/images/smile_course.png",
      "/images/about_me_dental.jpg",
    ],
    highlights: ["All-on-X Protocols", "Complete Arch Restoration", "Prosthetic Rehabilitation"],
    level: "Mastery Level",
  },
  {
    id: "advanced-prosthodontic-rehab",
    title: "Advanced Prosthodontic Rehabilitation",
    category: "Prosthodontics & Restorative",
    duration: "3 Days Intensive Hands-On",
    description: "Comprehensive treatment planning for crowns, bridges, veneers, dentures, and complex restorative cases.",
    bannerImage: "/images/endo_course.png",
    previewImages: [
      "/images/endo_course.png",
      "/images/prostho_course.png",
      "/images/about_me_dental.jpg",
    ],
    highlights: ["Crowns & Veneers", "Complex Restorative", "Prep Ergonomics"],
    level: "Advanced Clinical",
  },
  {
    id: "digital-smile-design",
    title: "Digital Smile Design & Esthetic Rehabilitation",
    category: "Cosmetic & Esthetic Dentistry",
    duration: "2 Days Masterclass",
    description: "Digital planning, smile analysis, facial aesthetics, and designing predictable cosmetic restorations.",
    bannerImage: "/images/smile_course.png",
    previewImages: [
      "/images/smile_course.png",
      "/images/implant_course.png",
      "/images/endo_course.png",
    ],
    highlights: ["Digital Planning", "Smile Analysis", "Facial Aesthetics"],
    level: "Intermediate - Advanced",
  },
  {
    id: "full-mouth-rehabilitation",
    title: "Full-Mouth Rehabilitation",
    category: "Prosthodontics & Restorative",
    duration: "4 Days Comprehensive Module",
    description: "Occlusion, treatment sequencing, vertical dimension, and comprehensive restorative treatment planning.",
    bannerImage: "/images/prostho_course.png",
    previewImages: [
      "/images/prostho_course.png",
      "/images/about_me_dental.jpg",
      "/images/implant_course.png",
    ],
    highlights: ["Occlusion Balance", "Vertical Dimension", "Treatment Sequencing"],
    level: "Mastery Level",
  },
];
