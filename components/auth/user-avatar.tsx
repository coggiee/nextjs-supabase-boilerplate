import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  image: string;
  name: string;
}

export default function UserAvatar({ image, name }: UserAvatarProps) {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={image} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
