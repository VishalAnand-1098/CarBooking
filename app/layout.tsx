import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ensureDb } from "@/models/init";
import { connectMongoose } from "@/lib/mongoose";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "CarHub360 — Drive Your Dream Car",
    template: "%s | CarHub360",
  },
  description:
    "Book premium cars instantly for business trips, luxury vacations, weddings, airport transfers, or unforgettable road adventures. 2,500+ premium vehicles across 100+ cities.",
  keywords: [
    "car rental",
    "luxury car rental",
    "premium cars",
    "BMW rental",
    "Lamborghini rental",
    "Ferrari rental",
    "sports car rental",
    "self-drive cars",
    "CarHub360",
  ],
  authors: [{ name: "CarHub360" }],
  creator: "CarHub360",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "CarHub360 — Drive Your Dream Car",
    description:
      "Book premium cars instantly. 2,500+ cars. 100+ cities. 4.9★ rated.",
    siteName: "CarHub360",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarHub360 — Drive Your Dream Car",
    description: "Book premium cars instantly. 2,500+ cars. 100+ cities.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    // connect using mongoose (ODM)
    await connectMongoose()
    // ensure collections and indexes (native driver helpers)
    await ensureDb()
  } catch (err) {
    // log but don't crash the app
    // eslint-disable-next-line no-console
    console.error('Failed to initialize MongoDB:', err)
  }

  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body className="min-h-screen bg-[#0B0F19] text-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(17,24,39,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  )
}
