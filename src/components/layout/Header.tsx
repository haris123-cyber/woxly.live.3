"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Home, Package, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname === '/login' || pathname === '/signup' || pathname === '/search') return null;

  return (
    <>
      {/* Marquee Announcement Bar */}
      <div className="w-full bg-primary overflow-hidden whitespace-nowrap py-2.5 sm:py-3 flex items-center shrink-0">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-[12px] sm:text-[14px] tracking-wider px-4 font-medium inline-block">
              use <strong className="font-bold uppercase">WELOCOM10</strong> code to 10% off on every product
            </span>
          ))}
        </div>
      </div>

      <header className="w-full bg-background border-b border-border/50 sticky top-0 z-50 flex flex-col relative">

        {/* Main Header Row */}
        <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between max-w-full shrink-0">
          {/* Menu Toggle */}
          <div className="flex flex-1 justify-start">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 hover:bg-muted/50 rounded-full w-9 h-9 sm:w-10 sm:h-10 -ml-2"
              onClick={toggleMobileMenu}
            >
              <div className="flex flex-col items-center gap-[3px]">
                <span className="w-4 h-[2.5px] rounded-full bg-[#4F46E5]" />
                <span className="w-2.5 h-[2.5px] rounded-full bg-[#4F46E5]" />
                <span className="w-4 h-[2.5px] rounded-full bg-[#4F46E5]" />
              </div>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center">
            <Link href="/" className="flex items-center shrink-0">
              <span className="font-heading font-bold text-[15px] sm:text-lg leading-none text-foreground tracking-[0.15em] uppercase">Woxly</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex flex-1 justify-end items-center gap-1 sm:gap-2">
            {/* Search */}
            <div className="flex items-center justify-end h-9 w-9 sm:h-10 sm:w-10 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary rounded-full shrink-0 w-9 h-9 sm:w-10 sm:h-10 hover:bg-muted/50"
                asChild
              >
                <Link href="/search">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </Button>
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className={`relative w-9 h-9 sm:w-10 sm:h-10 transition-all duration-300 rounded-full ${pathname === '/cart' ? 'bg-primary/10 text-primary' : 'text-foreground hover:text-primary hover:bg-muted/50'}`}
              asChild
            >
              <Link href="/cart">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {isMounted && itemCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-[18px] sm:w-[18px] items-center justify-center rounded-full bg-[#7c3aed] text-[9px] sm:text-[10px] font-bold text-white border-2 border-background">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <Suspense fallback={
          <div className="sm:hidden fixed  z-50 flex items-center justify-between px-4 h-[66px] bg-white  shadow-[0_8px_30px_rgba(0,0,0,0.25)]" />
        }>
          <MobileBottomNav />
        </Suspense>
      </header>
    </>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const cartCount = useCartStore((state) => state.getItemCount());
  const watchlistCount = useWatchlistStore((state) => state.getWatchlistCount());
  const { toggleCart } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string, tab?: string) => {
    if (tab) return pathname === path && tabParam === tab;
    if (path === '/account') return pathname === path && (!tabParam || tabParam === 'details');
    return pathname === path;
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[68px] bg-white border-t border-r rounded-tr-2xl border-t border-l rounded-tl-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">

      {/* Home */}
      <Link href="/" className="relative flex flex-col items-center justify-center gap-1 w-12">
        <Home
          className={`w-[22px] h-[22px] transition-all ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}
          strokeWidth={isActive('/') ? 2.5 : 2}
        />
      </Link>

      {/* Wishlist */}
      <Link href="/watchlist" className="relative flex flex-col items-center justify-center gap-1 w-12 mr-6">
        <Heart
          className={`w-[22px] h-[22px] transition-all ${isActive('/watchlist') ? 'text-primary' : 'text-gray-400'}`}
          strokeWidth={isActive('/watchlist') ? 2.5 : 2}
        />
        {isMounted && watchlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-[16px] min-w-[16px] px-1 items-center justify-center rounded-full bg-[#ff4d4f] text-[9px] font-bold text-white border-2 border-white">
            {watchlistCount > 9 ? '9+' : watchlistCount}
          </span>
        )}
      </Link>

      {/* Center Action Button ↗ */}
      <button
        onClick={toggleCart}
        className="absolute left-1/2 -top-5 -translate-x-1/2 flex items-center justify-center w-[58px] h-[58px] rounded-full bg-primary text-white shadow-lg border-[5px] border-[#f4f4f5] transition-transform active:scale-95 z-50"
      >
        <Link href={'/shop'}>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="text-white text-xl rotate-[-45deg]"
            strokeWidth={2}
          />
        </Link>
      </button>

      {/* Orders */}
      <Link href="/account?tab=orders" className="relative flex flex-col items-center justify-center gap-1 w-12 ml-6">
        <Package
          className={`w-[22px] h-[22px] transition-all ${isActive('/account', 'orders') ? 'text-primary' : 'text-gray-400'}`}
          strokeWidth={isActive('/account', 'orders') ? 2.5 : 2}
        />
      </Link>

      {/* Account */}
      <Link href="/account" className="relative flex flex-col items-center justify-center gap-1 w-12">
        <User
          className={`w-[22px] h-[22px] transition-all ${isActive('/account') ? 'text-primary' : 'text-gray-400'}`}
          strokeWidth={isActive('/account') ? 2.5 : 2}
        />
      </Link>

    </div>
  );
}
