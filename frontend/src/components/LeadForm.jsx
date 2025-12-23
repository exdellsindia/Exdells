import React, { useState } from 'react'
import axios from 'axios'
import { uploadFileToFirebase } from '../lib/firebase'

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
  const [statusMessage, setStatusMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Firebase config and helper
  const firebaseConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_PROJECT_ID && !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET

  const uploadToFirebase = async (file) => {
    if (!firebaseConfigured) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_STORAGE_BUCKET')
    }
    return uploadFileToFirebase(file)
  }

  // Cloudinary (client-side) fallback
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  const cloudConfigured = !!cloudName && !!uploadPreset

  const uploadToCloudinary = async (file) => {
    if (!cloudConfigured) {
      throw new Error('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET')
    }
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', uploadPreset)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: data
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.error?.message || 'Cloudinary upload failed')
    return json.secure_url
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
      // Prevent submission if a file is attached but neither Firebase nor Cloudinary is configured
      if (attachment && !firebaseConfigured && !cloudConfigured) {
        setStatusMessage('File uploads are disabled. Remove attachment or configure Firebase Storage (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET) or Cloudinary (VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET).')
        setStatus('error')
        setLoading(false)
        return
      }

      let payload = { ...form }

      if (attachment) {
        // Prefer Firebase client-side upload; fall back to Cloudinary, then to server multipart upload if CORS or other client upload fails
        try {
          let url
          if (firebaseConfigured) {
            try {
              url = await uploadToFirebase(attachment)
            } catch (firebaseErr) {
              // Likely CORS or rules issue — attempt server-side JSON data-URI upload first, then multipart if needed
              console.warn('Firebase upload failed, attempting server-side data-URI fallback:', firebaseErr)

              // Quick check: ensure backend is reachable before converting a potentially-large file
              try {
                await axios.get('/health', { timeout: 2000 })
              } catch (pingErr) {
                console.warn('Backend health check failed, skipping server fallback:', pingErr)
                setStatusMessage('Backend is not reachable. Try submitting without an attachment, or start the backend (cd backend && npm run dev).')
                setStatus('error')
                setLoading(false)
                return
              }

              // Convert file to data URI
              const fileToDataUrl = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = (e) => reject(e)
                reader.readAsDataURL(file)
              })

              let dataUri
              try {
                dataUri = await fileToDataUrl(attachment)
              } catch (convErr) {
                console.error('File -> dataURI conversion failed:', convErr)
                throw firebaseErr // allow outer handler to process
              }

              try {
                // POST JSON with data URI attachment; backend will upload it to Cloudinary server-side
                await axios.post('/api/leads', { ...payload, attachment: dataUri })

                setStatus('success')
                setForm(initialForm)
                setAttachment(null)
                setStatusMessage('Submitted (uploaded via server fallback).')
                return
              } catch (backendErr) {
                console.warn('Server-side data-URI fallback failed, will attempt multipart:', backendErr)
                // If server-side JSON fails, try multipart as a last resort
                try {
                  const fd = new FormData()
                  Object.entries(payload).forEach(([k, v]) => fd.append(k, v || ''))
                  fd.append('attachment', attachment)

                  // Let Axios set the Content-Type and boundary automatically
                  await axios.post('/api/leads', fd)

                  setStatus('success')
                  setForm(initialForm)
                  setAttachment(null)
                  setStatusMessage('Submitted (uploaded via server fallback).')
                  return
                } catch (multipartErr) {
                  console.error('Backend multipart fallback failed:', multipartErr)

                  // Distinguish network / unreachable server vs server error
                  if (multipartErr?.request && !multipartErr?.response) {
                    setStatusMessage('Server unreachable: your backend is not running or not reachable at /api. Start the backend (cd backend && npm run dev) or deploy the API. You can still submit without an attachment.')
                  } else {
                    setStatusMessage(normalizeError(multipartErr).slice(0, 500))
                  }

                  setStatus('error')
                  setLoading(false)
                  return
                }
              }
            }
          } else {
            url = await uploadToCloudinary(attachment)
          }

          // If we get a URL from client upload, attach it to the JSON payload
          if (url) payload.attachment = url
        } catch (uploadErr) {
          console.error('File upload failed:', uploadErr)
          setStatusMessage('File upload failed. You can try again without an attachment or contact support.')
          setStatus('error')
          setLoading(false)
          return
        }
      }

      await axios.post('/api/leads', payload, { headers: { 'Content-Type': 'application/json' } })


      setStatus('success')
      setForm(initialForm)
      setAttachment(null)
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
        {(!firebaseConfigured && !cloudConfigured) && (
          <div className="mt-2 text-xs text-yellow-700">⚠️ File upload disabled: configure Firebase Storage or Cloudinary to enable attachments. Add <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_PROJECT_ID</code>, and <code>VITE_FIREBASE_STORAGE_BUCKET</code> (or <code>VITE_CLOUDINARY_CLOUD_NAME</code> and <code>VITE_CLOUDINARY_UPLOAD_PRESET</code>) to your frontend environment and restart the dev server.</div>
        )}
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
