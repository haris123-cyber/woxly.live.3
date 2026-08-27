"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const contactItems = [
  {
    icon: MapPin,
    label: "Our Location",
    value: (
      <>
        1st Floor, M K Tower, Near Al Thaamar, Thiruvannur, Kozhikode
        <br />
        673029, (H) No: 27, Near Liwa, Yashoda Nagar Bangalore,
        <br />
        Karnataka - 560064
        <br />
        Kozhikode, Kozhikode, IN
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: "+917012802594",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "info@woxly.in",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Mon–Sun, 9:00 AM – 9:00 PM",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f4f3fc] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-2">
          Contact Us
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Get In Touch With Us
            </h1>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-sm">
              Reach out anytime — whether you have a question, feedback, or just
              want to say hello. We&apos;re always here to help.
            </p>

            <div className="flex flex-col gap-5">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px] mb-0.5">
                      {label}
                    </p>
                    <p className="text-gray-500 text-[14px] leading-relaxed">
                      {value}
                    </p>
                  </div>
                </div>
              ))}

              {/* WhatsApp row */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <IconBrandWhatsapp
                    className="w-5 h-5 text-[#25D366]"
                    stroke={2}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[15px] mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-gray-500 text-[14px]">+917306347297</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: form card ── */}
          <div className="relative">
            {/* Decorative dot grid (top-right) */}
            <div
              aria-hidden
              className="absolute -top-6 -right-6 w-28 h-28 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, primary 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />
            {/* Decorative dot grid (bottom-left) */}
            <div
              aria-hidden
              className="absolute -bottom-6 -left-6 w-24 h-24 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle,primary 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />

            <div className="relative bg-[#1e1b4b] rounded-2xl p-8 shadow-2xl">
              <div className="flex flex-col gap-4">
                {/* Name */}
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3.5 rounded-lg bg-white/95 text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />

                {/* Email */}
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3.5 rounded-lg bg-white/95 text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />

                {/* Phone */}
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full px-4 py-3.5 rounded-lg bg-white/95 text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />

                {/* Message */}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-lg bg-white/95 text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                />

                {/* Submit */}
                <button
                  type="button"
                  className="w-full py-4 mt-1 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-[15px] tracking-wide shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}