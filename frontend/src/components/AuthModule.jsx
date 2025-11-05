import React, { useState } from "react";
import axios from "axios";
import { Lock, Mail, Eye, EyeOff, LogOut, User, Shield, Sparkles } from "lucide-react";

const API_URL = "http://localhost:5000";

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) return setMessage("Please fill in all fields");
    if (!isLogin && password !== confirmPassword) return setMessage("Passwords do not match");

    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        setMessage("Login successful!");
        setTimeout(() => onLogin(res.data.user), 800);
      } else {
        await axios.post(`${API_URL}/signup`, { email, password });
        setMessage("Account created! Please login.");
        setTimeout(() => setIsLogin(true), 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/60" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-white/90 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-white/90 mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 px-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {message && <p className="text-center text-white bg-black/20 rounded-md p-2">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 py-2 rounded-lg font-bold hover:bg-white/90 transition-all"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
          </button>

          <p
            className="text-center text-white/80 mt-4 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6 text-white">
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
        <button onClick={onLogout} className="bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30">
          <LogOut size={18} className="inline mr-2" /> Logout
        </button>
      </div>
      <p>Account created on: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  </div>
);

export default function AuthModule() {
  const [user, setUser] = useState(null);
  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <AuthScreen onLogin={(userData) => setUser(userData)} />
  );
}
