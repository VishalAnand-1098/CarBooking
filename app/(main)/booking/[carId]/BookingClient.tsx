"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Lock,
  Tag,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Car } from "@/types";
import { formatCurrency } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Dates", icon: Calendar },
  { id: 2, label: "Details", icon: User },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Confirm", icon: CheckCircle2 },
];

interface Props {
  car: Car;
}

interface BookingForm {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  dropLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  promoCode: string;
  promoApplied: boolean;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

type SetBookingForm = React.Dispatch<React.SetStateAction<BookingForm>>;

export default function BookingClient({ car }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: car.location,
    dropLocation: car.location,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    promoCode: "",
    promoApplied: false,
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const days = form.pickupDate && form.returnDate
    ? Math.max(1, Math.ceil((new Date(form.returnDate).getTime() - new Date(form.pickupDate).getTime()) / 86400000))
    : 1;
  const basePrice = car.price_per_day * days;
  const insurance = Math.round(basePrice * 0.1);
  const taxes = Math.round(basePrice * 0.18);
  const discount = form.promoApplied ? Math.round(basePrice * 0.1) : 0;
  const total = basePrice + insurance + taxes - discount;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const applyPromo = () => {
    if (form.promoCode.toUpperCase() === "CARHUB10") {
      setForm({ ...form, promoApplied: true });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href={`/cars/${car.id}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to car
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-xl font-bold text-white">Book {car.name}</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <motion.div
                  animate={{
                    scale: step === s.id ? 1.1 : 1,
                    backgroundColor: step > s.id ? "#22c55e" : step === s.id ? "#3B82F6" : "rgba(255,255,255,0.08)",
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer"
                  onClick={() => step > s.id && setStep(s.id)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    step > s.id
                      ? "border-green-500/30 bg-green-500/20"
                      : step === s.id
                      ? "border-blue-500/40 bg-blue-600/80 shadow-lg shadow-blue-500/30"
                      : "border-white/[0.08] bg-white/[0.04]"
                  }`}>
                    {step > s.id ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <s.icon className={`w-4 h-4 ${step === s.id ? "text-white" : "text-white/30"}`} />
                    )}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step >= s.id ? "text-white" : "text-white/30"}`}>
                    {s.label}
                  </span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 transition-colors duration-500 ${step > s.id ? "bg-green-500/50" : "bg-white/[0.08]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="glass border border-white/[0.1] rounded-3xl p-7"
            >
              {step === 1 && <StepDates form={form} setForm={setForm} car={car} />}
              {step === 2 && <StepDetails form={form} setForm={setForm} />}
              {step === 3 && <StepPayment form={form} setForm={setForm} total={total} applyPromo={applyPromo} />}
              {step === 4 && <StepConfirmation car={car} form={form} days={days} total={total} />}

              {step < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
                  <button
                    onClick={back}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-5 py-3 text-sm text-white/60 hover:text-white glass border border-white/[0.1] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                  >
                    {step === 3 ? "Complete Booking" : "Continue"}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border border-white/[0.1] rounded-3xl p-5"
            >
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Order Summary</h3>

              <div className="flex gap-4 mb-5 pb-5 border-b border-white/[0.08]">
                <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={car.thumbnail} alt={car.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-0.5">{car.brand}</p>
                  <p className="font-bold text-white text-sm">{car.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{car.city}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: `${formatCurrency(car.price_per_day)} × ${days} day${days > 1 ? "s" : ""}`, value: basePrice },
                  { label: "Insurance", value: insurance },
                  { label: "GST (18%)", value: taxes },
                  ...(discount > 0 ? [{ label: "Promo Discount", value: -discount, highlight: true }] : []),
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className={highlight ? "text-green-400" : "text-white/50"}>{label}</span>
                    <span className={highlight ? "text-green-400 font-semibold" : "text-white font-medium"}>
                      {highlight ? `-${formatCurrency(Math.abs(value))}` : formatCurrency(value)}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between text-base font-bold pt-3 border-t border-white/[0.08]">
                  <span className="text-white">Total</span>
                  <span className="text-white text-xl">{formatCurrency(total)}</span>
                </div>
              </div>
            </motion.div>

            <div className="glass border border-green-500/20 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Secure Booking</span>
              </div>
              <p className="text-xs text-white/40">256-bit SSL encryption. Your data is always safe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDates({ form, setForm, car }: { form: BookingForm; setForm: SetBookingForm; car: Car }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Select Your Dates</h2>
      <p className="text-white/50 text-sm mb-7">Choose your rental period and locations</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Pickup Date", key: "pickupDate", type: "date" },
          { label: "Return Date", key: "returnDate", type: "date" },
          { label: "Pickup Location", key: "pickupLocation", type: "text", placeholder: car.location },
          { label: "Drop Location", key: "dropLocation", type: "text", placeholder: "Same as pickup" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all">
            <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={String(form[key as keyof BookingForm] ?? "")}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-transparent text-white text-sm focus:outline-none [color-scheme:dark] placeholder:text-white/20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepDetails({ form, setForm }: { form: BookingForm; setForm: SetBookingForm }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Personal Details</h2>
      <p className="text-white/50 text-sm mb-7">We need a few details to complete your booking</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "First Name", key: "firstName", placeholder: "John", type: "text" },
          { label: "Last Name", key: "lastName", placeholder: "Doe", type: "text" },
          { label: "Email Address", key: "email", placeholder: "john@example.com", type: "email" },
          { label: "Phone Number", key: "phone", placeholder: "+91 9876543210", type: "tel" },
          { label: "Driving License Number", key: "licenseNumber", placeholder: "DL-0420110012345", type: "text" },
        ].map(({ label, key, placeholder, type }) => (
          <div key={key} className={`bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all ${key === "licenseNumber" ? "sm:col-span-2" : ""}`}>
            <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={String(form[key as keyof BookingForm] ?? "")}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPayment({ form, setForm, total, applyPromo }: {
  form: BookingForm;
  setForm: SetBookingForm;
  total: number;
  applyPromo: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
      <p className="text-white/50 text-sm mb-7">Secure payment powered by Stripe</p>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          {["💳 Credit/Debit Card", "🏦 Net Banking", "📱 UPI"].map((m, i) => (
            <button key={m} className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${i === 0 ? "bg-blue-600/20 border-blue-500/40 text-blue-400" : "border-white/[0.08] text-white/40 hover:border-white/20"}`}>
              {m}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all">
            <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" maxLength={19}
              value={String(form.cardNumber)} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all">
              <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Expiry Date</label>
              <input type="text" placeholder="MM/YY" maxLength={5}
                value={String(form.cardExpiry)} onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all">
              <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">CVV</label>
              <input type="password" placeholder="•••" maxLength={4}
                value={String(form.cardCvv)} onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20" />
            </div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-blue-500/40 transition-all">
            <label className="text-xs text-white/40 uppercase tracking-wide block mb-1.5">Cardholder Name</label>
            <input type="text" placeholder="John Doe"
              value={String(form.cardName)} onChange={(e) => setForm({ ...form, cardName: e.target.value })}
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20" />
          </div>
        </div>
      </div>

