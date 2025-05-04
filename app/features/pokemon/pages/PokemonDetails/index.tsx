import { useNavigate } from "react-router";

interface PokemonDetailsProps {
  pokemon: { name: string; sprite: string };
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { name, sprite } = pokemon;
  const navigate = useNavigate();

  return (
    <main>
      <h1>Pokemon Details</h1>
      <p>
        Name: <span className="capitalize">{name}</span>
      </p>
      <img src={sprite} alt={`${name} sprite`} />
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </main>
  );
}
