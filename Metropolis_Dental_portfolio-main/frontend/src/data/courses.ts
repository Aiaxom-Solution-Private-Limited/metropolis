export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  bannerImage: string;
  highlights: string[];
  level: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: "implantology-masterclass",
    title: "Mastering Flapless Dental Implantology",
    category: "Implantology & Surgical Dentistry",
    duration: "3 Days Intensive Hands-On",
    description: "Advanced clinical workshop covering CBCT 3D guided implant placement, immediate loading protocols, and soft tissue management techniques.",
    bannerImage: "/images/implant_course.png",
    highlights: ["Live Surgery Demos", "CBCT Guided Planning", "3D Surgical Stent Fabrication"],
    level: "Advanced Clinical",
  },
  {
    id: "smile-design-veneers",
    title: "Advanced Porcelain Veneers & Smile Design",
    category: "Cosmetic & Aesthetic Dentistry",
    duration: "2 Days Masterclass",
    description: "Master minimal preparation veneers, digital smile design (DSD), tooth prep ergonomics, shade selection, and adhesive bonding protocols.",
    bannerImage: "/images/smile_course.png",
    highlights: ["Mock-up & Prep Ergonomics", "Rubber Dam Isolation", "Adhesive Resin Luting"],
    level: "Intermediate - Advanced",
  },
  {
    id: "full-mouth-rehab",
    title: "Full Mouth Rehabilitation & Occlusion",
    category: "Prosthodontics & Rehabilitation",
    duration: "4 Days Comprehensive Module",
    description: "In-depth clinical training on vertical dimension determination, full arch tooth-supported & implant-supported prosthetics, and occlusion balance.",
    bannerImage: "/images/prostho_course.png",
    highlights: ["Facebow & Articulators", "VDO Elevation Protocols", "Full Arch Monolithic Zirconia"],
    level: "Mastery Level",
  },
  {
    id: "microscopic-endo",
    title: "Microscopic Endodontics & Complex Canals",
    category: "Endodontics & Restorative",
    duration: "2 Days Clinical Hands-On",
    description: "Step-by-step guidance on dental operating microscope techniques, rotary NiTi instrumentation, severely curved canal negotiation, and retreatment.",
    bannerImage: "/images/endo_course.png",
    highlights: ["Microscope Ergonomics", "Broken Instrument Retrieval", "Warm Vertical Obturation"],
    level: "Intermediate",
  },
];
