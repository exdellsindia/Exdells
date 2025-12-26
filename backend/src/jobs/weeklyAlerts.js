// Scheduled job to send weekly WhatsApp updates via WhatsFlows
const cron = require('node-cron');
const { Lead } = require('../models');
const { sendWeeklySolarUpdate } = require('../lib/whatsflows');

function startWeeklyAlertsJob() {
  // Every Monday at 10:00 AM IST
  cron.schedule(
    '0 10 * * 1',
    async () => {
      try {
        const leads = await Lead.findAll({
          where: {
            consent: true,
            subscribed: true
          }
        });

        for (const lead of leads) {
          await sendWeeklySolarUpdate(
            lead.phone,
            lead.name
          );

          // small delay to avoid API rate limit
          await new Promise(r => setTimeout(r, 300));
        }

        console.log(
          `✅ Weekly WhatsApp updates sent to ${leads.length} users`
        );
      } catch (err) {
        console.error(
          '❌ Weekly WhatsApp alert job failed:',
          err
        );
      }
    },
    {
      timezone: 'Asia/Kolkata'
    }
  );
}

module.exports = { startWeeklyAlertsJob };
