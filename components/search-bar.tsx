import React from "react";

import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="relative text-white">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">😄</div>
      <Input
        placeholder="플리 제목을 입력해 주세요."
        className="bg-subbackground border-stroke h-11 border pl-11 hover:bg-mainbackground"
      />
    </div>
  );
}
