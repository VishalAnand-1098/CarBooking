import type { MetadataRoute } from "next";
import { FEATURED_CARS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();

  const staticRoutes = [
    "", "/cars", "/partner", "/auth/login", "/auth/signup", "/dashboard",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const carRoutes = FEATURED_CARS.map((car) => ({
    url: `${base}/cars/${car.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...carRoutes];
}
