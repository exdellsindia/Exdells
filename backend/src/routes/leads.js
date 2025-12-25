const express = require('express')
const router = express.Router()
const { Lead } = require('../models')
const { sendLeadNotification } = require('../lib/email')

// Accept JSON body only (no file uploads)
router.post('/', async (req, res) => {
  console.log('Incoming /api/leads request', { body: req.body })

  try {
    const { name, phone, email, city, notes, capacity, optInAlerts } = req.body

    if (!name || name.length < 3) {
      return res.status(400).json({ error: 'Validation: name is required and should be at least 3 characters' })
    }


    const lead = await Lead.create({
      name,
      phone,
      email,
      city,
      notes,
      capacity,
      optInAlerts: !!optInAlerts
    })


    // Fire-and-forget: send notification email (admin) and confirmation email (user)
    try {
      sendLeadNotification(lead)
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr)
    }
    try {
      if (lead.email) {
        const { sendLeadConfirmation } = require('../lib/email');
        sendLeadConfirmation(lead);
      }
      if (lead.phone && lead.optInAlerts) {
        // WhatsFlows WhatsApp message
        const { sendWhatsFlowsMessage } = require('../lib/whatsflows');
        const userMsg = `Thank you, ${lead.name}, for contacting Exdells India Pvt. Ltd.! Our solar experts will reach out to you soon.\n- Exdells Team`;
        sendWhatsFlowsMessage(lead.phone, userMsg);
      }
    } catch (userAlertErr) {
      console.error('User confirmation alert failed (non-blocking):', userAlertErr)
    }

    res.status(201).json(lead)
  } catch (err) {
    console.error(err)
    // expose detailed error in dev for easier debugging
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ error: 'Server error', message: err.message, stack: err.stack })
    }
    res.status(500).json({ error: 'Server error' })
  }
})

// Simple test endpoint to create a lead quickly (no file required). Useful for verifying DB and email flows.
router.post('/test', async (req, res) => {
  try {
    const { name = 'Test Lead', phone = '', email = '', city = '', notes = '', capacity = '' } = req.body

    const lead = await Lead.create({ name, phone, email, city, notes, capacity, attachment: null })

    // Try to send notification (non-blocking)
    try {
      sendLeadNotification(lead)
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr)
    }

    res.status(201).json({ success: true, lead })
  } catch (err) {
    console.error('Test lead creation failed:', err)
    res.status(500).json({ error: 'Test lead creation failed', message: err.message })
  }
})

router.get('/', async (req, res) => {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] })
  res.json(leads)
})

module.exports = router
