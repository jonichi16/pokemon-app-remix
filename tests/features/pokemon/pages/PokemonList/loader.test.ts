import type { Route } from ".react-router/types/app/routes/pokemons/+types/list";
import type { Mock } from "vitest";
import { loader } from "~/features/pokemon/pages/pokemon-list/loader";
import { getPokemonList } from "~/features/pokemon/services";

vi.mock("~/features/pokemon/services");

describe("pokemon list loader", () => {
  it("should return list of pokemons with default offset and limit", async () => {
    const limit = 10;
    const offset = 0;
    const mockResponse = {
      pokemons: [
        { name: "pikachu", url: "url1" },
        { name: "bulbasaur", url: "url2" },
      ],
      total: 2,
      limit,
      offset,
    };

    (getPokemonList as Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request("http://localhost/pokemons");
    const res = await loader({ request } as Route.LoaderArgs);

    expect(getPokemonList).toHaveBeenCalledWith(10, 0);
    expect(res).toEqual(mockResponse);
  });

  it("should return list based on the url", async () => {
    const limit = 2;
    const offset = 0;
    const mockResponse = {
      pokemons: [
        { name: "pikachu", url: "url1" },
        { name: "bulbasaur", url: "url2" },
      ],
      total: 2,
      limit,
      offset,
    };

    (getPokemonList as Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request(
      `http://localhost/pokemons?limit=${limit}&offset=${offset}`
    );
    const res = await loader({ request } as Route.LoaderArgs);

    expect(getPokemonList).toHaveBeenCalledWith(limit, offset);
    expect(res).toEqual(mockResponse);
  });
});
