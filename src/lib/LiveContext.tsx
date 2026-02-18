"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { CHANNEL_ID } from "./youtube";

interface LiveStatus {
  isLive: boolean;
  liveVideoId: string | null;
}

const LiveContext = createContext<LiveStatus>({
  isLive: false,
  liveVideoId: null,
});

export function useLiveStatus() {
  return useContext(LiveContext);
}

/**
 * Checks if the YouTube channel is currently live by attempting to
 * resolve the channel's /live URL via YouTube oEmbed.
 */
async function checkLiveStatus(): Promise<LiveStatus> {
  try {
    const liveUrl = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(liveUrl)}&format=json`;
    const res = await fetch(oembedUrl, { cache: "no-store" });

    if (!res.ok) return { isLive: false, liveVideoId: null };

    const data = await res.json();
    // oEmbed returns html with an iframe embed URL containing the video ID
    const match = data.html?.match(/embed\/([a-zA-Z0-9_-]+)/);
    const videoId = match?.[1] ?? null;

    // The title from oEmbed will typically contain live indicators
    const title: string = data.title ?? "";
    const isLiveStream =
      title.toLowerCase().includes("live") ||
      title.toLowerCase().includes("ao vivo") ||
      data.html?.includes("live_stream");

    return { isLive: !!videoId && isLiveStream, liveVideoId: videoId };
  } catch {
    return { isLive: false, liveVideoId: null };
  }
}

export function LiveProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    liveVideoId: null,
  });

  useEffect(() => {
    checkLiveStatus().then(setStatus);

    // Re-check every 2 minutes
    const interval = setInterval(() => {
      checkLiveStatus().then(setStatus);
    }, 120_000);

    return () => clearInterval(interval);
  }, []);

  return <LiveContext.Provider value={status}>{children}</LiveContext.Provider>;
}
