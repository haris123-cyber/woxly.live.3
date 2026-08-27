"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, X, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const searchResults = query.trim().length > 0
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.trim().toLowerCase()) || 
        p.category.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  const popularSearches = ["T-shirt", "Dress", "Jeans", "Sneakers", "Grocery", "Apple"];

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 p-1 shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories..."
            className="w-full h-11 bg-gray-50 border-none rounded-full pl-10 pr-10 text-[15px] font-medium focus:ring-1 focus:ring-primary outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6">
        {!query && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Popular Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full text-[13px] font-medium text-gray-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && searchResults.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No results found</h3>
            <p className="text-gray-500 text-sm">We couldn't find anything matching "{query}".</p>
          </div>
        )}

        {query && searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 mb-4">
              Showing {searchResults.length} results for "{query}"
            </h2>
            {searchResults.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-[13px] text-gray-500 truncate">{product.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[15px] font-extrabold text-gray-900">₹{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
