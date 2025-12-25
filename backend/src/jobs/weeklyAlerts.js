
// Scheduled job to send weekly WhatsFlows alerts to opted-in users
const cron = require('node-cron');
const { Lead } = require('../models');
const { sendUserSolarThankYou } = require('../lib/whatsflows');

function startWeeklyAlertsJob() {
  // Schedule: Every Monday at 10:00 AM IST
  cron.schedule('0 4 * * 1', async () => {
    try {
      // Find all leads who opted in for weekly alerts
      const leads = await Lead.findAll({ where: { optInAlerts: true } });
      for (const lead of leads) {
        // Send WhatsFlows thank you message
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

// Export job starter
module.exports = { startWeeklyAlertsJob };
