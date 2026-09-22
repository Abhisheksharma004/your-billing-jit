"use client";

import React, { useState, useRef } from "react";
import { useToast } from "@/context/ToastContext";
import {
  Settings as SettingsIcon,
  Upload,
  Image as ImageIcon,
  X,
  Info,
  Sliders,
  Check,
  Sparkles,
} from "lucide-react";

export default function GeneralOptionsPage() {
  const toast = useToast();

  // 1. Logo and Signature States
  const [logoUrl, setLogoUrl] = useState<string | null>(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
  );
  const [enableSignature, setEnableSignature] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [footerImageUrl, setFooterImageUrl] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const footerInputRef = useRef<HTMLInputElement>(null);

  // 2. General Settings States
  const [enableRounding, setEnableRounding] = useState(true);
  const [recordPerPage, setRecordPerPage] = useState("20");
  const [showLastSellingPrice, setShowLastSellingPrice] = useState(true);
  const [autoApplyLastSellingPrice, setAutoApplyLastSellingPrice] = useState(false);
  const [updateProductQtyKeepPrice, setUpdateProductQtyKeepPrice] = useState(false);
  const [calcUnitPriceMoreDecimals, setCalcUnitPriceMoreDecimals] = useState(false);
  const [dateFormat, setDateFormat] = useState("d-M-y (06-Oct-25)");
  const [fileFormat, setFileFormat] = useState("{{doc-type}}-{{doc-id}}-{{company-name}}");
  const [enableProductNote, setEnableProductNote] = useState(true);
  const [defaultProductNote, setDefaultProductNote] = useState("");
  const [showExportShipping, setShowExportShipping] = useState(false);
  const [showExpenseSuggestions, setShowExpenseSuggestions] = useState(false);
  const [validateHsn, setValidateHsn] = useState(true);
  const [alertReverseCharge, setAlertReverseCharge] = useState(true);
  const [alertPastFutureDate, setAlertPastFutureDate] = useState(true);
  const [enableAuditTrail, setEnableAuditTrail] = useState(false);
  const [allowOtherCurrency, setAllowOtherCurrency] = useState(false);
  const [enablePaymentTerms, setEnablePaymentTerms] = useState(false);
  const [searchProductsAnyWord, setSearchProductsAnyWord] = useState(true);
  const [roundOfValue, setRoundOfValue] = useState("Default");
  const [enableStickyNotes, setEnableStickyNotes] = useState(false);

  // 3. Discount Settings States
  const [showDiscountField, setShowDiscountField] = useState(true);
  const [defaultDiscountType, setDefaultDiscountType] = useState("Percentage ( % )");
  const [calcDiscountPerItem, setCalcDiscountPerItem] = useState(false);
  const [showDiscountColumnAll, setShowDiscountColumnAll] = useState(false);
  const [showGeneralDiscount, setShowGeneralDiscount] = useState(false);
  const [generalDiscountLabel, setGeneralDiscountLabel] = useState("General Discount");
  const [showAmountAdjustment, setShowAmountAdjustment] = useState(true);
  const [amountAdjustmentField, setAmountAdjustmentField] = useState("TCS");
  const [applyAdjustmentOn, setApplyAdjustmentOn] = useState("Amount After Tax");
  const [showTotalDiscount, setShowTotalDiscount] = useState(true);
  const [totalDiscountLabel, setTotalDiscountLabel] = useState("Discount");

  // 4. Numbering Settings States
  const [qtyDecimals, setQtyDecimals] = useState("2");
  const [priceDecimals, setPriceDecimals] = useState("3");
  const [taxableTotalDecimals, setTaxableTotalDecimals] = useState("2");
  const [gstRateDecimals, setGstRateDecimals] = useState("2");
  const [gstDecimals, setGstDecimals] = useState("2");
  const [currencyDecimals, setCurrencyDecimals] = useState("2");

  // 5. Bill of Supply States
  const [billOfSupplyTitle, setBillOfSupplyTitle] = useState("Bill of Supply");
  const [billOfSupplyDeclaration, setBillOfSupplyDeclaration] = useState(
    "Declaration : Composition Taxable Person Not Eligible To Collect Taxes On Supplies"
  );

  // 6. Document Conversion Settings
  const [autoMapFields, setAutoMapFields] = useState(false);

  // File Upload Handlers
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string | null) => void,
    title: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      toast.success(`${title} uploaded successfully!`, { title: "Upload Success" });
    }
  };

  const handleTagInsert = (tag: string) => {
    setFileFormat((prev) => (prev ? `${prev}-${tag}` : tag));
    toast.info(`Added tag ${tag} to file format`);
  };

  const handleSave = () => {
    toast.success("All General Settings & Preferences saved successfully!", {
      title: "Settings Saved",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 pb-10">
      {/* ========================================================================= */}
      {/* 1. LOGO AND SIGNATURE SETTING                                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Logo and Signature Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Logo Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Logo
            </label>
            <div className="flex flex-wrap items-start gap-4">
              {/* Upload Box */}
              <input
                type="file"
                ref={logoInputRef}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, setLogoUrl, "Company Logo")}
                className="hidden"
              />
              <div
                onClick={() => logoInputRef.current?.click()}
                className="w-48 sm:w-56 h-32 border-2 border-dashed border-slate-300 hover:border-red-400 bg-slate-50/70 hover:bg-red-50/20 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-slate-200 group-hover:border-red-300 flex items-center justify-center mb-1.5 text-slate-500 group-hover:text-[#dc2626] transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#dc2626]">
                  Click To Upload
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  (Max Size 400 × 200)
                </span>
                <span className="text-[10px] text-slate-400">
                  .jpg, .jpeg, .png
                </span>
              </div>

              {/* Logo Preview */}
              {logoUrl && (
                <div className="relative w-48 sm:w-56 h-32 rounded-lg border border-slate-300 bg-white p-2.5 flex items-center justify-center shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setLogoUrl(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#dc2626] hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                    title="Remove Logo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={logoUrl}
                    alt="Uploaded Logo"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Enable Signature Image Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableSignature}
                onChange={(e) => setEnableSignature(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable signature image</span>
            </label>
          </div>

          {/* Signature Image Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Signature image
            </label>
            <div className="flex flex-wrap items-start gap-4">
              <input
                type="file"
                ref={signatureInputRef}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, setSignatureUrl, "Signature")}
                className="hidden"
              />
              <div
                onClick={() => signatureInputRef.current?.click()}
                className="w-48 sm:w-56 h-32 border-2 border-dashed border-slate-300 hover:border-red-400 bg-slate-50/70 hover:bg-red-50/20 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-slate-200 group-hover:border-red-300 flex items-center justify-center mb-1.5 text-slate-500 group-hover:text-[#dc2626] transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#dc2626]">
                  Click To Upload
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  (Max Size 540 × 150)
                </span>
                <span className="text-[10px] text-slate-400">
                  .jpg, .jpeg, .png
                </span>
              </div>

              {signatureUrl && (
                <div className="relative w-48 sm:w-56 h-32 rounded-lg border border-slate-300 bg-white p-2.5 flex items-center justify-center shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSignatureUrl(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#dc2626] hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                    title="Remove Signature"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={signatureUrl}
                    alt="Uploaded Signature"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Invoice Background Image Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Invoice background image
            </label>
            <div className="flex flex-wrap items-start gap-4">
              <input
                type="file"
                ref={bgInputRef}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, setBgImageUrl, "Invoice Background")}
                className="hidden"
              />
              <div
                onClick={() => bgInputRef.current?.click()}
                className="w-48 sm:w-56 h-32 border-2 border-dashed border-slate-300 hover:border-red-400 bg-slate-50/70 hover:bg-red-50/20 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-slate-200 group-hover:border-red-300 flex items-center justify-center mb-1.5 text-slate-500 group-hover:text-[#dc2626] transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#dc2626]">
                  Click To Upload
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  (Max Size 1400 × 1400)
                </span>
                <span className="text-[10px] text-slate-400">
                  .jpg, .jpeg, .png
                </span>
              </div>

              {bgImageUrl && (
                <div className="relative w-48 sm:w-56 h-32 rounded-lg border border-slate-300 bg-white p-2.5 flex items-center justify-center shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setBgImageUrl(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#dc2626] hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={bgImageUrl}
                    alt="Background Preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Invoice Footer Image Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Invoice footer image
            </label>
            <div className="flex flex-wrap items-start gap-4">
              <input
                type="file"
                ref={footerInputRef}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, setFooterImageUrl, "Invoice Footer")}
                className="hidden"
              />
              <div
                onClick={() => footerInputRef.current?.click()}
                className="w-48 sm:w-56 h-32 border-2 border-dashed border-slate-300 hover:border-red-400 bg-slate-50/70 hover:bg-red-50/20 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-slate-200 group-hover:border-red-300 flex items-center justify-center mb-1.5 text-slate-500 group-hover:text-[#dc2626] transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#dc2626]">
                  Click To Upload
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  (Max Size 1400 × 300)
                </span>
                <span className="text-[10px] text-slate-400">
                  .jpg, .jpeg, .png
                </span>
              </div>

              {footerImageUrl && (
                <div className="relative w-48 sm:w-56 h-32 rounded-lg border border-slate-300 bg-white p-2.5 flex items-center justify-center shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setFooterImageUrl(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#dc2626] hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={footerImageUrl}
                    alt="Footer Preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GENERAL SETTING                                                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            General Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Enable rounding of grand total */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableRounding}
                onChange={(e) => setEnableRounding(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable rounding of grand total in invoice</span>
            </label>
          </div>

          {/* Record per page */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Record per page
            </label>
            <select
              value={recordPerPage}
              onChange={(e) => setRecordPerPage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Show Last Selling Price */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLastSellingPrice}
                onChange={(e) => setShowLastSellingPrice(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>
                Show Last Selling Price (Based on selected Customer & Product) & Purchase History
              </span>
            </label>
          </div>

          {/* Auto Apply Last Selling Price */}
          <div className="space-y-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoApplyLastSellingPrice}
                onChange={(e) => setAutoApplyLastSellingPrice(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>
                Auto Apply Last Selling Price Based on selected Customer & Product
              </span>
            </label>
            <div className="text-[11px] text-slate-500 italic pl-6 space-y-0.5">
              <div>Note :</div>
              <div>- Applies to all customers</div>
              <div>- Available for Sales Invoices only</div>
              <div>- When enabled, Price Lists are ignored</div>
            </div>
          </div>

          {/* Update product quantity and keep price fixed */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={updateProductQtyKeepPrice}
                onChange={(e) => setUpdateProductQtyKeepPrice(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>
                Update product quantity and keep price fixed on the total amount change
              </span>
            </label>
          </div>

          {/* Calculate unit price with more decimals */}
          <div className="space-y-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={calcUnitPriceMoreDecimals}
                onChange={(e) => setCalcUnitPriceMoreDecimals(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>
                Calculate the unit price with more decimal places to match the exact item total.
              </span>
            </label>
            <div className="text-[11px] text-slate-500 italic pl-6">
              Note : In print, the unit price will be shown according to your Numbering Settings.
            </div>
          </div>

          {/* Date Format */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Date format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="d-M-y (06-Oct-25)">d-M-y (06-Oct-25)</option>
              <option value="d/m/Y (06/10/2025)">d/m/Y (06/10/2025)</option>
              <option value="Y-m-d (2025-10-06)">Y-m-d (2025-10-06)</option>
              <option value="d-m-Y (06-10-2025)">d-m-Y (06-10-2025)</option>
            </select>
          </div>

          {/* File Format */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              File format
            </label>
            <textarea
              rows={2}
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              className="w-full max-w-lg px-3.5 py-2 rounded-md border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-500 italic block">
                Note: In Custom File name formatting, you can use the following tags :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "{{doc-type}}",
                  "{{doc-id}}",
                  "{{company-name}}",
                  "{{contact-name}}",
                  "{{date}}",
                  "{{time}}",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagInsert(tag)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-red-50 hover:text-[#dc2626] border border-slate-200 hover:border-red-300 text-[11px] font-mono text-slate-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enable note for each product */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableProductNote}
                onChange={(e) => setEnableProductNote(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>
                Enable note for each product in invoice (ex: to write product serial number)
              </span>
            </label>
          </div>

          {/* Default product note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Default product note
            </label>
            <textarea
              rows={2}
              value={defaultProductNote}
              onChange={(e) => setDefaultProductNote(e.target.value)}
              className="w-full max-w-lg px-3.5 py-2 rounded-md border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          {/* List of general feature checkboxes */}
          <div className="space-y-2.5 pt-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showExportShipping}
                onChange={(e) => setShowExportShipping(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show Export Shipping Detail section for all documents</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showExpenseSuggestions}
                onChange={(e) => setShowExpenseSuggestions(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show added expense title as suggestions while entering new expense record</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={validateHsn}
                onChange={(e) => setValidateHsn(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Validate HSN codes in invoice</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={alertReverseCharge}
                onChange={(e) => setAlertReverseCharge(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show alert when reverse charge is applied</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={alertPastFutureDate}
                onChange={(e) => setAlertPastFutureDate(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show alert when generating invoice with past-future date</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableAuditTrail}
                onChange={(e) => setEnableAuditTrail(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable audit trail logs</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allowOtherCurrency}
                onChange={(e) => setAllowOtherCurrency(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Allow create invoice in other currency</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enablePaymentTerms}
                onChange={(e) => setEnablePaymentTerms(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable payment term option for all documents</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={searchProductsAnyWord}
                onChange={(e) => setSearchProductsAnyWord(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                Search Products by Any Word (while creating documents)
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </span>
            </label>
          </div>

          {/* Round of value */}
          <div className="space-y-1.5 max-w-xs pt-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Round of value
            </label>
            <select
              value={roundOfValue}
              onChange={(e) => setRoundOfValue(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Default">Default</option>
              <option value="Round Up">Round Up</option>
              <option value="Round Down">Round Down</option>
              <option value="Nearest Normal">Nearest Normal</option>
            </select>
          </div>

          {/* Enable Sticky Notes */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableStickyNotes}
                onChange={(e) => setEnableStickyNotes(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Enable Sticky Notes</span>
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DISCOUNT SETTING                                                       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Discount Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Show discount field in invoice */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiscountField}
                onChange={(e) => setShowDiscountField(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show discount field in invoice</span>
            </label>
          </div>

          {/* Default discount */}
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Default discount
            </label>
            <select
              value={defaultDiscountType}
              onChange={(e) => setDefaultDiscountType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="Percentage ( % )">Percentage ( % )</option>
              <option value="Fixed Amount ( ₹ )">Fixed Amount ( ₹ )</option>
            </select>
          </div>

          {/* Calculate discount per each Item */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={calcDiscountPerItem}
                onChange={(e) => setCalcDiscountPerItem(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Calculate discount per each Item</span>
            </label>
          </div>

          {/* Show discount column on all documents */}
          <div>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiscountColumnAll}
                onChange={(e) => setShowDiscountColumnAll(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show discount column on all documents (Even if no discount is applied)</span>
            </label>
          </div>

          {/* Show general discount on all document */}
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showGeneralDiscount}
                onChange={(e) => setShowGeneralDiscount(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show general discount on all document</span>
            </label>

            {showGeneralDiscount && (
              <div className="space-y-1.5 pl-6 max-w-xs">
                <label className="text-xs font-semibold text-slate-700 block">
                  General discount label
                </label>
                <input
                  type="text"
                  value={generalDiscountLabel}
                  onChange={(e) => setGeneralDiscountLabel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
                />
              </div>
            )}
          </div>

          {/* Show Amount adjustment field on all document */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showAmountAdjustment}
                onChange={(e) => setShowAmountAdjustment(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show Amount adjustment field on all document</span>
            </label>

            {showAmountAdjustment && (
              <div className="space-y-3 pl-6 max-w-xs">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Amount adjustment field
                  </label>
                  <input
                    type="text"
                    value={amountAdjustmentField}
                    onChange={(e) => setAmountAdjustmentField(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Apply adjustment on
                  </label>
                  <select
                    value={applyAdjustmentOn}
                    onChange={(e) => setApplyAdjustmentOn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
                  >
                    <option value="Amount After Tax">Amount After Tax</option>
                    <option value="Amount Before Tax">Amount Before Tax</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Show Total discount on all document */}
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showTotalDiscount}
                onChange={(e) => setShowTotalDiscount(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
              <span>Show Total discount on all document</span>
            </label>

            {showTotalDiscount && (
              <div className="space-y-1.5 pl-6 max-w-xs">
                <label className="text-xs font-semibold text-slate-700 block">
                  Total discount label
                </label>
                <input
                  type="text"
                  value={totalDiscountLabel}
                  onChange={(e) => setTotalDiscountLabel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. NUMBERING SETTING                                                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Numbering Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Quantity decimal value */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Quantity decimal value
            </label>
            <select
              value={qtyDecimals}
              onChange={(e) => setQtyDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <span className="text-[11px] text-slate-500 italic block">
              E-Invoice support 3 digit decimal & E-Way Bill support 2 digit decimal
            </span>
          </div>

          {/* Price decimal value */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Price decimal value
            </label>
            <select
              value={priceDecimals}
              onChange={(e) => setPriceDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <span className="text-[11px] text-slate-500 italic block">
              E-Invoice support 3 digit decimal & E-Way Bill support 6 digit decimal
            </span>
          </div>

          {/* Taxable total decimal */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Taxable total decimal
            </label>
            <select
              value={taxableTotalDecimals}
              onChange={(e) => setTaxableTotalDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="text-[11px] text-slate-500 italic block">
              E-Invoice support 2 digit decimal & E-Way Bill support 2 digit decimal
            </span>
          </div>

          {/* GST rate(%) decimal value */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              GST rate(%) decimal value
            </label>
            <select
              value={gstRateDecimals}
              onChange={(e) => setGstRateDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="text-[11px] text-slate-500 italic block">
              E-Invoice support 3 digit decimal & E-Way Bill support 3 digit decimal
            </span>
          </div>

          {/* GST decimal value */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              GST decimal value
            </label>
            <select
              value={gstDecimals}
              onChange={(e) => setGstDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="text-[11px] text-slate-500 italic block">
              E-Invoice support 2 digit decimal & E-Way Bill support 2 digit decimal
            </span>
          </div>

          {/* Currency decimal value */}
          <div className="space-y-1 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 block">
              Currency decimal value
            </label>
            <select
              value={currencyDecimals}
              onChange={(e) => setCurrencyDecimals(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BILL OF SUPPLY SETTING                                                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Bill of supply Setting
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5 max-w-lg">
            <label className="text-xs font-semibold text-slate-700 block">
              Bill of supply title
            </label>
            <input
              type="text"
              value={billOfSupplyTitle}
              onChange={(e) => setBillOfSupplyTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5 max-w-lg">
            <label className="text-xs font-semibold text-slate-700 block">
              Bill of supply declaration
            </label>
            <textarea
              rows={3}
              value={billOfSupplyDeclaration}
              onChange={(e) => setBillOfSupplyDeclaration(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. DOCUMENT CONVERSION SETTINGS                                           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Document Conversion Settings
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoMapFields}
              onChange={(e) => setAutoMapFields(e.target.checked)}
              className="w-4 h-4 accent-red-600 rounded cursor-pointer"
            />
            <span>Auto-map fields during document conversion</span>
          </label>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR                                                         */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() =>
            toast.info("Opening Advance System Configuration...", {
              title: "Advance Configuration",
            })
          }
          className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Advance Configuration</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
}
