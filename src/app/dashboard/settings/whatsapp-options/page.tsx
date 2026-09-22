"use client";

import React, { useState } from "react";
import { MessageCircle, Search, X } from "lucide-react";
import WhatsAppQrModal from "../components/WhatsAppQrModal";

export default function WhatsAppOptionsSettingsPage() {
  const [whatsappSendMode, setWhatsappSendMode] = useState<"web" | "direct" | "billing">("direct");
  const [allowStaffWhatsapp, setAllowStaffWhatsapp] = useState(false);
  const [whatsappSearchQuery, setWhatsappSearchQuery] = useState("");
  const [showWhatsappSearchInput, setShowWhatsappSearchInput] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* 1. WhatsApp Settings Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            WhatsApp Settings
          </h3>
        </div>

        {/* 3 Radio Card Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Option 1: WhatsApp Web / App */}
          <div
            onClick={() => setWhatsappSendMode("web")}
            className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
              whatsappSendMode === "web"
                ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="pt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  whatsappSendMode === "web" ? "border-[#dc2626]" : "border-slate-300"
                }`}
              >
                {whatsappSendMode === "web" && <div className="w-2 h-2 rounded-full bg-[#dc2626]" />}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800">Send Via WhatsApp Web / App</div>
              <div className="text-[11px] text-slate-500 font-medium">(Using Your Ph. Number)</div>
            </div>
          </div>

          {/* Option 2: Direct WhatsApp */}
          <div
            onClick={() => setWhatsappSendMode("direct")}
            className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
              whatsappSendMode === "direct"
                ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="pt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  whatsappSendMode === "direct" ? "border-[#dc2626]" : "border-slate-300"
                }`}
              >
                {whatsappSendMode === "direct" && <div className="w-2 h-2 rounded-full bg-[#dc2626]" />}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800">Send Via Direct WhatsApp*</div>
              <div className="text-[11px] text-slate-500 font-medium">(Using Your Ph. Number)</div>
            </div>
          </div>

          {/* Option 3: Go GST Bill WhatsApp */}
          <div
            onClick={() => setWhatsappSendMode("billing")}
            className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
              whatsappSendMode === "billing"
                ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="pt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  whatsappSendMode === "billing" ? "border-[#dc2626]" : "border-slate-300"
                }`}
              >
                {whatsappSendMode === "billing" && <div className="w-2 h-2 rounded-full bg-[#dc2626]" />}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800">Send Via Go GST Bill WhatsApp</div>
              <div className="text-[11px] text-slate-500 font-medium">(From Go GST Bill&apos;s Ph. Number)</div>
            </div>
          </div>
        </div>

        {/* Staff Checkbox */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allowStaffWhatsapp}
              onChange={(e) => setAllowStaffWhatsapp(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
            />
            <span>Allow staff member to send WhatsApp using connected phone number.</span>
          </label>
        </div>

        {/* Connect WhatsApp Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowWhatsappModal(true)}
            className="px-4 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect WhatsApp</span>
          </button>
        </div>
      </div>

      {/* 2. WhatsApp Log Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            WhatsApp Log
          </h3>
          <div className="flex items-center gap-2">
            {showWhatsappSearchInput ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={whatsappSearchQuery}
                  onChange={(e) => setWhatsappSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  autoFocus
                  className="w-44 sm:w-56 px-3 py-1 text-xs rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowWhatsappSearchInput(false);
                    setWhatsappSearchQuery("");
                  }}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowWhatsappSearchInput(true)}
                className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search</span>
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-600 font-semibold border-b border-slate-100">
                <th className="py-3 px-5 font-semibold">From</th>
                <th className="py-3 px-3 font-semibold">To</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Sent On</th>
                <th className="py-3 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-12 text-center text-xs text-slate-400 font-medium">
                  No results
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Modal */}
      <WhatsAppQrModal
        isOpen={showWhatsappModal}
        onClose={() => setShowWhatsappModal(false)}
      />
    </div>
  );
}
