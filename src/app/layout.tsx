import { PROD_URL } from "@/lib/config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "concerts in bangalore",
  description: "scraped directly from spotify",
  metadataBase: new URL(PROD_URL),
  openGraph: {
    siteName: "concerts in bangalore",
    title: "concerts in bangalore",
    description: "scraped directly from spotify",
    url: PROD_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
