const express = require('express')
const router = express.Router()
const { Project } = require('../models')

router.get('/', async (req, res)=>{
  const projects = await Project.findAll({ order: [['createdAt','DESC']] })
  res.json(projects)
})

router.post('/', async (req, res)=>{
  const { title, city, size_kw, image, notes } = req.body
  const p = await Project.create({ title, city, size_kw, image, notes })
  res.json(p)
})

module.exports = router
