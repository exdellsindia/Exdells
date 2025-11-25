require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/leads');
const projectRoutes = require('./src/routes/projects');

const app = express();
app.use(helmet());
app.use(express.json());

// ---------- CORS FIX ----------
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://exdellsindia.vercel.app',   // YOUR FRONTEND
  process.env.FRONTEND_URL             // RENDER ENV
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);        // allow mobile clients
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error('Blocked by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);

// ---------- ROUTES ----------
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);

// ---------- STATIC UPLOADS ----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(500).json({ error: 'Server Error' });
});

// ---------- PORT (Render gives automatically) ----------
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✔ Database Connected");

    // ❗ IMPORTANT: Do NOT sync DB in production
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log("✔ DB Synced (dev mode)");
    } else {
      console.log("✔ Production Mode - DB Sync Disabled");
    }

    app.listen(PORT, () => console.log("🚀 Server running on PORT:", PORT));
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();
