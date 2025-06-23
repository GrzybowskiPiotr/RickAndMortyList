import { CharacterCard } from "./CharacterCard";
import { useEffect } from "react";
import { useCharacters } from "./hooks/useCharacters";
function App() {
  const { isLoading, error, characters } = useCharacters();

  useEffect(() => {
    const loadingModal = document.querySelector("#LoadingModal");
    loadingModal?.setAttribute("style", "display: none;");
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col gap-2 p-5 w-full items-center">
      <header className="bg-gray-700 rounded-lg p-4 w-full max-w-4xl">
        <h1 className="text-white text-center">Rick and Morty App</h1>
      </header>
      <main className="bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col items-center w-full max-w-4xl">
        {isLoading ? (
          <div className="m-auto w-14 h-14 border-t-cyan-600 border-t-4 rounded-full animate-spin"></div>
        ) : (
          <h2 className="text-white text-center mb-4 text-2xl font-semibold">
            Characters List{" "}
          </h2>
        )}

        {error ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : (
          <ul className="grid md:grid-cols-3 sm:grid-cols-1 xl:grid-cols-4 gap-2">
            {characters.length === 0
              ? null
              : characters.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
