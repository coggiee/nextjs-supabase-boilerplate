"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/custom-image";

import TestPng from "../../public/landing-object.webp";

export default function Page() {
  const [url, setUrl] = useState("./public/landing-object.webp");

  const handleToggle = () => {
    setUrl(
      url === "./public/landing-object.webp"
        ? "./public/test.png"
        : "./public/landing-object.webp",
    );
  };

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
        src={url}
        alt="Test Image"
        width={400}
        height={400}
        quality={100}
        className="rounded-lg"
      />
      <CustomImage
        src="landing-object.webp"
        alt="Test Image"
        width={400}
        height={400}
        quality={100}
        className="rounded-lg"
      />
      <CustomImage
        src={"https://picsum.photos/400"}
        alt="Test Image"
        width={400}
        height={400}
        quality={100}
        className="rounded-lg"
      />
      <Button onClick={handleToggle}>Toggle Image</Button>
    </div>
  );
}
