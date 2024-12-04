"use client";

import React from "react";

import { Button } from "./ui/button";

export default function ApiTestButton() {
  const handleApiTest = async () => {};

  return (
    <div>
      <Button onClick={handleApiTest}>API Test</Button>
    </div>
  );
}
