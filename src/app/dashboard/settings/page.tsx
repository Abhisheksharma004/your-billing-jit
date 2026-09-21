"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNavbar, { ActiveDashboardTab } from "@/components/DashboardNavbar";
import { useToast } from "@/context/ToastContext";
import {
  Users,
  Coins,
  Shield,
  MessageCircle,
  User,
  Settings as SettingsIcon,
  Package,
  FileSpreadsheet,
  Printer,
  Landmark,
  FileText,
  Info,
  Truck,
  ArrowLeftRight,
  MailCheck,
  Bell,
  Heading,
  Save,
  Upload,
  Plus,
  QrCode,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Search,
  Check,
  Building2,
  Edit3
} from "lucide-react";

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

export type SettingTabId =
  // Account Settings
  | "membership"
  | "credits"
  | "login-security"
  | "whatsapp-options"
  | "business-profile"
  // Application Settings
  | "general-options"
  | "product-stock"
  | "print-template"
  | "print-options"
  | "bank-details"
  | "document-options"
  | "terms-conditions"
  | "shipping-envelope"
  | "translation-options"
  | "email-whatsapp-templates"
  | "payment-reminder"
  | "custom-header";

export default function SettingsSeparatePage() {
  const router = useRouter();
  const toast = useToast();

  // Active Selected Tab (Default to "membership" matching user screenshot)
  const [activeTab, setActiveTab] = useState<SettingTabId>("membership");

  // Session & Navbar States
  const [selectedFY, setSelectedFY] = useState("F.Y. 2026-2027");
  const [showCalculator, setShowCalculator] = useState(false);
  const [companySession, setCompanySession] = useState<CompanySessionData | null>(null);
  const [companyName, setCompanyName] = useState<string>("Abhishek Enterprises");
  const [userName, setUserName] = useState<string>("Abhishek Sharma");
  const [companyId, setCompanyId] = useState<string>("GST-88492");

  // 1. Business Profile Form State
  const [tradeName, setTradeName] = useState("Abhishek Enterprises");
  const [legalName, setLegalName] = useState("Abhishek Enterprises Private Limited");
  const [gstin, setGstin] = useState("07AAAAA0000A1Z5");
  const [pan, setPan] = useState("AAAAA0000A");
  const [phone, setPhone] = useState("+91 8377929141");
  const [email, setEmail] = useState("support@virosentrepreneurs.com");
  const [address, setAddress] = useState("Plot No. 42, Sector 18, Udyog Vihar");
  const [city, setCity] = useState("Gurugram");
  const [stateName, setStateName] = useState("Haryana (06)");
  const [pincode, setPincode] = useState("122015");

  // 2. Bank Details State
  const [bankName, setBankName] = useState("HDFC Bank Limited");
  const [accountHolder, setAccountHolder] = useState("Abhishek Enterprises");
  const [accountNumber, setAccountNumber] = useState("50200012345678");
  const [ifscCode, setIfscCode] = useState("HDFC0001234");
  const [branchName, setBranchName] = useState("Cyber City Branch");
  const [upiId, setUpiId] = useState("abhishek@okhdfcbank");

  // 3. Document & Invoice Settings
  const [invoicePrefix, setInvoicePrefix] = useState("INV/2026-27/");
  const [quotationPrefix, setQuotationPrefix] = useState("QUO/2026-27/");
  const [purchasePrefix, setPurchasePrefix] = useState("PUR/2026-27/");
  const [termsText, setTermsText] = useState(
    "1. Goods once sold will not be taken back.\n2. Interest @18% p.a. will be charged if payment is not made within 15 days.\n3. Subject to jurisdiction."
  );

  // 4. Security
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // 5. Toggles
  const [autoReminder, setAutoReminder] = useState(true);
  const [emailPdfInvoice, setEmailPdfInvoice] = useState(true);
  const [showUpiQr, setShowUpiQr] = useState(true);
  const [showSignStamp, setShowSignStamp] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Initial Load & Auth
  useEffect(() => {
    if (typeof window !== "undefined") {
      const c = localStorage.getItem("active_company_name");
      const u = localStorage.getItem("active_user_name");
      const cid = localStorage.getItem("active_company_id");
      if (c) {
        setCompanyName(c);
        setTradeName(c);
        setLegalName(c);
        setAccountHolder(c);
      }
      if (u) setUserName(u);
      if (cid) setCompanyId(cid);
    }

    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.company) {
            setCompanySession(data.company);
            if (data.company.companyName) {
              setCompanyName(data.company.companyName);
              setTradeName(data.company.companyName);
              setLegalName(data.company.companyName);
              setAccountHolder(data.company.companyName);
            }
            if (data.company.contactPerson) setUserName(data.company.contactPerson);
            if (data.company.companyId) setCompanyId(data.company.companyId);
            if (data.company.email) setEmail(data.company.email);
          }
        }
      } catch (err) {
        console.error("Session fetch error:", err);
      }
    }
    checkSession();
  }, []);

  const handleSave = (title: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`${title} saved successfully!`, { title: "Settings Saved" });
    }, 500);
  };

  // Left Sidebar Definition (Exact groups & titles as screenshot with Brand Red theme)
  const accountSettingsItems = [
    { id: "membership", label: "Membership", icon: Users },
    { id: "credits", label: "Credits", icon: Coins },
    { id: "login-security", label: "Login & Security", icon: Shield },
    { id: "whatsapp-options", label: "WhatsApp Options", icon: MessageCircle },
    { id: "business-profile", label: "Business Profile", icon: User },
  ];

  const applicationSettingsItems = [
    { id: "general-options", label: "General Options", icon: SettingsIcon },
    { id: "product-stock", label: "Product & Stock Options", icon: Package },
    { id: "print-template", label: "Print Template", icon: FileSpreadsheet },
    { id: "print-options", label: "Print Options", icon: Printer },
    { id: "bank-details", label: "Bank Details", icon: Landmark },
    { id: "document-options", label: "Document Options", icon: FileText },
    { id: "terms-conditions", label: "Terms and Condition", icon: Info },
    { id: "shipping-envelope", label: "Shipping & Envelope Options", icon: Truck },
    { id: "translation-options", label: "Translation Options", icon: ArrowLeftRight },
    { id: "email-whatsapp-templates", label: "Email & Whatsapp Templates", icon: MailCheck },
    { id: "payment-reminder", label: "Payment Reminder", icon: Bell },
    { id: "custom-header", label: "Design Custom Header", icon: Heading },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800 selection:bg-red-500 selection:text-white">
      
      {/* 1. Header Navbar */}
      <DashboardNavbar
        activeTab={"settings" as ActiveDashboardTab}
        onSelectTab={(tab) => {
          if (tab === "settings") return;
          router.push(`/dashboard`);
        }}
        companyName={companyName}
        userName={userName}
        userEmail={companySession?.email || email}
        companyId={companyId || companySession?.companyId}
        trialEnd={companySession?.trialEnd}
        selectedFY={selectedFY}
        onChangeFY={(fy) => setSelectedFY(fy)}
        onOpenQuickModal={() => router.push("/dashboard")}
        onToggleCalculator={() => setShowCalculator(!showCalculator)}
        showCalculator={showCalculator}
      />

      {/* 2. Main Body Container (Pixel-perfect split layout with compact Sidebar on Right Side) */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: MAIN CONTENT PANEL (EXPANDS TO FILL REMAINING SPACE)                */}
          {/* ========================================================================= */}
          <div className="flex-1 min-w-0 w-full order-2 lg:order-1 space-y-6">

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 1: MEMBERSHIP (EXACT PIXEL-PERFECT AS IN USER SCREENSHOT)    */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "membership" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                
                {/* 1. Membership Details Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 bg-white">
                    Membership Details
                  </div>
                  
                  <div className="p-5 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100 pb-2">
                          <th className="pb-3 font-semibold text-slate-600">Membership Type</th>
                          <th className="pb-3 font-semibold text-slate-600">Expires On</th>
                          <th className="pb-3 font-semibold text-slate-600">Last Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="pt-3.5 pb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#dc2626] text-white shadow-2xs">
                              Premium
                            </span>
                          </td>
                          <td className="pt-3.5 pb-2 text-slate-600 font-medium">
                            01-May-2029
                          </td>
                          <td className="pt-3.5 pb-2 text-slate-600">
                            RS. 4128 - 3 Year Membership - 01-May-2026
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Payment Details Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 bg-white">
                    Payment Details
                  </div>

                  <div className="p-5 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-3 font-semibold text-slate-600">Payment For</th>
                          <th className="pb-3 font-semibold text-slate-600">Payment Date</th>
                          <th className="pb-3 font-semibold text-slate-600">Amount</th>
                          <th className="pb-3 font-semibold text-slate-600">Transaction ID</th>
                          <th className="pb-3 font-semibold text-slate-600">Payment Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                        <tr>
                          <td className="py-3 text-slate-700 font-medium">
                            3 Year Membership <br />
                            <span className="text-[11px] text-slate-400 font-normal">From 01-May-2026 To 01-May-2029</span>
                          </td>
                          <td className="py-3 text-slate-600">01-May-2026</td>
                          <td className="py-3 text-slate-900 font-bold">4128</td>
                          <td className="py-3 text-slate-500 font-mono">pay_Sk9n6XjGoYB3hZ</td>
                          <td className="py-3 text-slate-600 lowercase font-medium">upi</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-slate-700 font-medium">Credits - 500</td>
                          <td className="py-3 text-slate-600">01-May-2026</td>
                          <td className="py-3 text-slate-900 font-bold">590</td>
                          <td className="py-3 text-slate-500 font-mono">pay_Sk9tLonCKaBu1D</td>
                          <td className="py-3 text-slate-600 lowercase font-medium">upi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 2: CREDITS (EXACT PIXEL-PERFECT AS IN USER SCREENSHOT)       */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "credits" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                
                {/* 1. Header Card with Available Balance */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs px-5 py-3.5 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">Credits</h3>
                  <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-extrabold bg-[#dc2626] text-white shadow-2xs">
                    473
                  </span>
                </div>

                {/* 2. Purchase Credits Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="text-xs font-semibold text-slate-500">
                    Purchase Credits
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Package 1: 100 Credits */}
                    <div className="rounded-lg border border-slate-200 overflow-hidden text-center shadow-2xs flex flex-col bg-white">
                      <div className="bg-[#dc2626] text-white px-3 py-2 text-xs font-bold border-b border-red-700/30">
                        100 Credits
                      </div>
                      <div className="bg-[#dc2626] text-white py-5 px-3 flex-1 flex flex-col items-center justify-center">
                        <div className="text-2xl font-black">₹ 100</div>
                        <div className="text-[11px] text-red-100 font-medium mt-0.5">+ 18% GST</div>
                      </div>
                      <div className="p-3 bg-white">
                        <button
                          type="button"
                          onClick={() => toast.info("Opening payment gateway for 100 credits...")}
                          className="w-full py-1.5 px-3 rounded border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-colors text-xs font-bold uppercase cursor-pointer"
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>

                    {/* Package 2: 500 Credits */}
                    <div className="rounded-lg border border-slate-200 overflow-hidden text-center shadow-2xs flex flex-col bg-white">
                      <div className="bg-[#dc2626] text-white px-3 py-2 text-xs font-bold border-b border-red-700/30">
                        500 Credits
                      </div>
                      <div className="bg-[#dc2626] text-white py-5 px-3 flex-1 flex flex-col items-center justify-center">
                        <div className="text-2xl font-black">₹ 500</div>
                        <div className="text-[11px] text-red-100 font-medium mt-0.5">+ 18% GST</div>
                      </div>
                      <div className="p-3 bg-white">
                        <button
                          type="button"
                          onClick={() => toast.info("Opening payment gateway for 500 credits...")}
                          className="w-full py-1.5 px-3 rounded border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-colors text-xs font-bold uppercase cursor-pointer"
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>

                    {/* Package 3: 1000 Credits */}
                    <div className="rounded-lg border border-slate-200 overflow-hidden text-center shadow-2xs flex flex-col bg-white">
                      <div className="bg-[#dc2626] text-white px-3 py-2 text-xs font-bold border-b border-red-700/30">
                        1000 Credits
                      </div>
                      <div className="bg-[#dc2626] text-white py-5 px-3 flex-1 flex flex-col items-center justify-center">
                        <div className="text-2xl font-black">₹ 1000</div>
                        <div className="text-[11px] text-red-100 font-medium mt-0.5">+ 18% GST</div>
                      </div>
                      <div className="p-3 bg-white">
                        <button
                          type="button"
                          onClick={() => toast.info("Opening payment gateway for 1000 credits...")}
                          className="w-full py-1.5 px-3 rounded border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-colors text-xs font-bold uppercase cursor-pointer"
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Credit Usage Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-3 overflow-hidden">
                  <div className="text-xs font-semibold text-slate-500">
                    Credit Usage
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-2.5 font-semibold text-slate-600">Particulars</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Action</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Credits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-2.5 text-slate-600">E-Way bill</td>
                          <td className="py-2.5 text-slate-500">Generate</td>
                          <td className="py-2.5 text-slate-700 font-medium">1 Credits</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-600">E-Way bill</td>
                          <td className="py-2.5 text-slate-500">Cancel</td>
                          <td className="py-2.5 text-slate-700 font-medium">0 Credits</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-600">E-invoice</td>
                          <td className="py-2.5 text-slate-500">Generate</td>
                          <td className="py-2.5 text-slate-700 font-medium">1 Credits</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-600">E-invoice</td>
                          <td className="py-2.5 text-slate-500">Cancel</td>
                          <td className="py-2.5 text-slate-700 font-medium">0 Credits</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-600">SMS</td>
                          <td className="py-2.5 text-slate-500">Reminder</td>
                          <td className="py-2.5 text-slate-700 font-medium">0.5 Credit</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-600">Purchase Upload</td>
                          <td className="py-2.5 text-slate-500">Generate</td>
                          <td className="py-2.5 text-slate-700 font-medium">1 Credit</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Payment Details Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-3 overflow-hidden">
                  <div className="text-xs font-semibold text-slate-500">
                    Payment Details
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-2.5 font-semibold text-slate-600">Payment Date</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Transaction ID</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Amount</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Payment For</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Payment Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-2.5 text-slate-600">01-May-2026</td>
                          <td className="py-2.5 text-slate-500 font-mono">pay_Sk9tLonCKaBu1D</td>
                          <td className="py-2.5 text-slate-900 font-semibold">590</td>
                          <td className="py-2.5 text-slate-700">Credits - 500</td>
                          <td className="py-2.5 text-slate-600 lowercase font-medium">upi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. Credits Log Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-3 overflow-hidden">
                  <div className="text-xs font-semibold text-slate-500">
                    Credits Log
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-2.5 font-semibold text-slate-600">Date</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Type</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Description</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Credits Used</th>
                          <th className="pb-2.5 font-semibold text-slate-600">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {[
                          { date: "11-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771668872851", used: "1.00", bal: "473.00" },
                          { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 751666890804", used: "1.00", bal: "474.00" },
                          { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771666777673", used: "1.00", bal: "475.00" },
                          { date: "04-Sep-2026", type: "Eway Bill", desc: "E-Way Bill No : 771666777350", used: "1.00", bal: "476.00" },
                          { date: "29-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 701664910406", used: "1.00", bal: "477.00" },
                          { date: "24-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 701663425659", used: "1.00", bal: "478.00" },
                          { date: "24-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 741663424898", used: "1.00", bal: "479.00" },
                          { date: "20-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 791662329119", used: "1.00", bal: "480.00" },
                          { date: "20-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 701662196868", used: "1.00", bal: "481.00" },
                          { date: "14-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 751660552504", used: "1.00", bal: "482.00" },
                          { date: "14-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 751660534180", used: "1.00", bal: "483.00" },
                          { date: "06-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 711658203625", used: "1.00", bal: "484.00" },
                          { date: "05-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 791657858701", used: "1.00", bal: "485.00" },
                          { date: "03-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 751657356133", used: "1.00", bal: "486.00" },
                          { date: "03-Aug-2026", type: "Eway Bill", desc: "E-Way Bill No : 761657248862", used: "1.00", bal: "487.00" },
                          { date: "30-Jul-2026", type: "Eway Bill", desc: "E-Way Bill No : 731655973459", used: "1.00", bal: "488.00" },
                          { date: "27-Jul-2026", type: "Eway Bill", desc: "E-Way Bill No : 711655065875", used: "1.00", bal: "489.00" },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 text-slate-500">{row.date}</td>
                            <td className="py-2.5 text-slate-600 font-medium">{row.type}</td>
                            <td className="py-2.5 text-slate-600">{row.desc}</td>
                            <td className="py-2.5 text-slate-700 font-semibold">{row.used}</td>
                            <td className="py-2.5 text-slate-700 font-semibold">{row.bal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 3: LOGIN & SECURITY                                          */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "login-security" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Login & Account Security</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Manage password credentials and authentication preferences.</p>
                  </div>

                  <div className="space-y-3.5 max-w-md">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Current Password</label>
                      <input
                        type="password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">New Password</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="New password (min 6 characters)"
                          className="w-full px-3 pr-9 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSave("Password")}
                      className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Two-Factor Authentication (OTP on Login)</div>
                      <div className="text-[11px] text-slate-500">Require an SMS OTP on registered mobile number during every login.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 4: WHATSAPP OPTIONS                                          */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "whatsapp-options" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">WhatsApp Gateway & Alerts</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Automated invoice sending & payment reminders via official WhatsApp API.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-slate-800">Auto-Send Invoices on WhatsApp</div>
                        <div className="text-[11px] text-slate-500">Automatically send PDF invoice to client's mobile on invoice creation.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoReminder}
                        onChange={(e) => setAutoReminder(e.target.checked)}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <div className="text-xs font-bold text-slate-800">Payment Due Reminders</div>
                        <div className="text-[11px] text-slate-500">Send reminder message 3 days before invoice due date.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 5: BUSINESS PROFILE                                          */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "business-profile" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Business Profile & Details</h3>
                    <p className="text-xs text-slate-500 mt-0.5">This company information will appear on all your GST invoices.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Trade Name</label>
                      <input
                        type="text"
                        value={tradeName}
                        onChange={(e) => setTradeName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Legal Registered Name</label>
                      <input
                        type="text"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">GSTIN</label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">PAN Number</label>
                      <input
                        type="text"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Contact Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Registered Address</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave("Business Profile")}
                      className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: BANK DETAILS                                                */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "bank-details" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Bank Details & UPI</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Banking credentials printed on your invoice payment slip.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Bank Name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Account Holder</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Account Number</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">IFSC Code</label>
                      <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Branch Name</label>
                      <input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave("Bank Details")}
                      className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Save Bank Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: TERMS AND CONDITION                                         */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "terms-conditions" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Terms & Conditions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Default legal terms printed at the footer of tax invoices.</p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      rows={5}
                      value={termsText}
                      onChange={(e) => setTermsText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave("Terms and Conditions")}
                      className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Save Terms
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: FALLBACK / OTHER APPLICATION TABS                          */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {!["membership", "credits", "login-security", "whatsapp-options", "business-profile", "bank-details", "terms-conditions"].includes(activeTab) && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800 capitalize">
                      {activeTab.replace(/-/g, " ")}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure preferences and options for {activeTab.replace(/-/g, " ")}.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="font-semibold text-slate-800">Configuration Options Active</div>
                    <p>All settings for this module are active and synced with your ERP cloud database.</p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave(activeTab.replace(/-/g, " "))}
                      className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDEBAR (EXACT 2 CARDS FORMAT WITH BRAND RED ACCENTS)                */}
          {/* ========================================================================= */}
          <div className="order-1 lg:order-2 w-full lg:w-[240px] xl:w-[255px] shrink-0 space-y-3.5">
            
            {/* Card 1: Account Settings */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
              <div className="px-3.5 py-2.5 text-xs font-semibold text-slate-500 border-b border-slate-100 bg-white">
                Account Settings
              </div>
              <div className="divide-y divide-slate-100">
                {accountSettingsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as SettingTabId)}
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer relative ${
                        isActive
                          ? "text-[#dc2626] font-bold bg-red-50/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Active Line Indicator (Brand Red #dc2626) */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"></div>
                      )}
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 stroke-[2] ${
                          isActive ? "text-[#dc2626]" : "text-slate-500"
                        }`}
                      />
                      <span className="truncate flex-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Application Settings */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
              <div className="px-3.5 py-2.5 text-xs font-semibold text-slate-500 border-b border-slate-100 bg-white">
                Application Settings
              </div>
              <div className="divide-y divide-slate-100">
                {applicationSettingsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as SettingTabId)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer relative ${
                        isActive
                          ? "text-[#dc2626] font-bold bg-red-50/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Active Line Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"></div>
                      )}
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 stroke-[2] ${
                          isActive ? "text-[#dc2626]" : "text-slate-500"
                        }`}
                      />
                      <span className="truncate flex-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 3. Clean Footer */}
      <footer className="py-3 px-4 sm:px-6 bg-white border-t border-slate-200 text-left text-xs text-slate-500 flex items-center justify-between">
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
    </div>
  );
}
