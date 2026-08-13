"use client";

import { useEffect, useRef, useState } from "react";
import { IdleTransformState } from "@/types/animation";

export function useHeroIdleAnimation(): IdleTransformState {
  const [transformState, setTransformState] = useState<IdleTransformState>({
    translateY: 0,
    scale: 1,
    rotation: 0,
  });

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const animateIdle = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // seconds

      // Subtle breathing scale (1.0 to 1.008) on stationary frame
      const scale = 1 + Math.sin(elapsed * 2.0) * 0.005;

      setTransformState({
        translateY: 0, // Zero vertical displacement to keep studio background 100% static
        scale,
        rotation: 0,
      });

      requestRef.current = requestAnimationFrame(animateIdle);
    };

    requestRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return transformState;
}
