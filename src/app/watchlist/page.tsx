"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useCartStore } from "@/store/useCartStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, Trash2, ShieldCheck, MoreVertical, ArrowDown, Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WatchlistPage() {
  const router = useRouter();
  const { items, clearWatchlist, toggleItem } = useWatchlistStore();
  const { addItem } = useCartStore();
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  return (
    <div className="bg-background min-h-screen pt-4 lg:pt-0">

      <div className="container mx-auto px-4 py-4 md:py-12 min-h-[70vh]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-heading">My Watchlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven&apos;t saved any items yet. Explore our products and add them to your watchlist to keep track of what you love.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-md">
              <Link href="/shop">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:flex sm:flex-col w-full bg-white sm:border sm:border-gray-200 rounded-sm">
            {items.map((item) => {
              const price = item.price || 0;
              const originalPrice = price * 1.2; // Mock original price for UI
              const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);

              return (
                <div key={item.id} className="flex flex-col sm:flex-row p-3 sm:p-6 border-b border-gray-200 odd:border-r sm:odd:border-r-0 last:border-b-0 hover:shadow-md transition-shadow relative group">
                  <div className="flex sm:hidden justify-end w-full absolute top-2 right-2 z-10">
                    <button onClick={() => setItemToRemove(item)} className="p-1 rounded-full border border-gray-200 bg-white shadow-sm">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="w-full sm:w-[200px] shrink-0 flex items-center justify-center rounded-sm p-0 sm:p-4 mt-0">
                    <div className="relative w-full aspect-square sm:w-32 sm:h-auto sm:aspect-square rounded-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover sm:object-contain rounded-sm" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1 sm:py-2 sm:px-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <Link href={`/products/${item.slug}`} className="text-[13px] sm:text-[18px] text-gray-800 sm:text-[#2874f0] hover:underline font-medium mb-1 sm:mb-2 block line-clamp-2">
                          {item.name}
                        </Link>

                        <div className="flex items-center flex-wrap gap-1 sm:gap-3 mt-1 sm:mt-0 mb-1 sm:mb-0">
                          {/* Mobile Price */}
                          <div className="flex items-center gap-1 sm:hidden">
                            <span className="text-[#388e3c] text-[11px] font-bold flex items-center">
                              <ArrowDown className="w-3 h-3" />
                              {discountPercentage}%
                            </span>
                            <span className="text-[13px] font-bold text-gray-900 ml-0.5">₹{price.toLocaleString()}</span>
                            <span className="text-gray-400 text-[11px] line-through">₹{originalPrice.toLocaleString()}</span>

                          </div>

                          {/* Desktop Price */}
                          <div className="hidden sm:flex items-center gap-3">
                            <span className="text-2xl font-semibold text-gray-900">₹{price.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                            <span className="text-[#388e3c] text-sm font-bold flex items-center">
                              <ArrowDown className="w-5 h-5" />
                              {discountPercentage}%
                            </span>                            </div>
                        </div>


                      </div>

                      {/* Desktop Remove */}
                      <button
                        onClick={() => setItemToRemove(item)}
                        className="hidden sm:block text-gray-400 hover:text-gray-700 transition-colors p-2"
                        aria-label="Remove from watchlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="sm:hidden mt-auto pt-2 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          addItem(item, 1);
                          toast.success("Added to cart", {
                            description: "Product added successfully.",
                          });
                        }}
                        className="w-full text-primary hover:text-blue-700 hover:bg-blue-50 h-8 text-[13px] font-semibold"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Remove Item</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to remove &quot;{itemToRemove.name}&quot; from your watchlist?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setItemToRemove(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => { toggleItem(itemToRemove); setItemToRemove(null); }}>Remove</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
