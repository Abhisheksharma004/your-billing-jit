"use client";

import React, { useState } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, HelpCircle } from "lucide-react";

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: "Starter ERP",
      desc: "Perfect for single retail counters, freelancers, and small traders.",
      monthlyPrice: 799,
      annualPrice: 599,
      badge: null,
      popular: false,
      features: [
        "1 Branch & 2 Staff Logins",
        "Unlimited GST Invoices & Estimates",
        "Point of Sale (POS) Counter Billing",
        "Barcode Scanning & Label Printing",
        "Standard Inventory Management",
        "WhatsApp Invoice PDF Sharing",
        "Standard Email & Chat Support"
      ],
      ctaText: "Start 14-Day Free Trial",
      ctaStyle: "border-2 border-red-600 text-red-600 hover:bg-red-50"
    },
    {
      name: "Professional ERP",
      desc: "Designed for growing wholesalers, manufacturers, and multi-store retailers.",
      monthlyPrice: 1899,
      annualPrice: 1499,
      badge: "MOST POPULAR CHOICE",
      popular: true,
      features: [
        "Up to 3 Branches & 10 User Roles",
        "1-Click Govt E-Invoicing & E-Way Bills",
        "Multi-Warehouse Batch & Expiry Tracking",
        "GSTR-1, 2B & 3B Direct Auto-Reconciliation",
        "Dynamic UPI QR & WhatsApp Payment Links",
        "Full Double-Entry Financial Accounting",
        "Automated Tally XML / Excel Sync",
        "Priority 24/7 Phone & WhatsApp Support"
      ],
      ctaText: "Start Free 14-Day Trial",
      ctaStyle: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
    },
    {
      name: "Enterprise ERP",
      desc: "For large enterprise chains, multi-state factories, and super-stockists.",
      monthlyPrice: 4299,
      annualPrice: 3499,
      badge: "FULL UNLIMITED",
      popular: false,
      features: [
        "Unlimited Branches & Warehouses",
        "Unlimited Staff & Cashier Accounts",
        "Custom ERP REST API & Webhooks Access",
        "E-Commerce Sync (Amazon, Shopify, Custom)",
        "Granular Permission Matrices & Audit Logs",
        "Dedicated Chartered Accountant (CA) Desk",
        "Custom Print Template Designer",
        "Dedicated Account Manager & SLA Guarantee"
      ],
      ctaText: "Request Enterprise Demo",
      ctaStyle: "border-2 border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white"
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <span>Transparent, Scalable Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple Plans with <span className="text-red-600">No Hidden Fees</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Invest in peace of mind. Every plan includes free data migration, continuous GST law updates, and unlimited invoice generation.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-bold ${!annualBilling ? "text-slate-900" : "text-slate-500"}`}>
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-14 h-7 bg-red-600 rounded-full p-1 transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${annualBilling ? "translate-x-7" : "translate-x-0"
                  }`}
              />
            </button>

            <span className={`text-sm font-bold flex items-center gap-1.5 ${annualBilling ? "text-slate-900" : "text-slate-500"}`}>
              <span>Annual Billing</span>
              <span className="text-[11px] font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${plan.popular
                  ? "border-2 border-red-600 shadow-2xl shadow-red-600/15 lg:-translate-y-2"
                  : "border border-slate-200 shadow-lg shadow-slate-950/5 hover:border-red-300"
                  }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-md shadow-red-600/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 min-h-[38px]">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-500 text-lg font-bold">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-slate-500 text-xs font-semibold">/ month</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {annualBilling ? "Billed annually (₹" + (price * 12).toLocaleString("en-IN") + "/yr) + GST" : "Billed on a month-to-month basis + GST"}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">What's included:</div>
                    {plan.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <a
                    href="#cta"
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.ctaStyle}`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                    14-day unrestricted trial. Cancel anytime.
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-5 rounded-2xl bg-white border border-red-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">100% Risk-Free 30-Day Money Back Guarantee</div>
              <div className="text-xs text-slate-500">If Your Billing Software doesn’t save you time and simplify GST filing, get a full refund without questions.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600">
            <Zap className="w-4 h-4 text-red-600" />
            <span>Free Migration from Tally, Marg & Excel</span>
          </div>
        </div>

      </div>
    </section>
  );
}
