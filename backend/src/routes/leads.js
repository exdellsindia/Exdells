
// Lead routes for Exdells Website
const express = require('express');
const router = express.Router();
const { Lead } = require('../models');
const { sendLeadNotification } = require('../lib/email');

// POST /api/leads
// Handles new lead form submissions
router.post('/', async (req, res) => {
  console.log('Incoming /api/leads request', { body: req.body });

  try {
    // Destructure and validate incoming data
    const { name, phone, email, city, notes, capacity, optInAlerts } = req.body;
    if (!name || name.length < 3) {
      return res.status(400).json({ error: 'Validation: name is required and should be at least 3 characters' });
    }

    // Create new lead in database
    const lead = await Lead.create({
      name,
      phone,
      email,
      city,
      notes,
      capacity,
      optInAlerts: !!optInAlerts
    });

    // Send admin notification email (contains all user details)
    try {
      sendLeadNotification(lead);
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr);
    }

    // Send user confirmation and alert emails
    try {
      if (lead.email) {
        // Standard confirmation email
        const { sendLeadConfirmation } = require('../lib/email');
        sendLeadConfirmation(lead);
        // Weekly alert opt-in or one-time alert email
        const { sendWeeklyAlertOptInEmail, sendOneTimeAlertEmail } = require('../lib/alertEmail');
        if (lead.optInAlerts) {
          sendWeeklyAlertOptInEmail(lead);
        } else {
          sendOneTimeAlertEmail(lead);
        }
      }
      // WhatsFlows WhatsApp message to user (thank you)
      if (lead.phone) {
        const { sendUserSolarThankYou } = require('../lib/whatsflows');
        sendUserSolarThankYou(lead.phone, lead.name);
      }
      // WhatsFlows WhatsApp message to admin with lead data
      if (process.env.WHATSFLOWS_ADMIN_PHONE) {
        const { sendWhatsFlowsMessage } = require('../lib/whatsflows');
        const adminMsg = `New Lead Received:\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nCity: ${lead.city}\nCapacity: ${lead.capacity}\nNotes: ${lead.notes}`;
        sendWhatsFlowsMessage(process.env.WHATSFLOWS_ADMIN_PHONE, adminMsg);
      }
    } catch (userAlertErr) {
      console.error('User confirmation alert failed (non-blocking):', userAlertErr);
    }

    // Respond with created lead
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    // Expose detailed error in dev for easier debugging
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ error: 'Server error', message: err.message, stack: err.stack });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/leads/test
// Simple test endpoint to create a lead quickly (no file required)
router.post('/test', async (req, res) => {
  try {
    const { name = 'Test Lead', phone = '', email = '', city = '', notes = '', capacity = '' } = req.body;
    const lead = await Lead.create({ name, phone, email, city, notes, capacity, attachment: null });
    // Try to send notification (non-blocking)
    try {
      sendLeadNotification(lead);
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr);
    }
    res.status(201).json({ success: true, lead });
  } catch (err) {
    console.error('Test lead creation failed:', err);
    res.status(500).json({ error: 'Test lead creation failed', message: err.message });
  }
});

// GET /api/leads
// Returns all leads (admin use)
router.get('/', async (req, res) => {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
  res.json(leads);
});

// Export router for use in server.js
module.exports = router;
