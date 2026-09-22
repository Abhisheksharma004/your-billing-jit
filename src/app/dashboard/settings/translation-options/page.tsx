"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Globe, Languages } from "lucide-react";

export default function TranslationOptionsPage() {
  const toast = useToast();
  const [appLanguage, setAppLanguage] = useState("en");
  const [invoiceLanguage, setInvoiceLanguage] = useState("en");
  const [enableBilingual, setEnableBilingual] = useState(false);

  const languages = [
    { code: "en", name: "English (Default)" },
    { code: "hi", name: "Hindi (हिन्दी)" },
    { code: "gu", name: "Gujarati (ગુજરાતી)" },
    { code: "mr", name: "Marathi (मराठी)" },
    { code: "ta", name: "Tamil (தமிழ்)" },
    { code: "te", name: "Telugu (తెలుగు)" },
    { code: "bn", name: "Bengali (বাংলা)" },
    { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
    { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  ];

  const handleSave = () => {
    toast.success("Language & translation preferences saved successfully!", {
      title: "Language Updated",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#dc2626]" />
            Translation & Multi-Language Settings
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select portal user interface language and default printing language for tax invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Dashboard & App Interface Language
            </label>
            <select
              value={appLanguage}
              onChange={(e) => setAppLanguage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Invoice PDF Print Language
            </label>
            <select
              value={invoiceLanguage}
              onChange={(e) => setInvoiceLanguage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
          <div className="text-xs font-bold text-slate-800">Bilingual Invoicing</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={enableBilingual}
              onChange={(e) => setEnableBilingual(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Print Bilingual Invoice (English + Regional Indian Language headers)</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Language Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
