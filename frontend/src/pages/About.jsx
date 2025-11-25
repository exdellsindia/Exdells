import React from 'react'
import CTASection from '../components/CTASection'

const stats = [
  { label: 'Projects Energized', value: '150+' },
  { label: 'Years of Expertise', value: '15' },
  { label: 'Avg. Customer Rating', value: '4.9/5' },
  { label: 'Govt. Certifications', value: 'MNRE, DISCOM' }
]

const pillars = [
  {
    title: 'Electrical DNA',
    desc: 'We began as an electrical contracting firm in Jaipur, which means every solar project is engineered with wiring, load balancing, and safety in mind.'
  },
  {
    title: 'Subsidy-first Approach',
    desc: 'Dedicated coordinators manage PM Surya Ghar paperwork, inspections, and DISCOM submissions so you never chase forms.'
  },
  {
    title: 'Service & AMC Culture',
    desc: 'From cleaning to inverter health checks, our AMC desk and WhatsApp support group keep performance on track.'
  }
]

const timeline = [
  { year: '2012', detail: 'Started as Exdells Electricals serving residential and commercial wiring projects across Rajasthan.' },
  { year: '2016', detail: 'First 50 kW rooftop EPC with remote monitoring and first DISCOM net-metering integration.' },
  { year: '2020', detail: 'Recognized as MNRE vendor; launched subsidy desk and EV-ready solar packages.' },
  { year: '2024', detail: 'Expanded to Jaipur, Jodhpur, Udaipur with in-house maintenance teams and 24x7 helpline.' }
]

export default function About() {
  return (
    <div className="bg-white/70">
      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-exdellsBlue/70">Who we are</p>
          <h1 className="text-4xl font-semibold text-exdellsNavy">
            Electrical roots. Solar obsession. Rajasthan’s trusted rooftop partner.
          </h1>
          <p className="text-lg text-slate-600">
            Exdells India Pvt. Ltd. blends MNRE-certified solar EPC, licensed electrical contracting, and concierge-level
            subsidy support to help homes and businesses adopt clean energy with confidence.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-exdellsBlue/15 bg-white/80 p-5 shadow-sm">
                <div className="text-3xl font-semibold text-exdellsBlue">{item.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-exdellsOrange/30 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8 shadow-xl">
          <h3 className="text-2xl font-semibold text-exdellsCharcoal">Our pillars</h3>
          <div className="mt-6 space-y-6">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-exdellsOrange/80">{pillar.title}</p>
                <p className="mt-2 text-sm text-slate-700">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/80 py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsCharcoal/70">Journey</p>
          <h2 className="mt-3 text-3xl font-semibold text-exdellsNavy">From electrical experts to solar specialists.</h2>
          <div className="mt-10 space-y-6 border-l-2 border-exdellsBlue/30 pl-6">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-7 top-1.5 h-3 w-3 rounded-full bg-exdellsBlue"></span>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-exdellsBlue/80">{item.year}</p>
                <p className="mt-1 text-base text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Still exploring?"
        title="Schedule a strategy call with our engineering lead."
        description="Walk through your property’s electrical layout, discuss subsidy status, and lock installation timelines tailored to your family or business."
      />
    </div>
  )
}
