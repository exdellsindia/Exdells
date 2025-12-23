require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/leads');
const projectRoutes = require('./src/routes/projects');
const chatRoutes = require('./src/routes/chat');

const app = express();
app.use(helmet());
app.use(express.json());

// ---------- CORS FIX ----------
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://exdellsindia.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
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

// ---------- ROOT ROUTE (Fix “Cannot GET /”) ----------
app.get('/', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Exdells API is running successfully 🚀",
    docs: "/api"
  });
});

// ---------- HEALTH CHECK (Render internal ping) ----------
app.get('/health', (req, res) => {
  res.status(200).send("OK");
});

// ---------- ROUTES ----------
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chat', chatRoutes);

// ---------- STATIC UPLOADS ----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
  // Log full stack for debugging
  console.error("SERVER ERROR:", err.stack || err);

  // Return detailed error in non-production for debugging convenience
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }

  // Production-safe response
  res.status(500).json({ error: 'Server Error' });
});

// ---------- PORT ----------
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✔ Database Connected");

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log("✔ DB Synced (dev mode)");
    } else {
      console.log("✔ Production Mode - DB Sync Disabled");
    }

    app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();
