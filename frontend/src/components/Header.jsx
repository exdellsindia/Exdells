import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/subsidy', label: 'Subsidy' },
  { path: '/blog', label: 'Blog' }
]

const LogoMark = ({ className = '' }) => (
  <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="sunset" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FAD961" />
        <stop offset="50%" stopColor="#F7941D" />
        <stop offset="100%" stopColor="#FF5E3A" />
      </linearGradient>
      <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F4C81" />
        <stop offset="100%" stopColor="#053860" />
      </linearGradient>
    </defs>
    <path
      d="M70 120c30-40 70-60 110-60 38 0 73 18 96 45"
      stroke="url(#sunset)"
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="220" cy="70" r="45" fill="url(#sunset)" opacity="0.8" />
    <path d="M40 170h240l-80 60H0z" fill="url(#panel)" />
    <path d="M35 170h240" stroke="#5EB0FF" strokeWidth="6" />
    <path d="M80 170V210M130 170V210M180 170V210M230 170V210" stroke="#5EB0FF" strokeWidth="6" />
    <circle cx="60" cy="60" r="20" fill="#FFB347" opacity="0.3" />
  </svg>
)

const BRAND_LOGO_SRC = '/brand-logo.png'
const LOGO_SIZE = 56

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [useCustomLogo, setUseCustomLogo] = useState(true)

  const renderNavLinks = (className = '') =>
    navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => setOpen(false)}
        className={`text-sm font-medium tracking-wide transition duration-200 ${
          pathname === item.path ? 'text-exdellsGold' : 'text-white/80 hover:text-exdellsGold'
        } ${className}`}
      >
        {item.label}
      </Link>
    ))

  return (
    <header className="sticky top-0 z-50 bg-exdellsNavy/90 backdrop-blur-md border-b border-white/10 text-white shadow-xl shadow-black/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center rounded-[18px]" style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
              {useCustomLogo ? (
                <img
                  src={BRAND_LOGO_SRC}
                  alt="Exdells logo"
                  className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                  onError={() => setUseCustomLogo(false)}
                />
              ) : (
                <LogoMark className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
              )}
            </div>
            <div className="leading-tight">
              <span className="text-xl font-semibold tracking-wide">EXDELLS</span>
              <span className="block text-xs uppercase tracking-[0.35em] text-exdellsGold">
                Electrical &amp; Solar
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">{renderNavLinks()}</nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-5 py-2 text-sm font-semibold text-exdellsNavy shadow-brand-glow transition hover:scale-105"
            >
              Book Energy Audit
            </Link>
            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-6 bg-white transition ${open ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-6 flex flex-col gap-4 border-t border-white/10 pt-4">
            {renderNavLinks('text-base')}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-5 py-2 text-sm font-semibold text-exdellsNavy text-center"
            >
              Book Energy Audit
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
