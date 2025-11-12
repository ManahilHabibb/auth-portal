import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '../hooks/useAuth';
import { sendMessage } from '../api/authApi';

export default function Dashboard() {
  const { user } = useUser();
  const { getToken, signOut } = useAuth();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');
    setResponse('');

    if (!message.trim()) {
      setError('Please enter a message before sending.');
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        setError('Could not authenticate your request. Please sign in again.');
        return;
      }

      const data = await sendMessage(message.trim(), token);
      setResponse(data.reply);
      setMessage('');
    } catch (err) {
      const apiMessage = err.response?.data?.message;
      setError(apiMessage || 'Unable to send message right now.');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.firstName?.[0]?.toUpperCase() ?? user?.username?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-3xl p-10 space-y-8 border border-slate-100 transition-transform hover:-translate-y-1">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold shadow-lg shadow-indigo-200">
              {initials}
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold">Dashboard</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome back, {user?.firstName || user?.username || 'friend'}! ✨
              </h1>
              <p className="text-slate-500">{user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <button
            onClick={() => signOut?.()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-500/90 text-white font-semibold shadow-md shadow-red-200 hover:bg-red-600 transition-colors"
          >
            Sign out
          </button>
        </header>

        <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-5 shadow-inner">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Send a message to the system</h2>
            <p className="text-slate-500 mt-1">Ask anything and the system will echo back your thoughts.</p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 resize-none rounded-2xl border border-slate-200 bg-white/70 p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-transparent transition-all"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-slate-500">Pro tip: Keep it friendly, we’re keeping score for fun!</p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-red-600 font-medium animate-[fadeIn_0.2s_ease-in]">
              {error}
            </div>
          )}

          {response && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-emerald-700 animate-[fadeIn_0.2s_ease-in]">
              <p className="font-semibold">System response</p>
              <p className="mt-1">{response}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
