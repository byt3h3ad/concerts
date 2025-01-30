import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "concerts in %s",
    default: "town",
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
