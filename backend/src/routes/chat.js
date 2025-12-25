const express = require('express')
const router = express.Router()
const axios = require('axios')

// POST /api/chat
// body: { message: string, messages?: [{role, content}] }
// Chatbot API route (stub)
// This endpoint handles incoming chat messages and integrates with an AI service.
router.post('/', async (req, res) => {
  // Extract message and optional messages array from request body
  try {
    const { message, messages } = req.body
    if (!message && (!Array.isArray(messages) || messages.length === 0)) {
      return res.status(400).json({ error: 'Missing message' })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'AI key not configured' })

    // Build a simple text prompt from conversation messages
    let prompt = ''
    if (Array.isArray(messages) && messages.length) {
      prompt = messages.map(m => `${m.role || 'user'}: ${m.content}`).join('\n') + '\n'
    }
    prompt += `user: ${message || ''}`

    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${apiKey}`
    const body = {
      prompt: { text: prompt },
      temperature: 0.2,
      maxOutputTokens: 512
    }

    const r = await axios.post(url, body, { timeout: 60000 })
    const data = r.data || {}

    // Try a few common response shapes from generative APIs
    const reply =
      data?.candidates?.[0]?.output ||
      data?.candidates?.[0]?.content?.map(c => c?.text || '').join('') ||
      data?.output ||
      (typeof data === 'string' ? data : JSON.stringify(data))

    res.json({ reply })
  } catch (err) {
    console.error('Chat proxy error', err?.response?.data || err.message)
    res.status(500).json({ error: 'AI request failed' })
  }
})

// Export router for use in server.js
module.exports = router
