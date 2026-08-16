import { IdleTransformState } from "@/types/animation";

export interface RenderOptions {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | undefined;
  idleState: IdleTransformState;
}

/**
  Renders image frame onto full-bleed 100vw x 100vh canvas with zero rotation tilt.
  Completely covers the viewport without any visible borders or rotated rectangles.
 */
export function renderCanvasFrame({
  ctx,
  canvas,
  image,
  idleState,
}: RenderOptions): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (width === 0 || height === 0) return;

  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
  }

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  if (!image || !image.complete || image.naturalWidth === 0) {
    ctx.restore();
    return;
  }

  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;
  const imgAspect = imgWidth / imgHeight;
  const canvasAspect = width / height;

  let drawWidth: number;
  let drawHeight: number;

  // Object Fit: Cover (fills viewport 100vw x 100vh seamlessly)
  if (canvasAspect > imgAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  const centerX = width / 2;
  const centerY = height / 2 + idleState.translateY;

  ctx.translate(centerX, centerY);
  // System A Breathing Scale (Subtle 1-2%) - ZERO ROTATION!
  ctx.scale(idleState.scale, idleState.scale);

  ctx.drawImage(
    image,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight
  );

  ctx.restore();
}
