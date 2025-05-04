import { Link } from "react-router";
import type { Pokemon } from "~/common/types/pokemon.type";
interface PokemonListProps {
  pokemons: Pokemon[];
  total: number;
  limit: number;
  offset: number;
}

export default function PokemonList({
  pokemons,
  total,
  limit,
  offset,
}: PokemonListProps) {
  const hasNext = offset + limit < total;
  const hasPrev = offset > 0;
  const nextOffset = hasNext ? offset + limit : null;
  const prevOffset = hasPrev ? Math.max(offset - limit, 0) : null;

  return (
    <main>
      <h1>List of Pokemon</h1>
      <div className="space-y-6">
        <ul className="list-disc pl-5 space-y-1">
          {pokemons.map((p) => (
            <li key={p.name} className="capitalize">
              {p.name}
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {hasPrev && (
            <Link
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
              to={`?offset=${prevOffset}&limit=${limit}`}
            >
              Previous
            </Link>
          )}
          {hasNext && (
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow"
              to={`?offset=${nextOffset}&limit=${limit}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
      <Link
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
        to={"/"}
      >
        Home
      </Link>
    </main>
  );
}
