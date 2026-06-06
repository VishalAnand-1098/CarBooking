import type { Metadata } from "next";
import CarsPageClient from "./CarsPageClient";

export const metadata: Metadata = {
  title: "Browse Cars",
  description:
    "Explore 2,500+ premium cars available for rent. Filter by category, price, location, and more.",
};

export default function CarsPage() {
  return <CarsPageClient />;
}
