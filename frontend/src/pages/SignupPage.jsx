import React, { useState, useEffect } from "react";
import { SignUp } from "@clerk/clerk-react";
import { Sparkles, Shield, Star, Users, Check, Zap } from "lucide-react";

export default function SignupPage() {
  const [active, setActive] = useState(0);

  const features = [
    { icon: Star, title: "Custom Profiles", desc: "Build your digital identity easily.", color: "from-yellow-400 to-orange-500" },
    { icon: Users, title: "Collaboration", desc: "Invite teammates and grow together.", color: "from-blue-400 to-cyan-500" },
    { icon: Shield, title: "Secure Access", desc: "Enterprise-grade encryption by default.", color: "from-purple-400 to-pink-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      <div className="absolute -top-40 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <style>{`
        @keyframes blob {
          0%,100%{transform:translate(0,0)scale(1);}
          33%{transform:translate(30px,-50px)scale(1.1);}
          66%{transform:translate(-20px,20px)scale(0.9);}
        }
        .animate-blob{animation:blob 8s infinite;}
        .animation-delay-2000{animation-delay:2s;}
      `}</style>

      <div className="z-10 max-w-6xl w-full grid lg:grid-cols-2 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Sign-up form */}
        <div className="p-8 sm:p-12 bg-white/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-xl">
              <Sparkles className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">Create an Account</h2>
            <p className="text-white/70 text-sm">Start your journey today</p>
          </div>
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                formButtonPrimary:
                  "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-[1.02]",
                formFieldInput:
                  "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-500 focus:border-pink-500",
                footerActionLink:
                  "text-pink-300 hover:text-pink-200 underline underline-offset-2",
              },
            }}
          />
        </div>

        {/* Right side */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>

          <div className="z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-300" size={18} />
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                Join the future
              </span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Grow with collaboration and trust
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              Build your team, protect your data, and design your brand identity seamlessly.
            </p>
          </div>

          <div className="mt-8 space-y-4 z-10">
            {features.map((f, i) => {
              const Icon = f.icon;
              const activeNow = active === i;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeNow
                      ? "bg-white/20 backdrop-blur-xl scale-105 shadow-2xl"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setActive(i)}
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md ${
                      activeNow ? "scale-110" : "scale-100"
                    } transition-transform`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {f.title}
                      {activeNow && <Check size={16} className="text-green-300" />}
                    </h3>
                    <p className="text-sm text-white/70">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
