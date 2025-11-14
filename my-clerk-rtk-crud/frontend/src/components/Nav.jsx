import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Nav() {
  return (
    <nav className="flex justify-between bg-black text-white px-5 py-4">
      <h1 className="text-2xl font-bold">RTK CRUD + Clerk</h1>

      <SignedOut>
        <SignInButton>
          <button className="bg-blue-600 px-4 py-2 rounded">Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
