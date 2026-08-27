"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex w-full md:w-auto rounded-full overflow-hidden shadow-lg flex-1 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 min-w-0 px-4 sm:px-5 py-3.5 text-[14px] font-medium text-gray-900 bg-white outline-none"
      />
      <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold px-4 sm:px-6 py-3.5 text-[13px] transition-colors whitespace-nowrap shrink-0">
        Subscribe
      </button>
    </div>
  );
}
