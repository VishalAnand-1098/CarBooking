import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "CarHub360 Admin — manage cars, bookings, users, revenue.",
};

export default function AdminPage() {
  return <AdminClient />;
}
