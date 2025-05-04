import type { Mock } from "vitest";
import api from "~/common/utils/api";
import { getPokemonDetails, getPokemonList } from "~/features/pokemon/services";

vi.mock("~/common/utils/api");

describe("Pokemon Service test", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getPokemonList", () => {
    it("returns parsed data on success", async () => {
      const mockResponse = {
        data: {
          results: [{ name: "bulbasaur", url: "/pokemon/1" }],
          count: 151,
        },
      };

      (api.get as Mock).mockResolvedValueOnce(mockResponse);

      const result = await getPokemonList(10, 0);

      expect(api.get).toHaveBeenCalledWith("/pokemon?limit=10&offset=0");
      expect(result).toEqual({
        pokemons: [{ name: "bulbasaur", url: "/pokemon/1" }],
        total: 151,
        limit: 10,
        offset: 0,
      });
    });

    it("throws if API fails", async () => {
      (api.get as Mock).mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 404,
          data: { message: "Pokémon not found" },
        },
      });

      await expect(getPokemonList(10, 0)).rejects.toThrow("Pokémon not found");
    });
  });

  describe("getPokemonDetails", () => {
    it("return parsed data on success", async () => {
      const mockResponse = {
        data: {
          name: "pikachu",
          sprite: {
            front_default: "url",
          },
        },
      };

      (api.get as Mock).mockResolvedValueOnce(mockResponse);

      const result = await getPokemonDetails("pikachu");

      expect(api.get).toHaveBeenCalledWith("/pokemon/pikachu");
      expect(result).toEqual({
        name: "pikachu",
        sprite: "url",
      });
    });

    it("throws if API fails", async () => {
      (api.get as Mock).mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 404,
          data: { message: "Pokémon not found" },
        },
      });

      await expect(getPokemonDetails("pikachu")).rejects.toThrow(
        "Pokémon not found"
      );
    });
  });
});
