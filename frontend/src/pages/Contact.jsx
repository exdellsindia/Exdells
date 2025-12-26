import React from 'react'
import LeadForm from '../components/LeadForm'
import CTASection from '../components/CTASection'

const contactInfo = [
  { label: 'Phone / WhatsApp', value: '+91 89558 08315', link: 'tel:+918955808315' },
  { label: 'Email', value: 'info@exdells.com', link: 'mailto:info@exdells.com' },
  { label: 'Service Hours', value: '10:00 AM – 7:00 PM (Mon–Sat)' }
]

const offices = [
  { title: 'Registered Office', detail: 'C-98, Royal City, Kalwar Road, Jaipur, Rajasthan 302012' },
  { title: 'Corporate Office', detail: '2nd Floor, A2, Garima Tower, Niwaru Road, Jaipur, Rajasthan 302012' }
]

export default function Contact() {
  return (
    <div className="bg-white/80">
      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">Contact Exdells</p>
          <h1 className="text-4xl font-semibold text-exdellsNavy">Talk to our Jaipur command desk.</h1>
          <p className="text-lg text-slate-600">
            Share your rooftop photo, DISCOM bill, or current electrical load. Our concierge team responds within 30
            minutes with savings, payback, and subsidy timelines.
          </p>

          <div className="rounded-3xl border border-exdellsBlue/15 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/80">Contact details</p>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              {contactInfo.map((info) => (
                <div key={info.label}>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{info.label}</p>
                  {info.link ? (
                    <a href={info.link} className="text-lg font-semibold text-exdellsCharcoal">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-exdellsCharcoal">{info.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-exdellsOrange/30 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsOrange/80">Office addresses</p>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              {offices.map((office) => (
                <div key={office.title}>
                  <p className="text-sm font-semibold text-exdellsCharcoal">{office.title}</p>
                  <p>{office.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-exdellsBlue/15 to-exdellsSky/10 blur-3xl" />
          <div className="relative rounded-[32px] border border-exdellsBlue/20 bg-white p-8 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">Write to us</p>
            <h2 className="mt-3 text-2xl font-semibold text-exdellsCharcoal">Request a callback</h2>
            <p className="mt-2 text-sm text-slate-600">
              Our engineers respond within 30 minutes during service hours. Share as much detail as possible for an
              accurate plan.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Prefer meeting in person?"
        title="Visit our Jaipur experience center."
        description="Book a slot to see hardware options, compare inverters, and finalize subsidy paperwork alongside our engineering team."
        primary={{ label: 'Book in-person meet', to: '/contact' }}
        secondary={{ label: 'Get directions', href: 'https://maps.google.com/?q=2nd+Floor,+A2,+Garima+Tower,+Niwaru+Road,+Jaipur,+Rajasthan+302012' }}
      />
    </div>
  )
}
