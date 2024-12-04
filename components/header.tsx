import React from "react";

import { auth } from "@/auth";

import UserAvatar from "./auth/user-avatar";
import LoginButton from "./auth/login-button";
import ApiTestButton from "./api-test-button";

export default async function Header() {
  const session = await auth();
  
  return (
    <nav className="mb-9">
      <header className="flex items-center justify-between py-4 text-white">
        <h1 className="text-4xl font-black">Shared</h1>
        <LoginButton />
        {session ? (
          <UserAvatar
            image={session?.user?.image as string}
            name={session?.user?.name as string}
          />
        ) : (
          <LoginButton />
        )}
        <ApiTestButton />
      </header>
    </nav>
  );
}
