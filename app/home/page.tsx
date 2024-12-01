import React from "react";

import SearchBar from "@/components/search-bar";
import PlaylistCard from "@/components/playlist-card";
import Header from "@/components/header";

export default function Page() {
  return (
    <main className="h-full w-full">
      <Header />
      <section className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="bg-subbackground flex h-10 w-fit items-center gap-2 rounded-lg px-2 text-white">
            <div className="bg-stroke h-fit rounded-md p-1 px-2 text-sm">
              전체
            </div>
            <div className="h-fit rounded-md p-1 px-2 text-sm">
              스포티파이
            </div>
            <div className="h-fit rounded-md p-1 px-2 text-sm">
              유튜브 뮤직
            </div>
          </div>
          <SearchBar />
        </header>
        <div className="flex flex-col gap-5 text-white">
          <h1 className="text-lg font-semibold">공유된 플리</h1>
          <div className="flex flex-col gap-6">
            <PlaylistCard provider="spotify" />
            <PlaylistCard provider="youtube" />
          </div>
        </div>
      </section>
    </main>
  );
}
