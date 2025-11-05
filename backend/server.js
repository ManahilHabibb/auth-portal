import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  })
);

// In-memory user storage
let users = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Signup route
app.post("/api/signup", (req, res) => {
  console.log("Signup hit:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });
  console.log("New user:", email);
  res.status(201).json({ message: "Signup successful!" });
});

// Login route
app.post("/api/login", (req, res) => {
  console.log("Login hit:", req.body);

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful!",
    user: { email, createdAt: new Date().toISOString() }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
