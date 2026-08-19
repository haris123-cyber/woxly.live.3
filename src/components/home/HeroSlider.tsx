"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, PanInfo } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Shirt Space\nCollection",
    desc: "Discover our latest range of colorful shirts for every mood.",
    color: "#ffdfe5",
    image: "/images/hero_fashion.pn",
  },
  {
    id: 2,
    title: "Fresh Picks\nDaily",
    desc: "Farm fresh vegetables and fruits delivered to your door.",
    color: "#e6f4ea",
    image: "/images/hero_grocery.pn",
  },
  {
    id: 3,
    title: "Latest\nElectronics",
    desc: "Upgrade your gear with the newest tech accessories.",
    color: "#e8f0fe",
    image: "/images/hero_electronics.pn",
  },
];

const AUTO_SCROLL_MS = 5000;

const SlideContent = ({ slide, idx, current, scrollTo, isMobile = false }: any) => (
  <>
    {/* Top Left Purple Shape */}
    <div className="absolute top-0 left-0 w-full sm:w-[480px] h-[160px] sm:h-[240px] bg-[#8b5cf6] rounded-br-[120px] sm:rounded-br-[220px] z-0"></div>

    {/* Bottom Right Purple Shape */}
    <div
      className="absolute bottom-0 right-0 w-[120%] md:w-[70%] h-[60%] md:h-[110%] bg-[#8b5cf6] z-0"
      style={{ clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)' }}
    ></div>

    {/* Content - Left */}
    <div className="relative z-10 w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-start">
      <div className="mb-10 sm:mb-12 pl-2">
        <p className="text-white/90 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1">
          New Collection
        </p>
        <p className="text-white text-lg sm:text-2xl font-bold tracking-widest">
          NEW 14
        </p>
      </div>

      <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-extrabold text-zinc-900 leading-[1.1] tracking-tight mb-5 mt-2 sm:mt-4 whitespace-pre-line">
        {slide.title}
      </h1>

      <p className="text-zinc-700 text-sm sm:text-base mb-8 max-w-[280px] font-medium leading-relaxed">
        {slide.desc}
      </p>

      <Link
        href="/shop"
        className="inline-flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full px-6 py-3.5 sm:px-8 sm:py-4 font-bold text-sm sm:text-[15px] w-fit transition-all shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:-translate-y-0.5"
      >
        SHOP NOW <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </Link>

      {/* Dots Indicator (Inside Slide) */}
      {!isMobile && (
        <div className="flex gap-2 items-center mt-12 md:mt-16 relative z-30">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(dotIdx);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer ${dotIdx === current ? "w-8 bg-[#8b5cf6]" : "w-1.5 sm:w-2 bg-zinc-400"
                }`}
            />
          ))}
        </div>
      )}
    </div>

    {/* Content - Right (Image) */}
    <div className="relative z-10 w-full md:w-1/2 min-h-[300px] md:min-h-full flex items-end justify-center sm:justify-end pr-0 sm:pr-10 pt-10">
      <div className="relative w-[85%] sm:w-[90%] h-[110%] sm:h-[130%] -mb-4 sm:-mb-6">
        <Image
          src={slide.image}
          alt="Banner Image"
          fill
          className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
          priority={idx === 0}
        />
      </div>

      {/* Floating Pill */}
      <div className="absolute bottom-6 md:bottom-12 right-4 md:right-8 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-[20px] flex items-center gap-3 shadow-xl max-w-[220px] border border-white/20">
        <div className="w-10 h-10 rounded-[14px] border-2 border-[#8b5cf6] bg-transparent flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5 text-[#8b5cf6]" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-zinc-900 font-bold text-[13px] sm:text-sm leading-tight mb-0.5">Free Shipping</p>
          <p className="text-zinc-500 text-[10px] sm:text-[11px] font-medium leading-tight">On orders over $50</p>
        </div>
      </div>
    </div>
  </>
);

function HeroSliderDesktop() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: AUTO_SCROLL_MS, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <section className="hidden sm:block container mx-auto px-5 sm:px-6 pt-4 sm:pt-6 mb-0 -mt-2">
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing touch-pan-y -ml-4">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 pl-4">
              <div
                className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col md:flex-row shadow-sm border border-black/5"
                style={{ backgroundColor: slide.color }}
              >
                <SlideContent slide={slide} idx={idx} current={current} scrollTo={scrollTo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSliderMobile() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [isDragging]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -50) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (info.offset.x > 50) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section className="block sm:hidden container mx-auto px-5 pt-4 mb-8 -mt-2 overflow-visible">
      {/* Container for the stacked cards. We leave some margin so they offset nicely to the left. */}
      <div className="relative w-full w-full 
  h-[400px]
  min-[320px]:h-[500px]
  min-[390px]:h-[600px]
  min-[420px]:h-[600px] ml-10
  ">
        {slides.map((slide, idx) => {
          const relIdx = (idx - current + slides.length) % slides.length;

          return (
            <motion.div
              key={slide.id}
              className="absolute top-0 left-0 w-[90%] h-full rounded-[24px] overflow-hidden flex flex-col shadow-[-5px_0px_10px_rgba(0,0,0,.5)] border border-black/5" style={{ backgroundColor: slide.color, zIndex: slides.length - relIdx }}
              animate={{
                scale: 1 - relIdx * 0.05,
                x: relIdx * -30,
                opacity: relIdx < 3 ? 1 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={relIdx === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              <SlideContent slide={slide} idx={idx} current={current} scrollTo={() => { }} isMobile={true} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function HeroSlider() {
  return (
    <>
      <HeroSliderMobile />
      <HeroSliderDesktop />
    </>
  );
}
