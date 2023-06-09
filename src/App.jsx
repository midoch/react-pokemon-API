import React, { useState, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import PokemonCard from "./components/PokemonCard";
import PokemonGrid from "./components/PokemonGrid";
import Footer from "./components/Footer";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const url = "https://pokeapi.co/api/v2/pokemon/";

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon);
  }

  function handleClearPokemon() {
    setSelectedPokemon(null);
  }

  return (
    <div>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          {selectedPokemon ? (
            <PokemonCard
              parentUrl={url}
              selectPokemon={selectedPokemon}
              clearHandler={handleClearPokemon}
            />
          ) : (
            <PokemonGrid url={url} handleSelectPokemon={handleSelectPokemon} />
          )}
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
