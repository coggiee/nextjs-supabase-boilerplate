/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import NextAuth, { type DefaultSession } from "next-auth";

interface Token {
  access_token: string;
  email: string;
  exp: number;
  iat: number;
  jti: string;
  name: string;
  picture: string;
  refresh_token: string;
  spotifyId: string;
  sub: string;
}

declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    token: Token;
    user: {
      // The user's postal address
      spotifyId?: string;
    } & DefaultSession["user"];
  }
}
