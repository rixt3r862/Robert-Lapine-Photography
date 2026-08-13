import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bob-lapine-photography.rixt3r862.chatgpt.site"),
  title: "Robert Lapine Photography | Landscape & Wildlife",
  description:
    "The landscape and wildlife photography of Robert Lapine, captured across the American West.",
  openGraph: {
    title: "Robert Lapine Photography | Landscape & Wildlife",
    description: "Landscapes, wildlife, and photo stories from across the American West.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Robert Lapine Photography — Landscape and Wildlife" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Lapine Photography | Landscape & Wildlife",
    description: "Landscapes, wildlife, and photo stories from across the American West.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
