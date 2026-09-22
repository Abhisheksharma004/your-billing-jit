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
  X,
  Folder,
  Globe,
  Mail,
  UserPlus,
  Download,
  HardDrive,
  KeyRound,
  CreditCard,
  History,
  FileCheck
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
  // Account Settings (Exact 13 tabs from user screenshot)
  | "membership"
  | "credits"
  | "login-security"
  | "eway-bill-einvoice"
  | "whatsapp-options"
  | "business-profile"
  | "staff-account"
  | "go-drive"
  | "digital-sign"
  | "export-data"
  | "activity-log"
  | "email-options"
  | "payment-gateway"
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

  // 6. WhatsApp Options State
  const [whatsappSendMode, setWhatsappSendMode] = useState<"web" | "direct" | "billing">("direct");
  const [allowStaffWhatsapp, setAllowStaffWhatsapp] = useState(false);
  const [whatsappSearchQuery, setWhatsappSearchQuery] = useState("");
  const [showWhatsappSearchInput, setShowWhatsappSearchInput] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  // 7. Staff Account State
  const [staffList, setStaffList] = useState([
    { id: "st-1", name: "Abhishek Sharma (You)", email: "sales@virosentrepreneurs.com", role: "Super Admin", roleBadge: "bg-red-50 text-[#dc2626]", status: "Active", isPrimary: true },
    { id: "st-2", name: "Rahul Verma", email: "rahul.v@virosentrepreneurs.com", role: "Accountant", roleBadge: "bg-blue-50 text-blue-700", status: "Active", isPrimary: false },
    { id: "st-3", name: "Pooja Sharma", email: "pooja.sales@virosentrepreneurs.com", role: "Sales Executive", roleBadge: "bg-purple-50 text-purple-700", status: "Active", isPrimary: false },
    { id: "st-4", name: "Rachana Singh", email: "customercare@virosentrepreneurs.com", role: "Support Lead", roleBadge: "bg-amber-50 text-amber-700", status: "Active", isPrimary: false },
    { id: "st-5", name: "Rupesh Kumar", email: "info@virosentrepreneurs.com", role: "Billing Operator", roleBadge: "bg-slate-100 text-slate-700", status: "Active", isPrimary: false },
  ]);

  // Staff Account Drawer & Permission Matrix State
  const [showStaffDrawer, setShowStaffDrawer] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: "",
    phone: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    isEnabled: true,
    hasSchedule: false,
    role: "Staff Member",
  });
  const [showStaffPass, setShowStaffPass] = useState(false);
  const [showStaffConfirmPass, setShowStaffConfirmPass] = useState(false);

  const initialStaffPermissions: Record<string, { view: boolean; add: boolean; edit: boolean; remove: boolean; onlyView?: boolean }> = {
    "Dashboard": { view: true, add: false, edit: false, remove: false, onlyView: true },
    "Customer / Vendor": { view: true, add: true, edit: true, remove: false },
    "Product": { view: true, add: true, edit: true, remove: false },
    "Price List": { view: true, add: true, edit: true, remove: false },
    "Transport": { view: true, add: true, edit: true, remove: false },
    "Additional Charges": { view: true, add: true, edit: true, remove: false },
    "Sale Invoice": { view: true, add: true, edit: true, remove: false },
    "Purchase Invoice": { view: true, add: true, edit: true, remove: false },
    "Inward Payment Receipt": { view: true, add: true, edit: true, remove: false },
    "Outward Payment Receipt": { view: true, add: true, edit: true, remove: false },
    "Services Request": { view: true, add: true, edit: true, remove: false },
  };

  const [staffPermissions, setStaffPermissions] = useState(initialStaffPermissions);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const scheduleDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const scheduleTimeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM"
  ];
  const [staffSchedule, setStaffSchedule] = useState<Record<string, { startTime: string; endTime: string }>>({
    Monday: { startTime: "", endTime: "" },
    Tuesday: { startTime: "", endTime: "" },
    Wednesday: { startTime: "", endTime: "" },
    Thursday: { startTime: "", endTime: "" },
    Friday: { startTime: "", endTime: "" },
    Saturday: { startTime: "", endTime: "" },
    Sunday: { startTime: "", endTime: "" },
  });

  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({
      name: "",
      phone: "",
      email: "",
      userId: "",
      password: "",
      confirmPassword: "",
      isEnabled: true,
      hasSchedule: false,
      role: "Staff Member",
    });
    setStaffPermissions(initialStaffPermissions);
    setShowStaffDrawer(true);
  };

  const handleOpenEditStaff = (staff: typeof staffList[0]) => {
    setEditingStaffId(staff.id);
    setStaffForm({
      name: staff.name.replace(" (You)", ""),
      phone: "9871029141",
      email: staff.email,
      userId: staff.id.replace("st-", "staff_"),
      password: "••••••••",
      confirmPassword: "••••••••",
      isEnabled: staff.status === "Active",
      hasSchedule: false,
      role: staff.role,
    });
    setShowStaffDrawer(true);
  };

  const handleToggleSelectAllPermissions = () => {
    const allChecked = Object.values(staffPermissions).every(
      (p) => p.view && (p.onlyView || (p.add && p.edit && p.remove))
    );
    const updated = { ...staffPermissions };
    Object.keys(updated).forEach((k) => {
      if (updated[k].onlyView) {
        updated[k] = { ...updated[k], view: !allChecked };
      } else {
        updated[k] = {
          view: !allChecked,
          add: !allChecked,
          edit: !allChecked,
          remove: !allChecked,
        };
      }
    });
    setStaffPermissions(updated);
  };

  const handleSaveStaffAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim()) {
      toast.error("Please enter staff member name.");
      return;
    }
    if (!staffForm.userId.trim()) {
      toast.error("Please enter User ID.");
      return;
    }

    if (editingStaffId) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === editingStaffId
            ? { ...s, name: staffForm.name, email: staffForm.email || s.email, role: staffForm.role || s.role, status: staffForm.isEnabled ? "Active" : "Inactive" }
            : s
        )
      );
      toast.success(`Updated staff account for ${staffForm.name}`, { title: "Staff Account Updated" });
    } else {
      const newStaff = {
        id: "st-" + Date.now(),
        name: staffForm.name,
        email: staffForm.email || `${staffForm.userId.toLowerCase()}@virosentrepreneurs.com`,
        role: staffForm.role || "Staff Operator",
        roleBadge: "bg-slate-100 text-slate-700",
        status: staffForm.isEnabled ? "Active" : "Inactive",
        isPrimary: false,
      };
      setStaffList((prev) => [...prev, newStaff]);
      toast.success(`Created staff account for ${staffForm.name}`, { title: "Staff Account Created" });
    }
    setShowStaffDrawer(false);
  };

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

  // Left Sidebar Definition (Exact 13 tabs matching screenshot)
  const accountSettingsItems = [
    { id: "membership", label: "Membership", icon: Users },
    { id: "credits", label: "Credits", icon: Coins },
    { id: "login-security", label: "Login & Security", icon: Shield },
    { id: "eway-bill-einvoice", label: "E-way Bill & E-Invoice", icon: Truck },
    { id: "whatsapp-options", label: "WhatsApp Options", icon: MessageCircle },
    { id: "business-profile", label: "Business Profile", icon: User },
    { id: "staff-account", label: "Staff Account", icon: UserPlus },
    { id: "go-drive", label: "Go Drive", icon: Folder },
    { id: "digital-sign", label: "Digital Sign", icon: Edit3 },
    { id: "export-data", label: "Export Data", icon: Upload },
    { id: "activity-log", label: "Activity Log", icon: FileText },
    { id: "email-options", label: "Email Options", icon: Mail },
    { id: "payment-gateway", label: "Payment Gateway", icon: Globe },
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
            {/* VIEW 3: LOGIN & SECURITY (EXACT PIXEL-PERFECT FROM SCREENSHOTS)   */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "login-security" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">

                {/* 1. Logged in Devices Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      Logged in Devices
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success("Successfully logged out from all other active devices.", { title: "Sessions Terminated" });
                      }}
                      className="px-4 py-1.5 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Logout All Device
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-600 font-semibold border-b border-slate-100">
                          <th className="py-3 px-5 w-12 font-semibold">#</th>
                          <th className="py-3 px-3 font-semibold">Name</th>
                          <th className="py-3 px-3 font-semibold">Device</th>
                          <th className="py-3 px-3 font-semibold">Browser</th>
                          <th className="py-3 px-3 font-semibold">Platform</th>
                          <th className="py-3 px-3 font-semibold">Last Log In</th>
                          <th className="py-3 px-3 font-semibold">Location</th>
                          <th className="py-3 px-5 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {[
                          { id: 1, name: "", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 12:09 PM", location: "Noida, Uttar Pradesh", isCurrent: true },
                          { id: 2, name: "", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:50 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
                          { id: 3, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "22-Sep-2026 11:04 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
                          { id: 4, name: "Rachana Singh", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "21-Sep-2026 5:22 PM", location: "Noida, Uttar Pradesh", isCurrent: false },
                          { id: 5, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "02-Sep-2026 1:48 PM", location: "Noida, Uttar Pradesh", isCurrent: false },
                          { id: 6, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "27-Aug-2026 10:43 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
                        ].map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-5 text-slate-500 font-medium">{row.id}</td>
                            <td className="py-3.5 px-3 font-semibold text-slate-800">{row.name || ""}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.device}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.browser}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.platform}</td>
                            <td className="py-3.5 px-3 text-slate-600 font-medium">{row.lastLogin}</td>
                            <td className="py-3.5 px-3 text-slate-600 font-medium">{row.location}</td>
                            <td className="py-3.5 px-5 text-right">
                              {!row.isCurrent && (
                                <button
                                  type="button"
                                  onClick={() => toast.success(`Logged out from ${row.platform} (${row.browser}) session.`)}
                                  className="px-3 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                                >
                                  Logout
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Login Log Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-slate-100 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      Login Log
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-600 font-semibold border-b border-slate-100">
                          <th className="py-3 px-5 w-12 font-semibold">#</th>
                          <th className="py-3 px-3 font-semibold">Staff ID</th>
                          <th className="py-3 px-3 font-semibold">Device</th>
                          <th className="py-3 px-3 font-semibold">Browser</th>
                          <th className="py-3 px-3 font-semibold">Platform</th>
                          <th className="py-3 px-3 font-semibold">Last Log In</th>
                          <th className="py-3 px-5 font-semibold">Location</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {[
                          { id: 1, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 12:09 PM", location: "Noida, Uttar Pradesh" },
                          { id: 2, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:50 AM", location: "Noida, Uttar Pradesh" },
                          { id: 3, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:14 AM", location: "Noida, Uttar Pradesh" },
                          { id: 4, staffId: "8743839141", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "22-Sep-2026 11:04 AM", location: "Noida, Uttar Pradesh" },
                          { id: 5, staffId: "7290969141", device: "Desktop", browser: "Chrome", platform: "macOS", lastLogin: "22-Sep-2026 10:23 AM", location: "Noida, Uttar Pradesh" },
                          { id: 6, staffId: "8743839141", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "21-Sep-2026 5:22 PM", location: "Noida, Uttar Pradesh" },
                          { id: 7, staffId: "8743839141", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "21-Sep-2026 4:21 PM", location: "Noida, Uttar Pradesh" },
                        ].map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-5 text-slate-500 font-medium">{row.id}</td>
                            <td className="py-3.5 px-3 font-semibold text-slate-800">{row.staffId}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.device}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.browser}</td>
                            <td className="py-3.5 px-3 text-slate-600">{row.platform}</td>
                            <td className="py-3.5 px-3 text-slate-600 font-medium">{row.lastLogin}</td>
                            <td className="py-3.5 px-5 text-slate-600 font-medium">{row.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. User Detail & Password Management */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      User Profile & Password Security
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        User ID<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={loginUserId}
                        readOnly
                        className="w-full px-3.5 py-2 rounded-md border border-slate-200 bg-slate-100/80 text-xs text-slate-600 font-medium cursor-not-allowed select-all focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Full Name<span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={loginFullName}
                        onChange={(e) => setLoginFullName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Old Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleUpdatePassword}
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save Password
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW 4: WHATSAPP OPTIONS (MATCHING SCREENSHOT + BRAND RED THEME)   */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "whatsapp-options" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">

                {/* 1. WhatsApp Settings Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      WhatsApp Settings
                    </h3>
                  </div>

                  {/* 3 Radio Card Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {/* Option 1: WhatsApp Web / App */}
                    <div
                      onClick={() => setWhatsappSendMode("web")}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${whatsappSendMode === "web"
                          ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${whatsappSendMode === "web"
                              ? "border-[#dc2626]"
                              : "border-slate-300"
                            }`}
                        >
                          {whatsappSendMode === "web" && (
                            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">
                          Send Via WhatsApp Web / App
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          (Using Your Ph. Number)
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Direct WhatsApp (Default / Starred) */}
                    <div
                      onClick={() => setWhatsappSendMode("direct")}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${whatsappSendMode === "direct"
                          ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${whatsappSendMode === "direct"
                              ? "border-[#dc2626]"
                              : "border-slate-300"
                            }`}
                        >
                          {whatsappSendMode === "direct" && (
                            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">
                          Send Via Direct WhatsApp*
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          (Using Your Ph. Number)
                        </div>
                      </div>
                    </div>

                    {/* Option 3: Go GST Bill WhatsApp */}
                    <div
                      onClick={() => setWhatsappSendMode("billing")}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${whatsappSendMode === "billing"
                          ? "border-[#dc2626] bg-red-50/20 ring-1 ring-[#dc2626]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${whatsappSendMode === "billing"
                              ? "border-[#dc2626]"
                              : "border-slate-300"
                            }`}
                        >
                          {whatsappSendMode === "billing" && (
                            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">
                          Send Via Go GST Bill WhatsApp
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          (From Go GST Bill&apos;s Ph. Number)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Staff Checkbox */}
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={allowStaffWhatsapp}
                        onChange={(e) => setAllowStaffWhatsapp(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                      />
                      <span>Allow staff member to send WhatsApp using connected phone number.</span>
                    </label>
                  </div>

                  {/* Connect WhatsApp Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowWhatsappModal(true)}
                      className="px-4 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Connect WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* 2. WhatsApp Log Card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      WhatsApp Log
                    </h3>
                    <div className="flex items-center gap-2">
                      {showWhatsappSearchInput ? (
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={whatsappSearchQuery}
                            onChange={(e) => setWhatsappSearchQuery(e.target.value)}
                            placeholder="Search logs..."
                            autoFocus
                            className="w-44 sm:w-56 px-3 py-1 text-xs rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowWhatsappSearchInput(false);
                              setWhatsappSearchQuery("");
                            }}
                            className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowWhatsappSearchInput(true)}
                          className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Search className="w-3.5 h-3.5 text-slate-500" />
                          <span>Search</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-600 font-semibold border-b border-slate-100">
                          <th className="py-3 px-5 font-semibold">From</th>
                          <th className="py-3 px-3 font-semibold">To</th>
                          <th className="py-3 px-3 font-semibold">Status</th>
                          <th className="py-3 px-3 font-semibold">Sent On</th>
                          <th className="py-3 px-5 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-xs text-slate-400 font-medium">
                            No results
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                  className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${showDispatchModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  onClick={() => setShowDispatchModal(false)}
                />

                {/* Sliding Sidebar Panel */}
                <div
                  className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${showDispatchModal ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
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
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
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
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save Terms
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: E-WAY BILL & E-INVOICE                                      */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "eway-bill-einvoice" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">E-way Bill & E-Invoice Settings</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Configure automated government GSP API credentials for 1-click IRN & E-Way Bill generation.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      NIC Portal Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">GSP Username / GSTIN Portal User</label>
                      <input
                        type="text"
                        defaultValue="Viros_GSP_004"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                        placeholder="Enter GSP Username"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">GSP Password</label>
                      <input
                        type="password"
                        defaultValue="••••••••••••"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                        placeholder="Enter GSP Password"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-800">Automated Rules</div>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
                      <span>Auto generate E-Way bill when invoice total exceeds ₹ 50,000</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
                      <span>Auto generate E-Invoice (IRN + Signed QR code) on saving B2B Tax Invoices</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
                      <span>Print Government E-Invoice QR Code on PDF Invoices</span>
                    </label>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toast.success("NIC API Connection verified successfully!", { title: "API Connected" })}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Test Connection
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave("E-way Bill & E-Invoice")}
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: STAFF ACCOUNT (CLEAN & SIMPLE WITH VIEW & DELETE ACTIONS)   */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "staff-account" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Staff Account Management</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage staff members, roles, permissions, and security access.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenAddStaff}
                      className="px-3.5 py-1.5 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Staff</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-3 font-semibold text-slate-600">Staff Member</th>
                          <th className="pb-3 font-semibold text-slate-600">Email / Phone</th>
                          <th className="pb-3 font-semibold text-slate-600">Role</th>
                          <th className="pb-3 font-semibold text-slate-600">Status</th>
                          <th className="pb-3 text-right font-semibold text-slate-600">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {staffList.map((staff) => (
                          <tr key={staff.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 font-bold text-slate-900">
                              {staff.name}
                            </td>
                            <td className="py-3.5 text-slate-600">
                              {staff.email}
                            </td>
                            <td className="py-3.5">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${staff.roleBadge}`}>
                                {staff.role}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                                {staff.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              {staff.isPrimary ? (
                                <div className="flex items-center justify-end gap-3 font-medium">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditStaff(staff)}
                                    className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  >
                                    View
                                  </button>
                                  <span className="text-slate-400 font-normal">Primary</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-3.5 font-medium">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditStaff(staff)}
                                    className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditStaff(staff)}
                                    className="text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStaffList(staffList.filter((s) => s.id !== staff.id));
                                      toast.success(`Removed staff member: ${staff.name}`, { title: "Staff Deleted" });
                                    }}
                                    className="text-red-600 hover:text-red-700 transition-colors cursor-pointer font-semibold"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Slide-over Sidebar Drawer for Create / Edit Staff Account */}
                {/* Backdrop */}
                <div
                  className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
                    showStaffDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onClick={() => setShowStaffDrawer(false)}
                />

                {/* Sliding Sidebar Panel */}
                <div
                  className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    showStaffDrawer ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Sidebar Header */}
                  <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/60 shrink-0">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {editingStaffId ? "Edit Staff Account" : "Create Staff Account"}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Configure staff user credentials, security status, and module permissions.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowStaffDrawer(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sidebar Form Body (Scrollable) */}
                  <form onSubmit={handleSaveStaffAccount} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">

                      {/* 1. Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Name <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={staffForm.name}
                          onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                          placeholder="Enter staff full name"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 2. Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={staffForm.phone}
                          onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* 3. Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Email
                        </label>
                        <input
                          type="email"
                          value={staffForm.email}
                          onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                          placeholder="Enter email address"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                        />
                      </div>

                      {/* Credentials Divider Notice */}
                      <div className="pt-2 pb-1 border-t border-slate-200/80 text-center">
                        <span className="text-[11px] text-slate-500 font-medium">
                          The User ID and Password created below will be used by the staff member to log in.
                        </span>
                      </div>

                      {/* 4. User ID */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          User ID <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={staffForm.userId}
                          onChange={(e) => setStaffForm({ ...staffForm, userId: e.target.value })}
                          placeholder="Minimum 4 characters (letters and numbers)"
                          className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400 font-mono"
                        />
                      </div>

                      {/* 5. Password */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Password <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showStaffPass ? "text" : "password"}
                            value={staffForm.password}
                            onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                            placeholder="Min. 8 characters, including uppercase, lowercase, number & special character"
                            className="w-full pr-10 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowStaffPass(!showStaffPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showStaffPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* 6. Confirm Password */}
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                        <label className="font-semibold text-slate-700">
                          Confirm Password <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showStaffConfirmPass ? "text" : "password"}
                            value={staffForm.confirmPassword}
                            onChange={(e) => setStaffForm({ ...staffForm, confirmPassword: e.target.value })}
                            placeholder="Enter the same password again"
                            className="w-full pr-10 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowStaffConfirmPass(!showStaffConfirmPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showStaffConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/80 pt-3 space-y-3">
                        {/* 7. Enable Checkbox */}
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                          <label className="font-semibold text-slate-700">
                            Enable
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={staffForm.isEnabled}
                              onChange={(e) => setStaffForm({ ...staffForm, isEnabled: e.target.checked })}
                              className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                            />
                            <span className="text-slate-700 font-medium">Only enabled staff accounts can log in</span>
                          </label>
                        </div>

                        {/* 8. Staff Access Schedule Toggle & Weekly Schedule Table */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                            <label className="font-semibold text-slate-700">
                              Staff access schedule
                            </label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setStaffForm({ ...staffForm, hasSchedule: !staffForm.hasSchedule })}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                  staffForm.hasSchedule ? "bg-[#dc2626]" : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    staffForm.hasSchedule ? "translate-x-4" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Access Schedule Table (Expanded when toggle is ON) */}
                          {staffForm.hasSchedule && (
                            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs animate-in fade-in-50 duration-150">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold">
                                  <tr>
                                    <th className="py-2.5 px-4 font-semibold text-slate-700 w-1/3">Day</th>
                                    <th className="py-2.5 px-3 font-semibold text-slate-700 w-1/3">Start Time</th>
                                    <th className="py-2.5 px-3 font-semibold text-slate-700 w-1/3">End Time</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {scheduleDays.map((day) => (
                                    <tr key={day} className="hover:bg-slate-50/60 transition-colors">
                                      <td className="py-2.5 px-4 font-medium text-slate-800">
                                        {day}
                                      </td>
                                      <td className="py-2 px-3">
                                        <select
                                          value={staffSchedule[day]?.startTime || ""}
                                          onChange={(e) =>
                                            setStaffSchedule({
                                              ...staffSchedule,
                                              [day]: { ...staffSchedule[day], startTime: e.target.value },
                                            })
                                          }
                                          className="w-full px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                                        >
                                          <option value="">Select Start Time</option>
                                          {scheduleTimeSlots.map((t) => (
                                            <option key={t} value={t}>
                                              {t}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                      <td className="py-2 px-3">
                                        <select
                                          value={staffSchedule[day]?.endTime || ""}
                                          onChange={(e) =>
                                            setStaffSchedule({
                                              ...staffSchedule,
                                              [day]: { ...staffSchedule[day], endTime: e.target.value },
                                            })
                                          }
                                          className="w-full px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                                        >
                                          <option value="">Select End Time</option>
                                          {scheduleTimeSlots.map((t) => (
                                            <option key={t} value={t}>
                                              {t}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        {/* 9. User Allowed To & Select All */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                          <div className="font-bold text-slate-800 text-xs">
                            User Allowed to
                          </div>
                          <button
                            type="button"
                            onClick={handleToggleSelectAllPermissions}
                            className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                          >
                            Select All
                          </button>
                        </div>

                        {/* 10. Permissions Matrix Table */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                              <tr>
                                <th className="py-2.5 px-3">Section Name</th>
                                <th className="py-2.5 px-3 text-center w-16">View</th>
                                <th className="py-2.5 px-3 text-center w-16">Add</th>
                                <th className="py-2.5 px-3 text-center w-16">Edit</th>
                                <th className="py-2.5 px-3 text-center w-16">Remove</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              {Object.entries(staffPermissions).map(([section, perms]) => (
                                <tr key={section} className="hover:bg-slate-50/60">
                                  <td className="py-2 px-3 font-medium text-slate-800">
                                    {section}
                                  </td>
                                  <td className="py-2 px-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={perms.view}
                                      onChange={(e) =>
                                        setStaffPermissions({
                                          ...staffPermissions,
                                          [section]: { ...perms, view: e.target.checked },
                                        })
                                      }
                                      className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                                    />
                                  </td>
                                  <td className="py-2 px-3 text-center">
                                    {!perms.onlyView && (
                                      <input
                                        type="checkbox"
                                        checked={perms.add}
                                        onChange={(e) =>
                                          setStaffPermissions({
                                            ...staffPermissions,
                                            [section]: { ...perms, add: e.target.checked },
                                          })
                                        }
                                        className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                                      />
                                    )}
                                  </td>
                                  <td className="py-2 px-3 text-center">
                                    {!perms.onlyView && (
                                      <input
                                        type="checkbox"
                                        checked={perms.edit}
                                        onChange={(e) =>
                                          setStaffPermissions({
                                            ...staffPermissions,
                                            [section]: { ...perms, edit: e.target.checked },
                                          })
                                        }
                                        className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                                      />
                                    )}
                                  </td>
                                  <td className="py-2 px-3 text-center">
                                    {!perms.onlyView && (
                                      <input
                                        type="checkbox"
                                        checked={perms.remove}
                                        onChange={(e) =>
                                          setStaffPermissions({
                                            ...staffPermissions,
                                            [section]: { ...perms, remove: e.target.checked },
                                          })
                                        }
                                        className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}

                              {/* Expandable Accordions */}
                              {[
                                "Expense Income",
                                "Other Documents",
                                "Report",
                                "Setting",
                                "Other Options",
                              ].map((sec) => {
                                const isExpanded = !!expandedSections[sec];
                                return (
                                  <React.Fragment key={sec}>
                                    <tr
                                      onClick={() =>
                                        setExpandedSections({
                                          ...expandedSections,
                                          [sec]: !isExpanded,
                                        })
                                      }
                                      className="hover:bg-slate-50 cursor-pointer select-none bg-slate-50/30"
                                    >
                                      <td colSpan={4} className="py-2.5 px-3 font-semibold text-slate-800">
                                        {sec}
                                      </td>
                                      <td className="py-2.5 px-3 text-right text-slate-400">
                                        <span className="w-5 h-5 rounded border border-slate-200 inline-flex items-center justify-center text-xs font-bold text-slate-600 bg-white">
                                          {isExpanded ? "−" : "+"}
                                        </span>
                                      </td>
                                    </tr>
                                    {isExpanded && (
                                      <tr className="bg-red-50/10">
                                        <td colSpan={5} className="p-3 text-xs text-slate-600">
                                          <div className="flex items-center gap-4">
                                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 accent-[#dc2626]" />
                                              <span>View {sec}</span>
                                            </label>
                                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 accent-[#dc2626]" />
                                              <span>Manage {sec}</span>
                                            </label>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                      </div>

                    </div>

                    {/* Sidebar Footer Buttons */}
                    <div className="px-6 py-3.5 border-t border-slate-200/80 bg-slate-50/60 flex items-center justify-between shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowStaffDrawer(false)}
                        className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: GO DRIVE                                                    */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "go-drive" && (
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
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
                      >
                        Download Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: DIGITAL SIGN                                                */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "digital-sign" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Digital Signature (DSC) Integration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Attach your Class 3 USB Token or PFX digital signature on PDF invoices automatically.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Signer Full Name</label>
                      <input
                        type="text"
                        defaultValue="Abhishek Sharma"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">DSC Certificate Validity</label>
                      <input
                        type="text"
                        defaultValue="Valid till 14-Aug-2028"
                        disabled
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-800">Signature Stamp Position</div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="signPos" defaultChecked className="text-red-600 focus:ring-red-500" />
                        <span>Bottom Right (Authorized Signatory)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="signPos" className="text-red-600 focus:ring-red-500" />
                        <span>Bottom Left</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave("Digital Signature")}
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save DSC Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: EXPORT DATA                                                 */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "export-data" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Export Business & GST Data</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Export records in Excel, CSV, or Government GST JSON format for CA filing.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      { title: "GSTR-1 Filing Return", desc: "Outward supplies summary for portal filing", format: "Excel & JSON" },
                      { title: "GSTR-3B Tax Summary", desc: "Monthly tax liability & ITC report", format: "Excel (.xlsx)" },
                      { title: "Sales Invoices Register", desc: "All sales bills with item & tax breakup", format: "Excel / CSV" },
                      { title: "Purchase Bills Register", desc: "Inward supply records with vendor GSTIN", format: "Excel / CSV" },
                      { title: "Party Master (Customers/Vendors)", desc: "Contacts, addresses, GSTIN & balances", format: "Excel / CSV" },
                      { title: "Products & Stock Master", desc: "Item list, HSN codes, rates, current stock", format: "Excel / CSV" },
                    ].map((card, i) => (
                      <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white hover:border-red-400 hover:shadow-xs transition-all space-y-2.5">
                        <div className="font-bold text-xs text-slate-800">{card.title}</div>
                        <p className="text-[11px] text-slate-500">{card.desc}</p>
                        <div className="pt-1 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-slate-400">{card.format}</span>
                          <button
                            type="button"
                            onClick={() => toast.success(`Exporting ${card.title}...`)}
                            className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-[#dc2626] font-bold text-[11px] cursor-pointer"
                          >
                            Export
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: ACTIVITY LOG                                                */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "activity-log" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Activity & Audit Log</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time trail of actions performed by your team.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.info("Audit log refreshed")}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Refresh Log
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 font-semibold border-b border-slate-100">
                          <th className="pb-2.5 text-slate-600">Timestamp</th>
                          <th className="pb-2.5 text-slate-600">User</th>
                          <th className="pb-2.5 text-slate-600">Activity</th>
                          <th className="pb-2.5 text-slate-600">Module</th>
                          <th className="pb-2.5 text-slate-600">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                        <tr>
                          <td className="py-2.5 text-slate-500 font-mono">Today, 11:32 AM</td>
                          <td className="py-2.5 font-bold text-slate-800">Abhishek Sharma</td>
                          <td className="py-2.5 text-slate-700">Created Sale Invoice #INV-2026-0042</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700">Sales</span></td>
                          <td className="py-2.5 text-slate-500 font-mono">103.21.124.5</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-500 font-mono">Today, 10:15 AM</td>
                          <td className="py-2.5 font-bold text-slate-800">Abhishek Sharma</td>
                          <td className="py-2.5 text-slate-700">Updated Company Business Profile</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">Settings</span></td>
                          <td className="py-2.5 text-slate-500 font-mono">103.21.124.5</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-slate-500 font-mono">Yesterday, 04:50 PM</td>
                          <td className="py-2.5 font-bold text-slate-800">Rahul Verma</td>
                          <td className="py-2.5 text-slate-700">Recorded Payment Entry ₹ 24,500</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Payment</span></td>
                          <td className="py-2.5 text-slate-500 font-mono">115.99.18.21</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: EMAIL OPTIONS                                               */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "email-options" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Email Options & SMTP Configuration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Configure your custom company email server for sending invoices, quotations, and payment reminders.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">SMTP Host Server</label>
                      <input
                        type="text"
                        defaultValue="smtp.gmail.com"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">SMTP Port (SSL / TLS)</label>
                      <input
                        type="text"
                        defaultValue="587"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Sender Email Address</label>
                      <input
                        type="email"
                        defaultValue="billing@virosentrepreneurs.com"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">SMTP App Password</label>
                      <input
                        type="password"
                        defaultValue="••••••••••••••••"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toast.success("Test email sent to billing@virosentrepreneurs.com", { title: "Email Verified" })}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Send Test Email
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave("Email Options")}
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save SMTP Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: PAYMENT GATEWAY                                             */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {activeTab === "payment-gateway" && (
              <div className="space-y-6 animate-in fade-in-50 duration-150">
                <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Online Payment Gateway Integration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Collect digital payments (UPI, Credit/Debit Cards, NetBanking) directly from your invoices.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Payment Gateway Provider</label>
                      <select className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white focus:ring-1 focus:ring-red-500">
                        <option>Razorpay</option>
                        <option>Cashfree Payments</option>
                        <option>Paytm for Business</option>
                        <option>UPI Dynamic QR Code Only</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Razorpay Key ID</label>
                      <input
                        type="text"
                        defaultValue="rzp_live_K82j19xKls0a9"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium font-mono focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700">Razorpay Key Secret</label>
                      <input
                        type="password"
                        defaultValue="••••••••••••••••••••••••"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium font-mono focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-800">Auto-Reconciliation Status</div>
                    <p className="text-slate-600">When your customer scans the QR code or clicks the payment link on your invoice, the payment is automatically verified and the invoice is marked as <strong>PAID</strong>.</p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSave("Payment Gateway")}
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Save Gateway Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────────────────────────────────────────────────────── */}
            {/* VIEW: FALLBACK / OTHER APPLICATION TABS                          */}
            {/* ───────────────────────────────────────────────────────────────── */}
            {!["membership", "credits", "login-security", "eway-bill-einvoice", "whatsapp-options", "business-profile", "staff-account", "go-drive", "digital-sign", "export-data", "activity-log", "email-options", "payment-gateway", "bank-details", "terms-conditions"].includes(activeTab) && (
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
                      className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
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

      {/* WhatsApp Connect Modal */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in-50 zoom-in-95">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center font-bold">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Connect WhatsApp</h4>
                  <p className="text-[11px] text-slate-500">Scan QR to connect your WhatsApp device</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWhatsappModal(false)}
                className="w-7 h-7 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-slate-50 border-2 border-dashed border-red-200 rounded-xl flex flex-col items-center justify-center p-4">
                <QrCode className="w-32 h-32 text-slate-800" />
                <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-wider mt-1">Live QR Code</span>
              </div>

              <div className="text-left bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800">How to connect:</div>
                <div className="text-[11px] leading-relaxed">
                  1. Open WhatsApp on your phone.<br />
                  2. Tap <strong>Linked Devices</strong> in menu or settings.<br />
                  3. Tap <strong>Link a Device</strong> and point your camera at this screen.
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowWhatsappModal(false)}
                  className="px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWhatsappModal(false);
                    toast.success("WhatsApp device linked successfully!", { title: "WhatsApp Connected" });
                  }}
                  className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  I Have Scanned
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Draggable Quick Calculator */}
      <DraggableCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </div>
  );
}
