"use client";

import React, { useState } from "react";
import { Plus, Check, Edit3, Trash2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import DispatchAddressDrawer, { DispatchAddress } from "../components/DispatchAddressDrawer";

export default function BusinessProfileSettingsPage() {
  const toast = useToast();
  const [gstin, setGstin] = useState("07AALCV0054F1ZG");
  const [tradeName, setTradeName] = useState("Viros Entrepreneurs IT Solutions Private Limited");
  const [contactFullName, setContactFullName] = useState("");
  const [displayPhone, setDisplayPhone] = useState("9871029141");
  const [email, setEmail] = useState("sales@virosentrepreneurs.com");
  const [companyType, setCompanyType] = useState("Private Limited Company");
  const [pan, setPan] = useState("AALCV0054F");
  const [address, setAddress] = useState("25/2, Street -2, 1st Floor, Molarband Market,");
  const [landmark, setLandmark] = useState("Beside Om TVS bike Showroom, Badarpur");
  const [pincode, setPincode] = useState("110044");
  const [city, setCity] = useState("South East Delhi");
  const [stateName, setStateName] = useState("Delhi ( 07 )");
  const [licencesList, setLicencesList] = useState<Array<{ id: string; name: string; value: string }>>([
    { id: "lic-1", name: "", value: "" },
  ]);
  const [lutNumber, setLutNumber] = useState("");
  const [iecNumber, setIecNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("www.virosentrepreneurs.com");

  // Dispatch Addresses State
  const [dispatchAddresses, setDispatchAddresses] = useState<DispatchAddress[]>([
    {
      id: "disp-1",
      companyName: "Texonic Instruments",
      name: "Ms. Laxmi",
      phone: "9876543210",
      email: "contact@texonic.com",
      addressLine1: "2 Mandiveerappa Lane, Sjp Road Cross",
      landmark: "Near City Market",
      city: "Bengaluru Urban",
      country: "India",
      state: "Karnataka ( 29 )",
      pincode: "560002",
      gstin: "29AAAFT1650M1ZY",
      isDefault: true,
    },
    {
      id: "disp-2",
      companyName: "Texonic Instruments",
      name: "Ms. Laxmi",
      phone: "9876543210",
      email: "support@texonic.com",
      addressLine1: "2 Mandiveerappa Lane",
      landmark: "Sjp Road Cross",
      city: "Bengaluru Urban",
      country: "India",
      state: "Karnataka ( 29 )",
      pincode: "560002",
      gstin: "29AAAFT1650M1ZY",
      isDefault: false,
    },
    {
      id: "disp-4",
      companyName: "Viros Entrepreneurs IT Solutions Private Limited (17717)",
      name: "Rachana Singh",
      phone: "9871029141",
      email: "sales@virosentrepreneurs.com",
      addressLine1: "A-8, Ground Floor, Street No.2",
      landmark: "Molarband Market Badarpur",
      city: "Delhi",
      country: "India",
      state: "Delhi ( 07 )",
      pincode: "110044",
      isDefault: false,
    },
  ]);

  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [editingDispatchId, setEditingDispatchId] = useState<string | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    gstin: "",
    companyName: "",
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    landmark: "",
    city: "",
    country: "India",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const handleOpenAddDispatch = () => {
    setEditingDispatchId(null);
    setDispatchForm({
      gstin: "",
      companyName: tradeName || "",
      name: contactFullName || "",
      phone: displayPhone || "",
      email: email || "",
      addressLine1: "",
      landmark: "",
      city: "",
      country: "India",
      state: stateName || "",
      pincode: "",
      isDefault: dispatchAddresses.length === 0,
    });
    setShowDispatchModal(true);
  };

  const handleOpenEditDispatch = (item: DispatchAddress) => {
    setEditingDispatchId(item.id);
    setDispatchForm({
      gstin: item.gstin || "",
      companyName: item.companyName,
      name: item.name || "",
      phone: item.phone || "",
      email: item.email || "",
      addressLine1: item.addressLine1,
      landmark: item.landmark,
      city: item.city,
      country: item.country || "India",
      state: item.state,
      pincode: item.pincode,
      isDefault: !!item.isDefault,
    });
    setShowDispatchModal(true);
  };

  const handleDeleteDispatch = (id: string) => {
    setDispatchAddresses((prev) => prev.filter((d) => d.id !== id));
    toast.success("Dispatch address removed.");
  };

  const handleSetDefaultDispatch = (id: string) => {
    setDispatchAddresses((prev) =>
      prev.map((d) => ({
        ...d,
        isDefault: d.id === id,
      }))
    );
    toast.success("Default dispatch address updated.");
  };

  const handleAutoFillDispatchGstin = () => {
    if (!dispatchForm.gstin || dispatchForm.gstin.length < 15) {
      toast.error("Please enter a valid 15-digit GSTIN first.");
      return;
    }
    toast.success("Fetched organisation details from GST Portal!");
  };

  const handleSaveDispatchAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchForm.companyName.trim()) {
      toast.error("Company Name is required.");
      return;
    }
    if (!dispatchForm.addressLine1.trim()) {
      toast.error("Address is required.");
      return;
    }

    if (editingDispatchId) {
      setDispatchAddresses((prev) =>
        prev.map((d) =>
          d.id === editingDispatchId
            ? { ...dispatchForm, id: editingDispatchId }
            : dispatchForm.isDefault
            ? { ...d, isDefault: false }
            : d
        )
      );
      toast.success("Dispatch address updated successfully!");
    } else {
      const newAddr: DispatchAddress = {
        ...dispatchForm,
        id: "disp-" + Date.now(),
      };
      setDispatchAddresses((prev) => [
        ...(dispatchForm.isDefault ? prev.map((d) => ({ ...d, isDefault: false })) : prev),
        newAddr,
      ]);
      toast.success("New dispatch address added successfully!");
    }
    setShowDispatchModal(false);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("OTP sent to registered mobile & email to verify profile changes.");
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-6 animate-in fade-in-50 duration-150">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-800">Organisation Detail</h3>
        <p className="text-xs text-slate-500 mt-0.5">Manage business profile credentials, registration numbers, and invoice header details.</p>
      </div>

      <form onSubmit={handleSendOtp} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* 1. GSTIN */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">GSTIN</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                placeholder="07AALCV0054F1ZG"
                className="flex-1 px-3.5 py-2 rounded-md border border-slate-300 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => toast.success("Fetched company data from GST Portal.")}
                className="px-3.5 py-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                Auto Fill
              </button>
            </div>
          </div>

          {/* 2. Trade Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Business / Trade Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={tradeName}
              onChange={(e) => setTradeName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 3. Contact Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Contact Person Name</label>
            <input
              type="text"
              value={contactFullName}
              onChange={(e) => setContactFullName(e.target.value)}
              placeholder="Enter contact person name"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 4. Display Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Display Phone Number</label>
            <input
              type="tel"
              value={displayPhone}
              onChange={(e) => setDisplayPhone(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 5. Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 6. Company Type */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Company Type</label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            >
              <option>Private Limited Company</option>
              <option>Partnership Firm</option>
              <option>Proprietorship</option>
              <option>Public Limited Company</option>
              <option>LLP</option>
            </select>
          </div>

          {/* 7. PAN */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">PAN Number</label>
            <input
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 8. Address */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 9. Landmark */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Landmark</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 10. Pincode */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 11. City */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 12. State */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">State</label>
            <input
              type="text"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>

          {/* 13. Website */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">Website</label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Send OTP</span>
          </button>
        </div>
      </form>

      {/* Dispatch from Address Section */}
      <div className="pt-6 border-t border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">Dispatch from Address</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Configure multiple dispatch and warehouse locations for E-Way Bill and GST invoices.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddDispatch}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Dispatch Address</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100">
                <th className="pb-3 font-semibold text-slate-600">Business / Unit Name</th>
                <th className="pb-3 font-semibold text-slate-600">Contact Person</th>
                <th className="pb-3 font-semibold text-slate-600">Dispatch Address</th>
                <th className="pb-3 font-semibold text-slate-600">GSTIN</th>
                <th className="pb-3 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {dispatchAddresses.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 text-slate-900 font-medium">{item.companyName}</td>
                  <td className="py-3 text-slate-600">
                    <div>{item.name || "-"}</div>
                    {item.phone && <div className="text-[11px] text-slate-400 font-normal">{item.phone}</div>}
                  </td>
                  <td className="py-3 text-slate-600 leading-relaxed max-w-sm">
                    <span>{item.addressLine1}</span>
                    {item.landmark && <span>, {item.landmark}</span>}
                    <div className="text-slate-400 text-[11px]">{item.city}{item.state ? `, ${item.state}` : ""}{item.pincode ? ` - ${item.pincode}` : ""}</div>
                  </td>
                  <td className="py-3 text-slate-500 font-mono">{item.gstin || "-"}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      {item.isDefault ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          Default
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetDefaultDispatch(item.id)}
                          className="px-2.5 py-0.5 rounded text-[11px] font-medium border border-slate-200 hover:border-red-400 hover:text-[#dc2626] hover:bg-red-50 text-slate-600 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenEditDispatch(item)}
                        className="p-1 text-slate-400 hover:text-[#dc2626] transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDispatch(item.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Address Drawer */}
      <DispatchAddressDrawer
        isOpen={showDispatchModal}
        onClose={() => setShowDispatchModal(false)}
        editingId={editingDispatchId}
        form={dispatchForm}
        setForm={setDispatchForm}
        onSave={handleSaveDispatchAddress}
        onAutoFillGstin={handleAutoFillDispatchGstin}
      />
    </div>
  );
}
