"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Car,
  DollarSign,
  Search,
  ChevronDown,
} from "lucide-react";

const CAR_TYPES = [
  "All Types",
  "Economy",
  "Premium",
  "Luxury",
  "SUV",
  "Sports",
  "Electric",
];

export default function BookingWidget() {
  const router = useRouter();
  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    pickupDate: "",
    returnDate: "",
    carType: "All Types",
    minBudget: 0,
    maxBudget: 50000,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (form.pickup) params.set("pickup", form.pickup);
    if (form.drop) params.set("drop", form.drop);
    if (form.pickupDate) params.set("from", form.pickupDate);
    if (form.returnDate) params.set("to", form.returnDate);
    if (form.carType !== "All Types") params.set("type", form.carType.toLowerCase());
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-12 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass border border-white/[0.1] rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/40"
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white/[0.04] rounded-xl p-1 w-fit">
            {["Self Drive", "With Driver", "Airport Transfer"].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {/* Pickup Location */}
            <WidgetField
              icon={<MapPin className="w-4 h-4 text-blue-400" />}
              label="Pickup Location"
            >
              <input
                type="text"
                placeholder="City, airport, or address"
                value={form.pickup}
                onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                className="w-full bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
              />
            </WidgetField>

            {/* Drop Location */}
            <WidgetField
              icon={<MapPin className="w-4 h-4 text-[#D4AF37]" />}
              label="Drop Location"
            >
              <input
                type="text"
                placeholder="Same as pickup or different"
                value={form.drop}
                onChange={(e) => setForm({ ...form, drop: e.target.value })}
                className="w-full bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
              />
            </WidgetField>

            {/* Car Type */}
            <WidgetField
              icon={<Car className="w-4 h-4 text-blue-400" />}
              label="Car Type"
            >
              <div className="relative">
                <select
                  value={form.carType}
                  onChange={(e) => setForm({ ...form, carType: e.target.value })}
                  className="w-full bg-transparent text-white text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  {CAR_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#111827] text-white">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </WidgetField>

            {/* Pickup Date */}
            <WidgetField
              icon={<Calendar className="w-4 h-4 text-blue-400" />}
              label="Pickup Date"
            >
              <input
                type="date"
                value={form.pickupDate}
                onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent text-white text-sm focus:outline-none [color-scheme:dark]"
              />
            </WidgetField>

            {/* Return Date */}
            <WidgetField
              icon={<Calendar className="w-4 h-4 text-[#D4AF37]" />}
              label="Return Date"
            >
              <input
                type="date"
                value={form.returnDate}
                onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                min={form.pickupDate || new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent text-white text-sm focus:outline-none [color-scheme:dark]"
              />
            </WidgetField>

            {/* Budget */}
            <WidgetField
              icon={<DollarSign className="w-4 h-4 text-blue-400" />}
              label={`Budget: ₹${form.maxBudget.toLocaleString()}/day`}
            >
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={form.maxBudget}
                onChange={(e) => setForm({ ...form, maxBudget: Number(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </WidgetField>
          </div>

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow pulse-glow"
          >
            <Search className="w-5 h-5" />
            Search Available Cars
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function WidgetField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 hover:border-white/[0.16] hover:bg-white/[0.06] transition-all duration-200">
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <label className="text-xs font-medium text-white/40 uppercase tracking-wide">
          {label}
        </label>
      </div>
      {children}
    </div>
  );
}
