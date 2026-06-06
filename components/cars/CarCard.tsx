"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Fuel,
  Users,
  Settings2,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Car } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  index?: number;
}

const CATEGORY_BADGE: Record<string, { label: string; color: string }> = {
  economy: { label: "Economy", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  premium: { label: "Premium", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  luxury: { label: "Luxury", color: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30" },
  suv: { label: "SUV", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  sports: { label: "Sports", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  electric: { label: "Electric", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
};

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const [liked, setLiked] = useState(false);
  const badge = CATEGORY_BADGE[car.category] || CATEGORY_BADGE.premium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass border border-white/[0.08] rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 premium-card hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
        <Image
          src={car.thumbnail}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badge.color} backdrop-blur-sm`}>
          {badge.label}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? "text-red-400 fill-red-400" : "text-white/70"}`}
          />
        </button>

        {/* Electric badge */}
        {car.fuel_type === "electric" && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-medium">{car.mileage}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {car.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-sm font-semibold text-white">{car.rating}</span>
            <span className="text-xs text-white/30">({car.review_count})</span>
          </div>
        </div>

        {/* Car Name */}
        <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
          {car.name}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Fuel className="w-3.5 h-3.5" />
            <span className="capitalize">{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Settings2 className="w-3.5 h-3.5" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Users className="w-3.5 h-3.5" />
            <span>{car.seats} Seats</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-white">
              {formatCurrency(car.price_per_day)}
            </span>
            <span className="text-xs text-white/40 ml-1">/day</span>
          </div>
          <Link
            href={`/cars/${car.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300 group/btn"
          >
            View
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
