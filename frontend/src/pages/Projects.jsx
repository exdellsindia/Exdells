import React from 'react'
import CTASection from '../components/CTASection'

const caseStudies = [
  {
    title: 'Jaipur Residence • 6 kW Hybrid',
    impact: '₹8,500 average monthly savings',
    detail: 'Mono PERC panels on RCC roof with hybrid inverter and battery-ready wiring. PM Surya Ghar subsidy disbursed in 42 days.',
    image: '/projects/solar1.jpg'
  },
  {
    title: 'Udaipur Hospital • 80 kW EPC',
    impact: '30% reduction in diesel genset usage',
    detail: 'Complete electrical audit, LT panel upgrade, and SCADA-integrated monitoring for facility administrators.',
    image: '/projects/solar2.jpg'
  },
  {
    title: 'Jodhpur School • 35 kW Rooftop',
    impact: 'Funded via EMI with 4-year payback',
    detail: 'Structured mounting on metal shed, child-safe wiring conduits, and annual maintenance program.',
    image: '/projects/solar3.jpg'
  }
]

const badges = ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Kota']

export default function Projects() {
  return (
    <div className="bg-white/80">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">Project gallery</p>
          <h1 className="mt-3 text-4xl font-semibold text-exdellsNavy">Solar & electrical installs engineered for Rajasthan.</h1>
          <p className="mt-4 text-lg text-slate-600">
            We treat every rooftop like an electrical project first. Site audits, structural checks, and compliance reviews
            happen before a single panel is mounted.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <span key={badge} className="rounded-full border border-exdellsBlue/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/80">
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="rounded-3xl border border-exdellsBlue/10 bg-white p-0 shadow-sm flex flex-col overflow-hidden">
              {study.image && (
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover object-center"
                  loading="lazy"
                />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">{study.title}</p>
                <p className="mt-3 text-lg font-semibold text-exdellsCharcoal">{study.impact}</p>
                <p className="mt-2 text-sm text-slate-600">{study.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="See it live"
        title="Book a site visit to any running Exdells project."
        description="Walk through an active residential, commercial, or institutional install with our engineers and speak directly with homeowners."
        primary={{ label: 'Schedule project tour', to: '/contact' }}
        secondary={{ label: 'Request case study PDF', href: 'mailto:info@exdells.com?subject=Case%20study%20request' }}
      />
    </div>
  )
}
