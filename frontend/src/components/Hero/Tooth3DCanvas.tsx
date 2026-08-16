"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AnatomyLabel {
  id: string;
  name: string;
  side: "left" | "right";
  topPercent: number;
  description: string;
}

const ANATOMY_LABELS: AnatomyLabel[] = [
  { id: "crown", name: "Crown", side: "left", topPercent: 28, description: "Visible anatomical portion above gumline" },
  { id: "neck", name: "Neck (Cervix)", side: "left", topPercent: 46, description: "Boundary region between crown and root" },
  { id: "root", name: "Root", side: "left", topPercent: 68, description: "Anchored firmly within the alveolar bone" },
  { id: "enamel", name: "Enamel Shell", side: "right", topPercent: 24, description: "96% mineralized translucent protective ceramic barrier" },
  { id: "dentin", name: "Dentin", side: "right", topPercent: 34, description: "Micro-tubular living tissue supporting enamel structure" },
  { id: "pulp", name: "Pulp Cavity", side: "right", topPercent: 44, description: "Vascularized nerve core supplying vitality to tooth" },
  { id: "gingiva", name: "Gingiva (Gum)", side: "right", topPercent: 54, description: "Soft tissue seal surrounding cervical tooth region" },
  { id: "cementum", name: "Cementum", side: "right", topPercent: 63, description: "Specialized calcified layer covering root surface" },
  { id: "ligament", name: "Periodontal Ligament", side: "right", topPercent: 71, description: "Shock-absorbing collagen fibers binding tooth to jaw" },
  { id: "rootcanal", name: "Root Canal System", side: "right", topPercent: 79, description: "Precision pathways housing neuro-vascular bundles" },
  { id: "bone", name: "Alveolar Bone", side: "right", topPercent: 88, description: "High-density jawbone matrix providing implant anchor site" }
];

