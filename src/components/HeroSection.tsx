"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp,
  FileText,
  Layers,
  CreditCard,
  ShieldCheck,
  Printer,
  Download,
  MessageSquare,
  Sparkles,
  Building2,
  Calendar
} from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"invoices" | "inventory" | "gst">("invoices");

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32 bg-white bg-radial-red">
      {/* Decorative red ambient blur elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-400/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-rose-300/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs sm:text-sm font-semibold shadow-xs hover:bg-red-100/70 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Next-Generation GST & Enterprise ERP</span>
            <span className="text-red-300">|</span>
            <span className="font-normal text-slate-600">Rated 4.9/5 by 10,000+ Businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Modern Billing & ERP Built for{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent underline decoration-red-200 decoration-wavy decoration-2">
              High-Speed Growth
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Generate 1-click GST e-invoices in under 3 seconds, synchronize multi-branch inventory, auto-reconcile GSTR-2B, and accelerate cash flow with automated payment links.
          </p>

          {/* Call-to-action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#demo-widget"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border-2 border-red-200 hover:border-red-600 text-slate-800 hover:text-red-600 font-bold text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Try Interactive Calculator</span>
            </a>
          </div>

          {/* Trust bullets */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>1-Minute Instant Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>100% GST & E-Way Bill Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>Seamless Tally / Excel Import</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive ERP Dashboard Mockup */}
        <div className="mt-14 relative max-w-6xl mx-auto">
          {/* Glowing border card wrapper */}
          <div className="relative rounded-2xl bg-white p-2 sm:p-3 ring-1 ring-red-100 shadow-[0_25px_60px_-15px_rgba(220,38,38,0.18)]">

            {/* Window control header bar */}
            <div className="bg-slate-900 text-white rounded-t-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="h-4 w-[1px] bg-slate-700 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">Your Billing Software</span>
                  <span className="text-[10px] bg-red-600/90 text-white font-bold px-2 py-0.5 rounded">ERP CLOUD</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Main Branch: Mumbai Central</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  <span>FY 2024-25 (Q4)</span>
                </div>
              </div>
            </div>

            {/* Dashboard Inner App Body */}
            <div className="bg-slate-50/50 p-4 sm:p-6 rounded-b-xl border border-slate-100">

              {/* Top KPI Metrics Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

                {/* Metric 1 */}
                <div className="bg-white p-4 rounded-xl border border-red-100/80 shadow-xs hover:border-red-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                    <span>Monthly Sales</span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +28.4%
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹48,25,890</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">1,842 Invoices Generated</div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-4 rounded-xl border border-red-100/80 shadow-xs hover:border-red-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                    <span>GST ITC Eligible</span>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      100% GSTR-2B
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹4,12,650</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Auto-matched with Govt Portal</div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-4 rounded-xl border border-red-100/80 shadow-xs hover:border-red-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                    <span>Outstanding Due</span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      8 Overdue
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹1,45,200</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Automated WhatsApp links sent</div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-4 rounded-xl border border-red-100/80 shadow-xs hover:border-red-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                    <span>Inventory Health</span>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      4 Warehouses
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">12,480 SKUs</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">3 Low stock reorder triggers</div>
                </div>

              </div>

              {/* Tab Navigation in ERP Preview */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeTab === "invoices"
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Recent GST Invoices</span>
                </button>

                <button
                  onClick={() => setActiveTab("inventory")}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeTab === "inventory"
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Multi-Warehouse Stock</span>
                </button>

                <button
                  onClick={() => setActiveTab("gst")}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${activeTab === "gst"
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>GSTR 1 & 2B Auto-Recon</span>
                </button>
              </div>

              {/* Tab Content 1: Invoices */}
              {activeTab === "invoices" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-red-50/70 text-slate-700 font-semibold border-b border-red-100">
                        <tr>
                          <th className="py-3 px-4">Invoice #</th>
                          <th className="py-3 px-4">Client / Company</th>
                          <th className="py-3 px-4">GSTIN</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">GST (18%)</th>
                          <th className="py-3 px-4">E-Way / IRN</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">

                        <tr className="hover:bg-red-50/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-red-600">YBS-2025-0841</td>
                          <td className="py-3 px-4 font-bold text-slate-900">Reliance Digital Retails Ltd</td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-500">27AABCR2341M1Z1</td>
                          <td className="py-3 px-4 font-bold">₹1,84,500</td>
                          <td className="py-3 px-4 text-slate-500">₹33,210</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> IRN Active
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              PAID (UPI)
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5 text-slate-400">
                              <button className="p-1 hover:text-red-600 transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-red-600 transition-colors" title="Download PDF"><Download className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-emerald-600 transition-colors" title="WhatsApp Invoice"><MessageSquare className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>

                        <tr className="hover:bg-red-50/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-red-600">YBS-2025-0842</td>
                          <td className="py-3 px-4 font-bold text-slate-900">Tata Consumer Products Ent</td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-500">07AAACT8920C1ZA</td>
                          <td className="py-3 px-4 font-bold">₹92,800</td>
                          <td className="py-3 px-4 text-slate-500">₹16,704</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> IRN Active
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                              DUE (7 Days)
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5 text-slate-400">
                              <button className="p-1 hover:text-red-600 transition-colors"><Printer className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-red-600 transition-colors"><Download className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-emerald-600 transition-colors"><MessageSquare className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>

                        <tr className="hover:bg-red-50/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-red-600">YBS-2025-0843</td>
                          <td className="py-3 px-4 font-bold text-slate-900">Apex Healthcare & Pharma</td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-500">24AAACA5534Q1Z8</td>
                          <td className="py-3 px-4 font-bold">₹3,42,000</td>
                          <td className="py-3 px-4 text-slate-500">₹41,040 (12%)</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> E-Way Valid
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              PAID (RTGS)
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5 text-slate-400">
                              <button className="p-1 hover:text-red-600 transition-colors"><Printer className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-red-600 transition-colors"><Download className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-emerald-600 transition-colors"><MessageSquare className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 font-medium">
                    <span>Showing 3 of 1,842 live invoices</span>
                    <span className="text-red-600 font-bold hover:underline cursor-pointer">
                      Export to Tally XML / Excel CSV →
                    </span>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Inventory */}
              {activeTab === "inventory" && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900 text-sm">Industrial Valve 50mm</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">In Stock</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">SKU: IND-VLV-501 | HSN: 8481</div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full w-[82%]"></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1.5 text-slate-600 font-medium">
                        <span>Available: 412 units</span>
                        <span>Threshold: 50</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900 text-sm">Electrical Cable 2.5 Sqmm</span>
                        <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded">Low Stock</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">SKU: ELEC-CBL-25 | HSN: 8544</div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[24%]"></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1.5 text-slate-600 font-medium">
                        <span>Available: 18 rolls</span>
                        <span className="text-red-600 font-bold">Reorder Triggered</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900 text-sm">Hydraulic Seal Kit</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">Optimal</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">SKU: HYD-SLK-90 | HSN: 4016</div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full w-[95%]"></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1.5 text-slate-600 font-medium">
                        <span>Available: 890 units</span>
                        <span>Warehouse 2 (Bhiwandi)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: GST Auto-Recon */}
              {activeTab === "gst" && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-red-50/60 border border-red-100 mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">GSTR-2B Automated Direct Sync</h4>
                      <p className="text-xs text-slate-600">Direct integration via GSTN API. Zero manual reconciliation errors.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 99.8% Auto-Matched
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Total Purchase Invoices</div>
                      <div className="text-lg font-extrabold text-slate-900 mt-1">428</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Perfect Match (GSTR-2B)</div>
                      <div className="text-lg font-extrabold text-emerald-600 mt-1">426</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Mismatches Identified</div>
                      <div className="text-lg font-extrabold text-red-600 mt-1">2 (₹1,420)</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
