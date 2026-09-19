"use client";

import React, { useEffect, useRef, useState } from "react";
import { RefreshCw, Activity } from "lucide-react";

interface NodePoint {
  x: number;
  y: number;
  label: string;
  sub: string;
  radius: number;
  color: string;
  glow: string;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
  amount: string;
}

interface FloatingTag {
  x: number;
  y: number;
  vy: number;
  text: string;
  opacity: number;
  color: string;
}

export default function ErpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<number>(0);
  const [modeName, setModeName] = useState<string>("");
  const animationFrameRef = useRef<number | null>(null);

  const MODES = [
    { id: 0, name: "Live India Invoicing & Transit Network", tag: "E-Way & IRN Stream" },
    { id: 1, name: "Real-Time ERP Financial Wave & Ledger", tag: "Balance & Cashflow" },
    { id: 2, name: "Multi-Warehouse Inventory & Supply Mesh", tag: "Stock & Go-down Sync" },
  ];

  // Randomize mode on every reload / initial client mount
  useEffect(() => {
    const randomMode = Math.floor(Math.random() * MODES.length);
    setActiveMode(randomMode);
    setModeName(MODES[randomMode].name);
  }, []);

  const switchMode = () => {
    const nextMode = (activeMode + 1) % MODES.length;
    setActiveMode(nextMode);
    setModeName(MODES[nextMode].name);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let frame = 0;

    // --- MODE 0 SETUP: Nationwide Invoicing Network ---
    // Normalized city coordinates inside India's central frame
    const cityCoords = [
      { rx: 0.44, ry: 0.32, label: "Delhi NCR", sub: "HQ Gateway", color: "#34d399" },
      { rx: 0.32, ry: 0.58, label: "Mumbai", sub: "Financial Hub", color: "#38bdf8" },
      { rx: 0.25, ry: 0.44, label: "Ahmedabad", sub: "Textile & Trade", color: "#fbbf24" },
      { rx: 0.45, ry: 0.72, label: "Bengaluru", sub: "Tech & Logistics", color: "#38bdf8" },
      { rx: 0.52, ry: 0.62, label: "Hyderabad", sub: "Pharma Cluster", color: "#34d399" },
      { rx: 0.55, ry: 0.75, label: "Chennai", sub: "Automotive Hub", color: "#fbbf24" },
      { rx: 0.68, ry: 0.52, label: "Kolkata", sub: "Eastern Port", color: "#f43f5e" },
      { rx: 0.48, ry: 0.48, label: "Nagpur", sub: "Central Go-down", color: "#a855f7" },
    ];

    const getCityNodes = (): NodePoint[] => {
      return cityCoords.map((c) => ({
        x: c.rx * width,
        y: c.ry * height,
        label: c.label,
        sub: c.sub,
        radius: 6,
        color: c.color,
        glow: c.color,
      }));
    };

    let cityNodes = getCityNodes();

    const networkPackets: Packet[] = [];
    const sampleAmounts = ["₹1,84,500", "₹42,300", "₹9,80,000", "₹65,200", "₹3,12,000", "₹14,950"];
    for (let i = 0; i < 9; i++) {
      const from = Math.floor(Math.random() * cityNodes.length);
      let to = Math.floor(Math.random() * cityNodes.length);
      while (to === from) to = Math.floor(Math.random() * cityNodes.length);
      networkPackets.push({
        fromIndex: from,
        toIndex: to,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007,
        color: i % 2 === 0 ? "#ffffff" : "#fef08a",
        amount: sampleAmounts[i % sampleAmounts.length],
      });
    }

    // --- MODE 1 SETUP: Real-Time Financial Waves & Bars ---
    const barCount = 18;
    const barHeights = Array.from({ length: barCount }, () => 0.2 + Math.random() * 0.6);
    const targetHeights = [...barHeights];

    // --- MODE 2 SETUP: Multi-Warehouse Mesh Orbit ---
    const warehouseHubs = [
      { rx: 0.3, ry: 0.35, r: 42, label: "Go-Down 1 (North)", items: 3400 },
      { rx: 0.7, ry: 0.35, r: 46, label: "Go-Down 2 (West)", items: 5800 },
      { rx: 0.5, ry: 0.68, r: 52, label: "Central Go-Down", items: 12400 },
    ];

    // Floating ERP invoice tags
    const floatingTags: FloatingTag[] = [];
    const erpWords = [
      "GST E-Invoice #INV-9201",
      "IRN Generated ✓",
      "E-Way Bill Active",
      "GSTR-2B Matched 100%",
      "ITC Claimed: ₹42,000",
      "Stock Transferred (120 units)",
      "UPI Payment Received",
      "Batch #BAT-481 Verified",
    ];

    const spawnTag = () => {
      floatingTags.push({
        x: width * 0.15 + Math.random() * width * 0.7,
        y: height * 0.9,
        vy: 0.6 + Math.random() * 0.8,
        text: erpWords[Math.floor(Math.random() * erpWords.length)],
        opacity: 0.9,
        color: Math.random() > 0.4 ? "#ffffff" : "#fef08a",
      });
    };

    // Render loop
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep, rich crimson red base with ambient mesh
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, "#dc2626");
      bgGrad.addColorStop(0.5, "#b91c1c");
      bgGrad.addColorStop(1, "#7f1d1d");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Background decorative concentric radar circles
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      const centerCircleX = width * 0.5;
      const centerCircleY = height * 0.5;
      for (let r = 100; r <= 600; r += 90) {
        ctx.beginPath();
        ctx.arc(centerCircleX, centerCircleY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // ==========================================
      // MODE 0: Live India Nationwide Invoicing Network
      // ==========================================
      if (activeMode === 0) {
        cityNodes = getCityNodes();

        // Draw faint outline of India in the background
        ctx.save();
        ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Scale and center an outline silhouette
        const ox = width * 0.5 - 150;
        const oy = height * 0.5 - 220;
        const s = Math.min(width, height) / 500;

        ctx.moveTo(ox + 150 * s, oy + 40 * s);
        ctx.bezierCurveTo(ox + 170 * s, oy + 40 * s, ox + 190 * s, oy + 90 * s, ox + 220 * s, oy + 120 * s);
        ctx.bezierCurveTo(ox + 260 * s, oy + 130 * s, ox + 310 * s, oy + 160 * s, ox + 300 * s, oy + 195 * s);
        ctx.bezierCurveTo(ox + 280 * s, oy + 210 * s, ox + 250 * s, oy + 240 * s, ox + 230 * s, oy + 280 * s);
        ctx.bezierCurveTo(ox + 210 * s, oy + 350 * s, ox + 180 * s, oy + 410 * s, ox + 155 * s, oy + 460 * s);
        ctx.bezierCurveTo(ox + 140 * s, oy + 440 * s, ox + 110 * s, oy + 370 * s, ox + 95 * s, oy + 310 * s);
        ctx.bezierCurveTo(ox + 45 * s, oy + 280 * s, ox + 45 * s, oy + 235 * s, ox + 95 * s, oy + 210 * s);
        ctx.bezierCurveTo(ox + 115 * s, oy + 175 * s, ox + 130 * s, oy + 110 * s, ox + 150 * s, oy + 40 * s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Draw connections between city hubs
        ctx.save();
        ctx.lineWidth = 1.2;
        for (let i = 0; i < cityNodes.length; i++) {
          for (let j = i + 1; j < cityNodes.length; j++) {
            const n1 = cityNodes[i];
            const n2 = cityNodes[j];
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (dist < width * 0.55) {
              const alpha = Math.max(0.08, 0.35 - dist / (width * 0.7));
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.beginPath();
              ctx.setLineDash([4, 4]);
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        }
        ctx.setLineDash([]);
        ctx.restore();

        // Animate financial transaction packets travelling across cities
        networkPackets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.fromIndex = Math.floor(Math.random() * cityNodes.length);
            let nextTo = Math.floor(Math.random() * cityNodes.length);
            while (nextTo === p.fromIndex) nextTo = Math.floor(Math.random() * cityNodes.length);
            p.toIndex = nextTo;
          }

          const n1 = cityNodes[p.fromIndex];
          const n2 = cityNodes[p.toIndex];
          if (!n1 || !n2) return;

          const px = n1.x + (n2.x - n1.x) * p.progress;
          const py = n1.y + (n2.y - n1.y) * p.progress;

          // Packet glow dot
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Amount badge hovering along packet
          if (p.progress > 0.25 && p.progress < 0.75) {
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            const tw = ctx.measureText(p.amount).width;
            ctx.fillRect(px - tw / 2 - 4, py - 18, tw + 8, 14);
            ctx.strokeRect(px - tw / 2 - 4, py - 18, tw + 8, 14);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 9px monospace";
            ctx.fillText(p.amount, px - tw / 2, py - 7);
          }
          ctx.restore();
        });

        // Draw City Nodes with glowing pulses
        cityNodes.forEach((node, idx) => {
          const pulse = Math.sin(frame * 0.05 + idx) * 3;
          ctx.save();

          // Outer pulse ring
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5 + Math.sin(frame * 0.08 + idx) * 0.3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6 + pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Center solid circle
          ctx.globalAlpha = 1;
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.glow;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();

          // Text label
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px system-ui, sans-serif";
          ctx.fillText(node.label, node.x + 12, node.y + 1);

          ctx.fillStyle = "rgba(254, 226, 226, 0.75)";
          ctx.font = "9px system-ui, sans-serif";
          ctx.fillText(node.sub, node.x + 12, node.y + 13);
          ctx.restore();
        });
      }

      // ==========================================
      // MODE 1: Real-Time ERP Financial Wave & Ledger
      // ==========================================
      else if (activeMode === 1) {
        // Isometric / Financial Bars
        const startX = width * 0.12;
        const availableW = width * 0.76;
        const barWidth = availableW / barCount - 6;
        const baselineY = height * 0.65;

        // Smoothly adjust target heights
        if (frame % 45 === 0) {
          for (let i = 0; i < barCount; i++) {
            targetHeights[i] = 0.15 + Math.random() * 0.7;
          }
        }

        ctx.save();
        for (let i = 0; i < barCount; i++) {
          barHeights[i] += (targetHeights[i] - barHeights[i]) * 0.05;
          const h = barHeights[i] * height * 0.35;
          const bx = startX + i * (barWidth + 6);
          const by = baselineY - h;

          // Bar gradient
          const barGrad = ctx.createLinearGradient(bx, by, bx, baselineY);
          barGrad.addColorStop(0, "#ffffff");
          barGrad.addColorStop(0.6, "rgba(254, 202, 202, 0.7)");
          barGrad.addColorStop(1, "rgba(220, 38, 38, 0.15)");

          ctx.fillStyle = barGrad;
          ctx.fillRect(bx, by, barWidth, h);

          // Top luminous cap
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 8;
          ctx.fillRect(bx, by, barWidth, 3);
          ctx.shadowBlur = 0;

          // Bar value text
          if (i % 3 === 0) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.font = "bold 9px monospace";
            const valText = "₹" + Math.round(barHeights[i] * 90) + "L";
            ctx.fillText(valText, bx - 2, by - 8);
          }
        }
        ctx.restore();

        // Continuous Financial Sine Wave
        ctx.save();
        ctx.strokeStyle = "#fde047";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        for (let x = 0; x < width; x += 5) {
          const y =
            height * 0.42 +
            Math.sin(x * 0.015 + frame * 0.04) * 35 +
            Math.cos(x * 0.008 - frame * 0.02) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        // Secondary smooth cashflow wave
        ctx.save();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        for (let x = 0; x < width; x += 6) {
          const y =
            height * 0.46 +
            Math.sin(x * 0.012 - frame * 0.03) * 28 +
            Math.cos(x * 0.02 + frame * 0.02) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // ==========================================
      // MODE 2: Multi-Warehouse Inventory & Supply Mesh
      // ==========================================
      else {
        warehouseHubs.forEach((hub, hidx) => {
          const hx = hub.rx * width;
          const hy = hub.ry * height;

          // Circular rotating gear ring
          ctx.save();
          ctx.translate(hx, hy);
          ctx.rotate(frame * (hidx % 2 === 0 ? 0.01 : -0.01));
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 8]);
          ctx.beginPath();
          ctx.arc(0, 0, hub.r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Orbiting stock particles
          const orbitCount = 4;
          for (let p = 0; p < orbitCount; p++) {
            const angle = frame * 0.03 + (p * Math.PI * 2) / orbitCount;
            const px = hx + Math.cos(angle) * (hub.r + 14);
            const py = hy + Math.sin(angle) * (hub.r + 14);

            ctx.save();
            ctx.fillStyle = p % 2 === 0 ? "#34d399" : "#38bdf8";
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Hub central node
          ctx.save();
          const hubGrad = ctx.createRadialGradient(hx, hy, 5, hx, hy, hub.r * 0.7);
          hubGrad.addColorStop(0, "rgba(15, 23, 42, 0.95)");
          hubGrad.addColorStop(1, "rgba(30, 41, 59, 0.95)");
          ctx.fillStyle = hubGrad;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(hx, hy, hub.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Hub labels
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(hub.label, hx, hy - 4);

          ctx.fillStyle = "#34d399";
          ctx.font = "bold 10px monospace";
          ctx.fillText(hub.items.toLocaleString("en-IN") + " SKUs", hx, hy + 12);
          ctx.textAlign = "left";
          ctx.restore();
        });

        // Beam connections between warehouse hubs
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        const h0 = warehouseHubs[0];
        const h1 = warehouseHubs[1];
        const h2 = warehouseHubs[2];
        ctx.moveTo(h0.rx * width, h0.ry * height);
        ctx.lineTo(h1.rx * width, h1.ry * height);
        ctx.lineTo(h2.rx * width, h2.ry * height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // ------------------------------------------
      // Floating ERP status tags (Active in all modes)
      // ------------------------------------------
      if (frame % 80 === 0) spawnTag();

      for (let i = floatingTags.length - 1; i >= 0; i--) {
        const tag = floatingTags[i];
        tag.y -= tag.vy;
        tag.opacity -= 0.005;

        if (tag.opacity <= 0 || tag.y < height * 0.1) {
          floatingTags.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = tag.opacity;
        ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.font = "bold 10px system-ui, sans-serif";
        const tw = ctx.measureText(tag.text).width;
        ctx.fillRect(tag.x - tw / 2 - 6, tag.y - 14, tw + 12, 20);
        ctx.strokeRect(tag.x - tw / 2 - 6, tag.y - 14, tw + 12, 20);

        ctx.fillStyle = tag.color;
        ctx.fillText(tag.text, tag.x - tw / 2, tag.y);
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeMode]);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 overflow-hidden select-none">
      {/* Dynamic Animated HTML5 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Header Controls: Mode Indicator + Shuffle Button */}
      <div className="relative z-20 flex items-center justify-between gap-3 bg-slate-950/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 max-w-fit">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold text-white">
            ERP Canvas Mode {activeMode + 1}/3:
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-red-200 hidden sm:inline">
            {modeName}
          </span>
        </div>

        <button
          type="button"
          onClick={switchMode}
          title="Click to switch canvas view or reload page"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[10px] sm:text-xs font-bold transition-colors cursor-pointer border border-white/20"
        >
          <RefreshCw className="w-3 h-3 text-white" />
          <span>Shuffle View</span>
        </button>
      </div>

      {/* Canvas fills the space completely and unobstructed */}

      {/* Bottom Status Bar */}
      <div className="relative z-20 flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Data Stream Connected</span>
        </span>
        <span className="font-mono font-bold text-red-200">
          FY 2024-25 Q4 Live
        </span>
      </div>
    </div>
  );
}
