import { useNavigate } from "react-router";

interface PokemonDetailsProps {
  pokemon: { name: string; sprite: string };
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { name, sprite } = pokemon;
  const navigate = useNavigate();

  return (
    <main className="min-h-screen p-5">
      <div className="min-h-screen flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Pokemon Details</h1>
        <p className="font-bold">
          Name: <span className="capitalize">{name}</span>
        </p>
        <img className="w-[150px]" src={sprite} alt={`${name} sprite`} />
        <div>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}
