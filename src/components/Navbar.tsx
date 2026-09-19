"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ReceiptText,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Zap,
  BarChart3,
  Boxes,
  FileSpreadsheet,
  PhoneCall,
  Sparkles,
  LogIn,
  UserPlus
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Banner with Toll-Free Hotline and Updates */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white text-xs sm:text-sm py-2 px-4 font-medium text-center relative z-50 flex items-center justify-center gap-2 sm:gap-3 shadow-sm whitespace-nowrap overflow-x-auto">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-white/20 text-white font-bold tracking-wide shrink-0">
          GST 2.0 READY
        </span>
        <span className="hidden md:inline">Automated E-Invoicing & E-Way Bill Generation is now Live!</span>
        <span className="md:hidden">E-Invoicing 2.0 Live!</span>

        <span className="text-red-200 hidden lg:inline">|</span>

        <a
          href="tel:18001202455"
          className="hidden lg:inline-flex items-center gap-1 text-xs text-red-100 hover:text-white font-semibold transition-colors shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Toll-Free Sales: 1800-120-BILL</span>
        </a>

        <span className="text-red-200 hidden sm:inline">|</span>

        <a
          href="#demo-widget"
          className="underline hover:text-red-100 inline-flex items-center gap-1 font-bold text-xs sm:text-sm transition-colors shrink-0"
        >
          Try Live Demo <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-red-100 shadow-[0_2px_15px_-3px_rgba(220,38,38,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* Brand Logo - Fixed No Wrap & Proper Alignment */}
            <a href="#" className="flex items-center gap-3 shrink-0 group focus:outline-none select-none">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <ReceiptText className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 text-lg sm:text-xl font-black tracking-tight leading-none whitespace-nowrap">
                  <span className="text-slate-900 group-hover:text-red-600 transition-colors">
                    Your Billing
                  </span>
                  <span className="text-red-600">
                    Software
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Next-Gen Enterprise ERP
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Clean, No-Wrap, Well-Spaced) */}
            <nav className="hidden xl:flex items-center gap-1.5">
              {/* Modules Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setModulesDropdownOpen(true)}
                onMouseLeave={() => setModulesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors cursor-pointer whitespace-nowrap"
                  onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                >
                  <span>Modules</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${modulesDropdownOpen ? "rotate-180 text-red-600" : "text-slate-400"}`} />
                </button>

                {modulesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl p-3 border border-red-100 shadow-xl shadow-red-950/10 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">GST & E-Invoicing</div>
                        <div className="text-xs text-slate-500">1-click B2B IRN generation & GSTR auto-recon</div>
                      </div>
                    </a>

                    <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Multi-Warehouse Inventory</div>
                        <div className="text-xs text-slate-500">Batch tracking, barcode scanning & reorders</div>
                      </div>
                    </a>

                    <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Financial Accounting</div>
                        <div className="text-xs text-slate-500">Instant Balance Sheet, P&L & Bank sync</div>
                      </div>
                    </a>

                    <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">POS Rapid Billing</div>
                        <div className="text-xs text-slate-500">Counter billing under 3 seconds per customer</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#features"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors whitespace-nowrap"
              >
                Features
              </a>

              <a
                href="#demo-widget"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Live Calculator</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full leading-none">
                  Interactive
                </span>
              </a>

              <a
                href="#comparison"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors whitespace-nowrap"
              >
                Why Us
              </a>

              <a
                href="#pricing"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors whitespace-nowrap"
              >
                Pricing
              </a>

              <a
                href="#faq"
                className="text-sm font-semibold text-slate-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50/70 transition-colors whitespace-nowrap"
              >
                FAQ
              </a>
            </nav>

            {/* Desktop Action Buttons (Right Aligned, Crisp & No Wrap) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/login"
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-xs hover:shadow transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                <span>Login</span>
              </Link>

              <a
                href="#cta"
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 group cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="flex xl:hidden items-center gap-2 shrink-0">
              <Link
                href="/login"
                className="px-3 py-2 text-xs font-bold border border-slate-300 hover:border-slate-400 bg-white text-slate-700 rounded-lg shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
              >
                Login
              </Link>
              <a
                href="#cta"
                className="px-3.5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                Sign Up
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-red-600 hover:bg-red-50 focus:outline-none shrink-0 cursor-pointer ml-0.5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-red-100 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="grid gap-1">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
              >
                ERP Features & Modules
              </a>
              <a
                href="#demo-widget"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600 flex items-center justify-between"
              >
                <span>Live Invoice Calculator</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">Interactive</span>
              </a>
              <a
                href="#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
              >
                Why Choose Us
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
              >
                Pricing Plans
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
              >
                Customer Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
              >
                Frequently Asked Questions
              </a>
            </div>

            <div className="pt-3 border-t border-red-100 flex flex-col gap-2.5">
              <a
                href="tel:18001202455"
                className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 hover:text-red-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-500" />
                <span>Sales: 1800-120-BILL (Toll-Free)</span>
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-sm shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                <span>Login</span>
              </Link>
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow flex items-center justify-center gap-1.5 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up Free</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
