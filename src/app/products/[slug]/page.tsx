"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";


import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { toast } from "sonner";
import { showCustomToast } from "@/components/ui/custom-toast";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { Button } from "@/components/ui/button";

import { IconTruckReturn, IconShieldCheck, IconTruckDelivery } from "@tabler/icons-react";
import {
  Star,
  Truck,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Percent,
  BadgePercent,
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  CheckCircle2,
  Flame,
  Share2,
  ZoomIn,
  Package,
  MapPin,
  Megaphone,
  Zap,
  Paperclip,
  Flag,


  X,
  User,
  Clock,
  ChevronDown,
} from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.29 5.29 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const router = useRouter();

  const [showStickyCTAs, setShowStickyCTAs] = useState(false);
  const inPageCTARef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTAs when the in-page CTA is NOT visible
        setShowStickyCTAs(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    const currentRef = inPageCTARef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0] || "Brown"
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    "S"
  );
  const [selectedBundle, setSelectedBundle] = useState<number>(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenReview, setFullscreenReview] = useState<{ review: any, index: number } | null>(null);
  const [showCombo, setShowCombo] = useState(true);
  const [isComboSelected, setIsComboSelected] = useState(false);

  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({ loop: true });
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({ loop: true });

  const onSelectMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    setImageIndex(emblaApiMobile.selectedScrollSnap());
  }, [emblaApiMobile, setImageIndex]);

  const onSelectDesktop = useCallback(() => {
    if (!emblaApiDesktop) return;
    setImageIndex(emblaApiDesktop.selectedScrollSnap());
  }, [emblaApiDesktop, setImageIndex]);

  useEffect(() => {
    if (!emblaApiMobile) return;
    emblaApiMobile.on("select", onSelectMobile);
  }, [emblaApiMobile, onSelectMobile]);

  useEffect(() => {
    if (!emblaApiDesktop) return;
    emblaApiDesktop.on("select", onSelectDesktop);
  }, [emblaApiDesktop, onSelectDesktop]);

  useEffect(() => {
    if (emblaApiMobile && emblaApiMobile.selectedScrollSnap() !== imageIndex) {
      emblaApiMobile.scrollTo(imageIndex);
    }
    if (emblaApiDesktop && emblaApiDesktop.selectedScrollSnap() !== imageIndex) {
      emblaApiDesktop.scrollTo(imageIndex);
    }
  }, [imageIndex, emblaApiMobile, emblaApiDesktop]);

  const [pincode, setPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null);
  const [pinLocation, setPinLocation] = useState<string>("");
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  const handleCheckPincode = async () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN");
      return;
    }
    setIsCheckingPin(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data && data[0] && data[0].Status === "Success") {
        setPinLocation(data[0].PostOffice[0].District);
      } else {
        setPinLocation("Unknown Location");
      }
    } catch (e) {
      setPinLocation("Unknown Location");
    }
    setCheckedPincode(pincode);
    setIsCheckingPin(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", {
        description: "Product link copied to clipboard.",
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-5 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(product.id);
  const colorMap: Record<string, string> = {
    Black: "#1f2937",
    Silver: "#c0c0c0",
    Brown: "#8B5E3C",
    "Light Brown": "#C4A484",
    White: "#f5f5f5",
    Blue: "#3b82f6",
    Red: "#ef4444",
  };
  const colorLabels = product?.colors || ["Brown", "Light Brown", "Black"];
  const colors = colorLabels.map((c) => colorMap[c] || "#8B5E3C");
  const sizeLabels = ["S", "M", "L", "XL", "XXL"];
  const gallery = [
    product.image,
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
  ];
  const originalPrice = product.originalPrice;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 8);

  const comboProduct2 = relatedProducts[0] || {
    id: "combo-orange-juice",
    name: "Fresh Orange Juice",
    price: 119,
    originalPrice: 119,
    image: "/images/product_placeholder.png",
    slug: "combo-orange-juice"
  };

  const comboProduct3 = relatedProducts[1] || {
    id: "combo-sparkling-water",
    name: "Sparkling Water 1L",
    price: 95,
    originalPrice: 95,
    image: "/images/product_placeholder.png",
    slug: "combo-sparkling-water"
  };

  const comboExtraItemsTotal = comboProduct2.price + comboProduct3.price;
  const comboOriginalTotal = product.price + comboExtraItemsTotal;
  const comboDiscountedTotal = Math.round(comboOriginalTotal * 0.85);

  const currentPrice = isComboSelected ? comboDiscountedTotal : product.price;
  const currentOriginalPrice = isComboSelected ? comboOriginalTotal : originalPrice;
  const discountPercentage = currentOriginalPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!quantity || quantity < 1) {
      toast.error("Please select a quantity");
      return;
    }

    if (isComboSelected) {
      const mainComboItem = {
        ...product,
        price: Math.round(product.price * 0.85),
        originalPrice: product.price,
      };
      addItem(mainComboItem, quantity, selectedColor, product.sizes?.[0]);

      const item2: any = {
        ...comboProduct2,
        price: Math.round(comboProduct2.price * 0.85),
        originalPrice: comboProduct2.price,
      };
      addItem(item2, quantity);

      const item3: any = {
        ...comboProduct3,
        price: Math.round(comboProduct3.price * 0.85),
        originalPrice: comboProduct3.price,
      };
      addItem(item3, quantity);

      showCustomToast({
        title: <><strong>You</strong> just <strong>added</strong> a combo to cart</>,
        image: product.image,
        buttonText: "View Cart",
        onClick: () => router.push('/cart'),
      });
    } else {
      addItem(product, quantity, selectedColor, product.sizes?.[0]);
      showCustomToast({
        title: <><strong>You</strong> just <strong>added</strong> a {product.name.split(" ")[0]} to cart</>,
        image: product.image,
        buttonText: "View Cart",
        onClick: () => router.push('/cart'),
      });
    }
  };

  const handleBuyNow = () => {
    if (!quantity || quantity < 1) {
      toast.error("Please select a quantity");
      return;
    }
    addItem(product, quantity, selectedColor, product.sizes?.[0]);
    router.push("/cart");
  };

  const reviews = [
    {
      name: "Sinsar Dg",
      date: "Apr, 2026",
      rating: 5,
      title: "Best and Fresh",
      text: "Very fresh Atlantic salmon, no fishy smell at all. The cut was generous and cooked beautifully. Highly recommend.",
      verified: false,
      images: ["/images/product_placeholder.png"]
    },
    {
      name: "Sunitha KV",
      date: "Apr, 2026",
      rating: 5,
      title: "Best salmon I have ordered online",
      text: "",
      verified: true
    },
    {
      name: "Rahul",
      date: "Apr, 2026",
      rating: 4,
      title: "Good quality fish",
      text: "Nice thick fillet, good colour. Cooked it the same day and it was delicious. Delivery was quick too.",
      verified: false,
      images: ["/images/product_placeholder.png", "/images/product_placeholder.png"]
    },
    {
      name: "Priya Nair",
      date: "Apr, 2026",
      rating: 5,
      title: "Fresh and perfectly cut",
      text: "The salmon arrived very fresh. Cooked it pan-seared with lemon and it was restaurant quality. Will definitely order again.",
      verified: true
    }
  ];

  const renderReviewsTab = () => (
    <div className="flex flex-col mt-2">
      <h3 className="font-bold text-lg mb-6">Customer reviews</h3>

      {/* Rating Overview */}
      <div className="flex flex-row items-center gap-4 sm:gap-10 py-6 border-y border-gray-100 mb-6">
        <div className="flex flex-col items-center w-24 sm:w-32 shrink-0">
          <span className="text-4xl font-bold text-gray-900 mb-1">{product.rating || "0"}</span>
          <div className="flex items-center gap-0.5 sm:gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(product.rating || 0)
                  ? "fill-[#f89820] text-[#f89820]"
                  : "fill-gray-200 text-gray-200"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-[13px] text-gray-400">{product.reviews || 0} reviews</span>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-20 bg-gray-100 shrink-0"></div>

        <div className="flex-1 w-full max-w-[280px] space-y-2 pl-2 sm:pl-0">
          {[
            { stars: 5, percent: 75, count: 3 },
            { stars: 4, percent: 25, count: 1 },
            { stars: 3, percent: 0, count: 0 },
            { stars: 2, percent: 0, count: 0 },
            { stars: 1, percent: 0, count: 0 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 w-6 sm:w-8 shrink-0 justify-end">
                <span className="text-xs font-medium text-gray-700">{bar.stars}</span>
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#f89820] text-[#f89820]" />
              </div>
              <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-[#f4eefc] overflow-hidden">
                <div
                  className="h-full bg-[#f89820] rounded-full"
                  style={{ width: `${bar.percent}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 w-3 sm:w-4 text-right">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col">
        {reviews.map((review, idx) => (
          <div key={idx} className="flex gap-4 p-5 mb-4 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#f3edff] text-[#8b5cf6] flex items-center justify-center text-xs font-bold shrink-0 uppercase">
              {review.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[#00a859] text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#00a859] text-white" />
                        Verified buyer
                      </span>
                    )}
                    {review.verified && <span className="text-gray-300 text-[10px]">•</span>}
                    <span className="text-[11px] text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < (review.rating || 5)
                      ? "fill-[#f89820] text-[#f89820]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
              {review.title && (
                <h4 className="text-[13px] font-bold text-gray-900 mb-1.5">{review.title}</h4>
              )}
              {review.text && (
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                  {review.text}
                </p>
              )}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-2">
                  {review.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setFullscreenReview({ review, index: i })}
                      className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 border border-gray-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                    >
                      <Image src={img} alt={`Review image ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 text-[13px] text-gray-500">
        <Link href="/login" className="text-[#8b5cf6] underline hover:text-[#7c3aed] transition-colors">Sign in</Link> to leave a review.
      </div>
    </div>
  );

  const renderRecentlyViewed = (isDesktop = false) => {
    const containerClasses = isDesktop
      ? "py-10 mt-6 bg-[#F7F5FF] rounded-[32px] px-8 sm:px-12 -mx-6 sm:-mx-12 lg:mx-0"
      : " bg-[#F7F5FF] pt-5 pb-8 px-2";

    const titleClasses = isDesktop
      ? "text-2xl font-bold text-black mb-8"
      : "text-[16px] font-bold text-black mb-4";

    const gridClasses = isDesktop
      ? "grid grid-cols-2 md:grid-cols-4 gap-6"
      : "flex gap-2 overflow-x-auto hide-scrollbar pb-2";

    const cardClasses = isDesktop
      ? "relative w-full bg-white rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer"
      : "relative w-[140px] shrink-0 bg-white rounded-2xl overflow-hidden h-[150px] cursor-pointer";

    const titleTextClasses = isDesktop
      ? "text-[16px] font-bold truncate leading-tight mb-1"
      : "text-[12px] font-bold truncate leading-tight mb-0.5";

    const descTextClasses = isDesktop
      ? "text-[12px] text-white/80 line-clamp-2 leading-snug"
      : "text-[9px] text-white/80 line-clamp-1 leading-tight";

    const contentPadding = isDesktop ? "p-5" : "p-3";

    return (
      <div className={containerClasses}>
        <div className={`flex items-center justify-between ${isDesktop ? 'mb-8' : 'mb-4'}`}>
          <h2 className={titleClasses.replace(' mb-8', '').replace(' mb-4', '')}>Related Products</h2>

          <Link href="/shop" className="text-[12px] sm:text-sm font-medium text-white/80 hover:text-white">
            View all
          </Link>

        </div>
        <div className={gridClasses}>
          {relatedProducts.slice(0, 4).map((rp) => (
            <div
              key={rp.id}
              className={cardClasses}
              onClick={() => router.push(`/products/${rp.slug}`)}
            >
              <div className="relative w-full h-full">
                <Image src={rp.image} alt={rp.name} fill className={`object-cover ${isDesktop ? 'group-hover:scale-105 transition-transform duration-500' : ''}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Offer Badges */}
                <div className="absolute top-2 left-0 z-20 flex flex-col gap-1.5 items-start pointer-events-none">
                  {rp.isHotSale && <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase rounded-r shadow-sm">HOT</div>}
                  {rp.isNewArrived && <div className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase rounded-r shadow-sm">NEW</div>}
                  {rp.isLimited && <div className="bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase rounded-r shadow-sm">LTD</div>}
                  {rp.isSale && <div className="bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase rounded-r shadow-sm">SALE</div>}
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 ${contentPadding} text-white z-10`}>
                <p className={titleTextClasses}>{rp.name}</p>
                <p className={descTextClasses}>{rp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
              </div>
            </div>
          ))}
        </div>




      </div>
    );
  };

  const renderDeliveryDetails = () => (
    <div className="mb-6 mt-4 bg-gray-200 p-1 rounded-sm py-3">
      <h3 className="text-[14px] sm:text-[15px] font-medium text-center text-gray-800 mb-2">
        Check delivery at your pincode
      </h3>

      {!checkedPincode ? (
        <div className="bg-[#f4f4f5] p-3 sm:p-4 rounded-sm mx-1 sm:mx-0">
          <div className="flex bg-white border border-gray-400 rounded-sm overflow-hidden p-1">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="flex-1 h-[34px] px-3 text-[14px] text-gray-700 focus:outline-none placeholder:text-gray-500"
            />
            <button
              onClick={handleCheckPincode}
              disabled={isCheckingPin || pincode.length !== 6}
              className="h-[34px] px-4 gap-2 bg-[#3f3f46] hover:bg-[#27272a] text-white rounded-sm text-[12px] font-medium transition-colors flex items-center justify-center tracking-wider"
            >
              {isCheckingPin ? "..." : "submit "}
              <ChevronRight className="w-3 h-3 -mr-2 text-white" />

            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border border-gray-200 rounded-md overflow-hidden shadow-sm mx-1 sm:mx-0">
          <div className="p-4 bg-[#faf5ff] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#8b5cf6] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[14px] text-gray-900 leading-tight">{pinLocation}, {checkedPincode}</p>
              <button
                onClick={() => setCheckedPincode(null)}
                className="text-[13px] text-[#8b5cf6] hover:underline font-medium mt-1 flex items-center gap-1"
              >
                Change delivery location <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-[#f3f4f6] flex items-start gap-3 bg-white">
            <Truck className="w-5 h-5 text-gray-800 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-[14px] text-gray-900 leading-tight">Delivery by Aug 14, 2026</p>
              <p className="text-[13px] text-gray-500 mt-1">₹53.36 delivery · Ekart Logistics Surface</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFrequentlyBoughtTogether = () => {
    if (!showCombo) return null;

    return (
      <div className="relative border border-gray-100 rounded-[4px] bg-white p-5 lg:p-6 mt-4 mb-6 shadow-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] mx-2 sm:mx-0">
        <button
          onClick={() => setShowCombo(false)}
          className="absolute top-4 right-4 lg:top-5 lg:right-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-5 lg:mb-6 gap-4 pr-8">
          <div className="flex items-start lg:items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff2e55] shrink-0 lg:mt-0 mt-0.5" strokeWidth={2.5} />
            <h3 className="text-[15px] lg:text-[18px] font-extrabold text-gray-900 leading-tight lg:leading-normal">
              Frequently Bought Together
            </h3>
          </div>
          <span className="bg-[#e8fbf3] text-[#059669] text-[11px] lg:text-[13px] font-bold px-3 py-1.5  leading-tight w-fit shrink-0">
            Save 15% on Combo
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1">
          <div className="flex items-center justify-between w-full lg:w-auto pb-2 gap-1 sm:gap-2">
            <div className="flex-1 lg:flex-none lg:min-w-[200px] flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 p-1.5 sm:p-2 bg-gray-50/50 rounded-xl lg:bg-transparent lg:p-3 lg:rounded-none text-center lg:text-left overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-lg bg-white lg:bg-gray-50 flex items-center justify-center shrink-0 p-1 border border-gray-100 lg:border-none shadow-sm lg:shadow-none">
                {product.image ? (
                  <img src={product.image} alt="Product" className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <Package className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden w-full">
                <span className="text-[10px] sm:text-[12px] lg:text-[14px] font-bold text-gray-900 leading-tight truncate w-full">{product.name}</span>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-medium text-gray-500 mt-0.5 lg:mt-1 w-full truncate">₹{Math.round(product.price * 0.85).toFixed(0)}</span>
              </div>
            </div>

            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" strokeWidth={2.5} />

            <div className="flex-1 lg:flex-none lg:min-w-[200px] flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 p-1.5 sm:p-2 bg-gray-50/50 rounded-xl lg:bg-transparent lg:p-3 lg:rounded-none text-center lg:text-left overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-lg bg-white lg:bg-gray-50 flex items-center justify-center shrink-0 p-1 border border-gray-100 lg:border-none shadow-sm lg:shadow-none">
                {comboProduct2.image ? (
                  <img src={comboProduct2.image} alt={comboProduct2.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <Package className="w-6 h-6 text-orange-200" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden w-full">
                <span className="text-[10px] sm:text-[12px] lg:text-[14px] font-bold text-gray-900 leading-tight truncate w-full">{comboProduct2.name}</span>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-medium text-gray-500 mt-0.5 lg:mt-1 w-full truncate">₹{Math.round(comboProduct2.price * 0.85).toFixed(0)}</span>
              </div>
            </div>

            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" strokeWidth={2.5} />

            <div className="flex-1 lg:flex-none lg:min-w-[200px] flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 p-1.5 sm:p-2 bg-gray-50/50 rounded-xl lg:bg-transparent lg:p-3 lg:rounded-none text-center lg:text-left overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-lg bg-white lg:bg-gray-50 flex items-center justify-center shrink-0 p-1 border border-gray-100 lg:border-none shadow-sm lg:shadow-none">
                {comboProduct3.image ? (
                  <img src={comboProduct3.image} alt={comboProduct3.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <Package className="w-6 h-6 text-green-200" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden w-full">
                <span className="text-[10px] sm:text-[12px] lg:text-[14px] font-bold text-gray-900 leading-tight truncate w-full">{comboProduct3.name}</span>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-medium text-gray-500 mt-0.5 lg:mt-1 w-full truncate">₹{Math.round(comboProduct3.price * 0.85).toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-gray-100 mt-6 pt-5 lg:mt-0 lg:pt-0 lg:pl-6 flex items-center justify-between lg:justify-end gap-3 sm:gap-6 lg:gap-8 shrink-0">
            <div className="flex flex-col items-start lg:items-start shrink-0">
              <span className="text-[12px] lg:text-[13px] text-gray-500 mb-0.5 ">Combo Total</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[18px] lg:text-[22px] font-extrabold text-gray-900 leading-none">₹{comboDiscountedTotal}</span>
                <span className="text-[13px] lg:text-[15px] font-medium text-gray-400 line-through">₹{comboOriginalTotal.toFixed(0)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsComboSelected(!isComboSelected)}
              className={`${isComboSelected ? "bg-white text-black border-2 border-black" : "bg-primary text-white hover:bg-black border-2 border-white"} px-3 sm:px-6 lg:px-8 py-3.5 lg:py-4 rounded-[12px] lg:rounded-[14px] font-bold text-[13px] lg:text-[15px] transition-all shadow-md whitespace-nowrap text-center flex-1 sm:flex-none sm:min-w-[180px] ml-2`}
            >
              {isComboSelected ? "Combo Selected ✓" : "Select Combo"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderOfferTickets = () => {
    const tickets = [
      {
        id: 1,
        type: "Voucher",
        expiry: "Valid Until 5.16.20",
        icon: ShoppingBag,
        title: "First Purchase",
        subtitle: "5% off for your next order",
      },
      {
        id: 2,
        type: "Voucher",
        expiry: "Valid Until 6.20.20",
        icon: Package,
        title: "Gift From Customer Care",
        subtitle: "15% off your next purchase",
      },
    ];

    return (
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 mt-2 mb-6 ml-2 mr-1 sm:mx-0 after:content-[''] after:w-6 sm:after:w-0 after:shrink-0 scrollbar-hide">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="relative w-[300px] sm:w-[320px] shrink-0 snap-start flex flex-col drop-shadow-sm">
            {/* Top Section */}
            <div className="shrink-0 border-[1.5px] border-[#0d4cf9] border-b-0 rounded-t-[10px] bg-white px-4 py-2 flex justify-between items-center">
              <span className="text-[#0d4cf9] font-bold text-[16px]">{ticket.type}</span>
              <span className="bg-[#ffedea] text-gray-900 text-[10px] font-medium px-2.5 py-1 rounded-md">{ticket.expiry}</span>
            </div>

            {/* Divider Row */}
            <div className="shrink-0 relative flex items-center h-5 z-10">
              {/* White background filler */}
              <div className="absolute inset-y-0 left-2.5 right-2.5 bg-white" />

              {/* Dashed Line */}
              <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t-[1.5px] border-dashed border-[#0d4cf9]" />

              {/* Left Cutout */}
              <div className="absolute left-0 top-0 bottom-0 w-2.5 overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-5 h-5 rounded-full bg-transparent shadow-[0_0_0_20px_white]" />
                <div className="absolute right-0 top-0 bottom-0 w-5 h-5 border-[1.5px] border-[#0d4cf9] rounded-full" />
              </div>

              {/* Right Cutout */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-5 h-5 rounded-full bg-transparent shadow-[0_0_0_20px_white]" />
                <div className="absolute left-0 top-0 bottom-0 w-5 h-5 border-[1.5px] border-[#0d4cf9] rounded-full" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex-1 border-[1.5px] border-[#0d4cf9] border-t-0 rounded-b-[10px] bg-white px-4 pb-3 pt-1.5 flex justify-between items-center">
              <div className="flex gap-3 items-start">
                <div className="text-[#0d4cf9] mt-0.5">
                  <ticket.icon className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black text-[15px] leading-tight mb-0.5">{ticket.title}</span>
                  <span className="text-gray-800 text-[11px] leading-tight">{ticket.subtitle}</span>
                </div>
              </div>
              <button className="bg-[#0d4cf9] hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-medium text-[13px] transition-colors shrink-0 ml-2">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className=" min-h-screen overflow-x-hidden">
      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden pb-6 bg-white">
        {/* Main Image Section */}
        <div className="px-4 pt-4">
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden" ref={emblaRefMobile}>
            <div className="flex h-full w-full cursor-grab active:cursor-grabbing">
              {gallery.map((img, idx) => (
                <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    priority={idx === 0}
                    sizes="100vw"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Right Floating Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <button
                onClick={handleShare}
                className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
              >
                <Share2 className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => toggleItem(product)}
                className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
              >
                <Heart className={`w-4 h-4 ${inWatchlist ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                className="w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
              >
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-4 pb-6">
          <div className="w-fit ml-auto flex items-center bg-green-100 rounded-sm gap-1.5 p-1 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">In Stock</span>
          </div>
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-2 gap-4">
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-col-2 items-center gap-2 shrink-0">

              {discountPercentage > 0 && (
                <span
                  className=" text-[#14a800] text-[16px]  flex items-center gap-0.5 font-bold ">
                  <ArrowDown className="w-4 h-4" />
                  {discountPercentage}%
                </span>
              )}

              <span className="text-[20px] font-bold text-primary leading-none">
                ₹{currentPrice.toFixed(0)}
              </span>

            </div>
          </div>

          {/* Description */}
          <p className="text-[12px] text-gray-400 leading-snug mb-3 max-w-[85%]">
            {product.description || "Lorem ipsum dolor sit amet, consectetuer."}

          </p>


          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${star <= Math.floor(Number(product.rating || 4.8))
                  ? "fill-[#fbbd08] text-[#fbbd08]"
                  : "fill-gray-200 text-gray-200"
                  }`}
              />
            ))}
            <span className="text-[13px] font-medium text-gray-500 ml-1.5">{product.rating || "4.8"}</span>
          </div>
          {product.isLimited && (
            <div className="relative flex flex-col items-start mb-6 -mt-6 w-fit ml-auto mr-2 select-none pointer-events-none">
              <div className="relative z-10 flex flex-col items-center rotate-[-4deg] ml-2">
                {/* Dark Banner */}
                <div className="bg-[#1f2022] px-6 py-2 z-10 shadow-sm" style={{ transform: 'skewX(-10deg)' }}>
                  <span className="block font-black text-[10px] tracking-widest text-white uppercase" style={{ transform: 'skewX(10deg)' }}>
                    Limited Offer
                  </span>
                </div>

                {/* Purple Banner */}
                <div className="bg-[#a855f7] px-8 py-1.5 -mt-1 ml-10 z-0 shadow-sm" style={{ transform: 'skewX(-10deg)' }}>
                  <span className="block font-black text-[10px] tracking-widest text-white uppercase" style={{ transform: 'skewX(10deg)' }}>
                    Hurry Up!
                  </span>
                </div>
              </div>

              {/* Clock Icon */}
              <div className="absolute -right-1 -top-2 z-20 bg-white rounded-full border-[4px] border-white flex items-center justify-center w-10 h-10 shadow-sm">
                <Clock className="w-5 h-5 text-[#1f2022]" strokeWidth={2.5} />
              </div>
            </div>
          )}

          {/* Options: Color */}
          {product.category === 'Fashion' && (
            <div className="flex items-center gap-8 mb-5">
              <span className="text-[15px] font-bold text-gray-900 w-16">Color</span>
              <div className="flex gap-3">
                {colorLabels.map((colorName, i) => (
                  <button
                    key={colorName}
                    onClick={() => setSelectedColor(colorName)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedColor === colorName ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                  >
                    <div className="w-full h-full rounded-full " style={{ backgroundColor: colors[i] }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options: Size */}
          {["shirt", "bag", "t-shirt", "jacket", "dress"].some(k => product.name.toLowerCase().includes(k)) && (
            <div className="flex items-center gap-8 mb-5">
              <span className="text-[15px] font-bold text-gray-900 w-16">Size</span>
              <div className="flex flex-wrap gap-2">
                {sizeLabels.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold transition-all border ${selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase options - Conditional */}
          {["oats", "oil", "rice", "pasta", "tea", "coffee"].some(k => product.name.toLowerCase().includes(k)) && (
            <div className="mb-8 mt-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Select Size & Pack</h3>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 w-full">
                {/* Bundle 1 */}
                <button
                  onClick={() => { setSelectedBundle(1); setQuantity(1); }}
                  className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 1 ? "border-primary border-2 bg-gray-200 shadow-md" : "border-gray-300 bg-white  border-2 hover:border-gray-300"}`}
                >
                  {selectedBundle === 1 && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={`font-semibold text-[13px] leading-none  "text-gray-900"}`}>1 Unit</span>
                    <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight`}>
                      ₹{product.price.toFixed(0)}
                    </span>
                    <span className={`text-[11px] font-medium mt-1.5 leading-none text-[#e11d48]`}>
                      Standard pack
                    </span>
                  </div>
                </button>

                {/* Bundle 2 */}
                <button
                  onClick={() => { setSelectedBundle(2); setQuantity(2); }}
                  className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 2 ? "border-primary border-2 bg-gray-200 shadow-md" : "border-gray-300 bg-white  border-2 hover:border-gray-300"}`}
                >
                  {selectedBundle === 2 && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={`font-semibold text-[13px] leading-none ${selectedBundle === 2 ? "text-gray-900" : "text-gray-900"}`}>Pack of 2</span>
                    <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight`}>
                      ₹{Math.round(product.price * 2 * 0.9)}
                    </span>
                    <span className={`text-[11px] font-medium mt-1.5 leading-none text-[#e11d48]`}>
                      Save 10%
                    </span>
                  </div>
                </button>

                {/* Bundle 3 */}
                <button
                  onClick={() => { setSelectedBundle(3); setQuantity(3); }}
                  className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 3 ? "border-primary border-2 bg-gray-200 shadow-md" : "border-gray-300 bg-white  border-2 hover:border-gray-300"}`}
                >
                  {selectedBundle === 3 && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={`font-semibold text-[13px] leading-none ${selectedBundle === 3 ? "text-gray-900" : "text-gray-900"}`}>Pack of 3</span>
                    <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight`}>
                      ₹{Math.round(product.price * 3 * 0.9)}
                    </span>
                    <span className={`text-[11px] font-medium mt-1.5 leading-none text-[#e11d48]`}>
                      Save 10%
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div ref={inPageCTARef} className="flex flex-col gap-3 mb-6 mt-4">

            <div className="flex gap-2 w-full ">
              {/* Quantity */}
              <div className="flex items-center justify-between  shrink-0 w-[120px] ">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center bg-[#3f3f46] text-white rounded-[4px] hover:bg-[#27272a] transition-colors">
                  <Minus className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="text-[16px] font-bold text-gray-900 w-8 text-center  ">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center bg-[#3f3f46] text-white rounded-[4px] hover:bg-[#27272a] transition-colors">
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center ml-2 justify-center gap-2 py-3 border-2 border-gray-500 rounded-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-black" strokeWidth={2.5} />
                <span className="font-bold text-[14px] sm:text-[16px] text-black">Add to cart — ₹{(currentPrice * quantity).toFixed(0)}</span>
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="relative w-full h-[64px] rounded-sm bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-0 flex flex-col items-center justify-center transition-transform active:scale-[0.98] shadow-sm"
            >
              <span className="text-[17px] font-bold leading-tight">Buy Now</span>
              <span className="text-[12px] font-medium text-white/90 mt-0.5 leading-tight">Get it faster</span>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
            </button>
          </div>
        </div>




        {/* Existing contents wrapped in a padding div */}
        <div className="px-5 pt-0 bg-white -mt-3">
          <div className="flex flex-col gap-3 mb-6">

            <div className="pl-6 w-full">
              <button
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                className="relative w-full h-[56px] rounded-br-4xl rounded-tl-4xl border border-rounded-md bg-[#25D366]/70 border border-gray-200 flex flex-col items-center justify-center transition-transform active:scale-[0.98] shadow-sm"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center shadow-md">
                  <div className="w-[38px] h-[38px] bg-white rounded-full absolute" />
                  <WhatsAppIcon className="w-[36px] h-[36px] text-[#25D366] relative z-10" />
                </div>
                <div className="flex flex-col items-center  justify-center pl-6">
                  <span className="text-[15px] font-bold text-gray-900 leading-tight">Enquire on WhatsApp</span>
                  <span className="text-[11px] font-medium text-gray-500 leading-tight mt-0.5">Chat with us for details</span>
                </div>
              </button>
            </div>
          </div>

          {/* Delivery Details Section */}
          {renderDeliveryDetails()}



          <div className="flex overflow-x-auto hide-scrollbar  py-3 divide-x divide-gray-100 mb-6 mt-4  w-full">
            <div className="flex items-center justify-center gap-2.5 px-4 sm:px-6 shrink-0 min-w-[140px]">
              <div className="w-9 h-9 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconTruckDelivery stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e1b4b] leading-tight mb-0.5">Free Delivery</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">On all orders</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 px-4 sm:px-6 shrink-0 min-w-[140px]">
              <div className="w-9 h-9 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconTruckReturn stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e1b4b] leading-tight mb-0.5">No Return</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Check policy</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 px-4 sm:px-6 shrink-0 min-w-[140px]">
              <div className="w-9 h-9 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconShieldCheck stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e1b4b] leading-tight mb-0.5">High Quality</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Premium material</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 px-4 sm:px-6 shrink-0 min-w-[140px]">
              <div className="w-9 h-9 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <BadgeCheck strokeWidth={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e1b4b] leading-tight mb-0.5">Top Brand</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">100% Original</span>
              </div>
            </div>
          </div>


          <div className="border border-gray-200 rounded-[16px] bg-white flex flex-col mt-2">
            <div className="flex flex-col">
              <button
                onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                className="flex items-center justify-between px-4 py-4 w-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00a859]" strokeWidth={1.5} />
                  <span className="text-[12px] font-bold text-black uppercase tracking-wide">WARRANTY & AUTHENTICITY GUARANTEE</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isWarrantyOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {isWarrantyOpen && (
                <div className="px-4 pb-4 pt-1 text-[13px] text-gray-600 leading-relaxed">
                  All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                </div>
              )}
            </div>
            <div className="w-full border-t border-gray-100" />
            <div className="flex flex-col">
              <button
                onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                className="flex items-center justify-between px-4 py-4 w-full hover:bg-gray-50 transition-colors rounded-b-[16px]"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#ff2e55]" strokeWidth={1.5} />
                  <span className="text-[12px] font-bold text-black uppercase tracking-wide">DELIVERY & STORAGE INFORMATION</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isDeliveryOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {isDeliveryOpen && (
                <div className="px-4 pb-4 pt-1 text-[13px] text-gray-600 leading-relaxed">
                  Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Offers & Discounts */}
        <div className="mb-6 mt-6 ml-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
              Offers & Discounts
            </h3>

          </div>

          {renderOfferTickets()}


          {/* Frequently Bought Together */}
          <div className="ml-0 mr-3  lg:ml-0">
            {renderFrequentlyBoughtTogether()}
          </div>

          {/* Tabs: Description / Reviews */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 border-b border-border">
              <button
                onClick={() => setActiveTab("description")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                REVIEWS ({product.reviews || 0})
              </button>
            </div>

            {activeTab === "description" && (
              <p className="text-sm text-foreground leading-relaxed">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style. Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed."}
              </p>
            )}

            {activeTab === "reviews" && renderReviewsTab()}
          </div>


        </div>

        {/* Recently View Section */}
        {renderRecentlyViewed(false)}

        {/* Sticky bottom CTAs — floating card */}
        <AnimatePresence>
          {showStickyCTAs && (
            <motion.div
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "120%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:hidden left-4 right-4 z-50 bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center justify-between border border-gray-100"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[22px] font-extrabold text-gray-900 leading-none">
                    ₹{(currentPrice * quantity).toFixed(0)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                {currentOriginalPrice && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[13px] text-gray-400 line-through font-medium leading-none">
                      ₹{(currentOriginalPrice * quantity).toFixed(0)}
                    </span>
                    <span className="text-[12px] text-[#00a859] font-bold leading-none">
                      You save ₹{((currentOriginalPrice - currentPrice) * quantity).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleAddToCart}
                className="h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-[14px] px-6 shadow-sm border-0"
              >
                Add to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-row gap-12 mb-10">
          <div className="w-[60%] flex flex-col min-w-0">
            <div className="flex gap-4 h-[560px] w-full mb-8">
              <div className="w-20 flex flex-col gap-3 h-full overflow-y-auto pr-1 shrink-0">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden bg-[#f4f4f9] shrink-0 ${imageIndex === i ? "border-2 border-primary opacity-100" : "opacity-60"
                      }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
              <div className="relative flex-1 min-w-0 bg-[#f4f4f9] rounded-xl overflow-hidden" ref={emblaRefDesktop}>
                <div className="flex h-full w-full cursor-grab active:cursor-grabbing">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        priority={idx === 0}
                        sizes="50vw"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Sections moved to Left Column */}
            <div className="flex flex-col gap-8 w-full pr-12 mt-30 ">


              {/* Offers & Discounts Desktop */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                    Offers & Discounts
                  </h3>
                </div>

                {renderOfferTickets()}



              </div>
            </div>
          </div>

          <div className="w-[40%] flex flex-col min-w-0 pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-muted-foreground underline">
                {product.rating || "0"} ({product.reviews || 0} reviews)
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0)
                      ? "fill-[#fbbd08] text-[#fbbd08]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description || "Healthy and nutritious oats to kickstart your day with energy."}
              </p>
              <div className="flex items-center bg-primary/10 rounded-2xl gap-1.5 shrink-0 px-2 py-0.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary">In Stock</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-3xl font-bold text-primary">₹{currentPrice.toFixed(0)}</span>
              {currentOriginalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{currentOriginalPrice.toFixed(0)}
                </span>
              )}
              {/* Green Discount Tag */}
              {discountPercentage > 0 && (
                <span
                  className="bg-[#00a859] text-white text-[12px] font-bold pl-3.5 pr-4.5 py-1 whitespace-nowrap"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Options: Color */}
            {product.category === 'Fashion' && (
              <div className="flex items-center gap-8 mb-6">
                <span className="text-[16px] font-bold text-gray-900 w-20">Color</span>
                <div className="flex gap-3">
                  {colorLabels.map((colorName, i) => (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedColor === colorName ? "ring-2 ring-offset-2 ring-gray-900" : ""}`}
                    >
                      <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: colors[i] }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options: Size */}
            {["shirt", "bag", "t-shirt", "jacket", "dress"].some(k => product.name.toLowerCase().includes(k)) && (
              <div className="flex items-center gap-8 mb-6">
                <span className="text-[16px] font-bold text-gray-900 w-20">Size</span>
                <div className="flex flex-wrap gap-3">
                  {sizeLabels.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold transition-all border ${selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase options - Conditional */}
            {["oats", "oil", "rice", "pasta", "tea", "coffee"].some(k => product.name.toLowerCase().includes(k)) && (
              <div className="mb-8 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Select Size & Pack</h3>
                </div>
                <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 w-full">
                  {/* Bundle 1 */}
                  <button
                    onClick={() => { setSelectedBundle(1); setQuantity(1); }}
                    className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 1 ? "border-white bg-primary/100 shadow-md" : "border-primary bg-white  border-2 hover:border-gray-300"}`}
                  >
                    {selectedBundle === 1 && (
                      <div className="absolute top-2.5 right-2.5">
                        <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className={`font-semibold text-[13px] leading-none ${selectedBundle === 1 ? "text-white" : "text-gray-900"}`}>1 Unit</span>
                      <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight ${selectedBundle === 1 ? "text-[#fde047]" : "text-gray-900"}`}>
                        ₹{product.price.toFixed(0)}
                      </span>
                      <span className={`text-[11px] font-medium mt-1.5 leading-none ${selectedBundle === 1 ? "text-[#fde047]" : "text-[#e11d48]"}`}>
                        Standard pack
                      </span>
                    </div>
                  </button>

                  {/* Bundle 2 */}
                  <button
                    onClick={() => { setSelectedBundle(2); setQuantity(2); }}
                    className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 2 ? "border-white bg-primary/100 shadow-md" : "border-primary bg-white  border-2 hover:border-gray-300"}`}
                  >
                    {selectedBundle === 2 && (
                      <div className="absolute top-2.5 right-2.5">
                        <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className={`font-semibold text-[13px] leading-none ${selectedBundle === 2 ? "text-white" : "text-gray-900"}`}>Pack of 2</span>
                      <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight ${selectedBundle === 2 ? "text-[#fde047]" : "text-gray-900"}`}>
                        ₹{Math.round(product.price * 2 * 0.9)}
                      </span>
                      <span className={`text-[11px] font-medium mt-1.5 leading-none ${selectedBundle === 2 ? "text-[#fde047]" : "text-[#e11d48]"}`}>
                        Save 10%
                      </span>
                    </div>
                  </button>

                  {/* Bundle 3 */}
                  <button
                    onClick={() => { setSelectedBundle(3); setQuantity(3); }}
                    className={`relative p-3 shrink-0 min-w-[130px] rounded-[12px] border text-left transition-all ${selectedBundle === 3 ? "border-white bg-primary/100 shadow-md" : "border-primary bg-white  border-2 hover:border-gray-300"}`}
                  >
                    {selectedBundle === 3 && (
                      <div className="absolute top-2.5 right-2.5">
                        <CheckCircle2 className="w-[18px] h-[18px] text-white fill-primary" strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className={`font-semibold text-[13px] leading-none ${selectedBundle === 3 ? "text-white" : "text-gray-900"}`}>Pack of 3</span>
                      <span className={`font-extrabold text-[17px] mt-1.5 leading-none tracking-tight ${selectedBundle === 3 ? "text-[#fde047]" : "text-gray-900"}`}>
                        ₹{Math.round(product.price * 3 * 0.9)}
                      </span>
                      <span className={`text-[11px] font-medium mt-1.5 leading-none ${selectedBundle === 3 ? "text-[#fde047]" : "text-[#e11d48]"}`}>
                        Save 10%
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 mb-10">
              {product.isLimited && (
                <div className="relative flex flex-col items-center justify-center mb-8 mt-6 w-fit mx-auto sm:ml-6 sm:mx-0 select-none pointer-events-none">
                  {/* Decorative Elements */}
                  <div className="absolute -top-3 left-4 text-[#a855f7] font-light text-2xl leading-none">+</div>
                  <div className="absolute top-1 right-16 w-8 h-[2px] bg-[#1f2022] rotate-[-5deg]"></div>
                  <div className="absolute top-0 left-10 w-16 h-[2px] bg-[#a855f7] rotate-[-10deg]"></div>
                  <div className="absolute -bottom-3 left-6 w-16 h-[2px] bg-[#1f2022] rotate-[-15deg]"></div>
                  <div className="absolute -bottom-5 right-16 w-12 h-[2px] bg-[#a855f7] rotate-[-5deg]"></div>
                  <div className="absolute -bottom-4 right-10 text-[#1f2022] font-light text-2xl leading-none">+</div>
                  <div className="absolute top-6 -left-6 text-[#1f2022] font-light text-2xl leading-none">+</div>
                  {/* Triangles */}
                  <div className="absolute -top-3 right-20 w-4 h-4 border-[2px] border-[#a855f7] rotate-12" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute bottom-2 -left-3 w-3 h-3 border-[2px] border-[#a855f7] rotate-[60deg]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute -bottom-1 -right-2 w-4 h-4 border-[2px] border-[#1f2022] rotate-[120deg]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>

                  <div className="relative z-10 flex flex-col items-center rotate-[-4deg]">
                    {/* Dark Banner */}
                    <div className="bg-[#1f2022] px-6 py-2 z-10 shadow-sm" style={{ transform: 'skewX(-10deg)' }}>
                      <span className="block font-black text-lg sm:text-xl tracking-widest text-white uppercase" style={{ transform: 'skewX(10deg)' }}>
                        Limited Offer
                      </span>
                    </div>

                    {/* Purple Banner */}
                    <div className="bg-[#a855f7] px-8 py-1.5 -mt-1 ml-10 z-0 shadow-sm" style={{ transform: 'skewX(-10deg)' }}>
                      <span className="block font-black text-lg sm:text-xl tracking-widest text-white uppercase" style={{ transform: 'skewX(10deg)' }}>
                        Hurry Up!
                      </span>
                    </div>
                  </div>

                  {/* Clock Icon */}
                  <div className="absolute -right-10 -top-4 z-20 bg-white rounded-full border-[5px] sm:border-[6px] border-[#1f2022] flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shadow-sm">
                    <Clock className="w-7 h-7 sm:w-9 sm:h-9 text-[#1f2022]" strokeWidth={2.5} />
                  </div>
                </div>
              )}

              <div className="flex gap-3 w-full">
                {/* Quantity */}
                <div className="flex items-center justify-between p-1.5 border border-gray-200 rounded-[6px] bg-white shrink-0 w-[120px] shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center bg-[#3f3f46] text-white rounded-[4px] hover:bg-[#27272a] transition-colors">
                    <Minus className="w-4 h-4" strokeWidth={3} />
                  </button>
                  <span className="text-[16px] font-bold text-gray-900 w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center bg-[#3f3f46] text-white rounded-[4px] hover:bg-[#27272a] transition-colors">
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-black rounded-[14px] bg-white hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-black" strokeWidth={2.5} />
                  <span className="font-bold text-[16px] text-black">Add to cart — ₹{(currentPrice * quantity).toFixed(0)}</span>
                </button>

                {/* Watchlist */}
                <button
                  onClick={() => toggleItem(product)}
                  className="w-[56px] shrink-0 rounded-[14px] border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${inWatchlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="relative w-full h-[64px] rounded-[14px] bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-0 flex flex-col items-center justify-center transition-transform active:scale-[0.98] shadow-sm"
              >
                <span className="text-[17px] font-bold leading-tight">Buy Now</span>
                <span className="text-[12px] font-medium text-white/90 mt-0.5 leading-tight">Get it faster</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              </button>

              <div className="pl-6 w-full mt-2">
                <button
                  onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                  className="relative w-full h-[60px] rounded-r-full rounded-l-full bg-[#f4f4f5] border border-gray-200 flex flex-col items-center justify-center transition-transform active:scale-[0.98] shadow-sm"
                >
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[68px] h-[68px] rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-md">
                    <div className="w-[42px] h-[42px] bg-white rounded-full absolute" />
                    <WhatsAppIcon className="w-[50px] h-[50px] text-[#25D366] relative z-10" />
                  </div>
                  <div className="flex flex-col items-center justify-center pl-6">
                    <span className="text-[16px] font-bold text-gray-900 leading-tight">Enquire on WhatsApp</span>
                    <span className="text-[12px] font-medium text-gray-500 leading-tight mt-0.5">Chat with us for details</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery Details Section (Desktop) */}
            {renderDeliveryDetails()}



            {/* Offers & Discounts Desktop */}
            <div className="mb-6 mt-6 hidden block">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                  Offers & Discounts
                </h3>

              </div>






              {renderOfferTickets()}

            </div>
          </div>
        </div>

        {/* Badges & Warranty (Full Width on Desktop) */}
        <div className="mt-8 mb-6 w-full">
          <div className="flex overflow-x-auto hide-scrollbar border border-gray-100 rounded-xl py-3 divide-x divide-gray-100 mb-6 mt-4 bg-white shadow-sm w-full">
            <div className="flex items-center justify-center gap-3 px-6 shrink-0 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconTruckDelivery stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[14px] sm:text-[15px] font-bold text-[#1e1b4b] leading-tight mb-0.5">Free Delivery</span>
                <span className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">On all orders</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-6 shrink-0 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconTruckReturn stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[14px] sm:text-[15px] font-bold text-[#1e1b4b] leading-tight mb-0.5">No Return</span>
                <span className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">Check policy</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-6 shrink-0 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <IconShieldCheck stroke={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[14px] sm:text-[15px] font-bold text-[#1e1b4b] leading-tight mb-0.5">High Quality</span>
                <span className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">Premium material</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-6 shrink-0 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                <BadgeCheck strokeWidth={1.5} className="w-5 h-5 text-[#1e1b4b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[14px] sm:text-[15px] font-bold text-[#1e1b4b] leading-tight mb-0.5">Top Brand</span>
                <span className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">100% Original</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-[16px] bg-white flex flex-col mt-2">
            <div className="flex flex-col">
              <button
                onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                className="flex items-center justify-between px-4 py-4 w-full hover:bg-gray-50 transition-colors rounded-t-[16px]"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00a859]" strokeWidth={1.5} />
                  <span className="text-[12px] font-bold text-black uppercase tracking-wide">WARRANTY & AUTHENTICITY GUARANTEE</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isWarrantyOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {isWarrantyOpen && (
                <div className="px-4 pb-4 pt-1 text-[13px] text-gray-600 leading-relaxed">
                  All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                </div>
              )}
            </div>
            <div className="w-full border-t border-gray-100" />
            <div className="flex flex-col">
              <button
                onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                className="flex items-center justify-between px-4 py-4 w-full hover:bg-gray-50 transition-colors rounded-b-[16px]"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#ff2e55]" strokeWidth={1.5} />
                  <span className="text-[12px] font-bold text-black uppercase tracking-wide">DELIVERY & STORAGE INFORMATION</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isDeliveryOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {isDeliveryOpen && (
                <div className="px-4 pb-4 pt-1 text-[13px] text-gray-600 leading-relaxed">
                  Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Desktop (Full Width) */}
        <div className="mb-10 w-full mt-6">
          {renderFrequentlyBoughtTogether()}
        </div>

        {/* Tabs: Description / Reviews (Full Width on Desktop) */}
        <div className="mb-10 w-[70%]">
          <div className="flex items-center gap-4 mb-4 border-b border-border">
            <button
              onClick={() => setActiveTab("description")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              REVIEWS ({reviews.length})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="pt-2">
              <p className="text-sm text-foreground mb-4 font-medium">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style."}
              </p>
              <p className="text-sm text-foreground">
                Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed.
              </p>
            </div>
          )}

          {activeTab === "reviews" && renderReviewsTab()}
        </div>

        {/* Recently View Section */}
        {renderRecentlyViewed(true)}
      </div>

      {/* ── MANUFACTURER BANNERS ── */}
      <div className=" py-10 lg:py-12 bg-white">
        <div className="container mx-auto px-1 lg:px-6 max-w-7xl">
          <div className="flex flex-col gap-0">
            {/* Banner 1 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 1"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 1</span>
              </div>
            </div>
            {/* Banner 2 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 2"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 2</span>
              </div>
            </div>
            {/* Banner 3 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 3"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            <div className="relative w-full max-w-4xl aspect-square sm:aspect-video mx-4">
              <Image
                src={gallery[imageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Gallery Navigation in Lightbox */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto hide-scrollbar px-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ${imageIndex === i ? "border-2 border-white opacity-100" : "opacity-50 hover:opacity-80"} transition-opacity`}
                >
                  <Image src={img} alt="" fill className="object-cover bg-white" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Image Lightbox */}
      <AnimatePresence>
        {fullscreenReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 sm:bg-black/80 flex items-center justify-center sm:p-8"
            onClick={() => setFullscreenReview(null)}
          >
            {/* Modal Container */}
            <div
              className="relative w-full h-full sm:max-w-6xl sm:h-auto sm:aspect-[16/9] sm:max-h-[85vh] bg-white sm:rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (Desktop & Mobile) */}
              <button
                onClick={() => setFullscreenReview(null)}
                className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-900 bg-white sm:bg-white/80 p-1.5 rounded-full shadow-sm sm:shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image Viewer */}
              <div className="relative w-full sm:w-[65%] h-[50vh] sm:h-full bg-[#f3f3f3] flex items-center justify-center group border-b sm:border-b-0 sm:border-r border-gray-200">



                {fullscreenReview.index > 0 && (
                  <button
                    onClick={() => setFullscreenReview(prev => prev ? { ...prev, index: prev.index - 1 } : null)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20 shadow-md"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {fullscreenReview.index < (fullscreenReview.review.images?.length || 0) - 1 && (
                  <button
                    onClick={() => setFullscreenReview(prev => prev ? { ...prev, index: prev.index + 1 } : null)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20 shadow-md"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                <Image
                  src={fullscreenReview.review.images[fullscreenReview.index]}
                  alt={`Review image ${fullscreenReview.index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 65vw"
                  priority
                />


              </div>

              {/* Right Column: Review Details */}
              <div className="w-full sm:w-[35%] flex flex-col h-[50vh] sm:h-full bg-white overflow-y-auto">
                <div className="p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900">{fullscreenReview.review.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < (fullscreenReview.review.rating || 5)
                            ? "fill-[#f89820] text-[#f89820]"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                    {fullscreenReview.review.verified && (
                      <span className="text-xs font-semibold text-gray-600 ml-1">Verified Purchase</span>
                    )}
                  </div>

                  {fullscreenReview.review.title && (
                    <h4 className="text-[15px] font-bold text-gray-900 mb-2">{fullscreenReview.review.title}</h4>
                  )}

                  {fullscreenReview.review.text && (
                    <p className="text-[14px] text-gray-800 leading-relaxed mb-6">
                      {fullscreenReview.review.text}
                    </p>
                  )}

                  {/* Thumbnails */}
                  {fullscreenReview.review.images && fullscreenReview.review.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {fullscreenReview.review.images.map((img: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => setFullscreenReview(prev => prev ? { ...prev, index: i } : null)}
                          className={`relative w-[68px] h-[68px] rounded-lg overflow-hidden border-2 transition-all ${i === fullscreenReview.index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <Image src={img} alt="" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
