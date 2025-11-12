import React, { useState, useEffect } from 'react';
import { useUser, useAuth, SignOutButton } from '@clerk/clerk-react';
import { sendMessage, getProfile } from '../api/messageApi';

export default function Dashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (isSignedIn) {
        try {
          const profile = await getProfile();
          setUserProfile(profile);
        } catch (err) {
          console.error('Error loading profile:', err);
        }
      }
    };
    
    loadProfile();
  }, [isSignedIn]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    if (!message.trim()) {
      setError('Please enter a message before sending.');
      return;
    }

    try {
      setLoading(true);
      const data = await sendMessage(message.trim());
      setResponse(data);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Unable to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-indigo-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Please sign in to access the dashboard</h1>
          <p className="text-gray-600">Redirecting you to the login page...</p>
        </div>
      </div>
    );
  }

  const initials = user?.firstName?.[0]?.toUpperCase() ?? user?.username?.[0]?.toUpperCase() ?? '?';
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-3xl p-6 sm:p-8 md:p-10 space-y-8 border border-slate-100 transition-transform hover:-translate-y-1">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold shadow-lg shadow-indigo-200">
              {initials}
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold">Dashboard</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName || user?.username || 'friend'}! ✨
              </h1>
              <p className="text-slate-500 text-sm sm:text-base">{email}</p>
            </div>
          </div>
          <SignOutButton>
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-500/90 text-white font-semibold shadow-md shadow-red-200 hover:bg-red-600 transition-colors">
              Sign out
            </button>
          </SignOutButton>
        </header>

        <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-5 shadow-inner">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Send a message to the system</h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Send a message and get a personalized response. Try asking about the weather or just say hello!
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 resize-none rounded-2xl border border-slate-200 bg-white/70 p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12"
                disabled={loading}
              />
              {message && !loading && (
                <button
                  type="button"
                  onClick={() => setMessage('')}
                  className="absolute right-3 top-3 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear message"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-500">
                {loading ? 'Processing your message...' : 'Your messages are processed securely'}
              </p>
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50/90 p-4 text-red-600 font-medium animate-fadeIn">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {response && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 animate-fadeIn">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-emerald-800">System Response</p>
                  <p className="text-emerald-700 text-sm mt-1">{response.data?.reply || 'Message received!'}</p>
                  {response.data?.timestamp && (
                    <p className="text-xs text-emerald-600 mt-2">
                      {new Date(response.data.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
