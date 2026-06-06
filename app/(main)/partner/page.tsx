import type { Metadata } from "next";
import PartnerPageClient from "./PartnerPageClient";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "List your car on CarHub360 and earn passive income. Zero joining fee. Secure payments.",
};

export default function PartnerPage() {
  return <PartnerPageClient />;
}
