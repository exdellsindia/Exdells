const axios = require('axios');

const WF_API_URL = 'https://crmapi.whatsflows.com/api/v1/message/send';
const WF_API_KEY = process.env.WHATSFLOWS_API_KEY;

async function sendWhatsFlowsTemplate(phone, template, params = []) {
  if (!phone || !template) return;

  const formattedPhone = phone.replace(/\D/g, '');

  try {
    const res = await axios.post(
      WF_API_URL,
      {
        phone: formattedPhone,
        template_name: template,
        broadcast_name: template,
        parameters: params
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': WF_API_KEY
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
  sendUserSolarThankYou
};
