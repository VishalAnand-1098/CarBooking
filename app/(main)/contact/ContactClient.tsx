"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@carhub360.com", sub: "We reply within 2 hours" },
  { icon: Phone, label: "Phone", value: "+91 1800 360 360", sub: "24/7 customer support" },
  { icon: MapPin, label: "Office", value: "Bandra Kurla Complex, Mumbai", sub: "Maharashtra, India 400051" },
  { icon: Clock, label: "Hours", value: "Always Open", sub: "365 days a year" },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            We&apos;d Love to <span className="text-gradient-blue">Hear From You</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Have a question or need help? Our team is available around the clock.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass border border-white/[0.08] rounded-2xl p-5 flex gap-4 hover:border-blue-500/20 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{label}</p>
                  <p className="font-semibold text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass border border-white/[0.1] rounded-3xl p-8"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50">We&apos;ll get back to you at {form.email} shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">Send us a message</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Name", key: "name", placeholder: "Your name", type: "text" },
                      { label: "Email", key: "email", placeholder: "you@example.com", type: "email" },
                    ].map(({ label, key, placeholder, type }) => (
                      <div key={key} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
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
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
                    <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                    />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-colors">
                    <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20 resize-none"
                    />
                  </div>
                  <motion.button
                    onClick={() => setSent(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
