const jwt = require('jsonwebtoken')
// JWT authentication middleware for Express
module.exports = function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];
  // Verify JWT token
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
// Export middleware
}
