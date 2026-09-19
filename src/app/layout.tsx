import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Billing Software | Next-Gen ERP & GST Billing Solution",
  description: "Fast, compliant, and intuitive ERP & GST billing software for growing retail, wholesale, and enterprise businesses. E-invoicing, multi-branch inventory & real-time accounting.",
  keywords: ["ERP Software", "GST Billing", "E-Invoicing", "Inventory Management", "Your Billing Software", "Accounting ERP"],
  authors: [{ name: "Your Billing Software Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-900 selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
