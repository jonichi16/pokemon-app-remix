import { useLoaderData } from "react-router";
import { PokemonList } from "../../components";

export default function PokemonListPage() {
  const { pokemons, total, limit, offset } = useLoaderData();
  return (
    <main>
      <h1>List of Pokemon</h1>
      <PokemonList
        pokemons={pokemons}
        total={total}
        limit={limit}
        offset={offset}
      />
    </main>
  );
}
