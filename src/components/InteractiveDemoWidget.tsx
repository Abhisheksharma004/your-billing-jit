"use client";

import React, { useState } from "react";
import {
  Calculator,
  Plus,
  Trash2,
  FileText,
  Sparkles,
  Check,
  QrCode,
  Download,
  Share2,
  Clock,
  TrendingUp,
  IndianRupee,
  RefreshCw
} from "lucide-react";

interface BillItem {
  id: string;
  name: string;
  qty: number;
  rate: number;
  gstRate: number; // 5, 12, 18, 28
}

export default function InteractiveDemoWidget() {
  const [items, setItems] = useState<BillItem[]>([
    { id: "1", name: "Premium Enterprise Server Rack", qty: 2, rate: 24500, gstRate: 18 },
    { id: "2", name: "Fiber Optic Patch Cord (10m)", qty: 10, rate: 850, gstRate: 18 },
    { id: "3", name: "Installation & Configuration Service", qty: 1, rate: 5000, gstRate: 18 }
  ]);

  const [isInterstate, setIsInterstate] = useState(false); // intra-state: CGST+SGST, inter-state: IGST
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(450);

  // Calculations
  const calculateTotals = () => {
    let subtotal = 0;
    let totalTax = 0;

    items.forEach((item) => {
      const lineTotal = item.qty * item.rate;
      const lineTax = (lineTotal * item.gstRate) / 100;
      subtotal += lineTotal;
      totalTax += lineTax;
    });

    return {
      subtotal,
      cgst: isInterstate ? 0 : totalTax / 2,
      sgst: isInterstate ? 0 : totalTax / 2,
      igst: isInterstate ? totalTax : 0,
      grandTotal: subtotal + totalTax,
    };
  };

  const totals = calculateTotals();

  const handleAddItem = () => {
    const newItem: BillItem = {
      id: Date.now().toString(),
      name: "Standard Commercial Goods",
      qty: 1,
      rate: 1500,
      gstRate: 18,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof BillItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleDownloadPreview = () => {
    setInvoiceDownloaded(true);
    setTimeout(() => setInvoiceDownloaded(false), 3000);
  };

  // ROI stats calculation based on slider
  const hoursSaved = Math.round(invoicesPerMonth * 0.12);
  const rupeesSaved = Math.round(invoicesPerMonth * 45);

  return (
    <section id="demo-widget" className="py-20 lg:py-28 bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Try It Live Before Signing Up</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Interactive GST Billing & <span className="text-red-600">ROI Calculator</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Experience our 1-click tax calculation engine right in your browser. Edit items below to see instant CGST, SGST, and IGST breakdowns.
          </p>
        </div>

        {/* Two-Column Interactive Arena */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Interactive Invoice Builder (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-red-100 p-5 sm:p-7 shadow-xl shadow-red-900/5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    Quick Tax Invoice Simulator
                  </h3>
                  <p className="text-xs text-slate-500">Invoice Ref: INV-2025-001 (E-Way Ready)</p>
                </div>
              </div>

              {/* Tax Type Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsInterstate(false)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${!isInterstate
                    ? "bg-white text-red-600 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  Intra-State (CGST + SGST)
                </button>
                <button
                  type="button"
                  onClick={() => setIsInterstate(true)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${isInterstate
                    ? "bg-white text-red-600 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  Inter-State (IGST)
                </button>
              </div>
            </div>

            {/* Bill Items Table */}
            <div className="mt-5 space-y-3">
              <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 uppercase px-2">
                <span className="col-span-5">Item Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Rate (₹)</span>
                <span className="col-span-2 text-center">GST %</span>
                <span className="col-span-1 text-center">Del</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2 items-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-red-200 transition-colors"
                >
                  <div className="sm:col-span-5">
                    <label className="text-[10px] font-bold text-slate-400 block sm:hidden uppercase">Item Description</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold text-slate-800 bg-white sm:bg-transparent border sm:border-0 border-slate-300 rounded px-2 py-1 focus:bg-white focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block sm:hidden uppercase">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleUpdateItem(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block sm:hidden uppercase">Rate (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => handleUpdateItem(item.id, "rate", Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-right text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block sm:hidden uppercase">GST Rate</label>
                    <select
                      value={item.gstRate}
                      onChange={(e) => handleUpdateItem(item.id, "gstRate", parseInt(e.target.value))}
                      className="w-full text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-red-500 focus:outline-none"
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Button */}
            <div className="mt-3">
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-dashed border-red-300 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Line Item</span>
              </button>
            </div>

            {/* Live Calculation Summary Box */}
            <div className="mt-6 pt-5 border-t border-slate-200 grid sm:grid-cols-2 gap-4 items-center bg-red-50/40 p-4 rounded-xl border border-red-100">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Taxable Subtotal:</span>
                  <span className="font-bold text-slate-900">₹{totals.subtotal.toLocaleString("en-IN")}</span>
                </div>
                {!isInterstate ? (
                  <>
                    <div className="flex justify-between">
                      <span>CGST:</span>
                      <span className="font-bold text-red-600">₹{totals.cgst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST:</span>
                      <span className="font-bold text-red-600">₹{totals.sgst.toLocaleString("en-IN")}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span>IGST:</span>
                    <span className="font-bold text-red-600">₹{totals.igst.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>GSTIN Status:</span>
                  <span className="text-emerald-600 font-semibold">Active & Validated</span>
                </div>
              </div>

              <div className="text-right border-t sm:border-t-0 sm:border-l border-red-200/80 pt-3 sm:pt-0 sm:pl-4">
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Invoice Grand Total</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-tight mt-0.5">
                  ₹{totals.grandTotal.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Includes all taxes & auto-roundoff</div>
              </div>
            </div>

            {/* Simulate Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadPreview}
                className="flex-1 min-w-[160px] py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {invoiceDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Demo Invoice Generated!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate Instant PDF Bill</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadPreview}
                className="py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Simulate WhatsApp Share</span>
              </button>
            </div>

          </div>

          {/* Right: ROI & Hours Saved Calculator (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Background red Accent */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">

              <div className="space-y-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cost & Time Savings Analysis
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  How Much Will You Save?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Moving from manual spreadsheets or sluggish desktop software to Your Billing Software saves businesses an average of 45+ hours every month.
                </p>
              </div>

              {/* Slider Input */}
              <div className="space-y-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Invoices Created Monthly:</span>
                  <span className="text-red-400 font-mono font-extrabold text-base">{invoicesPerMonth}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={invoicesPerMonth}
                  onChange={(e) => setInvoicesPerMonth(parseInt(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50 (Small Shop)</span>
                  <span>1,500 (Distributor)</span>
                  <span>3,000+ (Enterprise)</span>
                </div>
              </div>

              {/* Estimated Savings Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    <span>Time Saved/Mo</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{hoursSaved} Hrs</div>
                  <div className="text-[11px] text-slate-400 mt-1">Faster checkout & auto-recon</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Est. Cost Saved</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">₹{rupeesSaved.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-slate-400 mt-1">On manual accounting & errors</div>
                </div>
              </div>

              {/* Mini Feature List */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Zero penalties with automated GSTR validation before filing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Get paid 14 days faster with WhatsApp payment links</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Unlimited multi-device access with real-time sync</span>
                </div>
              </div>

              {/* Button */}
              <a
                href="#cta"
                className="w-full block text-center py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Claim Your Free 14-Day Full Access
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
