// backend/src/jobs/weeklyAlerts.js
// Sends weekly WhatsFlows alerts to all users who opted in

const cron = require('node-cron');
const { Lead } = require('../models');
const { sendUserSolarThankYou } = require('../lib/whatsflows');

function startWeeklyAlertsJob() {
  // Every Monday at 10:00 AM IST (adjust as needed)
  cron.schedule('0 4 * * 1', async () => {
    try {
      const leads = await Lead.findAll({ where: { optInAlerts: true } });
      for (const lead of leads) {
        await sendUserSolarThankYou(lead.phone, lead.name);
      }
      console.log(`Weekly WhatsFlows alerts sent to ${leads.length} users.`);
    } catch (err) {
      console.error('Weekly WhatsFlows alert job failed:', err);
    }
  }, {
    timezone: 'Asia/Kolkata'
  });
}

module.exports = { startWeeklyAlertsJob };
