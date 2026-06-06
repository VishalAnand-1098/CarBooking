import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Manage your bookings, wishlist, rewards, and profile.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
