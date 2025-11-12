import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { clerkAppearance } from '../context/AuthContext';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid gap-8 lg:grid-cols-[0.9fr,1.1fr] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex items-center justify-center p-8 sm:p-12 bg-white">
          <SignUp appearance={clerkAppearance} routing="path" path="/signup" signInUrl="/login" />
        </div>
        <div className="hidden lg:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
          <div>
            <p className="text-sm uppercase tracking-widest font-semibold text-white/70">Create your space</p>
            <h1 className="text-4xl font-extrabold mt-4 leading-tight">Design your identity with effortless onboarding.</h1>
            <p className="mt-4 text-white/80">Sign up using a sleek flow powered by Clerk. Tailwind styling keeps your brand consistent while providing a delightful first impression.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">🌟</span>
              <p className="text-white/80">Custom profiles with username, email, and more</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">🤝</span>
              <p className="text-white/80">Invite collaborators with instant access</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">🛡️</span>
              <p className="text-white/80">Enterprise-grade security out of the box</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
