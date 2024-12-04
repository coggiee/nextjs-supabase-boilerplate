/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { NextRequest } from "next/server";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(request: NextRequest) {
  // Your custom middleware logic goes here
});
