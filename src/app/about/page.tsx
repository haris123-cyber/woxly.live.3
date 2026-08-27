"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Tag, Truck, Smile, Star, Users, Package, Clock } from "lucide-react";

export default function AboutPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ── Hero Section ── */}
      <section className="bg-[#f5f0ff] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7c3aed] mb-4 block">About Us</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              More Than a Store.<br />
              <span className="text-[#7c3aed]">We&apos;re Your<br />Shopping Partner.</span>
            </h1>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              At Woxly, we believe shopping should be simple, enjoyable and rewarding. That&apos;s why we bring you the best products, great prices and a seamless experience you can trust.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-purple-200 text-[14px]"
            >
              Explore Our Store
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* Right Mockup Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-[320px] h-[340px] md:w-[420px] md:h-[440px]">
              <Image
                src="/images/phone_mockup.jpg"
                alt="Woxly App Mockup"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Row ── */}
      <section className="bg-white border-y border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: ShieldCheck, label: "Quality Products", desc: "Carefully curated products you can trust.", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: Tag, label: "Best Prices", desc: "Unbeatable prices and amazing offers.", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Truck, label: "Fast Delivery", desc: "Quick and reliable delivery right to your door.", color: "text-orange-500", bg: "bg-orange-50" },
            { icon: Smile, label: "Happy Customers", desc: "Your satisfaction is our top priority always.", color: "text-green-600", bg: "bg-green-50" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>
                <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-gray-900 text-[13px]">{item.label}</h3>
              <p className="text-[12px] text-gray-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl relative min-h-[280px] w-full">
          <Image src="/images/about-store.png" alt="Our Story" fill className="object-cover" />
          {/* Overlay badge */}
          <div className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-purple-600 fill-purple-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-900">Thank you for being a part of our journey!</p>
              <p className="text-[11px] text-gray-500">We grow because of you.</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-[#7c3aed] text-white rounded-xl px-4 py-2 text-[11px] font-bold tracking-wide shadow">WOXLY</div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7c3aed] mb-4 block">Our Story</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Built with Passion.<br /><span className="text-[#7c3aed]">Driven by You.</span>
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
            Woxly started with a simple goal — to make online shopping easy and trustworthy for everyone.
          </p>
          <ul className="space-y-3 mb-8">
            {["Carefully curated products", "Secure & seamless shopping", "Dedicated customer support", "Always improving for you"].map(item => (
              <li key={item} className="flex items-center gap-3 text-[14px] font-medium text-gray-700">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="bg-[#7c3aed] rounded-2xl p-6 grid grid-cols-4 gap-4 text-white text-center shadow-xl shadow-purple-200">
            {[
              { icon: Users, val: "50K+", label: "Happy\nCustomers" },
              { icon: Package, val: "10K+", label: "Products" },
              { icon: Star, val: "99%", label: "Positive\nReviews" },
              { icon: Clock, val: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.val}>
                <s.icon className="w-5 h-5 mx-auto mb-1 opacity-80" strokeWidth={1.5} />
                <p className="text-xl font-extrabold leading-tight">{s.val}</p>
                <p className="text-[10px] opacity-80 font-medium whitespace-pre-line leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Banner ── */}
      <section className="bg-[#7c3aed] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4 text-white flex-1">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold">Stay in the Loop</h3>
              <p className="text-purple-200 text-[13px]">Get exclusive offers, new arrivals and updates straight to your inbox.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto rounded-full overflow-hidden shadow-lg flex-1 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 text-[14px] font-medium text-gray-900 bg-white outline-none"
            />
            <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold px-6 py-3.5 text-[13px] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}