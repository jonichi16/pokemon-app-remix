import type { Pokemon } from "~/common/types/pokemon";
import api from "~/common/utils/api";

interface GetPokemonListResponse {
  results: Pokemon[];
  count: number;
}

export async function getPokemonList(limit: number, offset: number) {
  return api.get<GetPokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
}
