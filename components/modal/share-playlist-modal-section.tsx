"use client";

import React from "react";
import { LoaderCircleIcon } from "lucide-react";

import { useQueryPlaylist } from "@/hooks/query/useQueryPlaylist";

import { Button } from "../ui/button";
import PlaylistCard from "../playlist-card";

interface SharePlaylistModalSectionProps {
  spotifyId: string;
}

export default function SharePlaylistModalSection({
  spotifyId,
}: SharePlaylistModalSectionProps) {
  const { data, isPending, isRefetching, refetch } = useQueryPlaylist({
    userId: spotifyId,
  });

  const handleLoadPlaylist = async () => {
    await refetch();
  };

  return (
    <section className="mt-10 text-white">
      <div className="mb-6 flex items-center justify-between rounded-md bg-subbackground p-2 px-4 text-white">
        <h1 className="text-lg font-medium">Spotify Playlist</h1>
        <Button
          size="sm"
          className="border border-spotify/80"
          onClick={handleLoadPlaylist}
          disabled={isRefetching}
        >
          {isRefetching ? "불러오는 중..." : "동기화"}
        </Button>
      </div>
      {isPending ||
        (isRefetching && (
          <div className="flex h-40 items-center justify-center">
            <LoaderCircleIcon className="h-8 w-8 animate-spin text-spotify" />
          </div>
        ))}
      {!isPending && !isRefetching && (
        <main className="flex flex-col gap-6 px-4">
          {data?.items.map(
            (
              {
                name,
                description,
                owner: {
                  external_urls: { spotify: ownerSpotifyUrl },
                  display_name: ownerDisplayName,
                },
                external_urls: { spotify: playlistSpotifyUrl },
                id,
                images,
                tracks: { total },
              },
              index,
            ) => (
              <PlaylistCard
                key={id}
                provider="none"
                name={name}
                description={description}
                imageUrl={images[0].url}
                externalUrl={playlistSpotifyUrl}
                totalCount={total}
                owner={ownerDisplayName}
                ownerProfileUrl={ownerSpotifyUrl}
                isLast={index === data.total - 1}
              />
            ),
          )}
        </main>
      )}
    </section>
  );
}
