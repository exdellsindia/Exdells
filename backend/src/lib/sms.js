// backend/src/lib/sms.js
// Twilio SMS/WhatsApp integration for user confirmation alerts
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsFrom = process.env.TWILIO_SMS_FROM; // e.g. '+1xxxxxxxxxx' or your Twilio number
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+1xxxxxxxxxx'

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

async function sendUserSMS(phone, name) {
  if (!client || !smsFrom || !phone) return;
  const body = `Thank you, ${name}, for contacting Exdells India Pvt. Ltd.! Our solar experts will reach out to you soon.\n- Exdells Team`;
  try {
    await client.messages.create({
      body,
      from: smsFrom,
      to: phone.startsWith('+') ? phone : `+91${phone}`
    });
  } catch (err) {
    // Log but do not block
    console.error('Twilio SMS error:', err.message);
  }
}

async function sendUserWhatsApp(phone, name) {
  if (!client || !whatsappFrom || !phone) return;
  const body = `Thank you, ${name}, for contacting Exdells India Pvt. Ltd.! Our solar experts will reach out to you soon.\n- Exdells Team`;
  try {
    await client.messages.create({
      body,
      from: whatsappFrom,
      to: phone.startsWith('whatsapp:') ? phone : `whatsapp:+91${phone.replace(/^\+?91/, '')}`
    });
  } catch (err) {
    // Log but do not block
    console.error('Twilio WhatsApp error:', err.message);
  }
}

module.exports = { sendUserSMS, sendUserWhatsApp };
