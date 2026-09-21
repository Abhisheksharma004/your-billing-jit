"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { 
  ReceiptText, 
  Building2, 
  CreditCard, 
  Activity, 
  LayoutDashboard,
  Users, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Search, 
  Bell, 
  LogOut, 
  TrendingUp, 
  ExternalLink,
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Filter,
  MoreVertical,
  X,
  Server,
  Layers,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  RefreshCw,
  Shield,
  Radio,
  Check,
  Zap,
  Globe,
  Star,
  Pencil,
  Trash2
} from "lucide-react";

// Real Company Data Interface from MySQL
interface Company {
  id: number;
  company_id: string;
  company_name: string;
  contact_person: string;
  email: string;
  contact_number: string;
  whatsapp_updates?: number;
  email_verified?: number;
  status: "active" | "suspended" | "inactive";
  trial_start: string;
  trial_end: string;
  created_at: string;
  updated_at?: string;
}

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const toast = useToast();
  const [adminData, setAdminData] = useState<{ id: number; name: string; username: string; email: string; role: string } | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Real DB Companies State
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [isTogglingCompanyId, setIsTogglingCompanyId] = useState<number | null>(null);
  const [isDeletingCompanyId, setIsDeletingCompanyId] = useState<number | null>(null);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "tenants" | "subscriptions" | "billing" | "gateways" | "audit" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Trial" | "Suspended">("All");
  
  // Sidebar states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header Interactive states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("Just now");

  // Add Company Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newStatus, setNewStatus] = useState<"active" | "suspended" | "inactive">("active");

  // DB Plans State
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [isDeletingPlanId, setIsDeletingPlanId] = useState<number | null>(null);

  // Add Plan Form State
  const [planName, setPlanName] = useState("");
  const [planTagline, setPlanTagline] = useState("");
  const [planBillingCycle, setPlanBillingCycle] = useState("monthly");
  const [planMonthlyPrice, setPlanMonthlyPrice] = useState("");
  const [planMaxUsers, setPlanMaxUsers] = useState("");
  const [planEwayLimit, setPlanEwayLimit] = useState("");
  const [planTrialDays, setPlanTrialDays] = useState("");
  const [planCtaText, setPlanCtaText] = useState("");
  const [planIsPopular, setPlanIsPopular] = useState(false);
  const [planDescription, setPlanDescription] = useState("");
  const [planFeatures, setPlanFeatures] = useState<string[]>([""]);

  // Filtered companies from real DB data
  const filteredCompanies = companies.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (c.company_name && c.company_name.toLowerCase().includes(q)) ||
      (c.company_id && c.company_id.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.contact_person && c.contact_person.toLowerCase().includes(q)) ||
      (c.contact_number && c.contact_number.toLowerCase().includes(q));

    const matchesStatus = 
      statusFilter === "All" ||
      (statusFilter === "Active" && c.status === "active") ||
      (statusFilter === "Suspended" && c.status === "suspended") ||
      (statusFilter === "Trial" && c.status === "active");

    return matchesSearch && matchesStatus;
  });

  const fetchCompanies = async () => {
    try {
      setIsLoadingCompanies(true);
      const res = await fetch("/api/superadmin/companies");
      const data = await res.json();
      if (data.success && Array.isArray(data.companies)) {
        setCompanies(data.companies);
      }
    } catch (err) {
      console.error("Failed to load companies:", err);
    } finally {
      setIsLoadingCompanies(false);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    try {
      setIsCreatingCompany(true);
      const res = await fetch("/api/superadmin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: newCompanyName.trim(),
          contactPerson: newContactPerson.trim() || "Admin",
          email: newEmail.trim(),
          contactNumber: newContactNumber.trim() || "0000000000",
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create company");
      }

      toast.success(`Company "${newCompanyName}" created successfully!`, {
        title: "Success",
        details: `Company ID: ${data.companyId}\nCreated at: ${new Date().toLocaleString()}`,
      });

      setNewCompanyName("");
      setNewContactPerson("");
      setNewEmail("");
      setNewContactNumber("");
      setIsAddModalOpen(false);
      await fetchCompanies();
    } catch (err: any) {
      toast.error(err.message || "Could not create company", {
        title: "Create Error",
      });
    } finally {
      setIsCreatingCompany(false);
    }
  };

  const toggleCompanyStatus = async (id: number, currentStatus: string, companyName: string) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      setIsTogglingCompanyId(id);
      const res = await fetch("/api/superadmin/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update company status");
      }

      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextStatus as any } : c))
      );

      if (nextStatus === "suspended") {
        toast.warning(`Company "${companyName}" has been suspended!`, {
          title: "Suspended",
          details: `Company ID: ${id} suspended. Access temporarily revoked.`,
        });
      } else {
        toast.success(`Company "${companyName}" is now active!`, {
          title: "Activated",
          details: `Company ID: ${id} re-activated with full access.`,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Could not update status", {
        title: "Update Error",
      });
    } finally {
      setIsTogglingCompanyId(null);
    }
  };

  const handleDeleteCompany = async (id: number, companyName: string) => {
    const ok = window.confirm(`Are you sure you want to delete "${companyName}" from the database? This action cannot be undone.`);
    if (!ok) return;

    try {
      setIsDeletingCompanyId(id);
      const res = await fetch(`/api/superadmin/companies?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete company");
      }

      toast.success(`Company "${companyName}" deleted successfully!`, {
        title: "Company Deleted",
        details: "The company has been removed from MySQL database.",
      });

      await fetchCompanies();
    } catch (err: any) {
      toast.error(err.message || "Could not delete company", {
        title: "Delete Error",
      });
    } finally {
      setIsDeletingCompanyId(null);
    }
  };

  const fetchPlans = async () => {
    try {
      setIsLoadingPlans(true);
      const res = await fetch("/api/superadmin/plans");
      const data = await res.json();
      if (data.success && Array.isArray(data.plans)) {
        setPlans(data.plans);
      }
    } catch (err) {
      console.error("Failed to load plans:", err);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchCompanies();
  }, []);

  const openAddPlanModal = () => {
    setEditingPlanId(null);
    setPlanName("");
    setPlanTagline("");
    setPlanBillingCycle("monthly");
    setPlanMonthlyPrice("");
    setPlanMaxUsers("");
    setPlanEwayLimit("");
    setPlanTrialDays("");
    setPlanCtaText("");
    setPlanIsPopular(false);
    setPlanDescription("");
    setPlanFeatures([""]);
    setIsAddPlanModalOpen(true);
  };

  const openEditPlanModal = (plan: any) => {
    setEditingPlanId(plan.id);
    setPlanName(plan.name || "");
    setPlanTagline(plan.tagline || "");
    setPlanBillingCycle(plan.billing_cycle || "monthly");
    setPlanMonthlyPrice(plan.monthly_price !== null && plan.monthly_price !== undefined ? String(plan.monthly_price) : "");
    setPlanMaxUsers(plan.max_users || "");
    setPlanEwayLimit(plan.eway_limit || "");
    setPlanTrialDays(plan.trial_days !== null && plan.trial_days !== undefined ? String(plan.trial_days) : "14");
    setPlanCtaText(plan.cta_text || "Start 14-Day Free Trial");
    setPlanIsPopular(Boolean(plan.is_popular));
    setPlanDescription(plan.description || "");
    setPlanFeatures(Array.isArray(plan.features) && plan.features.length > 0 ? plan.features : [""]);
    setIsAddPlanModalOpen(true);
  };

  const handleDeletePlan = async (plan: any) => {
    const ok = window.confirm(`Are you sure you want to delete "${plan.name}" plan from the database?`);
    if (!ok) return;

    try {
      setIsDeletingPlanId(plan.id);
      const res = await fetch(`/api/superadmin/plans?id=${plan.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete plan");
      }

      toast.success(`Plan "${plan.name}" deleted successfully!`, {
        title: "Plan Deleted",
        details: "The subscription plan has been removed from MySQL database.",
      });

      await fetchPlans();
    } catch (err: any) {
      toast.error(err.message || "Could not delete plan", {
        title: "Delete Error",
      });
    } finally {
      setIsDeletingPlanId(null);
    }
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name", { title: "Validation Error" });
      return;
    }

    try {
      setIsSavingPlan(true);
      const isEditing = editingPlanId !== null;
      const url = "/api/superadmin/plans";
      const method = isEditing ? "PUT" : "POST";
      const payload: any = {
        name: planName,
        tagline: planTagline,
        billingCycle: planBillingCycle,
        monthlyPrice: planMonthlyPrice,
        maxUsers: planMaxUsers || "5",
        ewayLimit: planEwayLimit || "2,500",
        trialDays: planTrialDays || 14,
        ctaText: planCtaText || "Start 14-Day Free Trial",
        isPopular: planIsPopular,
        description: planDescription,
        features: planFeatures.filter((f) => f.trim() !== ""),
      };

      if (isEditing) {
        payload.id = editingPlanId;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || `Failed to ${isEditing ? "update" : "create"} plan`);
      }

      toast.success(
        isEditing
          ? `Plan "${planName}" updated successfully!`
          : `Plan "${planName}" created successfully!`,
        {
          title: isEditing ? "Plan Updated" : "Plan Saved in Database",
          details: "The subscription plan has been saved to MySQL and is live on the dashboard.",
        }
      );

      await fetchPlans();

      // Reset form
      setEditingPlanId(null);
      setPlanName("");
      setPlanTagline("");
      setPlanBillingCycle("monthly");
      setPlanMonthlyPrice("");
      setPlanMaxUsers("");
      setPlanEwayLimit("");
      setPlanTrialDays("");
      setPlanCtaText("");
      setPlanDescription("");
      setPlanFeatures([""]);
      setPlanIsPopular(false);

      setIsAddPlanModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Could not save plan", {
        title: "Error Saving Plan",
      });
    } finally {
      setIsSavingPlan(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function checkSession() {
      try {
        const res = await fetch("/api/superadmin/me");
        if (!res.ok) {
          router.push("/superadmin");
          return;
        }
        const data = await res.json();
        if (data.success && data.admin) {
          if (isMounted) {
            setAdminData(data.admin);
            setIsAuthChecking(false);
          }
        } else {
          router.push("/superadmin");
        }
      } catch {
        router.push("/superadmin");
      }
    }
    checkSession();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    toast.info("Signing out from master session...", {
      title: "Info",
      details: "Terminating root admin session and removing authentication cookie.",
    });
    try {
      await fetch("/api/superadmin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setTimeout(() => {
        router.push("/superadmin?logout=success");
      }, 400);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchPlans(), fetchCompanies()]);
    toast.wait("Wait for the data import operation to complete", {
      title: "Wait",
      duration: 1000,
      details: "Reconnecting to MySQL Database and refreshing live metrics...",
    });
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(timeStr);
      toast.success("All systems synchronized and operational!", {
        title: "Success",
        details: `Sync time: ${timeStr}\nTotal Companies: ${companies.length}`,
      });
    }, 1000);
  };

  // Nav item component helper
  const NavItem = ({
    tabKey,
    label,
    icon: Icon,
    badge,
    pulse = false
  }: {
    tabKey: typeof activeTab;
    label: string;
    icon: any;
    badge?: string | number;
    pulse?: boolean;
  }) => {
    const isActive = activeTab === tabKey;
    return (
      <button
        onClick={() => {
          setActiveTab(tabKey);
          setMobileMenuOpen(false);
        }}
        title={isCollapsed ? label : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer group relative ${
          isActive
            ? "bg-red-50 text-red-600 shadow-2xs font-extrabold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        } ${isCollapsed ? "justify-center px-2" : ""}`}
      >
        {/* Active Left indicator bar */}
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-red-600 rounded-r-full" />
        )}
        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
          isActive ? "text-red-600" : "text-slate-500 group-hover:text-slate-800"
        }`} />
        {!isCollapsed && (
          <>
            <span className="truncate flex-1">{label}</span>
            {badge !== undefined && (
              <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                isActive ? "bg-red-200/60 text-red-800" : "bg-slate-100 text-slate-600"
              }`}>
                {badge}
              </span>
            )}
            {pulse && (
              <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 font-sans flex text-slate-800 antialiased selection:bg-red-500 selection:text-white">
      
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-200"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 md:static bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0
        ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "w-64"}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Brand Header */}
          <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? "justify-center w-full" : ""}`}>
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs shrink-0">
                <ReceiptText className="w-4 h-4 stroke-[2.5]" />
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">
                    Your <span className="text-red-600">Billing</span>
                  </div>
                  <div className="text-[10px] font-bold text-red-600 tracking-wider uppercase mt-0.5 flex items-center gap-1">
                    <span>Superadmin</span>
                    <span className="text-[9px] bg-red-100 text-red-700 px-1 py-0.2 rounded font-mono">v2.4</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            
            {/* Core Modules */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Main Console
                </div>
              )}
              <NavItem tabKey="overview" label="Dashboard" icon={LayoutDashboard} />
              <NavItem 
                tabKey="tenants" 
                label="Companies / Tenants" 
                icon={Building2} 
                badge={companies.length} 
              />
              <NavItem tabKey="subscriptions" label="Subscription Plans" icon={CreditCard} />
              <NavItem tabKey="billing" label="Billing & Revenue" icon={FileText} />
              <NavItem tabKey="gateways" label="NIC & GST Gateways" icon={Server} pulse />
            </div>

            {/* Admin & Security */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  System & Logs
                </div>
              )}
              <NavItem tabKey="audit" label="Audit & Security Logs" icon={ShieldCheck} />
              <NavItem tabKey="settings" label="System Settings" icon={Settings} />
            </div>

            {/* External Links */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  External Portals
                </div>
              )}
              <Link
                href="/"
                title={isCollapsed ? "Customer Website" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                  isCollapsed ? "justify-center px-2" : ""
                }`}
              >
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1">Public Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
                  </>
                )}
              </Link>

              <Link
                href="/login"
                title={isCollapsed ? "Tenant Staff Login" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                  isCollapsed ? "justify-center px-2" : ""
                }`}
              >
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                {!isCollapsed && <span className="truncate">Staff ERP Login</span>}
              </Link>
            </div>

          </div>

          {/* User Footer Logout */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            {!isCollapsed ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors border border-slate-200 hover:border-red-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-20 shrink-0">
          
          {/* Left: Mobile Toggle, Desktop Collapse & Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Sidebar Collapse / Expand Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer items-center justify-center shadow-2xs"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "rotate-180 text-red-600" : ""}`} />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                Superadmin Dashboard
              </span>
              {activeTab !== "overview" && (
                <>
                  <span className="text-xs text-slate-300">/</span>
                  <span className="text-xs font-bold text-red-600">
                    {activeTab === "tenants" && "Companies & Tenants"}
                    {activeTab === "subscriptions" && "Subscription Plans"}
                    {activeTab === "billing" && "Billing & Revenue"}
                    {activeTab === "gateways" && "NIC & GST Gateways"}
                    {activeTab === "audit" && "Audit & Security"}
                    {activeTab === "settings" && "System Settings"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search companies, GSTIN, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors text-slate-900 placeholder:text-slate-400 shadow-2xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden md:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Realtime Refresh Button */}
            <button
              onClick={handleRefresh}
              title={`Last synced: ${lastSyncTime}. Click to refresh.`}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer relative"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-red-600" : ""}`} />
            </button>

            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setAdminMenuOpen(false);
                }}
                className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-red-600" />
                      <span>System Notifications</span>
                    </div>
                    {unreadNotifications > 0 && (
                      <button
                        onClick={() => setUnreadNotifications(0)}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
                    <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-100">
                      <div className="font-bold text-slate-900">Apex Logistics - Spike in Invoices</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Generated over 1,200 IRNs in the last hour without failure.</div>
                      <div className="text-[10px] text-slate-400 mt-1">2 mins ago</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="font-bold text-slate-900">NIC Gateway Latency Normal</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">All 3 GSP server clusters responded under 140ms.</div>
                      <div className="text-[10px] text-slate-400 mt-1">15 mins ago</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="font-bold text-slate-900">Automated DB Backup Completed</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">AES-256 encrypted multi-tenant snapshot saved to AWS S3.</div>
                      <div className="text-[10px] text-slate-400 mt-1">1 hour ago</div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500">
                      All systems operating at 100% SLA
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Add Company Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Company</span>
            </button>

            {/* Admin Avatar Menu in Header */}
            <div className="relative">
              <button
                onClick={() => {
                  setAdminMenuOpen(!adminMenuOpen);
                  setNotificationsOpen(false);
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                title="Root Admin Menu"
              >
                RA
              </button>

              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                  <div className="p-2.5 border-b border-slate-100">
                    <div className="font-extrabold text-slate-900">{adminData?.name || "Root Administrator"}</div>
                    <div className="text-[11px] text-slate-500">{adminData?.email || "root@yourbilling.internal"}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Multi-Factor Auth Active
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab("settings");
                        setAdminMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Security & Configs</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("audit");
                        setAdminMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      <span>Access & Audit Trail</span>
                    </button>
                  </div>
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-left font-bold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* MAIN BODY SCROLLABLE CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeTab === "overview" && "Superadmin Dashboard"}
                {activeTab === "tenants" && "Tenant Companies Management"}
                {activeTab === "subscriptions" && "Subscription Plans & MRR Tracking"}
                {activeTab === "billing" && "Billing & Revenue Overview"}
                {activeTab === "gateways" && "NIC & GSTN Gateway Telemetry"}
                {activeTab === "audit" && "Master Security & Audit Logs"}
                {activeTab === "settings" && "Global System Configurations"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time multi-tenant health, GST e-invoicing telemetry, and business subscriptions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Interactive Notification Test Triggers */}
              <div className="hidden xl:flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 px-1.5 uppercase">Test Toasts:</span>
                <button
                  onClick={() => toast.error("Wait for the data import operation to complete", { title: "Error", details: "Database lock timeout: Table 'tenants' could not acquire exclusive schema lock." })}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Error
                </button>
                <button
                  onClick={() => toast.success("Wait for the data import operation to complete", { title: "Success", details: "Data import completed with 142 records parsed and committed." })}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Success
                </button>
                <button
                  onClick={() => toast.info("Wait for the data import operation to complete", { title: "Info", details: "Background worker thread started with PID 4820." })}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Info
                </button>
                <button
                  onClick={() => toast.warning("Wait for the data import operation to complete", { title: "Warning", details: "High memory utilization (84%). Job execution throttled." })}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Warning
                </button>
                <button
                  onClick={() => toast.wait("Wait for the data import operation to complete", { title: "Wait", duration: 4000, details: "Awaiting response from external NIC e-invoice webhook..." })}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Wait
                </button>
              </div>

              <span className="text-xs text-slate-400 hidden sm:inline">Sync Status:</span>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                {lastSyncTime === "Just now" ? "Realtime (Connected)" : `Last synced: ${lastSyncTime}`}
              </span>
            </div>
          </div>

          {/* 4 STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Active Tenants */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-red-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Active Companies</span>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {companies.filter(c => c.status === "active").length}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>{companies.length} Total Registered</span>
                </div>
              </div>
            </div>

            {/* Card 2: MRR Revenue */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-red-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Monthly Revenue (MRR)</span>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹18.45 Lakh
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8.6% growth rate</span>
                </div>
              </div>
            </div>

            {/* Card 3: Invoices Today */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-red-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Invoices Processed Today</span>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  48,290
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-500">
                  <span>99.9% IRN generated &lt;200ms</span>
                </div>
              </div>
            </div>

            {/* Card 4: System Uptime */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-red-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">System Gateway Uptime</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-emerald-600 tracking-tight">
                  99.98%
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>All 12 microservices live</span>
                </div>
              </div>
            </div>

          </div>

          {/* MAIN SECTION: TENANTS DIRECTORY & FILTERS (Visible in Overview & Tenants tab) */}
          {(activeTab === "overview" || activeTab === "tenants") && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              
              {/* Table Header & Controls */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Registered Business Organizations
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing {filteredCompanies.length} of {companies.length} organizations registered in MySQL database.
                  </p>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80">
                  {(["All", "Active", "Trial", "Suspended"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        statusFilter === status
                          ? "bg-white text-red-600 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-5">Company / ID</th>
                      <th className="py-3 px-5">Contact Person</th>
                      <th className="py-3 px-5">Email & Phone</th>
                      <th className="py-3 px-5">Trial Period</th>
                      <th className="py-3 px-5">Registered On</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {isLoadingCompanies ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <RefreshCw className="w-6 h-6 animate-spin text-red-600" />
                            <span className="font-semibold text-xs">Loading companies from MySQL database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredCompanies.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No companies found matching "{searchQuery}"
                        </td>
                      </tr>
                    ) : (
                      filteredCompanies.map((company) => {
                        const trialEndDate = new Date(company.trial_end);
                        const today = new Date();
                        const daysLeft = Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        const isExpired = daysLeft < 0;

                        return (
                          <tr key={company.id} className="hover:bg-slate-50/60 transition-colors">
                            
                            {/* Company Name & 7-digit ID */}
                            <td className="py-3.5 px-5">
                              <div className="font-bold text-slate-900">{company.company_name}</div>
                              <div className="text-[11px] font-mono text-red-600 font-semibold mt-0.5">
                                ID: {company.company_id}
                              </div>
                            </td>

                            {/* Contact Person */}
                            <td className="py-3.5 px-5">
                              <div className="font-semibold text-slate-800">{company.contact_person}</div>
                            </td>

                            {/* Email & Phone */}
                            <td className="py-3.5 px-5">
                              <div className="font-medium text-slate-800">{company.email}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{company.contact_number}</div>
                            </td>

                            {/* Trial Period */}
                            <td className="py-3.5 px-5">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                                14-Day Free Trial
                              </span>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {isExpired ? (
                                  <span className="text-rose-600 font-semibold">Expired</span>
                                ) : (
                                  <span>{daysLeft} days left ({trialEndDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })})</span>
                                )}
                              </div>
                            </td>

                            {/* Registration Date */}
                            <td className="py-3.5 px-5 text-slate-600">
                              {new Date(company.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                                company.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : company.status === "suspended"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  company.status === "active"
                                    ? "bg-emerald-500"
                                    : company.status === "suspended"
                                    ? "bg-rose-500"
                                    : "bg-slate-400"
                                }`}></span>
                                {company.status}
                              </span>
                            </td>

                            {/* Quick Actions */}
                            <td className="py-3.5 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => toggleCompanyStatus(company.id, company.status, company.company_name)}
                                  disabled={isTogglingCompanyId === company.id}
                                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                                    company.status === "active"
                                      ? "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                                      : "text-emerald-600 hover:bg-emerald-50"
                                  } disabled:opacity-50`}
                                >
                                  {isTogglingCompanyId === company.id
                                    ? "Updating..."
                                    : company.status === "active"
                                    ? "Suspend"
                                    : "Activate"}
                                </button>
                                <button
                                  onClick={() => handleDeleteCompany(company.id, company.company_name)}
                                  disabled={isDeletingCompanyId === company.id}
                                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                                  title="Delete Company"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Total {filteredCompanies.length} companies listed</span>
                <span className="font-semibold text-slate-700">MySQL Database Storage</span>
              </div>

            </div>
          )}

          {/* SUBSCRIPTIONS TAB VIEW */}
          {activeTab === "subscriptions" && (
            <div className="space-y-5">

              {/* Section Header with Add Plan button */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Subscription Plans</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage pricing tiers available to tenant businesses.</p>
                </div>
                <button
                  onClick={openAddPlanModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  Add Plan
                </button>
              </div>

            {isLoadingPlans ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2 bg-white rounded-xl border border-slate-200">
                <RefreshCw className="w-6 h-6 animate-spin text-red-500" />
                <span className="text-xs font-semibold">Loading live plans from database...</span>
              </div>
            ) : plans.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-xl border border-slate-200 p-8">
                <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-700">No Subscription Plans Found</h3>
                <p className="text-xs text-slate-400 mt-1">Click &quot;Add Plan&quot; to create your first pricing tier in the database.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => {
                  const isPop = Boolean(p.is_popular);
                  const subCount = p.subscribers_count ?? 0;

                  return (
                    <div
                      key={p.id}
                      className={`bg-white p-6 rounded-xl flex flex-col justify-between transition-all ${
                        isPop
                          ? "border-2 border-red-500 shadow-sm relative"
                          : "border border-slate-200 shadow-2xs hover:border-slate-300"
                      }`}
                    >
                      {isPop && (
                        <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <span>★ Most Popular</span>
                        </div>
                      )}

                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                          <div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${isPop ? "text-red-600" : "text-slate-500"}`}>
                              {p.name}
                            </span>
                            {p.tagline && (
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                                {p.tagline}
                              </p>
                            )}
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                            isPop ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"
                          }`}>
                            ₹{Number(p.monthly_price).toLocaleString("en-IN")}/{p.billing_cycle === "yearly" ? "yr" : "mo"}
                          </span>
                        </div>

                        {/* Subscribers count */}
                        <div className="mt-4">
                          <div className="text-3xl font-black text-slate-900">
                            {subCount}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Subscribed companies</div>

                          {/* Limits chips */}
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Users Limit</span>
                              <span className="font-bold text-slate-700">{p.max_users || "Unlimited"}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">e-Way Limit</span>
                              <span className="font-bold text-slate-700">{p.eway_limit || "Unlimited"}</span>
                            </div>
                          </div>

                          {/* Features list */}
                          <div className="mt-4 space-y-2 text-xs text-slate-600">
                            {p.features && p.features.length > 0 ? (
                              p.features.map((feat: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className={`font-bold ${isPop ? "text-red-600" : "text-emerald-600"}`}>✓</span>
                                  <span className="leading-tight">{feat}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-slate-400 italic text-[11px]">Standard ERP Features</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* CTA & Actions */}
                      <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                        <div
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                            isPop
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {p.cta_text || "Start 14-Day Free Trial"}
                        </div>

                        {/* Update and Delete Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <button
                            type="button"
                            onClick={() => openEditPlanModal(p)}
                            className="w-full py-1.5 px-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 text-slate-700 hover:text-blue-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                          >
                            <Pencil className="w-3.5 h-3.5 text-blue-600" />
                            <span>Update</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePlan(p)}
                            disabled={isDeletingPlanId === p.id}
                            className="w-full py-1.5 px-2.5 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50/70 text-slate-700 hover:text-red-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                          >
                            {isDeletingPlanId === p.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )}



          {/* GATEWAYS TAB VIEW */}
          {activeTab === "gateways" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span>NIC National e-Invoice Portal</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">99.99% Up</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Average IRN Latency:</span>
                    <span className="font-mono font-bold text-slate-900">114 ms</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>API Endpoint:</span>
                    <span className="font-mono text-slate-700">https://einvoice1.gst.gov.in/api/v1</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SSL Certificate Validity:</span>
                    <span className="text-emerald-600 font-bold">Valid (312 days remaining)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span>E-Way Bill System Gateway</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">99.98% Up</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Average Generation Latency:</span>
                    <span className="font-mono font-bold text-slate-900">89 ms</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>API Endpoint:</span>
                    <span className="font-mono text-slate-700">https://ewaybillgst.gov.in/api/v1</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SSL Certificate Validity:</span>
                    <span className="text-emerald-600 font-bold">Valid (280 days remaining)</span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* BILLING & REVENUE TAB VIEW */}
          {activeTab === "billing" && (
            <div className="space-y-6">

              {/* MRR Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500">Total MRR</div>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹18.45 Lakh</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +8.6% this month</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500">Invoices Raised (MTD)</div>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹21.2 Lakh</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Including GST @ 18%</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500">Outstanding / Pending</div>
                  <div className="text-2xl font-black text-rose-600 mt-2">₹1.84 Lakh</div>
                  <div className="text-[11px] text-rose-500 font-semibold mt-1">2 tenants overdue</div>
                </div>
              </div>

              {/* Recent Transactions Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900">Recent Billing Transactions</h2>
                  <span className="text-[11px] text-slate-400 font-mono">Last 30 days</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-5">Tenant</th>
                        <th className="py-3 px-5">Plan</th>
                        <th className="py-3 px-5">Amount</th>
                        <th className="py-3 px-5">Date</th>
                        <th className="py-3 px-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {[
                        { name: "Apex Logistics India Pvt Ltd", plan: "Enterprise", amount: "₹14,999", date: "15 Sep 2026", status: "Paid" },
                        { name: "Bharat Pharma Distributors", plan: "Growth", amount: "₹7,499", date: "14 Sep 2026", status: "Paid" },
                        { name: "Surat TexFab Mills", plan: "Enterprise", amount: "₹14,999", date: "12 Sep 2026", status: "Paid" },
                        { name: "Chennai Tech Hardware Corp", plan: "Growth", amount: "₹7,499", date: "10 Sep 2026", status: "Paid" },
                        { name: "Delhi Auto Spares Hub", plan: "Starter", amount: "₹2,999", date: "08 Sep 2026", status: "Overdue" },
                        { name: "Jaipur Gemstone & Crafts Ltd", plan: "Starter", amount: "₹2,999", date: "05 Sep 2026", status: "Overdue" },
                      ].map((tx, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-5 font-semibold text-slate-900">{tx.name}</td>
                          <td className="py-3 px-5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                              tx.plan === "Enterprise" ? "bg-red-50 text-red-700 border-red-200" :
                              tx.plan === "Growth" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>{tx.plan}</span>
                          </td>
                          <td className="py-3 px-5 font-bold text-slate-900">{tx.amount}</td>
                          <td className="py-3 px-5 text-slate-500 font-mono">{tx.date}</td>
                          <td className="py-3 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              tx.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${tx.status === "Paid" ? "bg-emerald-500" : "bg-rose-500"}`} />
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* AUDIT & SECURITY VIEW */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900">Master Audit & Security Trail</h2>
              <p className="text-xs text-slate-500">Immutable cryptographic log of privileged operations and multi-tenant actions.</p>
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Root Admin Session Login (MFA Verified)</div>
                    <div className="text-slate-500 text-[11px]">IP: 103.21.144.92 • Device: Windows Chrome • Location: Mumbai, IN</div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Today, 13:14:02</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Automated Schema Migration: PostgreSQL 16</div>
                    <div className="text-slate-500 text-[11px]">All tenant schemas verified with 0 locking operations</div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Yesterday, 04:00:00</span>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900">Global System Settings</h2>
              <p className="text-xs text-slate-500">Master configuration parameters governing all tenant instances.</p>
              <div className="space-y-4 pt-2 text-xs max-w-lg">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <div className="font-bold text-slate-900">Multi-Factor Authentication (MFA)</div>
                    <div className="text-slate-500 text-[11px]">Enforce TOTP for all Superadmin logins</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">ENFORCED</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <div className="font-bold text-slate-900">PostgreSQL Row-Level Security (RLS)</div>
                    <div className="text-slate-500 text-[11px]">Strict isolation between tenant databases</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">ACTIVE</span>
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY ROW: REALTIME TELEMETRY & SYSTEM HEALTH (Visible on Overview) */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Box 1: Recent Activity Stream */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-600" />
                    <span>Live System & Invoicing Activity</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Automated Stream
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">
                        Apex Logistics India Pvt Ltd generated 142 B2B e-Invoices
                      </div>
                      <div className="text-slate-500 text-[11px]">NIC Portal IRN generated with QR Code • 12 seconds ago</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">112ms</span>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">
                        Bharat Pharma Distributors synced GSTR-1 returns with GSTN
                      </div>
                      <div className="text-slate-500 text-[11px]">Reconciliation complete: 0 mismatches • 2 minutes ago</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">240ms</span>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">
                        Root Superadmin verified multi-region backup snapshot
                      </div>
                      <div className="text-slate-500 text-[11px]">AWS Mumbai AP-South-1 encrypted vault • 14 minutes ago</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">OK</span>
                  </div>
                </div>
              </div>

              {/* Box 2: GST Gateway Status */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4 text-red-600" />
                  <span>GST Portal Gateways</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">NIC e-Invoice Portal</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Operational (140ms)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">E-Way Bill Generation</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Operational (98ms)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">GSP / ASP Connectors</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Operational (105ms)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Automated DB Backups</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Synced (Encrypted)
                    </span>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-100 text-center">
                  <div className="text-xs font-bold text-red-700">Master Console Health 100%</div>
                  <div className="text-[11px] text-red-600 mt-0.5">All services passing latency SLA tests</div>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* ADD COMPANY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Add New Tenant Business</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-4 pt-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">
                  Company / Business Name<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahavir Textiles Private Limited"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">
                  Contact Person Name<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abhishek Sharma"
                  value={newContactPerson}
                  onChange={(e) => setNewContactPerson(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">
                    Business Email<span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@mahavir.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">
                    Contact Phone Number<span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={newContactNumber}
                    onChange={(e) => setNewContactNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">
                  Initial Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-white text-slate-900"
                >
                  <option value="active">Active (Full Access)</option>
                  <option value="suspended">Suspended (Access Revoked)</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingCompany}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isCreatingCompany ? "Creating..." : "Create Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PLAN SIDE DRAWER */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
          isAddPlanModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsAddPlanModalOpen(false)}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[99999] shadow-2xl flex flex-col transform transition-transform duration-350 ease-out ${
          isAddPlanModalOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        style={{
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <CreditCard className="w-4.5 h-4.5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {editingPlanId ? "Edit Subscription Plan" : "Add New Plan"}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {editingPlanId ? `Editing Plan #${editingPlanId} in database` : "Create a new subscription pricing tier"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddPlanModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

              {/* Plan Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Plan Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Starter ERP"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Tagline</label>
                <input
                  type="text"
                  value={planTagline}
                  onChange={(e) => setPlanTagline(e.target.value)}
                  placeholder="Perfect for small traders and freelancers"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>

              {/* Billing Cycle */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Billing Cycle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={planBillingCycle}
                    onChange={(e) => setPlanBillingCycle(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-9 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 transition-colors cursor-pointer"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly (Every 3 months)</option>
                    <option value="yearly">Yearly (Annual billing)</option>
                    <option value="custom">Custom</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={planMonthlyPrice}
                  onChange={(e) => setPlanMonthlyPrice(e.target.value)}
                  placeholder="599"
                  onWheel={(e) => e.currentTarget.blur()}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* Max Users & E-Way Bill */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Max Users</label>
                  <input
                    type="number"
                    value={planMaxUsers}
                    onChange={(e) => setPlanMaxUsers(e.target.value)}
                    placeholder="15"
                    onWheel={(e) => e.currentTarget.blur()}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">E-Way Bill Limit</label>
                  <input
                    type="number"
                    value={planEwayLimit}
                    onChange={(e) => setPlanEwayLimit(e.target.value)}
                    placeholder="5000"
                    onWheel={(e) => e.currentTarget.blur()}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Free Trial Days & CTA Text */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Free Trial Days</label>
                  <input
                    type="number"
                    value={planTrialDays}
                    onChange={(e) => setPlanTrialDays(e.target.value)}
                    placeholder="14"
                    onWheel={(e) => e.currentTarget.blur()}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">CTA Button Text</label>
                  <input
                    type="text"
                    value={planCtaText}
                    onChange={(e) => setPlanCtaText(e.target.value)}
                    placeholder="Start Free Trial"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors"
                  />
                </div>
              </div>

              {/* Mark as Popular */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={planIsPopular}
                  onChange={(e) => setPlanIsPopular(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer accent-red-600"
                />
                <span className="text-xs font-medium text-slate-700">Mark as Popular</span>
              </label>

              {/* Features — dynamic list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">What&apos;s Included (Features)</label>
                  <button
                    type="button"
                    onClick={() => setPlanFeatures([...planFeatures, ""])}
                    className="text-[10px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {planFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...planFeatures];
                          updated[idx] = e.target.value;
                          setPlanFeatures(updated);
                        }}
                        placeholder={`Feature ${idx + 1}`}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors"
                      />
                      {planFeatures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPlanFeatures(planFeatures.filter((_, i) => i !== idx))}
                          className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Description</label>
                <textarea
                  rows={3}
                  value={planDescription}
                  onChange={(e) => setPlanDescription(e.target.value)}
                  placeholder="Brief description of this plan..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-xs text-slate-900 placeholder:text-slate-400 transition-colors resize-none"
                />
              </div>

              {/* Info tip */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                <span className="text-amber-500 text-xs mt-0.5">ⓘ</span>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Once created, this plan will be immediately available for tenant assignments. You can edit limits anytime from the Plans page.
                </p>
              </div>

            </div>

            {/* Drawer Footer — sticky */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 bg-white">
              <button
                onClick={() => setIsAddPlanModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                disabled={isSavingPlan}
                className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {isSavingPlan ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {editingPlanId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {editingPlanId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingPlanId ? "Update Plan" : "Create Plan"}
                  </>
                )}
              </button>
            </div>
          </div>

    </div>
  );
}
