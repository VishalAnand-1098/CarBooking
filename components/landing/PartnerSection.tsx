"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Shield, Users, IndianRupee } from "lucide-react";

const BENEFITS = [
  { icon: IndianRupee, title: "Zero Joining Fee", desc: "List your car for free. We only earn when you earn." },
  { icon: Shield, title: "Secure Payments", desc: "100% secure, on-time payments directly to your account." },
  { icon: Users, title: "Verified Customers", desc: "Every renter is KYC verified with photo ID and license." },
  { icon: TrendingUp, title: "Full Insurance Support", desc: "Complete insurance coverage for all trips on our platform." },
];

export default function PartnerSection() {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" id="partner">
      {/* Gold ambient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto">
        <div className="glass border border-white/[0.08] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] lg:h-auto min-h-[400px] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
                alt="Luxury SUV"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/80" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 glass border border-white/[0.12] rounded-2xl p-4"
              >
                <p className="text-xs text-white/50 mb-1">Average Monthly Earnings</p>
                <p className="text-3xl font-extrabold text-gradient-gold">₹85,000</p>
                <p className="text-xs text-green-400 mt-1">↑ 23% from last year</p>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6 w-fit">
                For Car Owners
              </div>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                Earn Money With <br />
                <span className="text-gradient-gold">Your Car</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Turn your vehicle into a passive income asset. Join 5,000+ car owners already earning with CarHub360. List once, earn every day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-[#D4AF37]/20 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">{title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/partner"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F8E7A1] text-black font-bold rounded-2xl text-base w-fit hover:opacity-90 transition-opacity shadow-xl shadow-[#D4AF37]/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                List Your Car — It&apos;s Free
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
