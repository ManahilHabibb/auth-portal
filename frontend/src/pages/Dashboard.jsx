import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { sendMessage } from '../api/authApi';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.username} 🎉</h1>
            <p className="text-gray-500">Email: {user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Send a message to the system</h2>
          <form onSubmit={handleSendMessage} className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>
          )}

          {response && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg">
              <p className="font-semibold">System response</p>
              <p>{response}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
