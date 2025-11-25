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
  const [attachment, setAttachment] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      if (attachment) {
        formData.append('attachment', attachment)
      }
      await axios.post('/api/leads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setStatus('success')
      setForm(initialForm)
      setAttachment(null)
    } catch (err) {
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

      <div>
        <label className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Attach bill / rooftop photo (optional)
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
          className="mt-1 w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-white px-3 py-3 text-[0.9rem] text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-exdellsBlue/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-exdellsBlue hover:border-exdellsBlue/50"
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
          Something went wrong. Please call +91 96943 26431 or try again.
        </div>
      )}
    </form>
  )
}
