"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Heading, Image as ImageIcon, Upload } from "lucide-react";

export default function CustomHeaderPage() {
  const toast = useToast();
  const [headerTitle, setHeaderTitle] = useState("TAX INVOICE");
  const [subTitle, setSubTitle] = useState("(ORIGINAL FOR RECIPIENT)");
  const [headerLayout, setHeaderLayout] = useState("logo-left");
  const [showWatermark, setShowWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState("PAID");

  const handleSave = () => {
    toast.success("Custom invoice header and layout saved successfully!", {
      title: "Header Updated",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Heading className="w-4 h-4 text-[#dc2626]" />
            Custom Header & Invoice Letterhead
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure custom header text, pre-printed letterhead margins, and PDF watermark stamps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Main Document Title
            </label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              placeholder="e.g. TAX INVOICE / BILL OF SUPPLY"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Document Sub-Title / Copy Type
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="e.g. (ORIGINAL FOR RECIPIENT)"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Header Layout Alignment
            </label>
            <select
              value={headerLayout}
              onChange={(e) => setHeaderLayout(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="logo-left">Company Logo on Left, Details on Right (Standard)</option>
              <option value="logo-center">Centered Company Logo with Centered Business Details</option>
              <option value="logo-right">Company Logo on Right, Details on Left</option>
              <option value="preprinted-letterhead">Pre-Printed Letterhead (Leave 1.5-inch Top Margin Blank)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Background Watermark</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Print light diagonal background watermark on PDF</span>
          </label>

          {showWatermark && (
            <div className="pt-1.5 space-y-1.5 max-w-sm">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. PAID / DUPLICATE / CANCELLED"
                className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-white"
              />
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Header Settings
          </button>
        </div>
      </div>
    </div>
  );
}
