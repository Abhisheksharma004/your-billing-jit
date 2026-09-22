"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function LoginSecuritySettingsPage() {
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [deviceSessions, setDeviceSessions] = useState([
    { id: 1, name: "", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 12:09 PM", location: "Noida, Uttar Pradesh", isCurrent: true },
    { id: 2, name: "", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:50 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
    { id: 3, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "22-Sep-2026 11:04 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
    { id: 4, name: "Rachana Singh", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "21-Sep-2026 5:22 PM", location: "Noida, Uttar Pradesh", isCurrent: false },
    { id: 5, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "02-Sep-2026 1:48 PM", location: "Noida, Uttar Pradesh", isCurrent: false },
    { id: 6, name: "Rachana Singh", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "27-Aug-2026 10:43 AM", location: "Noida, Uttar Pradesh", isCurrent: false },
  ]);

  const handleLogoutAll = () => {
    setDeviceSessions((prev) => prev.filter((s) => s.isCurrent));
    toast.success("Successfully logged out from all other active devices.", { title: "Sessions Terminated" });
  };

  const handleLogoutSingle = (id: number, device: string, browser: string) => {
    setDeviceSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Logged out from ${device} (${browser}) session.`);
  };

  const handleUpdatePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("New passwords do not match or is empty.");
      return;
    }
    toast.success("Account password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* 1. Logged in Devices Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            Logged in Devices
          </h3>
          <button
            type="button"
            onClick={handleLogoutAll}
            className="px-4 py-1.5 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Logout All Device
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-600 font-semibold border-b border-slate-100">
                <th className="py-3 px-5 w-12 font-semibold">#</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Device</th>
                <th className="py-3 px-3 font-semibold">Browser</th>
                <th className="py-3 px-3 font-semibold">Platform</th>
                <th className="py-3 px-3 font-semibold">Last Log In</th>
                <th className="py-3 px-3 font-semibold">Location</th>
                <th className="py-3 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {deviceSessions.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 text-slate-500 font-medium">{row.id}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">{row.name || ""}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.device}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.browser}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.platform}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{row.lastLogin}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{row.location}</td>
                  <td className="py-3.5 px-5 text-right">
                    {!row.isCurrent && (
                      <button
                        type="button"
                        onClick={() => handleLogoutSingle(row.id, row.platform, row.browser)}
                        className="px-3 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Login Log Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-white">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            Login Log
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-600 font-semibold border-b border-slate-100">
                <th className="py-3 px-5 w-12 font-semibold">#</th>
                <th className="py-3 px-3 font-semibold">Staff ID</th>
                <th className="py-3 px-3 font-semibold">Device</th>
                <th className="py-3 px-3 font-semibold">Browser</th>
                <th className="py-3 px-3 font-semibold">Platform</th>
                <th className="py-3 px-3 font-semibold">Last Log In</th>
                <th className="py-3 px-5 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {[
                { id: 1, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 12:09 PM", location: "Noida, Uttar Pradesh" },
                { id: 2, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:50 AM", location: "Noida, Uttar Pradesh" },
                { id: 3, staffId: "-", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "22-Sep-2026 11:14 AM", location: "Noida, Uttar Pradesh" },
                { id: 4, staffId: "8743839141", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "22-Sep-2026 11:04 AM", location: "Noida, Uttar Pradesh" },
                { id: 5, staffId: "7290969141", device: "Desktop", browser: "Chrome", platform: "macOS", lastLogin: "22-Sep-2026 10:23 AM", location: "Noida, Uttar Pradesh" },
                { id: 6, staffId: "8743839141", device: "Desktop", browser: "Chrome", platform: "Win10", lastLogin: "21-Sep-2026 5:22 PM", location: "Noida, Uttar Pradesh" },
                { id: 7, staffId: "8743839141", device: "Desktop", browser: "Edge", platform: "Win10", lastLogin: "21-Sep-2026 4:21 PM", location: "Noida, Uttar Pradesh" },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 text-slate-500 font-medium">{row.id}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">{row.staffId}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.device}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.browser}</td>
                  <td className="py-3.5 px-3 text-slate-600">{row.platform}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{row.lastLogin}</td>
                  <td className="py-3.5 px-5 text-slate-600 font-medium">{row.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Password Update Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800">Change Account Password</h3>
          <p className="text-xs text-slate-500 mt-0.5">Keep your account secure by creating a strong combination password.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Current Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">New Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-9 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Confirm New Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleUpdatePassword}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
}
