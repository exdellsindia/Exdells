// Vercel Serverless Function: /api/leads
// Accepts JSON POST with: { name, phone, email, city, notes, capacity }
// Behavior:
// - If BACKEND_URL is set, forwards the payload to `${BACKEND_URL}/api/leads` (saves to DB)
// - Otherwise, sends an email to EMAIL_TO using SendGrid (SENDGRID_API_KEY) or SMTP (SMTP_* env vars)

const sendgrid = (() => {
  try {
    return require('@sendgrid/mail')
  } catch (e) {
    return null
  }
})()

const nodemailer = (() => {
  try {
    return require('nodemailer')
  } catch (e) {
    return null
  }
})()

const BACKEND_URL = process.env.BACKEND_URL
const EMAIL_TO = process.env.EMAIL_TO || 'info@exdells.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@exdells.com'

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const payload = (req.body && Object.keys(req.body).length) ? req.body : null
  if (!payload) {
    return res.status(400).json({ error: 'Invalid or empty JSON body' })
  }

  const { name, phone, email, city, notes, capacity } = payload
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ error: 'Validation: name is required (min 3 chars)' })
  }

  try {
    // If BACKEND_URL is configured, forward to backend to persist to DB and trigger server-side flows
    if (BACKEND_URL) {
      const target = `${BACKEND_URL.replace(/\/$/, '')}/api/leads`
      const r = await fetch(target, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, city, notes, capacity })
      })

      if (!r.ok) {
        const text = await r.text()
        console.error('Forward to backend failed:', r.status, text)
        return res.status(502).json({ error: 'Failed to save lead to backend', status: r.status, body: text })
      }

      const created = await r.json()
      return res.status(201).json({ success: true, saved: true, details: created })
    }

    // No backend configured -> send email directly
    // Prefer SendGrid if available
    if (process.env.SENDGRID_API_KEY && sendgrid) {
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: EMAIL_TO,
        from: EMAIL_FROM,
        subject: `New lead from ${name} — ${city || 'N/A'}`,
        html: `<p><strong>${name}</strong> (${phone || '—'})<br/>${email || '—'} — ${city || '—'}</p><p>${notes || '—'}</p>`
      }
      await sendgrid.send(msg)
      return res.status(201).json({ success: true, emailed: true })
    }

    // Fallback: SMTP via nodemailer
    if (nodemailer && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = Number(process.env.SMTP_PORT) || 587
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      })

      const info = await transport.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New lead from ${name} — ${city || 'N/A'}`,
        html: `<p><strong>${name}</strong> (${phone || '—'})<br/>${email || '—'} — ${city || '—'}</p><p>${notes || '—'}</p>`
      })

      console.log('Email sent via SMTP:', info.messageId)
      return res.status(201).json({ success: true, emailed: true })
    }

    return res.status(500).json({ error: 'No email provider configured. Set SENDGRID_API_KEY or SMTP_* env vars, or set BACKEND_URL to forward leads to your backend.' })
  } catch (err) {
    console.error('Serverless /api/leads error:', err)
    return res.status(500).json({ error: 'Server error', message: err.message })
  }
}
