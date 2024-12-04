/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth";

import Spotify from "next-auth/providers/spotify";
import { cookies } from "next/headers";

export default {
  providers: [Spotify],
  callbacks: {
    // JWT를 사용할 경우에만 실행됨 ( session: { strategy: "jwt" } )
    async jwt({ token, profile, account }) {
      if (profile) {
        token.spotifyId = profile.id;
      }
      if (account) {
        const cookieStore = await cookies();
        cookieStore.set("spotify_access_token", account.access_token!, {
          expires: new Date(account.expires_at! * 1000),
        });
        cookieStore.set("spotify_refresh_token", account.refresh_token!);

        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).token = token;
      (session.user as any).spotifyId = token.spotifyId;
      return session;
    },
  },
} satisfies NextAuthConfig;
