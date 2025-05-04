import { Link } from "react-router";

interface PokemonDetailsProps {
  pokemon: { name: string; sprite: string };
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { name, sprite } = pokemon;

  return (
    <main>
      <h1>
        Name: <span className="capitalize">{name}</span>
      </h1>
      <img src={sprite} alt={`${name} sprite`} />
      <Link to="">Back</Link>
    </main>
  );
}
