"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FileText, Printer } from "lucide-react";

export default function PrintOptionsPage() {
  const toast = useToast();
  const [printGstBreakup, setPrintGstBreakup] = useState(true);
  const [printHsnSummary, setPrintHsnSummary] = useState(true);
  const [printBankDetails, setPrintBankDetails] = useState(true);
  const [printTermsConditions, setPrintTermsConditions] = useState(true);
  const [printAuthorizedSignatory, setPrintAuthorizedSignatory] = useState(true);
  const [printPreviousBalance, setPrintPreviousBalance] = useState(true);
  const [printEwayBillNumber, setPrintEwayBillNumber] = useState(true);
  const [printVehicleNumber, setPrintVehicleNumber] = useState(true);
  const [pageSize, setPageSize] = useState("A4");
  const [pageOrientation, setPageOrientation] = useState("Portrait");

  const handleSave = () => {
    toast.success("Print display options saved successfully!", {
      title: "Print Options Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#dc2626]" />
            Print Options & Field Visibility
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Control which fields, tables, summaries, and signatures appear on the printed tax invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Default Page Size
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="A4">A4 Standard (210 × 297 mm)</option>
              <option value="A5">A5 Half Page (148 × 210 mm)</option>
              <option value="Letter">Letter (8.5 × 11 in)</option>
              <option value="Thermal-3in">Thermal Roll 80mm</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Orientation
            </label>
            <select
              value={pageOrientation}
              onChange={(e) => setPageOrientation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Portrait">Portrait (Standard)</option>
              <option value="Landscape">Landscape (Wide Tables)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Print Elements Visibility</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printGstBreakup}
                onChange={(e) => setPrintGstBreakup(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Detailed GST Tax Breakup (CGST / SGST / IGST)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printHsnSummary}
                onChange={(e) => setPrintHsnSummary(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print HSN / SAC Summary Table</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printBankDetails}
                onChange={(e) => setPrintBankDetails(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Company Bank Account & UPI Details</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printTermsConditions}
                onChange={(e) => setPrintTermsConditions(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Terms & Conditions Footer</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printAuthorizedSignatory}
                onChange={(e) => setPrintAuthorizedSignatory(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Authorized Signatory Signature Box</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printPreviousBalance}
                onChange={(e) => setPrintPreviousBalance(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Customer Previous Outstanding Balance</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printEwayBillNumber}
                onChange={(e) => setPrintEwayBillNumber(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print E-Way Bill Number & Validity</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printVehicleNumber}
                onChange={(e) => setPrintVehicleNumber(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Print Vehicle Number & Transport Details</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Print Options
          </button>
        </div>
      </div>
    </div>
  );
}
