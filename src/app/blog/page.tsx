"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const blogPosts = [
  {
    title: "10 Superfoods to Boost Your Immunity",
    category: "HEALTHY LIVING",
    date: "May 10, 2025",
    readTime: "5 min read",
    image: "/images/blog-health.webp",
  },
  {
    title: "Top 5 Bag Trends You'll Love in 2025",
    category: "FASHION",
    date: "May 8, 2025",
    readTime: "4 min read",
    image: "/images/blog-fashion.webp",
  },
  {
    title: "Easy & Healthy Breakfast Ideas",
    category: "RECIPES",
    date: "May 6, 2025",
    readTime: "6 min read",
    image: "/images/blog-recipe.webp",
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

  // Filtering
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (sortBy === "Newest") return dateB - dateA;
    if (sortBy === "Oldest") return dateA - dateB;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-[60vh]">
      <div className="mb-8">
        <h1 className="font-heading text-[32px] md:text-4xl font-extrabold text-[#001c30] mb-6 tracking-tight">Latest from Our Blog</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[15px] font-medium text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm"
          />
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-[#f8f6fb] rounded-2xl p-2 md:p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? "bg-[#ecdffd] text-[#6d28d9]" 
                    : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-between gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-700 shadow-sm hover:border-gray-300 transition-colors">
              <span>Sorted by <strong className="text-gray-900 font-extrabold">{sortBy}</strong></span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {/* Note: A proper select/dropdown menu goes here. For now, it acts as a toggle. */}
            <select 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-[14px] text-[#556987] font-medium mb-6">
        Showing {sortedPosts.length} of {blogPosts.length} posts
      </div>

      <div className="flex flex-col gap-6">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No posts found matching your criteria.
          </div>
        ) : (
          sortedPosts.map((post, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative w-full sm:w-[240px] md:w-[320px] lg:w-[380px] h-[160px] sm:h-[180px] md:h-[220px] shrink-0 rounded-[14px] overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col py-2 sm:px-2">
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#6d28d9] bg-[#6d28d9]/10 px-2.5 py-1.5 rounded-full w-fit mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl md:text-[22px] font-extrabold text-[#001c30] mb-3 leading-tight max-w-[400px]">
                  {post.title}
                </h2>
                <p className="text-[13px] font-medium text-gray-500 mt-2">
                  {post.date} &bull; {post.readTime}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}