// Weekly WhatsApp + Email Alerts (Cron Job)
const cron = require('node-cron');
const { Lead } = require('../models');
const { sendWeeklySolarUpdate } = require('../lib/whatsflows');
const { sendWeeklyAlertOptInEmail } = require('../lib/alertEmail');

let jobStarted = false;

function startWeeklyAlertsJob() {
  // Prevent duplicate cron on server restart
  if (jobStarted) {
    console.log('⚠️ Weekly alert cron already running');
    return;
  }
  jobStarted = true;

  // Every Monday at 10:00 AM IST
  cron.schedule(
    '0 10 * * 1',
    async () => {
      console.log('⏳ Weekly alert job started');

      try {
        // Only send to leads who opted in for alerts
        const leads = await Lead.findAll({
          where: {
            optInAlerts: true
          }
        });

        for (const lead of leads) {
          try {
            // 1️⃣ WhatsApp update
            if (lead.phone) {
              await sendWeeklySolarUpdate(
                lead.phone,
                lead.name
              );
            }
            // 2️⃣ Email fallback / support
            if (lead.email) {
              await sendWeeklyAlertOptInEmail(lead);
            }

            // (Optional) Add SMS logic here if needed

            // Delay to avoid rate limits
            await new Promise(r => setTimeout(r, 400));
          } catch (userErr) {
            console.error(
              `❌ Weekly alert failed for ${lead.email || lead.phone}:`,
              userErr.message
            );
          }
        }

        console.log(
          `✅ Weekly alerts sent to ${leads.length} users`
        );
      } catch (err) {
        console.error(
          '❌ Weekly alert cron job failed:',
          err.message
        );
      }
    }
  );

  console.log('✅ Weekly alert cron scheduled (Monday 10 AM IST)');
}

module.exports = { startWeeklyAlertsJob };
