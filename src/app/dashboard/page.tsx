"use client";

import React, { useState } from "react";
import DashboardNavbar, { ActiveDashboardTab } from "@/components/DashboardNavbar";
import DraggableCalculator from "@/components/DraggableCalculator";
import { useToast } from "@/context/ToastContext";
import {
  FileText,
  Users,
  Package,
  BarChart3,
  ShoppingCart,
  Wallet,
  ArrowUpDown,
  Files,
  Receipt,
  Search,
  FileSpreadsheet,
  Calculator,
  X,
  Plus,
  TrendingUp,
  ClipboardList,
  Building2,
  Printer,
  Landmark,
  Percent,
  Shield,
  Bell,
  Save,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";

import { useRouter } from "next/navigation";

interface QuickActionModalType {
  isOpen: boolean;
  type: "invoice" | "customer" | "product" | "payment" | "expense" | "calculator" | null;
}

interface CompanySessionData {
  id: number;
  companyId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  trialStart: string;
  trialEnd: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const toast = useToast();

  // State management
  const [activeTab, setActiveTab] = useState<ActiveDashboardTab>("dashboard");
  const [selectedFY, setSelectedFY] = useState("F.Y. 2026-2027");
  const [showCalculator, setShowCalculator] = useState(false);
  const [companySession, setCompanySession] = useState<CompanySessionData | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Fetch current logged-in company session & prevent back-nav to auth
  React.useEffect(() => {
    // 1. Immediately read cached company/user data on client mount
    if (typeof window !== "undefined") {
      const cachedCompany = localStorage.getItem("active_company_name");
      const cachedUser = localStorage.getItem("active_user_name");
      const cachedCompanyId = localStorage.getItem("active_company_id");
      if (cachedCompany) setCompanyName(cachedCompany);
      if (cachedUser) setUserName(cachedUser);
      if (cachedCompanyId) setCompanyId(cachedCompanyId);
    }

    // 2. Verify with server session
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.company) {
            setCompanySession(data.company);
            if (data.company.companyName) {
              setCompanyName(data.company.companyName);
              localStorage.setItem("active_company_name", data.company.companyName);
            }
            if (data.company.contactPerson) {
              setUserName(data.company.contactPerson);
              localStorage.setItem("active_user_name", data.company.contactPerson);
            }
            if (data.company.companyId) {
              setCompanyId(data.company.companyId);
              localStorage.setItem("active_company_id", data.company.companyId);
            }
            if (data.company.email) {
              localStorage.setItem("active_user_email", data.company.email);
            }
          }
        } else if (res.status === 401) {
          // No active session -> replace URL to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("active_company_name");
            localStorage.removeItem("active_user_name");
            localStorage.removeItem("active_company_id");
            localStorage.removeItem("active_user_email");
          }
          router.replace("/login");
        }
      } catch (err) {
        console.error("Session verification error:", err);
      } finally {
        setIsLoadingSession(false);
      }
    }
    checkSession();
  }, [router]);

  // Calculator state
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");

  // Quick Action Modal State
  const [modal, setModal] = useState<QuickActionModalType>({ isOpen: false, type: null });

  // Search filter inside tabs
  const [searchQuery, setSearchQuery] = useState("");

  // Handle calculator evaluation
  const handleCalcButton = (val: string) => {
    if (val === "C") {
      setCalcInput("");
      setCalcResult("");
    } else if (val === "=") {
      try {
        const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, "");
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcResult(String(res));
      } catch {
        setCalcResult("Error");
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-900 selection:bg-red-500 selection:text-white">

      {/* Standalone Dashboard Navbar Component */}
      <DashboardNavbar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        companyName={companyName}
        userName={userName}
        userEmail={companySession?.email}
        companyId={companyId || companySession?.companyId}
        trialEnd={companySession?.trialEnd}
        selectedFY={selectedFY}
        onChangeFY={(fy) => setSelectedFY(fy)}
        onOpenQuickModal={(type) => setModal({ isOpen: true, type })}
        onToggleCalculator={() => setShowCalculator(!showCalculator)}
        showCalculator={showCalculator}
      />

      {/* ========================================================================= */}
      {/* 3. MAIN DASHBOARD CONTENT (FORMAT AS IN SCREENSHOT WITH BRAND RED THEME)  */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative">

        {/* --- VIEW 1: WELCOME SCREEN (PIXEL PERFECT TO USER SCREENSHOT) --- */}
        {activeTab === "dashboard" && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto py-8 sm:py-16 text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">

            {/* Waving Hand Centerpiece (Exact Icon Format from Screenshot) */}
            <div className="relative inline-flex items-center justify-center group cursor-pointer">
              {/* Animated Waving Waves SVG */}


              {/* Text: Welcome! */}

            </div>

            {/* Quick Action Setup Cards */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-left">

              {/* Card 1: Create Invoice */}
              <div
                onClick={() => setModal({ isOpen: true, type: "invoice" })}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-red-500 hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
                    1. Create Sale Invoice
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Generate professional GST invoices with QR code & E-way bill.
                  </p>
                </div>
                <div className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Create Now</span> →
                </div>
              </div>

              {/* Card 2: Add Customer */}
              <div
                onClick={() => setModal({ isOpen: true, type: "customer" })}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                    2. Add Customer / Vendor
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage ledger balance, GSTIN verification & credit limit.
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Add Party</span> →
                </div>
              </div>

              {/* Card 3: Add Items */}
              <div
                onClick={() => setModal({ isOpen: true, type: "product" })}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    3. Add Products & Stock
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Set HSN/SAC codes, GST tax slabs, barcodes & stock levels.
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Add Product</span> →
                </div>
              </div>

              {/* Card 4: Reports & GST */}
              <div
                onClick={() => setActiveTab("reports")}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                    4. GST & Accounting
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    One-click GSTR-1, GSTR-3B JSON exports, Profit & Loss.
                  </p>
                </div>
                <div className="text-xs font-bold text-purple-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Reports</span> →
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- VIEW 2: CUSTOMER / VENDOR --- */}
        {activeTab === "customer-vendor" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer & Vendor Ledger</h2>
                <p className="text-xs text-slate-500">Manage all business contacts, outstanding balances, and GSTINs.</p>
              </div>
              <button
                onClick={() => setModal({ isOpen: true, type: "customer" })}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Customer / Vendor</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search customer name, mobile or GSTIN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Sample Party Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Party Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Mobile</th>
                      <th className="py-2.5 px-3">GSTIN</th>
                      <th className="py-2.5 px-3 text-right">Balance (₹)</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Sharma Traders</td>
                      <td className="py-3 px-3"><span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">Customer</span></td>
                      <td className="py-3 px-3 font-mono">9876543210</td>
                      <td className="py-3 px-3 font-mono">07AAAAA0000A1Z5</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">₹ 14,250.00 Cr</td>
                      <td className="py-3 px-3 text-center">
                        <button className="text-red-600 font-bold hover:underline">View Ledger</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Global Tech Supplies</td>
                      <td className="py-3 px-3"><span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">Vendor</span></td>
                      <td className="py-3 px-3 font-mono">9123456780</td>
                      <td className="py-3 px-3 font-mono">27BBBBB1111B2Z8</td>
                      <td className="py-3 px-3 text-right font-bold text-red-600">₹ 8,900.00 Dr</td>
                      <td className="py-3 px-3 text-center">
                        <button className="text-red-600 font-bold hover:underline">View Ledger</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: PRODUCTS / SERVICES --- */}
        {activeTab === "products-services" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Products & Services Catalog</h2>
                <p className="text-xs text-slate-500">Track stock inventory, HSN codes, and pricing tiers.</p>
              </div>
              <button
                onClick={() => setModal({ isOpen: true, type: "product" })}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Product / Item</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Item Name</th>
                      <th className="py-2.5 px-3">HSN/SAC</th>
                      <th className="py-2.5 px-3">GST Rate</th>
                      <th className="py-2.5 px-3 text-right">Sale Price (₹)</th>
                      <th className="py-2.5 px-3 text-right">Stock Qty</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">ERP Software Standard License</td>
                      <td className="py-3 px-3 font-mono text-slate-500">998314</td>
                      <td className="py-3 px-3 font-bold text-purple-700">18%</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">₹ 14,999.00</td>
                      <td className="py-3 px-3 text-right font-semibold text-emerald-600">Unlimited (Service)</td>
                      <td className="py-3 px-3 text-center">
                        <button className="text-red-600 font-bold hover:underline">Edit</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Thermal Billing Printer 80mm</td>
                      <td className="py-3 px-3 font-mono text-slate-500">844332</td>
                      <td className="py-3 px-3 font-bold text-purple-700">18%</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">₹ 4,500.00</td>
                      <td className="py-3 px-3 text-right font-bold text-amber-600">18 Pcs</td>
                      <td className="py-3 px-3 text-center">
                        <button className="text-red-600 font-bold hover:underline">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: QUOTATION / ESTIMATE --- */}
        {activeTab === "quotation-estimate" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Quotations & Estimates</h2>
                <p className="text-xs text-slate-500">Create commercial estimates and convert them into GST invoices in 1 click.</p>
              </div>
              <button
                onClick={() => toast.info("Opening Quotation Creation Form...", { title: "New Estimate" })}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create New Quotation</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search quotation no, client name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Quotation Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Quotation No</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Client Name</th>
                      <th className="py-2.5 px-3 text-right">Estimated Amount (₹)</th>
                      <th className="py-2.5 px-3">Valid Till</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-red-600 font-mono">EST-2026-042</td>
                      <td className="py-3 px-3">21 Sep 2026</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">Mahindra Hardware & Electricals</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">₹ 42,000.00</td>
                      <td className="py-3 px-3 text-slate-500">05 Oct 2026</td>
                      <td className="py-3 px-3">
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Pending Approval
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center space-x-2">
                        <button
                          onClick={() => toast.success("Quotation converted to Sale Invoice!", { title: "Converted" })}
                          className="text-red-600 hover:text-red-700 font-bold hover:underline"
                        >
                          Convert to Invoice
                        </button>
                        <span className="text-slate-300">|</span>
                        <button className="text-slate-600 hover:text-slate-900 font-medium">Print</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-red-600 font-mono">EST-2026-041</td>
                      <td className="py-3 px-3">18 Sep 2026</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">Sharma Traders</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">₹ 18,500.00</td>
                      <td className="py-3 px-3 text-slate-500">30 Sep 2026</td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Accepted
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center space-x-2">
                        <button
                          onClick={() => toast.success("Quotation converted to Sale Invoice!", { title: "Converted" })}
                          className="text-red-600 hover:text-red-700 font-bold hover:underline"
                        >
                          Convert to Invoice
                        </button>
                        <span className="text-slate-300">|</span>
                        <button className="text-slate-600 hover:text-slate-900 font-medium">Print</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 4: SALE INVOICE --- */}
        {activeTab === "sale-invoice" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Sale Invoices</h2>
                <p className="text-xs text-slate-500">Generate, print, and track payments for tax invoices.</p>
              </div>
              <button
                onClick={() => setModal({ isOpen: true, type: "invoice" })}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create New Invoice</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Invoice No</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Customer Name</th>
                      <th className="py-2.5 px-3 text-right">Taxable (₹)</th>
                      <th className="py-2.5 px-3 text-right">Total Amount (₹)</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-red-600 font-mono">INV-2026-001</td>
                      <td className="py-3 px-3">21 Sep 2026</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">Apex Retail Stores</td>
                      <td className="py-3 px-3 text-right font-mono">₹ 25,000.00</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">₹ 29,500.00</td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          PAID
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center space-x-2">
                        <button className="text-slate-600 hover:text-slate-900 font-bold">Print</button>
                        <button className="text-red-600 hover:text-red-700 font-bold">PDF</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 5: PURCHASE INVOICE --- */}
        {activeTab === "purchase-invoice" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Purchase Invoices & Bills</h2>
                <p className="text-xs text-slate-500">Record vendor bills, input tax credits (ITC), and payments.</p>
              </div>
              <button
                onClick={() => toast.info("Opening Purchase Bill Form")}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Purchase Bill</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs space-y-2">
              <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-800">No purchase invoices yet</div>
              <p>Add your first vendor invoice to track expenses and claim GST Input Tax Credit (ITC).</p>
            </div>
          </div>
        )}

        {/* --- VIEW 6: PAYMENT --- */}
        {activeTab === "payment" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Payment Receipts & Vouchers</h2>
                <p className="text-xs text-slate-500">Record payments received from customers and payments made to vendors.</p>
              </div>
              <button
                onClick={() => setModal({ isOpen: true, type: "payment" })}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Record Payment</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs space-y-2">
              <Wallet className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-800">Payment receipts ledger ready</div>
              <p>Track Bank Transfers (NEFT/RTGS), UPI, Cheques, and Cash transactions.</p>
            </div>
          </div>
        )}

        {/* --- VIEW 7: EXPENSE / INCOME --- */}
        {activeTab === "expense-income" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Expense & Other Income</h2>
                <p className="text-xs text-slate-500">Record daily petty cash, rent, electricity, and miscellaneous business income.</p>
              </div>
              <button
                onClick={() => toast.info("Opening Expense Entry Form")}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Expense / Income</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs space-y-2">
              <ArrowUpDown className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-800">Expense tracker is active</div>
              <p>Keep track of operating costs to generate automatic P&L reports.</p>
            </div>
          </div>
        )}

        {/* --- VIEW 8: OTHER DOCUMENTS --- */}
        {activeTab === "other-documents" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Other Business Documents</h2>
              <p className="text-xs text-slate-500">Generate Quotations, Proforma Invoices, Delivery Challans, and Credit/Debit Notes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Quotation / Estimate", icon: Files, desc: "Send pricing quotes before billing" },
                { title: "Proforma Invoice", icon: FileText, desc: "Advance billing for pre-orders" },
                { title: "Delivery Challan", icon: ShoppingCart, desc: "Goods transport document" },
                { title: "Credit / Debit Note", icon: Receipt, desc: "Sales return and price adjustments" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => toast.info(`Opening ${doc.title}`)}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-red-500 hover:shadow-sm transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 flex items-center justify-center transition-colors">
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-red-600">{doc.title}</div>
                  <p className="text-xs text-slate-500">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW 9: REPORTS --- */}
        {activeTab === "reports" && (
          <div className="w-full max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">GST & Financial Reports</h2>
              <p className="text-xs text-slate-500">Government compliant GST returns, Sales Summary, Balance Sheet & Stock registers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-red-600" />
                  <span>GST Filing Returns</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>GSTR-1 (Outward Supplies)</span>
                    <button className="text-red-600 font-bold hover:underline">Download JSON</button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>GSTR-3B (Tax Summary)</span>
                    <button className="text-red-600 font-bold hover:underline">Download Excel</button>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>GSTR-2B Reconciliation</span>
                    <button className="text-red-600 font-bold hover:underline">Reconcile</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Sales & Purchase Reports</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Monthly Sales Register</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Party-wise Sales Report</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Item-wise Sales Report</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                  <span>Accounting Statements</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Profit & Loss Statement</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Day Book / Cash Book</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Stock Summary Register</span>
                    <button className="text-red-600 font-bold hover:underline">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER (CLEAN & SUBTLE)                                                */}
      {/* ========================================================================= */}
      <footer className="py-2.5 px-4 sm:px-6 bg-white border-t border-slate-200 text-left text-xs text-slate-500 flex items-center justify-between">
        <div>
          © {new Date().getFullYear()} Your Billing Software
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>GST Version 4.2.1</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Database Online
          </span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. FLOATING DRAGGABLE QUICK CALCULATOR                                     */}
      {/* ========================================================================= */}
      <DraggableCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* ========================================================================= */}
      {/* 6. MODAL: QUICK INVOICE CREATION DIALOG                                    */}
      {/* ========================================================================= */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {modal.type === "invoice" && "Create New Sale Invoice"}
                {modal.type === "customer" && "Add New Customer / Vendor"}
                {modal.type === "product" && "Add New Product or Service"}
                {modal.type === "payment" && "Record Payment Entry"}
              </h3>
              <button
                onClick={() => setModal({ isOpen: false, type: null })}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                This will launch the complete {modal.type} form with full GST calculations, HSN master lookup, and PDF generator.
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                Active Financial Year: <strong className="text-slate-900">{selectedFY}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setModal({ isOpen: false, type: null })}
                className="py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-2xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModal({ isOpen: false, type: null });
                  toast.success(`${modal.type} form opened successfully!`);
                }}
                className="py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Form</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
