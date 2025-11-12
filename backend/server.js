require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ClerkExpressRequireAuth, ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

// Import routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Clerk-Cookie']
}));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint (public)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    service: 'Auth Portal API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Public routes
app.use('/api/public', (req, res, next) => {
  // Add any public API routes here
  res.status(200).json({ message: 'Public endpoint' });
});

// Protected routes
app.use('/api/auth', authRoutes);

// Apply Clerk authentication middleware to all /api routes except /api/public
app.use('/api', (req, res, next) => {
  // Skip auth for public routes and health check
  if (req.path.startsWith('/public') || req.path === '/health') {
    return next();
  }
  
  // Use Clerk's authentication middleware
  return ClerkExpressRequireAuth({
    // Custom error handler for unauthorized requests
    onError: (err) => {
      console.error('Auth error:', err);
      res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Authentication required',
        code: 'UNAUTHORIZED'
      });
    }
  })(req, res, next);
});

// Apply protected routes after auth middleware
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'The provided authentication token is invalid',
      code: 'INVALID_TOKEN'
    });
  }
  
  // Handle rate limiting
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err
    })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `The requested resource ${req.path} was not found`,
    code: 'NOT_FOUND'
  });
});

// Server start
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  const { address, port } = server.address();
  console.log(`✅ Server running on http://${address}:${port}`);
  console.log(`🔒 Clerk webhook URL: ${process.env.CLERK_WEBHOOK_SECRET ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS Allowed Origins: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
