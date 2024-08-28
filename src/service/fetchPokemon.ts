import axios from "axios";

export const fetchPokemonList = async (limit) => {
  try {
    // Fetch Pokémon list
    const pokemonResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    const pokemonResults = pokemonResponse.data.results;
    return pokemonResults;
  } catch (error) {}
};

export const fetchPokemonDetails = async (pokemonDetails) => {
  try {
    // Fetch Pokémon details
    const pokemonDetailsPromises = pokemonDetails.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
    const abilities = pokemonDetailsResponses.map((response) => response.data);
    return abilities;
  } catch (error) {}
};

export const fetchPokemonEffects = async (pokemonAbilities) => {
  try {
    // Fetch ability effects
    const abilityUrls = new Set();
    pokemonAbilities.forEach((pokemon) =>
      pokemon.abilities.forEach((ability) =>
        abilityUrls.add(ability.ability.url)
      )
    );

    const effectPromises = Array.from(abilityUrls).map((url) => axios.get(url));
    const effectResponses = await Promise.all(effectPromises);

    const effects = {};

    effectResponses.forEach((response) => {
      const abilityName = response.data.name;
      const effectEntry = response.data.effect_entries.find(
        (entry) => entry.language.name === "en"
      );

      effects[abilityName] =
        effectEntry?.effect || "No effect description available";
    });
    return effects;
  } catch (error) {}
};
