import axios from "axios";
import type { Pokemon } from "~/common/types/pokemon";
import api from "~/common/utils/api";

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
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Pokemon not found");
    }
  }
}
