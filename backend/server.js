require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { sequelize } = require('./src/models')
const path = require('path')

const authRoutes = require('./src/routes/auth')
const leadRoutes = require('./src/routes/leads')
const projectRoutes = require('./src/routes/projects')

const app = express()
app.use(helmet())
// allow configurable CORS origin via env; default to allowing all origins for dev
const corsOptions = { origin: process.env.CORS_ORIGIN || true }
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/projects', projectRoutes)

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({error: 'Server error'})
})

const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connected')

    // In development allow sequelize to alter schema for convenience.
    // In production, do not use sync({ alter: true }); use migrations instead.
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true })
      console.log('DB synced (alter)')
    }

    app.listen(PORT, () => console.log('Server running on', PORT))
  } catch (err) {
    console.error('DB connection failed', err)
    process.exit(1)
  }
}

startServer()
