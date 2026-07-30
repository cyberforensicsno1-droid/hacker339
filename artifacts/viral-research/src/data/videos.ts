// Shared video data store — backed by localStorage so new imports persist

export interface VideoData {
  id: number;
  title: string;
  caption: string;
  link: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  duration: string;          // e.g. "11.77s"
  durationSec: number;       // numeric seconds for averaging
  format: string;
  fps: string;
  music: string;
}

export const DEFAULT_VIDEOS: VideoData[] = [
  {
    id: 1,
    title: "5 Chrome Extensions For Hackers!",
    caption: "Chrome Extension For Hackers #infosec",
    link: "https://www.facebook.com/share/r/1ByqdhCdHJ/",
    views: 3300000,
    likes: 44100,
    shares: 2700,
    comments: 401,
    duration: "11.77s",
    durationSec: 11.77,
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Dark Eyes (Slowed)",
  },
  {
    id: 2,
    title: "7 Free Resources To Learn Hacking From Scratch",
    caption: "Free Learning Resources for Hackers #infosec",
    link: "https://www.facebook.com/share/r/1K9mPUr8VM/",
    views: 1900000,
    likes: 28600,
    shares: 1500,
    comments: 273,
    duration: "10.57s",
    durationSec: 10.57,
    format: "720×1280 (9:16)",
    fps: "30 FPS",
    music: "Eyes · Dark (Slowed)",
  },
];

const STORAGE_KEY = "hacker339_videos";

export function loadVideos(): VideoData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_VIDEOS;
    const parsed: VideoData[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_VIDEOS;
    return parsed;
  } catch {
    return DEFAULT_VIDEOS;
  }
}

export function saveVideos(videos: VideoData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

export function addVideo(videos: VideoData[], newVideo: Omit<VideoData, "id">): VideoData[] {
  const id = videos.length > 0 ? Math.max(...videos.map((v) => v.id)) + 1 : 1;
  const updated = [...videos, { ...newVideo, id }];
  saveVideos(updated);
  return updated;
}

export function deleteVideo(videos: VideoData[], id: number): VideoData[] {
  const updated = videos.filter((v) => v.id !== id);
  saveVideos(updated);
  return updated;
}

export function computeAverages(videos: VideoData[]) {
  if (videos.length === 0) return null;
  const n = videos.length;
  const avg = (key: keyof VideoData) =>
    videos.reduce((s, v) => s + (v[key] as number), 0) / n;

  const avgViews   = avg("views");
  const avgLikes   = avg("likes");
  const avgShares  = avg("shares");
  const avgComments = avg("comments");
  const avgDuration = avg("durationSec");

  return {
    avgViews:        Math.round(avgViews),
    avgLikes:        Math.round(avgLikes),
    avgShares:       Math.round(avgShares),
    avgComments:     Math.round(avgComments),
    avgDurationSec:  +avgDuration.toFixed(2),
    avgLikeRate:     +((avgLikes / avgViews) * 100).toFixed(2),
    avgShareRate:    +((avgShares / avgViews) * 100).toFixed(3),
    avgShareLikeRatio: +((avgShares / avgLikes) * 100).toFixed(2),
    avgCommentRate:  +((avgComments / avgViews) * 100).toFixed(3),
    totalViews:      videos.reduce((s, v) => s + v.views, 0),
    totalLikes:      videos.reduce((s, v) => s + v.likes, 0),
    totalShares:     videos.reduce((s, v) => s + v.shares, 0),
    totalComments:   videos.reduce((s, v) => s + v.comments, 0),
  };
}
