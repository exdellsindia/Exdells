import React from 'react'
import CTASection from '../components/CTASection'

const articles = [
  {
    title: 'PM Surya Ghar: 5 Steps to Secure Your ₹78,000 Subsidy',
    excerpt: 'Understand timelines, required documents, approval checkpoints, and how Exdells keeps your application on track.',
    tag: 'Subsidy',
    readTime: '6 min read'
  },
  {
    title: 'Solar + EV: Wiring Up Your Home for the Next Decade',
    excerpt: 'Learn how to future-proof your electrical panel, select the right inverter, and enable EV chargers without voltage drops.',
    tag: 'Electrical',
    readTime: '5 min read'
  },
  {
    title: 'Maintenance Playbook: Keeping Panels at 99% Uptime',
    excerpt: 'Cleaning checklists, inverter health signals, and when to call the Exdells AMC team.',
    tag: 'Maintenance',
    readTime: '4 min read'
  }
]

export default function Blog() {
  return (
    <div className="bg-white/80">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-exdellsBlue/70">Resources & Blog</p>
          <h1 className="mt-3 text-4xl font-semibold text-exdellsNavy">Expert guides for Rajasthan homeowners & businesses.</h1>
          <p className="mt-4 text-lg text-slate-600">
            Bookmark this space for policy updates, maintenance tips, and electrical insights from the Exdells engineering
            desk.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="rounded-3xl border border-exdellsBlue/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-exdellsBlue/80">{article.tag}</p>
              <h3 className="mt-3 text-xl font-semibold text-exdellsCharcoal">{article.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">{article.readTime}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Have a question we haven’t covered?"
        title="Ask Exdells anything about solar, subsidy, or electrical upgrades."
        description="Send us your query and we will publish a personalized response plus share it with our community."
        primary={{ label: 'Submit a question', to: '/contact' }}
        secondary={{ label: 'Email content team', href: 'mailto:info@exdells.com?subject=Blog%20question' }}
      />
    </div>
  )
}
