import { Link } from "react-router";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-6xl text-center font-bold">
          Welcome to Pokemon App!
        </h1>
        <Link className="text-xl hover:underline" to="/pokemons">
          See Pokemons
        </Link>
      </div>
    </main>
  );
}
