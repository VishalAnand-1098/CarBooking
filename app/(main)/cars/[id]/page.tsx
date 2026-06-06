import type { Metadata } from "next";
import { FEATURED_CARS } from "@/lib/data";
import CarDetailClient from "./CarDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = FEATURED_CARS.find((c) => c.id === id);
  if (!car) return { title: "Car Not Found" };
  return {
    title: car.name,
    description: car.description,
    openGraph: { images: [car.thumbnail] },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  const car = FEATURED_CARS.find((c) => c.id === id);
  if (!car) notFound();
  const similar = FEATURED_CARS.filter((c) => c.id !== id && c.category === car.category).slice(0, 4);
  return <CarDetailClient car={car} similarCars={similar} />;
}
