"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import {
  Package,
  Calendar,
  Type,
  Check,
  Info,
  Sliders,
  Sparkles,
} from "lucide-react";

interface BatchFieldRow {
  id: string;
  fieldName: string;
  batchType: "Text" | "Date";
  hasStatus: boolean;
  status: boolean;
  hasRequired: boolean;
  required: boolean;
  print: boolean;
  hasInputOption: boolean;
  inputOption: string;
}

export default function ProductStockPage() {
  const toast = useToast();

  // 1. Stock Options
  const [allowNegativeSales, setAllowNegativeSales] = useState(true);
  const [hideOutOfStockProducts, setHideOutOfStockProducts] = useState(false);
  const [hideOutOfStockBatches, setHideOutOfStockBatches] = useState(false);
  const [restrictNewProductCreation, setRestrictNewProductCreation] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // 2. Serial Number Setting
  const [serialNumberFieldName, setSerialNumberFieldName] = useState("Serial No.");
  const [enableStrictMode, setEnableStrictMode] = useState(true);
  const [serialDocs, setSerialDocs] = useState<{ [key: string]: boolean }>({
    quotation: false,
    proformaInvoice: false,
    saleOrder: false,
    deliveryChallan: false,
    serviceRequest: false,
  });

  // 3. Batch Setting Table
  const [batchRows, setBatchRows] = useState<BatchFieldRow[]>([
    {
      id: "batch-no",
      fieldName: "Batch No.",
      batchType: "Text",
      hasStatus: false,
      status: true,
      hasRequired: false,
      required: true,
      print: false,
      hasInputOption: false,
      inputOption: "",
    },
    {
      id: "model-no",
      fieldName: "Model No.",
      batchType: "Text",
      hasStatus: true,
      status: false,
      hasRequired: true,
      required: false,
      print: false,
      hasInputOption: false,
      inputOption: "",
    },
    {
      id: "size",
      fieldName: "Size",
      batchType: "Text",
      hasStatus: true,
      status: false,
      hasRequired: true,
      required: false,
      print: false,
      hasInputOption: false,
      inputOption: "",
    },
    {
      id: "mfg-date",
      fieldName: "Mfg. Date",
      batchType: "Date",
      hasStatus: true,
      status: false,
      hasRequired: true,
      required: false,
      print: false,
      hasInputOption: true,
      inputOption: "Month",
    },
    {
      id: "expiry-date",
      fieldName: "Expiry Date",
      batchType: "Date",
      hasStatus: true,
      status: false,
      hasRequired: true,
      required: false,
      print: false,
      hasInputOption: true,
      inputOption: "Month",
    },
  ]);

  // 4. Batch Options for Other Documents
  const [batchDocs, setBatchDocs] = useState<{ [key: string]: boolean }>({
    quotation: false,
    proformaInvoice: false,
    deliveryChallan: false,
    purchaseOrder: false,
    saleOrder: false,
    jobWork: false,
    serviceRequest: false,
  });

  // 5. Barcode Options
  const [minBarcodeLength, setMinBarcodeLength] = useState("6");
  const [focusAfterScan, setFocusAfterScan] = useState("Next Row");
  const [alwaysAddNewRow, setAlwaysAddNewRow] = useState(false);
  const [autoGenerateBarcode, setAutoGenerateBarcode] = useState(false);

  // Handlers
  const handleToggleBatchRow = (
    id: string,
    field: "status" | "required" | "print",
    value: boolean
  ) => {
    setBatchRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleUpdateBatchFieldName = (id: string, name: string) => {
    setBatchRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, fieldName: name } : row))
    );
  };

  const handleUpdateBatchInputOption = (id: string, option: string) => {
    setBatchRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, inputOption: option } : row))
    );
  };

  const handleSave = () => {
    toast.success("Product & Stock Options saved successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 pb-10">
      {/* Page Heading */}
      <div className="border-b border-slate-200/80 pb-2">
        <h2 className="text-sm font-bold text-slate-800">
          Product & Stock Options
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 1. STOCK OPTIONS                                                          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Stock Options
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Allow sales when stock unavailable */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allowNegativeSales}
                onChange={(e) => setAllowNegativeSales(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Allow to create Sales invoices even if stock is not available</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowConfigModal(true);
                toast.info("Configuring negative stock rules for other documents...");
              }}
              className="text-xs text-[#dc2626] hover:text-red-700 font-medium hover:underline cursor-pointer transition-colors"
            >
              (Configure for other documents)
            </button>
          </div>

          {/* Hide out of stock products */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideOutOfStockProducts}
                onChange={(e) => setHideOutOfStockProducts(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Hide out of stock products from product list when creating document</span>
            </label>
          </div>

          {/* Hide out of stock batch */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideOutOfStockBatches}
                onChange={(e) => setHideOutOfStockBatches(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Hide out of stock batch from batch list when creating document</span>
            </label>
          </div>

          {/* Restrict new product creation */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={restrictNewProductCreation}
                onChange={(e) => setRestrictNewProductCreation(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Restrict new product creation while adding items</span>
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SERIAL NUMBER SETTING                                                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Serial Number Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Serial Number Field Name */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Serial Number Field Name
            </label>
            <input
              type="text"
              value={serialNumberFieldName}
              onChange={(e) => setSerialNumberFieldName(e.target.value)}
              placeholder="Serial No."
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          {/* Enable Strict Mode */}
          <div className="space-y-1 pt-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableStrictMode}
                onChange={(e) => setEnableStrictMode(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable Strict Mode</span>
            </label>
            <p className="text-[11px] text-slate-500 italic pl-6">
              If Strict Mode is enabled, you have to specify serial numbers for each quantity.
            </p>
          </div>

          {/* Document list for serial numbers */}
          <div className="space-y-2.5 pt-2">
            {[
              { id: "quotation", label: "Quotation" },
              { id: "proformaInvoice", label: "Proforma Invoice" },
              { id: "saleOrder", label: "Sale Order" },
              { id: "deliveryChallan", label: "Delivery Challan" },
              { id: "serviceRequest", label: "Service Request" },
            ].map((doc) => (
              <label
                key={doc.id}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={!!serialDocs[doc.id]}
                  onChange={(e) =>
                    setSerialDocs({ ...serialDocs, [doc.id]: e.target.checked })
                  }
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
                <span>{doc.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BATCH SETTING TABLE                                                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Batch Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50/50">
                <th className="py-2.5 px-3 font-semibold">Field Name</th>
                <th className="py-2.5 px-3 font-semibold">Batch Type</th>
                <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                <th className="py-2.5 px-3 text-center font-semibold">Required</th>
                <th className="py-2.5 px-3 text-center font-semibold">Print</th>
                <th className="py-2.5 px-3 font-semibold">Input Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {batchRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Field Name */}
                  <td className="py-3 px-3 max-w-[200px]">
                    <input
                      type="text"
                      value={row.fieldName}
                      onChange={(e) =>
                        handleUpdateBatchFieldName(row.id, e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
                    />
                  </td>

                  {/* Batch Type */}
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {row.batchType === "Text" ? (
                        <Type className="w-3 h-3 text-slate-500" />
                      ) : (
                        <Calendar className="w-3 h-3 text-slate-500" />
                      )}
                      <span>{row.batchType}</span>
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-3 text-center">
                    {row.hasStatus ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.status}
                          onChange={(e) =>
                            handleToggleBatchRow(row.id, "status", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#dc2626]"></div>
                      </label>
                    ) : (
                      <span className="text-slate-300 font-mono">-</span>
                    )}
                  </td>

                  {/* Required Toggle */}
                  <td className="py-3 px-3 text-center">
                    {row.hasRequired ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.required}
                          onChange={(e) =>
                            handleToggleBatchRow(row.id, "required", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#dc2626]"></div>
                      </label>
                    ) : (
                      <span className="text-slate-300 font-mono">-</span>
                    )}
                  </td>

                  {/* Print Toggle */}
                  <td className="py-3 px-3 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.print}
                        onChange={(e) =>
                          handleToggleBatchRow(row.id, "print", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#dc2626]"></div>
                    </label>
                  </td>

                  {/* Input Option Dropdown */}
                  <td className="py-3 px-3">
                    {row.hasInputOption ? (
                      <select
                        value={row.inputOption}
                        onChange={(e) =>
                          handleUpdateBatchInputOption(row.id, e.target.value)
                        }
                        className="w-32 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
                      >
                        <option value="Month">Month</option>
                        <option value="Date (DD/MM/YYYY)">Date (DD/MM/YYYY)</option>
                        <option value="Month & Year (MM/YY)">Month & Year (MM/YY)</option>
                      </select>
                    ) : (
                      <span className="text-slate-300 font-mono">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ENABLE BATCH OPTIONS FOR OTHER DOCUMENTS                               */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Enable Batch Options For Other Documents
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-2.5">
          {[
            { id: "quotation", label: "Quotation" },
            { id: "proformaInvoice", label: "Proforma Invoice" },
            { id: "deliveryChallan", label: "Delivery Challan" },
            { id: "purchaseOrder", label: "Purchase Order" },
            { id: "saleOrder", label: "Sale Order" },
            { id: "jobWork", label: "Job Work" },
            { id: "serviceRequest", label: "Service Request" },
          ].map((doc) => (
            <label
              key={doc.id}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={!!batchDocs[doc.id]}
                onChange={(e) =>
                  setBatchDocs({ ...batchDocs, [doc.id]: e.target.checked })
                }
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>{doc.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BARCODE OPTION                                                         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Barcode Option
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Min. Barcode Scan Length */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Min. Barcode Scan Length
            </label>
            <select
              value={minBarcodeLength}
              onChange={(e) => setMinBarcodeLength(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="13">13</option>
            </select>
          </div>

          {/* Focus After Barcode Scan */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Focus After Barcode Scan
            </label>
            <select
              value={focusAfterScan}
              onChange={(e) => setFocusAfterScan(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Next Row">Next Row</option>
              <option value="Quantity Field">Quantity Field</option>
              <option value="Discount Field">Discount Field</option>
              <option value="Rate Field">Rate Field</option>
              <option value="Stay on Barcode">Stay on Barcode</option>
            </select>
          </div>

          {/* Checkbox: Always Add New Row on Scan */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={alwaysAddNewRow}
                onChange={(e) => setAlwaysAddNewRow(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Always Add New Row on Scan</span>
            </label>
          </div>

          {/* Checkbox: Auto - Generate Barcode */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoGenerateBarcode}
                onChange={(e) => setAutoGenerateBarcode(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Auto - Generate Barcode</span>
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR                                                         */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save Product & Stock Options</span>
        </button>
      </div>
    </div>
  );
}
