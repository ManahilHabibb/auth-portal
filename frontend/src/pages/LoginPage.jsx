import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Sparkles, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>

      <div className="relative w-full max-w-md px-6 z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-xl">
              <Sparkles className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-white/70 text-sm">Log in to continue</p>
          </div>

          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                formButtonPrimary:
                  "w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-[1.02]",
                formFieldInput:
                  "bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-xl py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:border-pink-500",
                footerActionLink:
                  "text-pink-300 hover:text-pink-200 underline underline-offset-2",
              },
            }}
          />
        </div>

        <div className="mt-6 flex justify-center gap-6 text-white/60 text-xs">
          <div className="flex items-center gap-1">
            <Lock size={12} />
            <span>Secure Login</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles size={12} />
            <span>Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
