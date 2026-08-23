"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 36,
    seconds: 58,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize a target time for the countdown demo (e.g. 8h 36m from now)
    const targetTime = new Date().getTime() + 8 * 3600000 + 36 * 60000 + 58 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <div className="flex items-center gap-1">
          <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm">08</span>
          <span className="text-white font-bold">:</span>
          <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm">36</span>
          <span className="text-white font-bold">:</span>
          <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm">58</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      <div className="flex items-center gap-1">
        <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-white font-bold">:</span>
        <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-white font-bold">:</span>
        <span className="bg-white text-primary text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
