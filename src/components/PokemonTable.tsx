import React, { useEffect, useState } from "react";
import {
  fetchPokemonDetails,
  fetchPokemonEffects,
  fetchPokemonList,
} from "../service/fetchPokemon";

export default function PokemonTable({ limit }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [abilityEffects, setAbilityEffects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonListResult = await fetchPokemonList(limit);
        setPokemonList(pokemonListResult);

        const abilities = await fetchPokemonDetails(pokemonListResult);
        setPokemonAbilities(abilities);

        const pokemonEffect = await fetchPokemonEffects(abilities);
        setAbilityEffects(pokemonEffect);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
    return () => {};
  }, [limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <table id="pokemon">
      <thead>
        <tr>
          <th>SR. No</th>
          <th>Pokemon Name</th>
          <th>Abilities</th>
          <th>Effects</th>
        </tr>
      </thead>
      <tbody>
        {pokemonAbilities.map((pokemon, index) => (
          <tr key={pokemon.id}>
            <td>{index + 1}</td>
            <td>{pokemon.name}</td>
            <td>
              {pokemon.abilities.map((ability) => (
                <div key={ability.ability.name}>{ability.ability.name}</div>
              ))}
            </td>
            <td>
              {pokemon.abilities.map((ability) => {
                const effect = abilityEffects[ability.ability.name];
                return (
                  <div key={ability.ability.name}>
                    {effect || "No effect description available"}
                  </div>
                );
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
