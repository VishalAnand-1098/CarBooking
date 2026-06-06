import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import BookingWidget from "@/components/landing/BookingWidget";
import StatsSection from "@/components/landing/StatsSection";
import FeaturedCarsSection from "@/components/landing/FeaturedCarsSection";
import LuxuryBrandsSection from "@/components/landing/LuxuryBrandsSection";
import AITripPlannerSection from "@/components/landing/AITripPlannerSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PartnerSection from "@/components/landing/PartnerSection";

export const metadata: Metadata = {
  title: "CarHub360 — Drive Your Dream Car",
  description:
    "Book premium cars instantly. 2,500+ cars across 100+ cities. BMW, Mercedes, Lamborghini, Ferrari and more.",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CarHub360",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Premium car rental marketplace with 2,500+ luxury cars across 100+ cities.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10000",
  },
  sameAs: [
    "https://instagram.com/carhub360",
    "https://linkedin.com/company/carhub360",
    "https://twitter.com/carhub360",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <HeroSection />
      <BookingWidget />
      <StatsSection />
      <FeaturedCarsSection />
      <LuxuryBrandsSection />
      <AITripPlannerSection />
      <TestimonialsSection />
      <PartnerSection />
    </>
  );
}
