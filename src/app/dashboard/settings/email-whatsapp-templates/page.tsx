"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { MailCheck, MessageSquare, Code2 } from "lucide-react";

export default function EmailWhatsAppTemplatesPage() {
  const toast = useToast();
  const [activeType, setActiveType] = useState<"whatsapp" | "email">("whatsapp");
  const [whatsappTemplate, setWhatsappTemplate] = useState(
    "Dear {Customer_Name},\n\nThank you for doing business with {Company_Name}! Here is your invoice #{Invoice_Number} dated {Invoice_Date} for ₹ {Total_Amount}.\n\nView or download your invoice PDF here: {Invoice_Link}\n\nPay online instantly via UPI: {Payment_Link}\n\nRegards,\n{Company_Name}\n{Display_Phone}"
  );
  const [emailSubject, setEmailSubject] = useState(
    "Tax Invoice #{Invoice_Number} from {Company_Name}"
  );
  const [emailTemplate, setEmailTemplate] = useState(
    "Dear {Customer_Name},\n\nPlease find attached Tax Invoice #{Invoice_Number} dated {Invoice_Date} for the total amount of ₹ {Total_Amount}.\n\nPayment Due Date: {Due_Date}\nPayment Link: {Payment_Link}\n\nThank you for your valued partnership.\n\nWarm regards,\n{Company_Name} Accounts Team\n{Display_Phone} | {Company_Email}"
  );

  const handleSave = () => {
    toast.success("Notification message templates updated successfully!", {
      title: "Templates Saved",
    });
  };

  const variables = [
    "{Customer_Name}",
    "{Company_Name}",
    "{Invoice_Number}",
    "{Invoice_Date}",
    "{Total_Amount}",
    "{Due_Date}",
    "{Invoice_Link}",
    "{Payment_Link}",
    "{Display_Phone}",
    "{Company_Email}",
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MailCheck className="w-4 h-4 text-[#dc2626]" />
              Email & WhatsApp Notification Templates
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize automated messages dispatched when sending invoices, estimates, and payment receipts.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-md">
            <button
              type="button"
              onClick={() => setActiveType("whatsapp")}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                activeType === "whatsapp"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setActiveType("email")}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                activeType === "email"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Email
            </button>
          </div>
        </div>

        {/* Dynamic Placeholders Toolbar */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#dc2626]" />
            Available Dynamic Tags (Click to copy tag):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {variables.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(v);
                  toast.info(`Copied ${v} to clipboard`);
                }}
                className="px-2 py-0.5 rounded bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 font-mono text-[11px] text-slate-700 hover:text-red-700 transition-colors cursor-pointer shadow-2xs"
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {activeType === "whatsapp" ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              WhatsApp Message Body Template
            </label>
            <textarea
              rows={8}
              value={whatsappTemplate}
              onChange={(e) => setWhatsappTemplate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs leading-relaxed"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Email Subject Line
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Email Body Message
              </label>
              <textarea
                rows={8}
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs leading-relaxed"
              />
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
