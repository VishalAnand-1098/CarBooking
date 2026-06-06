"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Search,
  Grid3X3,
  List,
  X,
  ChevronDown,
} from "lucide-react";
import CarCard from "@/components/cars/CarCard";
import { FEATURED_CARS } from "@/lib/data";

const CATEGORIES = ["All", "Economy", "Premium", "Luxury", "SUV", "Sports", "Electric"];
const FUEL_TYPES = ["All", "Petrol", "Diesel", "Electric", "Hybrid"];
const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

export default function CarsPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sort, setSort] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let cars = [...FEATURED_CARS];

    if (search) {
      const s = search.toLowerCase();
      cars = cars.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.brand.toLowerCase().includes(s) ||
          c.city.toLowerCase().includes(s)
      );
    }

    if (category !== "All") {
      cars = cars.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (fuelType !== "All") {
      cars = cars.filter((c) => c.fuel_type.toLowerCase() === fuelType.toLowerCase());
    }

    cars = cars.filter((c) => c.price_per_day <= maxPrice);

    switch (sort) {
      case "price_asc": cars.sort((a, b) => a.price_per_day - b.price_per_day); break;
      case "price_desc": cars.sort((a, b) => b.price_per_day - a.price_per_day); break;
      case "rating": cars.sort((a, b) => b.rating - a.rating); break;
      case "reviews": cars.sort((a, b) => b.review_count - a.review_count); break;
    }

    return cars;
  }, [search, category, fuelType, maxPrice, sort]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Our Fleet
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Find Your Perfect Car
          </h1>
          <p className="text-white/50 text-lg">
            {filtered.length} cars available across 100+ cities
          </p>
        </motion.div>

        {/* Search + Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by car name, brand, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.08] transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white/[0.06] border border-white/[0.08] rounded-xl pl-4 pr-10 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#111827]">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-5 py-3.5 glass border border-white/[0.1] rounded-xl text-sm font-medium text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {filtersOpen && <X className="w-3.5 h-3.5 ml-1" />}
          </button>

          {/* View Mode */}
          <div className="flex glass border border-white/[0.08] rounded-xl overflow-hidden">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-3.5 transition-all ${
                  viewMode === mode
                    ? "bg-blue-600 text-white"
                    : "text-white/40 hover:text-white"
                }`}
                aria-label={`${mode} view`}
              >
                {mode === "grid" ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filters Panel */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 glass border border-white/[0.1] rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        category === c
                          ? "bg-blue-600 text-white"
                          : "bg-white/[0.05] text-white/60 hover:text-white border border-white/[0.08]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 block">
                  Fuel Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {FUEL_TYPES.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFuelType(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        fuelType === f
                          ? "bg-blue-600 text-white"
                          : "bg-white/[0.05] text-white/60 hover:text-white border border-white/[0.08]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 block">
                  Max Price: ₹{maxPrice.toLocaleString()}/day
                </label>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {(category !== "All" || fuelType !== "All" || search) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-white/40">Active filters:</span>
            {(
              [
                category !== "All" ? { label: category, clear: () => setCategory("All") } : null,
                fuelType !== "All" ? { label: fuelType, clear: () => setFuelType("All") } : null,
                search ? { label: `"${search}"`, clear: () => setSearch("") } : null,
              ].filter(Boolean) as { label: string; clear: () => void }[]
            ).map((tag) => (
              <button
                key={tag.label}
                onClick={tag.clear}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/25 transition-colors"
              >
                {tag.label}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={() => { setCategory("All"); setFuelType("All"); setSearch(""); }}
              className="text-xs text-white/30 hover:text-white/60 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Cars Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-white mb-2">No cars found</h3>
            <p className="text-white/40">Try adjusting your filters</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
