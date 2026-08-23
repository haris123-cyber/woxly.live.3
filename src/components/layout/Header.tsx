"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Menu, Heart, User, Home, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { toggleMobileMenu, isSearchOpen, openSearch, closeSearch } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname === '/login' || pathname === '/signup') return null;

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
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
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
            <div className="relative flex items-center justify-end h-9 w-9 sm:h-10 sm:w-10 z-50">
              <div
                className={`absolute right-0 flex items-center transition-all duration-300 ease-in-out overflow-hidden rounded-full ${isSearchOpen
                  ? 'w-[200px] sm:w-[500px] bg-background border border-border shadow-sm'
                  : 'w-9 sm:w-10 bg-transparent border-transparent'
                  }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-foreground hover:text-primary rounded-full shrink-0 ${isSearchOpen ? 'w-9 h-9 sm:w-10 sm:h-10 hover:bg-transparent' : 'w-9 h-9 sm:w-10 sm:h-10 hover:bg-muted/50'}`}
                  onClick={isSearchOpen ? undefined : openSearch}
                >
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>

                <input
                  autoFocus={isSearchOpen}
                  type="text"
                  placeholder="Search..."
                  className={`h-9 sm:h-10 bg-transparent focus:outline-none text-sm transition-opacity duration-300 ${isSearchOpen ? 'w-full opacity-100 pr-1' : 'w-0 opacity-0 px-0 pointer-events-none'}`}
                />

                {isSearchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={closeSearch}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                )}
              </div>
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
    <div className="sm:hidden fixed bottom-0 left-0 pl-10 pr-10  right-0  z-50 flex items-center justify-between px-5 h-[62px] bg-white  shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-gray-100">

      {/* Home */}
      <Link href="/" className="relative flex flex-col items-center justify-center">
        <Home
          className={`w-[22px] h-[22px] transition-all ${isActive('/') ? 'text-primary' : 'text-zinc-400'}`}
          strokeWidth={isActive('/') ? 2.5 : 1.8}
        />
        {isActive('/') && <span className="absolute -bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
      </Link>

      {/* Wishlist */}
      <Link href="/watchlist" className="relative flex flex-col items-center justify-center">
        <Heart
          className={`w-[22px] h-[22px] transition-all ${isActive('/watchlist') ? 'text-primary' : 'text-zinc-400'}`}
          strokeWidth={isActive('/watchlist') ? 2.5 : 1.8}
        />
        {isMounted && watchlistCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-[15px] min-w-[15px] px-0.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">
            {watchlistCount > 9 ? '9+' : watchlistCount}
          </span>
        )}
        {isActive('/watchlist') && <span className="absolute -bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
      </Link>



      {/* Orders */}
      <Link href="/account?tab=orders" className="relative flex flex-col items-center justify-center">
        <Package
          className={`w-[22px] h-[22px] transition-all ${isActive('/account', 'orders') ? 'text-primary' : 'text-zinc-400'}`}
          strokeWidth={isActive('/account', 'orders') ? 2.5 : 1.8}
        />
        {isActive('/account', 'orders') && <span className="absolute -bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
      </Link>

      {/* Account */}
      <Link href="/account" className="relative flex flex-col items-center justify-center">
        <User
          className={`w-[22px] h-[22px] transition-all ${isActive('/account') ? 'text-primary' : 'text-zinc-400'}`}
          strokeWidth={isActive('/account') ? 2.5 : 1.8}
        />
        {isActive('/account') && <span className="absolute -bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
      </Link>

    </div>
  );
}
