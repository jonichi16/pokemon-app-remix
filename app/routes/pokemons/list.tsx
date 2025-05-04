import { PokemonListPage } from "~/features/pokemon/pages";
import { loader } from "~/features/pokemon/pages/PokemonListPage/loader";

export { loader };

export function meta() {
  return [
    { title: "Pokemons" },
    { name: "description", content: "List of Pokemons" },
  ];
}

export default PokemonListPage;
