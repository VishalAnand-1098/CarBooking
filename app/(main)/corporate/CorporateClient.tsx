"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, Users, Receipt, Headphones, ShieldCheck,
  CalendarClock, ArrowRight, CheckCircle2,
} from "lucide-react";

const FEATURES = [
  { icon: Receipt, title: "Consolidated Billing", desc: "Single monthly invoice for all your company's rentals with GST compliance." },
  { icon: Users, title: "Multi-User Accounts", desc: "Add unlimited employees with role-based access and spending limits." },
  { icon: Headphones, title: "Dedicated Manager", desc: "A personal account manager available 24/7 for all your fleet needs." },
  { icon: ShieldCheck, title: "Priority Insurance", desc: "Enhanced coverage and zero-liability protection on every corporate trip." },
  { icon: CalendarClock, title: "Flexible Subscriptions", desc: "Daily, weekly, monthly, or annual plans tailored to your business." },
  { icon: Building2, title: "Branded Experience", desc: "Custom-branded vehicles and chauffeur services for executive travel." },
];

const PLANS = [
  { name: "Startup", price: "₹49,000", period: "/month", features: ["Up to 5 vehicles", "Consolidated billing", "Email support", "Standard insurance"], featured: false },
  { name: "Business", price: "₹1,49,000", period: "/month", features: ["Up to 20 vehicles", "Dedicated manager", "Priority 24/7 support", "Enhanced insurance", "Custom branding"], featured: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited vehicles", "Multiple managers", "SLA guarantee", "Full insurance suite", "API integration", "White-glove service"], featured: false },
];

export default function CorporateClient() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="px-6 lg:px-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Building2 className="w-3.5 h-3.5" />
              For Businesses
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Corporate Fleet Solutions for <span className="text-gradient-blue">Modern Teams</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Power your business travel with India&apos;s most premium mobility platform. Flexible plans, transparent billing, and white-glove service for companies of every size.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
                Talk to Sales
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cars" className="inline-flex items-center gap-2 px-7 py-4 glass border border-white/[0.1] text-white font-medium rounded-2xl hover:border-white/25 transition-all">
                View Fleet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-12 mb-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass border border-white/[0.08] rounded-2xl p-6 hover:border-blue-500/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600/15 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Plans That Scale With You</h2>
            <p className="text-white/50">Transparent pricing. No hidden fees. Cancel anytime.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative rounded-3xl p-7 border transition-all ${
                  plan.featured
                    ? "glass border-blue-500/40 shadow-2xl shadow-blue-500/10 scale-[1.03]"
                    : "glass border-white/[0.08]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm text-white/40">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      : "glass border border-white/[0.12] text-white hover:border-white/25"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
