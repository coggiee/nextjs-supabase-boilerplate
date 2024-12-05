import React from "react";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import SharePlaylistModalSection from "@/components/modal/share-playlist-modal-section";
import { Title } from "@/components/modal/modal";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <div className="flex items-center justify-between">
        <Title
          title="플리 공유"
          description="Make changes to your profile here."
        />
        <Button
          size="default"
          className="border border-spotify/80 hover:bg-subbackground mx-4"
        >
          공유
        </Button>
      </div>
      <SharePlaylistModalSection spotifyId={session!.user!.spotifyId!} />
    </main>
  );
}
