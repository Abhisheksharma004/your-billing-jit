"use client";

import React from "react";
import { X, MapPin, Building2 } from "lucide-react";

export interface DispatchAddress {
  id: string;
  gstin?: string;
  companyName: string;
  name?: string;
  phone?: string;
  email?: string;
  addressLine1: string;
  landmark: string;
  city: string;
  country: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

interface DispatchAddressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: string | null;
  form: {
    gstin: string;
    companyName: string;
    name: string;
    phone: string;
    email: string;
    addressLine1: string;
    landmark: string;
    city: string;
    country: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      gstin: string;
      companyName: string;
      name: string;
      phone: string;
      email: string;
      addressLine1: string;
      landmark: string;
      city: string;
      country: string;
      state: string;
      pincode: string;
      isDefault: boolean;
    }>
  >;
  onSave: (e: React.FormEvent) => void;
  onAutoFillGstin: () => void;
}

export default function DispatchAddressDrawer({
  isOpen,
  onClose,
  editingId,
  form,
  setForm,
  onSave,
  onAutoFillGstin,
}: DispatchAddressDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {editingId ? "Edit Dispatch Address" : "Add Dispatch from Address"}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Enter dispatch warehouse / branch details for invoicing.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <form onSubmit={onSave} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* 1. GSTIN */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">GSTIN</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.gstin}
                  onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
                  placeholder="Enter Dispatch GSTIN"
                  className="flex-1 px-3.5 py-2 rounded-md border border-slate-300 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={onAutoFillGstin}
                  className="px-3 py-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
                >
                  Auto Fill
                </button>
              </div>
            </div>

            {/* 2. Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Company Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="Enter company name"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 3. Contact Person */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">Contact Person Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 4. Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter phone"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 5. Email */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter Email"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* Section Header */}
            <div className="pt-3 pb-1 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-700" />
              <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Dispatch Address</h5>
            </div>

            {/* 6. Address */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Address<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                placeholder="Enter address"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 7. Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Landmark <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.landmark}
                onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                placeholder="Enter landmark"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 8. City */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                City <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Enter city"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 9. Country */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Country <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="India"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-slate-50 text-xs text-slate-800 focus:outline-none shadow-2xs"
              />
            </div>

            {/* 10. State */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                State <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="Select / Enter state"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 11. Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Pincode <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                placeholder="Enter pincode"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 12. Default Checkbox */}
            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                />
                <span className="text-slate-700 font-semibold text-xs">Set as default dispatch address</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-slate-200/80 bg-slate-50/60 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
