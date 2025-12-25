import React, { useState } from 'react'
import { api } from '../lib/api'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  capacity: '',
  notes: '',
  bill: '',
  optInAlerts: false
}

export default function LeadForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function normalizeError(err) {
    if (!err) return 'Unknown error'
    const status = err?.response?.status
    const data = err?.response?.data

    if (data) {
      if (typeof data === 'string') return status ? `(${status}) ${data}` : data
      if (typeof data === 'object') {
        if (data.message) return status ? `(${status}) ${data.message}` : data.message
        if (data.error) {
          if (typeof data.error === 'string') return status ? `(${status}) ${data.error}` : data.error
          if (data.error?.message) return status ? `(${status}) ${data.error.message}` : data.error.message
        }
        try {
          return status ? `(${status}) ${JSON.stringify(data)}` : JSON.stringify(data)
        } catch {
          return status ? `(${status}) Response contained circular data` : 'Response contained circular data'
        }
      }
    }

    const base = err?.message || 'An unknown error occurred'
    return status ? `(${status}) ${base}` : base
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      await api.post('/api/leads', { ...form }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 7000
      })
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('Submit error:', err)
      console.error('Server response data:', err?.response?.data)
      const serverMessage = normalizeError(err).slice(0, 500)
      setStatusMessage(serverMessage)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="max-w-2xl mx-auto bg-white/90 shadow-2xl rounded-3xl px-8 py-10 space-y-6 border border-exdellsBlue/10 backdrop-blur"
      onSubmit={submit}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Rakesh Sharma"
            className="mt-1 w-full rounded-xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+91 9X XXX XXXX"
            className="mt-1 w-full rounded-xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@email.com"
            className="mt-1 w-full rounded-xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">City</label>
          <input
            value={form.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Jaipur"
            className="mt-1 w-full rounded-xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
            required
          />
        </div>
      </div>

      {/* Monthly Electricity Bill */}
      <div>
        <label className="block text-sm font-bold text-exdellsNavy mb-2">Monthly Electricity Bill</label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            'Less than ₹1500',
            '₹1500 - ₹2500',
            '₹2500 - ₹4000',
            '₹4000 - ₹8000',
            'More than ₹8000',
          ].map((option) => (
            <label key={option} className="inline-flex items-center text-base font-medium text-exdellsNavy bg-exdellsBlue/5 px-3 py-1.5 rounded-full cursor-pointer hover:bg-exdellsBlue/10 transition">
              <input
                type="radio"
                name="bill"
                value={option}
                checked={form.bill === option}
                onChange={() => updateField('bill', option)}
                className="mr-2 accent-exdellsBlue"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">Approx. Capacity Needed</label>
        <select
          value={form.capacity}
          onChange={(e) => updateField('capacity', e.target.value)}
          className="mt-1 w-full rounded-xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
        >
          <option value="">Select range</option>
          <option value="1-3 kW">1-3 kW • Small homes</option>
          <option value="3-6 kW">3-6 kW • Villas / row houses</option>
          <option value="6-15 kW">6-15 kW • Commercial</option>
          <option value="15+ kW">15+ kW • Industrial</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.25em] text-exdellsBlue mb-1">Tell us more</label>
        <textarea
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Roof type, power backup needs, preferred timeline..."
          className="mt-1 w-full rounded-2xl border border-exdellsBlue/20 bg-white px-4 py-3 text-base text-exdellsNavy outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20 transition"
          rows={3}
        />
      </div>


      {/* Opt-in for weekly alerts */}
      <div className="flex items-center gap-3">
        <input
          id="optInAlerts"
          type="checkbox"
          checked={form.optInAlerts}
          onChange={e => updateField('optInAlerts', e.target.checked)}
          className="accent-exdellsBlue w-5 h-5 rounded focus:ring-exdellsBlue border border-exdellsBlue/30"
        />
        <label htmlFor="optInAlerts" className="text-base text-exdellsNavy select-none cursor-pointer">
          Opt in for weekly alerts via SMS, WhatsApp and Email to stay updated on our platform.
        </label>
      </div>

      <button
        className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-exdellsBlue to-exdellsGold px-8 py-3 text-base font-bold text-white shadow-lg transition hover:shadow-brand-glow hover:from-exdellsNavy hover:to-exdellsOrange disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Book a Free Site Visit'}
      </button>

      {status === 'success' && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-5 text-center text-base text-green-900 shadow-lg animate-fade-in">
          <svg className="mx-auto mb-2" width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="font-bold text-lg mb-1">Thank you for your interest!</div>
          <div className="mb-1">We've received your details and our solar experts will contact you soon to help you go solar.</div>
          <div className="text-sm text-green-700">We appreciate your trust in Exdells India Pvt. Ltd. — powering a brighter, greener future.</div>
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div>Something went wrong. Please call +91 96943 26431 or try again.</div>
          {statusMessage && <div className="mt-1 text-xs text-red-600">{statusMessage}</div>}
        </div>
      )}
    </form>
  )
}
