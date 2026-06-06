"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, Rocket, Heart, Globe, ArrowRight } from "lucide-react";
import { STATS } from "@/lib/data";

const VALUES = [
  { icon: Target, title: "Our Mission", desc: "To make premium mobility accessible to everyone, everywhere — turning every journey into an experience worth remembering." },
  { icon: Rocket, title: "Our Vision", desc: "To become the world's most trusted luxury mobility platform, redefining how people experience cars." },
  { icon: Heart, title: "Our Values", desc: "Obsessive customer focus, radical transparency, and an unwavering commitment to quality in everything we do." },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="px-6 lg:px-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">About CarHub360</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Redefining <span className="text-gradient-blue">Luxury Mobility</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Founded in 2025, CarHub360 was born from a simple belief: everyone deserves to drive their dream car. Today, we&apos;re India&apos;s fastest-growing premium car rental marketplace, connecting thousands of customers with the world&apos;s finest vehicles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 lg:px-12 mb-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass border border-white/[0.08] rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-gradient-blue mb-1">
                {stat.decimal ? stat.value.toFixed(1) : stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 lg:px-12 mb-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass border border-white/[0.08] rounded-2xl p-7 hover:border-blue-500/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass border border-white/[0.1] rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Ready to drive your dream?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Join thousands of satisfied customers and experience luxury mobility like never before.
              </p>
              <Link href="/cars" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
                Explore Cars
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
