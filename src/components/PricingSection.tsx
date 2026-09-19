"use client";

import React, { useState, useEffect } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, RefreshCw } from "lucide-react";

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback plans if database has no active plans
  const fallbackPlans = [
    {
      name: "Starter ERP",
      tagline: "Perfect for single retail counters, freelancers, and small traders.",
      billing_cycle: "monthly",
      monthly_price: 2999,
      is_popular: false,
      trial_days: 14,
      cta_text: "Start 14-Day Free Trial",
      features: [
        "1 Branch & 2 Staff Logins",
        "Unlimited GST Invoices & Estimates",
        "Point of Sale (POS) Counter Billing",
        "Barcode Scanning & Label Printing",
        "Standard Inventory Management",
        "WhatsApp Invoice PDF Sharing",
        "Standard Email & Chat Support"
      ]
    },
    {
      name: "Growth Tier",
      tagline: "Designed for growing wholesalers, manufacturers, and multi-store retailers.",
      billing_cycle: "monthly",
      monthly_price: 7499,
      is_popular: true,
      trial_days: 14,
      cta_text: "Start Free 14-Day Trial",
      features: [
        "Up to 3 Branches & 10 User Roles",
        "1-Click Govt E-Invoicing & E-Way Bills",
        "Multi-Warehouse Batch & Expiry Tracking",
        "GSTR-1, 2B & 3B Direct Auto-Reconciliation",
        "Dynamic UPI QR & WhatsApp Payment Links",
        "Full Double-Entry Financial Accounting",
        "Automated Tally XML / Excel Sync",
        "Priority 24/7 Phone & WhatsApp Support"
      ]
    },
    {
      name: "Enterprise Tier",
      tagline: "For large enterprise chains, multi-state factories, and super-stockists.",
      billing_cycle: "monthly",
      monthly_price: 14999,
      is_popular: false,
      trial_days: 30,
      cta_text: "Request Enterprise Demo",
      features: [
        "Unlimited Branches & Warehouses",
        "Unlimited Staff & Cashier Accounts",
        "Custom ERP REST API & Webhooks Access",
        "E-Commerce Sync (Amazon, Shopify, Custom)",
        "Granular Permission Matrices & Audit Logs",
        "Dedicated Chartered Accountant (CA) Desk",
        "Custom Print Template Designer",
        "Dedicated Account Manager & SLA Guarantee"
      ]
    },
    {
      name: "Starter Annual ERP",
      tagline: "Save more with 1-year prepaid subscription for single counters.",
      billing_cycle: "yearly",
      monthly_price: 29990,
      is_popular: false,
      trial_days: 14,
      cta_text: "Start 14-Day Free Trial",
      features: [
        "1 Full Year Access",
        "1 Branch & 2 Staff Logins",
        "Unlimited GST Invoices & Estimates",
        "Point of Sale (POS) Counter Billing",
        "Priority Email & Chat Support"
      ]
    }
  ];

  useEffect(() => {
    async function fetchPublicPlans() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/superadmin/plans");
        const data = await res.json();
        if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
          setPlans(data.plans);
        } else {
          setPlans(fallbackPlans);
        }
      } catch (err) {
        console.error("Failed to load public plans:", err);
        setPlans(fallbackPlans);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPublicPlans();
  }, []);

  const allPlans = plans.length > 0 ? plans : fallbackPlans;

  // Filter strictly based on the selected billing cycle
  const filteredPlans = allPlans.filter((p: any) => {
    const cycle = (p.billing_cycle || "monthly").toLowerCase();
    if (annualBilling) {
      return cycle === "yearly" || cycle === "annual";
    } else {
      return cycle === "monthly";
    }
  });

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
          <div className="pt-4 flex items-center justify-center gap-3 select-none">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`text-sm font-bold transition-colors cursor-pointer ${
                !annualBilling ? "text-slate-950 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-14 h-7 bg-red-600 rounded-full p-1 transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  annualBilling ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`text-sm font-bold transition-colors cursor-pointer ${
                annualBilling ? "text-slate-950 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Annual Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
            <span className="text-sm font-semibold text-slate-600">Loading live subscription tiers...</span>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="max-w-md mx-auto py-16 px-6 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No {annualBilling ? "Annual" : "Monthly"} Plans Configured
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We currently don&apos;t have any {annualBilling ? "yearly" : "monthly"} plans active in the system. Switch to {annualBilling ? "Monthly" : "Annual"} billing to see our current plans.
            </p>
            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="mt-5 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-sm hover:shadow cursor-pointer"
            >
              View {annualBilling ? "Monthly" : "Annual"} Plans
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 items-stretch ${
            filteredPlans.length === 1
              ? "max-w-md mx-auto"
              : filteredPlans.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {filteredPlans.map((plan: any, idx: number) => {
              // Real price directly from database — no fake calculations
              const price = Number(plan.monthly_price) || 0;
              const isPop = Boolean(plan.is_popular);
              const features = Array.isArray(plan.features) ? plan.features : [];
              const cycleUnit = plan.billing_cycle === "yearly" ? "year" : plan.billing_cycle === "quarterly" ? "quarter" : "month";
              const billedSubtitle = plan.billing_cycle === "yearly" ? "Billed annually + GST" : plan.billing_cycle === "quarterly" ? "Billed quarterly + GST" : "Billed on a month-to-month basis + GST";

              return (
                <div
                  key={plan.id || idx}
                  className={`relative bg-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                    isPop
                      ? "border-2 border-red-600 shadow-2xl shadow-red-600/15 lg:-translate-y-2"
                      : "border border-slate-200 shadow-lg shadow-slate-950/5 hover:border-red-300"
                  }`}
                >
                  {/* Popular Pill */}
                  {isPop && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] sm:text-[11px] font-black tracking-wide px-3.5 py-1 rounded-full uppercase shadow-md shadow-red-600/30 flex items-center gap-1.5 whitespace-nowrap z-10">
                      <Sparkles className="w-3 h-3 fill-current shrink-0" />
                      <span>MOST POPULAR</span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 min-h-[38px] leading-relaxed">
                        {plan.tagline || plan.desc || plan.description || "Comprehensive GST accounting & inventory management."}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="my-6 pb-6 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-500 text-lg font-bold">₹</span>
                        <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                          {price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-slate-500 text-xs font-semibold">/ {cycleUnit}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {billedSubtitle}
                      </div>
                    </div>

                    {/* Limits Highlight (Users & e-Way) */}
                    {(plan.max_users || plan.eway_limit) && (
                      <div className="grid grid-cols-2 gap-2 mb-6 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        {plan.max_users && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">User Seats</span>
                            <span className="font-bold text-slate-800">{plan.max_users} users</span>
                          </div>
                        )}
                        {plan.eway_limit && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">e-Way Limit</span>
                            <span className="font-bold text-slate-800">{plan.eway_limit}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Feature Checklist */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">What&apos;s included:</div>
                      {features.length > 0 ? (
                        features.map((feat: string, fidx: number) => (
                          <div key={fidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isPop ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                            }`}>
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="font-medium leading-snug">{feat}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic">All core billing and GST filing features included</div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <a
                      href="#cta"
                      className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow ${
                        isPop
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border border-red-600 text-red-600 hover:bg-red-50 bg-white"
                      }`}
                    >
                      <span>{plan.cta_text || "Start 14-Day Free Trial"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                      {plan.trial_days || 14}-day unrestricted trial. Cancel anytime.
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}

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
