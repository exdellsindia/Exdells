import React from 'react'

export default function ServiceCard({ title, desc, badge, bullets = [] }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-slate-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-exdellsBlue/40 hover:shadow-2xl">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-exdellsBlue/10 to-exdellsOrange/5" />
      <div className="relative">
        {badge && (
          <span className="inline-flex items-center rounded-full bg-exdellsOrange/15 px-3 py-1 text-xs font-semibold text-exdellsOrange">
            {badge}
          </span>
        )}
        <h3 className="mt-4 text-xl font-semibold text-exdellsNavy">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{desc}</p>
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-exdellsBlue"></span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-exdellsBlue/10 blur-2xl" />
    </article>
  )
}
