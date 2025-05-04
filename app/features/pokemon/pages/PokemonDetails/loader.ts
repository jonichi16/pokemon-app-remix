import type { Route } from ".react-router/types/app/routes/pokemons/+types/details";
import { getPokemonDetails } from "../../services";

export async function loader({ params }: Route.LoaderArgs) {
  const { name } = params;
  return await getPokemonDetails(name);
}
