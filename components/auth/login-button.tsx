import React from "react";

import { signIn } from "@/auth";

import { Button } from "../ui/button";

export default async function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <Button
        type="submit"
        className="rounded-full border border-stroke bg-subbackground"
      >
        로그인
      </Button>
    </form>
  );
}
