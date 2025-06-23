import { useEffect, useState } from "react";
import { CharacterListResponse, DefaultApi } from "../clients/generated-client";

export function useApi() {
  const [characters, setCharacters] = useState<CharacterListResponse>({
    results: [],
  });
  useEffect(() => {
    const loadingModal = document.querySelector("#LoadingModal");
    loadingModal?.setAttribute("style", "display: none;");
    const api = new DefaultApi();
    const getCharactersList = api.getCharacters();
    async function getList() {
      try {
        const charactersList = await getCharactersList;
        if (charactersList.status === 200) {
          setCharacters(charactersList.data);
        }
      } catch (error) {
        console.error("can't get charaters from API", error);
      }
    }

    getList();
  }, []);

  return characters;
}
