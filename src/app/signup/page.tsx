"use client";

import React, { useState } from "react";
import Link from "next/link";
import ErpCanvas from "@/components/ErpCanvas";
import {
  ReceiptText,
  User,
  Building2,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LogIn,
  FileCheck,
  Check
} from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [businessType, setBusinessType] = useState("Retail & Wholesale");
  const [gstin, setGstin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans selection:bg-red-500 selection:text-white">
      
      {/* LEFT SECTION: Dynamic ERP Canvas */}
      <div className="lg:w-[45%] min-h-[380px] lg:min-h-screen relative overflow-hidden bg-red-700">
        <ErpCanvas />
      </div>

      {/* RIGHT SECTION: Registration Form */}
      <div className="lg:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-14 min-h-[600px] lg:min-h-screen overflow-y-auto">
        
        <div className="w-full max-w-xl mx-auto my-auto space-y-6">
          
          {/* Brand Logo & Heading */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs group-hover:bg-red-700 transition-colors">
                <ReceiptText className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight leading-none">
                <span className="text-slate-900">Your</span>
                <span className="text-red-600 ml-1.5">Billing Software</span>
              </div>
            </Link>

            <div className="mt-5 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>14-Day Full Free Access</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Get your automated GST billing & inventory running in under 60 seconds. No credit card required.
              </p>
            </div>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in duration-300 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Registration Complete! 🎉</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Welcome aboard, <span className="font-bold text-slate-900">{fullName || "Partner"}</span>! Your 14-day enterprise trial for <span className="font-bold text-slate-900">{businessName || "Your Business"}</span> has been activated.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-100 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Account ID:</span>
                  <span className="font-mono font-bold text-slate-800">YBS-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trial Period:</span>
                  <span className="font-semibold text-emerald-600">14 Days (Full Access)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mobile Verified:</span>
                  <span className="font-semibold text-slate-800">+91 {mobileNumber || "XXXXXXXXXX"}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/login"
                  className="py-2.5 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="py-2.5 px-5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-2xs transition-all flex items-center justify-center"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Full Name <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Business / Company Name <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Enterprises"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Mobile Number & Business Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Mobile Number <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs font-bold gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile"
                      className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Business Email <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Industry & Optional GSTIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Business Category
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors bg-white cursor-pointer"
                  >
                    <option value="Retail & Wholesale">Retail & Wholesale Traders</option>
                    <option value="Distribution & FMCG">Distributor & FMCG Supply</option>
                    <option value="Manufacturing">Manufacturing & Processing</option>
                    <option value="Pharma & Healthcare">Pharma & Medical Store</option>
                    <option value="Electronics & Hardware">Electronics & Hardware</option>
                    <option value="Textiles & Garments">Textiles & Apparel</option>
                    <option value="Services & Consulting">Services & IT Agency</option>
                    <option value="Other">Other Business</option>
                  </select>
                </div>

                {/* GSTIN (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 block">
                      GSTIN Number
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 27AAAAA0000A1Z5"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Password Field with Strength Indicator */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Create Password <span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters (e.g. Secret@123)"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Bars */}
                {password.length > 0 && (
                  <div className="pt-1 space-y-1 animate-in fade-in duration-200">
                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`rounded-full h-full transition-all duration-300 ${
                            strength >= level ? strengthColors[strength] : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Password strength: <strong className="text-slate-700">{strengthLabels[strength]}</strong></span>
                      <span>Must include number & special char</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkboxes: Terms & WhatsApp Updates */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600 w-4 h-4 mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-red-600 hover:underline font-semibold">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-red-600 hover:underline font-semibold">Privacy Policy</a>.
                  </span>
                </label>

                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={(e) => setWhatsappUpdates(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600 w-4 h-4 mt-0.5"
                  />
                  <span className="flex items-center gap-1.5">
                    <span>Send onboarding guide & GST updates on WhatsApp</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Recommended</span>
                  </span>
                </label>
              </div>

              {/* Submit Button: Exact Login Page Button Design */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Create Account & Start Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Divider: OR */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Already Have an Account Button */}
              <div>
                <Link
                  href="/login"
                  className="w-full py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Already Have an Account? Sign In</span>
                </Link>
              </div>

              {/* Back to Home Link */}
              <div className="pt-1 text-center">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>← Back to YourBillingSoftware.com</span>
                </Link>
              </div>

            </form>
          )}

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div className="flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>14-Day Free Trial</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
