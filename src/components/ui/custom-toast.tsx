import React from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CustomToastProps {
  t: string | number;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  onClick?: () => void;
}

export const CustomToastComponent = ({
  t,
  title,
  subtitle = "Just now",
  image,
  buttonText,
  onClick,
}: CustomToastProps) => {
  return (
    <div className="flex relative ml-auto mr-5 sm:mr-0 w-[320px] sm:w-[350px] items-center gap-3 p-2 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 font-sans">
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute -top-2 -left-2 w-[26px] h-[26px] bg-[#007aff] hover:bg-blue-600 rounded-full flex items-center justify-center border-[2.5px] border-white shadow-sm transition-colors cursor-pointer z-10"
      >
        <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
      </button>
      {image && (
        <div className="relative shrink-0 w-[64px] h-[64px] bg-[#f4f4f5] rounded-[14px] flex items-center justify-center p-1.5 overflow-hidden">
          <img
            src={image}
            alt="Notification"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      )}
      <div className="flex-1 min-w-0 py-0.5">
        <div className="text-[13.5px] text-gray-900 leading-[1.3] pr-1">
          {title}
        </div>
        <div className="flex items-center justify-between mt-1.5 h-[24px]">
          <span className="text-[11.5px] text-gray-400 font-medium">
            {subtitle}
          </span>
          {buttonText && onClick && (
            <button
              onClick={onClick}
              className="px-3.5 py-1 bg-[#ff4d4f] hover:bg-[#ff7875] text-white text-[12px] font-bold rounded-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const showCustomToast = (options: Omit<CustomToastProps, "t">) => {
  toast.custom(
    (t) => <CustomToastComponent t={t} {...options} />,
    {
      unstyled: true,
      className: "!bg-transparent !border-0 !shadow-none !p-0 !w-auto",
    }
  );
};
