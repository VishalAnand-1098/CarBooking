"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  Heart,
  CreditCard,
  Bell,
  Gift,
  User,
  Settings,
  LogOut,
  Star,
  Calendar,
  MapPin,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { FEATURED_CARS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "My Bookings", icon: Car },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const MOCK_BOOKINGS = [
  {
    id: "BK001",
    car: FEATURED_CARS[0],
    pickupDate: "2026-06-10",
    returnDate: "2026-06-13",
    status: "confirmed" as const,
    total: 30600,
  },
  {
    id: "BK002",
    car: FEATURED_CARS[2],
    pickupDate: "2026-05-20",
    returnDate: "2026-05-22",
    status: "completed" as const,
    total: 37200,
  },
  {
    id: "BK003",
    car: FEATURED_CARS[5],
    pickupDate: "2026-04-15",
    returnDate: "2026-04-17",
    status: "cancelled" as const,
    total: 22800,
  },
];

const STATUS_CONFIG = {
  confirmed: { label: "Confirmed", icon: CheckCircle2, color: "text-blue-400 bg-blue-500/15 border-blue-500/30" },
  active: { label: "Active", icon: TrendingUp, color: "text-green-400 bg-green-500/15 border-green-500/30" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-white/50 bg-white/[0.05] border-white/[0.1]" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-400 bg-red-500/15 border-red-500/30" },
};

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            {/* Profile Card */}
            <div className="glass border border-white/[0.1] rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Arjun Mehta</p>
                  <p className="text-xs text-white/40">arjun@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl px-3 py-2">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs text-white/70">Reward Points:</span>
                <span className="text-sm font-bold text-[#D4AF37]">2,450</span>
              </div>
            </div>

            {/* Nav */}
            <div className="glass border border-white/[0.08] rounded-2xl overflow-hidden">
              {SIDEBAR_ITEMS.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                  {badge && (
                    <span className="w-5 h-5 bg-blue-600 rounded-full text-xs flex items-center justify-center text-white font-bold">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
              <div className="border-t border-white/[0.06]">
                <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.05] transition-all">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "bookings" && <BookingsTab />}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "profile" && <ProfileTab />}
            {!["overview", "bookings", "wishlist", "profile"].includes(activeTab) && (
              <div className="glass border border-white/[0.08] rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🚧</div>
                <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-white/40 text-sm">This section is under development.</p>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const WIDGETS = [
    { label: "Total Bookings", value: "12", icon: Car, color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-400" },
    { label: "Upcoming Trips", value: "2", icon: Calendar, color: "from-green-500/20 to-green-600/10", iconColor: "text-green-400" },
    { label: "Reward Points", value: "2,450", icon: Gift, color: "from-[#D4AF37]/20 to-[#D4AF37]/5", iconColor: "text-[#D4AF37]" },
    { label: "Saved Cars", value: "5", icon: Heart, color: "from-red-500/20 to-red-600/10", iconColor: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Arjun! 👋</h1>
        <p className="text-white/50 text-sm">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {WIDGETS.map(({ label, value, icon: Icon, color, iconColor }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass border border-white/[0.08] rounded-2xl p-5 bg-gradient-to-br ${color}`}
          >
            <div className={`${iconColor} mb-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-white/50 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Trip */}
      <div className="glass border border-white/[0.1] rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-5">Upcoming Trip</h3>
        <div className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
          <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={FEATURED_CARS[0].thumbnail} alt={FEATURED_CARS[0].name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm truncate">{FEATURED_CARS[0].name}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1 text-xs text-white/50">
                <Calendar className="w-3 h-3" />
                Jun 10 – Jun 13
              </div>
              <div className="flex items-center gap-1 text-xs text-white/50">
                <MapPin className="w-3 h-3" />
                Mumbai
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-white">{formatCurrency(30600)}</p>
            <span className="inline-flex items-center px-2.5 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium mt-1">
              Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass border border-white/[0.1] rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-5">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: CheckCircle2, color: "text-green-400", title: "Booking BK001 confirmed", time: "2 hours ago" },
            { icon: CreditCard, color: "text-blue-400", title: "Payment of ₹30,600 processed", time: "2 hours ago" },
            { icon: Gift, color: "text-[#D4AF37]", title: "850 reward points earned", time: "2 hours ago" },
            { icon: Star, color: "text-white/40", title: "Review for Porsche 911 submitted", time: "15 days ago" },
          ].map(({ icon: Icon, color, title, time }) => (
            <div key={title} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80">{title}</p>
                <p className="text-xs text-white/30">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-white">My Bookings</h2>
      {MOCK_BOOKINGS.map((booking) => {
        const cfg = STATUS_CONFIG[booking.status];
        const StatusIcon = cfg.icon;
        return (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-white/[0.1] rounded-2xl p-5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={booking.car.thumbnail} alt={booking.car.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">#{booking.id}</p>
                    <p className="font-bold text-white">{booking.car.name}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(booking.pickupDate)} – {formatDate(booking.returnDate)}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{booking.car.city}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-white">{formatCurrency(booking.total)}</p>
                  <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function WishlistTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_CARS.slice(0, 3).map((car, i) => (
          <motion.div key={car.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass border border-white/[0.1] rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <Image src={car.thumbnail} alt={car.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-4">
              <p className="font-bold text-white text-sm mb-1">{car.name}</p>
              <p className="text-xl font-extrabold text-white mb-3">{formatCurrency(car.price_per_day)}<span className="text-xs text-white/40">/day</span></p>
              <Link href={`/cars/${car.id}`} className="block w-full text-center py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-semibold hover:bg-blue-600/40 transition-colors">
                Book Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-white">My Profile</h2>
      <div className="glass border border-white/[0.1] rounded-2xl p-7">
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/[0.08]">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Profile" fill className="object-cover" />
          </div>
          <div>
            <p className="text-xl font-bold text-white">Arjun Mehta</p>
            <p className="text-white/50 text-sm">Member since January 2025</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-sm text-white/70">4.9 customer rating · 12 bookings</span>
            </div>
          </div>
          <button className="ml-auto px-4 py-2 glass border border-white/[0.1] rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all">
            Edit Photo
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Arjun Mehta" },
            { label: "Email Address", value: "arjun@example.com" },
            { label: "Phone Number", value: "+91 98765 43210" },
            { label: "City", value: "Mumbai, Maharashtra" },
            { label: "Driving License", value: "MH-1234567890" },
            { label: "Date of Birth", value: "15 March 1992" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
              <p className="text-xs text-white/40 uppercase tracking-wide mb-1.5">{label}</p>
              <p className="text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-500 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
