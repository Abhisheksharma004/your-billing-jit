"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Landmark, QrCode } from "lucide-react";

export default function BankDetailsPage() {
  const toast = useToast();
  const [bankName, setBankName] = useState("HDFC Bank Ltd");
  const [accountHolder, setAccountHolder] = useState("Viros Entrepreneurs IT Solutions Pvt Ltd");
  const [accountNumber, setAccountNumber] = useState("50200049281729");
  const [ifscCode, setIfscCode] = useState("HDFC0001234");
  const [branchName, setBranchName] = useState("Badarpur, New Delhi");
  const [accountType, setAccountType] = useState("Current Account");
  const [upiId, setUpiId] = useState("9871029141@hdfcbank");
  const [printQrOnInvoice, setPrintQrOnInvoice] = useState(true);

  const handleSave = () => {
    toast.success("Bank details and UPI QR preferences saved successfully!", {
      title: "Bank Details Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#dc2626]" />
            Bank Details & UPI Payment QR
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Banking credentials and UPI ID printed on your invoice payment slip and PDF receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Bank Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. HDFC Bank Ltd"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Account Holder Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Enter Account Holder Name"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Account Number<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Account Number"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              IFSC Code<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              placeholder="e.g. HDFC0001234"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Branch Name
            </label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter Branch Name"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Current Account">Current Account</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Overdraft / Cash Credit (OD/CC)">Overdraft / Cash Credit (OD/CC)</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              UPI ID / VPA (Virtual Payment Address)<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. 9871029141@upi or yourbusiness@okhdfcbank"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#dc2626]" />
            Dynamic UPI QR Code on Invoices
          </div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={printQrOnInvoice}
              onChange={(e) => setPrintQrOnInvoice(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Print dynamic UPI payment QR code with exact payable bill amount on PDF Invoices</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Bank Details
          </button>
        </div>
      </div>
    </div>
  );
}
