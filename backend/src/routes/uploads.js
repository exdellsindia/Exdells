// File upload routes for Exdells Website
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/uploads
// Handles single file upload
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Export router for use in server.js
module.exports = router;
const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2

// Simple endpoint to verify Cloudinary credentials and the upload path
router.post('/test', async (req, res) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: 'Server misconfiguration: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in backend .env' })
  }

  try {
    // a tiny 1x1 transparent PNG data URI
    const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAJpB0QAAAABJRU5ErkJggg=='
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'leads/tests', resource_type: 'image' })
    return res.json({ success: true, public_id: result.public_id, url: result.secure_url })
  } catch (err) {
    console.error('Cloudinary test upload failed:', err)
    return res.status(500).json({ error: 'Cloudinary upload failed', message: err.message })
  }
})

module.exports = router
