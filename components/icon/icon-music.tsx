import React from "react";

import { cn } from "@/lib/utils";

import { MusicProvider } from "@/types/music-provider.types";

interface IconMusicProps {
  provider: MusicProvider;
  isChecked?: boolean;
}

export default function IconMusic({ provider, isChecked }: IconMusicProps) {
  const providerStyle = {
    spotify: isChecked && "fill-spotify",
    youtube: isChecked && "fill-youtube",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={cn("fill-[rgba(161, 161, 161, 1)]", providerStyle[provider])}
      //   fill=
    >
      <path d="M6 18.573c2.206 0 4-1.794 4-4V4.428L19 7.7v7.43a3.953 3.953 0 0 0-2-.557c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V7a.998.998 0 0 0-.658-.939l-11-4A.999.999 0 0 0 8 3v8.13a3.953 3.953 0 0 0-2-.557c-2.206 0-4 1.794-4 4s1.794 4 4 4z"></path>
    </svg>
  );
}