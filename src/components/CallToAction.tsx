"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, PhoneCall, Check } from "lucide-react";

export default function CallToAction() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmailOrPhone("");
      }, 5000);
    }
  };

  return (
    <section id="cta" className="py-20 lg:py-24 bg-gradient-to-br from-red-700 via-red-600 to-rose-700 text-white relative overflow-hidden shadow-2xl">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/30 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Start Your 14-Day Unrestricted Free Trial</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Supercharge Your Billing & ERP <br className="hidden sm:block" />
          in Under <span className="underline decoration-white/40 decoration-wavy decoration-2">60 Seconds</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-red-100 max-w-2xl mx-auto font-normal leading-relaxed">
          Join over 10,000+ retail stores, wholesalers, and manufacturers across India running error-free GST billing, real-time inventory, and automated payment recovery.
        </p>

        {/* Interactive Signup Form */}
        <div className="max-w-xl mx-auto pt-2">
          {submitted ? (
            <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-2xl flex items-center justify-center gap-3 animate-in zoom-in duration-300">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base text-slate-900">Trial Activated Successfully!</div>
                <div className="text-xs text-slate-500">Check your inbox or WhatsApp for instant login details.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter your Business Email or Mobile No."
                className="flex-1 px-5 py-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="px-7 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Value reassurance badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs sm:text-sm font-medium text-red-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>14-Day Free Full Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>No Credit Card or Upfront Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Free Assisted Data Migration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Dedicated Setup Manager</span>
          </div>
        </div>

        {/* Enterprise Hotline link */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm text-red-100">
          <span>Need a customized multi-branch deployment or ERP migration quote?</span>
          <a
            href="tel:18001234567"
            className="inline-flex items-center gap-1.5 font-bold text-white underline hover:text-red-200 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Our Enterprise Desk: 1800-120-BILL</span>
          </a>
        </div>

      </div>
    </section>
  );
}
