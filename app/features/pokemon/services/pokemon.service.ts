import type { Pokemon } from "~/common/types/pokemon";
import api from "~/common/utils/api";
import { handleApiError } from "~/common/utils/errors/handleApiError";

interface GetPokemonListResponse {
  results: Pokemon[];
  count: number;
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