export default function Tooth3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // --- 1. THREE.JS SCENE SETUP FOR LIGHT GREY STUDIO ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf3f4f6, 0.07);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // --- 2. LUXURY STUDIO LIGHTING (SOFT STUDIO SETUP) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.0);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // --- 3. 3D MOLAR TOOTH MODEL CONSTRUCTION ---
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Glossy Ceramic Enamel Shell (Polished White Porcelain)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.22,
      thickness: 0.5,
      ior: 1.52,
      sheen: 0.3,
      sheenColor: 0x0284c7,
      transparent: true,
      opacity: 0.98,
    });

    // Dentin Core Material (warm ivory)
    const dentinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.3,
      metalness: 0.01,
    });

    // Pulp Cavity Material (vital red core)
    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.35,
      roughness: 0.25,
    });

    // Nerve & Vascular Tubules
    const nerveMaterial = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const vesselMaterial = new THREE.MeshBasicMaterial({ color: 0xe11d48 });

    // Gingiva Gum Base
    const gingivaMaterial = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.35,
    });

    // Alveolar Bone Base
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.5,
    });

    // Molar Crown Geometry
    const crownGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      if (y > 0) {
        const cuspFactor = Math.sin(x * 3) * Math.cos(z * 3) * 0.28;
        y += cuspFactor;
        x *= 1.05 + 0.1 * Math.sin(y * 2);
        z *= 1.05 + 0.1 * Math.cos(y * 2);
      } else {
        const neckTaper = 1 - Math.abs(y) * 0.22;
        x *= Math.max(0.65, neckTaper);
        z *= Math.max(0.65, neckTaper);
      }
      pos.setXYZ(i, x, y, z);
    }
    crownGeo.computeVertexNormals();

    // Front Enamel Shell (Slides forward in Stage 3 reveal)
    const frontEnamelMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    frontEnamelMesh.scale.set(1.02, 1.05, 1.02);

    // Back Enamel Shell
    const backEnamelMesh = new THREE.Mesh(crownGeo, enamelMaterial.clone());
    backEnamelMesh.scale.set(1, 1.03, 1);

    toothGroup.add(frontEnamelMesh);
    toothGroup.add(backEnamelMesh);

    // Internal Dentin Layer
    const dentinMesh = new THREE.Mesh(crownGeo, dentinMaterial);
    dentinMesh.scale.set(0.85, 0.9, 0.85);
    toothGroup.add(dentinMesh);

    // Pulp Cavity Core
    const pulpMesh = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), pulpMaterial);
    pulpMesh.position.set(0, 0.3, 0);
    pulpMesh.scale.set(0.6, 0.9, 0.5);
    toothGroup.add(pulpMesh);

    // Molar Roots & Canals
    const rootCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, -0.2, 0),
      new THREE.Vector3(-0.8, -1.5, 0.1),
      new THREE.Vector3(-0.95, -2.6, -0.1),
    ]);
    const rootCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.65, -0.2, 0),
      new THREE.Vector3(0.8, -1.5, -0.1),
      new THREE.Vector3(0.95, -2.6, 0.1),
    ]);

    const rootGeo1 = new THREE.TubeGeometry(rootCurve1, 32, 0.42, 16, false);
    const rootGeo2 = new THREE.TubeGeometry(rootCurve2, 32, 0.42, 16, false);

    const root1 = new THREE.Mesh(rootGeo1, dentinMaterial);
    const root2 = new THREE.Mesh(rootGeo2, dentinMaterial);
    toothGroup.add(root1);
    toothGroup.add(root2);

    const canalGeo1 = new THREE.TubeGeometry(rootCurve1, 32, 0.12, 12, false);
    const canalGeo2 = new THREE.TubeGeometry(rootCurve2, 32, 0.12, 12, false);
    const canal1 = new THREE.Mesh(canalGeo1, vesselMaterial);
    const canal2 = new THREE.Mesh(canalGeo2, nerveMaterial);
    toothGroup.add(canal1);
    toothGroup.add(canal2);

    // Gingiva Gum Base
    const gingivaTorus = new THREE.Mesh(
      new THREE.TorusGeometry(1.25, 0.3, 16, 40),
      gingivaMaterial
    );
    gingivaTorus.rotation.x = Math.PI / 2;
    gingivaTorus.position.set(0, -0.8, 0);
    toothGroup.add(gingivaTorus);

    // Alveolar Bone Base
    const boneCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 1.2, 32),
      boneMaterial
    );
    boneCylinder.position.set(0, -2.1, 0);
    toothGroup.add(boneCylinder);

    toothGroup.position.set(0, 0.2, 0);
    toothGroup.rotation.set(0.18, -0.35, 0.1);

    // --- 4. IDLE LEVITATION LOOP ---
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animateIdle = () => {
      const elapsedTime = clock.getElapsedTime();

      const floatY = Math.sin(elapsedTime * 1.5) * 0.08;
      const breathScale = 1 + Math.sin(elapsedTime * 2.0) * 0.012;

      toothGroup.position.y = 0.2 + floatY;
      toothGroup.scale.set(breathScale, breathScale, breathScale);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateIdle);
    };

    animateIdle();

    // --- 5. GSAP SCROLLTRIGGER TIMELINE ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(prog);

            if (prog < 0.2) setActiveStage(1);
            else if (prog < 0.4) setActiveStage(2);
            else if (prog < 0.65) setActiveStage(3);
            else if (prog < 0.85) setActiveStage(4);
            else setActiveStage(5);
          },
        },
      });

      // Stage 1 -> Stage 2: Upright alignment facing front
      tl.to(toothGroup.rotation, {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        duration: 2,
        ease: "power2.inOut",
      });

      // Stage 2 -> Stage 3: Front Enamel Shell slides forward (Product reveal split)
      tl.to(
        frontEnamelMesh.position,
        {
          z: 1.4,
          x: 0.3,
          duration: 2.5,
          ease: "power3.out",
        },
        "+=0.5"
      );

      tl.to(
        (frontEnamelMesh.material as THREE.MeshPhysicalMaterial),
        {
          opacity: 0.35,
          duration: 2.5,
        },
        "<"
      );

      // Stage 3 -> Stage 4: Tooth shifts left for anatomical callout labels
      tl.to(
        toothGroup.position,
        {
          x: -0.8,
          duration: 2,
          ease: "power2.out",
        },
        "+=0.5"
      );

      tl.to(
        toothGroup.rotation,
        {
          y: -0.25,
          duration: 2,
          ease: "power2.out",
        },
        "<"
      );

      // Stage 4 -> Stage 5: Hero text fades away, anatomical labels fade in
      if (heroContentRef.current) {
        tl.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -40,
            duration: 1.5,
            ease: "power2.in",
          },
          0.1
        );
      }

      if (labelsContainerRef.current) {
        tl.to(
          labelsContainerRef.current,
          {
            opacity: 1,
            pointerEvents: "all",
            duration: 1.5,
            ease: "power2.out",
          },
          ">"
        );
      }
    });

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#F3F4F6]">
      {/* Pinned 3D Studio Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Soft Radial Studio Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_30%,#FFFFFF_0%,#F3F4F6_100%)]" />

        {/* Three.js Canvas */}
        <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hero Overlay Typography (Light Theme Aesthetics) */}
        <div
          ref={heroContentRef}
          className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 text-clinical-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-clinical-600 animate-pulse" />
            <span>METROPOLIS DENTAL CLINIC</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 max-w-4xl leading-[1.1] mb-6">
            Advanced Implantology. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-clinical-600 via-slate-800 to-emerald-600">
              Beautifully Engineered.
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl font-body font-normal leading-relaxed mb-10">
            Premium dental implants, prosthodontics, and smile rehabilitation in Guwahati led by{" "}
            <strong className="text-slate-900 font-semibold">Dr. Pratim Talukdar</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <a
              href="#booking"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 hover:bg-clinical-600 text-white font-medium text-sm transition-all duration-300 shadow-xl shadow-slate-900/15 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#anatomy"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-pill hover:bg-white text-slate-800 text-sm font-semibold transition-all duration-300 border border-slate-300 shadow-sm"
            >
              <span>Explore Treatments</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Scroll to reveal anatomy</span>
            <div className="w-5 h-9 rounded-full border border-slate-400/40 p-1 flex justify-center">
              <div className="w-1.5 h-2 bg-slate-800 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Anatomical Callout Labels Overlay (Light Theme Glass Cards) */}
        <div
          ref={labelsContainerRef}
          className="absolute z-20 inset-0 pointer-events-none opacity-0 transition-opacity duration-700 px-6 md:px-16"
        >
          <div className="relative w-full h-full max-w-7xl mx-auto flex justify-between items-center">
            {/* Left Side Labels */}
            <div className="flex flex-col gap-6 max-w-xs">
              {ANATOMY_LABELS.filter((l) => l.side === "left").map((label) => (
                <div
                  key={label.id}
                  className="group pointer-events-auto p-4 rounded-2xl glass-panel bg-white/85 hover:bg-white border border-slate-200 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-clinical-600 animate-ping" />
                    <h4 className="text-sm font-bold text-slate-900 tracking-wide">{label.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">{label.description}</p>
                </div>
              ))}
            </div>

            {/* Right Side Labels */}
            <div className="flex flex-col gap-3.5 max-w-xs text-right">
              {ANATOMY_LABELS.filter((l) => l.side === "right").map((label) => (
                <div
                  key={label.id}
                  className="group pointer-events-auto p-3.5 rounded-2xl glass-panel bg-white/85 hover:bg-white border border-slate-200 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 tracking-wide">{label.name}</h4>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-600 font-body leading-relaxed">{label.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Progress Indicator Badge */}
        <div className="absolute top-24 right-8 z-30 hidden lg:flex items-center gap-3 px-4 py-2 rounded-full glass-panel bg-white/80 border border-slate-200 text-xs font-mono text-slate-600 shadow-sm">
          <span>STAGE 0{activeStage} / 05</span>
          <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-clinical-600 to-emerald-600 transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
