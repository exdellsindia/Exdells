import React from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'

const steps = [
  { title: 'Eligibility & Survey', detail: 'Share your DISCOM bill + rooftop details. We confirm subsidy slab and prepare a production report.' },
  { title: 'Portal Registration', detail: 'Exdells registers you on PM Surya Ghar/MNRE portal, secures approval, and books the required capacity.' },
  { title: 'Installation & Inspection', detail: 'Our engineers install the system, capture geo-tagged photos, and coordinate DISCOM inspection.' },
  { title: 'Subsidy Disbursement', detail: 'We upload documents, track payment status daily, and hand over the subsidy receipt once funds arrive.' }
]

const documents = ['Latest DISCOM bill', 'Property proof or tax receipt', 'Aadhaar and PAN', 'Cancelled cheque or bank passbook']

export default function Subsidy() {
  return (
    <div className="bg-white/80">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">PM Surya Ghar</p>
          <h1 className="text-4xl font-semibold text-exdellsNavy">₹78,000 subsidy simplified with Exdells.</h1>
          <p className="text-lg text-slate-600">
            Our subsidy desk handles registrations, inspections, disbursements, and EMI coordination so your family focuses on the benefits—not the paperwork.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-6 py-3 text-sm font-semibold text-exdellsNavy shadow-brand-glow"
          >
            Book subsidy consultation
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-exdellsBlue/15 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/80">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-exdellsCharcoal">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/80 py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsCharcoal/70">Documents checklist</p>
            <h2 className="mt-2 text-3xl font-semibold text-exdellsNavy">Keep these handy for smooth approval.</h2>
            <ul className="mt-6 space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-exdellsBlue"></span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-exdellsOrange/30 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsOrange/80">EMI & financing</p>
            <h3 className="mt-2 text-2xl font-semibold text-exdellsCharcoal">Pay as low as ₹2,499/month.</h3>
            <p className="mt-3 text-slate-600">
              We integrate EMI plans with subsidy timelines so you enjoy savings from day one. Our NBFC partners handle doorstep KYC with minimal paperwork.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-3xl font-semibold text-exdellsCharcoal">0%</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Processing fee on select plans</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-exdellsCharcoal">72 hrs</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Average loan approval timeline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need subsidy support?"
        title="Speak to Exdells subsidy desk before applying."
        description="We will verify your documents, register you on the portal, and share a live tracker until the disbursement hits your bank."
        primary={{ label: 'Talk to subsidy expert', to: '/contact' }}
        secondary={{ label: 'WhatsApp subsidy desk', href: 'https://wa.me/8955808315' }}
      />
    </div>
  )
}
