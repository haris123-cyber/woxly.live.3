import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PRODUCTS } from "@/lib/mock-data";
import { ChevronRight, ShieldCheck, Headphones, ArrowRight, Mail, Bell, Clock, Star } from "lucide-react";
import { IconTruck, IconRefresh, IconLock, IconCash } from "@tabler/icons-react";
import { CategorySlider } from "@/components/home/CategorySlider";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { FlashSaleTimer } from "@/components/home/FlashSaleTimer";
import { PromoBanners } from "@/components/home/PromoBanners";
import { StationaryBanners } from "@/components/home/StationaryBanners";

const ProductCarousel = ({
  title,
  description,
  products,
  link,
  prependElement,
  bannerImage,
  bgColor = "bg-[#dcedcd]",
  textColor = "text-[#1b4e2b]",
}: {
  title: string;
  description?: string;
  products: typeof PRODUCTS;
  link: string;
  prependElement?: React.ReactNode;
  bannerImage?: string;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-2 mb-1">

      {/* Banner */}
      <div
        className={`relative rounded-xl sm:rounded-2xl ${bgColor} ${textColor} mb-3 overflow-hidden h-32 sm:h-44 md:h-52`}
      >
        {/* Full Banner Image */}
        {bannerImage && (
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Banner Content */}
        <div className="relative z-10 flex h-full flex-col justify-center p-4 sm:p-6">
          <div className="w-2/3 min-w-0">
            <h2 className="font-heading text-xl sm:text-[26px] font-bold text-current truncate">
              {title}
            </h2>

            {description && (
              <p className="text-[10px] sm:text-xs opacity-80 uppercase tracking-[0.12em] font-medium mt-1 truncate">
                {description}
              </p>
            )}

            <Button
              asChild
              size="sm"
              variant="outline"
              className="bg-white mt-2 border-0 text-black hover:bg-gray-100 rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs font-bold w-fit"
            >
              <Link
                href={link}
                className="text-[13px] sm:text-[15px] font-bold text-zinc-900 hover:opacity-80 inline-flex items-center gap-2 sm:gap-3"
              >
                See All

                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <ArrowRight
                    className="w-2 h-2 sm:w-4 sm:h-4 text-white"
                    strokeWidth={2.5}
                  />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-3 sm:gap-4 snap-x snap-mandatory hide-scrollbar pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6 scroll-px-5 sm:scroll-px-6 items-stretch">

          {prependElement && (
            <div className="w-[200px] sm:w-[280px] shrink-0 snap-start flex flex-col gap-3 sm:gap-4">
              {prependElement}
            </div>
          )}

          {products.map((product) => (
            <div
              key={product.id}
              className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 snap-start"
            >
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
    { name: "Vegetables & Fruits", image: "/images/veg/Organic_broccoli_2.jpg" },
    { name: "Grocery & Staples", image: "/images/grocery/Quaker_Oats (2).jpeg" },
    { name: "Dairy & Eggs", image: "/images/DAIRY & EGGS/farm_fresh_eggs_1789022099897.jpg" },
    { name: "Beverages", image: "/images/liquor/Peach_iced_tea_product_photography_20260910155712.jpeg" },
    { name: "Snacks & Munchies", image: "/images/snacks/Potato_chips_product_photography_20260910123202.jpeg" },
    { name: "Food", image: "/images/meat&seafood/Atlantic_Salmon_product_photography_20260910165654.jpeg" },
    { name: "Fashion", image: "/images/fashion/Denim_jacket_product.jpeg" },
    { name: "Bags & Luggage", image: "/images/fashion/Brown_leather_handbag.jpeg" },
    { name: "Beauty & Personal Care", image: "/images/beauty/Luxury_perfume_bottle_on_background_20260910124349.jpeg" },
    { name: "Electronics", image: "/images/electronics/Smart_Phone_Pro_product_photography_20260910125103.jpeg" },
    { name: "Home & Kitchen", image: "/images/home care/Dishwashing_liquid_product_photo…_20260910153837.jpeg" },
    { name: "Liquor", image: "/images/liquor/Vodka_bottles_on_studio_background_20260910154513.jpeg" },
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
        bannerImage="/images/banners/Mobile_phones_displayed_diagonally_20260910171528.jpeg"
        bgColor="bg-[#0f172a]"
        textColor="text-white"
      />

      <PromoBanners />



      {/* Specific Category Sections */}
      {fruitsProducts.length > 0 && (
        <ProductCarousel
          title="Fresh Fruits & Veg"
          description="Farm-fresh produce picked daily."
          products={fruitsProducts}
          link="/shop"
          bannerImage="/images/banners/Floating_fruits_on_dark_background_20260910171543.jpeg"
          bgColor="bg-[#1e1b4b]"
          textColor="text-white"
        />
      )}

      {fashionProducts.length > 0 && (
        <>
          <section className="container mx-auto px-4 sm:px-6 mt-10 mb-2">
            <div className="relative w-full h-[160px] sm:h-[220px] md:h-[320px] overflow-hidden group">

              {/* Full Width Banner Image */}
              <Image
                src="/images/banners/image copy 6.png"
                alt="Fashion Woman"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark/Light Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#eaf5f2] via-[#eaf5f2]/85 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center p-2 sm:p-8 md:p-12">
                <div className="max-w-[150px] sm:max-w-[280px] md:max-w-[400px]">
                  <h2 className="font-heading text-[18px] sm:text-[32px] md:text-[44px] font-extrabold text-[#111827] leading-[1.1] mb-1.5 sm:mb-2 tracking-tight">
                    Go Behind
                    <br />
                    The Design
                  </h2>

                  <p className="text-[#374151] text-[9px] sm:text-[13px] italic mb-3 sm:mb-6 font-serif leading-tight">
                    Women Essentials Seasonals
                  </p>

                  <Button
                    asChild
                    className="bg-primary hover:bg-[#0f4c48] text-white rounded-none font-bold px-3 sm:px-6 py-1.5 sm:py-2.5 border-0 h-auto w-fit text-[9px] sm:text-[12px] shadow-sm tracking-wide"
                  >
                    <Link href="/shop">
                      Shop All
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Fashion & Apparel"
            description="Everyday wear. Every size. Every style."
            products={fashionProducts}
            link="/shop"
            bannerImage="/images/hero_fashion.png"
            bgColor="bg-[#fce7f3]"
            textColor="text-white"
          />
        </>
      )}

      {drinkProducts.length > 0 && (
        <>
          <StationaryBanners />
          <ProductCarousel
            title="Beverages & Drinks"
            description="Stay refreshed. Juices, drinks, tea, coffee and more."
            products={drinkProducts}
            link="/shop"
            bannerImage="/images/banners/Liquors_aligned_on_glowing_shelf_20260910171532.jpeg"
            bgColor="bg-[#18181b]"
            textColor="text-white"
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
        <img src="/images/banners/image copy 3.png" alt="Banner" className="w-full h-full object-cover" />

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
        <section className="bg-[#7c3aed] py-8 px-6">
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
            <NewsletterForm />
          </div>
        </section>
      </section>
    </div>
  );
}

