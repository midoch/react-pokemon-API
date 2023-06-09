import React, { useState, useEffect } from "react";
import styles from "./pokemoncard.module.css";

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

export default function PokemonCard(props) {
  const { selectPokemon, clearHandler, parentUrl } = props;
  const pokemonUrl = parentUrl + selectPokemon;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const jsonData = await fetchData(pokemonUrl);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonUrl]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h1 className={styles.card__title}>{selectPokemon}</h1>
        <button onClick={clearHandler}>x</button>
      </div>
      <img
        src={data.sprites.front_default}
        className={styles.card__image}
        alt={selectPokemon}
      />
      <h3>Stats</h3>
      {data.stats.map((stat, statIndex) => (
        <div key={statIndex}>
          <span>{stat.stat.name}: </span>
          <span>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
}
