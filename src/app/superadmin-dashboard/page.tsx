"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Globe
} from "lucide-react";

// Mock Tenant Data
interface Tenant {
  id: string;
  name: string;
  gstin: string;
  city: string;
  plan: "Enterprise" | "Growth" | "Starter";
  users: number;
  invoicesThisMonth: number;
  mrr: string;
  status: "Active" | "Trial" | "Suspended";
  joinedDate: string;
}

const initialTenants: Tenant[] = [
  {
    id: "TNT-101",
    name: "Apex Logistics India Pvt Ltd",
    gstin: "27AABCA1234F1Z8",
    city: "Mumbai, MH",
    plan: "Enterprise",
    users: 48,
    invoicesThisMonth: 12450,
    mrr: "₹14,999",
    status: "Active",
    joinedDate: "12 Jan 2025"
  },
  {
    id: "TNT-102",
    name: "Bharat Pharma Distributors",
    gstin: "36AAECB5678P1ZQ",
    city: "Hyderabad, TS",
    plan: "Growth",
    users: 18,
    invoicesThisMonth: 6380,
    mrr: "₹7,499",
    status: "Active",
    joinedDate: "04 Feb 2025"
  },
  {
    id: "TNT-103",
    name: "Surat TexFab Mills",
    gstin: "24AABCS9988C1ZR",
    city: "Surat, GJ",
    plan: "Enterprise",
    users: 32,
    invoicesThisMonth: 9840,
    mrr: "₹14,999",
    status: "Active",
    joinedDate: "18 Feb 2025"
  },
  {
    id: "TNT-104",
    name: "Delhi Auto Spares Hub",
    gstin: "07AAACD4433D1ZS",
    city: "Delhi NCR",
    plan: "Starter",
    users: 6,
    invoicesThisMonth: 1210,
    mrr: "₹2,999",
    status: "Trial",
    joinedDate: "02 Mar 2025"
  },
  {
    id: "TNT-105",
    name: "Chennai Tech Hardware Corp",
    gstin: "33AABCC1122E1ZT",
    city: "Chennai, TN",
    plan: "Growth",
    users: 22,
    invoicesThisMonth: 4500,
    mrr: "₹7,499",
    status: "Active",
    joinedDate: "28 Jan 2025"
  },
  {
    id: "TNT-106",
    name: "Jaipur Gemstone & Crafts Ltd",
    gstin: "08AABCJ7766K1ZU",
    city: "Jaipur, RJ",
    plan: "Starter",
    users: 4,
    invoicesThisMonth: 890,
    mrr: "₹2,999",
    status: "Suspended",
    joinedDate: "10 Jan 2025"
  }
];

