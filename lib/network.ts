import axios from "axios";

import { getAccessToken, refreshAccessToken } from "./auth-actions";

const SPOTIFY_REF_URL = ["https://accounts.spotify.com/api/token"];

export const instance = axios.create({});

instance.interceptors.request.use(async config => {
  if (
    (config.url && SPOTIFY_REF_URL.includes(config.url)) ||
    config.url?.startsWith("https://api.spotify.com/v1/")
  ) {
    const accessToken = await getAccessToken();

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  async response => response,
  async error => {
    const { status, config } = error.response;

    // 401 Unauthorized error
    if (status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) return Promise.reject(error);

      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return instance.request(config);
    }
    return Promise.reject(error);
  },
);
