"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    image: "/images/banners/image copy 5.png",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/banners/image copy 6.png",
    link: "/shop",
  },
  {
    id: 3,
    image: "/images/banners/image copy 2.png",
    link: "/shop",
  },
];

const AUTO_SCROLL_MS = 5000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: AUTO_SCROLL_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="w-full px-4 sm:px-6">
      <div
        ref={emblaRef}
        className="
      relative
      w-full
      overflow-hidden
      bg-zinc-900
      shadow-lg
      aspect-[16/9]
      rounded-sm
      sm:rounded-[6px]
      mt-1
    "
      >
        <div className="flex h-full w-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Link
                href={slide.link}
                className="relative block h-full w-full"
                draggable={false}
              >
                <Image
                  src={slide.image}
                  alt="Hero banner"
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="pointer-events-none select-none object-cover"
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${idx === current
                ? "w-10 bg-primary"
                : "w-2 bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}