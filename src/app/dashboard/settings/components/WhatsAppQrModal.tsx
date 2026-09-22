"use client";

import React from "react";
import { X, MessageCircle, QrCode } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface WhatsAppQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppQrModal({ isOpen, onClose }: WhatsAppQrModalProps) {
  const toast = useToast();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in-50 zoom-in-95">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center font-bold">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Connect WhatsApp</h4>
              <p className="text-[11px] text-slate-500">Scan QR to connect your WhatsApp device</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-48 h-48 mx-auto bg-slate-50 border-2 border-dashed border-red-200 rounded-xl flex flex-col items-center justify-center p-4">
            <QrCode className="w-32 h-32 text-slate-800" />
            <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-wider mt-1">Live QR Code</span>
          </div>

          <div className="text-left bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800">How to connect:</div>
            <div className="text-[11px] leading-relaxed">
              1. Open WhatsApp on your phone.<br />
              2. Tap <strong>Linked Devices</strong> in menu or settings.<br />
              3. Tap <strong>Link a Device</strong> and point your camera at this screen.
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                toast.success("WhatsApp device linked successfully!", { title: "WhatsApp Connected" });
              }}
              className="px-5 py-2 rounded-md bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              I Have Scanned
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
