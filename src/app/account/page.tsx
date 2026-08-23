"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, User, MapPin, Star, MessageSquare, LogOut,
  CreditCard, ShoppingBag, TrendingUp, Gift, RefreshCcw, ChevronDown, ChevronUp,
  Camera, Crown, ChevronRight, ArrowLeft, ShieldCheck, Tag, Award,
  Plus, Home, Briefcase, Phone, Trash2, Edit2, Mail, Lock, EyeOff, Save, Eye, Truck, Sparkles
} from "lucide-react";
import { useAddressStore, Address } from "@/store/useAddressStore";
import { useRewardStore } from "@/store/useRewardStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const navItems = [
  { label: "Order History", icon: Package, id: "orders", desc: "View and track all your orders" },
  { label: "Returns", icon: RefreshCcw, id: "returns", desc: "View your return requests and status" },
  { label: "Account Details", icon: User, id: "details", desc: "Manage your personal information" },
  { label: "Addresses", icon: MapPin, id: "address", desc: "Manage your saved addresses" },
  { label: "Reward Coins", icon: Gift, id: "rewards", desc: "View your rewards and offers" },
];

const mockOrders = [
  { id: "WOXLY-10244", date: "12 Jul 2023", status: "Delivered", total: "₹149.99", items: 3 },
  { id: "WOXLY-10198", date: "03 Jun 2023", status: "Processing", total: "₹89.00", items: 1 },
  { id: "WOXLY-10101", date: "15 Apr 2023", status: "Delivered", total: "₹220.50", items: 5 },
];

const PRIMARY = "#2563eb";
const PRIMARY_LIGHT = "#e0f2fe";
const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} style={{ width: "16px", height: "16px", fill: s <= count ? "#f59e0b" : "#e5e7eb", color: s <= count ? "#f59e0b" : "#e5e7eb" }} />
      ))}
    </div>
  );
}



type OrderItem = {
  id: string;
  title: string;
  color: string;
  size: string;
  price: string;
  image: string;
  status: string;
  statusColor: string;
  statusDesc: string;
  date: string;
  refundBox?: boolean;
  refundTitle?: string;
  refundId?: string;
  refundDesc?: string;
  reviewAction?: boolean;
  cancelAction?: boolean;
  returnAction?: boolean;
  trackAction?: boolean;
};

const initialOrders: OrderItem[] = [
  {
    id: "WOXLY-12789",
    title: "Fresh Bananas 1kg",
    color: "",
    size: "1kg",
    price: "₹99",
    image: "/images/product_placeholder.png",
    status: "Processing",
    statusColor: "yellow",
    statusDesc: "Your order is being processed and packed.",
    date: "Jul 20, 2025 • 10:30 AM",
    cancelAction: true,
    trackAction: true,
  },
  {
    id: "WOXLY-12758",
    title: "India Gate Rice 1kg",
    color: "",
    size: "1kg",
    price: "₹249",
    image: "/images/product_placeholder.png",
    status: "Delivered on Jul 17, 2025",
    statusColor: "green",
    statusDesc: "Your item has been delivered",
    date: "Jul 17, 2025 • 08:45 PM",
    reviewAction: true,
    returnAction: true,
  },
  {
    id: "WOXLY-12698",
    title: "Quaker Oats 1kg",
    color: "",
    size: "1kg",
    price: "₹199",
    image: "/images/product_placeholder.png",
    status: "Delivered on Jul 15, 2025",
    statusColor: "green",
    statusDesc: "",
    date: "Jul 15, 2025 • 11:20 AM",
    refundBox: true,
    refundTitle: "Refund Completed",
    refundId: "(Refund ID: CR25103010590619819232002)",
    refundDesc: "Refund was added to your UPI linked bank account on Oct 31 2025, 10:59 AM.",
  },
  {
    id: "WOXLY-10251",
    title: "Extra Virgin Olive Oil 500ml",
    color: "",
    size: "500ml",
    price: "₹509",
    image: "/images/product_placeholder.png",
    status: "Cancelled on Mar 19, 2025",
    statusColor: "red",
    statusDesc: "Your order was cancelled as per your request.",
    date: "Mar 19, 2025 • 09:15 AM",
  }
];

