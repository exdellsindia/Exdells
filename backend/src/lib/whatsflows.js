// backend/src/lib/whatsflows.js
// Send WhatsApp message using WhatsFlows API
const axios = require('axios');

const WF_API_URL = 'https://crmapi.whatsflows.com/api/v2/send-message';
const WF_API_KEY = process.env.WHATSFLOWS_API_KEY || 'ZXhkZWxsc2luZGlhMUBnbWFpbC5jb20';

async function sendWhatsFlowsMessage(phone, message) {
  if (!phone || !message) return;
  try {
    const res = await axios.post(WF_API_URL, {
      phone: phone.replace(/^\+/, ''), // WhatsFlows expects phone without +
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

module.exports = { sendWhatsFlowsMessage };
