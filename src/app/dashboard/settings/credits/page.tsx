"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function CreditsSettingsPage() {
  const toast = useToast();
  const [selectedPack, setSelectedPack] = useState<number>(500);

  const packs = [
    { credits: 500, price: 500, perCredit: "₹ 1.00 / credit" },
    { credits: 1000, price: 900, perCredit: "₹ 0.90 / credit", tag: "Popular" },
    { credits: 2500, price: 2000, perCredit: "₹ 0.80 / credit", tag: "Best Value" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* 1. Header Card with Current Balance & Recharge Button */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">Total Credits Available</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">473.00</span>
            <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-extrabold bg-[#dc2626] text-white shadow-2xs">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Used for E-Way Bill generation, E-Invoicing (IRN), and WhatsApp alert automation.</p>
        </div>
      </div>

      {/* 2. Recharge Packs Grid */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
          Recharge Credit Packs
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {packs.map((pack) => (
            <div
              key={pack.credits}
              onClick={() => setSelectedPack(pack.credits)}
              className={`p-4 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedPack === pack.credits
                  ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {pack.tag && (
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#dc2626] text-white shadow-2xs">
                  {pack.tag}
                </span>
              )}
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900 font-mono">{pack.credits} Credits</div>
                <div className="text-xs text-slate-500">{pack.perCredit}</div>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <div className="text-base font-bold text-slate-900">₹ {pack.price}</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info(`Opening payment checkout for ${pack.credits} credits...`);
                  }}
                  className="px-3 py-1 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recharge History Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-3 overflow-hidden">
        <div className="text-xs font-semibold text-slate-500">
          Recharge History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100">
                <th className="pb-2.5 font-semibold text-slate-600">Recharge Date</th>
                <th className="pb-2.5 font-semibold text-slate-600">Amount</th>
                <th className="pb-2.5 font-semibold text-slate-600">Credits</th>
                <th className="pb-2.5 font-semibold text-slate-600">Payment Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 text-slate-600">11-Sep-2026</td>
                <td className="py-2.5 text-slate-900 font-semibold">590</td>
                <td className="py-2.5 text-slate-700">Credits - 500</td>
                <td className="py-2.5 text-slate-600 lowercase font-medium">upi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Credits Log Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-3 overflow-hidden">
        <div className="text-xs font-semibold text-slate-500">
          Credits Log
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100">
                <th className="pb-2.5 font-semibold text-slate-600">Date</th>
                <th className="pb-2.5 font-semibold text-slate-600">Type</th>
                <th className="pb-2.5 font-semibold text-slate-600">Description</th>
                <th className="pb-2.5 font-semibold text-slate-600">Credits Used</th>
                <th className="pb-2.5 font-semibold text-slate-600">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {[
                { date: "11-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771668872851", used: "1.00", bal: "473.00" },
                { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 751666890804", used: "1.00", bal: "474.00" },
                { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771666777673", used: "1.00", bal: "475.00" },
                { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771666777350", used: "1.00", bal: "476.00" },
                { date: "29-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 701664910406", used: "1.00", bal: "477.00" },
                { date: "24-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 701663425659", used: "1.00", bal: "478.00" },
                { date: "24-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 741663424898", used: "1.00", bal: "479.00" },
                { date: "20-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 791662329119", used: "1.00", bal: "480.00" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 text-slate-500">{row.date}</td>
                  <td className="py-2.5 text-slate-600 font-medium">{row.type}</td>
                  <td className="py-2.5 text-slate-600">{row.desc}</td>
                  <td className="py-2.5 text-slate-700 font-semibold">{row.used}</td>
                  <td className="py-2.5 text-slate-700 font-semibold">{row.bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
