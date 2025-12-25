// Hero section for Exdells Website
// Displays main headline, highlights, and call-to-action buttons
import React from 'react';
import { Link } from 'react-router-dom';

// Key highlights for hero section
const highlights = [
  { label: 'Projects Delivered', value: '150+' },
  { label: 'Govt. Approvals', value: '15' },
  { label: 'Customer Rating', value: '4.9/5' }
];

// Hero image URL
const heroImage =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80&sat=-20';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-exdellsMidnight via-exdellsNavy to-exdellsSlate py-24 text-white">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-exdellsOrange/30 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-exdellsSky/30 blur-[120px]" />
      </div>
      <div className="relative container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Electrical &amp; Solar Contractor
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            Power homes &amp; businesses with MNRE-certified solar plus expert electrical care.
          </h1>
          <p className="text-lg text-white/80">
            Exdells brings the Jaipur sun indoors with rooftop EPC, subsidy desks, EV-ready wiring, and AMC plans backed
            by licensed engineers.
          </p>
          {/* Call-to-action buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-8 py-3 text-sm font-semibold text-exdellsNavy shadow-brand-glow transition hover:-translate-y-0.5"
            >
              Book a Free Site Visit
            </Link>
            <Link
              to="/subsidy"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore Subsidy Support
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm animate-float"
              >
                <div className="text-3xl font-semibold text-exdellsGold">{item.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 shadow-2xl animate-float">
          <img src={heroImage} alt="Solar rooftop installation" className="h-80 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="relative p-6 space-y-4 text-sm text-white/90">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-exdellsGold"></span>
              Signature Exdells installation with mono PERC panels, hybrid inverter, and EV-ready wiring.
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-exdellsGold"></span>
              360º service stack: structural audit, subsidy paperwork, and AMC response in &lt;24 hrs.
            </div>
            <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
              <div className="text-sm uppercase tracking-[0.35em] text-white/60">PM Surya Ghar</div>
              <div className="mt-1 text-2xl font-semibold text-exdellsGold">₹78,000 subsidy ready</div>
              <p className="mt-2 text-white/70">Exdells files, follows up, and hands over subsidy receipt transparently.</p>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/20 bg-white/10 animate-pulse-ring" />
        </div>
      </div>
    </section>
  )
}
