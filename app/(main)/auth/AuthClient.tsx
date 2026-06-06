"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, Car, ArrowRight } from "lucide-react";
import { Chrome } from "@/components/shared/BrandIcons";

interface Props {
  mode: "login" | "signup";
}

export default function AuthClient({ mode }: Props) {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-white">CarHub</span>
            <span className="text-gradient-blue">360</span>
          </span>
        </Link>

        <div className="glass border border-white/[0.1] rounded-3xl p-8 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-white/50 text-sm">
              {isLogin ? "Sign in to access your premium experience" : "Join 12,000+ satisfied customers"}
            </p>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 glass border border-white/[0.12] rounded-xl text-sm font-medium text-white/80 hover:text-white hover:border-white/25 transition-all mb-6">
            <Chrome className="w-4 h-4" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-white/30 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <InputField
                icon={<User className="w-4 h-4 text-white/30" />}
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
            )}
            <InputField
              icon={<Mail className="w-4 h-4 text-white/30" />}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            {!isLogin && (
              <InputField
                icon={<Phone className="w-4 h-4 text-white/30" />}
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
            )}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <Lock className="w-4 h-4 text-white/30" />
              </div>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl pl-10 pr-10 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.08] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link href={isLogin ? "/auth/signup" : "/auth/login"} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              {isLogin ? "Sign up for free" : "Sign in"}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="hover:text-white/40 transition-colors underline">Terms</Link>{" "}
          &amp;{" "}
          <Link href="/privacy" className="hover:text-white/40 transition-colors underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}

function InputField({
  icon, type, placeholder, value, onChange,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.08] transition-all"
      />
    </div>
  );
}
