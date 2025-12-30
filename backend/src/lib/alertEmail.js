const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// WEEKLY ALERT OPT-IN
async function sendWeeklyAlertOptInEmail(lead) {
  if (!lead.email) return;
  try {
    await sgMail.send({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: "Weekly Solar Alerts Enabled! ☀️",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;background:#f8fafc;border-radius:12px">
          <h2 style="color:#0F4C81;">Weekly Solar Alerts Enabled</h2>
          <p>Dear ${lead.name},</p>
          <p>You are now subscribed to weekly solar tips, updates & offers from Exdells.</p>
          <p>You can unsubscribe anytime.</p>
          <small>Team Exdells | +91 89558 08315</small>
        </div>
      `
    });
    console.log("✅ Weekly alert opt-in email sent");
  } catch (err) {
    console.error("❌ Weekly alert email failed:", err.message);
  }
}

// ONE-TIME ALERT
async function sendOneTimeAlertEmail(lead) {
  if (!lead.email) return;
  try {
    await sgMail.send({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: "Solar Alert from Exdells 🌞",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;background:#f8fafc;border-radius:12px">
          <h2 style="color:#0F4C81;">Solar Alert</h2>
          <p>Dear ${lead.name},</p>
          <p>Thank you for your interest in solar solutions. We’ll keep you updated.</p>
          <small>Exdells India Pvt. Ltd.</small>
        </div>
      `
    });
    console.log("✅ One-time alert email sent");
  } catch (err) {
    console.error("❌ One-time alert email failed:", err.message);
  }
}

module.exports = {
  sendWeeklyAlertOptInEmail,
  sendOneTimeAlertEmail
};
