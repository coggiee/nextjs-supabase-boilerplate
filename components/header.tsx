import React from "react";

import { Button } from "./ui/button";

export default function Header() {
  return (
    <nav className="mb-9">
      <header className="flex items-center justify-between py-4 text-white">
        <h1 className="text-4xl font-black">Shared</h1>
        <Button className="bg-subbackground border-stroke rounded-full border">
          로그인
        </Button>
      </header>
    </nav>
  );
}
