import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../clients/generated-client";
import type { CharacterListResponse } from "../clients/generated-client/api";
const api = new DefaultApi();

export function useCharacters() {
  const { data, isLoading, error } = useQuery<CharacterListResponse, Error>({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await api.getCharacters();
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch characters");
    },
  });

  return { characters: data?.results ?? [], isLoading, error };
}
