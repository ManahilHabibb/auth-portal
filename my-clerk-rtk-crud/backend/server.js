// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { clerkExpressWithAuth, clerkMiddleware } = require('@clerk/express');

// Routers
const postsRouter = require('./routers/posts');
const messagesRouter = require('./routers/messages');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Clerk middleware attaches auth information to req (req.auth or getAuth(req))
// See Clerk express quickstart for details. This middleware checks cookies/headers for a session token.
app.use(clerkMiddleware());

// Unprotected route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Clerk RTK CRUD backend is running' });
});

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/messages', messagesRouter);

// Start server after DB connect
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}
start();
