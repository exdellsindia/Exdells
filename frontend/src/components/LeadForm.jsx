import React, { useState } from 'react'
import axios from 'axios'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  capacity: '',
  notes: ''
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
      await axios.post('/api/leads', { ...form }, { headers: { 'Content-Type': 'application/json' } })
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
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Rakesh Sharma"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
            required
          />
        </div>
        <div>
          <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+91 9X XXX XXXX"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
            required
          />
        </div>
        <div>
          <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@email.com"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
          />
        </div>
        <div>
          <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">City</label>
          <input
            value={form.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Jaipur"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Approx. Capacity Needed</label>
        <select
          value={form.capacity}
          onChange={(e) => updateField('capacity', e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
        >
          <option value="">Select range</option>
          <option value="1-3 kW">1-3 kW • Small homes</option>
          <option value="3-6 kW">3-6 kW • Villas / row houses</option>
          <option value="6-15 kW">6-15 kW • Commercial</option>
          <option value="15+ kW">15+ kW • Industrial</option>
        </select>
      </div>

      <div>
        <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Tell us more</label>
        <textarea
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Roof type, power backup needs, preferred timeline..."
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[0.95rem] text-black outline-none focus:border-exdellsBlue focus:ring-2 focus:ring-exdellsBlue/20"
          rows={3}
        />
      </div>



      <button
        className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-exdellsOrange to-exdellsGold px-6 py-3 text-sm font-semibold text-exdellsNavy transition hover:shadow-brand-glow disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Book a Free Site Visit'}
      </button>

      {status === 'success' && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thank you! Our Jaipur team will call you within 30 minutes.
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
