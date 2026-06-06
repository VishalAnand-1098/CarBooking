"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Car,
  Fuel,
  Hotel,
  Utensils,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface TripPlan {
  recommendedCar: string;
  fuelEstimate: number;
  tollCharges: number;
  hotelBudget: number;
  foodEstimate: number;
  totalExpense: number;
  tips: string[];
}

export default function AITripPlannerSection() {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budget: "",
    travelers: "",
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TripPlan | null>(null);

  const generatePlan = async () => {
    if (!form.destination || !form.days || !form.budget) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    const days = parseInt(form.days) || 3;
    const budget = parseInt(form.budget) || 30000;
    const travelers = parseInt(form.travelers) || 2;

    const fuelEstimate = days * 800;
    const tollCharges = days * 200;
    const hotelBudget = days * Math.floor(budget * 0.04);
    const foodEstimate = days * travelers * 500;
    const totalExpense = fuelEstimate + tollCharges + hotelBudget + foodEstimate;

    setPlan({
      recommendedCar: budget > 50000 ? "BMW M4 Competition" : budget > 20000 ? "Audi Q8 Sportback" : "Hyundai Creta",
      fuelEstimate,
      tollCharges,
      hotelBudget,
      foodEstimate,
      totalExpense,
      tips: [
        `Book ${days > 5 ? "7+ days" : "3-5 days"} in advance for best rates`,
        `${form.destination} is best visited ${days > 3 ? "on weekdays" : "on weekends"}`,
        "Carry your driving license and Aadhar for verification",
      ],
    });
    setLoading(false);
  };

  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" id="ai-planner">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              AI Road Trip <br />
              <span className="text-gradient-blue">Planner</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Let our intelligent AI plan your perfect road trip. Get instant recommendations for the best car, fuel estimates, hotel budgets, and total trip cost.
            </p>

            <div className="space-y-4">
              {[
                { icon: Car, title: "Smart Car Matching", desc: "AI picks the perfect car for your trip type and budget" },
                { icon: TrendingUp, title: "Cost Optimization", desc: "Get detailed breakdown of all expenses before you book" },
                { icon: MapPin, title: "Route Intelligence", desc: "Toll estimates and fuel stops along your route" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 glass border border-white/[0.06] rounded-2xl hover:border-blue-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">{title}</h4>
                    <p className="text-xs text-white/40">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form + Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass border border-white/[0.1] rounded-3xl p-7 relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Plan My Trip</h3>
                <p className="text-xs text-white/40">AI generates your plan instantly</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { icon: MapPin, label: "Destination", key: "destination", placeholder: "e.g. Goa, Manali", type: "text" },
                { icon: Calendar, label: "Number of Days", key: "days", placeholder: "e.g. 5", type: "number" },
                { icon: DollarSign, label: "Total Budget (₹)", key: "budget", placeholder: "e.g. 50000", type: "number" },
                { icon: Users, label: "Travelers", key: "travelers", placeholder: "e.g. 2", type: "number" },
              ].map(({ icon: Icon, label, key, placeholder, type }) => (
                <div key={key} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                    <label className="text-xs text-white/40 uppercase tracking-wide">{label}</label>
                  </div>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <motion.button
              onClick={generatePlan}
              disabled={loading || !form.destination}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-5"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Generating Plan...</>
              ) : (
                <><Sparkles className="w-5 h-5" />Generate AI Trip Plan</>
              )}
            </motion.button>

            {/* AI Result */}
            <AnimatePresence>
              {plan && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-blue-600/10 to-blue-900/10 border border-blue-500/20 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">AI Trip Summary</span>
                    </div>

                    <div className="mb-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-xs text-blue-300 mb-0.5">Recommended Car</p>
                      <p className="text-white font-bold">{plan.recommendedCar}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { icon: Fuel, label: "Fuel", value: formatCurrency(plan.fuelEstimate) },
                        { icon: TrendingUp, label: "Tolls", value: formatCurrency(plan.tollCharges) },
                        { icon: Hotel, label: "Hotel", value: formatCurrency(plan.hotelBudget) },
                        { icon: Utensils, label: "Food", value: formatCurrency(plan.foodEstimate) },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-white/40" />
                          <div>
                            <p className="text-xs text-white/40">{label}</p>
                            <p className="text-sm font-semibold text-white">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-blue-500/20 pt-4 flex items-center justify-between mb-4">
                      <span className="text-sm text-white/60">Total Estimate</span>
                      <span className="text-xl font-extrabold text-white">{formatCurrency(plan.totalExpense)}</span>
                    </div>

                    <div className="space-y-2">
                      {plan.tips.map((tip, i) => (
                        <p key={i} className="text-xs text-white/50 flex gap-2">
                          <span className="text-blue-400">•</span>{tip}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
