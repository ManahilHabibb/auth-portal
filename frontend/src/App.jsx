import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

// Component to handle authentication state
const RootRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If user is not signed in and not on auth pages, redirect to sign-in
  if (!isSignedIn && !location.pathname.startsWith('/sign-')) {
    return <Navigate to="/sign-in" replace />;
  }

  // If user is signed in and on auth pages, redirect to dashboard
  if (isSignedIn && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

// Protected route component
const RequireAuth = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

// Main App component
const App = () => {
  return (
    <Routes>
      <Route element={<RootRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Public routes */}
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        
        {/* 404 - Not Found */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">404</h1>
              <p className="text-slate-600 mb-6">Page not found</p>
              <a 
                href="/" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        } />
      </Route>
    </Routes>
  );
};

export default App;
