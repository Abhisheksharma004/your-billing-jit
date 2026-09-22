"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { History, RefreshCw, Clock } from "lucide-react";

export default function ActivityLogPage() {
  const toast = useToast();

  const activityData = [
    {
      timestamp: "Today, 11:32 AM",
      user: "Abhishek Sharma",
      activity: "Created Sale Invoice #INV-2026-0042",
      module: "Sales",
      moduleBadge: "bg-red-50 text-red-700",
      ip: "103.21.124.5",
    },
    {
      timestamp: "Today, 10:15 AM",
      user: "Abhishek Sharma",
      activity: "Updated Company Business Profile",
      module: "Settings",
      moduleBadge: "bg-slate-100 text-slate-700",
      ip: "103.21.124.5",
    },
    {
      timestamp: "Yesterday, 04:50 PM",
      user: "Rahul Verma",
      activity: "Recorded Payment Entry ₹ 24,500",
      module: "Payment",
      moduleBadge: "bg-emerald-50 text-emerald-700",
      ip: "115.99.18.21",
    },
    {
      timestamp: "Yesterday, 02:10 PM",
      user: "Priya Sharma",
      activity: "Generated E-Way Bill #38192837192",
      module: "E-Way Bill",
      moduleBadge: "bg-blue-50 text-blue-700",
      ip: "103.21.124.8",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <History className="w-4 h-4 text-[#dc2626]" />
              Activity & Audit Log
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time trail of actions performed by your team members across all modules.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Audit log refreshed with latest events")}
            className="px-3.5 py-1.5 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Log</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100 bg-slate-50/50">
                <th className="py-2.5 px-3 font-semibold text-slate-600">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">User</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Activity</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Module</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {activityData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.timestamp}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800 whitespace-nowrap">
                    {item.user}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {item.activity}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.moduleBadge}`}>
                      {item.module}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {item.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
