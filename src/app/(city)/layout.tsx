import { PROD_URL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "concerts in bangalore",
  description: "scraped directly from spotify",
  metadataBase: new URL(PROD_URL),
  openGraph: {
    siteName: "concerts in bangalore",
    title: "concerts in bangalore",
    description: "scraped directly from spotify",
    url: PROD_URL,
    tags: ["concerts", "bangalore", "spotify", "bengaluru"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-8">
      {children}
    </div>
  );
}
