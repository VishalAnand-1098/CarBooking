import type { Metadata } from "next";
import { FEATURED_CARS } from "@/lib/data";
import BookingClient from "./BookingClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ carId: string }>;
}

export const metadata: Metadata = {
  title: "Book Your Car",
  description: "Complete your premium car booking in 4 simple steps.",
};

export default async function BookingPage({ params }: Props) {
  const { carId } = await params;
  const car = FEATURED_CARS.find((c) => c.id === carId);
  if (!car) notFound();
  return <BookingClient car={car} />;
}
