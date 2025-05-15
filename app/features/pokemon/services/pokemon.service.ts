import type { Pokemon } from "~/lib/types/pokemon.type";
import api from "~/lib/utils/api";
import { handleApiError } from "~/lib/utils/errors/error-handler";

interface GetPokemonListResponse {
  results: Pokemon[];
  count: number;
}

interface GetPokemonDetailsResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}

export async function getPokemonList(limit: number, offset: number) {
  try {
    const res = await api.get<GetPokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );

    const { results, count } = res.data;

    return {
      pokemons: results,
      total: count,
      limit,
      offset,
    };
  } catch (error) {
    handleApiError(error);
  }
}

export async function getPokemonDetails(pokemonName: string) {
  try {
    const res = await api.get<GetPokemonDetailsResponse>(
      `/pokemon/${pokemonName}`
    );

    const {
      name,
      sprites: { front_default },
    } = res.data;

    return {
      name,
      sprite: front_default,
    };
  } catch (error) {
    handleApiError(error);
  }
}
