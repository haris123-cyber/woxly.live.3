"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Check,
  Calendar,
  FileText,
  Package,
  Truck,
  Home,
  ChevronRight,
  Copy,
  Clock,
  MapPin,
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatShortDate(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const PARTICLES = [
  { color: "bg-green-400", size: "w-2 h-2", pos: "-top-4 left-4", shape: "rounded-sm", x: 3, y: -4, duration: 3.6, rotate: 45 },
  { color: "bg-blue-300", size: "w-1.5 h-1.5", pos: "top-2 -left-6", shape: "rounded-full", x: -2, y: -3, duration: 4.0, rotate: 0 },
  { color: "bg-yellow-400", size: "w-1.5 h-1.5", pos: "top-8 -left-2", shape: "rounded-full", x: 2, y: 3, duration: 3.4, rotate: 0 },
  { color: "bg-blue-400", size: "w-1 h-1", pos: "bottom-0 left-4", shape: "rounded-full", x: -2, y: 3, duration: 4.2, rotate: 0 },
  { color: "bg-green-400", size: "w-1.5 h-1.5", pos: "-top-6 right-6", shape: "rounded-full", x: 3, y: -3, duration: 3.8, rotate: 0 },
  { color: "bg-yellow-300", size: "w-1.5 h-1.5", pos: "top-0 right-16", shape: "rounded-full", x: -3, y: -2, duration: 4.1, rotate: 0 },
  { color: "bg-blue-300", size: "w-2 h-2", pos: "top-6 -right-4", shape: "rounded-full", x: 2, y: 3, duration: 3.7, rotate: 0 },
  { color: "bg-yellow-400", size: "w-2 h-2", pos: "top-14 right-8", shape: "rounded-sm", x: -2, y: 3, duration: 4.0, rotate: -12 },
];

const STEPS = [
  { key: "placed", label: "Placed", icon: Check },
  { key: "confirmed", label: "Confirmed", icon: Truck },
  { key: "shipped", label: "Shipped", icon: Package },
  { key: "delivered", label: "Delivered", icon: Home },
] as const;

export default function OrderSuccessPage() {
  const { id } = useParams();
  const orderId = String(id || "WOXLY-310758");
  const [copied, setCopied] = useState(false);

  const { orderDate, deliveryDate, daysLeft, currentStep } = useMemo(() => {
    const placed = new Date();
    const delivery = new Date(placed);
    delivery.setDate(placed.getDate() + 3);
    const diff = Math.max(0, Math.ceil((delivery.getTime() - placed.getTime()) / (1000 * 60 * 60 * 24)));
    return {
      orderDate: placed,
      deliveryDate: delivery,
      daysLeft: diff,
      currentStep: 1,
    };
  }, []);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      toast.success("Order number copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy order number");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center relative z-10 shadow-sm border border-green-100"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-green-500 shadow-sm">
                <Check className="w-6 h-6 text-green-500 stroke-[3]" />
              </div>
            </motion.div>
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0, rotate: p.rotate }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.85, 1, 0.85],
                  x: [0, p.x, 0],
                  y: [0, p.y, 0],
                  rotate: p.rotate,
                }}
                transition={{
                  duration: p.duration,
                  delay: 0.2 + i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${p.pos} ${p.size} ${p.color} ${p.shape}`}
              />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-[15px] text-gray-500 max-w-sm leading-relaxed">
            A confirmation email has been sent to you.
          </p>
        </div>

        <div className="bg-white rounded-sm shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-gray-100 p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#e8f8ee] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#16a34a]" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5">Order Number</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] sm:text-[15px] font-bold text-gray-900 truncate">{orderId}</p>
                  <button
                    type="button"
                    onClick={copyOrderId}
                    aria-label="Copy order number"
                    className="text-gray-400 hover:text-gray-600 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copied ? <p className="text-[10px] text-green-600">Copied</p> : null}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#eee8ff] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#7c3aed]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5">Date</p>
                <p className="text-[13px] sm:text-[15px] font-bold text-gray-900">{formatShortDate(orderDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-sm bg-[#f3eefe] px-3.5 sm:px-4 py-3.5 sm:py-4 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-[#e7dcff] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#7c3aed]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs text-gray-500 mb-0.5">Estimated Delivery</p>
              <p className="text-[14px] sm:text-[16px] font-bold text-[#7c3aed] leading-tight">
                {formatLongDate(deliveryDate)}
              </p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#c4b5fd] bg-white/70 px-2.5 sm:px-3 py-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7c3aed]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#7c3aed] whitespace-nowrap">
                {daysLeft} {daysLeft === 1 ? "Day" : "Days"} Left
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-[16px] sm:text-[17px] font-bold text-gray-900">Order Status</h2>
            <Link
              href={`/track-order?id=${orderId}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#86efac] bg-white px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold text-[#16a34a] hover:bg-green-50 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Track Order
            </Link>
          </div>

          <div className="rounded-sm border border-gray-200 bg-white px-2 sm:px-6 py-5 sm:py-6">
            <div className="relative">
              <div className="absolute top-5 left-[12%] right-[12%] h-[2px] flex">
                {STEPS.slice(0, -1).map((step, index) => (
                  <div
                    key={step.key}
                    className="flex-1"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 5px, transparent 5px, transparent 10px)",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 grid grid-cols-4">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const completed = index < currentStep;
                  const active = index === currentStep;
                  const upcoming = index > currentStep;

                  return (
                    <div key={step.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${completed
                          ? "bg-[#22c55e] text-white"
                          : active
                            ? "bg-white text-gray-400 shadow-[0_6px_16px_rgba(124,58,237,0.28)]"
                            : "bg-white border-[1.5px] border-gray-200 text-gray-400"
                          }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={active || completed ? 2.4 : 2} />
                      </div>
                      <p
                        className={`mt-2.5 text-[12px] sm:text-[13px] font-bold ${completed ? "text-[#16a34a]" : "text-gray-500"
                          }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                        {upcoming ? "Upcoming" : formatShortDate(orderDate)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f9f3] rounded-2xl p-5 mt-5 mb-6 flex items-center gap-4 relative overflow-hidden border border-green-50">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <IconBrandWhatsapp className="w-7 h-7 text-green-600" />
          </div>
          <div className="flex flex-col z-10 min-w-0">
            <h3 className="text-[14px] font-bold text-gray-900 mb-1">Need help with your order?</h3>
            <p className="text-[12px] text-gray-600 mb-2 leading-relaxed max-w-[220px]">
              Chat with us on WhatsApp for any questions or support.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="text-[12px] font-bold text-green-600 flex items-center gap-1 hover:underline"
            >
              Chat on WhatsApp <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <Link
          href="/shop"
          className="w-full max-w-xs mx-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-bold h-12 rounded-xl flex items-center justify-center transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
