"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const BANNERS = [
  { src: "/images/11.png", alt: "Veggies" },
  { src: "/images/b1.png", alt: "Drinks" },
  { src: "/images/b3.png", alt: "Fashion" },
  { src: "/images/b1.png", alt: "Promo" },
];

const ACTIVE_SCALE = 1.03;
const NEARBY_SCALE = 0.96;
const DESKTOP_MQ = "(min-width: 768px)";

export function PromoBanners() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const updateScales = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (window.matchMedia(DESKTOP_MQ).matches) {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        item.style.transform = "";
        item.style.zIndex = "";
      });
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;

    itemRefs.current.forEach((item) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const t = Math.min(1, Math.abs(itemCenter - centerX) / Math.max(item.offsetWidth, 1));
      const scale = ACTIVE_SCALE - t * (ACTIVE_SCALE - NEARBY_SCALE);
      item.style.transform = `scale(${scale})`;
      item.style.zIndex = String(Math.round(scale * 0));
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateScales();
    });
  }, [updateScales]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateScales();
    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate, updateScales]);

  return (
    <section className="container mx-auto w-full py-4 md:py-6">
      <div
        ref={scrollerRef}
        className="flex md:grid md:grid-cols-4 gap-1 sm:gap-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar px-5 sm:px-6 md:px-6 py-2 md:py-0 items-stretch overscroll-x-contain touch-pan-x"
      >
        {BANNERS.map((banner, i) => (
          <div
            key={`${banner.alt}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative w-[160px] sm:w-[200px] md:w-auto shrink-0 snap-start snap-always overflow-hidden rounded-[14px] h-[230px] sm:h-[280px] md:h-auto md:aspect-[546/941] origin-center max-md:scale-[0.96] max-md:first:scale-[1.03] max-md:will-change-transform"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-cover pointer-events-none"
              sizes="(min-width: 768px) 25vw, 200px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
