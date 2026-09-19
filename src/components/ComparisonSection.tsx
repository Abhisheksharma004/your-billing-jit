import React from "react";
import { Check, X, ShieldAlert, Sparkles, Zap, ArrowRight } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "E-Invoicing & E-Way Bills",
      traditional: "Manual export to Excel, login to govt portal, upload JSON, download IRN manually (15+ mins per bill).",
      ybs: "1-Click direct API generation. QR code & IRN instantly printed on invoice in 3 seconds.",
      advantage: true
    },
    {
      feature: "Access Anywhere & Multi-Branch",
      traditional: "Tied to single physical desktop computer in the shop. Can't see multi-branch stock from home.",
      ybs: "100% Cloud-native. Monitor multi-warehouse sales, cash registers & P&L from phone, iPad or laptop.",
      advantage: true
    },
    {
      feature: "Data Safety & Backups",
      traditional: "High risk of hard drive failure, ransomware virus, or forgetting manual pendrive backups.",
      ybs: "Bank-grade 256-bit encryption with automated real-time cloud backups and 99.99% uptime SLA.",
      advantage: true
    },
    {
      feature: "Payment Collections & Follow-ups",
      traditional: "Manual phone calls, chasing paper bills, slow cash collection cycles (30-45 days delay).",
      ybs: "Automated WhatsApp reminders with dynamic UPI QR code. Get paid 40% faster directly to your bank.",
      advantage: true
    },
    {
      feature: "GSTR Auto-Reconciliation",
      traditional: "Painstaking manual cross-checking with CA, leading to ITC loss and GST notices.",
      ybs: "Direct GSTR-2B sync. Automatically highlights 100% matched vs mismatched invoices.",
      advantage: true
    },
    {
      feature: "Updates & Tax Law Changes",
      traditional: "Expensive yearly renewal charges just for version upgrades or new GST rate patches.",
      ybs: "Zero maintenance hassles. All GST law changes, new slabs, and features are updated automatically for free.",
      advantage: true
    }
  ];

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <span>The Modern Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Traditional Desktop Billing vs. <br />
            <span className="text-red-600">Your Billing Software</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            See why over 10,000 businesses retired their legacy systems and made the switch to modern cloud ERP.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-xl overflow-hidden">

          {/* Table Head */}
          <div className="grid grid-cols-12 bg-slate-900 text-white font-bold text-sm sm:text-base py-4 px-4 sm:px-8 items-center">
            <div className="col-span-12 sm:col-span-4 text-slate-300 uppercase tracking-wider text-xs font-bold">
              Feature / Capability
            </div>
            <div className="hidden sm:block sm:col-span-4 text-slate-400 font-semibold text-sm">
              Legacy Desktop Software
            </div>
            <div className="hidden sm:flex sm:col-span-4 text-red-400 font-bold text-sm items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>Your Billing Software (Cloud ERP)</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-6 gap-4 items-center hover:bg-red-50/20 transition-colors"
              >
                {/* Feature Name */}
                <div className="col-span-12 sm:col-span-4">
                  <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                    {row.feature}
                  </div>
                </div>

                {/* Legacy Desktop */}
                <div className="col-span-12 sm:col-span-4 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase sm:hidden mb-1">Traditional Desktop:</div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span>{row.traditional}</span>
                  </div>
                </div>

                {/* Your Billing Software */}
                <div className="col-span-12 sm:col-span-4 bg-red-50/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-red-100">
                  <div className="text-xs font-bold text-red-600 uppercase sm:hidden mb-1">Your Billing Software:</div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-900">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{row.ybs}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Card Footer */}
          <div className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
              <span className="font-bold text-slate-900">Free 1-on-1 Data Migration:</span> Our team migrates your existing Tally, Marg, or Excel records within 24 hours at no extra cost.
            </div>
            <a
              href="#cta"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <span>Migrate Risk-Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
