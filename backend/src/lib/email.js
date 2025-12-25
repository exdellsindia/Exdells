
// Email notification helpers for Exdells Website
const nodemailer = require('nodemailer');

// Send admin notification email with lead details
async function sendLeadNotification(lead) {
  if (!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)) return;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const to = process.env.EMAIL_TO || process.env.SMTP_USER;
  const html = `
    <h2>New Lead Received</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Phone:</strong> ${lead.phone || '—'}</p>
    <p><strong>Email:</strong> ${lead.email || '—'}</p>
    <p><strong>City:</strong> ${lead.city || '—'}</p>
    <p><strong>Capacity:</strong> ${lead.capacity || '—'}</p>
    <p><strong>Notes:</strong><br/>${lead.notes ? lead.notes.replace(/\n/g, '<br/>') : '—'}</p>
    <p><strong>Opted in for Alerts:</strong> ${lead.optInAlerts ? '<span style="color:green;font-weight:bold">Yes</span>' : 'No'}</p>
    ${lead.attachment ? `<p><strong>Attachment:</strong> <a href="${lead.attachment}" target="_blank">Open</a></p>` : ''}
    <p style="font-size:0.85rem;color:#666">This is an automated notification from Exdells Website.</p>
  `;
  const mailOptions = {
    from,
    to,
    subject: `New Lead: ${lead.name} (${lead.city || 'N/A'})`,
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    // Email failure should not block lead creation
  }
}

// Send confirmation email to user
async function sendLeadConfirmation(lead) {
  if (!lead.email || !(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)) return;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const to = lead.email;
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px 16px;background:#f8fafc;border-radius:12px;">
      <h2 style="color:#0F4C81;">Thank you for contacting Exdells India Pvt. Ltd.</h2>
      <p>Dear ${lead.name},</p>
      <p>We have received your inquiry and our solar experts will reach out to you soon to help you go solar.</p>
      <ul style="color:#444;line-height:1.7;font-size:15px;">
        <li><strong>Name:</strong> ${lead.name}</li>
        <li><strong>Phone:</strong> ${lead.phone || '—'}</li>
        <li><strong>City:</strong> ${lead.city || '—'}</li>
        <li><strong>Capacity:</strong> ${lead.capacity || '—'}</li>
      </ul>
      <p style="margin-top:18px;">Thank you for choosing Exdells — powering a brighter, greener future!</p>
      <div style="margin-top:24px;font-size:13px;color:#888;">This is an automated confirmation. For urgent queries, call us at +91 89558 08315.</div>
    </div>
  `;
  const mailOptions = {
    from,
    to,
    subject: 'Thank you for contacting Exdells India Pvt. Ltd.',
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    // Email failure should not block lead creation
  }
}

// Export email helpers
module.exports = { sendLeadNotification, sendLeadConfirmation };