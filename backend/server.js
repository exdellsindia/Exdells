require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./src/models');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/leads');
const projectRoutes = require('./src/routes/projects');

const app = express();
app.use(helmet());

// --- FIXED CORS FOR PRODUCTION ---
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,                 // from Render ENV
  'https://exdellsindia.vercel.app'         // your live frontend
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow no-origin requests (e.g. mobile apps / curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS blocked: ' + origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Render gives PORT
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Sync only in DEV
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('DB synced (alter)');
    }

    app.listen(PORT, () => console.log('Server running on', PORT));
  } catch (err) {
    console.error('DB connection failed', err);
    process.exit(1);
  }
};

startServer();