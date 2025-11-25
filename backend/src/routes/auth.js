const express = require('express')
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res)=>{
  const { name, email, password } = req.body
  if(!email || !password) return res.status(400).json({error:'Missing'})
  const existing = await User.findOne({ where: { email } })
  if(existing) return res.status(400).json({error:'User exists'})
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash: hash })
  res.json({ id: user.id })
})

router.post('/login', async (req, res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if(!user) return res.status(400).json({error:'Invalid'})
  const ok = await bcrypt.compare(password, user.passwordHash)
  if(!ok) return res.status(400).json({error:'Invalid'})
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
  res.json({ token })
})

module.exports = router
