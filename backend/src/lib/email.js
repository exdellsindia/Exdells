const nodemailer = require('nodemailer');

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

module.exports = { sendLeadNotification };