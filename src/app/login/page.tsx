"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErpCanvas from "@/components/ErpCanvas";
import { useToast } from "@/context/ToastContext";
import {
  ReceiptText,
  User,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Building2,
  Mail,
  Check,
} from "lucide-react";

interface FirstTimeUserData {
  companyId: string;
  email: string;
  companyName: string;
  contactPerson: string;
}

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  // Mode state: 'login' | 'first_time_password' | 'otp'
  const [authMode, setAuthMode] = useState<"login" | "first_time_password" | "otp">("login");

  // Standard Login States
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // First-Time Password Change States
  const [firstTimeData, setFirstTimeData] = useState<FirstTimeUserData | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // OTP Login States
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  // Auto-redirect to dashboard if user already has an active session
  React.useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.company) {
            router.replace("/dashboard");
          }
        }
      } catch {
        // ignore
      }
    }
    checkExistingSession();
  }, [router]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. STANDARD LOGIN HANDLER
  // ─────────────────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const err = data.error || "Login failed. Please check your credentials.";
        setErrorMessage(err);
        toast.error(err, { title: "Authentication Failed" });
        setIsLoading(false);
        return;
      }

      // Check if First-Time Login
      if (data.isFirstLogin) {
        setIsLoading(false);
        setFirstTimeData({
          companyId: data.companyId,
          email: data.email,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
        });
        setAuthMode("first_time_password");
        toast.info("First-time login detected. Please create your permanent password.", {
          title: "Setup Required",
        });
        return;
      }

      // Successful standard login -> Store local cache for instant refresh render
      if (typeof window !== "undefined") {
        if (data.companyName) localStorage.setItem("active_company_name", data.companyName);
        if (data.contactPerson) localStorage.setItem("active_user_name", data.contactPerson);
        if (data.companyId) localStorage.setItem("active_company_id", data.companyId);
        if (data.email) localStorage.setItem("active_user_email", data.email);
      }

      setIsLoading(false);
      setIsRedirecting(true);
      toast.success(`Welcome back, ${data.contactPerson || data.companyName || "User"}!`, {
        title: "Login Successful",
      });
      router.replace("/dashboard");
    } catch {
      const err = "Unable to connect to login server. Please try again.";
      setErrorMessage(err);
      toast.error(err, { title: "Network Error" });
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FIRST-TIME PERMANENT PASSWORD SET HANDLER
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSetFirstPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 6) {
      const err = "Password must be at least 6 characters long.";
      setPasswordError(err);
      toast.warning(err);
      return;
    }

    if (newPassword !== confirmPassword) {
      const err = "New password and Confirm password do not match.";
      setPasswordError(err);
      toast.warning(err);
      return;
    }

    setIsSavingPassword(true);

    try {
      const res = await fetch("/api/auth/set-first-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: firstTimeData?.companyId || userId,
          currentPassword: password,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const err = data.error || "Failed to set password. Please try again.";
        setPasswordError(err);
        toast.error(err, { title: "Password Setup Error" });
        setIsSavingPassword(false);
        return;
      }

      if (typeof window !== "undefined") {
        if (data.companyName) localStorage.setItem("active_company_name", data.companyName);
        if (data.contactPerson) localStorage.setItem("active_user_name", data.contactPerson);
        if (data.companyId) localStorage.setItem("active_company_id", data.companyId);
        if (data.email) localStorage.setItem("active_user_email", data.email);
      }

      setIsSavingPassword(false);
      setIsRedirecting(true);
      toast.success("Permanent password created! Redirecting to ERP dashboard...", {
        title: "Setup Complete",
      });
      router.replace("/dashboard");
    } catch {
      const err = "Connection error. Please try again.";
      setPasswordError(err);
      toast.error(err, { title: "Network Error" });
      setIsSavingPassword(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. OTP LOGIN HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      toast.info(`OTP sent to +91 ${mobileNumber}`);
    } else {
      toast.warning("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRedirecting(true);
      router.replace("/dashboard");
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "None", color: "bg-slate-200" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-amber-500", width: "w-1/3" };
    if (score <= 3) return { score: 2, label: "Good", color: "bg-blue-500", width: "w-2/3" };
    return { score: 3, label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans selection:bg-red-500 selection:text-white">

      {/* LEFT SECTION: Dynamic ERP Canvas */}
      <div className="lg:w-[48%] min-h-[440px] lg:min-h-screen relative overflow-hidden bg-red-700">
        <ErpCanvas />
      </div>

      {/* RIGHT SECTION: Clean White Form */}
      <div className="lg:w-[52%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 min-h-[600px] lg:min-h-screen">

        <div className="hidden lg:block"></div>

        <div className="w-full max-w-md mx-auto my-auto space-y-6">

          {/* Brand Logo */}
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

            {/* Heading depending on state */}
            {authMode === "first_time_password" ? (
              <div className="mt-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>First-Time Login Security</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Set Permanent Password
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Welcome to Your Billing Software! For your account security, please create your custom permanent password.
                </p>
              </div>
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-5">
                Login
              </h1>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* ACTIVE FORM AREA                                                  */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {authMode === "first_time_password" ? (
            /* ─────────────────────────────────────────────────────────────── */
            /* FIRST-TIME PASSWORD RESET FORM                                  */
            /* ─────────────────────────────────────────────────────────────── */
            <form onSubmit={handleSetFirstPassword} className="space-y-4 animate-in fade-in-50 slide-in-from-right-4 duration-300">
              
              {/* Account Info Pill */}
              {firstTimeData && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Company ID:
                    </span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {firstTimeData.companyId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Email ID:
                    </span>
                    <span className="font-semibold text-slate-900 truncate max-w-[220px]">
                      {firstTimeData.email}
                    </span>
                  </div>
                </div>
              )}

              {/* Password Error Banner */}
              {passwordError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}

              {/* New Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Create New Password<span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter at least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="pt-1 space-y-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500">
                      <span>Password strength: <strong className="text-slate-800">{strength.label}</strong></span>
                      <span className={newPassword.length >= 6 ? "text-emerald-600 font-medium" : "text-slate-400"}>
                        {newPassword.length >= 6 ? "✓ 6+ chars" : "Min 6 chars"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Confirm New Password<span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Re-enter your new password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className="text-[11px] pt-0.5">
                    {newPassword === confirmPassword ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Passwords match
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Passwords do not match</span>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button with Progress Bar */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSavingPassword || isRedirecting || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className="relative overflow-hidden w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {(isSavingPassword || isRedirecting) && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-red-800 overflow-hidden">
                      <div className="h-full bg-white animate-pulse w-full"></div>
                    </div>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSavingPassword || isRedirecting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        <span>{isRedirecting ? "Launching Dashboard..." : "Saving Password..."}</span>
                      </>
                    ) : (
                      <>
                        <span>Save Password & Launch Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Cancel and Back to Login
                </button>
              </div>

            </form>
          ) : authMode === "login" ? (
            /* ─────────────────────────────────────────────────────────────── */
            /* STANDARD USER ID & PASSWORD LOGIN FORM                          */
            /* ─────────────────────────────────────────────────────────────── */
            <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in-50 duration-200">

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* User ID Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Please enter your User ID or Email ID<span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="7-digit Company ID or Email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Please enter your password<span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Password"
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600 w-4 h-4"
                  />
                  <span>Remember me on this device</span>
                </label>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Please use your temporary password received on your email, or contact support.", {
                      title: "Password Assistance",
                    });
                  }}
                  className="font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Buttons: Login with Progress Bar & Create New Account */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading || isRedirecting}
                  className="relative overflow-hidden w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-95 disabled:cursor-wait flex items-center justify-center select-none"
                >
                  {(isLoading || isRedirecting) && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-red-800 overflow-hidden">
                      <div className="h-full bg-white animate-pulse w-full"></div>
                    </div>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading || isRedirecting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        <span>{isRedirecting ? "Launching..." : "Logging in..."}</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </span>
                </button>

                <Link
                  href="/signup"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all text-center flex items-center justify-center cursor-pointer"
                >
                  Create New Account
                </Link>
              </div>

              {/* Divider: OR */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Login using OTP Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setAuthMode("otp")}
                  className="w-full py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 font-bold text-sm shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <span>Login using OTP</span>
                </button>
              </div>

              {/* Back to Home Link */}
              <div className="pt-2 text-center">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>← Back to YourBillingSoftware.com</span>
                </Link>
              </div>

            </form>
          ) : (
            /* ─────────────────────────────────────────────────────────────── */
            /* OTP LOGIN FORM                                                  */
            /* ─────────────────────────────────────────────────────────────── */
            <form onSubmit={otpSent ? handleOtpLoginSubmit : handleSendOtp} className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Please enter registered mobile number<span className="text-red-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile number"
                    className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Enter 6-digit verification code sent to +91 {mobileNumber}
                  </label>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-11 h-11 text-center font-bold text-lg border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || isRedirecting}
                  className="relative overflow-hidden w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center select-none"
                >
                  {(isLoading || isRedirecting) && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-red-800 overflow-hidden">
                      <div className="h-full bg-white animate-pulse w-full"></div>
                    </div>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading || isRedirecting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        <span>{isRedirecting ? "Launching Dashboard..." : "Verifying..."}</span>
                      </>
                    ) : otpSent ? (
                      "Verify OTP & Login"
                    ) : (
                      "Send One-Time Password (OTP)"
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setOtpSent(false);
                  }}
                  className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Switch back to Password Login
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer Copyright and Superadmin Link */}
        <div className="pt-8 text-center text-xs text-slate-500 space-y-1.5">
          <p>
            Copyright © {new Date().getFullYear()} Your Billing Software - Best GST Billing & ERP Software. All rights reserved.
          </p>
          <p>
            <Link href="/superadmin" className="text-slate-400 hover:text-red-600 transition-colors font-medium">
              Superadmin Portal →
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}
