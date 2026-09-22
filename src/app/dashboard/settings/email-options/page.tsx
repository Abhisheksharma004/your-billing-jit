"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Mail, Send } from "lucide-react";

export default function EmailOptionsPage() {
  const toast = useToast();
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [senderEmail, setSenderEmail] = useState("billing@virosentrepreneurs.com");
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••••••");
  const [senderName, setSenderName] = useState("Viros Billing Team");

  const handleTestEmail = () => {
    toast.success(`Test email sent successfully to ${senderEmail}`, {
      title: "Email Verified",
    });
  };

  const handleSave = () => {
    toast.success("Email & SMTP configuration saved successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#dc2626]" />
            Email Options & Custom SMTP Configuration
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure your company SMTP mail server to dispatch invoices, vouchers, and payment reminders directly from your business domain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Sender Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Acme Invoicing Desk"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Sender Email Address<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="billing@yourdomain.com"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              SMTP Host Server<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              placeholder="smtp.gmail.com / mail.yourdomain.com"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              SMTP Port (SSL / TLS)<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              placeholder="587 / 465 / 25"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              SMTP App Password / Secret<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              placeholder="Enter SMTP App Password"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800">Gmail / Google Workspace Tip:</div>
          <p className="text-[11px] leading-relaxed">
            If using Gmail, enable 2-Step Verification and generate a 16-character <strong>App Password</strong> in your Google Account Security settings.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleTestEmail}
            className="px-4 py-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Test Email</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save SMTP Settings
          </button>
        </div>
      </div>
    </div>
  );
}