function OrderCard({ order, showCancelBtn = false, showRefundBox = true, onCancel, onReturn }: {
  order: OrderItem;
  showCancelBtn?: boolean;
  showRefundBox?: boolean;
  onCancel?: (id: string) => void;
  onReturn?: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = (color: string) => {
    switch (color) {
      case 'red':
        return { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' };
      case 'yellow':
        return { bg: 'bg-orange-50', text: 'text-orange-500', dot: 'bg-orange-500' };
      default:
        return { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-600' };
    }
  };

  const statusStyles = getStatusStyles(order.statusColor);

  return (
    <div className="p-3   border-b border-gray-200 transition-all hover:shadow-md cursor-pointer mb-4" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex gap-4 sm:gap-6">
        {/* Left: Product Image Box */}
        <div className="relative w-38 h-38 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
          <Image src={order.image} alt={order.title} fill className="object-cover" />
        </div>

        {/* Right: Content container */}
        <div className="flex flex-col flex-1 min-w-0 py-1 relative mt-1 sm:mt-2">
          <div className="flex justify-between items-start mb-1 gap-2 pr-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{order.title}</h3>
            
            <button className="text-gray-400 p-1 hover:text-primary transition-colors shrink-0">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          <p className="text-[11px] sm:text-[13px] text-gray-400 mb-2 truncate max-w-[85%] leading-tight">
            Size: {order.size} • #{order.id.replace('WOXLY-', '')} • {order.date.split('•')[0].trim()}
          </p>

          <div className="text-xl sm:text-lg font-bold text-primary mb-3">
            {order.price}
          </div>

          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className={`${statusStyles.bg} ${statusStyles.text} font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-[12px] flex items-center gap-1.5 w-fit`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`}></span>
              {order.status}
            </div>
            
            {order.trackAction && (
              <Link
                href={`/track-order?id=${order.id}`}
                onClick={(e) => e.stopPropagation()}
                className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[#2563eb] text-[#2563eb] bg-blue-50 hover:bg-blue-100 rounded-lg text-[11px] sm:text-[12px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Track
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-100 mt-4">
              {order.statusDesc && (
                <p className="text-[13px] text-gray-600 mb-3">{order.statusDesc}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {showCancelBtn && order.cancelAction && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onCancel?.(order.id); }}
                    className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-[12px] font-bold transition-colors shadow-sm"
                  >
                    Cancel Order
                  </button>
                )}
                {order.returnAction && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onReturn?.(order.id); }}
                    className="px-4 py-2 border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-[12px] font-bold transition-colors shadow-sm"
                  >
                    Return Item
                  </button>
                )}
                {order.reviewAction && (
                  <button onClick={(e) => e.stopPropagation()} className="px-4 py-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-[12px] font-bold transition-colors shadow-sm flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-gray-400 text-gray-400" /> Rate Product
                  </button>
                )}
              </div>

              {/* Refund Box */}
              {showRefundBox && order.refundBox && (
                <div className="mt-4 bg-[#f8f9fa] border border-gray-100 rounded-xl p-4">
                  <p className="text-[13px] mb-1.5">
                    <span className="font-bold text-gray-900">{order.refundTitle}</span>
                    <span className="text-gray-500 ml-1">{order.refundId}</span>
                  </p>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    {order.refundDesc}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrdersPanel({ orders, onCancel, onReturn }: { orders: OrderItem[], onCancel: (id: string) => void, onReturn: (id: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-[24px] font-extrabold text-gray-900">Order History</h2>
        <p className="text-[14px] text-gray-500 mt-1">Track and view all your past orders</p>
      </div>

      <div className="flex flex-col">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} showCancelBtn={true} onCancel={onCancel} onReturn={onReturn} />
        ))}
      </div>

      <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3.5">
          <div className="w-[50px] h-[50px] rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#16a34a]" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">We've got you covered</h4>
            <p className="text-[12px] text-gray-600 font-medium">For any order related issues,<br className="hidden sm:block" /> our support team is here to help.</p>
          </div>
        </div>
        <Link href="/contact">
          <button className="border border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors shrink-0 w-full sm:w-auto">
            Contact Support
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </Link>
      </div>
    </div>
  );
}

function DetailsPanel() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[24px] font-extrabold text-[#0f172a]">Account Details</h2>
          <p className="text-[14px] text-gray-500 mt-1">Manage your personal information</p>
        </div>
        <div className="relative">
          <div className="w-14 h-14 bg-[#eff6ff] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[#2563eb]" strokeWidth={2} />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#2563eb] rounded-full border-[2px] border-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <Edit2 className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="space-y-4">

          <div>
            <label className="text-[13px] font-bold text-gray-700 mb-2 block">First Name</label>
            <div className="h-12 border border-gray-200 rounded-xl px-4 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
              <User className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input type="text" defaultValue="Jenny" className="text-[14px] text-gray-900 font-medium bg-transparent outline-none flex-1 h-full w-full" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-bold text-gray-700 mb-2 block">Last Name</label>
            <div className="h-12 border border-gray-200 rounded-xl px-4 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
              <User className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input type="text" defaultValue="Wilson" className="text-[14px] text-gray-900 font-medium bg-transparent outline-none flex-1 h-full w-full" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-bold text-gray-700 mb-2 block">Email Address</label>
            <div className="h-12 border border-gray-200 rounded-xl px-4 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
              <Mail className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input type="email" defaultValue="jenny.wilson@email.com" className="text-[14px] text-gray-900 font-medium bg-transparent outline-none flex-1 h-full w-full" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-bold text-gray-700 mb-2 block">Phone Number</label>
            <div className="h-12 border border-gray-200 rounded-xl px-4 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
              <Phone className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input type="tel" defaultValue="+1 234 567 8900" className="text-[14px] text-gray-900 font-medium bg-transparent outline-none flex-1 h-full w-full" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-bold text-gray-700 mb-2 block">New Password (leave blank to keep current)</label>
            <div className="h-12 border border-gray-200 rounded-xl px-4 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
              <Lock className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input type={showPassword ? "text" : "password"} defaultValue="••••••••" className={`text-[14px] text-gray-900 font-medium bg-transparent outline-none flex-1 h-full w-full ${!showPassword ? 'tracking-[4px]' : ''}`} />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye className="w-5 h-5 text-gray-400 shrink-0 cursor-pointer hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-400 shrink-0 cursor-pointer hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="bg-[#eff6ff] rounded-xl p-4 flex gap-3 items-start mt-6 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h4 className="text-[13px] font-bold text-[#2563eb] mb-0.5">Keep your account secure</h4>
            <p className="text-[12px] text-gray-600 font-medium">Use a strong password with a mix of letters, numbers and symbols.</p>
          </div>
        </div>

        <button
          onClick={() => toast.success("Account Details Saved", { description: "Your personal information has been updated successfully." })}
          className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-sm"
        >
          <Save className="w-5 h-5" strokeWidth={2.5} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AddressPanel() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddressStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "+91 ",
      email: "",
      addressLine: "",
      pinCode: "",
      city: "",
      state: "Kerala",
      label: "Home"
    });
    setShowForm(true);
  };

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData(addr);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.addressLine || !formData.pinCode || !formData.phone) return;

    if (editingId) {
      updateAddress(editingId, formData as Address);
      toast.success("Address updated", {
        description: "Your address has been successfully updated.",
      });
    } else {
      addAddress({
        ...formData,
        id: `addr-${Date.now()}`,
        icon: formData.label?.toLowerCase() === "office" ? "office" : "home"
      } as Address);
      toast.success("Address saved", {
        description: "Your new address has been added successfully.",
      });
    }
    setShowForm(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-extrabold text-[#0f172a]">My Addresses</h2>
        <button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              handleAddNew();
            }
          }}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-[14px] flex items-center gap-1.5 transition-colors shadow-sm"
        >
          {showForm ? "Cancel" : <><Plus className="w-4 h-4" strokeWidth={3} /> Add Address</>}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.map((addr, index) => (
          <div key={addr.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-[#eff6ff] rounded-full flex items-center justify-center shrink-0">
                  {addr.label?.toLowerCase() === 'office' ? (
                    <Briefcase className="w-5 h-5 text-[#2563eb]" strokeWidth={2.2} />
                  ) : (
                    <Home className="w-5 h-5 text-[#2563eb]" strokeWidth={2.2} />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[16px] text-gray-900">{addr.label || "Address"}</span>
                  {/* First address is default for demo purposes */}
                  {index === 0 && (
                    <div className="flex items-center gap-1 mt-1 bg-[#eff6ff] text-[#2563eb] px-2 py-0.5 rounded-full text-[11px] font-bold w-fit">
                      <Star className="w-3 h-3" strokeWidth={2.5} /> Default
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(addr)} className="flex flex-col items-center justify-center gap-1 bg-[#f8fafc] hover:bg-[#eff6ff] p-2 sm:px-3 rounded-lg text-[#2563eb] transition-colors">
                  <Edit2 className="w-4 h-4" strokeWidth={2} />
                  <span className="text-[10px] font-bold">Edit</span>
                </button>
                <button onClick={() => deleteAddress(addr.id)} className="flex flex-col items-center justify-center gap-1 bg-[#fef2f2] hover:bg-[#fee2e2] p-2 sm:px-3 rounded-lg text-[#ef4444] transition-colors">
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                  <span className="text-[10px] font-bold">Delete</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {addr.name && (
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-600 font-medium">{addr.name}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span className="text-[14px] text-gray-600 font-medium leading-relaxed">
                  {addr.addressLine}<br />
                  {addr.city}, {addr.state} {addr.pinCode}
                </span>
              </div>
              {addr.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-600 font-medium">{addr.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showForm && (
        <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3.5">
            <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb]" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-[13px] sm:text-[14px] mb-0.5">Your addresses are secure</h4>
              <p className="text-[11px] sm:text-[12px] text-gray-500 font-medium">We use industry-standard encryption<br className="hidden sm:block" /> to keep your information safe.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={2} />
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <p className="text-gray-500 mb-6 text-sm">
            {editingId ? "Update your address details." : "Add a new address for faster checkout."}
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Label <span className="text-gray-400 font-normal">(e.g. Home, Office)</span></label>
              <input type="text" placeholder="Home" value={formData.label || ""} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="w-full rounded-lg border-2 border-gray-200 focus:border-[#8b5cf6] px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Full name <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="text" placeholder="Your name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border-2 border-gray-200 focus:border-[#8b5cf6] px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Mobile number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#8b5cf6] focus-within:ring-4 focus-within:ring-[#8b5cf6]/20 transition-all">
                <button type="button" className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <span className="text-xs text-gray-600 font-medium">↕</span>
                </button>
                <input type="tel" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="flex-1 px-4 py-2.5 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Email address <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
              <p className="text-xs text-gray-500 mt-1.5">Optional. Used for order updates and receipts.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Address <span className="text-red-500">*</span></label>
              <textarea rows={3} value={formData.addressLine || ""} onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Pin code <span className="text-red-500">*</span></label>
              <input type="text" value={formData.pinCode || ""} onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
              {formData.pinCode && formData.pinCode.length > 5 && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">✓ Location found • {formData.city || "Kozhikode"}, {formData.state || "Kerala"}</p>
                  <p className="text-xs text-emerald-600">Delivery via Ekart Logistics Surface</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">City <span className="text-red-500">*</span></label>
                <input type="text" value={formData.city || ""} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">State <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="relative">
                  <select value={formData.state || ""} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-500 bg-gray-50 focus:outline-none">
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Auto-filled from PIN
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button onClick={handleSave} type="button" className="bg-primary hover:bg-primary/90   text-white px-6 py-2.5 rounded-lg font-bold text-sm">
                Save Address
              </button>
              <button onClick={() => setShowForm(false)} type="button" className="text-gray-500 hover:text-gray-900 font-medium text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



function RewardPanel() {
  const { coins, redeemCoins } = useRewardStore();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleRedeem = () => {
    if (coins >= 100) {
      if (redeemCoins(100)) {
        useCartStore.getState().setCouponApplied(true);
        setMessage({ type: 'success', text: "Success! 100 coins redeemed. A 10% discount has been applied to your cart!" });
        toast.success("Coupon applied", {
          description: "10% discount has been applied to your cart.",
        });
      }
    } else {
      setMessage({ type: 'error', text: "You need at least 100 coins to redeem a reward." });
      toast.error("Not enough coins", {
        description: "You need at least 100 coins to redeem a reward.",
      });
    }

    // Auto-clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight">My Reward Coins</h2>
        <p className="text-[13px] font-medium text-gray-500 mt-0.5">Shop more, earn more, save more!</p>
      </div>

      {/* Main Reward Card */}
      <div className="bg-gradient-to-br from-[#0c4a28] to-[#126b3a] rounded-2xl p-5 mb-4 shadow-md relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-1/2 w-2 h-2 bg-yellow-400 rotate-45 rounded-sm opacity-60"></div>
        <div className="absolute top-10 right-4 w-1.5 h-1.5 bg-green-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-8 right-12 w-2 h-2 bg-green-400 rotate-12 rounded-sm opacity-60"></div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#15803d] flex items-center justify-center shrink-0 border border-green-600/30">
              <Gift className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-green-100 text-[10px] font-bold tracking-wider mb-0.5">AVAILABLE BALANCE</span>
              <div className="flex items-center gap-2">
                <span className="text-[34px] font-extrabold text-white leading-none">{coins}</span>
                <span className="bg-[#15803d] text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-green-600/50">Coins</span>
              </div>
              <p className="text-green-100/80 text-[10px] mt-1 font-medium">Keep shopping to earn more coins</p>
            </div>
          </div>
          <div className="relative w-16 h-16 shrink-0 mt-1 mr-2">
            <div className="absolute inset-0 flex items-center justify-center text-[45px] leading-none drop-shadow-md">🪙</div>
          </div>
        </div>

        <button
          onClick={handleRedeem}
          className="w-full bg-white hover:bg-gray-50 text-[#166534] font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 text-[14px]"
        >
          <Gift className="w-4 h-4 text-[#166534]" strokeWidth={2.5} />
          Redeem Now
          <ChevronRight className="w-4 h-4 ml-auto text-gray-300" strokeWidth={3} />
        </button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold border flex items-start gap-2.5 shadow-sm ${message.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
              }`}>
              {message.type === 'success' ? (
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              <p>{message.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#f2fbf5] border border-[#e5f6eb] rounded-xl p-4 flex items-center gap-3.5 mb-7 cursor-pointer hover:bg-green-50/80 transition-colors">
        <div className="w-9 h-9 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0 border border-green-200/50">
          <ShieldCheck className="w-[18px] h-[18px] text-[#166534]" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-[13px]">Save more with Woxly Coins</h4>
          <p className="text-[12px] text-gray-500 mt-0.5 font-medium leading-snug">Use your coins at checkout and get exciting discounts!</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={2} />
      </div>

      <h3 className="font-bold text-gray-900 text-[15px] mb-4">How it works</h3>

      <div className="flex flex-col gap-3 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-4 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
          <div className="w-4 font-bold text-green-600 text-sm flex justify-center">1</div>
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-[18px] h-[18px] text-green-600" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[13px]">Shop</h4>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed font-medium">Earn 1 Woxly Coin for every $10 spent on our store.</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={2.5} />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-4 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
          <div className="w-4 font-bold text-purple-600 text-sm flex justify-center">2</div>
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <Star className="w-[18px] h-[18px] text-purple-600" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[13px]">Review</h4>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed font-medium">Earn extra coins by writing product reviews.</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={2.5} />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-4 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
          <div className="w-4 font-bold text-orange-500 text-sm flex justify-center">3</div>
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <Tag className="w-[18px] h-[18px] text-orange-500" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[13px]">Redeem</h4>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed font-medium">Use your coins to get exclusive discounts.</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={2.5} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#f0fdf4] to-[#f2fbf5]  p-5 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[140px]">
        <div className="flex items-start gap-3.5 relative z-10 ">
          <div className="shrink-0 mt-0.5">
            <Award className="w-8 h-8 text-[#166534]" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-[14px] mb-2.5">Exclusive Benefits</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                <ShieldCheck className="w-[14px] h-[14px] text-[#16a34a] shrink-0" strokeWidth={2.5} />
                Early access to sales
              </li>
              <li className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                <ShieldCheck className="w-[14px] h-[14px] text-[#16a34a] shrink-0" strokeWidth={2.5} />
                Special member-only offers
              </li>
              <li className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                <ShieldCheck className="w-[14px] h-[14px] text-[#16a34a] shrink-0" strokeWidth={2.5} />
                More ways to earn
              </li>
            </ul>
          </div>
        </div>
        {/* Decorative graphic fallback */}
        <div className="absolute right-[-10px] bottom-[-15px] text-[80px] opacity-[0.15] -rotate-12 z-0 filter drop-shadow-sm">
          🛍️
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
function AccountPageInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const isValidTab = tabParam && ['orders', 'returns', 'details', 'address', 'rewards'].includes(tabParam);

  const [activeNav, setActiveNav] = useState(isValidTab ? tabParam : "orders");
  const [showMobileMenu, setShowMobileMenu] = useState(!isValidTab);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const { coins } = useRewardStore();

  useEffect(() => {
    if (tabParam && ['orders', 'returns', 'details', 'address', 'rewards'].includes(tabParam)) {
      setActiveNav(tabParam);
      setShowMobileMenu(false);
    } else {
      setShowMobileMenu(true);
    }
  }, [tabParam]);

  const cancelOrder = (id: string) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
            ...o,
            status: `Cancelled on ${today}`,
            statusColor: "red",
            statusDesc: "Your order was cancelled as per your request.",
            cancelAction: false,
            refundBox: true,
            refundTitle: "Refund Initiated",
            refundId: `(Refund ID: REF${Date.now()})`,
            refundDesc: `A refund of ${o.price} will be credited to your original payment method within 5-7 business days.`,
          }
          : o
      )
    );
  };

  const returnOrder = (id: string) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
            ...o,
            status: `Return requested on ${today}`,
            statusColor: "yellow",
            statusDesc: "Your return request is being processed. A pickup will be scheduled soon.",
            returnAction: false,
            reviewAction: false,
            refundBox: true,
            refundTitle: "Return Requested",
            refundId: `(Return ID: RET${Date.now()})`,
            refundDesc: `Once the item is picked up and verified, a refund of ${o.price} will be credited to your original payment method.`,
          }
          : o
      )
    );
  };

  const panelMap: Record<string, React.ReactNode> = {
    orders: <OrdersPanel orders={orders} onCancel={cancelOrder} onReturn={returnOrder} />,
    returns: <OrdersPanel orders={orders.filter(o => o.status.includes('Return'))} onCancel={cancelOrder} onReturn={returnOrder} />,
    details: <DetailsPanel />,
    address: <AddressPanel />,
    rewards: <RewardPanel />,
    support: <Link href="/contact" />,
  };

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const gridItems = [
    { label: "Orders", icon: Package, id: "orders", color: "text-primary" },
    { label: "Returns", icon: RefreshCcw, id: "returns", color: "text-primary" },
    { label: "Details", icon: User, id: "details", color: "text-primary" },
    { label: "Address", icon: MapPin, id: "address", color: "text-primary" },
    { label: "Rewards", icon: Gift, id: "rewards", color: "text-primary" },
    { label: "Support", icon: MessageSquare, id: "support", color: "text-primary" },
    { label: "Logout", icon: LogOut, id: "logout", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3fc] pb-24 lg:pb-12">
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 lg:pt-8 lg:px-4">

        {/* ── Navigation / Menu ── */}
        <div className={`w-full lg:w-[380px] shrink-0 ${!showMobileMenu ? 'hidden lg:block' : 'block'}`}>

          {/* Greeting Header */}
          <div className="flex items-start gap-3 px-5 pt-8 pb-6">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm relative">
              <Image src="/images/product_placeholder.png" alt="Profile" fill className="object-cover" />
            </div>
            <div className="mt-0.5">
              <h1 className="font-bold text-gray-900 text-[18px]">Good Morning, Jenny.</h1>
              <p className="text-[12px] text-gray-500 mt-0.5 leading-snug pr-4">Have a great day with full of productivity and good vibes!</p>
            </div>
          </div>

          {/* Overview Card */}
          <div className="mx-5 bg-[#eef1ff] rounded-[24px] p-5 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] text-gray-600 font-medium">Today's Overview</span>
              <span className="text-gray-800 font-bold tracking-widest leading-none mb-2">...</span>
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-5">{today}</h2>
            <button
              onClick={() => { setActiveNav('rewards'); setShowMobileMenu(false); }}
              className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white py-3.5 rounded-[16px] font-bold text-[14px] transition-colors"
            >
              View Rewards
            </button>
          </div>

          {/* Quick Actions Grid */}
          <div className="px-5 mb-8">
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
              {gridItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'logout') {
                        // handle logout logic here if needed
                        window.location.href = '/';
                      } else if (item.id === 'support') {
                        window.location.href = '/contact';
                      } else if (['orders', 'returns', 'details', 'address', 'rewards'].includes(item.id)) {
                        setActiveNav(item.id);
                        setShowMobileMenu(false);
                      }
                    }}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-[60px] h-[60px] bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105">
                      <Icon className={`w-[22px] h-[22px] ${item.color}`} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-gray-800">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Promo Cards */}
          <div className="px-5 grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Sparkles className="w-[20px] h-[20px] text-orange-500" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-[13px] text-gray-900 mt-1 mb-4 leading-snug">Have you checked new arrivals?</h3>
              <div className="mt-auto">
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors text-[11px] font-bold px-4 py-2 rounded-full"
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Truck className="w-[20px] h-[20px] text-blue-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-[13px] text-gray-900 mt-1 mb-4 leading-snug">Your order is on the way!</h3>
              <div className="mt-auto">
                <button
                  onClick={() => { setActiveNav('orders'); setShowMobileMenu(false); }}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors text-[11px] font-bold px-4 py-2 rounded-full"
                >
                  Track Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── Main Content panel ── */}
        <div className={`flex-1 px-4 lg:px-0 ${showMobileMenu ? 'hidden lg:block' : 'block'}`}>
          <div className="overflow-hidden p-4 sm:p-6 min-h-[600px] mt-4 lg:mt-0">
            {/* Back button for mobile */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors font-medium text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Overview
            </button>
            {panelMap[activeNav]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]"></div>}>
      <AccountPageInner />
    </Suspense>
  );
}
