"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function PaymentGatewayPage() {
  const toast = useToast();
  const [provider, setProvider] = useState("Razorpay");
  const [keyId, setKeyId] = useState("rzp_live_K82j19xKls0a9");
  const [keySecret, setKeySecret] = useState("••••••••••••••••••••••••");
  const [autoReconcile, setAutoReconcile] = useState(true);

  const handleSave = () => {
    toast.success("Payment Gateway integration updated successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#dc2626]" />
            Online Payment Gateway Integration
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Collect digital payments (UPI, Credit/Debit Cards, NetBanking) directly from your invoices with instant auto-reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Payment Gateway Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Razorpay">Razorpay</option>
              <option value="Cashfree Payments">Cashfree Payments</option>
              <option value="Paytm for Business">Paytm for Business</option>
              <option value="PhonePe PG">PhonePe Payment Gateway</option>
              <option value="UPI Dynamic QR Code Only">UPI Dynamic QR Code Only</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              {provider} Key ID / App ID
            </label>
            <input
              type="text"
              value={keyId}
              onChange={(e) => setKeyId(e.target.value)}
              placeholder="Enter Key ID"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              {provider} Key Secret / Secret Token
            </label>
            <input
              type="password"
              value={keySecret}
              onChange={(e) => setKeySecret(e.target.value)}
              placeholder="Enter Key Secret"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Auto-Reconciliation Status
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            When your customer scans the QR code or pays online using the link on your invoice, the payment is automatically verified via Webhook and the invoice is marked as <strong className="text-emerald-700">PAID</strong> without manual entry.
          </p>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoReconcile}
              onChange={(e) => setAutoReconcile(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Enable Realtime Webhook Auto-Reconciliation</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Gateway Settings
          </button>
        </div>
      </div>
    </div>
  );
}
