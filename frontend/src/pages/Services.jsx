import React from 'react'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'

const offerings = [
  {
    title: 'Residential Rooftop Solar',
    desc: '1–15 kW turnkey systems with mono PERC panels, smart monitoring, and optional battery backup.',
    badge: 'MNRE Approved',
    bullets: ['Subsidy filing & DISCOM coordination', 'Hybrid-ready inverter', 'Site-specific shading report']
  },
  {
    title: 'Commercial & Industrial EPC',
    desc: '50 kW to multi-MW solar plants for factories, schools, hospitals, and hospitality groups.',
    badge: 'Dedicated PM',
    bullets: ['Structural + electrical audit', 'Performance ratio guarantees', 'On-site safety compliance']
  },
  {
    title: 'Electrical & EV Works',
    desc: 'Internal wiring, load balancing, LT panel upgrades, and EV charger-ready infrastructure.',
    bullets: ['Certified electricians', 'Harmonics and protection study', 'Annual maintenance contracts']
  }
]

const addOns = [
  {
    title: 'AMC & Pro Care',
    detail: '24/7 helpline, quarterly cleaning, inverter health reports, and spares on priority.'
  },
  {
    title: 'Financing & EMI',
    detail: 'Partnered NBFCs with 0-cost paperwork and doorstep documentation pick-up.'
  },
  {
    title: 'Monitoring Suite',
    detail: 'Central dashboard, WhatsApp alerts, and family training for energy app usage.'
  }
]

export default function Services() {
  return (
    <div className="bg-white/80">
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">What we deliver</p>
          <h1 className="mt-3 text-4xl font-semibold text-exdellsNavy">Electrical + Solar packages under one roof.</h1>
          <p className="mt-4 text-lg text-slate-600">
            From rooftop EPC to EV-ready wiring, Exdells handles design, paperwork, installation, and lifetime care.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {offerings.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50/80 py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsCharcoal/70">Add-on services</p>
            <h2 className="mt-2 text-3xl font-semibold text-exdellsNavy">Keep performance high, hassle low.</h2>
            <p className="mt-4 text-slate-600">
              Blend any of our add-on modules with your solar project or electrical contract to keep compliance and
              maintenance centralized with one team.
            </p>
            <ul className="mt-6 space-y-4">
              {addOns.map((item) => (
                <li key={item.title} className="rounded-2xl border border-exdellsBlue/15 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-exdellsBlue/80">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-exdellsOrange/30 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsOrange/80">Execution process</p>
            <h3 className="mt-3 text-2xl font-semibold text-exdellsCharcoal">Survey → Proposal → Install → Care</h3>
            <p className="mt-4 text-slate-600">
              Expect a field engineer visit within 24 hours, digital proposal with subsidy savings, and a dedicated
              project manager until net-metering + handover is complete.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-3xl font-semibold text-exdellsCharcoal">48 hrs</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Install timeline once material arrives</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-exdellsCharcoal">25 yrs</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Panel performance backed by AMC plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need a custom scope?"
        title="Talk to the Exdells project desk about your rooftop or facility."
        description="Share CAD drawings, load lists, or energy bills—we will craft a service stack across EPC, electrical upgrades, and AMC."
        primary={{ label: 'Plan my project', to: '/contact' }}
        secondary={{ label: 'Call project desk', href: 'tel:+918955808315' }}
      />
    </div>
  )
}
