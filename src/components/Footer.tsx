import React from "react";
import {
  ReceiptText,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Heart
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <ReceiptText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">Your Billing</span>
                <span className="text-xl font-bold text-red-500 tracking-tight">Software</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's modern Cloud ERP and automated GST billing system. Empowering retail counters, multi-branch distributors, and manufacturing enterprises with speed, compliance, and real-time financial clarity.
            </p>

            {/* Compliance & Security Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> GSTN Suvidha Compliant
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> ISO 27001 Certified
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                256-Bit SSL Encryption
              </span>
            </div>

            {/* Contact details */}
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Toll-Free: 1800-120-BILL (Mon-Sat, 9am - 8pm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>support@yourbillingsoftware.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Cyber City, Phase II, Gurugram / Mumbai HQ, India</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: ERP Modules */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              ERP Modules
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">GST & E-Invoicing (IRN)</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">E-Way Bill Direct Generator</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Multi-Warehouse Inventory</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">3-Second POS Rapid Billing</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">WhatsApp & UPI Invoicing</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">GSTR-2B Auto-Reconciliation</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Financial Accounting & P&L</a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Industry Solutions */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Industry Verticals
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Retail & Supermarkets</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">FMCG & Wholesale Traders</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Pharma & Healthcare</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Electronics & Hardware</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Textiles & Apparel</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Automotive & Spare Parts</a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-400 transition-colors">Manufacturing Units</a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Free Business Tools */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Free Utilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#demo-widget" className="hover:text-red-400 transition-colors flex items-center gap-1">
                  <span>Interactive GST Calculator</span>
                  <ArrowUpRight className="w-3 h-3 text-red-400" />
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-red-400 transition-colors">Tally / Busy Migration Guide</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-red-400 transition-colors">Pricing Calculator</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition-colors">E-Way Bill Distance Rules</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition-colors">GSTR-1 vs 3B Guide</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition-colors">Help Center & Video Tutorials</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Your Billing Software Technologies Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">GST Compliance</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Disclosures</a>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Indian Enterprises 🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
