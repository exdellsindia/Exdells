const express = require('express')
const router = express.Router()
const { Lead } = require('../models')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({ storage })

router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const { name, phone, email, city, notes, capacity } = req.body
    const attachment = req.file ? req.file.filename : null
    const lead = await Lead.create({ name, phone, email, city, notes, capacity, attachment })
    res.json(lead)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/', async (req, res) => {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] })
  res.json(leads)
})

module.exports = router
