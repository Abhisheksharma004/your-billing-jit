"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export interface StaffItem {
  id: string;
  name: string;
  email: string;
  role: string;
  roleBadge: string;
  status: string;
  isPrimary?: boolean;
}

interface StaffAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: string | null;
  form: {
    name: string;
    phone: string;
    email: string;
    userId: string;
    password: string;
    confirmPassword: string;
    isEnabled: boolean;
    hasSchedule: boolean;
    role: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      email: string;
      userId: string;
      password: string;
      confirmPassword: string;
      isEnabled: boolean;
      hasSchedule: boolean;
      role: string;
    }>
  >;
  permissions: Record<string, { view: boolean; add: boolean; edit: boolean; remove: boolean; onlyView?: boolean }>;
  setPermissions: React.Dispatch<
    React.SetStateAction<
      Record<string, { view: boolean; add: boolean; edit: boolean; remove: boolean; onlyView?: boolean }>
    >
  >;
  schedule: Record<string, { startTime: string; endTime: string }>;
  setSchedule: React.Dispatch<
    React.SetStateAction<Record<string, { startTime: string; endTime: string }>>
  >;
  onSave: (e: React.FormEvent) => void;
  onToggleSelectAll: () => void;
}

export default function StaffAccountDrawer({
  isOpen,
  onClose,
  editingId,
  form,
  setForm,
  permissions,
  setPermissions,
  schedule,
  setSchedule,
  onSave,
  onToggleSelectAll,
}: StaffAccountDrawerProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const scheduleDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const scheduleTimeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM"
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[99998] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[99999] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] flex flex-col will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-90 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {editingId ? "Edit Staff Account" : "Create Staff Account"}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Configure staff user credentials, security status, and module permissions.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={onSave} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* 1. Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter staff full name"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 2. Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter phone number"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* 3. Email */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter email address"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
              />
            </div>

            {/* Credentials Divider Notice */}
            <div className="pt-2 pb-1 border-t border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 font-medium">
                The User ID and Password created below will be used by the staff member to log in.
              </span>
            </div>

            {/* 4. User ID */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                User ID <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                placeholder="Minimum 4 characters (letters and numbers)"
                className="w-full px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* 5. Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Password <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters, including uppercase, lowercase, number & special character"
                  className="w-full pr-10 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 6. Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
              <label className="font-semibold text-slate-700">
                Confirm Password <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Enter the same password again"
                  className="w-full pr-10 px-3.5 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-3 space-y-3">
              {/* 7. Enable Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                <label className="font-semibold text-slate-700">Enable</label>
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.isEnabled}
                    onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                  />
                  <span className="text-slate-700 font-medium">Only enabled staff accounts can log in</span>
                </label>
              </div>

              {/* 8. Staff Access Schedule Toggle & Weekly Schedule Table */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-1.5 sm:gap-4">
                  <label className="font-semibold text-slate-700">Staff access schedule</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, hasSchedule: !form.hasSchedule })}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        form.hasSchedule ? "bg-[#dc2626]" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          form.hasSchedule ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Access Schedule Table */}
                {form.hasSchedule && (
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs animate-in fade-in-50 duration-150">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-semibold">
                        <tr>
                          <th className="py-2.5 px-4 font-semibold text-slate-700 w-1/3">Day</th>
                          <th className="py-2.5 px-3 font-semibold text-slate-700 w-1/3">Start Time</th>
                          <th className="py-2.5 px-3 font-semibold text-slate-700 w-1/3">End Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {scheduleDays.map((day) => (
                          <tr key={day} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-2.5 px-4 font-medium text-slate-800">{day}</td>
                            <td className="py-2 px-3">
                              <select
                                value={schedule[day]?.startTime || ""}
                                onChange={(e) =>
                                  setSchedule({
                                    ...schedule,
                                    [day]: { ...schedule[day], startTime: e.target.value },
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                              >
                                <option value="">Select Start Time</option>
                                {scheduleTimeSlots.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={schedule[day]?.endTime || ""}
                                onChange={(e) =>
                                  setSchedule({
                                    ...schedule,
                                    [day]: { ...schedule[day], endTime: e.target.value },
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-2xs"
                              >
                                <option value="">Select End Time</option>
                                {scheduleTimeSlots.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 9. User Allowed To & Select All */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs">User Allowed to</div>
                <button
                  type="button"
                  onClick={onToggleSelectAll}
                  className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  Select All
                </button>
              </div>

              {/* 10. Permissions Matrix Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Section Name</th>
                      <th className="py-2.5 px-3 text-center w-16">View</th>
                      <th className="py-2.5 px-3 text-center w-16">Add</th>
                      <th className="py-2.5 px-3 text-center w-16">Edit</th>
                      <th className="py-2.5 px-3 text-center w-16">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {Object.entries(permissions).map(([section, perms]) => (
                      <tr key={section} className="hover:bg-slate-50/60">
                        <td className="py-2 px-3 font-medium text-slate-800">{section}</td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={perms.view}
                            onChange={(e) =>
                              setPermissions({
                                ...permissions,
                                [section]: { ...perms, view: e.target.checked },
                              })
                            }
                            className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          {!perms.onlyView && (
                            <input
                              type="checkbox"
                              checked={perms.add}
                              onChange={(e) =>
                                setPermissions({
                                  ...permissions,
                                  [section]: { ...perms, add: e.target.checked },
                                })
                              }
                              className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                            />
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {!perms.onlyView && (
                            <input
                              type="checkbox"
                              checked={perms.edit}
                              onChange={(e) =>
                                setPermissions({
                                  ...permissions,
                                  [section]: { ...perms, edit: e.target.checked },
                                })
                              }
                              className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                            />
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {!perms.onlyView && (
                            <input
                              type="checkbox"
                              checked={perms.remove}
                              onChange={(e) =>
                                setPermissions({
                                  ...permissions,
                                  [section]: { ...perms, remove: e.target.checked },
                                })
                              }
                              className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 cursor-pointer accent-[#dc2626]"
                            />
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* Expandable Accordions */}
                    {["Expense Income", "Other Documents", "Report", "Setting", "Other Options"].map((sec) => {
                      const isExpanded = !!expandedSections[sec];
                      return (
                        <React.Fragment key={sec}>
                          <tr
                            onClick={() =>
                              setExpandedSections({
                                ...expandedSections,
                                [sec]: !isExpanded,
                              })
                            }
                            className="hover:bg-slate-50 cursor-pointer select-none bg-slate-50/30"
                          >
                            <td colSpan={4} className="py-2.5 px-3 font-semibold text-slate-800">
                              {sec}
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-400">
                              <span className="w-5 h-5 rounded border border-slate-200 inline-flex items-center justify-center text-xs font-bold text-slate-600 bg-white">
                                {isExpanded ? "−" : "+"}
                              </span>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-red-50/10">
                              <td colSpan={5} className="p-3 text-xs text-slate-600">
                                <div className="flex items-center gap-4">
                                  <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 accent-[#dc2626]" />
                                    <span>View {sec}</span>
                                  </label>
                                  <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#dc2626] focus:ring-red-500 accent-[#dc2626]" />
                                    <span>Manage {sec}</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-slate-200/80 bg-slate-50/60 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
