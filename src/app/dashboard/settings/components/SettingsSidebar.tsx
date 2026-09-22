"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Coins,
  Shield,
  Truck,
  MessageCircle,
  Building2,
  UserPlus,
  HardDrive,
  FileCheck,
  Download,
  History,
  Mail,
  CreditCard,
  Settings as SettingsIcon,
  Package,
  Printer,
  FileText,
  Landmark,
  FileSpreadsheet,
  Heading,
  Globe,
  MailCheck,
  Bell,
} from "lucide-react";

export const accountSettingsNavItems = [
  { id: "membership", label: "Membership", href: "/dashboard/settings/membership", icon: Users },
  { id: "credits", label: "Credits", href: "/dashboard/settings/credits", icon: Coins },
  { id: "login-security", label: "Login & Security", href: "/dashboard/settings/login-security", icon: Shield },
  { id: "eway-bill-einvoice", label: "E-way Bill & E-Invoice", href: "/dashboard/settings/eway-bill-einvoice", icon: Truck },
  { id: "whatsapp-options", label: "WhatsApp Options", href: "/dashboard/settings/whatsapp-options", icon: MessageCircle },
  { id: "business-profile", label: "Business Profile", href: "/dashboard/settings/business-profile", icon: Building2 },
  { id: "staff-account", label: "Staff Account", href: "/dashboard/settings/staff-account", icon: UserPlus },
  { id: "go-drive", label: "Go Drive", href: "/dashboard/settings/go-drive", icon: HardDrive },
  { id: "digital-sign", label: "Digital Sign", href: "/dashboard/settings/digital-sign", icon: FileCheck },
  { id: "export-data", label: "Export Data", href: "/dashboard/settings/export-data", icon: Download },
  { id: "activity-log", label: "Activity Log", href: "/dashboard/settings/activity-log", icon: History },
  { id: "email-options", label: "Email Options", href: "/dashboard/settings/email-options", icon: Mail },
  { id: "payment-gateway", label: "Payment Gateway", href: "/dashboard/settings/payment-gateway", icon: CreditCard },
];

export const applicationSettingsNavItems = [
  { id: "general-options", label: "General Options", href: "/dashboard/settings/general-options", icon: SettingsIcon },
  { id: "product-stock", label: "Product & Stock Options", href: "/dashboard/settings/product-stock", icon: Package },
  { id: "print-template", label: "Print Template", href: "/dashboard/settings/print-template", icon: Printer },
  { id: "print-options", label: "Print Options", href: "/dashboard/settings/print-options", icon: FileText },
  { id: "bank-details", label: "Bank Details", href: "/dashboard/settings/bank-details", icon: Landmark },
  { id: "document-options", label: "Document Options", href: "/dashboard/settings/document-options", icon: FileSpreadsheet },
  { id: "terms-conditions", label: "Terms & Conditions", href: "/dashboard/settings/terms-conditions", icon: FileText },
  { id: "shipping-envelope", label: "Shipping Envelope", href: "/dashboard/settings/shipping-envelope", icon: Truck },
  { id: "translation-options", label: "Translation Options", href: "/dashboard/settings/translation-options", icon: Globe },
  { id: "email-whatsapp-templates", label: "Email/WhatsApp Templates", href: "/dashboard/settings/email-whatsapp-templates", icon: MailCheck },
  { id: "payment-reminder", label: "Payment Reminder", href: "/dashboard/settings/payment-reminder", icon: Bell },
  { id: "custom-header", label: "Custom Header", href: "/dashboard/settings/custom-header", icon: Heading },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-[240px] xl:w-[255px] shrink-0 space-y-3.5">
      {/* Card 1: Account Settings */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-3.5 py-2.5 text-xs font-semibold text-slate-500 border-b border-slate-100 bg-white">
          Account Settings
        </div>
        <div className="divide-y divide-slate-100">
          {accountSettingsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.id === "membership" && (pathname === "/dashboard/settings" || pathname === "/dashboard/settings/"));
            return (
              <Link
                key={item.id}
                href={item.href}
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
              </Link>
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
          {applicationSettingsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
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
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
