"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Car, Calendar, Users, Handshake, TrendingUp,
  Star, Tag, Settings, ArrowUpRight, ArrowDownRight,
  Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle,
  IndianRupee,
} from "lucide-react";
import { FEATURED_CARS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const SIDEBAR = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "cars", label: "Cars", icon: Car },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "users", label: "Users", icon: Users },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "revenue", label: "Revenue", icon: IndianRupee },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATS_CARDS = [
  { label: "Total Revenue", value: "₹18.4L", change: "+12.5%", up: true, icon: TrendingUp, color: "from-blue-600/20 to-blue-800/5" },
  { label: "Active Bookings", value: "248", change: "+8.3%", up: true, icon: Calendar, color: "from-green-600/20 to-green-800/5" },
  { label: "Total Cars", value: "2,548", change: "+24", up: true, icon: Car, color: "from-[#D4AF37]/20 to-[#D4AF37]/5" },
  { label: "Registered Users", value: "12,490", change: "+156", up: true, icon: Users, color: "from-purple-600/20 to-purple-800/5" },
];

const MOCK_BOOKINGS = [
  { id: "BK-8841", user: "Arjun Mehta", car: "BMW M4 Competition", amount: 30600, status: "confirmed", date: "Jun 10" },
  { id: "BK-8840", user: "Priya Sharma", car: "Porsche 911", amount: 45000, status: "active", date: "Jun 9" },
  { id: "BK-8839", user: "Vikram Singh", car: "Tesla Model S", amount: 22800, status: "completed", date: "Jun 8" },
  { id: "BK-8838", user: "Sneha Kapoor", car: "Range Rover", amount: 54000, status: "cancelled", date: "Jun 7" },
  { id: "BK-8837", user: "Rahul Verma", car: "Audi Q8", amount: 33000, status: "confirmed", date: "Jun 7" },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  active: "bg-green-500/15 border-green-500/30 text-green-400",
  completed: "bg-white/[0.05] border-white/[0.1] text-white/50",
  cancelled: "bg-red-500/15 border-red-500/30 text-red-400",
};

const REVENUE_BARS = [
  { month: "Jan", value: 75 }, { month: "Feb", value: 60 }, { month: "Mar", value: 85 },
  { month: "Apr", value: 70 }, { month: "May", value: 90 }, { month: "Jun", value: 100 },
  { month: "Jul", value: 80 }, { month: "Aug", value: 65 }, { month: "Sep", value: 78 },
  { month: "Oct", value: 88 }, { month: "Nov", value: 72 }, { month: "Dec", value: 95 },
];

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pt-20 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:flex flex-col w-[220px] sticky top-20 h-[calc(100vh-5rem)] bg-[#0D1119] border-r border-white/[0.06] p-4 overflow-y-auto"
      >
        <div className="mb-6 px-2">
          <p className="text-xs text-white/30 font-semibold uppercase tracking-widest">Admin Panel</p>
        </div>
        {SIDEBAR.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all w-full text-left ${
              activeTab === id
                ? "bg-blue-600/20 text-blue-400"
                : "text-white/50 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </motion.aside>

      {/* Main */}
      <div className="flex-1 overflow-x-hidden">
        <div className="p-6 lg:p-8 max-w-[1200px]">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "cars" && <AdminCars searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          {activeTab === "bookings" && <AdminBookings />}
          {!["dashboard", "cars", "bookings"].includes(activeTab) && (
            <div className="glass border border-white/[0.08] rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-white/40">This admin section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">Welcome back, Admin. Here&apos;s your platform overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map(({ label, value, change, up, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass border border-white/[0.08] rounded-2xl p-5 bg-gradient-to-br ${color}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-white/70" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-green-400" : "text-red-400"}`}>
                {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {change}
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="glass border border-white/[0.1] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white">Monthly Revenue</h3>
          <div className="flex gap-2">
            {["6M", "1Y", "All"].map((t, i) => (
              <button key={t} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${i === 1 ? "bg-blue-600/20 border border-blue-500/30 text-blue-400" : "text-white/40 hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-40">
          {REVENUE_BARS.map(({ month, value }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="w-full bg-gradient-to-t from-blue-600/60 to-blue-400/80 rounded-t-lg relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{value}L
                </div>
              </motion.div>
              <span className="text-xs text-white/30">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="glass border border-white/[0.1] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="font-bold text-white">Recent Bookings</h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Booking ID", "Customer", "Car", "Amount", "Status", "Date", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((b, i) => (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-blue-400">{b.id}</td>
                  <td className="px-5 py-3.5 text-sm text-white/80">{b.user}</td>
                  <td className="px-5 py-3.5 text-sm text-white/70">{b.car}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-white">{formatCurrency(b.amount)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${STATUS_STYLES[b.status]}`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-white/40">{b.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-white/30 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminCars({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (v: string) => void }) {
  const filtered = FEATURED_CARS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Manage Cars</h2>
        <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors">
          + Add Car
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 glass border border-white/[0.08] rounded-xl text-sm text-white/60 hover:text-white transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="glass border border-white/[0.1] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Car", "Category", "Price/Day", "Location", "Rating", "Status", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((car, i) => (
              <motion.tr
                key={car.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={car.thumbnail} alt={car.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white truncate max-w-[140px]">{car.name}</p>
                      <p className="text-xs text-white/40">{car.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-white/60 capitalize">{car.category}</td>
                <td className="px-5 py-4 text-sm font-semibold text-white">{formatCurrency(car.price_per_day)}</td>
                <td className="px-5 py-4 text-sm text-white/60">{car.city}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-sm text-white font-medium">{car.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${car.available ? "bg-green-500/15 border-green-500/30 text-green-400" : "bg-red-500/15 border-red-500/30 text-red-400"}`}>
                    {car.available ? <><CheckCircle2 className="w-3 h-3" />Active</> : <><XCircle className="w-3 h-3" />Inactive</>}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-white/30 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminBookings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">All Bookings</h2>
      <div className="glass border border-white/[0.1] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Booking ID", "Customer", "Car", "Amount", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKINGS.map((b, i) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-mono text-blue-400">{b.id}</td>
                <td className="px-5 py-3.5 text-sm text-white/80">{b.user}</td>
                <td className="px-5 py-3.5 text-sm text-white/70">{b.car}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-white">{formatCurrency(b.amount)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${STATUS_STYLES[b.status]}`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-white/40">{b.date}</td>
                <td className="px-5 py-3.5">
                  <button className="text-white/30 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
