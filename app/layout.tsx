import type { Metadata } from "next";
import "./globals.css";
import CursorAura from "@/components/CursorAura";
import MapGrid from "@/components/MapGrid";

const title = "Kuane Forrest · Software engineer";
const description =
  "Software engineer from Kingston, Jamaica. I build mobile apps, and co-founded Cite, a live campus map on the App Store.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23060606'/><text x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='11' font-weight='700' fill='%23c8ff00'>kf</text></svg>"
        />
      </head>
      <body>
        <div id="cur"></div>
        <div id="cur-r"></div>
        <CursorAura />
        <MapGrid />
        {children}
      </body>
    </html>
  );
}