export default function SuperAdminDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [activeTab, setActiveTab] = useState<"overview" | "tenants" | "subscriptions" | "gateways" | "audit" | "settings">("overview");
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
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newGstin, setNewGstin] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPlan, setNewPlan] = useState<"Enterprise" | "Growth" | "Starter">("Growth");

  // Filtered tenants
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName) return;

    const newTenantItem: Tenant = {
      id: `TNT-${Math.floor(100 + Math.random() * 900)}`,
      name: newCompanyName,
      gstin: newGstin || "27AABCZ9999P1ZZ",
      city: newCity || "Mumbai, MH",
      plan: newPlan,
      users: newPlan === "Enterprise" ? 25 : newPlan === "Growth" ? 10 : 3,
      invoicesThisMonth: 0,
      mrr: newPlan === "Enterprise" ? "₹14,999" : newPlan === "Growth" ? "₹7,499" : "₹2,999",
      status: "Active",
      joinedDate: "Just now"
    };

    setTenants([newTenantItem, ...tenants]);
    setNewCompanyName("");
    setNewGstin("");
    setNewCity("");
    setIsAddModalOpen(false);
  };

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === "Active" ? "Suspended" : "Active"
        };
      }
      return t;
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 600);
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
                badge={tenants.length} 
              />
              <NavItem tabKey="subscriptions" label="Plans & Billing" icon={CreditCard} />
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
              <Link
                href="/superadmin"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors border border-slate-200 hover:border-red-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            ) : (
              <div className="flex justify-center">
                <Link
                  href="/superadmin"
                  title="Sign Out"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </Link>
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
                    {activeTab === "subscriptions" && "Plans & Billing"}
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
                    <div className="font-extrabold text-slate-900">Root Administrator</div>
                    <div className="text-[11px] text-slate-500">root@yourbilling.internal</div>
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
                    <Link
                      href="/superadmin"
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-left font-bold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </Link>
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
                {activeTab === "gateways" && "NIC & GSTN Gateway Telemetry"}
                {activeTab === "audit" && "Master Security & Audit Logs"}
                {activeTab === "settings" && "Global System Configurations"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time multi-tenant health, GST e-invoicing telemetry, and business subscriptions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sync Status:</span>
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
                  {tenants.filter(t => t.status === "Active").length * 240 + 28}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.4% vs last month</span>
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
                    Showing {filteredTenants.length} of {tenants.length} organizations registered on Your Billing Software.
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
                      <th className="py-3 px-5">Company / Tenant</th>
                      <th className="py-3 px-5">GSTIN</th>
                      <th className="py-3 px-5">Plan</th>
                      <th className="py-3 px-5">Users</th>
                      <th className="py-3 px-5">Monthly Invoices</th>
                      <th className="py-3 px-5">MRR</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredTenants.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No companies found matching "{searchQuery}"
                        </td>
                      </tr>
                    ) : (
                      filteredTenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-slate-50/60 transition-colors">
                          
                          {/* Company Name & City */}
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-slate-900">{tenant.name}</div>
                            <div className="text-[11px] text-slate-400">{tenant.city} • ID: {tenant.id}</div>
                          </td>

                          {/* GSTIN */}
                          <td className="py-3.5 px-5 font-mono text-[11px] font-semibold text-slate-600">
                            {tenant.gstin}
                          </td>

                          {/* Plan */}
                          <td className="py-3.5 px-5">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ${
                              tenant.plan === "Enterprise"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : tenant.plan === "Growth"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>
                              {tenant.plan}
                            </span>
                          </td>

                          {/* Users */}
                          <td className="py-3.5 px-5 font-medium">
                            {tenant.users} seats
                          </td>

                          {/* Invoices */}
                          <td className="py-3.5 px-5 font-semibold text-slate-800">
                            {tenant.invoicesThisMonth.toLocaleString("en-IN")}
                          </td>

                          {/* MRR */}
                          <td className="py-3.5 px-5 font-bold text-slate-900">
                            {tenant.mrr}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              tenant.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : tenant.status === "Trial"
                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                tenant.status === "Active"
                                  ? "bg-emerald-500"
                                  : tenant.status === "Trial"
                                  ? "bg-sky-500"
                                  : "bg-rose-500"
                              }`}></span>
                              {tenant.status}
                            </span>
                          </td>

                          {/* Quick Action Button */}
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => toggleTenantStatus(tenant.id)}
                              className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                                tenant.status === "Active"
                                  ? "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                                  : "text-emerald-600 hover:bg-emerald-50"
                              }`}
                            >
                              {tenant.status === "Active" ? "Suspend" : "Activate"}
                            </button>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Showing {filteredTenants.length} organizations</span>
                <span className="font-semibold text-slate-700">Multi-Tenant Isolation: Active (PostgreSQL Row Security)</span>
              </div>

            </div>
          )}

          {/* SUBSCRIPTIONS TAB VIEW */}
          {activeTab === "subscriptions" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter Tier</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold">₹2,999/mo</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-slate-900">
                    {tenants.filter(t => t.plan === "Starter").length * 80 + 14}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Subscribed companies</div>
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">✓ Up to 5 users</div>
                    <div className="flex items-center gap-2">✓ 2,500 e-Invoices/mo</div>
                    <div className="flex items-center gap-2">✓ Standard Email Support</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-red-500 shadow-xs relative">
                <div className="absolute -top-3 right-4 px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-extrabold uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Growth Tier</span>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-xs font-bold">₹7,499/mo</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-slate-900">
                    {tenants.filter(t => t.plan === "Growth").length * 110 + 42}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Subscribed companies</div>
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">✓ Up to 25 users</div>
                    <div className="flex items-center gap-2">✓ 15,000 e-Invoices/mo</div>
                    <div className="flex items-center gap-2">✓ Automated GSP Reconciliation</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Tier</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold">₹14,999/mo</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-slate-900">
                    {tenants.filter(t => t.plan === "Enterprise").length * 60 + 19}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Subscribed companies</div>
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">✓ Unlimited users</div>
                    <div className="flex items-center gap-2">✓ Unlimited IRN & E-Way Bills</div>
                    <div className="flex items-center gap-2">✓ Dedicated Account Manager & 24x7 SLA</div>
                  </div>
                </div>
              </div>
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

            <form onSubmit={handleCreateTenant} className="space-y-4 pt-4 text-xs">
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
                  GSTIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 27AABCM5544N1ZX"
                  value={newGstin}
                  onChange={(e) => setNewGstin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 font-mono text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">
                    City & State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, MH"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 block">
                    Subscription Plan
                  </label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-white text-slate-900"
                  >
                    <option value="Enterprise">Enterprise (₹14,999/mo)</option>
                    <option value="Growth">Growth (₹7,499/mo)</option>
                    <option value="Starter">Starter (₹2,999/mo)</option>
                  </select>
                </div>
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
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  Create Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
