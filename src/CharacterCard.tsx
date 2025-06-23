import type { Character } from "./clients/generated-client/api";
import { useState } from "react";
type CharacterCardPropos = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardPropos) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <li className="flex flex-col text-gray-300 bg-gray-600 p-5 rounded max-w-52">
      {!isImageLoaded && (
        <div className="w-40 h-40 bg-gray-500 rounded animate-pulse" />
      )}
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
        className={`rounded max-w-40 ${!isImageLoaded && "opacity-0"}`}
        onLoad={() => {
          console.log("Image Loaded");
          setIsImageLoaded(true);
        }}
      />
      <p className="font-semibold">
        Name: <span className="font-normal">{character.name}</span>
      </p>
      <p className="font-semibold">
        Species: <span className="font-normal">{character.species}</span>
      </p>
    </li>
  );
}
