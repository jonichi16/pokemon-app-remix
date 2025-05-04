import { Link, useLoaderData } from "react-router";
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
      <Link
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
        to={"/"}
      >
        Home
      </Link>
    </main>
  );
}
