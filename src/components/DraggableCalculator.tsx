"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calculator, X, GripHorizontal, Copy, Check, Delete, Percent } from "lucide-react";

interface DraggableCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DraggableCalculator({ isOpen, onClose }: DraggableCalculatorProps) {
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");
  const [gstSummary, setGstSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  // Calculate default position at bottom-right on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !position) {
      const defaultX = Math.max(20, window.innerWidth - 300);
      const defaultY = Math.max(50, window.innerHeight - 490);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, [position]);

  // Window-level dragging listeners for silky smooth drag across entire screen
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;

      const modalWidth = 280;
      const modalHeight = 440;
      const maxX = Math.max(10, window.innerWidth - modalWidth - 10);
      const maxY = Math.max(10, window.innerHeight - modalHeight - 10);

      const newX = Math.min(Math.max(10, dragStartRef.current.initialX + deltaX), maxX);
      const newY = Math.min(Math.max(10, dragStartRef.current.initialY + deltaY), maxY);

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  // Keyboard calculation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        handleCalcButton(e.key);
      } else if (["+", "-", "*", "/", "%", "(", ")"].includes(e.key)) {
        handleCalcButton(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleCalcButton("=");
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key.toLowerCase() === "c") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, calcInput, calcResult]);

  // Evaluate mathematical expressions including percentages
  const evaluateExpression = (expr: string): number | null => {
    if (!expr.trim()) return null;
    try {
      // Convert visual operators if any
      let sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/");

      // Handle percentages: e.g. "1000+18%" => "1000+(1000*0.18)", "1000-10%" => "1000-(1000*0.10)", "500*18%" => "500*0.18"
      sanitized = sanitized.replace(/(\d+(\.\d+)?)\s*([+\-])\s*(\d+(\.\d+)?)%/g, (_, base, _2, op, rate) => {
        return `${base} ${op} (${base} * ${Number(rate) / 100})`;
      });
      sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

      // Filter invalid characters
      sanitized = sanitized.replace(/[^0-9+\-*/.() ]/g, "");
      if (!sanitized) return null;

      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${sanitized})`)();
      if (typeof res === "number" && !isNaN(res) && isFinite(res)) {
        return res;
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleClear = () => {
    setCalcInput("");
    setCalcResult("");
    setGstSummary(null);
  };

  const handleBackspace = () => {
    setCalcInput((prev) => prev.slice(0, -1));
    setGstSummary(null);
  };

  // Toggle +/- sign
  const handleToggleSign = () => {
    if (!calcInput && calcResult && calcResult !== "Error") {
      const num = Number(calcResult);
      if (!isNaN(num)) {
        const toggled = String(-num);
        setCalcInput(toggled);
        setCalcResult(toggled);
        return;
      }
    }
    if (!calcInput) return;

    // Check if ends with number
    const match = calcInput.match(/(-?\d+(\.\d+)?)$/);
    if (match) {
      const lastNum = match[0];
      const rest = calcInput.slice(0, match.index);
      if (lastNum.startsWith("-")) {
        setCalcInput(rest + lastNum.slice(1));
      } else {
        setCalcInput(rest + "(-" + lastNum + ")");
      }
    }
  };

  // Quick GST slab calculation (+5%, +12%, +18%, +28%)
  const handleApplyGst = (rate: number, isAdd: boolean = true) => {
    const currentVal = calcResult && !calcInput ? Number(calcResult) : evaluateExpression(calcInput);
    const base = currentVal !== null && !isNaN(currentVal) ? currentVal : 0;

    if (base === 0) return;

    if (isAdd) {
      const gstAmt = (base * rate) / 100;
      const total = base + gstAmt;
      const roundedTotal = Number(total.toFixed(2));
      const roundedGst = Number(gstAmt.toFixed(2));

      setCalcInput(`${base} + ${rate}%`);
      setCalcResult(String(roundedTotal));
      setGstSummary(`+${rate}% GST: ₹${roundedGst} (Total: ₹${roundedTotal})`);
    } else {
      // Remove GST (Reverse calculation): Base = Total / (1 + rate/100)
      const baseAmt = base / (1 + rate / 100);
      const gstAmt = base - baseAmt;
      const roundedBase = Number(baseAmt.toFixed(2));
      const roundedGst = Number(gstAmt.toFixed(2));

      setCalcInput(`${base} - ${rate}%`);
      setCalcResult(String(roundedBase));
      setGstSummary(`-${rate}% GST: Net ₹${roundedBase} (Tax ₹${roundedGst})`);
    }
  };

  // Calculation button dispatcher
  const handleCalcButton = (val: string) => {
    setGstSummary(null);

    if (val === "C" || val === "AC") {
      handleClear();
    } else if (val === "⌫") {
      handleBackspace();
    } else if (val === "±") {
      handleToggleSign();
    } else if (val === "=") {
      if (!calcInput.trim()) return;
      const res = evaluateExpression(calcInput);
      if (res === null) {
        setCalcResult("Error");
      } else {
        const formatted = Number.isInteger(res) ? String(res) : String(Number(res.toFixed(4)));
        setCalcResult(formatted);
      }
    } else {
      // Prevent consecutive operators or multiple decimals in one number
      if (val === ".") {
        const lastNumberMatch = calcInput.split(/[+\-*/()]/).pop();
        if (lastNumberMatch && lastNumberMatch.includes(".")) return;
        if (!calcInput || /[+\-*/(]$/.test(calcInput)) {
          setCalcInput((prev) => prev + "0.");
          return;
        }
      }
      setCalcInput((prev) => prev + val);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = calcResult || calcInput || "0";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDragStart = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;

    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = position ? position.x : Math.max(20, window.innerWidth - 300);
    const initialY = position ? position.y : Math.max(50, window.innerHeight - 490);

    dragStartRef.current = { startX, startY, initialX, initialY };
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        left: position ? `${position.x}px` : "auto",
        top: position ? `${position.y}px` : "auto",
        right: position ? "auto" : "1.5rem",
        bottom: position ? "auto" : "2.5rem",
      }}
      className={`fixed w-[275px] bg-white rounded-none shadow-2xl border border-slate-300 z-[999999] select-none p-3.5 space-y-2.5 transition-shadow duration-150 ${
        isDragging ? "shadow-[0_25px_50px_rgba(0,0,0,0.25)] ring-2 ring-red-400/50 cursor-grabbing" : ""
      }`}
    >
      {/* 1. DRAGGABLE HEADER */}
      <div
        onPointerDown={handleDragStart}
        className="flex items-center justify-between pb-2 border-b border-slate-200 cursor-grab active:cursor-grabbing select-none group"
        title="Drag anywhere on header to move calculator"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-none bg-red-50 text-[#dc2626] border border-red-200/60 flex items-center justify-center">
            <Calculator className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <span className="font-bold text-xs text-slate-800 tracking-tight">Quick Calculator</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-slate-300 group-hover:text-slate-500 transition-colors p-0.5">
            <GripHorizontal className="w-4 h-4" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-none text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 2. SCREEN / DISPLAY WITH COPY BUTTON & GST SUMMARY */}
      <div className="p-3 bg-slate-50 rounded-none border border-slate-200 text-right space-y-0.5 relative group">
        <div className="flex items-center justify-between min-h-[16px]">
          <button
            type="button"
            onClick={copyToClipboard}
            title="Copy Result to Clipboard"
            className="p-1 -ml-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-none transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
              </>
            )}
          </button>

          <div className="text-[11px] text-slate-400 font-mono tracking-wider truncate max-w-[170px]">
            {calcInput || "0"}
          </div>
        </div>

        <div className="text-xl font-bold text-slate-900 font-mono tracking-tight truncate">
          {calcResult || (calcInput ? calcInput : "0")}
        </div>

        {gstSummary && (
          <div className="text-[10px] font-semibold text-emerald-700 font-sans tracking-tight truncate border-t border-slate-200/60 pt-0.5 mt-0.5">
            {gstSummary}
          </div>
        )}
      </div>

      {/* 3. QUICK GST SLAB BUTTONS */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-0.5 uppercase tracking-wider">
          <span>Quick GST Rates</span>
        </div>
        <div className="grid grid-cols-4 gap-1 text-xs">
          {[5, 12, 18, 28].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleApplyGst(rate, true)}
              title={`Add +${rate}% GST`}
              className="py-1 px-1 rounded-none bg-red-50/70 hover:bg-red-100/90 active:scale-95 text-[#dc2626] font-bold text-[11px] border border-red-200/80 transition-all cursor-pointer shadow-2xs"
            >
              +{rate}%
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN KEYPAD GRID (5 Rows x 4 Cols with Full Functions) */}
      <div className="grid grid-cols-4 gap-1 text-sm font-semibold">
        {/* Row 1: Function Controls */}
        <button
          type="button"
          onClick={handleClear}
          title="All Clear"
          className="h-7.5 rounded-none bg-red-50 hover:bg-red-100 active:scale-95 text-[#dc2626] border border-red-200/80 text-xs font-black transition-all cursor-pointer shadow-2xs flex items-center justify-center"
        >
          AC
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          title="Backspace"
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          ⌫
        </button>
        <button
          type="button"
          onClick={() => handleCalcButton("%")}
          title="Percentage"
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          %
        </button>
        <button
          type="button"
          onClick={() => handleCalcButton("/")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          /
        </button>

        {/* Row 2: 7, 8, 9, * */}
        {["7", "8", "9"].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => handleCalcButton(b)}
            className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
          >
            {b}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleCalcButton("*")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          *
        </button>

        {/* Row 3: 4, 5, 6, - */}
        {["4", "5", "6"].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => handleCalcButton(b)}
            className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
          >
            {b}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleCalcButton("-")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          -
        </button>

        {/* Row 4: 1, 2, 3, + */}
        {["1", "2", "3"].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => handleCalcButton(b)}
            className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
          >
            {b}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleCalcButton("+")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          +
        </button>

        {/* Row 5: ±, 0, ., = */}
        <button
          type="button"
          onClick={handleToggleSign}
          title="Plus / Minus"
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          ±
        </button>
        <button
          type="button"
          onClick={() => handleCalcButton("0")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-semibold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => handleCalcButton(".")}
          className="h-7.5 rounded-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center justify-center border border-slate-200/60"
        >
          .
        </button>
        <button
          type="button"
          onClick={() => handleCalcButton("=")}
          className="h-7.5 rounded-none bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white text-base font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center"
        >
          =
        </button>
      </div>
    </div>
  );
}
