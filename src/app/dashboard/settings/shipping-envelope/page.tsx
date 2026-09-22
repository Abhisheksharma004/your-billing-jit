"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Truck, Mail } from "lucide-react";

export default function ShippingEnvelopePage() {
  const toast = useToast();
  const [envelopeSize, setEnvelopeSize] = useState("DL");
  const [showSenderAddress, setShowSenderAddress] = useState(true);
  const [showRecipientPhone, setShowRecipientPhone] = useState(true);
  const [showBarcode, setShowBarcode] = useState(true);
  const [customFooterNote, setCustomFooterNote] = useState("HANDLE WITH CARE • FRAGILE ELECTRONIC GOODS");

  const handleSave = () => {
    toast.success("Shipping label & envelope print settings saved successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#dc2626]" />
            Shipping Envelope & Parcel Label Settings
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure courier address labels, thermal shipping stickers (4x6 inch), and envelope layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Label / Envelope Standard Size
            </label>
            <select
              value={envelopeSize}
              onChange={(e) => setEnvelopeSize(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="4x6">4 × 6 inch Shipping Sticker (Thermal Standard)</option>
              <option value="DL">DL Envelope (110 × 220 mm)</option>
              <option value="C5">C5 Envelope (162 × 229 mm)</option>
              <option value="A4-4UP">A4 Sheet 4-Up Sticky Labels</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Parcel Footer Note / Disclaimer
            </label>
            <input
              type="text"
              value={customFooterNote}
              onChange={(e) => setCustomFooterNote(e.target.value)}
              placeholder="e.g. FRAGILE • HANDLE WITH CARE"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Label Content Preferences</div>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showSenderAddress}
                onChange={(e) => setShowSenderAddress(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Return / From Sender Address on top</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showRecipientPhone}
                onChange={(e) => setShowRecipientPhone(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Customer Delivery Contact & Phone Number</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showBarcode}
                onChange={(e) => setShowBarcode(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Order ID & Invoice Tracking Barcode</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Shipping Settings
          </button>
        </div>
      </div>
    </div>
  );
}
