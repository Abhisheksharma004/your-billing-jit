"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import ErpCanvas from "@/components/ErpCanvas";
import {
    ReceiptText,
    Lock,
    Eye,
    EyeOff,
    Smartphone,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

export default function SuperAdminPage() {
    const router = useRouter();
    const toast = useToast();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isOtpMode, setIsOtpMode] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if user just logged out
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            if (params.get("logout") === "success") {
                toast.info("Superadmin master session has been logged out successfully.", {
                    title: "Info",
                    details: "Your secure JWT session cookie has been removed. Please log in again.",
                });
                window.history.replaceState({}, "", "/superadmin");
            }
        }
    }, [toast]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const waitToastId = toast.wait("Verifying credentials with database...", {
            title: "Wait",
            duration: 1500,
            details: `Connecting to MySQL server and validating user: "${userId || "root-admin"}"`,
        });

        try {
            const res = await fetch("/api/superadmin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, password }),
            });

            const data = await res.json();
            toast.dismiss(waitToastId);

            if (!res.ok || !data.success) {
                const msg = data.message || "Invalid credentials. Please try again.";
                toast.error(msg, {
                    title: "Error",
                    details: `Status: 401 Unauthorized\nReason: Invalid Superadmin ID or Master Password.\nAttempted User: ${userId || "empty"}\nTimestamp: ${new Date().toLocaleTimeString()}`,
                });
                setIsLoading(false);
                return;
            }

            toast.success("Superadmin authenticated successfully! Redirecting...", {
                title: "Success",
                details: `Admin Name: ${data.admin?.name || "Root Admin"}\nRole: ${data.admin?.role || "SUPER_ADMIN"}\nSession Token: Generated (24h validity)`,
            });
            setIsLoading(false);
            setTimeout(() => {
                router.push("/superadmin-dashboard");
            }, 800);
        } catch (err: any) {
            toast.dismiss(waitToastId);
            const errText = "Failed to connect to authentication server. Please check database.";
            toast.error(errText, {
                title: "Error",
                details: err.message || "Network request failed to reach /api/superadmin/login",
            });
            setIsLoading(false);
        }
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobileNumber.length >= 10) {
            setOtpSent(true);
            toast.info(`One-Time 2FA Passcode dispatched to +91 ${mobileNumber}`, {
                title: "Info",
                details: "Use master OTP: 123456 to verify root access.",
            });
        } else {
            toast.warning("Please enter a valid 10-digit mobile number.", {
                title: "Warning",
            });
        }
    };

    const handleOtpChange = (index: number, val: string) => {
        if (val.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = val;
            setOtp(newOtp);
            if (val && index < 5) {
                const nextInput = document.getElementById(`super-otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans selection:bg-red-500 selection:text-white">

            {/* LEFT SECTION: Dynamic ERP Canvas (Changes visual theme on every reload) */}
            <div className="lg:w-[48%] min-h-[440px] lg:min-h-screen relative overflow-hidden bg-red-700">
                <ErpCanvas />
            </div>

            {/* RIGHT SECTION: Superadmin Clean White Form */}
            <div className="lg:w-[52%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 min-h-[600px] lg:min-h-screen">

                <div className="hidden lg:block"></div>

                <div className="w-full max-w-md mx-auto my-auto space-y-6">

                    {/* Brand Logo & Superadmin Tag */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
                                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs group-hover:bg-red-700 transition-colors">
                                    <ReceiptText className="w-4 h-4 stroke-[2.4]" />
                                </div>
                                <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight leading-none">
                                    <span className="text-slate-900">Your</span>
                                    <span className="text-red-600 ml-1.5">Billing Software</span>
                                </div>
                            </Link>


                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Superadmin Login
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Enter authorized root credentials to access the master ERP multi-tenant control panel.
                        </p>
                    </div>

                    {/* Standard Superadmin ID & Master Password Form */}
                    {!isOtpMode ? (
                        <form onSubmit={handleLogin} className="space-y-4">

                            {/* User ID Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Superadmin ID or Master Email<span className="text-red-600 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <ShieldCheck className="w-4 h-4 text-red-500" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="e.g. root@yourbillingsoftware.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Master Access Password<span className="text-red-600 font-bold">*</span>
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
                                        placeholder="Master Password"
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
                                    <span>Remember session securely</span>
                                </label>

                                <a
                                    href="#"
                                    className="font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                                >
                                    Reset master key?
                                </a>
                            </div>

                            {/* Action Button: Full Width */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer disabled:cursor-not-allowed relative overflow-hidden flex items-center justify-center gap-1.5"
                                >
                                    {/* Button label */}
                                    {isLoading ? (
                                        <span className="opacity-80 text-sm font-bold">Verifying...</span>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}

                                    {/* Indeterminate progress bar at bottom of button */}
                                    {isLoading && (
                                        <span className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-lg">
                                            <span
                                                className="absolute h-full bg-white/50 rounded-full"
                                                style={{
                                                    width: "45%",
                                                    animation: "btnProgress 1.2s ease-in-out infinite",
                                                }}
                                            />
                                        </span>
                                    )}

                                    <style>{`
                                        @keyframes btnProgress {
                                            0%   { left: -50%; }
                                            100% { left: 110%; }
                                        }
                                    `}</style>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="pt-3 text-center text-xs">
                                <Link
                                    href="/"
                                    className="font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors inline-block"
                                >
                                    ← Back to Homepage
                                </Link>
                            </div>

                        </form>
                    ) : (
                        /* OTP Login Form */
                        <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Enter registered Superadmin 2FA Phone<span className="text-red-600 font-bold">*</span>
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
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        placeholder="10-digit registered mobile"
                                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {otpSent && (
                                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                                    <label className="text-xs font-semibold text-slate-700 block">
                                        Enter 6-digit Superadmin 2FA code
                                    </label>
                                    <div className="flex gap-2 justify-between">
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`super-otp-${idx}`}
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
                                    disabled={isLoading}
                                    className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                    ) : otpSent ? (
                                        "Verify Root 2FA & Access"
                                    ) : (
                                        "Send Superadmin 2FA OTP"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOtpMode(false);
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

                {/* Footer Copyright */}
                <div className="pt-8 text-center text-xs text-slate-500">
                    <p>
                        Copyright © {new Date().getFullYear()} Your Billing Software - Superadmin Master Console. All rights reserved.
                    </p>
                </div>

            </div>

        </div>
    );
}
