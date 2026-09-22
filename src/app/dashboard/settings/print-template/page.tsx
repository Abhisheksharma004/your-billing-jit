"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import {
  Plus,
  Minus,
  Check,
  LayoutTemplate,
  Printer,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
} from "lucide-react";

interface DocumentTemplateConfig {
  id: string;
  name: string;
  templateType: string;
  primaryColor: string;
  pageSize: string;
  fontFamily: string;
  isDefault: boolean;
}

export default function PrintTemplatePage() {
  const toast = useToast();

  // All 17 document types from user screenshot
  const documentTypes = [
    { id: "sale-invoice", label: "Sale Invoice" },
    { id: "delivery-challan", label: "Delivery Challan" },
    { id: "quotation", label: "Quotation" },
    { id: "proforma", label: "Proforma" },
    { id: "purchase-order", label: "Purchase Order" },
    { id: "sale-order", label: "Sale Order" },
    { id: "job-work", label: "Job Work" },
    { id: "credit-note", label: "Credit Note" },
    { id: "debit-note", label: "Debit Note" },
    { id: "purchase-invoice", label: "Purchase Invoice" },
    { id: "multi-currency-invoice", label: "Multi Currency Invoice" },
    { id: "payment-receipt", label: "Payment Receipt" },
    { id: "daily-expense", label: "Daily Expense" },
    { id: "other-income", label: "Other Income" },
    { id: "letters", label: "Letters" },
    { id: "packing-list", label: "Packing List" },
    { id: "service", label: "Service" },
  ];

  // Currently expanded accordion item (defaults to "sale-invoice")
  const [expandedId, setExpandedId] = useState<string | null>("sale-invoice");

  // Config per document type
  const [configs, setConfigs] = useState<{ [key: string]: DocumentTemplateConfig }>({
    "sale-invoice": {
      id: "sale-invoice",
      name: "Sale Invoice",
      templateType: "modern-red",
      primaryColor: "#dc2626",
      pageSize: "A4",
      fontFamily: "Inter",
      isDefault: true,
    },
  });

  const templatesList = [
    {
      id: "modern-red",
      name: "Modern GST Tax Invoice (Red Theme)",
      desc: "Clean professional standard invoice layout with bold headings and tax breakdown table.",
      tag: "Recommended",
    },
    {
      id: "tally-standard",
      name: "Classic Tally ERP Grid",
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

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getDocConfig = (id: string, label: string): DocumentTemplateConfig => {
    return (
      configs[id] || {
        id,
        name: label,
        templateType: "modern-red",
        primaryColor: "#dc2626",
        pageSize: "A4",
        fontFamily: "Inter",
        isDefault: true,
      }
    );
  };

  const updateDocConfig = (id: string, updates: Partial<DocumentTemplateConfig>) => {
    setConfigs((prev) => {
      const current = prev[id] || {
        id,
        name: id,
        templateType: "modern-red",
        primaryColor: "#dc2626",
        pageSize: "A4",
        fontFamily: "Inter",
        isDefault: true,
      };
      return { ...prev, [id]: { ...current, ...updates } };
    });
  };

  const handleSaveDocTemplate = (label: string) => {
    toast.success(`Print template preferences for ${label} saved successfully!`, {
      title: "Template Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 pb-10">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xs sm:text-sm font-bold text-slate-800">
            Print Template
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-100">
          {documentTypes.map((doc) => {
            const isExpanded = expandedId === doc.id;
            const currentConfig = getDocConfig(doc.id, doc.label);

            return (
              <div key={doc.id} className="transition-colors">
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(doc.id)}
                  className={`w-full text-left px-5 py-3 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer relative select-none ${
                    isExpanded
                      ? "text-[#dc2626] font-bold bg-red-50/20"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/70"
                  }`}
                >
                  {/* Left Active Line Indicator (Brand Red #dc2626) */}
                  {isExpanded && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"></div>
                  )}

                  <span className="flex items-center gap-2">
                    <span className={isExpanded ? "text-[#dc2626]" : "text-slate-700"}>
                      {doc.label}
                    </span>
                  </span>

                  <div className="text-slate-400 hover:text-slate-700">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-[#dc2626]" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Expanded Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 py-5 bg-slate-50/40 border-t border-slate-100 space-y-5 animate-in fade-in-50 duration-150">
                    {/* Template Card Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">
                        Select Template Layout for {doc.label}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {templatesList.map((tpl) => {
                          const isSelected = currentConfig.templateType === tpl.id;
                          return (
                            <div
                              key={tpl.id}
                              onClick={() =>
                                updateDocConfig(doc.id, { templateType: tpl.id })
                              }
                              className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-2 relative ${
                                isSelected
                                  ? "border-[#dc2626] bg-white shadow-xs ring-1 ring-red-200"
                                  : "border-slate-200 hover:border-slate-300 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {tpl.tag}
                                </span>
                                {isSelected && (
                                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#dc2626]">
                                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#dc2626] text-white" />
                                    Selected
                                  </span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-slate-800">
                                  {tpl.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                  {tpl.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Template Customization Options */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Brand Accent Color */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={currentConfig.primaryColor}
                            onChange={(e) =>
                              updateDocConfig(doc.id, { primaryColor: e.target.value })
                            }
                            className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                          />
                          <input
                            type="text"
                            value={currentConfig.primaryColor}
                            onChange={(e) =>
                              updateDocConfig(doc.id, { primaryColor: e.target.value })
                            }
                            className="w-24 px-2 py-1 rounded border border-slate-300 text-xs font-mono font-medium uppercase"
                          />
                        </div>
                      </div>

                      {/* Default Paper Size */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Page Size
                        </label>
                        <select
                          value={currentConfig.pageSize}
                          onChange={(e) =>
                            updateDocConfig(doc.id, { pageSize: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
                        >
                          <option value="A4">A4 Standard (210 × 297 mm)</option>
                          <option value="A5">A5 Half Page (148 × 210 mm)</option>
                          <option value="Letter">Letter (8.5 × 11 in)</option>
                          <option value="Thermal-80mm">Thermal 80mm Roll</option>
                        </select>
                      </div>

                      {/* Font Family */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Font Typography
                        </label>
                        <select
                          value={currentConfig.fontFamily}
                          onChange={(e) =>
                            updateDocConfig(doc.id, { fontFamily: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
                        >
                          <option value="Inter">Inter (Clean Modern)</option>
                          <option value="Roboto">Roboto (Crisp Geometric)</option>
                          <option value="Helvetica">Helvetica / Arial</option>
                          <option value="Courier">Courier Mono (Receipt)</option>
                        </select>
                      </div>
                    </div>

                    {/* Bottom Save Action for this Document */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={currentConfig.isDefault}
                          onChange={(e) =>
                            updateDocConfig(doc.id, { isDefault: e.target.checked })
                          }
                          className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                        />
                        <span>Set as Default Template for {doc.label}</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleSaveDocTemplate(doc.label)}
                        className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save {doc.label} Template</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
