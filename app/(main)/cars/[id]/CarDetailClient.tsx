"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Fuel,
  Settings2,
  Users,
  Gauge,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Car } from "@/types";
import { formatCurrency } from "@/lib/utils";
import CarCard from "@/components/cars/CarCard";

interface Props {
  car: Car;
  similarCars: Car[];
}

export default function CarDetailClient({ car, similarCars }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const days =
    pickupDate && returnDate
      ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000))
      : 1;
  const basePrice = car.price_per_day * days;
  const insurance = Math.round(basePrice * 0.1);
  const taxes = Math.round(basePrice * 0.18);
  const total = basePrice + insurance + taxes;

  const images = car.images.length > 0 ? car.images : [car.thumbnail];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cars" className="hover:text-white transition-colors">Cars</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/70">{car.name}</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative h-[360px] lg:h-[480px] rounded-3xl overflow-hidden glass border border-white/[0.08]">
                <Image
                  src={images[currentImage]}
                  alt={car.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((i) => (i + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="w-10 h-10 rounded-xl glass border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${liked ? "text-red-400 fill-red-400" : "text-white"}`} />
                  </button>
                  <button className="w-10 h-10 rounded-xl glass border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all" aria-label="Share">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        i === currentImage ? "border-blue-500 scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Car Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass border border-white/[0.08] rounded-3xl p-7"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-1">{car.brand}</p>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{car.name}</h1>
                </div>
                <div className="flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl px-3 py-2 flex-shrink-0">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="font-bold text-white">{car.rating}</span>
                  <span className="text-xs text-white/40">({car.review_count})</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
                <MapPin className="w-4 h-4" />
                <span>{car.location}</span>
              </div>

              <p className="text-white/60 leading-relaxed mb-7">{car.description}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Fuel, label: "Fuel", value: car.fuel_type },
                  { icon: Settings2, label: "Transmission", value: car.transmission },
                  { icon: Users, label: "Seats", value: `${car.seats} Persons` },
                  { icon: Gauge, label: "Top Speed", value: car.top_speed },
                  { icon: Zap, label: "Engine", value: car.engine },
                  { icon: Gauge, label: "Power", value: car.horsepower },
                  { icon: Fuel, label: "Mileage", value: car.mileage },
                  { icon: Calendar, label: "Year", value: String(car.year) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-white/40">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white capitalize">{value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300">
                      <CheckCircle2 className="w-3 h-3" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Insurance Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass border border-white/[0.08] rounded-3xl p-7"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Insurance & Policies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Comprehensive Insurance", desc: "Full coverage including third-party liability and own damage" },
                  { title: "Security Deposit", desc: `₹${car.security_deposit.toLocaleString()} (refundable within 3 business days)` },
                  { title: "Minimum Booking", desc: `${car.min_booking_days} day${car.min_booking_days > 1 ? "s" : ""} minimum rental period` },
                  { title: "24/7 Roadside Assistance", desc: "Emergency support available across all covered cities" },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Sticky Booking Panel */}
          <div className="xl:relative">
            <div className="xl:sticky xl:top-28 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass border border-white/[0.1] rounded-3xl p-6"
              >
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-extrabold text-white">{formatCurrency(car.price_per_day)}</span>
                  <span className="text-white/40 text-sm">/day</span>
                </div>

                {/* Date pickers */}
                <div className="space-y-3 mb-5">
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
                    <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Pickup Date</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent text-white text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
                    <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Return Date</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent text-white text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                {pickupDate && returnDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-5 space-y-2.5 border-t border-white/[0.08] pt-4"
                  >
                    {[
                      { label: `${formatCurrency(car.price_per_day)} × ${days} day${days > 1 ? "s" : ""}`, value: basePrice },
                      { label: "Insurance (10%)", value: insurance },
                      { label: "GST (18%)", value: taxes },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-white/50">{label}</span>
                        <span className="text-white font-medium">{formatCurrency(value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-white/[0.08]">
                      <span className="text-white">Total</span>
                      <span className="text-white">{formatCurrency(total)}</span>
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                <Link
                  href={`/booking/${car.id}${pickupDate ? `?from=${pickupDate}&to=${returnDate}` : ""}`}
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-center rounded-2xl text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-500 hover:to-blue-400 transition-all pulse-glow"
                >
                  Book Now
                </Link>

                <p className="text-center text-xs text-white/30 mt-3">
                  No charges until booking is confirmed
                </p>
              </motion.div>

              {/* Trust Badges */}
              <div className="glass border border-white/[0.06] rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: "🛡️", label: "Insured" },
                    { icon: "✅", label: "Verified" },
                    { icon: "⚡", label: "Instant" },
                  ].map(({ icon, label }) => (
                    <div key={label}>
                      <p className="text-xl mb-1">{icon}</p>
                      <p className="text-xs text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Similar Cars</h2>
              <Link href="/cars" className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarCars.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
