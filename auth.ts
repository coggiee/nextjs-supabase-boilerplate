/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";

import authConfig from "./auth.config";

// Add any providers, adapter you want to use
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
