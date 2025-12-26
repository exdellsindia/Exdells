const nodemailer = require('nodemailer');

function createTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

// ADMIN ALERT EMAIL
async function sendLeadNotification(lead) {
  const transporter = createTransporter();
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Lead: ${lead.name} (${lead.city || 'N/A'})`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Phone:</strong> ${lead.phone || '—'}</p>
        <p><strong>Email:</strong> ${lead.email || '—'}</p>
        <p><strong>City:</strong> ${lead.city || '—'}</p>
        <p><strong>Capacity:</strong> ${lead.capacity || '—'}</p>
        <p><strong>Notes:</strong><br/>${lead.notes || '—'}</p>
        <hr/>
        <small>This is an automated alert from Exdells Website.</small>
      `
    });
    console.log("✅ Admin lead alert sent");
  } catch (err) {
    console.error("❌ Admin email failed:", err.message);
  }
}

// USER WELCOME EMAIL
async function sendLeadConfirmation(lead) {
  if (!lead.email) return;
  const transporter = createTransporter();
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: "Thank you for contacting Exdells India Pvt. Ltd.",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;background:#f8fafc;border-radius:12px">
          <h2 style="color:#0F4C81;">Thank you for contacting Exdells</h2>
          <p>Dear ${lead.name},</p>
          <p>We have received your inquiry. Our solar experts will contact you shortly.</p>
          <ul>
            <li><b>Phone:</b> ${lead.phone || '—'}</li>
            <li><b>City:</b> ${lead.city || '—'}</li>
            <li><b>Capacity:</b> ${lead.capacity || '—'}</li>
          </ul>
          <p>🌞 Team Exdells</p>
          <small>For urgent queries: +91 89558 08315</small>
        </div>
      `
    });
    console.log("✅ User welcome email sent");
  } catch (err) {
    console.error("❌ User email failed:", err.message);
  }
}

module.exports = { sendLeadNotification, sendLeadConfirmation };
