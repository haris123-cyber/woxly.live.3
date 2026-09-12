"use client";

import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Veggies",
    image: "/images/veg/Organic_broccoli_2.jpg",
    link: "/shop",
  },
  {
    name: "Grocery",
    image: "/images/grocery/Quaker_Oats (2).jpeg",
    link: "/shop",
  },
  {
    name: "Dairy",
    image: "/images/DAIRY & EGGS/farm_fresh_eggs_1789022099897.jpg",
    link: "/shop",
  },
  {
    name: "Drinks",
    image: "/images/liquor/Peach_iced_tea_product_photography_20260910155712.jpeg",
    link: "/shop",
  },
  {
    name: "Snacks",
    image: "/images/snacks/Potato_chips_product_photography_20260910123202.jpeg",
    link: "/shop",
  },
  {
    name: "Food",
    image: "/images/meat&seafood/Atlantic_Salmon_product_photography_20260910165654.jpeg",
    link: "/shop",
  },
  {
    name: "Fashion",
    image: "/images/fashion/Denim_jacket_product.jpeg",
    link: "/shop",
  },
  {
    name: "Bags",
    image: "/images/fashion/Brown_leather_handbag.jpeg",
    link: "/shop",
  },
  {
    name: "Beauty",
    image: "/images/beauty/Luxury_perfume_bottle_on_background_20260910124349.jpeg",
    link: "/shop",
  },
  {
    name: "Electronics",
    image: "/images/electronics/Smart_Phone_Pro_product_photography_20260910125103.jpeg",
    link: "/shop",
  },
  {
    name: "Home",
    image: "/images/home care/Dishwashing_liquid_product_photo…_20260910153837.jpeg",
    link: "/shop",
  },
  {
    name: "Liquor",
    image: "/images/liquor/Vodka_bottles_on_studio_background_20260910154513.jpeg",
    link: "/shop",
  },
];

export function CategorySlider() {
  return (
    <section className="container mx-auto px-2 py-6 -mb-4 ">
      <div className="flex w-full  overflow-x-auto gap-4 sm:gap-8 px-5 pb-4  snap-x snap-mandatory scrollbar-hide">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={i}
            href={cat.link}
            className="group flex shrink-0 flex-col items-center gap-2 sm:gap-3 snap-start transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Category Image */}
            <div className="relative w-13 h-13  sm:w-20 sm:h-20 overflow-hidden rounded-full bg-[#f4eefc] ring-1 ring-zinc-100 transition-all duration-200 group-hover:ring-[#8b5cf6] group-hover:shadow-md">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

            </div>
            <p className="font-medium text-[9px] sm:text-[14px] text-black tracking-tight letter-spacing-[1px] text-center">{cat.name}</p>


          </Link>
        ))}
      </div>
    </section>
  );
}