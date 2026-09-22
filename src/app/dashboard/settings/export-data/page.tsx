"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { Download, FileSpreadsheet, FileText, Database } from "lucide-react";

export default function ExportDataPage() {
  const toast = useToast();

  const exportCards = [
    {
      title: "GSTR-1 Filing Return",
      desc: "Outward supplies summary for government GST portal filing.",
      format: "Excel & JSON",
      icon: FileSpreadsheet,
    },
    {
      title: "GSTR-3B Tax Summary",
      desc: "Monthly consolidated tax liability & eligible ITC report.",
      format: "Excel (.xlsx)",
      icon: FileSpreadsheet,
    },
    {
      title: "Sales Invoices Register",
      desc: "Complete list of sales bills with customer details, item rates & tax breakup.",
      format: "Excel / CSV",
      icon: FileText,
    },
    {
      title: "Purchase Bills Register",
      desc: "Inward supply records with vendor GSTIN and input tax breakdown.",
      format: "Excel / CSV",
      icon: FileText,
    },
    {
      title: "Party Master (Customers/Vendors)",
      desc: "All contacts, billing & shipping addresses, GSTIN & opening balances.",
      format: "Excel / CSV",
      icon: Database,
    },
    {
      title: "Products & Stock Master",
      desc: "Item catalog, HSN codes, purchase/sales rates, and current inventory stock.",
      format: "Excel / CSV",
      icon: Database,
    },
  ];

  const handleExport = (title: string) => {
    toast.success(`Exporting ${title} file... Download will start shortly.`, {
      title: "Export Started",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Download className="w-4 h-4 text-[#dc2626]" />
            Export Business & GST Data
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Export records in Excel, CSV, or Government GST JSON format for CA filing and offline auditing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exportCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-lg border border-slate-200 bg-white hover:border-red-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-red-50 text-[#dc2626] flex items-center justify-center font-bold">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-bold text-xs text-slate-800">{card.title}</div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-slate-400">
                    {card.format}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleExport(card.title)}
                    className="px-3 py-1.5 rounded-md bg-red-50 hover:bg-[#dc2626] text-[#dc2626] hover:text-white font-bold text-xs transition-all cursor-pointer shadow-2xs"
                  >
                    Export
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
