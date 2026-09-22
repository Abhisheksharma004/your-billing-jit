"use client";

import React from "react";
import { Download } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function MembershipSettingsPage() {
  const toast = useToast();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* 1. Membership Details Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 bg-white">
          Membership Details
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100 pb-2">
                <th className="pb-3 font-semibold text-slate-600">Membership Type</th>
                <th className="pb-3 font-semibold text-slate-600">Expires On</th>
                <th className="pb-3 font-semibold text-slate-600">Last Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="pt-3.5 pb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#dc2626] text-white shadow-2xs">
                    Premium
                  </span>
                </td>
                <td className="pt-3.5 pb-2 text-slate-600 font-medium">
                  01-May-2029
                </td>
                <td className="pt-3.5 pb-2 text-slate-600">
                  RS. 4128 - 3 Year Membership - 01-May-2026
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Payment Details Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 bg-white">
          Payment Details
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100">
                <th className="pb-3 font-semibold text-slate-600">Payment For</th>
                <th className="pb-3 font-semibold text-slate-600">Payment Date</th>
                <th className="pb-3 font-semibold text-slate-600">Amount</th>
                <th className="pb-3 font-semibold text-slate-600">Transaction ID</th>
                <th className="pb-3 font-semibold text-slate-600">Payment Type</th>
                <th className="pb-3 font-semibold text-slate-600 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 text-slate-800 font-medium">
                  3 Year Membership
                </td>
                <td className="py-3.5 text-slate-600">
                  01-May-2026
                </td>
                <td className="py-3.5 text-slate-900 font-bold">
                  ₹ 4,128.00
                </td>
                <td className="py-3.5 text-slate-600 font-mono text-[11px]">
                  pay_OqYx98124Kls
                </td>
                <td className="py-3.5 text-slate-600">
                  UPI / NetBanking
                </td>
                <td className="py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => toast.success("Downloading membership tax invoice receipt...", { title: "Invoice Download" })}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Receipt</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
