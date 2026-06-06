"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car, IndianRupee, Shield, Users, TrendingUp,
  CheckCircle2, ChevronRight, Star, ArrowRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const HOW_IT_WORKS = [
  { step: "01", title: "List Your Car", desc: "Fill out a simple form with your car details, photos, and pricing.", icon: Car },
  { step: "02", title: "Get Verified", desc: "Our team verifies your car with a quick inspection within 24 hours.", icon: CheckCircle2 },
  { step: "03", title: "Start Earning", desc: "Accept booking requests and start earning from day one.", icon: IndianRupee },
];

const STATS = [
  { value: "₹85,000", label: "Average monthly earnings" },
  { value: "5,000+", label: "Partner car owners" },
  { value: "95%", label: "Partner satisfaction rate" },
  { value: "24h", label: "Average approval time" },
];

export default function PartnerPageClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", carModel: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
                <TrendingUp className="w-3.5 h-3.5" />
                Partner Program
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Turn Your Car Into a <span className="text-gradient-gold">Revenue Machine</span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Join India&apos;s fastest-growing car rental marketplace. List your vehicle and earn ₹50,000–₹1,50,000 per month with zero effort.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="glass border border-white/[0.08] rounded-xl p-4">
                    <p className="text-2xl font-extrabold text-gradient-gold">{value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F8E7A1] text-black font-bold rounded-2xl text-sm shadow-xl shadow-[#D4AF37]/20 hover:opacity-90 transition-opacity"
                >
                  List Your Car Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="relative h-[420px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
                  alt="Partner car"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Floating card */}
                <div className="absolute bottom-6 left-6 glass border border-white/[0.12] rounded-2xl p-4">
                  <p className="text-xs text-white/50 mb-1">Rahul earns every month</p>
                  <p className="text-2xl font-extrabold text-gradient-gold">₹1,12,000</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-transparent via-[#111827]/30 to-transparent">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">How It Works</h2>
            <p className="text-white/50">Get started in under 5 minutes</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass border border-white/[0.08] rounded-2xl p-7 text-center relative hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F8E7A1] text-black text-xs font-bold rounded-full">
                  Step {step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-5 mt-2">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="partner-form" className="py-20 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-white mb-3">Start Earning Today</h2>
              <p className="text-white/50">Fill in your details and we&apos;ll get back to you within 24 hours</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass border border-green-500/30 rounded-3xl p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                <p className="text-white/50">We&apos;ll contact you at {form.email} within 24 hours.</p>
              </motion.div>
            ) : (
              <div className="glass border border-white/[0.1] rounded-3xl p-8">
                <div className="space-y-4">
                  {[
                    { label: "Full Name", key: "name", placeholder: "Your full name", type: "text" },
                    { label: "Email Address", key: "email", placeholder: "you@example.com", type: "email" },
                    { label: "Phone Number", key: "phone", placeholder: "+91 98765 43210", type: "tel" },
                    { label: "Car Model", key: "carModel", placeholder: "e.g. Hyundai Creta 2023", type: "text" },
                    { label: "City", key: "city", placeholder: "Mumbai, Delhi, Bangalore...", type: "text" },
                  ].map(({ label, key, placeholder, type }) => (
                    <div key={key} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 focus-within:border-[#D4AF37]/30 transition-colors">
                      <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                      />
                    </div>
                  ))}

                  <motion.button
                    onClick={() => setSubmitted(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F8E7A1] text-black font-bold rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20"
                  >
                    Submit Application — It&apos;s Free
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>

                  <p className="text-center text-xs text-white/30">
                    No credit card needed. Zero joining fee. Cancel anytime.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
