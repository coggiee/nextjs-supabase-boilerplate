import React from "react";
import Link from "next/link";

import SearchBar from "@/components/search-bar";

export default function Page() {
  return (
    <main className="h-full w-full">
      <section className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <aside className="flex items-center justify-between">
            <div className="flex h-10 w-fit items-center gap-2 rounded-lg bg-subbackground px-2 text-white">
              <div className="h-fit rounded-md bg-stroke p-1 px-2 text-sm">
                전체
              </div>
              <div className="h-fit rounded-md p-1 px-2 text-sm">
                스포티파이
              </div>
              <div className="h-fit rounded-md p-1 px-2 text-sm">
                유튜브 뮤직
              </div>
            </div>
            <Link
              href="/share"
              scroll={false}
              className="rounded-md bg-subbackground p-2 px-4 text-sm font-bold text-white hover:bg-subhover"
            >
              공유
            </Link>
          </aside>
          <SearchBar />
        </header>
        <div className="flex flex-col gap-5 text-white">
          <h1 className="text-lg font-semibold">공유된 플리</h1>
          {/* 플레이 리스트 목록 */}
          <div className="flex flex-col gap-6"></div>
        </div>
      </section>
    </main>
  );
}
