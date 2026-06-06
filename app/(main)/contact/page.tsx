import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the CarHub360 team. We're here to help 24/7.",
};

export default function ContactPage() {
  return <ContactClient />;
}
