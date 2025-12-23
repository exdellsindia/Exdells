const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { Lead } = require('../models')
const { sendLeadNotification } = require('../lib/email')

// Configure Cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Use memory storage so we can upload the buffer to Cloudinary
const upload = multer({ storage: multer.memoryStorage() })

// Helper to upload buffer to Cloudinary (returns secure_url)
const uploadBufferToCloudinary = async (fileBuffer, mimetype) => {
  // Convert to data URI
  const dataUri = `data:${mimetype};base64,${fileBuffer.toString('base64')}`
  const result = await cloudinary.uploader.upload(dataUri, { folder: 'leads' })
  return result.secure_url
}

// Accept multipart/form-data (with optional file) or JSON body
router.post('/', upload.single('attachment'), async (req, res) => {
  // Debug: log incoming request body and file presence
  console.log('Incoming /api/leads request', { body: req.body, hasFile: !!req.file })

  try {
    const { name, phone, email, city, notes, capacity } = req.body

    if (!name || name.length < 3) {
      return res.status(400).json({ error: 'Validation: name is required and should be at least 3 characters' })
    }

    let attachmentUrl = null

    // If client sent a file (multipart/form-data), upload it to Cloudinary
    if (req.file) {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return res.status(500).json({ error: 'Server misconfiguration: CLOUDINARY_* env vars are required for file uploads' })
      }

      attachmentUrl = await uploadBufferToCloudinary(req.file.buffer, req.file.mimetype)
    } else if (req.body.attachment) {
      // If client sent a string URL for attachment, accept it
      attachmentUrl = req.body.attachment
    }

    const lead = await Lead.create({
      name,
      phone,
      email,
      city,
      notes,
      capacity,
      attachment: attachmentUrl || null
    })

    // Fire-and-forget: send notification email (do not block response)
    try {
      sendLeadNotification(lead)
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr)
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

router.get('/', async (req, res) => {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] })
  res.json(leads)
})

module.exports = router


router.get('/', async (req, res) => {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] })
  res.json(leads)
})

module.exports = router
