// Start weekly WhatsFlows alerts job
const { startWeeklyAlertsJob } = require('./src/jobs/weeklyAlerts');
  // Start the weekly WhatsFlows alerts cron job
  startWeeklyAlertsJob();

// Load environment variables from .env file
require('dotenv').config();

// Import core modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./src/models');

// Import route modules
const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/leads');
const projectRoutes = require('./src/routes/projects');
const chatRoutes = require('./src/routes/chat');
const uploadsRoutes = require('./src/routes/uploads');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet()); // Adds security headers
app.use(express.json({ limit: '15mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '15mb' })); // Parse URL-encoded bodies

// CORS configuration: restricts allowed origins for API requests
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://exdellsindia.vercel.app',
  'https://www.exdells.com',
  'https://exdells.com',
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

// Root route: health check and API info
app.get('/', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Exdells API is running successfully 🚀",
    docs: "/api"
  });
});

// Health check route for Render.com
app.get('/health', (req, res) => {
  res.status(200).send("OK");
});

// Mount API routes
app.use('/api/auth', authRoutes); // User authentication
app.use('/api/leads', leadRoutes); // Lead form and notifications
app.use('/api/projects', projectRoutes); // Project info
app.use('/api/chat', chatRoutes); // Chatbot API
app.use('/api/uploads', uploadsRoutes); // File uploads

// Serve static uploads (images, docs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler: logs errors and returns safe responses
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack || err);
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
  res.status(500).json({ error: 'Server Error' });
});

// Set port from environment or default
const PORT = process.env.PORT || 4000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Require DATABASE_URL in production
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL is required in production. Please set it to your Supabase / Postgres connection string.');
      process.exit(1);
    }

    // Authenticate DB connection
    await sequelize.authenticate();
    console.log("✔ Database Connected");

    // Sync DB in development only
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log("✔ DB Synced (dev mode)");
    } else {
      console.log("✔ Production Mode - DB Sync Disabled (use migrations)");
    }

    // Start Express server
    app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

// Entry point
startServer();
