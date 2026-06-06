import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CarHub360 is the world's most premium car rental marketplace, redefining luxury mobility across India.",
};

export default function AboutPage() {
  return <AboutClient />;
}
