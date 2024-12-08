import Link from "next/link";

import { Button } from "@/components/ui/button";

export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-white">
      <div className="logo absolute h-full w-full" />
      <main className="z-50 flex flex-col items-center justify-center gap-8">
        <header className="space-y-2 text-center">
          <h1 className="text-6xl font-black">Shared</h1>
          <h2 className="text-lg">나의 플리를 공유해 보세요.</h2>
        </header>
        <section>
          <Button
            asChild
            variant="ghost"
            className="rounded-full border border-spotify shadow-spotify hover:bg-spotify"
          >
            <Link href="/home">둘러보기</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
