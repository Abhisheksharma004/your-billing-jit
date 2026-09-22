"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FileCheck, ShieldCheck } from "lucide-react";

export default function DigitalSignPage() {
  const toast = useToast();
  const [signerName, setSignerName] = useState("Abhishek Sharma");
  const [signPos, setSignPos] = useState("bottom-right");
  const [autoSign, setAutoSign] = useState(true);

  const handleSave = () => {
    toast.success("Digital Signature (DSC) preferences saved successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#dc2626]" />
              Digital Signature (DSC) Integration
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Attach your Class 3 USB Token or PFX digital signature on PDF invoices automatically.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            DSC Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Signer Full Name
            </label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              DSC Certificate Validity
            </label>
            <input
              type="text"
              defaultValue="Valid till 14-Aug-2028"
              disabled
              className="w-full px-3.5 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 shadow-2xs cursor-not-allowed"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Signature Stamp Position</div>
          <div className="flex flex-wrap gap-5 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="radio"
                name="signPos"
                value="bottom-right"
                checked={signPos === "bottom-right"}
                onChange={(e) => setSignPos(e.target.value)}
                className="w-4 h-4 text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Bottom Right (Authorized Signatory)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="radio"
                name="signPos"
                value="bottom-left"
                checked={signPos === "bottom-left"}
                onChange={(e) => setSignPos(e.target.value)}
                className="w-4 h-4 text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Bottom Left</span>
            </label>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800">Automated Signing Rules</div>
          <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSign}
              onChange={(e) => setAutoSign(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Automatically sign PDF when generating Tax Invoice and Credit Notes</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save DSC Settings
          </button>
        </div>
      </div>
    </div>
  );
}
