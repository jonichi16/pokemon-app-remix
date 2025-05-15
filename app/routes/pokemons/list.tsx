import { useLoaderData } from "react-router";
import { PokemonList } from "~/features/pokemon/pages";
import { loader } from "~/features/pokemon/pages/pokemon-list/loader";

export { loader };

export function meta() {
  return [
    { title: "Pokemons" },
    { name: "description", content: "List of Pokemons" },
  ];
}

export default function PokemonListPage() {
  const { pokemons, total, limit, offset } = useLoaderData();

  return (
    <PokemonList
      pokemons={pokemons}
      total={total}
      limit={limit}
      offset={offset}
    />
  );
}
