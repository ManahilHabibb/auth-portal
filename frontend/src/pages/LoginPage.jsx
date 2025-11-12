import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { clerkAppearance } from '../context/AuthContext';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-800 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid gap-8 lg:grid-cols-[1.1fr,0.9fr] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="hidden lg:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500">
          <div>
            <p className="text-sm uppercase tracking-widest font-semibold text-white/70">Authentic access</p>
            <h1 className="text-4xl font-extrabold mt-4 leading-tight">Unlock your personalized dashboard in seconds.</h1>
            <p className="mt-4 text-white/80">Sign in securely using Clerk’s modern authentication. Keep your experience cohesive with dynamic theming and responsive layouts.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">🔐</span>
              <p className="text-white/80">Single sign-on with best-in-class security</p>
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
          <SignIn appearance={clerkAppearance} routing="path" path="/login" signUpUrl="/signup" />
        </div>
      </div>
    </div>
  );
}
