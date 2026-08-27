"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { IconTruckDelivery } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getCartTotal, couponApplied, setCouponApplied } = useCartStore();

  const [coupon, setCoupon] = useState("");
  const [showMobileSummary, setShowMobileSummary] = useState(true);

  const subtotal = getCartTotal();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = 0; // Usually calculated at checkout
  const total = subtotal - discount + shipping;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const amountNeeded = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const checkoutBtnRef = useRef<HTMLButtonElement>(null);

  const cartCategories = Array.from(new Set(items.map(item => item.category)));
  let relatedProducts = PRODUCTS.filter(
    prod => cartCategories.includes(prod.category) && !items.some(item => item.id === prod.id)
  );
  if (relatedProducts.length === 0) {
    relatedProducts = PRODUCTS.filter(p => !items.some(item => item.id === p.id));
  }

  // ── Empty state ──────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-[#f9fafb]">
        <div className="w-24 h-24 rounded-full bg-[#f4eefc] flex items-center justify-center mb-6">
          <ShoppingBag className="w-11 h-11 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our latest products!
        </p>
        <Button asChild size="lg" className="rounded-sm px-8 font-bold bg-primary hover:bg-primary/80">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 pb-8 lg:pb-10 lg:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* ── Left: Items ────────────────────────────── */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Cart</h1>

            {/* Free Shipping Progress Box */}
            <div className="bg-[#f8faf9] hidden lg:block  grid grid-cols-2  p-3 sm:p-4 mb-6 flex items-center gap-3 sm:gap-4 shadow-sm">

              <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                <div className="flex justify-between items-center gap-2 text-[11px] sm:text-[13px]">
                  {amountNeeded > 0 ? (
                    <span className="text-gray-900 font-semibold">
                      Add ₹{amountNeeded.toLocaleString()} more to unlock <strong className="text-[#166534] font-extrabold">FREE shipping!</strong>
                    </span>
                  ) : (
                    <span className="text-gray-900 font-semibold">
                      Congratulations! You get <strong className="text-[#166534] font-extrabold">FREE shipping!</strong>
                    </span>
                  )}
                  {amountNeeded > 0 && (
                    <span className="text-gray-700 font-semibold whitespace-nowrap">
                      ₹{amountNeeded.toLocaleString()} to go
                    </span>
                  )}
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-[#dcfce7]  overflow-hidden">
                  <div
                    className="h-full bg-[#166534]  transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:p-6 bg-white p-2  rounded-md   hover:shadow-md transition-shadow relative group">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 sm:gap-6 border-b border-gray-200 pb-2">
                  <div className="relative w-32 h-32 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 py-1 relative mt-2">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <Link href={`/products/${item.slug}`} className="text-base sm:text-lg font-bold text-gray-900 hover:underline line-clamp-2 leading-tight">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-[13px] text-gray-400 mb-2 truncate max-w-[80%] leading-tight">
                      {[item.selectedColor, item.selectedSize].filter(Boolean).join(" • ") || item.brand || "Lorem ipsum dolor sit amet, consectetuer."}
                    </p>

                    <div className="text-xl sm:text-lg font-bold text-primary mb-3">
                      ₹{((item.price || 0)).toLocaleString()}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded bg-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-3 h-3 font-bold" strokeWidth={3} />
                      </button>
                      <span className="text-sm font-bold text-gray-700 min-w-[12px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-3 h-3 font-bold" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Order Summary ──────────────────── */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-sm p-3 shadow-sm border border-gray-100 lg:sticky lg:top-24 ">

              <div className="bg-[#f8faf9]  block lg:hidden  p-3 sm:p-4 mb-6 flex items-center gap-3 sm:gap-4 shadow-sm">

                <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex justify-between items-center gap-2 text-[11px] sm:text-[13px]">
                    {amountNeeded > 0 ? (
                      <span className="text-gray-900 font-semibold">
                        Add ₹{amountNeeded.toLocaleString()} more to unlock <strong className="text-[#166534] font-extrabold">FREE shipping!</strong>
                      </span>
                    ) : (
                      <span className="text-gray-900 font-semibold">
                        Congratulations! You get <strong className="text-[#166534] font-extrabold">FREE shipping!</strong>
                      </span>
                    )}
                    {amountNeeded > 0 && (
                      <span className="text-gray-700 font-semibold whitespace-nowrap">
                        ₹{amountNeeded.toLocaleString()} to go
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-[#dcfce7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#166534] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Mobile Summary Toggle */}
              <button
                onClick={() => setShowMobileSummary(!showMobileSummary)}
                className="w-full flex justify-between items-center lg:hidden bg-gray-100/80 hover:bg-gray-100 text-gray-800 font-bold text-[15px] py-4 px-5 rounded-sm mb-4 transition-colors"
              >
                <span>Order Summary</span>
                <span>{showMobileSummary ? <ChevronUp className="w-5 h-5" /> : < ChevronDown className="w-5 h-5" />}</span>
              </button>

              <div className={`${showMobileSummary ? 'block' : 'hidden'} lg:block`}>
                <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 text-[15px]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Subtotal
                    </span>

                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-600 font-medium">
                        Discount (10%)
                      </span>

                      <span className="font-semibold text-emerald-600">
                        -₹{discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Shipping
                    </span>

                    <span className="font-semibold text-gray-500 text-sm">
                      Calculated at checkout
                    </span>
                  </div>
                </div>
                {/* Mobile summary wrapper continues to include Promo Code */}

                {/* Promo Code — Mobile + Desktop */}


                <div className="block ">
                  <div className="flex items-center gap-3 py-5   mb-6 px-4">



                    <div className="flex items-center flex-1  overflow-hidden bg-[#fafafa] gap-1 border border-gray-200 rounded-sm  p-1 ">

                      <input
                        type="text"
                        placeholder="Promo code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full bg-transparent   outline-none px-1 py-1 text-sm text-gray-700 placeholder:text-gray-300"
                      />

                      <button
                        onClick={() => {
                          if (coupon.trim()) {
                            setCouponApplied(true);
                          }
                        }}
                        className="bg-[#e5e5e5] hover:bg-[#d4d4d4] text-primary hover:text-gray-900 rounded-sm text-xs font-semibold px-4 py-2 transition-colors h-full"
                      >
                        Apply
                      </button>

                    </div>
                  </div>

                </div>
              </div>

              {/* Total & Checkout Box */}
              <div className="bg-primary rounded-sm p-6 mt-2 shadow-lg  sm:mx-0 lg:-mx-2">
                {/* Free Shipping Progress Box */}

                <div className="flex justify-between items-center mb-6">
                  <span className="text-white font-bold text-lg">Total Price</span>
                  <span className="text-2xl font-bold text-white">₹{total.toLocaleString()}</span>
                </div>

                <Button
                  ref={checkoutBtnRef}
                  onClick={() => router.push("/checkout")}
                  className="w-full h-14 bg-white hover:bg-[#009639] text-black font-bold text-[17px] rounded-full transition-colors flex items-center justify-center shadow-md"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="bg-#F7F5FF rounded-[6px] lg:rounded-[32px] m-1 lg:m-0 mt-8 sm:mt-12 lg:mt-6 pt-5 pb-8 px-2 lg:py-10 lg:px-8 sm:px-12 -mx-6 sm:-mx-12 lg:mx-0">
          <div className="flex ml-2 items-center justify-between mb-4 lg:mb-8">
            <h2 className="text-[16px] lg:text-2xl font-bold text-black">Related Products</h2>
            <Link href="/shop" className="text-[12px] sm:text-sm mr-2 font-medium text-black/80 hover:text-black">
              View all
            </Link>
          </div>

          <div className="flex gap-2 mr-0 ml-2 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-6 lg:overflow-visible">
            {relatedProducts.slice(0, 4).map((rp) => (
              <div
                key={rp.id}
                className="relative w-[140px] shrink-0 h-[150px] lg:w-full lg:aspect-[4/5] lg:h-auto bg-white rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/products/${rp.slug}`)}
              >
                <div className="relative w-full h-full">
                  <Image src={rp.image} alt={rp.name} fill className="object-cover lg:group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-5 text-white">
                  <p className="text-[12px] lg:text-[16px] font-bold truncate leading-tight mb-0.5 lg:mb-1">{rp.name}</p>
                  <p className="text-[9px] lg:text-[12px] text-white/80 line-clamp-1 lg:line-clamp-2 leading-tight lg:leading-snug">{rp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div >
  );
}
