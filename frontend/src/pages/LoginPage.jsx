import React, { useState } from 'react';
import { SignIn, useSignIn } from '@clerk/clerk-react';
import { clerkAppearance } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { signIn, isLoaded } = useSignIn();

  const handleClickSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setMessage({ type: '', text: '' });
      
      // Start the sign in process using email link (Click)
      const { startMagicLinkFlow, cancelMagicLinkFlow } = signIn.createMagicLinkFlow();
      
      // Start the magic link flow
      const response = await startMagicLinkFlow({
        emailAddress: email,
        redirectUrl: `${window.location.origin}/dashboard`,
      });
      
      if (response.status === 'expired') {
        setMessage({ type: 'error', text: 'The sign-in link has expired. Please try again.' });
        return;
      }

      // If we get here, the magic link was sent successfully
      setMessage({ 
        type: 'success', 
        text: `Check your email (${email}) for a sign-in link. This link will expire in 10 minutes.` 
      });
      
    } catch (err) {
      console.error('Error during sign in:', err);
      setMessage({ 
        type: 'error', 
        text: err.errors?.[0]?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-800 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid gap-8 lg:grid-cols-[1.1fr,0.9fr] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="hidden lg:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500">
          <div>
            <p className="text-sm uppercase tracking-widest font-semibold text-white/70">Passwordless Access</p>
            <h1 className="text-4xl font-extrabold mt-4 leading-tight">Sign in with just one click</h1>
            <p className="mt-4 text-white/80">No passwords to remember. Get a secure, one-time link sent to your email.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">✉️</span>
              <p className="text-white/80">Secure, one-click email authentication</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">⚡</span>
              <p className="text-white/80">Lightning-fast entry with social providers</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">🎨</span>
              <p className="text-white/80">Consistent theming powered by Tailwind CSS</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-12 bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email to get a magic link
              </p>
            </div>

            {message.text && (
              <div
                className={`p-3 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleClickSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending magic link...
                    </>
                  ) : (
                    'Send Magic Link'
                  )}
                </button>
              </div>
            </form>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <SignIn 
                appearance={clerkAppearance} 
                routing="path" 
                path="/login" 
                signUpUrl="/signup"
                hideDefaultMethods={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
