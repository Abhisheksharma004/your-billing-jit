"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNavbar, { ActiveDashboardTab } from "@/components/DashboardNavbar";
import DraggableCalculator from "@/components/DraggableCalculator";
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
  Edit3,
  Lock,
  MapPin,
  Minus,
  MoreVertical,
  Trash2,
  X
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

  // 1. Business Profile & Organisation Detail Form State
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
    { id: "lic-1", name: "", value: "" }
  ]);
  const [lutNumber, setLutNumber] = useState("");
  const [iecNumber, setIecNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("www.virosentrepreneurs.com");

  // Dispatch from Address States
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
      isDefault: true
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
      isDefault: false
    },
    {
      id: "disp-3",
      companyName: "Texonic Instruments",
      name: "Ms. Laxmi",
      phone: "9876543210",
      email: "laxmi@texonic.com",
      addressLine1: "No 1150, 12th Main HAL 2nd Stage",
      landmark: "Indiranagar",
      city: "Bengaluru",
      country: "India",
      state: "Karnataka ( 29 )",
      pincode: "560038",
      isDefault: false
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
      isDefault: false
    }
  ]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [editingDispatchId, setEditingDispatchId] = useState<string | null>(null);
  const [dispatchForm, setDispatchForm] = useState<{
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
  }>({
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
    isDefault: false
  });
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

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

  // 4. Security & User Profile State
  const [loginUserId, setLoginUserId] = useState("VE8377929141");
  const [loginFullName, setLoginFullName] = useState("Abhishek Kumar Ranjan");
  const [loginPhone, setLoginPhone] = useState("7764936310");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const ph = localStorage.getItem("active_user_phone");
      if (c) {
        setCompanyName(c);
        setTradeName(c);
        setAccountHolder(c);
      }
      if (u) {
        setUserName(u);
        setLoginFullName(u);
      }
      if (cid) {
        setCompanyId(cid);
        setLoginUserId(cid);
      }
      if (ph) {
        setLoginPhone(ph);
      }
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
              setAccountHolder(data.company.companyName);
            }
            if (data.company.contactPerson) {
              setUserName(data.company.contactPerson);
              setLoginFullName(data.company.contactPerson);
            }
            if (data.company.companyId) {
              setCompanyId(data.company.companyId);
              setLoginUserId(data.company.companyId);
            }
            if (data.company.contactNumber) {
              setLoginPhone(data.company.contactNumber);
            }
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

  const handleSaveUserDetail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginFullName.trim()) {
      toast.error("Full Name is required");
      return;
    }
    if (!loginPhone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("active_user_name", loginFullName);
        localStorage.setItem("active_user_phone", loginPhone);
        localStorage.setItem("active_company_id", loginUserId);
      }
      setUserName(loginFullName);
      toast.success("User detail updated successfully!", { title: "User Detail" });
    }, 400);
  };

  const handleUpdatePassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!oldPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully!", { title: "Password Updated" });
    }, 400);
  };

  const handleAutoFillGstin = () => {
    if (!gstin.trim()) {
      toast.error("Please enter a GSTIN first");
      return;
    }
    const cleanGst = gstin.trim().toUpperCase();
    if (cleanGst.length >= 10) {
      const extractedPan = cleanGst.substring(2, 12);
      setPan(extractedPan);
      const stateCode = cleanGst.substring(0, 2);
      const stateMap: Record<string, string> = {
        "07": "Delhi ( 07 )",
        "06": "Haryana ( 06 )",
        "09": "Uttar Pradesh ( 09 )",
        "27": "Maharashtra ( 27 )",
        "24": "Gujarat ( 24 )",
        "29": "Karnataka ( 29 )",
        "19": "West Bengal ( 19 )",
        "33": "Tamil Nadu ( 33 )",
        "08": "Rajasthan ( 08 )",
        "03": "Punjab ( 03 )",
        "10": "Bihar ( 10 )",
      };
      if (stateMap[stateCode]) {
        setStateName(stateMap[stateCode]);
      }
      toast.success("Details auto-filled from GSTIN!", { title: "GSTIN Auto Fill" });
    } else {
      toast.error("Invalid GSTIN format");
    }
  };

  const handleAddLicenceRow = () => {
    setLicencesList((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", value: "" }
    ]);
  };

  const handleRemoveLicenceRow = (id: string) => {
    setLicencesList((prev) => {
      if (prev.length <= 1) {
        return [{ id: Date.now().toString(), name: "", value: "" }];
      }
      return prev.filter((lic) => lic.id !== id);
    });
  };

  const handleUpdateLicenceRow = (id: string, field: "name" | "value", text: string) => {
    setLicencesList((prev) =>
      prev.map((lic) => (lic.id === id ? { ...lic, [field]: text } : lic))
    );
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tradeName.trim()) {
      toast.error("Company Name is required");
      return;
    }
    if (!displayPhone.trim()) {
      toast.error("Display Phone is required");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`OTP has been sent to registered phone ${displayPhone}`, { title: "OTP Sent" });
    }, 400);
  };

  const handleAutoFillDispatchGstin = () => {
    if (dispatchForm.gstin && dispatchForm.gstin.trim().length >= 15) {
      setDispatchForm((prev) => ({
        ...prev,
        companyName: prev.companyName || "Texonic Instruments Private Limited",
        name: prev.name || "Ms. Laxmi",
        phone: prev.phone || "9876543210",
        email: prev.email || "sales@texonic.com",
        addressLine1: prev.addressLine1 || "2 Mandiveerappa Lane, Sjp Road Cross",
        landmark: prev.landmark || "Near City Market",
        city: prev.city || "Bengaluru",
        state: prev.state || "Karnataka ( 29 )",
        pincode: prev.pincode || "560002",
        country: "India"
      }));
      toast.success("Details auto-filled from Dispatch GSTIN!", { title: "GSTIN Auto Fill" });
    } else {
      toast.error("Please enter a valid 15-digit GSTIN first");
    }
  };

  const handleSetDefaultDispatch = (id: string) => {
    setDispatchAddresses((prev) =>
      prev.map((d) => ({
        ...d,
        isDefault: d.id === id
      }))
    );
    toast.success("Default dispatch address updated");
  };

  const handleOpenAddDispatch = () => {
    setEditingDispatchId(null);
    setDispatchForm({
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
      isDefault: dispatchAddresses.length === 0
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
      isDefault: !!item.isDefault
    });
    setActiveMenuId(null);
    setShowDispatchModal(true);
  };

  const handleDeleteDispatch = (id: string) => {
    setDispatchAddresses((prev) => prev.filter((d) => d.id !== id));
    setActiveMenuId(null);
    toast.success("Dispatch address removed");
  };

  const handleSaveDispatchAddress = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!dispatchForm.companyName.trim()) {
      toast.error("Company Name is required");
      return;
    }
    if (!dispatchForm.addressLine1.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!dispatchForm.landmark.trim()) {
      toast.error("Landmark is required");
      return;
    }
    if (!dispatchForm.city.trim()) {
      toast.error("City is required");
      return;
    }
    if (!dispatchForm.state.trim()) {
      toast.error("State is required");
      return;
    }
    if (!dispatchForm.pincode.trim()) {
      toast.error("Pincode is required");
      return;
    }
    if (editingDispatchId) {
      setDispatchAddresses((prev) =>
        prev.map((d) => {
          if (d.id === editingDispatchId) {
            return { ...d, ...dispatchForm };
          }
          return dispatchForm.isDefault ? { ...d, isDefault: false } : d;
        })
      );
      toast.success("Dispatch address updated successfully");
    } else {
      const newItem: DispatchAddress = {
        id: Date.now().toString(),
        ...dispatchForm
      };
      setDispatchAddresses((prev) => {
        if (dispatchForm.isDefault) {
          return [...prev.map((d) => ({ ...d, isDefault: false })), newItem];
        }
        return [...prev, newItem];
      });
      toast.success("Dispatch address added successfully");
    }
    setShowDispatchModal(false);
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
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-7 animate-in fade-in-50 duration-150">

                {/* 1. User Detail */}
                <div className="space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    User Detail
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-[130px_minmax(0,360px)] items-center gap-y-3.5 sm:gap-x-4">
                    <label className="text-xs font-semibold text-slate-600">
                      User ID<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={loginUserId}
                      readOnly
                      placeholder="VE8377929141"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-200 bg-slate-100/80 text-xs text-slate-600 font-medium cursor-not-allowed select-all focus:outline-none"
                    />

                    <label className="text-xs font-semibold text-slate-600">
                      Full Name<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={loginFullName}
                      onChange={(e) => setLoginFullName(e.target.value)}
                      placeholder="Abhishek Kumar Ranjan"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                    />

                    <label className="text-xs font-semibold text-slate-600">
                      Phone<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="7764936310"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                    />

                    <div className="sm:col-start-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSaveUserDetail}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                      >
                        <Save className="w-3.5 h-3.5 shrink-0" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-slate-100"></div>

                {/* 2. Change Password */}
                <div className="space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    Change Password
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-[130px_minmax(0,360px)] items-center gap-y-3.5 sm:gap-x-4">
                    <label className="text-xs font-semibold text-slate-600">
                      Old Password<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                    />

                    <label className="text-xs font-semibold text-slate-600">
                      Password<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                    />

                    <label className="text-xs font-semibold text-slate-600">
                      Confirm Password<span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter confirm password"
                      className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                    />

                    <div className="sm:col-start-2 pt-1">
                      <button
                        type="button"
                        onClick={handleUpdatePassword}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                      >
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        <span>Update Password</span>
                      </button>
                    </div>
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
                        onChange={() => { }}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 5: BUSINESS PROFILE & ORGANISATION DETAIL (2-COLUMN LAYOUT)  */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "business-profile" && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-6 animate-in fade-in-50 duration-150">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">Organisation Detail</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage business profile credentials, registration numbers, and invoice header details.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                    {/* 1. GSTIN */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        GSTIN
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                          placeholder="07AALCV0054F1ZG"
                          className="flex-1 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={handleAutoFillGstin}
                          className="px-3 py-2 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
                        >
                          Auto Fill
                        </button>
                      </div>
                    </div>

                    {/* 2. Company Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Company Name<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={tradeName}
                        onChange={(e) => setTradeName(e.target.value)}
                        placeholder="Viros Entrepreneurs IT Solutions Private Limited"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 3. Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={contactFullName}
                        onChange={(e) => setContactFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 4. Display Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Display Phone<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={displayPhone}
                        onChange={(e) => setDisplayPhone(e.target.value)}
                        placeholder="9871029141"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                      <p className="text-[11px] text-slate-400 italic mt-0.5">
                        This phone number will be printed on the invoice.
                      </p>
                    </div>

                    {/* 5. Email Address */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sales@virosentrepreneurs.com"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 6. Company Type */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Company Type
                      </label>
                      <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      >
                        <option value="Private Limited Company">Private Limited Company</option>
                        <option value="Public Limited Company">Public Limited Company</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                        <option value="One Person Company (OPC)">One Person Company (OPC)</option>
                        <option value="Trust / Society / NGO">Trust / Society / NGO</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* 7. PAN Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        placeholder="AALCV0054F"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 8. Address */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Address <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="25/2, Street -2, 1st Floor, Molarband Market,"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 9. Landmark */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Landmark <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Beside Om TVS bike Showroom, Badarpur"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 10. Pincode */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Pincode<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110044"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 11. City */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        City<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="South East Delhi"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 12. State */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        State
                      </label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      >
                        <option value="Delhi ( 07 )">Delhi ( 07 )</option>
                        <option value="Haryana ( 06 )">Haryana ( 06 )</option>
                        <option value="Uttar Pradesh ( 09 )">Uttar Pradesh ( 09 )</option>
                        <option value="Maharashtra ( 27 )">Maharashtra ( 27 )</option>
                        <option value="Gujarat ( 24 )">Gujarat ( 24 )</option>
                        <option value="Karnataka ( 29 )">Karnataka ( 29 )</option>
                        <option value="West Bengal ( 19 )">West Bengal ( 19 )</option>
                        <option value="Tamil Nadu ( 33 )">Tamil Nadu ( 33 )</option>
                        <option value="Rajasthan ( 08 )">Rajasthan ( 08 )</option>
                        <option value="Punjab ( 03 )">Punjab ( 03 )</option>
                        <option value="Bihar ( 10 )">Bihar ( 10 )</option>
                        <option value="Madhya Pradesh ( 23 )">Madhya Pradesh ( 23 )</option>
                        <option value="Telangana ( 36 )">Telangana ( 36 )</option>
                        <option value="Andhra Pradesh ( 37 )">Andhra Pradesh ( 37 )</option>
                        <option value="Kerala ( 32 )">Kerala ( 32 )</option>
                        <option value="Odisha ( 21 )">Odisha ( 21 )</option>
                        <option value="Assam ( 18 )">Assam ( 18 )</option>
                        <option value="Jharkhand ( 20 )">Jharkhand ( 20 )</option>
                        <option value="Uttarakhand ( 05 )">Uttarakhand ( 05 )</option>
                        <option value="Chhattisgarh ( 22 )">Chhattisgarh ( 22 )</option>
                        <option value="Himachal Pradesh ( 02 )">Himachal Pradesh ( 02 )</option>
                        <option value="Jammu & Kashmir ( 01 )">Jammu & Kashmir ( 01 )</option>
                        <option value="Goa ( 30 )">Goa ( 30 )</option>
                        <option value="Chandigarh ( 04 )">Chandigarh ( 04 )</option>
                      </select>
                    </div>

                    {/* 13. Additional Licence */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Additional Licence
                      </label>
                      <div className="space-y-2">
                        {licencesList.map((lic, index) => (
                          <div key={lic.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={lic.name}
                              onChange={(e) => handleUpdateLicenceRow(lic.id, "name", e.target.value)}
                              placeholder="Licence Name"
                              className="w-1/2 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                            />
                            <input
                              type="text"
                              value={lic.value}
                              onChange={(e) => handleUpdateLicenceRow(lic.id, "value", e.target.value)}
                              placeholder="Enter licence value"
                              className="w-1/2 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                            />
                            {index === 0 ? (
                              <button
                                type="button"
                                onClick={handleAddLicenceRow}
                                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white transition-all cursor-pointer shadow-xs"
                                title="Add Licence"
                              >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleRemoveLicenceRow(lic.id)}
                                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-slate-600 hover:bg-red-600 active:scale-95 text-white transition-all cursor-pointer shadow-xs"
                                title="Remove Licence"
                              >
                                <Minus className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 14. LUT No. */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        LUT No.
                      </label>
                      <input
                        type="text"
                        value={lutNumber}
                        onChange={(e) => setLutNumber(e.target.value)}
                        placeholder="Enter LUT no"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 15. IEC No. */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        IEC No.
                      </label>
                      <input
                        type="text"
                        value={iecNumber}
                        onChange={(e) => setIecNumber(e.target.value)}
                        placeholder="Enter IEC no"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                    {/* 16. Website */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Website
                      </label>
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="www.virosentrepreneurs.com"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                      />
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <span>Send OTP</span>
                    </button>
                  </div>
                </form>

                {/* ───────────────────────────────────────────────────────────── */}
                {/* DISPATCH FROM ADDRESS TABLE (MATCHING PAYMENT DETAILS DESIGN) */}
                {/* ───────────────────────────────────────────────────────────── */}
                <div className="pt-6 border-t border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        Dispatch from Address
                      </h4>
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
                        {dispatchAddresses.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-slate-400">
                              No dispatch addresses added yet. Click &quot;Add Dispatch Address&quot; to add one.
                            </td>
                          </tr>
                        ) : (
                          dispatchAddresses.map((item) => (
                            <tr key={item.id}>
                              <td className="py-3 text-slate-900 font-medium">
                                {item.companyName}
                              </td>
                              <td className="py-3 text-slate-600">
                                <div>{item.name || "-"}</div>
                                {item.phone && <div className="text-[11px] text-slate-400 font-normal">{item.phone}</div>}
                              </td>
                              <td className="py-3 text-slate-600 leading-relaxed max-w-sm">
                                <span>{item.addressLine1}</span>
                                {item.landmark && <span>, {item.landmark}</span>}
                                <div className="text-slate-400 text-[11px]">{item.city}{item.state ? `, ${item.state}` : ""}{item.pincode ? ` - ${item.pincode}` : ""}</div>
                              </td>
                              <td className="py-3 text-slate-500 font-mono">
                                {item.gstin || "-"}
                              </td>
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
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Slide-over Sidebar Drawer for Add / Edit Dispatch from Address */}
                {/* Backdrop */}
                <div
                  className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
                    showDispatchModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onClick={() => setShowDispatchModal(false)}
                />

                {/* Sliding Sidebar Panel */}
                <div
                  className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    showDispatchModal ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Sidebar Header */}
                  <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/60 shrink-0">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {editingDispatchId ? "Edit Dispatch Address" : "Add Dispatch from Address"}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Enter dispatch warehouse / branch details for invoicing.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDispatchModal(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sidebar Form Body (Scrollable) */}
                  <form onSubmit={handleSaveDispatchAddress} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">

                      {/* 1. GSTIN */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          GSTIN
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={dispatchForm.gstin}
                            onChange={(e) => setDispatchForm({ ...dispatchForm, gstin: e.target.value.toUpperCase() })}
                            placeholder="Enter Dispatch GSTIN"
                            className="flex-1 px-3.5 py-2 rounded-md border border-slate-300 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={handleAutoFillDispatchGstin}
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
                          value={dispatchForm.companyName}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, companyName: e.target.value })}
                          placeholder="Enter company name"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 3. Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={dispatchForm.name}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, name: e.target.value })}
                          placeholder="Enter name"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 4. Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={dispatchForm.phone}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, phone: e.target.value })}
                          placeholder="Enter phone"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 5. Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Email
                        </label>
                        <input
                          type="email"
                          value={dispatchForm.email}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, email: e.target.value })}
                          placeholder="Enter Email"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* Section Header: Dispatch Address */}
                      <div className="pt-3 pb-1 border-b border-slate-200 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-700" />
                        <h5 className="font-bold text-slate-800 text-xs sm:text-sm">
                          Dispatch Address
                        </h5>
                      </div>

                      {/* 6. Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Address<span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          value={dispatchForm.addressLine1}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, addressLine1: e.target.value })}
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
                          value={dispatchForm.landmark}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, landmark: e.target.value })}
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
                          value={dispatchForm.city}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, city: e.target.value })}
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
                          value={dispatchForm.country}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, country: e.target.value })}
                          placeholder="India"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 10. State */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          State <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          value={dispatchForm.state}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, state: e.target.value })}
                          placeholder="Select State"
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
                          value={dispatchForm.pincode}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, pincode: e.target.value })}
                          placeholder="Enter pincode"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 12. Set as Default */}
                      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-center gap-1.5 sm:gap-4 pt-1">
                        <div className="hidden sm:block"></div>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                          <input
                            type="checkbox"
                            checked={dispatchForm.isDefault}
                            onChange={(e) => setDispatchForm({ ...dispatchForm, isDefault: e.target.checked })}
                            className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                          />
                          <span>Set as Default Dispatch Address</span>
                        </label>
                      </div>

                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 sm:px-6 bg-slate-50/90 border-t border-slate-200 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowDispatchModal(false)}
                        className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
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
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer relative ${isActive
                        ? "text-[#dc2626] font-bold bg-red-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                        }`}
                    >
                      {/* Active Line Indicator (Brand Red #dc2626) */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"></div>
                      )}
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 stroke-[2] ${isActive ? "text-[#dc2626]" : "text-slate-500"
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
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer relative ${isActive
                        ? "text-[#dc2626] font-bold bg-red-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                        }`}
                    >
                      {/* Active Line Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"></div>
                      )}
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 stroke-[2] ${isActive ? "text-[#dc2626]" : "text-slate-500"
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

      {/* Floating Draggable Quick Calculator */}
      <DraggableCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </div>
  );
}
