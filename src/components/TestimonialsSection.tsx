import React from "react";
import { Star, Quote, Building2, CheckCircle } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Rajesh Singhania",
      role: "Managing Director",
      company: "Singhania Textiles & Retail (Surat)",
      avatarText: "RS",
      rating: 5,
      metric: "Tripled Counter Billing Speed",
      quote: "During festival rushes, our 3 checkout counters bill over 1,200 invoices daily. 'Your Billing Software' never lagged for a second. The automated GSTR-1 export saves our accounting team 3 full days at the end of every month.",
    },
    {
      name: "CA Neha Kulkarni",
      role: "Chief Financial Officer",
      company: "Apex Healthcare & Pharma Distribution (Pune)",
      avatarText: "NK",
      rating: 5,
      metric: "Saved ₹3.8 Lakhs in Expiry Waste",
      quote: "We manage 4 regional warehouses with over 3,000 medicine SKUs. The batch tracking and automated expiry warning alerts prevented dead inventory completely. The GSTR-2B auto-match matches 99.8% of vendor bills effortlessly.",
    },
    {
      name: "Vikramaditya Rathore",
      role: "Founder & Proprietor",
      company: "Rathore Electronics & Smart Appliances (Jaipur)",
      avatarText: "VR",
      rating: 5,
      metric: "Collected Overdues 14 Days Faster",
      quote: "The instant WhatsApp invoice with dynamic UPI QR code transformed our cash flow. Over 75% of B2B clients pay immediately through the link. It’s lightyears ahead of any old desktop billing system we used before.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <span>Customer Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Fast-Growing <span className="text-red-600">Enterprises Across India</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear how businesses are saving time, maximizing Input Tax Credit (ITC), and accelerating their revenue with our ERP platform.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-red-100 p-7 shadow-lg shadow-red-950/5 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Metric Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-red-700 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full">
                    {rev.metric}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-red-600/20 flex-shrink-0">
                  {rev.avatarText}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{rev.role}</div>
                  <div className="text-xs text-red-600 font-semibold">{rev.company}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Live Satisfaction Metrics Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Average Customer Rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">98.4%</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Annual Client Renewal Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">&lt; 2 Minutes</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Average Live Support Response</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">10,000+</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Active Indian Businesses</div>
          </div>
        </div>

      </div>
    </section>
  );
}
