import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Nav from "./components/Nav";

export default function App() {
  return (
    <div>
      <Nav />

      <SignedOut>
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold">Welcome! Please Sign In</h1>
          <SignInButton>
            <button className="bg-blue-600 text-white p-3 mt-5 rounded">Login With Clerk</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}
