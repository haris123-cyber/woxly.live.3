"use client";

import Link from "next/link";
import {
  IconShirt, IconHanger, IconShoe, IconShoppingBag,
  IconDeviceWatch, IconLayoutGrid, IconMoodKid,
  IconDeviceLaptop, IconHome, IconBarbell, IconDiamond
} from "@tabler/icons-react";

const CATEGORIES = [
  { name: "Men", icon: <IconShirt stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Women", icon: <IconHanger stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Shoes", icon: <IconShoe stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Bags", icon: <IconShoppingBag stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Accessories", icon: <IconDeviceWatch stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Beauty", icon: <IconDiamond stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Kids", icon: <IconMoodKid stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Electronics", icon: <IconDeviceLaptop stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Home", icon: <IconHome stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "Sports", icon: <IconBarbell stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
  { name: "All", icon: <IconLayoutGrid stroke={1.5} className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-800 group-hover:text-[#8b5cf6] transition-colors" />, link: "/shop" },
];

export function CategorySlider() {
  return (
    <section className="container mx-auto px-0 py-6 mb-0 mt-0">
      <div className="flex overflow-x-auto justify-start items-center gap-3 sm:gap-8 px-5 pb-4 snap-x w-full ml-3 sm:ml-20 ">
        {CATEGORIES.map((cat, i) => (
          <Link key={i} href={cat.link} className="group flex flex-col items-center gap-3 sm:gap-4 shrink-0 transition-transform hover:-translate-y-1 snap-start">
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#f4eefc] group-hover:bg-[#efe4ff] transition-colors flex items-center justify-center">
              {cat.icon}
            </div>
            <span className="font-bold text-[9px] sm:text-sm text-zinc-900 leading-tight tracking-wide whitespace-nowrap">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
