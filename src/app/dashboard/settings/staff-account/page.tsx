"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import StaffAccountDrawer, { StaffItem } from "../components/StaffAccountDrawer";

export default function StaffAccountSettingsPage() {
  const toast = useToast();

  const [staffList, setStaffList] = useState<StaffItem[]>([
    { id: "st-1", name: "Abhishek Sharma (You)", email: "sales@virosentrepreneurs.com", role: "Super Admin", roleBadge: "bg-red-50 text-[#dc2626]", status: "Active", isPrimary: true },
    { id: "st-2", name: "Rahul Verma", email: "rahul.v@virosentrepreneurs.com", role: "Accountant", roleBadge: "bg-blue-50 text-blue-700", status: "Active", isPrimary: false },
    { id: "st-3", name: "Pooja Sharma", email: "pooja.sales@virosentrepreneurs.com", role: "Sales Executive", roleBadge: "bg-purple-50 text-purple-700", status: "Active", isPrimary: false },
    { id: "st-4", name: "Rachana Singh", email: "customercare@virosentrepreneurs.com", role: "Support Lead", roleBadge: "bg-amber-50 text-amber-700", status: "Active", isPrimary: false },
    { id: "st-5", name: "Rupesh Kumar", email: "info@virosentrepreneurs.com", role: "Billing Operator", roleBadge: "bg-slate-100 text-slate-700", status: "Active", isPrimary: false },
  ]);

  const [showStaffDrawer, setShowStaffDrawer] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: "",
    phone: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    isEnabled: true,
    hasSchedule: false,
    role: "Staff Member",
  });

  const initialStaffPermissions: Record<string, { view: boolean; add: boolean; edit: boolean; remove: boolean; onlyView?: boolean }> = {
    "Dashboard": { view: true, add: false, edit: false, remove: false, onlyView: true },
    "Customer / Vendor": { view: true, add: true, edit: true, remove: false },
    "Product": { view: true, add: true, edit: true, remove: false },
    "Price List": { view: true, add: true, edit: true, remove: false },
    "Transport": { view: true, add: true, edit: true, remove: false },
    "Additional Charges": { view: true, add: true, edit: true, remove: false },
    "Sale Invoice": { view: true, add: true, edit: true, remove: false },
    "Purchase Invoice": { view: true, add: true, edit: true, remove: false },
    "Inward Payment Receipt": { view: true, add: true, edit: true, remove: false },
    "Outward Payment Receipt": { view: true, add: true, edit: true, remove: false },
    "Services Request": { view: true, add: true, edit: true, remove: false },
  };

  const [staffPermissions, setStaffPermissions] = useState(initialStaffPermissions);
  const [staffSchedule, setStaffSchedule] = useState<Record<string, { startTime: string; endTime: string }>>({
    Monday: { startTime: "", endTime: "" },
    Tuesday: { startTime: "", endTime: "" },
    Wednesday: { startTime: "", endTime: "" },
    Thursday: { startTime: "", endTime: "" },
    Friday: { startTime: "", endTime: "" },
    Saturday: { startTime: "", endTime: "" },
    Sunday: { startTime: "", endTime: "" },
  });

  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({
      name: "",
      phone: "",
      email: "",
      userId: "",
      password: "",
      confirmPassword: "",
      isEnabled: true,
      hasSchedule: false,
      role: "Staff Member",
    });
    setStaffPermissions(initialStaffPermissions);
    setShowStaffDrawer(true);
  };

  const handleOpenEditStaff = (staff: StaffItem) => {
    setEditingStaffId(staff.id);
    setStaffForm({
      name: staff.name.replace(" (You)", ""),
      phone: "9871029141",
      email: staff.email,
      userId: staff.id.replace("st-", "staff_"),
      password: "••••••••",
      confirmPassword: "••••••••",
      isEnabled: staff.status === "Active",
      hasSchedule: false,
      role: staff.role,
    });
    setShowStaffDrawer(true);
  };

  const handleToggleSelectAllPermissions = () => {
    const allChecked = Object.values(staffPermissions).every(
      (p) => p.view && (p.onlyView || (p.add && p.edit && p.remove))
    );
    const updated = { ...staffPermissions };
    Object.keys(updated).forEach((k) => {
      if (updated[k].onlyView) {
        updated[k] = { ...updated[k], view: !allChecked };
      } else {
        updated[k] = {
          view: !allChecked,
          add: !allChecked,
          edit: !allChecked,
          remove: !allChecked,
        };
      }
    });
    setStaffPermissions(updated);
  };

  const handleSaveStaffAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim()) {
      toast.error("Please enter staff member name.");
      return;
    }
    if (!staffForm.userId.trim()) {
      toast.error("Please enter User ID.");
      return;
    }

    if (editingStaffId) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === editingStaffId
            ? { ...s, name: staffForm.name, email: staffForm.email || s.email, role: staffForm.role || s.role, status: staffForm.isEnabled ? "Active" : "Inactive" }
            : s
        )
      );
      toast.success(`Updated staff account for ${staffForm.name}`, { title: "Staff Account Updated" });
    } else {
      const newStaff: StaffItem = {
        id: "st-" + Date.now(),
        name: staffForm.name,
        email: staffForm.email || `${staffForm.userId.toLowerCase()}@virosentrepreneurs.com`,
        role: staffForm.role || "Staff Operator",
        roleBadge: "bg-slate-100 text-slate-700",
        status: staffForm.isEnabled ? "Active" : "Inactive",
        isPrimary: false,
      };
      setStaffList((prev) => [...prev, newStaff]);
      toast.success(`Created staff account for ${staffForm.name}`, { title: "Staff Account Created" });
    }
    setShowStaffDrawer(false);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Removed staff member: ${name}`, { title: "Staff Deleted" });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Staff Account Management</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage staff members, roles, permissions, and security access.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddStaff}
            className="px-3.5 py-1.5 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Staff</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-semibold border-b border-slate-100">
                <th className="pb-3 font-semibold text-slate-600">Staff Member</th>
                <th className="pb-3 font-semibold text-slate-600">Email / Phone</th>
                <th className="pb-3 font-semibold text-slate-600">Role</th>
                <th className="pb-3 font-semibold text-slate-600">Status</th>
                <th className="pb-3 text-right font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">{staff.name}</td>
                  <td className="py-3.5 text-slate-600">{staff.email}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${staff.roleBadge}`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {staff.isPrimary ? (
                      <div className="flex items-center justify-end gap-3 font-medium">
                        <button
                          type="button"
                          onClick={() => handleOpenEditStaff(staff)}
                          className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <span className="text-slate-400 font-normal">Primary</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3.5 font-medium">
                        <button
                          type="button"
                          onClick={() => handleOpenEditStaff(staff)}
                          className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditStaff(staff)}
                          className="text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteStaff(staff.id, staff.name)}
                          className="text-red-600 hover:text-red-700 transition-colors cursor-pointer font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Account Drawer */}
      <StaffAccountDrawer
        isOpen={showStaffDrawer}
        onClose={() => setShowStaffDrawer(false)}
        editingId={editingStaffId}
        form={staffForm}
        setForm={setStaffForm}
        permissions={staffPermissions}
        setPermissions={setStaffPermissions}
        schedule={staffSchedule}
        setSchedule={setStaffSchedule}
        onSave={handleSaveStaffAccount}
        onToggleSelectAll={handleToggleSelectAllPermissions}
      />
    </div>
  );
}
