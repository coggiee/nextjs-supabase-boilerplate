import React from "react";
import Image from "next/image";

import { CustomImage } from "@/components/custom-image";

import TestPng from "../../public/landing-object.webp";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <aside className="relative aspect-square w-[400px] overflow-hidden">
        <Image
          src={TestPng}
          alt="playlist-image"
          width={400}
          height={400}
          className="h-full w-full"
        />
      </aside>
      <CustomImage
        src={"https://picsum.photos/200"}
        alt="Test Image"
        width={400}
        height={400}
        quality={100}
        className="rounded-lg"
      />
    </div>
  );
}
