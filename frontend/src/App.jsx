import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

// Clerk Frontend API key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Custom components for protected routes
const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'shadow-2xl border border-slate-200',
          headerTitle: 'text-3xl font-extrabold text-slate-900',
          headerSubtitle: 'text-slate-500',
          socialButtons: 'gap-3',
          socialButtonsIconButton: 'border border-slate-200 hover:bg-slate-100 transition-colors',
          formFieldLabel: 'text-slate-600 font-semibold',
          formFieldInput: 'rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-800',
          footerAction__signIn: 'text-slate-600',
          footerActionLink: 'text-indigo-600 font-semibold hover:text-indigo-500',
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-0.5',
        },
      }}
    >
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          
          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          
          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

// Component to handle authentication state
function RootRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-indigo-600 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Redirect to dashboard if already signed in and on auth pages
  if (isSignedIn && isAuthPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// Protected route component
function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-indigo-600 text-xl font-semibold">Checking authentication...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Main App component
export default function App() {
  return (
    <ClerkProviderWithRoutes />
  );
}
