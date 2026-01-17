import "@workspace/ui/globals.css";

import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";
import { preconnect, prefetchDNS } from "react-dom";

import { FooterServer, FooterSkeleton } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { getNavigationData } from "@/lib/navigation";
import { SanityLive } from "@/lib/sanity/live";

const fontSans = localFont({
  src: [
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-Book-BF66160450c2e92.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-BookItalic-BF661604511b981.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-Medium-BF66160450d988d.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-MediumItalic-BF6616045177c71.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-Semibold-BF66160451692c7.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-SemiboldItalic-BF661604516314e.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-Bold-BF6616045097aac.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/galaxie-copernicus/CopernicusTrial-BoldItalic-BF6616045093ed8.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  const nav = await getNavigationData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar navbarData={nav.navbarData} settingsData={nav.settingsData} />
          {children}
          <Suspense fallback={<FooterSkeleton />}>
            <FooterServer />
          </Suspense>
          <SanityLive />
          <CombinedJsonLd includeOrganization includeWebsite />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
