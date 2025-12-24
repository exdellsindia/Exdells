// Vercel Serverless Function: /api/leads
// Accepts JSON POST with: { name, phone, email, city, notes, capacity }
// Behavior:
// - If BACKEND_URL is set, forwards the payload to `${BACKEND_URL}/api/leads` (saves to DB)
// - Otherwise, sends an email to EMAIL_TO using SendGrid (SENDGRID_API_KEY) or SMTP (SMTP_* env vars)


const BACKEND_URL = process.env.BACKEND_URL || process.env.VITE_API_BASE_URL || 'https://exdells-1.onrender.com'

module.exports = async (req, res) => {
  if (req.method !== 'POST') { 
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  let payload = (req.body && Object.keys(req.body).length) ? req.body : null
  if (!payload) {
    const raw = typeof req.body === 'string' ? req.body : ''
    if (raw && raw.trim()) {
      try {
        payload = JSON.parse(raw)
      } catch {}
    }
  }
  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ error: 'Invalid or empty JSON body' })
  }
  const { name, phone, email, city, notes, capacity } = payload
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ error: 'Validation: name is required (min 3 chars)' })
  }
  try {
    const target = `${BACKEND_URL.replace(/\/$/, '')}/api/leads`
    const r = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, city, notes, capacity })
    })
    if (!r.ok) {
      const text = await r.text()
      return res.status(502).json({ error: 'Failed to save lead to backend', status: r.status, body: text })
    }
    const created = await r.json()
    return res.status(201).json({ success: true, saved: true, details: created })
  } catch (err) {
    return res.status(500).json({ error: 'Serverless error', message: err.message })
  }
}
