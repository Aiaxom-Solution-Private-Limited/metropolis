export interface FrameSequenceConfig {
  id: string;
  name: string;
  totalFrames: number;
  directory: string;
  prefix: string;
  extension: "jpg" | "webp" | "png";
  zeroPadding: number;
}

export interface IdleTransformState {
  translateY: number;
  scale: number;
  rotation: number; // in degrees
}

export interface FrameSequenceState {
  currentFrame: number;
  progress: number; // 0 to 1
  isLoaded: boolean;
  loadedCount: number;
}

export interface HeroTimelineStage {
  progressStart: number;
  progressEnd: number;
  stageName: string;
}
