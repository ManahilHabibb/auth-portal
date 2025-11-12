import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  console.error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.');
}

// Clerk appearance configuration
const clerkAppearance = {
  elements: {
    rootBox: 'w-full max-w-md mx-auto',
    card: 'shadow-2xl border border-slate-200 rounded-2xl p-8',
    headerTitle: 'text-3xl font-extrabold text-slate-900 text-center',
    headerSubtitle: 'text-slate-500 text-center mt-2',
    socialButtons: 'gap-3',
    socialButtonsIconButton: 'border border-slate-200 hover:bg-slate-100 transition-colors',
    formFieldLabel: 'text-slate-600 font-semibold',
    formFieldInput: 'rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-800',
    footerActionText: 'text-slate-600',
    footerActionLink: 'text-indigo-600 font-semibold hover:text-indigo-500',
    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-0.5',
  },
  layout: {
    socialButtonsPlacement: 'bottom',
    socialButtonsVariant: 'blockButton',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={clerkPublishableKey}
      appearance={clerkAppearance}
      navigate={(to) => window.location.href = to}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
