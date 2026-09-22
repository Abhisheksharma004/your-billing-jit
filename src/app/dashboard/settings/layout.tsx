"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar, { ActiveDashboardTab } from "@/components/DashboardNavbar";
import DraggableCalculator from "@/components/DraggableCalculator";
import SettingsSidebar from "./components/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [selectedFY, setSelectedFY] = useState("F.Y. 2026-2027");
  const [showCalculator, setShowCalculator] = useState(false);
  const [companyName, setCompanyName] = useState<string>("Abhishek Enterprises");
  const [userName, setUserName] = useState<string>("Abhishek Sharma");
  const [userEmail, setUserEmail] = useState<string>("sales@virosentrepreneurs.com");
  const [companyId, setCompanyId] = useState<string>("GST-88492");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const c = localStorage.getItem("active_company_name");
      const u = localStorage.getItem("active_user_name");
      const cid = localStorage.getItem("active_company_id");
      if (c) setCompanyName(c);
      if (u) setUserName(u);
      if (cid) setCompanyId(cid);
    }
  }, []);

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
        userEmail={userEmail}
        companyId={companyId}
        selectedFY={selectedFY}
        onChangeFY={(fy) => setSelectedFY(fy)}
        onOpenQuickModal={() => router.push("/dashboard")}
        onToggleCalculator={() => setShowCalculator(!showCalculator)}
        showCalculator={showCalculator}
      />

      {/* 2. Main Body Container with Content on Left & Compact Sidebar on Right */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT: MAIN PAGE CONTENT */}
          <div className="flex-1 min-w-0 w-full order-2 lg:order-1 space-y-6">
            {children}
          </div>

          {/* RIGHT: SETTINGS SIDEBAR */}
          <div className="order-1 lg:order-2 w-full lg:w-auto shrink-0">
            <SettingsSidebar />
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
