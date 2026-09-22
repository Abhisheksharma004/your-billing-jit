"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Printer, CheckCircle, LayoutTemplate } from "lucide-react";

export default function PrintTemplatePage() {
  const toast = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("modern-red");
  const [primaryColor, setPrimaryColor] = useState("#dc2626");

  const templates = [
    {
      id: "modern-red",
      name: "Modern GST Tax Invoice (Red Theme)",
      desc: "Clean professional standard invoice layout with bold headings and tax breakdown table.",
      tag: "Recommended",
    },
    {
      id: "tally-standard",
      name: "Classic Tally ERP Style",
      desc: "Traditional grid invoice layout with box borders, HSN summary, and authorized sign stamp.",
      tag: "Standard",
    },
    {
      id: "minimalist",
      name: "Minimalist Borderless",
      desc: "Modern borderless design with high contrast, ideal for fast monochrome laser printing.",
      tag: "Eco Fast",
    },
    {
      id: "thermal-pos",
      name: "Thermal POS 3-inch (80mm)",
      desc: "Compact receipt format designed specifically for retail POS thermal roll printers.",
      tag: "POS Retail",
    },
  ];

  const handleSave = () => {
    toast.success("Print template layout selected and saved!", {
      title: "Template Updated",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-[#dc2626]" />
            Invoice Print Template & Themes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose the visual layout and color styling for your printed tax invoices and PDF receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer space-y-2.5 relative ${
                  isSelected
                    ? "border-[#dc2626] bg-red-50/20 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {tpl.tag}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#dc2626]">
                      <CheckCircle className="w-3.5 h-3.5 fill-[#dc2626] text-white" />
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{tpl.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{tpl.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-800">Primary Brand Accent Color</div>
            <p className="text-[11px] text-slate-500">Color applied to table headers, invoice title, and highlight borders.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-9 h-9 rounded cursor-pointer border border-slate-300"
            />
            <span className="text-xs font-mono font-bold text-slate-700">{primaryColor}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Print Template
          </button>
        </div>
      </div>
    </div>
  );
}
