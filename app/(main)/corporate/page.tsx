import type { Metadata } from "next";
import CorporateClient from "./CorporateClient";

export const metadata: Metadata = {
  title: "Corporate Rentals",
  description:
    "Premium fleet solutions for businesses. Flexible billing, dedicated account managers, and priority support for corporate clients.",
};

export default function CorporatePage() {
  return <CorporateClient />;
}
