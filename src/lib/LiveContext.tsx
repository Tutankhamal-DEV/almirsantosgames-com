"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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
 * Checks live status via our server-side API route.
 * The actual YouTube oEmbed call happens on the server,
 * so 404 errors (when not live) don't appear in the browser console.
 */
async function checkLiveStatus(): Promise<LiveStatus> {
  try {
    const res = await fetch("/api/live-status", { cache: "no-store" });
    if (!res.ok) return { isLive: false, liveVideoId: null };
    return await res.json();
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
