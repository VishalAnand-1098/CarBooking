"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "Best car for a road trip?",
  "What's included in insurance?",
  "How does booking work?",
  "Luxury cars under ₹15K/day?",
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "I'd be happy to help! You can ask me about car suggestions, booking process, pricing, insurance, or trip planning. What would you like to know?",
  road: "For road trips, I recommend the **BMW M4 Competition** (₹8,500/day) for sports feel, or **Range Rover Autobiography** (₹18,000/day) for luxury and comfort. Both include full insurance and GPS navigation!",
  insurance:
    "All CarHub360 bookings include **comprehensive insurance** covering third-party liability, own damage, and personal accident cover. There's also an optional zero-depreciation add-on for complete peace of mind.",
  booking:
    "Booking is simple! 1) Search your city & dates, 2) Pick your dream car, 3) Complete payment securely, 4) Get confirmation instantly. The car is delivered to your doorstep!",
  luxury:
    "Our luxury cars under ₹15K/day include: **Audi Q8 Sportback** (₹11K), **Mercedes GLE** (₹12K), and **Range Rover Sport** (₹14K). All fully insured with 24/7 roadside assistance!",
};

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hi! I'm **CarHub AI**, your personal car rental assistant. 🚗 How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("road") || lower.includes("trip")) return BOT_RESPONSES.road;
    if (lower.includes("insurance")) return BOT_RESPONSES.insurance;
    if (lower.includes("book") || lower.includes("how")) return BOT_RESPONSES.booking;
    if (lower.includes("luxury") || lower.includes("15k") || lower.includes("₹15")) return BOT_RESPONSES.luxury;
    return BOT_RESPONSES.default;
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    const response = getResponse(msg);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: "assistant", content: response },
    ]);
    setTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-shadow ${open ? "hidden" : "flex"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-full h-full rounded-full bg-blue-500/40"
        />
        <MessageCircle className="w-6 h-6 text-white relative z-10" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0B0F19]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] glass-dark border border-white/[0.12] rounded-3xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">CarHub AI</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-green-400">Always available</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-blue-600"
                        : "bg-white/[0.1]"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-white/[0.07] text-white/90 rounded-tl-sm"
                        : "bg-blue-600/80 text-white rounded-tr-sm"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </div>
              ))}

              {typing && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/[0.07] rounded-2xl rounded-tl-sm px-3.5 py-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-white/40 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs hover:bg-blue-500/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/[0.08]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask anything about cars..."
                  className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-blue-500/40"
                />
                <motion.button
                  onClick={() => sendMessage()}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
