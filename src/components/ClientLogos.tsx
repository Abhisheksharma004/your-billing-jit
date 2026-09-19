import React from "react";
import { Shield, Award, Clock, IndianRupee } from "lucide-react";

export default function ClientLogos() {
  const industries = [
    { name: "Retail & Supermarkets", count: "3,200+ Stores" },
    { name: "Manufacturing & Heavy Goods", count: "1,800+ Factories" },
    { name: "Pharma & Healthcare", count: "2,400+ Distributors" },
    { name: "FMCG & Wholesale", count: "4,100+ Traders" },
    { name: "Automobile & Spare Parts", count: "1,500+ Dealerships" },
    { name: "Electronics & Appliances", count: "2,100+ Outlets" },
  ];

  return (
    <section className="py-12 bg-white border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-red-600">
            Trusted Enterprise Backbone
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            Empowering 10,000+ Indian Businesses & Enterprises Daily
          </h3>
        </div>

        {/* Industry Pill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="bg-red-50/50 hover:bg-red-50 border border-red-100/80 rounded-xl p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="text-xs font-bold text-slate-900">{ind.name}</div>
              <div className="text-[11px] font-semibold text-red-600 mt-0.5">{ind.count}</div>
            </div>
          ))}
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-100">

          <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-100 hover:border-red-200 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <IndianRupee className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">₹1,500+ Cr</div>
              <div className="text-xs text-slate-500 font-medium">Monthly Invoicing Volume</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-100 hover:border-red-200 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">2.8 Seconds</div>
              <div className="text-xs text-slate-500 font-medium">Average POS Checkout Speed</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-100 hover:border-red-200 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">99.99%</div>
              <div className="text-xs text-slate-500 font-medium">Enterprise Cloud Uptime</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-100 hover:border-red-200 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium">Govt GSTN Compliance</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return <Shield {...props} />;
}
