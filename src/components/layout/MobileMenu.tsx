"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Home,
  ShoppingBag,
  FileText,
  Info,
  User,
  Heart,
  Package,
  Shield,
  Truck,
  RefreshCcw,
  HelpCircle,
  MessageSquare,
  Mail,
  X,
  ChevronLeft
} from "lucide-react";

const navLinks = [

  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "WISHLIST", href: "/watchlist", icon: Heart },
  { name: "ORDERS", href: "/account", icon: Package },
  { name: "SIGN IN", href: "/login", icon: User },

];



const helpLinks = [
  { name: "PRIVACY POLICY", href: "/privacy", icon: Shield },
  { name: "TERMS OF SERVICE", href: "/terms", icon: FileText },
  { name: "SHIPPING POLICY", href: "/shipping", icon: Truck },
  { name: "RETURN POLICY", href: "/returns", icon: RefreshCcw },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "About", href: "/about", icon: Info },
  { name: "FAQS", href: "/faq", icon: HelpCircle },
  { name: "FEEDBACK", href: "/contact", icon: MessageSquare },
  { name: "CONTACT", href: "/contact", icon: Mail },
];

export function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={(open) => !open && closeMobileMenu()}>
      <SheetContent side="left" className="w-[85%] max-w-[320px] p-0 flex flex-col bg-gradient-to-b from-[#f4f7fb] to-[#eaf2fc] [&>button]:hidden border-0 shadow-2xl">

        <div className="px-7 pt-2 pb-4 shrink-0">
          {/* Top Controls: Mac dots & Close Button */}
          <div className="flex justify-between items-center mb-10">


          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              {/* Approximating the triangle 'A' logo with a 'W' for Woxly */}
              <span className="text-white font-extrabold text-[22px] tracking-tighter leading-none">W</span>
            </div>
            <h2 className="text-[19px] font-extrabold text-black tracking-tight">Woxly</h2>
            <button
              onClick={closeMobileMenu}
              className="ml-auto mr-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-black pr-0.5" strokeWidth={3} />
            </button>
          </div>


          <div className="h-px bg-gray-200/70 w-full mb-6" />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-7 pb-6 hide-scrollbar">

          <h3 className="text-[10px] font-bold text-gray-500/80 tracking-widest mb-4">MENU</h3>

          <nav className="flex flex-col gap-3 mb-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between group py-1.5"
                >
                  <div className="flex items-center gap-5">
                    <Icon
                      className={`w-[20px] h-[20px] transition-colors ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className={`text-[14px] capitalize transition-colors ${isActive ? 'font-bold text-primary' : 'font-semibold text-gray-500 group-hover:text-gray-700'}`}>
                      {link.name.toLowerCase()}
                    </span>
                  </div>
                  {/* Badge example for active link */}
                  {isActive && link.name === "ORDERS" && (
                    <div className="w-5 h-5 bg-[#2563eb] rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">2</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <h3 className="text-[10px] font-bold text-gray-500/80 tracking-widest mb-4 mt-8">HELP & POLICIES</h3>

          <nav className="flex flex-col gap-3">
            {helpLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between group py-1.5"
                >
                  <div className="flex items-center gap-5">
                    <Icon
                      className={`w-[20px] h-[20px] transition-colors ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className={`text-[14px] capitalize transition-colors ${isActive ? 'font-bold text-black' : 'font-semibold text-gray-500 group-hover:text-gray-700'}`}>
                      {link.name.toLowerCase()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

        </div>
      </SheetContent>
    </Sheet>
  );
}
