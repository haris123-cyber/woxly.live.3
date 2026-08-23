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
    image: "/images/Off (1).png",
  },
  {
    id: 2,
    title: "Fresh Picks\nDaily",
    desc: "Farm fresh vegetables and fruits delivered to your door.",
    color: "#e6f4ea",
    image: "/images/Off.png",
  },
  {
    id: 3,
    title: "Latest\nElectronics",
    desc: "Upgrade your gear with the newest tech accessories.",
    color: "#e8f0fe",
    image: "/images/off(3).png",
  },
];

const AUTO_SCROLL_MS = 5000;

const SlideContent = ({ slide, idx, current, scrollTo, isMobile = false }: any) => (
  <>
    {/* Full Background Image */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src={slide.image}
        alt="Banner Background"
        fill
        className="object-cover"
        priority={idx === 0}
      />
    </div>



    {/* Content */}
    <div className="relative z-10 w-full p-8 sm:p-12 md:p-16 flex flex-col justify-start h-full">
      <div className="mb-10 sm:mb-12 pl-2">
        <p className="text-white/90 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1">
          New Collection
        </p>
        <p className="text-white text-lg sm:text-2xl font-bold tracking-widest">
          NEW 14
        </p>
      </div>



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

    {/* Floating Pill */}
    <div className="absolute bottom-6 md:bottom-12 right-4 md:right-8 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-[20px] flex items-center gap-3 shadow-xl max-w-[220px] border border-white/20 z-20">
      <div className="w-10 h-10 rounded-[14px] border-2 border-[#8b5cf6] bg-transparent flex items-center justify-center shrink-0">
        <Truck className="w-5 h-5 text-[#8b5cf6]" strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-zinc-900 font-bold text-[13px] sm:text-sm leading-tight mb-0.5">Free Shipping</p>
        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-medium leading-tight">On orders over $50</p>
      </div>
    </div>
  </>
);

function HeroSliderDesktop() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      duration: 42,
      skipSnaps: false,
      watchDrag: true,
    },
    [Autoplay({ delay: AUTO_SCROLL_MS, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
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
                className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col md:flex-row shadow-sm border border-black/5 will-change-transform"
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

const SWIPE_OFFSET = 56;
const SWIPE_VELOCITY = 450;

const stackTransition = {
  type: "spring" as const,
  stiffness: 160,
  damping: 26,
  mass: 0.9,
};

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

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    setIsDragging(false);
    const swipedNext = info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY;
    const swipedPrev = info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY;

    if (swipedNext) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (swipedPrev) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section className="block sm:hidden container mx-auto px-5 pt-4 mb-8 -mt-2 overflow-visible">
      <div
        className="relative w-full h-[400px] min-[320px]:h-[500px] min-[390px]:h-[600px] min-[420px]:h-[600px] ml-10"
      >
        {slides.map((slide, idx) => {
          const relIdx = (idx - current + slides.length) % slides.length;

          return (
            <motion.div
              key={slide.id}
              className="absolute top-0 left-0 w-[90%] h-full rounded-[24px] overflow-hidden flex flex-col shadow-[-5px_0px_10px_rgba(0,0,0,.5)] border border-black/5 will-change-transform"
              style={{ backgroundColor: slide.color }}
              initial={false}
              animate={{
                scale: 1 - relIdx * 0.05,
                x: relIdx * -30,
                opacity: relIdx < 3 ? 1 : 0,
                zIndex: slides.length - relIdx,
              }}
              transition={{
                scale: stackTransition,
                x: stackTransition,
                opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                zIndex: { delay: relIdx === 0 ? 0 : 0.12 },
              }}
              drag={relIdx === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 180, bounceDamping: 24 }}
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
