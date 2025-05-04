import type { Route } from ".react-router/types/app/routes/+types";
import { getPokemonList } from "../../services";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 10);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  return await getPokemonList(limit, offset);
}
