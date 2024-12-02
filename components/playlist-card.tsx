import React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { MusicProvider } from "@/types/music-provider.types";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import IconMusic from "./icon/icon-music";
import { CustomImage } from "./custom-image";

interface PlaylistCardProps {
  provider: MusicProvider;
}

const providerIcon = {
  spotify: "logo-spotify",
  youtube: "logo-youtube",
};

const providerStyle = {
  spotify: "shadow-spotify border-spotify hover:shadow-spotify-hover",
  youtube: "shadow-youtube border-youtube hover:shadow-youtube-hover",
};

export default function PlaylistCard({ provider }: PlaylistCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer bg-background transition-shadow duration-300",
        providerStyle[provider],
      )}
    >
      <CardHeader className="flex-row items-center justify-between px-4 py-3">
        <div
          className={cn("aspect-square h-12 w-12", providerIcon[provider])}
        />
        <div className="flex items-center justify-center pb-2">
          <IconMusic provider={provider} isChecked />
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 px-4 text-white">
        <aside className="relative aspect-square w-16 overflow-hidden rounded-lg">
          <CustomImage
            src={"https://picsum.photos/200"}
            alt="playlist-image"
            width={200}
            height={200}
            className="h-full w-full"
          />
        </aside>
        <aside className="flex grow flex-col justify-between">
          <header className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Sample Playlist</h1>
            <ChevronRight className="text-subtle hover:text-white" />
          </header>
          <footer className="flex gap-2">
            {["코딩할 때 듣는", "눈물 나는", "잔잔한"].map((tag, index) => (
              <Badge
                key={index}
                className="rounded-full border-stroke bg-subbackground"
              >
                #{tag}
              </Badge>
            ))}
          </footer>
        </aside>
      </CardContent>
      <CardFooter className="justify-between px-4 pb-3 text-subtle">
        <h1 className="text-lg font-semibold">+87곡</h1>
        <h2 className="text-sm">by John doe</h2>
      </CardFooter>
    </Card>
  );
}
