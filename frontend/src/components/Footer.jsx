import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Residential Solar', to: '/services' },
  { label: 'Commercial EPC', to: '/projects' },
  { label: 'PM Surya Ghar Subsidy', to: '/subsidy' },
  { label: 'Blog', to: '/blog' }
]

const offices = [
  {
    title: 'Head Office',
    detail: 'C-98, Royal City, Kalwar Road, Jaipur, Rajasthan 302012'
  },
  {
    title: 'Branch Office',
    detail: '2nd Floor, A2, Garima Tower, Niwaru Road, Jaipur, Rajasthan 302012'
  }
]

const MiniLogo = ({ className = '' }) => (
  <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="footerSun" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FAD961" />
        <stop offset="100%" stopColor="#F7941D" />
      </linearGradient>
      <linearGradient id="footerPanel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F4C81" />
        <stop offset="100%" stopColor="#053860" />
      </linearGradient>
    </defs>
    <circle cx="210" cy="80" r="45" fill="url(#footerSun)" />
    <path d="M20 170h240l-90 60H-30z" fill="url(#footerPanel)" />
    <path d="M30 170h230" stroke="#5EB0FF" strokeWidth="6" />
    <path d="M70 170V210M120 170V210M170 170V210M220 170V210" stroke="#5EB0FF" strokeWidth="6" />
  </svg>
)

const BRAND_LOGO_SRC = '/brand-logo.png'
const LOGO_SIZE = 48

export default function Footer() {
  const [useCustomLogo, setUseCustomLogo] = useState(true)

  return (
    <footer className="bg-[#020b16] text-white">
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-[18px]" style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
              {useCustomLogo ? (
                <img
                  src={BRAND_LOGO_SRC}
                  alt="Exdells logo"
                  className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                  onError={() => setUseCustomLogo(false)}
                />
              ) : (
                <MiniLogo className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
              )}
            </div>
            <div>
              <span className="text-lg font-semibold tracking-wide">EXDELLS</span>
              <span className="block text-xs uppercase tracking-[0.35em] text-exdellsGold">Electrical &amp; Solar</span>
            </div>
          </div>
          <p className="text-sm text-white/70">
            MNRE-certified electrical &amp; solar contractor providing rooftop EPC, subsidy desks, EV wiring, and AMC
            care across Rajasthan.
          </p>
          <p className="text-sm text-white/60">150+ installs • 4.9/5 customer rating • 24x7 support line</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/80 hover:text-exdellsGold transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Contact</p>
          <div className="mt-4 text-sm space-y-2 text-white/80">
            <p>
              Phone:{' '}
              <a href="tel:+918955808315" className="text-exdellsGold font-semibold">
                +91 89558 08315
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@exdells.com" className="text-exdellsGold font-semibold">
                info@exdells.com
              </a>
            </p>
            <p>Service Hours: 9:00 AM – 8:00 PM IST</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Offices</p>
          <div className="mt-4 space-y-4 text-sm text-white/80">
            {offices.map((office) => (
              <div key={office.title}>
                <p className="font-medium text-white">{office.title}</p>
                <p className="text-white/70">{office.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Exdells India Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  )
}
