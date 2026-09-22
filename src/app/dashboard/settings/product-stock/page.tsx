"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Package, AlertTriangle } from "lucide-react";

export default function ProductStockPage() {
  const toast = useToast();
  const [enableLowStockAlert, setEnableLowStockAlert] = useState(true);
  const [defaultLowStockThreshold, setDefaultLowStockThreshold] = useState("10");
  const [allowNegativeStock, setAllowNegativeStock] = useState(false);
  const [enableBatchTracking, setEnableBatchTracking] = useState(true);
  const [enableBarcodeScanner, setEnableBarcodeScanner] = useState(true);
  const [enableMfgExpiryDate, setEnableMfgExpiryDate] = useState(true);
  const [defaultHsn, setDefaultHsn] = useState("84713010");
  const [defaultTaxRate, setDefaultTaxRate] = useState("18%");

  const handleSave = () => {
    toast.success("Product & Inventory Stock settings updated successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#dc2626]" />
            Product & Inventory Stock Configuration
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage barcode scanning, batch tracking, expiry date rules, and low stock threshold alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Default Low Stock Alert Threshold (Qty)
            </label>
            <input
              type="number"
              value={defaultLowStockThreshold}
              onChange={(e) => setDefaultLowStockThreshold(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Default GST Tax Rate
            </label>
            <select
              value={defaultTaxRate}
              onChange={(e) => setDefaultTaxRate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0%">0% (Exempted)</option>
              <option value="5%">5% GST</option>
              <option value="12%">12% GST</option>
              <option value="18%">18% GST (Standard)</option>
              <option value="28%">28% GST</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Default HSN / SAC Code
            </label>
            <input
              type="text"
              value={defaultHsn}
              onChange={(e) => setDefaultHsn(e.target.value)}
              placeholder="e.g. 84713010"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Inventory & Stock Controls</div>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableLowStockAlert}
                onChange={(e) => setEnableLowStockAlert(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Highlight low stock items in red on sales invoicing screen</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={allowNegativeStock}
                onChange={(e) => setAllowNegativeStock(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Allow billing when stock is zero or negative</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableBatchTracking}
                onChange={(e) => setEnableBatchTracking(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Enable Batch Number & Serial Number tracking</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableMfgExpiryDate}
                onChange={(e) => setEnableMfgExpiryDate(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Track Manufacturing (Mfg) & Expiry (Exp) dates</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableBarcodeScanner}
                onChange={(e) => setEnableBarcodeScanner(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Enable Fast USB/Bluetooth Barcode Scanner mode for POS billing</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Stock Settings
          </button>
        </div>
      </div>
    </div>
  );
}
