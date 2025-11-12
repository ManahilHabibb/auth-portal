import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-indigo-600 text-xl font-semibold">Loading experience...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isSignedIn ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={isSignedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/signup" element={isSignedIn ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
