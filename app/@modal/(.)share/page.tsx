import React from "react";

import { auth } from "@/auth";

import SharePlaylistModalSection from "@/components/modal/share-playlist-modal-section";
import Modal from "@/components/modal/modal";

export default async function SharePlaylistModalPage() {
  const session = await auth();

  return (
    <Modal title="플리 공유" description="Make changes to your profile here.">
      <SharePlaylistModalSection spotifyId={session!.user!.spotifyId!} />
    </Modal>
  );
}
