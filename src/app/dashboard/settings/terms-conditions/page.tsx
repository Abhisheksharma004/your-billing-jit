"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FileText } from "lucide-react";

export default function TermsConditionsPage() {
  const toast = useToast();
  const [termsText, setTermsText] = useState(
    "1. Goods once sold will not be taken back or exchanged.\n2. All disputes are subject to Delhi jurisdiction only.\n3. Interest @ 18% p.a. will be charged if payment is not made within the due date.\n4. Our responsibility ceases as soon as goods leave our premises."
  );
  const [quotationTerms, setQuotationTerms] = useState(
    "1. Quotation validity is 15 days from the date of issuance.\n2. 50% advance payment with purchase order, balance against delivery.\n3. Delivery within 7-10 working days upon order confirmation."
  );

  const handleSave = () => {
    toast.success("Terms & Conditions saved successfully!", {
      title: "Terms Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#dc2626]" />
            Default Terms & Conditions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default legal terms printed at the footer of tax invoices, quotations, delivery challans, and vouchers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Sales Tax Invoice Terms & Conditions
            </label>
            <textarea
              rows={5}
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Quotation / Estimate Terms & Conditions
            </label>
            <textarea
              rows={4}
              value={quotationTerms}
              onChange={(e) => setQuotationTerms(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Terms
          </button>
        </div>
      </div>
    </div>
  );
}
