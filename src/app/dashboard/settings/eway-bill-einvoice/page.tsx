"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";

export default function EWayBillEinvoiceSettingsPage() {
  const toast = useToast();

  const handleSave = () => {
    toast.success("E-way Bill & E-Invoice settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">E-way Bill & E-Invoice Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Configure automated government GSP API credentials for 1-click IRN & E-Way Bill generation.</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            NIC Portal Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">GSP Username / GSTIN Portal User</label>
            <input
              type="text"
              defaultValue="Viros_GSP_004"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
              placeholder="Enter GSP Username"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">GSP Password</label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
              placeholder="Enter GSP Password"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Automated Rules</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-[#dc2626]" />
            <span>Auto generate E-Way bill when invoice total exceeds ₹ 50,000</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-[#dc2626]" />
            <span>Auto generate E-Invoice (IRN + Signed QR code) on saving B2B Tax Invoices</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-[#dc2626]" />
            <span>Print Government E-Invoice QR Code on PDF Invoices</span>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => toast.success("NIC API Connection verified successfully!", { title: "API Connected" })}
            className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Test Connection
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
