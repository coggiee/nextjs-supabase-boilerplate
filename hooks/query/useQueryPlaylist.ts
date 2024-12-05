import { useQuery } from "@tanstack/react-query";

import { loadPlaylist } from "@/lib/spotify";

export const useQueryPlaylist = ({ userId }: { userId: string }) => {
  const query = useQuery({
    queryKey: ["playlist", userId],
    queryFn: () => loadPlaylist(userId),
    enabled: !!userId,
  });

  return query;
};
