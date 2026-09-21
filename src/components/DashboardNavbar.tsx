"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  ShoppingCart,
  IndianRupee,
  ArrowDownUp,
  Files,
  BarChart3,
  ChevronDown,
  Bell,
  User,
  Calculator,
  LogOut,
  Settings,
  Building2,
  CheckCircle2,
  HelpCircle,
  FileText,
  Wallet,
  X,
  Sparkles,
  ChevronRight,
  PhoneCall,
  Phone,
  ClipboardList,
  Coins,
  UserPlus,
  Mail,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export type ActiveDashboardTab =
  | "dashboard"
  | "customer-vendor"
  | "products-services"
  | "quotation-estimate"
  | "sale-invoice"
  | "purchase-invoice"
  | "payment"
  | "expense-income"
  | "other-documents"
  | "reports";

export interface DashboardNavbarProps {
  activeTab: ActiveDashboardTab;
  onSelectTab: (tab: ActiveDashboardTab) => void;
  companyName?: string;
  userName?: string;
  selectedFY?: string;
  onChangeFY?: (fy: string) => void;
  onOpenQuickModal?: (type: "invoice" | "customer" | "product" | "payment" | "expense") => void;
  onToggleCalculator?: () => void;
  showCalculator?: boolean;
}

export default function DashboardNavbar({
  activeTab,
  onSelectTab,
  companyName = "Viros Entrepreneurs IT Solutions Private Limited",
  userName = "Abhishek Sharma",
  selectedFY = "F.Y. 2026-2027",
  onChangeFY,
  onOpenQuickModal,
  onToggleCalculator,
  showCalculator = false,
}: DashboardNavbarProps) {
  const router = useRouter();
  const toast = useToast();

  const [showFYDropdown, setShowFYDropdown] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Close floating dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowFYDropdown(false);
      setShowCreateMenu(false);
      setShowNotifications(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.info("Logged out successfully.", { title: "Session Closed" });
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR (BRAND RED THEME)                                       */}
      {/* ========================================================================= */}
      <header className="bg-[#dc2626] text-white py-2 shadow-sm">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-4">

          {/* Left: Company Name & Brand */}
          <div className="flex items-center min-w-0">
            <Link
              href="/dashboard"
              className="text-white hover:text-red-100 transition-colors shrink-0 font-bold text-sm sm:text-base tracking-tight truncate max-w-[320px] lg:max-w-[550px]"
            >
              {companyName}
            </Link>
          </div>

          {/* Right: Actions (Create, F.Y., Calculator, Notifications, User) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0" onClick={(e) => e.stopPropagation()}>

            {/* + CREATE DROPDOWN BUTTON */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateMenu(!showCreateMenu);
                  setShowFYDropdown(false);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white hover:bg-slate-50 text-red-600 font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border-1.5 border-red-600 flex items-center justify-center font-black leading-none text-xs">
                  +
                </div>
                <span>Create</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Create Menu Dropdown */}
              {showCreateMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 text-slate-800">
                  <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Quick Actions
                  </div>
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        onOpenQuickModal?.("invoice");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-red-600" />
                      <span>Sale Invoice</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        onSelectTab("quotation-estimate");
                        toast.info("Opening Quotations & Estimates...");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <ClipboardList className="w-4 h-4 text-amber-600" />
                      <span>Quotation / Estimate</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        toast.info("Opening Purchase Bill creation...");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                      <span>Purchase Bill</span>
                    </button>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        onOpenQuickModal?.("customer");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Customer / Vendor</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        onOpenQuickModal?.("product");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-indigo-600" />
                      <span>Product / Service</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateMenu(false);
                        onOpenQuickModal?.("payment");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Wallet className="w-4 h-4 text-purple-600" />
                      <span>Record Payment</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FINANCIAL YEAR SELECTOR */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFYDropdown(!showFYDropdown);
                  setShowCreateMenu(false);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/95 hover:bg-white text-slate-800 font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>{selectedFY}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* FY Dropdown */}
              {showFYDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 text-slate-800">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Financial Year
                  </div>
                  {["F.Y. 2026-2027", "F.Y. 2025-2026", "F.Y. 2024-2025"].map((fy) => (
                    <button
                      key={fy}
                      onClick={() => {
                        onChangeFY?.(fy);
                        setShowFYDropdown(false);
                        toast.success(`Active Financial Year changed to ${fy}`);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${selectedFY === fy
                          ? "bg-red-50 text-red-600 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      <span>{fy}</span>
                      {selectedFY === fy && <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CALCULATOR TOGGLE BUTTON */}
            <button
              onClick={onToggleCalculator}
              title="Quick Calculator"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${showCalculator
                  ? "bg-white text-[#dc2626]"
                  : "bg-white/15 hover:bg-white/25 text-white"
                }`}
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowCreateMenu(false);
                  setShowFYDropdown(false);
                  setShowUserMenu(false);
                }}
                title="Notifications"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 border-2 border-red-600"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in-50 zoom-in-95 text-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-800">Notifications</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">
                      2 New
                    </span>
                  </div>
                  <div className="space-y-2 py-2">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <div className="font-semibold text-slate-800">14-Day Trial Active</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Your free trial has started. Configure your GST settings now.
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-xs">
                      <div className="font-semibold text-emerald-800">GSTR-1 Due Date Alert</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        Monthly GSTR-1 return filing due on 11th of this month.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* USER PROFILE AVATAR */}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(true);
                  setShowCreateMenu(false);
                  setShowFYDropdown(false);
                  setShowNotifications(false);
                }}
                className="w-8 h-8 rounded-full bg-white text-[#dc2626] font-bold flex items-center justify-center shadow-xs hover:ring-2 hover:ring-white/40 transition-all cursor-pointer text-xs"
              >
                <User className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1.1 PROFILE SIDEBAR DRAWER (SUPER ADMIN STYLE SLIDE-OVER POPUP)           */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
          showUserMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowUserMenu(false)}
      />

      {/* Side Panel Drawer - Smooth Right Slide In */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showUserMenu ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#dc2626] flex items-center justify-center font-bold text-sm shrink-0 ring-2 ring-red-200">
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-slate-900 truncate">{userName}</h3>
              <p className="text-[11px] text-slate-500 truncate">{companyName}</p>
            </div>
          </div>
          <button
            onClick={() => setShowUserMenu(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          {/* 1. PLAN & CREDIT SECTION */}
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Plan</span>
              </div>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                Premium
              </span>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Credit</span>
              </div>
              <span className="text-xs font-extrabold text-slate-900">
                473
              </span>
            </div>
          </div>

          {/* 2. THREE ACTION BUTTONS (ICONS ON LEFT SIDE MATCHING NAVBAR) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setShowUserMenu(false);
                toast.info("Opening Settings", { title: "Settings" });
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer group shadow-2xs"
            >
              <Settings className="w-4 h-4 shrink-0 text-slate-600 group-hover:text-red-600 transition-colors" />
              <span className="text-xs font-bold text-slate-800 truncate">Setting</span>
            </button>

            <button
              onClick={() => {
                setShowUserMenu(false);
                toast.info("Opening Staff Accounts", { title: "Staff Account" });
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer group shadow-2xs"
            >
              <Users className="w-4 h-4 shrink-0 text-slate-600 group-hover:text-red-600 transition-colors" />
              <span className="text-xs font-bold text-slate-800 truncate">Staff Account</span>
            </button>

            <button
              onClick={() => {
                setShowUserMenu(false);
                toast.success("Referral link copied to clipboard!", { title: "Refer a friend" });
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer group shadow-2xs"
            >
              <UserPlus className="w-4 h-4 shrink-0 text-slate-600 group-hover:text-red-600 transition-colors" />
              <span className="text-xs font-bold text-slate-800 truncate">Refer a friend</span>
            </button>
          </div>

          {/* 3. QUICK SUPPORT SECTION (MERGED SIMPLE CARD) */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-slate-900">Quick Support</h4>

            {/* Single Merged Support Contact Card */}
            <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-2xs">
              {/* 1. Call */}
              <a
                href="tel:+918377929141"
                className="p-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">Call Support</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      +91 8377929141
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                  Call →
                </span>
              </a>

              {/* 2. WhatsApp */}
              <a
                href="https://wa.me/917065779141"
                target="_blank"
                rel="noreferrer"
                className="p-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-600">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">WhatsApp</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      +91 7065779141
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                  Chat →
                </span>
              </a>

              {/* 3. Email: it@virosentrepreneurs.com */}
              <a
                href="mailto:it@virosentrepreneurs.com"
                className="p-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">IT Support</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      it@virosentrepreneurs.com
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                  Email →
                </span>
              </a>

              {/* 4. Email: software@virosentrepreneurs.in */}
              <a
                href="mailto:software@virosentrepreneurs.in"
                className="p-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">Software Support</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                      software@virosentrepreneurs.in
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                  Email →
                </span>
              </a>
            </div>

            {/* Knowledge Base Card */}
            <div
              onClick={() => {
                setShowUserMenu(false);
                toast.info("Opening Knowledge Base & FAQ Center", { title: "Knowledge Base" });
              }}
              className="p-3 rounded-lg bg-white hover:bg-slate-50/80 border border-slate-200 transition-colors cursor-pointer group flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    Knowledge Base
                  </div>
                  <div className="text-[10px] text-slate-500">
                    100+ Questions answered with Screenshots
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                View →
              </span>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
          <button
            onClick={() => {
              setShowUserMenu(false);
              handleLogout();
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HORIZONTAL TAB NAVIGATION BAR (ICONS ON LEFT, LABELS ON RIGHT)          */}
      {/* ========================================================================= */}
      <nav className="bg-white border-b border-slate-200 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-stretch min-w-max">

          {/* 1. Dashboard */}
          <button
            onClick={() => onSelectTab("dashboard")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "dashboard"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <LayoutDashboard className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "dashboard" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Dashboard</span>
          </button>

          {/* 2. Customer / Vendor */}
          <button
            onClick={() => onSelectTab("customer-vendor")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "customer-vendor"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <Users className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "customer-vendor" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Customer / Vendor</span>
          </button>

          {/* 3. Products / Services */}
          <button
            onClick={() => onSelectTab("products-services")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "products-services"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <Package className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "products-services" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Products / Services</span>
          </button>

          {/* 4. Quotation / Estimate */}
          <button
            onClick={() => onSelectTab("quotation-estimate")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "quotation-estimate"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <ClipboardList className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "quotation-estimate" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Quotation / Estimate</span>
          </button>

          {/* 5. Sale Invoice */}
          <button
            onClick={() => onSelectTab("sale-invoice")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "sale-invoice"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <Receipt className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "sale-invoice" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Sale Invoice</span>
          </button>

          {/* 5. Purchase Invoice */}
          <button
            onClick={() => onSelectTab("purchase-invoice")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "purchase-invoice"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <ShoppingCart className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "purchase-invoice" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Purchase Invoice</span>
          </button>

          {/* 6. Payment */}
          <button
            onClick={() => onSelectTab("payment")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "payment"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <IndianRupee className={`w-4 h-4 shrink-0 stroke-[2.2] ${activeTab === "payment" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Payment</span>
          </button>

          {/* 7. Expense / Income */}
          <button
            onClick={() => onSelectTab("expense-income")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "expense-income"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <ArrowDownUp className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "expense-income" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Expense / Income</span>
          </button>

          {/* 8. Other Documents */}
          <button
            onClick={() => onSelectTab("other-documents")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "other-documents"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <Files className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "other-documents" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Other</span>
          </button>

          {/* 9. Report */}
          <button
            onClick={() => onSelectTab("reports")}
            className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-center transition-all cursor-pointer border-b-2 border-r border-slate-200 ${activeTab === "reports"
                ? "border-b-[#dc2626] text-[#dc2626] font-bold bg-red-50/30"
                : "border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium"
              }`}
          >
            <BarChart3 className={`w-4 h-4 shrink-0 stroke-[2] ${activeTab === "reports" ? "text-[#dc2626]" : "text-slate-500"}`} />
            <span className="text-xs tracking-tight whitespace-nowrap">Report</span>
          </button>

        </div>
      </nav>
    </div>
  );
}
