const nodemailer = require('nodemailer')

// Builds a transporter. If SMTP env vars are missing and we're in development,
// create an Ethereal test account and return a transporter for testing.
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

  if (process.env.NODE_ENV !== 'production') {
    console.warn('SMTP not configured. Creating Ethereal test account for dev email testing...')
    const testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
  }

  console.warn('SMTP not configured and is production. Email sending disabled.')
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

    // If using Ethereal, also log the preview URL so developer can view the message
    const testPreview = nodemailer.getTestMessageUrl(info)
    if (testPreview) {
      console.log('Ethereal preview URL:', testPreview)
    }
  } catch (err) {
    console.error('Failed to send lead notification email:', err)
    // don't throw — email failure should not block lead creation
  }
}

module.exports = { sendLeadNotification }