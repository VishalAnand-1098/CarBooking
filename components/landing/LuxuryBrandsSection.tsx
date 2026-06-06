"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_BRANDS } from "@/lib/data";

export default function LuxuryBrandsSection() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111827]/50 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
            Luxury Collection
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            The World&apos;s Most{" "}
            <span className="text-gradient-gold">Iconic Brands</span>
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
            Experience automotive legends from the world&apos;s most prestigious manufacturers.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {LUXURY_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <Link
                href={`/cars?brand=${brand.name.toLowerCase()}`}
                className="flex flex-col items-center gap-3 p-5 glass border border-white/[0.08] rounded-2xl hover:border-[#D4AF37]/30 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {brand.logo}
                </div>
                <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors text-center leading-tight">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 glass border border-[#D4AF37]/20 rounded-3xl p-8 lg:p-10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Certified Luxury. <span className="text-gradient-gold">Zero Compromise.</span>
              </h3>
              <p className="text-white/50 leading-relaxed">
                Every luxury vehicle on CarHub360 undergoes rigorous 200-point inspection, ensuring you receive nothing short of perfection. From Lamborghini to Rolls-Royce, your dream ride awaits.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                "✓ 200-Point Vehicle Inspection",
                "✓ Professional Chauffeur Option",
                "✓ Same-Day Delivery Available",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-[#D4AF37]">{item.charAt(0)}</span>
                  <span>{item.slice(2)}</span>
                </div>
              ))}
              <Link
                href="/cars?category=luxury"
                className="mt-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F8E7A1] text-black font-semibold rounded-xl text-sm text-center hover:opacity-90 transition-opacity shadow-lg shadow-[#D4AF37]/20"
              >
                Explore Luxury Fleet
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
