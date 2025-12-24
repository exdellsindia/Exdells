import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import LeadForm from '../components/LeadForm'

const services = [
  {
    title: 'Residential Rooftop Solar',
    desc: '1–15 kW turnkey systems with smart monitoring and 25-year performance warranty.',
    badge: 'Most popular',
    bullets: ['Net-metering & subsidy filing', 'Tier-1 mono PERC panels', 'Battery-ready design']
  },
  {
    title: 'Commercial & Industrial EPC',
    desc: 'Large-scale plants for schools, hospitals, factories, and warehouses with O&M contracts.',
    bullets: ['Dedicated project manager', 'On-site safety & compliance', 'Generation guarantees']
  },
  {
    title: 'Subsidy & Financing Desk',
    desc: 'PM Surya Ghar paperwork, MNRE guidelines, and EMI assistance through NBFC partners.',
    bullets: ['₹78,000 subsidy support', '0-cost paperwork', 'Preferred NBFC partners']
  }
]

const steps = [
  {
    title: 'Schedule a free survey',
    desc: 'We map your rooftop, shadows, and load profile to create a production report.'
  },
  {
    title: 'Receive a custom proposal',
    desc: 'Transparent pricing with subsidy eligibility, EMI options, and payback timeline.'
  },
  {
    title: 'Installation & net metering',
    desc: 'Certified engineers deliver a neat install, quality checks, and DISCOM approvals.'
  },
  {
    title: 'Subsidy disbursement & care',
    desc: 'We handle every document and stay on call for maintenance, AMC, and support.'
  }
]

const testimonials = [
  {
    quote: '“I saved ₹70,000 already and haven’t paid a DISCOM bill in months. They even trained my family to use the monitoring app.”',
    name: 'Rakesh Sharma',
    city: 'Jaipur'
  },
  {
    quote: '“Exdells team took care of surveys, installation, and subsidy approval. It felt effortless and very professional.”',
    name: 'Meena Verma',
    city: 'Bikaner'
  }
]

const trustBadges = [
  'Government Authorized Vendor',
  'MNRE Certified Engineers',
  'Preferred Partner for Rajasthan DISCOMs'
]

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <Hero />

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-full border border-exdellsBlue/20 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/80 shadow-sm"
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-6">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsCharcoal/70">
            Tailored solar stack
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Residential, commercial, and subsidy assistance under one roof.
          </h2>
          <p className="text-base text-slate-600 md:text-lg">
            Transparent proposals, Tier-1 hardware, and AMC-ready designs engineered for Rajasthan weather.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border border-exdellsBlue/15 bg-white p-8 shadow-2xl shadow-slate-200/60">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">PM Surya Ghar Yojana</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-900">₹78,000 subsidy made simple.</h3>
            <p className="mt-3 text-slate-600">
              From DISCOM registration to final subsidy disbursement, Exdells keeps the paperwork, follow-ups, and site
              compliance on track so you receive benefits quickly.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li>• Dedicated subsidy coordinators in Jaipur and Bikaner</li>
              <li>• Daily tracking dashboard shared with your family</li>
              <li>• Optional EMI starting ₹2,499/month with partner NBFCs</li>
            </ul>
            <Link
              to="/subsidy"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-exdellsBlue to-exdellsSky px-6 py-3 text-sm font-semibold text-white shadow-brand-glow"
            >
              Learn how subsidy works
            </Link>
          </div>
          <div className="rounded-[32px] border border-exdellsOrange/40 bg-gradient-to-br from-orange-50 via-yellow-50 to-white p-8">
            <h4 className="text-xl font-semibold text-exdellsCharcoal">Clean energy, zero stress.</h4>
            <p className="mt-2 text-slate-700">
              You get a dedicated WhatsApp group with the project manager, site engineer, and subsidy coordinator.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold text-exdellsCharcoal">48 hrs</p>
                <p className="text-sm text-slate-600">Average installation time after material reaches site</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-exdellsCharcoal">25 yrs</p>
                <p className="text-sm text-slate-600">Panel performance warranty with service support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">4-step process</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-900">From first call to subsidy disbursement.</h3>
            <p className="mt-3 text-slate-600">
              Our on-ground team coordinates with DISCOM, MNRE portals, and your family to keep progress visible at each
              milestone.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-exdellsBlue/15 bg-slate-50/70 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Step {index + 1}
                </div>
                <h4 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50/70">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">Testimonials</p>
            <h3 className="mt-3 text-3xl font-semibold text-exdellsNavy">Rajasthan families trusting Exdells.</h3>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-3xl border border-exdellsBlue/15 bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)]"
              >
                <p className="text-lg text-slate-800">{testimonial.quote}</p>
                <div className="mt-6 text-sm font-semibold text-exdellsCharcoal">
                  {testimonial.name} • {testimonial.city}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70 text-center">FAQs</p>
          <h3 className="mt-3 text-3xl font-semibold text-exdellsNavy text-center">Questions we answer every week.</h3>
          <div className="mt-10 space-y-4">
            {[
              {
                question: 'How long does installation take once I confirm?',
                answer:
                  'Site survey happens within 24 hours. After material reaches the location, our engineers complete installation, testing, and net-metering documentation within 48 hours on average.'
              },
              {
                question: 'Do you manage PM Surya Ghar paperwork end-to-end?',
                answer:
                  'Yes. Exdells registers you on the MNRE portal, arranges DISCOM inspections, uploads geo-tagged photos, and tracks subsidy disbursement until the amount reaches your bank account.'
              },
              {
                question: 'Can I get EMI along with subsidy benefits?',
                answer:
                  'Absolutely. We coordinate with partner NBFCs so your EMI plan and subsidy timelines align, meaning you start saving from the first bill cycle even while repayments are active.'
              }
            ].map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-exdellsBlue/15 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer text-lg font-semibold text-exdellsCharcoal flex items-center justify-between">
                  {faq.question}
                  <span className="text-exdellsBlue text-sm font-bold group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-exdellsMidnight via-exdellsSlate to-black py-20 text-white">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Talk to Exdells
            </span>
            <h3 className="text-4xl font-semibold leading-tight text-white">
              Speak with our solar concierge and get a tailored plan in 30 minutes.
            </h3>
            <p className="text-lg text-white/75">
              Share your address, rooftop photo, and latest DISCOM bill. Weʼll reply with savings, payback timeline, and
              subsidy roadmap curated for your household or business.
            </p>

            <div className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">Connect instantly</p>
                <div className="mt-3 text-xl font-semibold">
                  <a href="tel:+919694326431" className="text-exdellsYellow">+91 89558 08315</a>
                </div>
                <p className="text-sm text-white/70">Call or WhatsApp (9:00 AM – 8:00 PM)</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Email</p>
                  <a href="mailto:info@exdells.com" className="mt-1 block text-lg font-semibold text-white">
                    info@exdells.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Visit</p>
                  <p className="mt-1 text-sm text-white/80">
                    2nd Floor, A2, Garima Tower, Niwaru Road <br /> Jaipur, Rajasthan 302012
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="absolute -top-8 right-6 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Consultation form
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  )
}
