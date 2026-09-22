"use client";

import React from "react";
import { Folder, HardDrive } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function GoDriveSettingsPage() {
  const toast = useToast();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800">Go Drive & Cloud Backup</h3>
          <p className="text-xs text-slate-500 mt-0.5">Automated secure cloud backup for all GST invoices, items, customers, and accounting vouchers.</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Cloud Storage Usage</span>
            <span className="font-semibold text-slate-600">2.4 GB of 15.0 GB used (16%)</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#dc2626] h-full w-[16%]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#dc2626]" />
              <span>Google Drive Backup</span>
            </div>
            <p className="text-[11px] text-slate-500">Auto backup invoices daily to connected Google Drive folder.</p>
            <span className="inline-block text-[11px] font-bold text-slate-700">Connected: viros.backup@gmail.com</span>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-500" />
              <span>Instant Local Zip Backup</span>
            </div>
            <p className="text-[11px] text-slate-500">Download complete encrypted database backup file to your computer.</p>
            <button
              type="button"
              onClick={() => toast.success("Preparing backup file download...", { title: "Backup Started" })}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              Download Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
