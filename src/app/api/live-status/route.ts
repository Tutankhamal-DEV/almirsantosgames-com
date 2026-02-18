import { NextResponse } from "next/server";

const CHANNEL_ID = "UCZ263BAMRSrPoh0-ixwzJOA";

/**
 * Server-side proxy for YouTube oEmbed live-status check.
 * This prevents the 404 error from appearing in the browser console
 * when the channel is not live (which is expected behavior from YouTube).
 */
export async function GET() {
  try {
    const liveUrl = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(liveUrl)}&format=json`;
    const res = await fetch(oembedUrl, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { isLive: false, liveVideoId: null },
        {
          status: 200,
          headers: { "Cache-Control": "no-store, max-age=0" },
        },
      );
    }

    const data = await res.json();
    const match = data.html?.match(/embed\/([a-zA-Z0-9_-]+)/);
    const videoId = match?.[1] ?? null;

    const title: string = data.title ?? "";
    const isLiveStream =
      title.toLowerCase().includes("live") ||
      title.toLowerCase().includes("ao vivo") ||
      data.html?.includes("live_stream");

    return NextResponse.json(
      { isLive: !!videoId && isLiveStream, liveVideoId: videoId },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  } catch {
    return NextResponse.json(
      { isLive: false, liveVideoId: null },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }
}
