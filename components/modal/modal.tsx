"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Maximize2Icon, XIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const Title = ({
  title,
  description,
}: Readonly<{ title: string; description?: string }>) => {
  return (
    <header className="flex flex-col space-y-1.5 px-4 pt-0 text-left text-white">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h1>
      <p className="text-base text-subtle">{description}</p>
    </header>
  );
};

export default function Modal({
  children,
  title,
  description,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description?: string;
}>) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen open onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="max-w-[400px] overflow-y-hidden rounded-lg border-stroke bg-mainbackground p-0 text-white sm:max-w-[800px]">
          <div className="flex items-center justify-end gap-1 p-2">
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="h-6 w-6 p-2 text-subtle hover:bg-subbackground hover:text-white"
            >
              <Button onClick={() => window.location.reload()}>
                <Maximize2Icon className="p-[1px]" />
              </Button>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 p-2 text-subtle hover:bg-subbackground hover:text-white"
              onClick={handleOpenChange}
            >
              <XIcon className="w-4" />
            </Button>
          </div>
          <section className="p-4">
            <DialogHeader className="hidden">
              <DialogTitle className="hidden" />
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="flex justify-between items-center">
              <Title title={title} description={description} />
              <Button
                size="default"
                className="border border-spotify/80 hover:bg-subbackground mx-4"
              >
                공유
              </Button>
            </div>
            <div>{children}</div>
          </section>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
