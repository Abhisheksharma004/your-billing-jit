"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FileSpreadsheet, Layers } from "lucide-react";

export default function DocumentOptionsPage() {
  const toast = useToast();
  const [allowDuplicateItem, setAllowDuplicateItem] = useState(false);
  const [showItemDiscount, setShowItemDiscount] = useState(true);
  const [showOverallDiscount, setShowOverallDiscount] = useState(true);
  const [enableDeliveryChallan, setEnableDeliveryChallan] = useState(true);
  const [enablePurchaseOrder, setEnablePurchaseOrder] = useState(true);
  const [enableProformaInvoice, setEnableProformaInvoice] = useState(true);
  const [enableCreditDebitNote, setEnableCreditDebitNote] = useState(true);

  const handleSave = () => {
    toast.success("Document workflow options updated successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#dc2626]" />
            Document Options & Voucher Features
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure active voucher types, line item discount columns, and document validation behaviors.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Enabled Document & Voucher Types</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableDeliveryChallan}
                onChange={(e) => setEnableDeliveryChallan(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Delivery Challan (Material Outward)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enablePurchaseOrder}
                onChange={(e) => setEnablePurchaseOrder(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Purchase Order (PO Management)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableProformaInvoice}
                onChange={(e) => setEnableProformaInvoice(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Proforma Invoice / Quotation</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableCreditDebitNote}
                onChange={(e) => setEnableCreditDebitNote(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Credit Note & Debit Note (Sales/Purchase Return)</span>
            </label>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Invoice Item Grid Columns</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showItemDiscount}
                onChange={(e) => setShowItemDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Show Per-Item Discount column (%)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showOverallDiscount}
                onChange={(e) => setShowOverallDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Show Overall Invoice Level Discount</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={allowDuplicateItem}
                onChange={(e) => setAllowDuplicateItem(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Allow duplicate items in same invoice (multiple lines)</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Document Options
          </button>
        </div>
      </div>
    </div>
  );
}
