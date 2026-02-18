import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import {
  getTranslations,
  setRequestLocale,
  getMessages,
} from "next-intl/server";
import { routing } from "@/i18n/routing";

import ScanlineOverlay from "@/components/ScanlineOverlay";
import LazyCanvas from "@/components/LazyCanvas";
import Navbar from "@/components/Navbar";
import DevGuard from "@/components/DevGuard";
import { LiveProvider } from "@/lib/LiveContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d4a017",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["almir santos", "games", "youtube", "live", "gaming"],
    authors: [{ name: "Almir Santos" }],
    icons: {
      icon: "/assets/favicon.png",
    },
    other: {
      "theme-color": "#d4a017",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      images: [
        {
          url: "https://i.imgur.com/wDeIUtQ.gif",
          width: 1200,
          height: 1200,
          alt: "Almir Santos Games",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://i.imgur.com/wDeIUtQ.gif"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/assets/almirsantos_logo_placeholder.webp"
        />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/assets/almirsantos_hero_animation.avif"
        />
      </head>
      <body className="bg-retro-black text-retro-chrome-light font-mono antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LiveProvider>
            {/* DevGuard - blocks right-click & DevTools */}
            <DevGuard />

            {/* Canvas Background - behind everything */}
            <LazyCanvas />

            {/* Navbar - below scanlines but above content */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10">{children}</main>

            {/* Scanlines Overlay - above everything (z-999) */}
            <ScanlineOverlay />
          </LiveProvider>
        </NextIntlClientProvider>

        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "24d732a70f594b9c86fb2ad5f6704af7"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
