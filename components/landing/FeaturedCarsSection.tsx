"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import CarCard from "@/components/cars/CarCard";
import { FEATURED_CARS } from "@/lib/data";

const FILTERS = ["All", "Luxury", "Sports", "Electric", "SUV", "Premium"];

export default function FeaturedCarsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? FEATURED_CARS
      : FEATURED_CARS.filter(
          (c) => c.category.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section className="py-24 px-6 lg:px-12" id="featured-cars">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Featured Fleet
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Premium Cars <br />
              <span className="text-gradient-blue">Ready to Drive</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 flex-wrap"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "glass border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/cars"
            className="inline-flex items-center gap-2.5 px-8 py-4 glass border border-white/[0.1] hover:border-blue-500/40 text-white font-semibold rounded-2xl text-base hover:text-blue-400 transition-all duration-300 group"
          >
            <SlidersHorizontal className="w-4 h-4" />
            View All Cars
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
