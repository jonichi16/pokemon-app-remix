import { useLoaderData } from "react-router";
import { PokemonDetails } from "~/features/pokemon/pages";
import { loader } from "~/features/pokemon/pages/pokemon-details/loader";

export { loader };

export default function PokemonDetailsPage() {
  const { name, sprite } = useLoaderData();
  return <PokemonDetails pokemon={{ name, sprite }} />;
}
