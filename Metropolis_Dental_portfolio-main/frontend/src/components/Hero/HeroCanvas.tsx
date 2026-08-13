"use client";

import React, { useEffect, useRef } from "react";
import { renderCanvasFrame } from "@/lib/canvasRenderer";
import { IdleTransformState } from "@/types/animation";

interface HeroCanvasProps {
  currentImage: HTMLImageElement | undefined;
  idleState: IdleTransformState;
}

export default function HeroCanvas({ currentImage, idleState }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      renderCanvasFrame({
        ctx,
        canvas,
        image: currentImage,
        idleState,
      });

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [currentImage, idleState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
    />
  );
}
