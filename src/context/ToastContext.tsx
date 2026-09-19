"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, Check, Info, AlertTriangle, Loader2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastType = "error" | "success" | "info" | "warning" | "wait";

export interface ToastOptions {
  title?: string;
  details?: string;
  duration?: number;
  actionText?: string;
}

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title: string;
  details?: string;
  duration: number;
  actionText: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (type: ToastType, message: string, options?: ToastOptions) => string;
  error:   (message: string, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  info:    (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  wait:    (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

// ─── Context & Global singleton ───────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
let _g: ToastContextValue | null = null;

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/** Call toasts from outside React components */
export const toast = {
  show:    (t: ToastType, m: string, o?: ToastOptions) => _g?.show(t, m, o)    ?? "",
  error:   (m: string, o?: ToastOptions)               => _g?.error(m, o)      ?? "",
  success: (m: string, o?: ToastOptions)               => _g?.success(m, o)    ?? "",
  info:    (m: string, o?: ToastOptions)               => _g?.info(m, o)       ?? "",
  warning: (m: string, o?: ToastOptions)               => _g?.warning(m, o)    ?? "",
  wait:    (m: string, o?: ToastOptions)               => _g?.wait(m, o)       ?? "",
  dismiss: (id: string)                                => _g?.dismiss(id),
  clearAll:()                                          => _g?.clearAll(),
};

// ─── Per-type visual config ───────────────────────────────────────────────────

const CONFIG: Record<ToastType, {
  border: string;
  iconBg: string;
  titleColor: string;
  progressBar: string;
  label: string;
  icon: React.ReactNode;
}> = {
  info: {
    border:      "border-blue-400",
    iconBg:      "bg-blue-500",
    titleColor:  "text-blue-600",
    progressBar: "bg-blue-400",
    label:       "Information!",
    icon:        <Info className="w-4 h-4 text-white stroke-[2.5]" />,
  },
  success: {
    border:      "border-emerald-400",
    iconBg:      "bg-emerald-500",
    titleColor:  "text-emerald-600",
    progressBar: "bg-emerald-400",
    label:       "Success!",
    icon:        <Check className="w-4 h-4 text-white stroke-[3]" />,
  },
  error: {
    border:      "border-red-400",
    iconBg:      "bg-red-500",
    titleColor:  "text-red-600",
    progressBar: "bg-red-400",
    label:       "Error!",
    icon:        <X className="w-4 h-4 text-white stroke-[3]" />,
  },
  warning: {
    border:      "border-yellow-400",
    iconBg:      "bg-yellow-400",
    titleColor:  "text-yellow-600",
    progressBar: "bg-yellow-400",
    label:       "Warning!",
    icon:        <AlertTriangle className="w-4 h-4 text-white stroke-[2.5]" />,
  },
  wait: {
    border:      "border-slate-300",
    iconBg:      "bg-slate-500",
    titleColor:  "text-slate-600",
    progressBar: "bg-slate-400",
    label:       "Please wait...",
    icon:        <Loader2 className="w-4 h-4 text-white animate-spin" />,
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modal, setModal]   = useState<{ title: string; details: string; type: ToastType } | null>(null);

  const dismiss = useCallback((id: string) =>
    setToasts((p) => p.filter((t) => t.id !== id)), []);

  const clearAll = useCallback(() => setToasts([]), []);

  const show = useCallback(
    (type: ToastType, message: string, options?: ToastOptions): string => {
      const id       = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const duration = options?.duration !== undefined
        ? options.duration
        : type === "wait" ? 0 : 5000;

      const item: ToastItem = {
        id, type, message,
        title:      options?.title      ?? CONFIG[type].label,
        details:    options?.details,
        duration,
        actionText: options?.actionText ?? "View details",
      };

      setToasts((p) => [item, ...p.slice(0, 3)]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const error   = useCallback((m: string, o?: ToastOptions) => show("error",   m, o), [show]);
  const success = useCallback((m: string, o?: ToastOptions) => show("success", m, o), [show]);
  const info    = useCallback((m: string, o?: ToastOptions) => show("info",    m, o), [show]);
  const warning = useCallback((m: string, o?: ToastOptions) => show("warning", m, o), [show]);
  const wait    = useCallback((m: string, o?: ToastOptions) => show("wait",    m, o), [show]);

  const value: ToastContextValue = { toasts, show, error, success, info, warning, wait, dismiss, clearAll };
  _g = value;

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* ── Toast Stack (top-right) ── */}
      <div
        aria-live="polite"
        className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 w-[380px] max-w-[calc(100vw-2.5rem)] pointer-events-none"
      >
        {toasts.map((item) => (
          <ToastCard
            key={item.id}
            item={item}
            onDismiss={() => dismiss(item.id)}
            onDetails={() =>
              item.details &&
              setModal({ title: item.title, details: item.details, type: item.type })
            }
          />
        ))}
      </div>

      {/* ── Details Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100000] flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setModal(null)}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md shadow-2xl border-2 ${CONFIG[modal.type].border} overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${CONFIG[modal.type].iconBg}`}>
                  {CONFIG[modal.type].icon}
                </div>
                <span className={`font-bold text-sm ${CONFIG[modal.type].titleColor}`}>
                  {modal.title}
                </span>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <pre className="text-xs text-slate-700 font-mono bg-slate-50 border border-slate-200 rounded-xl p-4 whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                {modal.details}
              </pre>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 bg-slate-50/60">
              <button
                onClick={() => { navigator.clipboard.writeText(modal.details); setModal(null); }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 transition-colors cursor-pointer"
              >
                Copy
              </button>
              <button
                onClick={() => setModal(null)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer ${
                  modal.type === "error"   ? "bg-red-500 hover:bg-red-600"       :
                  modal.type === "success" ? "bg-emerald-500 hover:bg-emerald-600" :
                  modal.type === "info"    ? "bg-blue-500 hover:bg-blue-600"     :
                  modal.type === "warning" ? "bg-yellow-500 hover:bg-yellow-600" :
                  "bg-slate-600 hover:bg-slate-700"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// ─── Toast Card ───────────────────────────────────────────────────────────────

function ToastCard({
  item,
  onDismiss,
  onDetails,
}: {
  item: ToastItem;
  onDismiss: () => void;
  onDetails: () => void;
}) {
  const { type, title, message, details, duration } = item;
  const cfg = CONFIG[type];

  return (
    <div
      role="alert"
      className={`
        pointer-events-auto bg-white rounded-lg border-2 ${cfg.border}
        shadow-lg flex items-center gap-3 px-3.5 py-2.5 relative overflow-hidden
        animate-in slide-in-from-right-4 fade-in duration-300
      `}
    >
      {/* Circular Icon */}
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${cfg.iconBg} shadow-sm`}>
        {cfg.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-tight ${cfg.titleColor}`}>{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">{message}</p>

      </div>

      {/* Circular Dismiss Button with Ring Progress Timer */}
      <div className="shrink-0 relative w-8 h-8 flex items-center justify-center">
        {/* SVG countdown ring — animates clockwise as timer depletes */}
        {duration > 0 && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 32 32"
            fill="none"
          >
            {/* Track ring (faint) */}
            <circle
              cx="16" cy="16" r="14"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-200"
              strokeLinecap="round"
            />
            {/* Animated countdown ring */}
            <circle
              cx="16" cy="16" r="14"
              stroke="currentColor"
              strokeWidth="2"
              className={cfg.titleColor}
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeDasharray="87.96"
              strokeDashoffset="0"
              style={{
                animation: `ringCountdown ${duration}ms linear forwards`,
              }}
            />
          </svg>
        )}

        {/* X button (no border, ring acts as border) */}
        <button
          onClick={onDismiss}
          title="Dismiss"
          className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <style>{`
        @keyframes ringCountdown {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 87.96; }
        }
      `}</style>
    </div>
  );
}
