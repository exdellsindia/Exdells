// Footer component for Exdells Website
// Displays contact info, quick links, and brand logo
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Quick links for navigation
const quickLinks = [
  { label: 'Residential Solar', to: '/services' },
  { label: 'Commercial EPC', to: '/projects' },
  { label: 'PM Surya Ghar Subsidy', to: '/subsidy' },
  { label: 'Blog', to: '/blog' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' }
];

// Office locations
const offices = [
  {
    title: 'Head Office',
    detail: 'C-98, Royal City, Kalwar Road, Jaipur, Rajasthan 302012'
  },
  {
    title: 'Branch Office',
    detail: '2nd Floor, A2, Garima Tower, Niwaru Road, Jaipur, Rajasthan 302012'
  }
];

// Mini logo SVG for footer
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
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/p/Exdells-India-Pvt-Ltd-61566876756077" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="rounded-full bg-[#1877f2] shadow-lg p-2 hover:scale-110 hover:bg-[#145db2] transition-all duration-200">
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://instagram.com/exdells" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 shadow-lg p-2 hover:scale-110 hover:from-pink-600 hover:to-yellow-500 transition-all duration-200">
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406 2.697 2.387 2.403 3.499 2.344 4.78 2.285 6.06 2.272 6.469 2.272 12c0 5.531.013 5.94.072 7.22.059 1.281.353 2.393 1.334 3.374.981.981 2.093 1.275 3.374 1.334 1.28.059 1.689.072 7.22.072s5.94-.013 7.22-.072c1.281-.059 2.393-.353 3.374-1.334.981-.981 1.275-2.093 1.334-3.374.059-1.28.072-1.689.072-7.22s-.013-5.94-.072-7.22c-.059-1.281-.353-2.393-1.334-3.374C19.393.425 18.281.131 17 .072 15.719.013 15.31 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/exdells-india" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="rounded-full bg-[#0077b5] shadow-lg p-2 hover:scale-110 hover:bg-[#005983] transition-all duration-200">
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
            </a>
            <a href="https://x.com/ExdellsPvt" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="rounded-full bg-[#1da1f2] shadow-lg p-2 hover:scale-110 hover:bg-[#147bb8] transition-all duration-200">
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
          </div>
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
            <p>Service Hours: 10:00 AM – 7:00 PM IST</p>
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
