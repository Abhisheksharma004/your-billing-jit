import React from "react";
import {
  FileText,
  Boxes,
  Zap,
  BarChart,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Check,
  QrCode,
  Layers,
  Smartphone,
  Building
} from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      badge: "E-INVOICING READY",
      title: "Automated GST & E-Invoicing",
      description: "Generate compliant B2B E-Invoices with signed QR code and IRN in 1-click. Auto-reconcile purchase bills against GSTR-2B without manual data entry.",
      icon: FileText,
      points: [
        "Direct GSTN Portal API Integration",
        "Instant E-Way Bill generation",
        "GSTR-1, 2B, 3B & 9 ready auto-reports",
        "Zero error tax calculation (CGST, SGST, IGST)"
      ],
      highlight: "Popular"
    },
    {
      badge: "INVENTORY ENGINE",
      title: "Smart Multi-Warehouse Stock",
      description: "Gain 100% visibility over physical inventory across all branches and go-downs with batch tracking, expiry date alerts, and automated reorders.",
      icon: Boxes,
      points: [
        "Batch, serial number & expiry date tracking",
        "Barcode & QR code thermal label generator",
        "Cross-warehouse stock transfer slips",
        "Low-stock automated alerts via SMS/WhatsApp"
      ],
      highlight: null
    },
    {
      badge: "ULTRA FAST POS",
      title: "3-Second Point-of-Sale Billing",
      description: "Designed for high-traffic retail checkout counters. Rapid barcode scanning, custom shortcuts, and offline mode keep counters moving without delays.",
      icon: Zap,
      points: [
        "Works seamlessly offline & syncs when online",
        "Thermal printer & standard A4/A5 support",
        "Split payments: Cash, Card, UPI, Credit",
        "Customer loyalty points & custom discounts"
      ],
      highlight: "Counter Favorite"
    },
    {
      badge: "ENTERPRISE FINANCE",
      title: "Full-Stack Financial Accounting",
      description: "Eliminate manual bookkeeping. Generate real-time Balance Sheets, Profit & Loss accounts, Cash Flow forecasts, and vendor ledgers instantly.",
      icon: BarChart,
      points: [
        "Live Bank Account reconciliation",
        "Automated Debit & Credit note journals",
        "Customizable Chart of Accounts",
        "1-Click Export to Tally & Busy formats"
      ],
      highlight: null
    },
    {
      badge: "PAYMENT SPEED",
      title: "WhatsApp Invoices & UPI Links",
      description: "Collect payments 40% faster. Send professional PDF invoices directly to customer WhatsApp numbers with dynamic UPI QR codes.",
      icon: MessageCircle,
      points: [
        "1-Click WhatsApp PDF sharing with brand logo",
        "Dynamic UPI QR code on invoice printed",
        "Automated overdue payment reminder schedules",
        "Instant payment receipt confirmation"
      ],
      highlight: "Fast Cashflow"
    },
    {
      badge: "DATA SECURITY",
      title: "Enterprise Roles & Audit Trail",
      description: "Protect sensitive financial data with granular employee permissions. Track every discount, edit, or cancellation with irreversible audit logs.",
      icon: ShieldCheck,
      points: [
        "Granular roles: Cashier, Manager, Accountant, Owner",
        "Irreversible audit logs with user timestamps",
        "256-bit SSL encryption & daily auto-backups",
        "Multi-branch access with single master login"
      ],
      highlight: null
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <span>Unified ERP Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Run Your <br />
            <span className="text-red-600">Billing & Business Operations</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Say goodbye to clumsy desktop software, corrupted data files, and manual GST filing. "Your Billing Software" brings enterprise-grade agility to every shop floor.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 hover:border-red-500 shadow-sm hover:shadow-xl hover:shadow-red-600/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    {feat.highlight && (
                      <span className="text-[11px] font-extrabold text-red-700 bg-red-100 px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {feat.highlight}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest block mb-1">
                    {feat.badge}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {feat.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {feat.points.map((pt, pidx) => (
                    <div key={pidx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Feature Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-700/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold">Have multiple branches or custom ERP integration requirements?</h4>
            <p className="text-red-100 text-sm">We provide dedicated onboarding, custom API hooks, and data migration assistance.</p>
          </div>
          <a
            href="#cta"
            className="px-6 py-3 rounded-xl bg-white text-red-600 hover:bg-red-50 font-bold text-sm shadow-md transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <span>Talk to ERP Solutions Architect</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
