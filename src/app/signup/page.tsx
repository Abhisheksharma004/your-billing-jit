"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ErpCanvas from "@/components/ErpCanvas";
import {
  ReceiptText,
  User,
  Building2,
  Mail,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  LogIn,
  Check,
  RefreshCw,
} from "lucide-react";

type Step = "form" | "otp" | "success";

interface RegistrationResult {
  companyId: string;
  email: string;
  companyName: string;
  contactPerson: string;
  trialEnd: string;
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>("form");

  // Form fields
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Loading & result
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [formError, setFormError] = useState("");
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-focus first OTP input when step changes to OTP
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // --- Step 1: Send OTP ---
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError("");

    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !contactNumber.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (contactNumber.length !== 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSendingOtp(true);

    try {
      const res = await fetch("/api/signup/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || "Failed to send OTP. Please try again.");
        setIsSendingOtp(false);
        return;
      }

      setStep("otp");
      setCooldown(60);
      setOtp(["", "", "", "", "", "", ""]);
      setOtpError("");
    } catch {
      setFormError("Network error. Please check your connection.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // --- Resend OTP ---
  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setOtpError("");
    setIsSendingOtp(true);

    try {
      const res = await fetch("/api/signup/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpError(data.error || "Failed to resend OTP.");
        setIsSendingOtp(false);
        return;
      }

      setCooldown(60);
      setOtp(["", "", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // --- OTP input handling ---
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 6) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 7);
    if (pasted.length === 7) {
      setOtp(pasted.split(""));
      otpRefs.current[6]?.focus();
    }
  };

  // --- Step 2: Verify OTP & Register ---
  const handleVerifyAndRegister = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 7) {
      setOtpError("Please enter the complete 7-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setOtpError("");

    try {
      // Step 1: Verify OTP
      const verifyRes = await fetch("/api/signup/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otpString }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setOtpError(verifyData.error || "Invalid OTP. Please try again.");
        setIsVerifying(false);
        return;
      }

      // Step 2: Register the company
      const registerRes = await fetch("/api/signup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          contactPerson: contactPerson.trim(),
          email: email.trim(),
          contactNumber: contactNumber.trim(),
          whatsappUpdates,
        }),
      });
      const registerData = await registerRes.json();

      if (!registerRes.ok || !registerData.success) {
        setOtpError(registerData.error || "Registration failed. Please try again.");
        setIsVerifying(false);
        return;
      }

      setRegistrationResult(registerData);
      setStep("success");
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }, [otp, email, companyName, contactPerson, contactNumber, whatsappUpdates]);

  // Auto-submit when all 7 digits are filled
  useEffect(() => {
    if (otp.every((d) => d !== "") && otp.join("").length === 7) {
      handleVerifyAndRegister();
    }
  }, [otp, handleVerifyAndRegister]);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans selection:bg-red-500 selection:text-white">

      {/* LEFT SECTION: Dynamic ERP Canvas */}
      <div className="lg:w-[45%] min-h-[380px] lg:min-h-screen relative overflow-hidden bg-red-700">
        <ErpCanvas />
      </div>

      {/* RIGHT SECTION */}
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {step === "form" && "Create Your Account"}
                {step === "otp" && "Verify Your Email"}
                {step === "success" && "Registration Complete! 🎉"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {step === "form" && "Get your automated GST billing & inventory running in under 60 seconds. No credit card required."}
                {step === "otp" && (
                  <>We&apos;ve sent a 7-digit OTP to <span className="font-bold text-slate-700">{email}</span>. Enter it below to verify.</>
                )}
                {step === "success" && "Your account has been created. Save your login credentials below."}
              </p>
            </div>
          </div>

          {/* ======================== STEP 1: FORM ======================== */}
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-4">

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Company Name <span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Enterprises Pvt Ltd"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Contact Person Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Contact Person Name <span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Business Email & Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Contact Number <span className="text-red-600 font-bold">*</span>
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
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile"
                      className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
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

              {/* Error */}
              {formError && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {formError}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSendingOtp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Send OTP & Verify Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Login link */}
              <div>
                <Link
                  href="/login"
                  className="w-full py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Already Have an Account? Sign In</span>
                </Link>
              </div>

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

          {/* ======================== STEP 2: OTP ======================== */}
          {step === "otp" && (
            <div className="space-y-6">
              {/* OTP Inputs */}
              <div className="space-y-4">
                <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 font-mono ${digit
                        ? "border-red-400 bg-red-50/50 text-red-700 focus:ring-red-500"
                        : "border-slate-300 text-slate-900 focus:ring-red-500 focus:border-red-500"
                        }`}
                    />
                  ))}
                </div>

                {/* OTP Error */}
                {otpError && (
                  <div className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center">
                    {otpError}
                  </div>
                )}

                {/* Resend & Timer */}
                <div className="text-center text-xs text-slate-500">
                  {cooldown > 0 ? (
                    <span>Resend OTP in <strong className="text-slate-700">{cooldown}s</strong></span>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer disabled:opacity-50"
                    >
                      {isSendingOtp ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyAndRegister}
                disabled={isVerifying || otp.join("").length !== 7}
                className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying & Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Create Account</span>
                  </>
                )}
              </button>

              {/* Back to form */}
              <button
                onClick={() => { setStep("form"); setOtpError(""); }}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                ← Change email or go back
              </button>
            </div>
          )}

          {/* ======================== STEP 3: SUCCESS ======================== */}
          {step === "success" && registrationResult && (
            <div className="space-y-5">
              {/* Single Merged Success Card */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900">
                    Welcome aboard, {registrationResult.contactPerson}!
                  </h3>
                  <p className="text-sm text-slate-500">
                    Your 14-day free trial for <span className="font-semibold text-slate-800">{registrationResult.companyName}</span> is now active.
                  </p>
                </div>

                <div className="py-4 px-5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed">
                  Your <strong className="text-slate-900">Company ID</strong> and <strong className="text-slate-900">Login Password</strong> have been sent to Email:
                  <div className="mt-2 font-semibold text-red-600 text-sm break-all">
                    {registrationResult.email}
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  Please check your inbox (and spam/junk folder) to access your account.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="flex-1 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="flex-1 py-3 px-5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-semibold text-sm transition-all flex items-center justify-center"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
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