      {/* Promo */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
        <label className="text-xs text-white/40 uppercase tracking-wide block mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Try CARHUB10"
            value={String(form.promoCode)}
            onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
            disabled={Boolean(form.promoApplied)}
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20 disabled:opacity-60"
          />
          <button
            onClick={applyPromo}
            disabled={Boolean(form.promoApplied) || !form.promoCode}
            className="px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {form.promoApplied ? "Applied ✓" : "Apply"}
          </button>
        </div>
        {form.promoApplied && <p className="text-xs text-green-400 mt-2">🎉 CARHUB10 applied! 10% discount</p>}
      </div>

      <div className="flex items-center gap-2 mt-5 p-3.5 bg-green-500/5 border border-green-500/15 rounded-xl">
        <Lock className="w-4 h-4 text-green-400 flex-shrink-0" />
        <p className="text-xs text-white/50">
          Your payment is secured with <span className="text-white/70">256-bit SSL encryption</span>. Total: <strong className="text-white">{formatCurrency(total)}</strong>
        </p>
      </div>
    </div>
  );
}

function StepConfirmation({ car, form, days, total }: { car: Car; form: BookingForm; days: number; total: number }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </motion.div>

      <h2 className="text-3xl font-extrabold text-white mb-3">Booking Confirmed! 🎉</h2>
      <p className="text-white/50 mb-2">
        Booking #{Math.random().toString(36).substr(2, 8).toUpperCase()}
      </p>
      <p className="text-white/50 mb-8">
        A confirmation has been sent to <strong className="text-white">{String(form.email) || "your email"}</strong>
      </p>

      <div className="glass border border-white/[0.1] rounded-2xl p-5 mb-8 text-left">
        <div className="flex gap-4 items-center mb-4 pb-4 border-b border-white/[0.08]">
          <div className="relative w-16 h-12 rounded-xl overflow-hidden">
            <Image src={car.thumbnail} alt={car.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-white">{car.name}</p>
            <p className="text-xs text-white/50">{days} day{days > 1 ? "s" : ""} · {car.city}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-bold text-white">{formatCurrency(total)}</p>
            <p className="text-xs text-green-400">Paid</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <p className="text-xs text-white/50">You&apos;ve earned <strong className="text-[#D4AF37]">850 reward points</strong> on this booking!</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/dashboard" className="px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-500 transition-colors">
          View My Bookings
        </Link>
        <Link href="/cars" className="px-6 py-3.5 glass border border-white/[0.1] text-white font-medium rounded-xl text-sm hover:border-white/25 transition-all">
          Browse More Cars
        </Link>
      </div>
    </div>
  );
}
