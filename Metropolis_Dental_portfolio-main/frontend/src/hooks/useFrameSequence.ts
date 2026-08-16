"use client";

import { useEffect, useState, useRef } from "react";
import { FrameSequenceConfig, FrameSequenceState } from "@/types/animation";
import { preloadFrameSequence } from "@/lib/preloadFrames";

export function useFrameSequence(
  config: FrameSequenceConfig,
  scrollProgress: number
): {
  frames: HTMLImageElement[];
  currentImage: HTMLImageElement | undefined;
  state: FrameSequenceState;
} {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [state, setState] = useState<FrameSequenceState>({
    currentFrame: 1,
    progress: 0,
    isLoaded: false,
    loadedCount: 0,
  });

  // Preload sequence frames
  useEffect(() => {
    let isMounted = true;

    preloadFrameSequence(config, (loadedCount, total) => {
      if (isMounted) {
        setState((prev) => ({
          ...prev,
          loadedCount,
          isLoaded: loadedCount === total,
        }));
      }
    }).then((loadedFrames) => {
      if (isMounted) {
        setFrames(loadedFrames);
        setState((prev) => ({ ...prev, isLoaded: true }));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [config.id, config.totalFrames, config.directory]);

  // System B: Calculate frame index strictly based on scroll progress timeline (0 to 1)
  // Timeline specification:
  // 0 - 20%: Frame 1
  // 20% - 90%: Frame 1 -> Frame totalFrames
  // 90% - 100%: Frame totalFrames
  useEffect(() => {
    let frameIndex = 1;

    if (scrollProgress <= 0.2) {
      frameIndex = 1;
    } else if (scrollProgress >= 0.9) {
      frameIndex = config.totalFrames;
    } else {
      // Map 0.2 -> 0.9 to frame 1 -> totalFrames
      const normalizedScroll = (scrollProgress - 0.2) / 0.7;
      frameIndex = Math.round(1 + normalizedScroll * (config.totalFrames - 1));
    }

    // Clamp frame index safely
    frameIndex = Math.max(1, Math.min(config.totalFrames, frameIndex));

    setState((prev) => {
      if (prev.currentFrame === frameIndex && prev.progress === scrollProgress) {
        return prev;
      }
      return {
        ...prev,
        currentFrame: frameIndex,
        progress: scrollProgress,
      };
    });
  }, [scrollProgress, config.totalFrames]);

  const currentImage = frames[state.currentFrame - 1];

  return {
    frames,
    currentImage,
    state,
  };
}
