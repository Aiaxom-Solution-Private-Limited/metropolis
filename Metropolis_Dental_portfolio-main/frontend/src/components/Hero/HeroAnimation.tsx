"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroCanvas from "./HeroCanvas";
import HeroOverlay from "./HeroOverlay";
import { useHeroIdleAnimation } from "@/hooks/useHeroIdleAnimation";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { FrameSequenceConfig } from "@/types/animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOOTH_SEQUENCE_CONFIG: FrameSequenceConfig = {
  id: "tooth_transformation",
  name: "Tooth Anatomical Reveal",
  totalFrames: 240,
  directory: "/tooth_frames",
  prefix: "frame_",
  extension: "jpg",
  zeroPadding: 4,
};

interface HeroAnimationProps {
  onOpenBookingModal?: () => void;
}

export default function HeroAnimation({ onOpenBookingModal }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // System A: Continuous Idle & Levitation Animation Loop (Zero Canvas Rotation)
  const idleState = useHeroIdleAnimation();

  // System B: Frame Sequence Engine scrubbed by ScrollTrigger
  const { currentImage, state: sequenceState } = useFrameSequence(
    TOOTH_SEQUENCE_CONFIG,
    scrollProgress
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context for clean isolation with GSAP pin
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#677274] overflow-hidden">
      {/* Full-bleed 100vw x 100vh Viewport */}
      <div className="absolute inset-0 w-full h-full">
        {/* Loading Bar Overlay */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 transition-opacity duration-500 ${
            sequenceState.isLoaded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
            Loading Cinematic Experience ({Math.round((sequenceState.loadedCount / TOOTH_SEQUENCE_CONFIG.totalFrames) * 100)}%)
          </span>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{
                width: `${(sequenceState.loadedCount / TOOTH_SEQUENCE_CONFIG.totalFrames) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* HTML5 Fullscreen Canvas */}
        <HeroCanvas currentImage={currentImage} idleState={idleState} />
      </div>

      {/* Hero Typography Overlay */}
      <HeroOverlay scrollProgress={scrollProgress} onOpenBookingModal={onOpenBookingModal} />
    </section>
  );
}
