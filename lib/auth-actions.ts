"use server";

import { cookies } from "next/headers";
import axios from "axios";

import { signIn } from "@/auth";

export const login = async () => {
  await signIn("spotify");
};

export const logout = async () => {
  await signIn("spotify", { callbackUrl: "/" });
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  return accessToken;
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;
  return refreshToken;
};

export const setAuthTokenList = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  const cookieStore = await cookies();
  cookieStore.set("spotify_access_token", access_token, {
    expires: new Date(Date.now() + 3600 * 1000),
  });
  cookieStore.set("spotify_refresh_token", refresh_token);
};

export const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      const basic = Buffer.from(
        `${process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID}:${process.env.NEXT_PUBLIC_AUTH_SPOTIFY_SECRET}`,
      ).toString("base64");

      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken!,
          client_id: process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID!,
        }),
        {
          headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const { access_token, refresh_token } = data;
      await setAuthTokenList({ access_token, refresh_token });

      return access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  }
};
