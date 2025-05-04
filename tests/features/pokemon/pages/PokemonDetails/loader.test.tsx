import type { Route } from ".react-router/types/app/routes/pokemons/+types/details";
import type { Mock } from "vitest";
import { loader } from "~/features/pokemon/pages/PokemonDetails/loader";
import { getPokemonDetails } from "~/features/pokemon/services";

vi.mock("~/features/pokemon/services");

describe("pokemon details loader", () => {
  it("should return pokemon details based on name", async () => {
    const pokemonName = "pikachu";

    const mockResponse = {
      name: pokemonName,
      sprite: "url",
    };

    (getPokemonDetails as Mock).mockResolvedValueOnce(mockResponse);
    const params = { name: pokemonName };
    const res = await loader({ params } as Route.LoaderArgs);

    expect(getPokemonDetails).toHaveBeenCalledWith(pokemonName);
    expect(res).toEqual(mockResponse);
  });
});
