// backend/src/lib/alertEmail.js
// Sends alert emails for weekly alert opt-in or one-time alert
const nodemailer = require('nodemailer');

async function sendWeeklyAlertOptInEmail(lead) {
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
      <h2 style="color:#0F4C81;">Weekly Solar Alerts Enabled!</h2>
      <p>Dear ${lead.name},</p>
      <p>Thank you for subscribing to weekly solar alerts from Exdells India Pvt. Ltd. You will now receive helpful tips, updates, and offers every week.</p>
      <p style="margin-top:18px;">You can unsubscribe anytime by replying to this email.</p>
      <div style="margin-top:24px;font-size:13px;color:#888;">This is an automated confirmation. For urgent queries, call us at +91 89558 08315.</div>
    </div>
  `;
  const mailOptions = {
    from,
    to,
    subject: 'Weekly Solar Alerts Enabled! - Exdells India Pvt. Ltd.',
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {}
}

async function sendOneTimeAlertEmail(lead) {
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
      <h2 style="color:#0F4C81;">Solar Alert from Exdells</h2>
      <p>Dear ${lead.name},</p>
      <p>Thank you for your interest in solar energy. You will receive important updates and offers from Exdells India Pvt. Ltd.</p>
      <div style="margin-top:24px;font-size:13px;color:#888;">This is a one-time alert. For urgent queries, call us at +91 89558 08315.</div>
    </div>
  `;
  const mailOptions = {
    from,
    to,
    subject: 'Solar Alert - Exdells India Pvt. Ltd.',
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {}
}

module.exports = { sendWeeklyAlertOptInEmail, sendOneTimeAlertEmail };
