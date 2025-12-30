const axios = require('axios');

const WF_API_URL = 'https://graph.facebook.com/v19.0/704852016046522/messages';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

async function sendWhatsFlowsTemplate(phone, template, params = []) {
  if (!phone || !template) return;

  const formattedPhone = phone.replace(/\D/g, '');

  try {
    const res = await axios.post(
      WF_API_URL,
      {
        messaging_product: 'whatsapp',
        to: formattedPhone,
        type: 'template',
        template: {
          name: template,
          language: { code: 'en_US' },
          components: params
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error(
      'WhatsFlows Template API error:',
      err.response?.data || err.message
    );
  }
}

// Send a plain WhatsFlows message (text, not template)
async function sendWhatsFlowsMessage(phone, message) {
  if (!phone || !message) return;
  const formattedPhone = phone.replace(/\D/g, '');
  try {
    const res = await axios.post(
      WF_API_URL,
      {
        messaging_product: 'whatsapp',
        to: formattedPhone,
        type: 'text',
        text: {
          body: message
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error(
      'WhatsFlows Message API error:',
      err.response?.data || err.message
    );
  }
}

// Instant thank you (can stay text-based)
async function sendUserSolarThankYou(phone, name) {
  const msg = `Thank you, ${name}, for reaching out to Exdells India Pvt. Ltd.!
Our solar experts will contact you soon.
- Exdells Solar Team`;
  return sendWhatsFlowsMessage(phone, msg);
}

// Weekly update (TEMPLATE – SAFE)
async function sendWeeklySolarUpdate(phone, name) {
  return sendWhatsFlowsTemplate(
    phone,
    'exdells_weekly_update',
    [name]
  );
}

module.exports = {
  sendWeeklySolarUpdate,
  sendUserSolarThankYou,
  sendWhatsFlowsMessage
};
