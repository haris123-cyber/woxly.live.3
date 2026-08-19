"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Percent } from "lucide-react";
import { type Product } from "@/store/useCartStore";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

function OfferLabel({ discountPercentage, originalPrice, price }: { discountPercentage: number, originalPrice?: number, price: number }) {
  if (discountPercentage <= 0) return null;
  const saveAmount = originalPrice ? Math.round(originalPrice - price) : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-opacity duration-300 md:group-hover:opacity-0 pointer-events-none">
      <div className="flex w-full h-[40px] sm:h-[48px] bg-[#ffcc00] relative">
        {/* Slanted red background using clip-path */}
        <div className="absolute inset-0 right-[40px] sm:right-[50px] bg-gradient-to-r from-[#e3000f] to-[#ff5100]" style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }} />

        {/* Content wrapper */}
        <div className="relative flex w-full h-full">
          {/* Left Side Content */}
          <div className="flex-1 flex items-center pl-1.5 sm:pl-3 pr-1 min-w-0">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 shrink-0 mr-1 sm:mr-1.5 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <div className="flex flex-col text-white pt-0.5 overflow-hidden">
              <span className="text-[6px] sm:text-[8px] font-bold uppercase leading-none tracking-wider text-white/90 mb-0.5 whitespace-nowrap truncate">Limited Offer</span>
              <span className="text-[12px] sm:text-[18px] font-extrabold italic leading-none tracking-tight whitespace-nowrap truncate">{discountPercentage}% OFF</span>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="w-[40px] sm:w-[50px] flex flex-col items-center justify-center shrink-0 pr-0.5 sm:pr-1">
            <span className="text-[7px] sm:text-[9px] font-bold text-[#b33a00] leading-none mb-0.5">Save</span>
            <span className="text-[10px] sm:text-[13px] font-extrabold text-[#b33a00] leading-none truncate w-full text-center">₹{saveAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.colors?.[0];
    const defaultSize = product.sizes?.[0];
    addItem(product, 1, defaultColor, defaultSize);
    toast.success("Added to cart");
  };

  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
  const brand = product.brand || product.name.split(" ")[0];

  const isSale = product.isSale || false;
  const isHotSale = product.isHotSale || false;
  const isNewArrived = product.isNewArrived || false;
  const isLimited = product.isLimited || false;

  const bgColors = ["bg-[#fff0f0]", "bg-[#f0f4ff]", "bg-[#fff5eb]", "bg-[#f0fff4]", "bg-[#f9f0ff]"];
  const bgColor = bgColors[(product.id || "").length % bgColors.length];

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group ${layout === 'list' ? 'flex flex-row gap-3 sm:gap-4 bg-white rounded-xl mb-4 p-2' : 'flex flex-col'}`}
    >
      <div className={`${layout === 'list' ? 'w-[120px] sm:w-[160px] shrink-0' : 'w-full'} relative aspect-[1/1] mb-3 sm:mb-4 group`}>
        {/* Background Shape */}
        <div
          className={`absolute inset-0 rounded-[16px] sm:rounded-[20px] sm:rounded-br-[50px] border-t-[4px] border-l-[4px] sm:border-t-[3px] sm:border-l-[3px] border-rgba(255, 255, 255, 1) hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden ${bgColor}`}
        >
          {/* The Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out z-10"
          />

          {/* Badges */}
          <div className="absolute top-4 left-0 z-20 flex flex-col gap-1.5 items-start pointer-events-none">
            {isHotSale && <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] font-bold px-2.5 py-0.5 uppercase rounded-r shadow-sm">HOT</div>}
            {isNewArrived && <div className="bg-emerald-600 text-white text-[8px] font-bold px-2.5 py-0.5 uppercase rounded-r shadow-sm">NEW</div>}
            {isLimited && <div className="bg-zinc-900 text-white text-[8px] font-bold px-2.5 py-0.5 uppercase rounded-r shadow-sm">LTD</div>}
          </div>
        </div>

        {/* Buttons in the cutout */}
        <div className="absolute bottom-1 right-0 sm:bottom-0 -mb-2 sm:right-0 bg-[#f4f3fc] flex p-1 sm:p-2 items-center gap-1 sm:gap-2 z-20 rounded-l-full rounded-r-none">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center bg-white rounded-full p-0.5 pr-2 sm:p-1 sm:pr-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-[#7034ff] rounded-full flex items-center justify-center text-white shrink-0">
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[9px] sm:text-[13px] font-semibold text-zinc-800 ml-1 sm:ml-2">Shop</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
              toast.success(inWatchlist ? "Removed from wishlist" : "Added to wishlist");
            }}
            className={`w-7 h-7 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all shrink-0 ${inWatchlist ? 'text-red-500' : 'text-zinc-800'}`}
          >
            <Heart className={`w-3 h-3 sm:w-5 sm:h-5 ${inWatchlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={layout === 'list' ? 'flex-1 min-w-0 flex flex-col justify-center py-2 pr-2 sm:pr-4 pl-1 sm:pl-2' : 'px-1 sm:px-2 mt-1'}>
        {/* Name */}
        <h3 className="text-xs sm:text-[13px] font-semibold text-zinc-800 leading-tight truncate mb-1">
          {product.name}
        </h3>

        {/* Price + Discount + Rating — all on one line */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs sm:text-sm font-black text-zinc-900 tracking-tight">
            ₹{product.price.toFixed(2).replace(/\.00$/, '')}
          </span>
          {originalPrice && (
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium line-through">
              ₹{originalPrice.toFixed(2).replace(/\.00$/, '')}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-[8px] sm:text-[9px] font-bold text-[#e3000f] bg-red-50 px-1 py-0.5 rounded">
              -{discountPercentage}%
            </span>
          )}
          <span className="ml-auto flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600">{product.rating || "4.8"}</span>
            <span className="text-[8px] sm:text-[9px] text-zinc-400">({product.reviews || 0})</span>
          </span>
        </div>
      </div>

    </Link>
  );
}
