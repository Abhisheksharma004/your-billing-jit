"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Settings as SettingsIcon, Globe2, Calendar, Hash } from "lucide-react";

export default function GeneralOptionsPage() {
  const toast = useToast();
  const [currency, setCurrency] = useState("INR (₹)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [fiscalYearStart, setFiscalYearStart] = useState("April - March");
  const [autoRoundOff, setAutoRoundOff] = useState(true);
  const [showDecimals, setShowDecimals] = useState("2");
  const [invoicePrefix, setInvoicePrefix] = useState("INV-26-");

  const handleSave = () => {
    toast.success("General application preferences updated successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-[#dc2626]" />
            General Options & System Preferences
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure system currency, decimal precisions, fiscal dates, and calculation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Default Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="INR (₹)">Indian Rupee - INR (₹)</option>
              <option value="USD ($)">US Dollar - USD ($)</option>
              <option value="EUR (€)">Euro - EUR (€)</option>
              <option value="AED (د.إ)">UAE Dirham - AED (د.إ)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 22/09/2026)</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY (e.g. 22-09-2026)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-09-22)</option>
              <option value="DD MMM YYYY">DD MMM YYYY (e.g. 22 Sep 2026)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Fiscal Year Accounting Cycle
            </label>
            <select
              value={fiscalYearStart}
              onChange={(e) => setFiscalYearStart(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="April - March">Indian Financial Year (1st April - 31st March)</option>
              <option value="January - December">Calendar Year (1st January - 31st December)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Number of Decimal Places
            </label>
            <select
              value={showDecimals}
              onChange={(e) => setShowDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="2">2 Decimal Places (e.g. ₹ 1,450.50)</option>
              <option value="3">3 Decimal Places (e.g. ₹ 1,450.500)</option>
              <option value="4">4 Decimal Places (High Precision Unit Rates)</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Default Invoice Numbering Prefix
            </label>
            <input
              type="text"
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value)}
              placeholder="e.g. INV-2026-"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
          <div className="text-xs font-bold text-slate-800">Calculation & Rounding Rules</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRoundOff}
              onChange={(e) => setAutoRoundOff(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Auto Round Off Invoice Total to nearest integer (e.g. ₹ 100.40 → ₹ 100.00, ₹ 100.60 → ₹ 101.00)</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save General Options
          </button>
        </div>
      </div>
    </div>
  );
}
