// PokemonGrid.js
import React, { useState, useEffect } from "react";
import styles from "./pokemongrid.module.css";

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

export default function PokemonGrid(props) {
  const { handleSelectPokemon, url } = props;
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      if (localStorage.getItem("pokemon-card")) {
        return JSON.parse(localStorage.getItem("pokemon-card"));
      }
      return null;
    };

    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        localStorage.setItem("pokemon-card", JSON.stringify(jsonData));
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      const localData = fetchDataFromLocalStorage();
      if (localData) {
        setData(localData);
      } else {
        fetchDataFromAPI();
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pokemonGrid}>
      <h1 className={styles.header}>My Poké Index</h1>
      <div className={styles.listContainer}>
        <input
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        {data.results
          .filter((val) => {
            return val.name.includes(search);
          })
          .map((pokemon, pokemonIndex) => {
            return (
              <div
                onClick={() => handleSelectPokemon(pokemon.name)}
                key={pokemonIndex}
                className={styles.pokemon}
              >
                {pokemon.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
