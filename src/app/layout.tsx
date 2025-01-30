import { PROD_URL } from "@/lib/config";
import { cities } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "concerts in town",
  description: "scraped directly from spotify",
  metadataBase: new URL(PROD_URL),
  openGraph: {
    siteName: "concerts in town",
    title: "concerts in town",
    description: "scraped directly from spotify",
    url: PROD_URL,
    tags: ["concerts", "spotify", "bengaluru", "town"].concat(cities),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
