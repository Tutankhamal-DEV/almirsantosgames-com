"use client";

import { useState, useEffect } from "react";

const CHANNEL_ID = "UCRDH3LQQQRrEs1UnGP7fBuw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

interface RssItem {
  title: string;
  link: string;
  thumbnail: string;
}

function extractVideoId(link: string): string {
  try {
    const url = new URL(link);
    return url.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

/**
 * Client-side hook to fetch latest videos from YouTube RSS feed.
 */
export function useYouTubeVideos(count: number = 15) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(RSS2JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const items: RssItem[] = data.items ?? [];
        const parsed = items
          .slice(0, count)
          .map((item) => {
            const id = extractVideoId(item.link);
            return {
              id,
              title: item.title,
              thumbnail:
                item.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            };
          })
          .filter((v) => v.id);
        setVideos(parsed);
      })
      .catch((err) => {
        console.error("Failed to fetch YouTube RSS:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [count]);

  return { videos, loading };
}

export { CHANNEL_ID };
