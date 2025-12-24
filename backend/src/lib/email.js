const nodemailer = require('nodemailer')

// Builds a transporter. Only supports SMTP (production-ready)
async function buildTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = Number(process.env.SMTP_PORT) || 587
    const secure = port === 465
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }
  console.warn('SMTP not configured. Email sending disabled.')
  return null
}

const formatLeadHtml = (lead) => {
  return `
    <h2>New Lead Received</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Phone:</strong> ${lead.phone || '—'}</p>
    <p><strong>Email:</strong> ${lead.email || '—'}</p>
    <p><strong>City:</strong> ${lead.city || '—'}</p>
    <p><strong>Capacity:</strong> ${lead.capacity || '—'}</p>
    <p><strong>Notes:</strong><br/>${lead.notes ? lead.notes.replace(/\n/g, '<br/>') : '—'}</p>
    ${lead.attachment ? `<p><strong>Attachment:</strong> <a href="${lead.attachment}" target="_blank">Open</a></p>` : ''}
    <p style="font-size:0.85rem;color:#666">This is an automated notification from Exdells Website.</p>
  `
}

async function sendLeadNotification(lead) {
  const transporter = await buildTransporter()
  if (!transporter) return

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com'
  const to = process.env.EMAIL_TO || process.env.SMTP_USER || 'no-reply@example.com'

  const mailOptions = {
    from,
    to,
    subject: `New Lead: ${lead.name} (${lead.city || 'N/A'})`,
    html: formatLeadHtml(lead)
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Lead notification email sent:', info.messageId)

    // No Ethereal/test preview in production
  } catch (err) {
    console.error('Failed to send lead notification email:', err)
    // don't throw — email failure should not block lead creation
  }
}

module.exports = { sendLeadNotification }