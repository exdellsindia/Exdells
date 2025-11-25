import React from 'react'
import { Link } from 'react-router-dom'

export default function CTASection({
  eyebrow = 'Ready to go solar?',
  title = 'Book a free site visit with Exdells engineers.',
  description = 'Share your rooftop photo or electricity bill and we will revert with savings, subsidy roadmap, and EMI options within 30 minutes.',
  primary = { label: 'Book Consultation', to: '/contact' },
  secondary = { label: 'Call +91 96943 26431', href: 'tel:+919694326431' }
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[36px] border border-exdellsBlue/20 bg-gradient-to-br from-exdellsMidnight via-exdellsNavy to-exdellsSlate p-10 text-white shadow-[0_40px_80px_rgba(4,43,73,0.35)]">
          <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-exdellsOrange/30 blur-3xl" />
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-exdellsSky/30 blur-3xl" />
          <div className="relative space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">{eyebrow}</p>
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-white/80">{description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {primary && primary.to && (
                <Link
                  to={primary.to}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-6 py-3 text-sm font-semibold text-exdellsNavy shadow-brand-glow"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <a
                  href={secondary.href || '#'}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

