"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Bell, Clock, CalendarCheck } from "lucide-react";

export default function PaymentReminderPage() {
  const toast = useToast();
  const [autoReminderWhatsapp, setAutoReminderWhatsapp] = useState(true);
  const [autoReminderEmail, setAutoReminderEmail] = useState(true);
  const [remindBeforeDays, setRemindBeforeDays] = useState("3");
  const [remindOnDueDate, setRemindOnDueDate] = useState(true);
  const [remindOverdueDays, setRemindOverdueDays] = useState("7");
  const [reminderTime, setReminderTime] = useState("10:00 AM");

  const handleSave = () => {
    toast.success("Automated payment reminder rules saved successfully!", {
      title: "Reminders Updated",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#dc2626]" />
            Automated Payment Reminders & Due Date Alerts
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automate gentle payment follow-ups via WhatsApp and Email to accelerate outstanding cash collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Remind Before Due Date (Days)
            </label>
            <select
              value={remindBeforeDays}
              onChange={(e) => setRemindBeforeDays(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="1">1 Day Before Due Date</option>
              <option value="2">2 Days Before Due Date</option>
              <option value="3">3 Days Before Due Date (Recommended)</option>
              <option value="5">5 Days Before Due Date</option>
              <option value="7">7 Days Before Due Date</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Overdue Interval (Repeat every X days)
            </label>
            <select
              value={remindOverdueDays}
              onChange={(e) => setRemindOverdueDays(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="3">Every 3 Days after Due Date</option>
              <option value="5">Every 5 Days after Due Date</option>
              <option value="7">Every 7 Days / Weekly (Recommended)</option>
              <option value="15">Every 15 Days after Due Date</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Dispatch Time of Day
            </label>
            <select
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full px-3.5 py-2 rounded-md border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-2xs cursor-pointer"
            >
              <option value="09:00 AM">09:00 AM (Morning)</option>
              <option value="10:00 AM">10:00 AM (Recommended)</option>
              <option value="02:00 PM">02:00 PM (Afternoon)</option>
              <option value="06:00 PM">06:00 PM (Evening)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-800">Active Delivery Channels</div>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={autoReminderWhatsapp}
                onChange={(e) => setAutoReminderWhatsapp(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Send Automated WhatsApp Reminder with 1-click UPI payment link</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={autoReminderEmail}
                onChange={(e) => setAutoReminderEmail(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Send Automated Email Reminder with attached PDF invoice copy</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={remindOnDueDate}
                onChange={(e) => setRemindOnDueDate(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Send exact alert on the Due Date itself</span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save Reminder Rules
          </button>
        </div>
      </div>
    </div>
  );
}
