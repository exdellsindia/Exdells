// backend/src/lib/whatsflows.js
// Send WhatsApp message using WhatsFlows API
const axios = require('axios');

const WF_API_URL = 'https://crmapi.whatsflows.com/api/v1/send-message';
const WF_API_KEY = process.env.WHATSFLOWS_API_KEY;

if (!WF_API_KEY) {
  console.warn('⚠️  WHATSFLOWS_API_KEY environment variable is not set. WhatsFlows messages will fail.');
}

// Send WhatsApp and SMS via WhatsFlows after form submission
async function sendWhatsFlowsMessage(phone, message) {
  if (!phone || !message) return;
  try {
    // WhatsFlows expects phone as 91XXXXXXXXXX (no +, no spaces)
    const formattedPhone = phone.replace(/\D/g, '');
    const res = await axios.post(WF_API_URL, {
      phone: formattedPhone,
      message
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': WF_API_KEY
      }
    });
    return res.data;
  } catch (err) {
    console.error('WhatsFlows API error:', err.response?.data || err.message);
  }
}

// Helper to send a solar-branded thank you message to the user
async function sendUserSolarThankYou(phone, name) {
  const msg = `Thank you, ${name}, for reaching out to Exdells India Pvt. Ltd.!\nOur solar experts will contact you soon to help you save with solar energy.\n- Exdells Solar Team`;
  await sendWhatsFlowsMessage(phone, msg);
}

module.exports = { sendWhatsFlowsMessage, sendUserSolarThankYou };
