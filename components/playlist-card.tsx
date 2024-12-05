import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { MusicProvider } from "@/types/music-provider.types";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import IconMusic from "./icon/icon-music";
import { CustomImage } from "./custom-image";

interface PlaylistCardProps {
  provider: MusicProvider;
  name: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
  owner: string;
  tagList?: string[];
  totalCount: number;
  ownerProfileUrl: string;
  isLast: boolean;
}

const providerIcon = {
  spotify: "logo-spotify",
  youtube: "logo-youtube",
};

const providerStyle = {
  none: "border-l-0 border-r-0 border-t-0 border-b shadow-none rounded-none border-stroke",
  spotify: "shadow-spotify border-spotify hover:shadow-spotify-hover",
  youtube: "shadow-youtube border-youtube hover:shadow-youtube-hover",
};

export default function PlaylistCard({
  provider,
  name,
  description,
  imageUrl,
  externalUrl,
  owner,
  tagList,
  totalCount,
  ownerProfileUrl,
  isLast,
}: PlaylistCardProps) {
  return (
    <Card
      className={cn(
        "bg-background transition-shadow duration-300",
        providerStyle[provider],
        isLast && "border-none",
      )}
    >
      {provider !== "none" && (
        <CardHeader className="flex-row items-center justify-between px-4 py-3">
          <div
            className={cn("aspect-square h-12 w-12", providerIcon[provider])}
          />
          <div className="flex items-center justify-center pb-2">
            <IconMusic provider={provider} isChecked />
          </div>
        </CardHeader>
      )}
      <CardContent className="flex gap-4 px-0 text-white">
        <aside className="relative aspect-square h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg">
          <CustomImage
            src={imageUrl}
            alt="playlist-image"
            width={200}
            height={200}
            className="h-full w-full"
            unOptimizeExternalImage
          />
        </aside>
        <aside className="flex grow flex-col justify-between">
          <header className="flex justify-between">
            <div className="flex flex-col">
              <Link
                href={externalUrl}
                className="text-lg underline-offset-4 hover:underline"
              >
                <h1>{name}</h1>
              </Link>
              <h2 className="line-clamp-2 text-subtle">{description}</h2>
            </div>
          </header>
          <footer className="flex gap-2">
            {tagList?.map((tag, index) => (
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
      <CardFooter className="justify-between px-0 pb-3 text-subtle">
        <h1 className="text-lg font-semibold">+ {totalCount}곡</h1>
        <Link href={ownerProfileUrl} className="space-x-1 text-sm">
          <span>shared by</span>
          <span className="underline-offset-4 hover:underline">{owner}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
