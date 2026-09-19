"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does 1-click E-Invoicing and E-Way bill generation work?",
      a: "Your Billing Software connects directly to the government's official NIC / GSTN e-invoicing servers via authenticated API. Once you finalize a B2B sale invoice, click 'Generate IRN' — within 2 to 3 seconds, the Government Invoice Reference Number (IRN) and digitally signed QR code are generated and printed right onto your invoice without visiting any external portal."
    },
    {
      q: "Can I migrate my existing customer records, items, and balances from Tally or Excel?",
      a: "Yes, 100%! We provide an automated 1-click import wizard for Excel/CSV sheets and direct XML migration for Tally Prime, Tally ERP 9, Busy, and Marg. Plus, our dedicated onboarding support team will help you migrate all items, opening stock, HSN codes, and vendor ledgers for free."
    },
    {
      q: "What happens if our shop loses internet connection during busy checkout hours?",
      a: "You can keep billing without interruption. Your Billing Software includes an intelligent Offline POS mode that caches products locally in your browser/device. Cashiers can continue scanning barcodes, adding items, and printing thermal receipts. The moment the internet reconnects, all invoices and inventory changes sync automatically to the cloud."
    },
    {
      q: "Can I use thermal barcode printers, regular A4 printers, and handheld barcode scanners?",
      a: "Yes. Our platform natively supports all standard 2-inch and 3-inch thermal POS receipt printers (ESC/POS compatible), regular LaserJet/InkJet A4 & A5 printers, as well as USB and redtooth barcode scanners without requiring special drivers."
    },
    {
      q: "Can I access my business data remotely from my mobile phone or iPad?",
      a: "Yes! Your Billing Software is 100% cloud-based and responsive. Business owners can review real-time daily counter collections, check inventory across branches, approve purchase orders, and monitor profit & loss metrics from any smartphone, tablet, or laptop from anywhere in the world."
    },
    {
      q: "Can my Chartered Accountant (CA) get separate access to download GST reports?",
      a: "Absolutely. You can invite your CA or tax consultant with a dedicated 'Auditor' role. They will have read-only access to download GSTR-1, GSTR-2B, GSTR-3B, Trial Balance, and Profit & Loss reports directly, eliminating the need for tedious manual email exchanges at tax deadline times."
    },
    {
      q: "How secure is my financial data and who owns it?",
      a: "Your data belongs 100% to you. We store all database records in enterprise-tier ISO 27001 certified cloud data centers with AES 256-bit encryption in transit and at rest. Automated backups are taken three times daily, and you can export your entire database to Excel or XML at any time with a single click."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about GST compliance, migration, offline billing, and enterprise data security.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                  ? "border-red-300 bg-red-50/30 shadow-md shadow-red-600/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-red-700" : "text-slate-900"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-red-100/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-base">Still have questions or need a customized quote?</h4>
            <p className="text-xs sm:text-sm text-slate-500">Our GST ERP specialists are available 6 days a week from 9 AM to 8 PM IST.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:18001234567"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-red-600 font-bold text-xs shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Call Toll-Free</span>
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold text-xs shadow-xs shadow-red-600/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
