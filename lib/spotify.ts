import { SpotifyPlaylistResponse } from "@/types/spotify.types";

import { instance } from "./network";
import { getAccessToken } from "./auth-actions";

export const loadPlaylist = async (userId: string) => {
  const accessToken = await getAccessToken();

  const { data } = await instance.get<SpotifyPlaylistResponse>(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};
