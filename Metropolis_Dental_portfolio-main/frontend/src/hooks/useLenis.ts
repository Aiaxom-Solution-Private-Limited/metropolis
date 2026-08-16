"use client";

import { useEffect } from "react";

export function useLenisScroll() {
  useEffect(() => {
    let lenisInstance: any;

    const initLenis = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 2.0,
        });

        function raf(time: number) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis initialization skipped or fallback to native scroll", e);
      }
    };

    initLenis();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);
}
