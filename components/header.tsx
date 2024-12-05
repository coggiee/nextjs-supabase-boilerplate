import React from "react";
import Link from "next/link";

import { auth } from "@/auth";

import UserAvatar from "./auth/user-avatar";
import LoginButton from "./auth/login-button";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 mb-9 bg-mainbackground backdrop-blur-sm">
      <header className="flex items-center justify-between py-4 text-white">
        <Link href="/home">
          <h1 className="text-4xl font-black">Shared</h1>
        </Link>
        {session ? (
          <div className="flex items-center gap-2">
            <UserAvatar
              image={session?.user?.image as string}
              name={session?.user?.name as string}
            />
          </div>
        ) : (
          <LoginButton />
        )}
      </header>
    </nav>
  );
}
