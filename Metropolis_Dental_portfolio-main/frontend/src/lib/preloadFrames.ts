import { FrameSequenceConfig } from "@/types/animation";

const frameCache = new Map<string, HTMLImageElement[]>();

export function getFramePath(config: FrameSequenceConfig, frameIndex: number): string {
  // frameIndex is 1-indexed (e.g. 1 to 240)
  const paddedIndex = String(frameIndex).padStart(config.zeroPadding, "0");
  return `${config.directory}/${config.prefix}${paddedIndex}.${config.extension}`;
}

export async function preloadFrameSequence(
  config: FrameSequenceConfig,
  onProgress?: (loadedCount: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const cacheKey = `${config.id}_${config.totalFrames}`;
  
  if (frameCache.has(cacheKey)) {
    const cached = frameCache.get(cacheKey)!;
    if (onProgress) onProgress(cached.length, cached.length);
    return cached;
  }

  const images: HTMLImageElement[] = new Array(config.totalFrames);
  let loadedCount = 0;

  const loadPromises = Array.from({ length: config.totalFrames }, (_, i) => {
    const frameIndex = i + 1; // 1 to totalFrames
    const src = getFramePath(config, frameIndex);

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        if (onProgress) onProgress(loadedCount, config.totalFrames);
        resolve();
      };
      img.onerror = () => {
        console.warn(`[Frame Preloader]: Failed to load frame image at ${src}`);
        images[i] = img;
        loadedCount++;
        if (onProgress) onProgress(loadedCount, config.totalFrames);
        resolve();
      };
    });
  });

  await Promise.all(loadPromises);
  frameCache.set(cacheKey, images);
  return images;
}
