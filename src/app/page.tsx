import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PRODUCTS } from "@/lib/mock-data";
import { ChevronRight, ShieldCheck, Headphones, ArrowRight, Mail, Bell, Clock, Star } from "lucide-react";
import { IconTruck, IconRefresh, IconLock, IconCash } from "@tabler/icons-react";
import { CategorySlider } from "@/components/home/CategorySlider";
import { FlashSaleTimer } from "@/components/home/FlashSaleTimer";
import { PromoBanners } from "@/components/home/PromoBanners";

// Reusable Product Carousel Component
const ProductCarousel = ({

  // Wait, I can't put `useEmblaCarousel` inside `page.tsx` if it's a Server Component, but `page.tsx` might not have `"use client"`!
  // Let me check if `page.tsx` has `"use client"`.
  title,
  description,
  products,
  link,
  prependElement,
}: {
  title: string;
  description?: string;
  products: typeof PRODUCTS;
  link: string;
  prependElement?: React.ReactNode;
}) => {
  return (
    <section className="container  mx-auto px-5 sm:px-6 py-6 mb-1">
      <h2 className="font-heading text-lg sm:text-2xl font-bold mb-1">{title}</h2>
      <div className="flex items-center justify-between gap-0 sm:gap-0 mb-1">
        {description ? (
          <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.12em] font-medium line-clamp-2 sm:truncate min-w-0 flex-1">
            {description}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        <Link
          href={link}
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary hover:text-primary/80 shrink-0 inline-flex items-center gap-1 text-muted-foreground"
        >
          See all
          <ArrowRight className="w-3.5 h-3.5 " strokeWidth={2} />
        </Link>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-3 sm:gap-4 snap-x snap-mandatory hide-scrollbar pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6 scroll-px-5 sm:scroll-px-6 items-stretch">
          {prependElement && (
            <div className="w-[200px] sm:w-[280px] shrink-0 snap-start flex flex-col gap-3 sm:gap-4">
              {prependElement}
            </div>
          )}
          {products.map((product) => (
            <div key={product.id} className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const bestSellers = PRODUCTS.slice(0, 8);
  const fruitsProducts = PRODUCTS.filter(p => p.category === 'Fruits & Veg');
  const fashionProducts = PRODUCTS.filter(p => p.category === 'Fashion');
  const drinkProducts = PRODUCTS.filter(p => p.category === 'Beverages');

  const categoryImages = [
    { name: "Vegetables & Fruits", image: "/images/product_placeholder.png" },
    { name: "Grocery & Staples", image: "/images/product_placeholder.png" },
    { name: "Dairy & Eggs", image: "/images/product_placeholder.png" },
    { name: "Beverages", image: "/images/product_placeholder.png" },
    { name: "Snacks & Munchies", image: "/images/product_placeholder.png" },
    { name: "Food", image: "/images/product_placeholder.png" },
    { name: "Fashion", image: "/images/product_placeholder.png" },
    { name: "Bags & Luggage", image: "/images/product_placeholder.png" },
    { name: "Beauty & Personal Care", image: "/images/product_placeholder.png" },
    { name: "Electronics", image: "/images/product_placeholder.png" },
    { name: "Home & Kitchen", image: "/images/product_placeholder.png" },
    { name: "Liquor", image: "/images/product_placeholder.png" },
  ];



  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSlider />

      <CategorySlider />

      {/* Best Sellers */}
      <ProductCarousel
        title="Best Sellers"

        description="Our most loved picks. Top-rated customer favorites."
        products={bestSellers}
        link="/shop"
      />

      <PromoBanners />



      {/* Specific Category Sections */}
      {fruitsProducts.length > 0 && (
        <ProductCarousel
          title="Fresh Fruits & Veg"
          description="Farm-fresh produce picked daily."
          products={fruitsProducts}
          link="/shop"

        />
      )}

      {fashionProducts.length > 0 && (
        <>
          <section className="container mx-auto px-4 sm:px-6 mt-10 mb-2">
            <div className="grid grid-cols-[1.4fr_1fr] md:grid-cols-[1.6fr_1fr] gap-2 sm:gap-4 h-[160px] sm:h-[220px] md:h-[320px]">

              {/* Left Banner */}
              <div className="relative rounded-[0px] md:rounded-[0px] overflow-hidden bg-[#eaf5f2] flex flex-col justify-center h-full group shadow-sm border border-[#eaf5f2]">
                <Image
                  src="/images/hero_fashion.png"
                  alt="Fashion Woman"
                  fill
                  className="object-cover object-[70%_top] opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#eaf5f2] via-[#eaf5f2]/90 to-transparent sm:w-[65%]" />

                <div className="relative z-10 p-4 sm:p-8 md:p-12 max-w-[150px] sm:max-w-[280px]">
                  <h2 className="font-heading text-[18px] sm:text-[32px] md:text-[44px] font-extrabold text-[#111827] leading-[1.1] mb-1.5 sm:mb-2 tracking-tight">
                    Go Behind<br />The Design
                  </h2>
                  <p className="text-[#374151] text-[9px] sm:text-[13px] italic mb-3 sm:mb-6 font-serif leading-tight">women Essentials Seasonals</p>
                  <Button asChild className="bg-primary hover:bg-[#0f4c48]  text-white rounded-none font-bold px-3 sm:px-6 py-1.5 sm:py-2.5 border-0 h-auto w-fit text-[9px] sm:text-[12px] shadow-sm tracking-wide">
                    <Link href="/shop">
                      Shop All
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Banner */}
              <div className="relative rounded-[0px] md:rounded-[0px] overflow-hidden bg-[#dcdfd8] p-4 sm:p-6 md:p-8 flex flex-col justify-end h-full group shadow-sm">
                <Image
                  src="/images/hero_fashion.png"
                  alt="Unisex T-Shirts"
                  fill
                  className="object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 w-full">
                  <h3 className="font-heading text-[13px] sm:text-[18px] md:text-[22px] font-bold text-white mb-1 sm:mb-2 leading-snug line-clamp-2">
                    Unisex summer cotton T-shirt
                  </h3>
                  <Link href="/shop" className="text-white text-[9px] sm:text-[12px] font-medium border-b border-white pb-0.5 hover:border-white/60 transition-colors w-fit block italic leading-none mt-2">
                    Shop All
                  </Link>
                </div>
              </div>

            </div>
          </section>
          <ProductCarousel
            title="Fashion & Apparel"
            description="Everyday wear. Every size. Every style."
            products={fashionProducts}
            link="/shop"
          />
        </>
      )}

      {drinkProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-6 mb-5">
            <div className="relative rounded-0 sm:rounded-lg overflow-hidden bg-zinc-900 h-44 -mt-10 sm:h-64 md:h-80 flex items-center shadow-lg group">
              <Image
                src="/images/hero_liquor.png"
                alt="Premium Liquors"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-16 max-w-2xl">
                <h2 className="font-heading text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-md">
                  Premium Liquors
                </h2>
                <p className="text-white/90 text-xs sm:text-lg mb-3 sm:mb-6 drop-shadow-sm">
                  Discover the finest selection of beverages for your perfect evening.
                </p>
                <Button asChild style={{ background: "#8b5cf6", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "7px 14px" }} className="hover:opacity-90 transition-opacity border-0 text-xs sm:text-base h-8 sm:h-auto">
                  <Link href="/shop">
                    Explore Spirits <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Beverages & Drinks"
            description="Stay refreshed. Juices, drinks, tea, coffee and more."
            products={drinkProducts}
            link="/shop"
          />
        </>
      )}

      {/* Primary Color Empty Section */}
      <section className="container mx-auto px-5 sm:px-6 mt-8 mb-5">
        <div className="bg-primary rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 pb-16 sm:pb-20 min-h-[200px] shadow-md flex flex-col">

          {/* Flash Sale Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 w-full">
            <h2 className="text-white font-bold text-lg sm:text-2xl">Flash Sale</h2>
            <FlashSaleTimer />
          </div>

          {/* Flash Sale Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
            {PRODUCTS.slice(0, 6).map((product) => {
              const originalPrice = product.originalPrice || Math.round(product.price * 1.25);
              const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

              return (
                <Link href={`/products/${product.slug}`} key={product.id} className="relative rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 cursor-pointer group shadow-sm flex flex-col gap-2">
                  <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-0 right-0 bg-[#ff2d55] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
                      -{discount}%
                    </div>
                  </div>
                  <div className="px-1 pb-1 flex flex-col justify-between flex-1">
                    <h3 className="text-[11px] sm:text-xs font-medium text-zinc-800 line-clamp-2 leading-tight mb-1.5">{product.name}</h3>
                    <div className="flex items-center gap-1.5 mt-auto">
                      <span className="text-xs sm:text-sm font-bold text-zinc-900">₹{product.price.toFixed(0)}</span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 line-through">₹{originalPrice.toFixed(0)}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Top Products Header */}
          <h2 className="text-white font-bold text-base sm:text-lg mb-4 mt-8">Top Products</h2>

          {/* Top Products Carousel */}
          <div className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 items-center">
            {PRODUCTS.slice(10, 18).map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id} className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 snap-start border-[3px] sm:border-[4px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] cursor-pointer group">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </Link>
            ))}
          </div>

          {/* Just For You Section */}
          <div className="bg-white rounded-[24px] sm:rounded-t-[32px] p-5 sm:ml-1 sm:mr-1 px-5 sm:p-8 mt-8 ml-1 mr-1 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 flex-1">
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <h2 className="text-zinc-900 font-bold text-lg sm:text-xl">Just For You</h2>
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {PRODUCTS.slice(20, 24).map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id} className="flex flex-col group cursor-pointer">
                  <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white mb-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-zinc-100 p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-[10px] sm:text-xs text-zinc-600 line-clamp-1 leading-tight mb-1 px-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 px-1">₹{product.price.toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* Bottom Banner Slots */}
      <section className="container mx-auto px-2 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-2 sm:gap-2">
          <Link
            href="/shop"
            className="relative flex w-full aspect-[2/1] sm:aspect-[3/1] items-center justify-center  bg-zinc-900 overflow-hidden hover:opacity-95 transition-opacity"
          >
            <span className="text-sm sm:text-base font-medium text-white/50 select-none">600 × 200</span>
          </Link>
          <Link
            href="/shop"
            className="relative flex w-full min-h-[100px] aspect-[3/1] sm:min-h-[88px] sm:aspect-[6/1] items-center justify-center  bg-zinc-800 overflow-hidden hover:opacity-95 transition-opacity"
          >
            <span className="text-xs sm:text-sm font-medium text-white/40 select-none">Banner</span>
          </Link>
        </div>
      </section>

      {/* Features + Newsletter */}
      <section className="container mx-auto px-5 sm:px-6 mt-2 mb-5">
        {/* Service highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-primary-100/80 sm:border-zinc-200 rounded-2xl sm:rounded-xl overflow-hidden mb-6 sm:mb-16 bg-white shadow-sm">
          {[
            { icon: IconTruck, title: "Free Delivery", desc: "On orders above ₹499" },
            { icon: IconRefresh, title: "Easy Returns", desc: "30-day hassle-free" },
            { icon: IconLock, title: "Secure Payment", desc: "UPI, cards, net banking" },
            { icon: IconCash, title: "Cash on Delivery", desc: "Available on select pincodes" },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-row items-center gap-3 sm:gap-4 p-4 sm:p-6 
                ${i % 2 === 0 ? "border-r border-zinc-100/80 sm:border-r-0" : ""}
                ${i < 2 ? "border-b border-zinc-100/80 sm:border-b-0" : ""}
                ${i >= 1 ? "sm:border-l sm:border-zinc-200" : ""}
              `}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[13px] sm:text-base text-zinc-900 leading-tight">{item.title}</p>
                <p className="text-[9px] sm:text-sm text-muted-foreground mt-0.5 leading-snug hidden sm:block">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-6 mb-2">
          <div className="bg-[#14452f] rounded-[10px] sm:rounded-[20px] p-6 sm:p-8 lg:px-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
            {/* Background Pattern */}
            <div className="absolute -bottom-10 -right-10 opacity-30 pointer-events-none">
              <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0C150 0 200 50 200 100C200 150 150 200 100 200C50 200 0 150 0 100C0 50 50 0 100 0Z" fill="#2d6a4f" />
                <path d="M50 50C100 50 150 100 150 150C100 150 50 100 50 50Z" fill="#1b4332" />
                <path d="M150 50C100 50 50 100 50 150C100 150 150 100 150 50Z" fill="#40916c" />
              </svg>
            </div>

            <div className="relative z-10 max-w-lg w-full">
              <h2 className="font-heading text-[22px] sm:text-[26px] font-bold text-white mb-1.5">
                Stay in the loop
              </h2>
              <p className="text-[12px] sm:text-[13px] text-green-50/90 mb-5 leading-snug">
                Get updates on new products,<br className="hidden sm:block" />promotions, and exclusive offers.
              </p>

              <form className="flex w-full bg-white p-1 rounded-full items-center mb-3 flex-row shadow-lg border border-white" action="#">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full h-10 px-4 bg-transparent border-none text-[13px] sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0"
                  required
                />
                <Button
                  type="submit"
                  className="h-9 sm:h-10 px-5 sm:px-6 rounded-full bg-[#1b5e20] hover:bg-[#14452f] text-white text-[12px] sm:text-[13px] font-medium border-0 gap-1.5 shrink-0 transition-colors"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </form>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-green-100/90 ml-1">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>No spam. Unsubscribe anytime.</span>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative z-10 hidden md:flex items-center justify-center shrink-0 w-48 h-32 mr-4 lg:mr-10">
              <div className="relative w-36 h-24">
                {/* Back of envelope */}
                <div className="absolute inset-0 bg-[#2d6a4f] rounded-lg shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                {/* Letter inside */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[85%] h-[110%] bg-[#f8f9fa] rounded shadow-sm border border-gray-100 flex flex-col p-3.5 gap-2.5">
                  <div className="w-1/3 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-5/6 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-2/3 h-1.5 bg-gray-200 rounded-full"></div>
                </div>
                {/* Front flaps */}
                <div className="absolute inset-0 bg-[#40916c] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)]" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="absolute inset-0 bg-[#1b4332] rounded-lg opacity-30" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>

                {/* Notification Bell */}
                <div className="absolute -top-3 -right-3 w-9 h-9 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Bell className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

