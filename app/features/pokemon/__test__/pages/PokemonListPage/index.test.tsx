import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PokemonList } from "~/features/pokemon/pages";

const mockPokemons = [
  { name: "pikachu", url: "url1" },
  { name: "bulbasuar", url: "url2" },
  { name: "charmander", url: "url1" },
  { name: "squirtle", url: "url2" },
  { name: "moltres", url: "url1" },
  { name: "articuno", url: "url2" },
  { name: "zapdos", url: "url1" },
  { name: "lapras", url: "url2" },
  { name: "jigglypuff", url: "url1" },
  { name: "meowth", url: "url2" },
  { name: "caterpie", url: "url1" },
  { name: "wartortle", url: "url2" },
];

describe("PokemonListPage test", () => {
  test("renders list of pokemons", async () => {
    render(
      <MemoryRouter>
        <PokemonList
          pokemons={mockPokemons.slice(0, 10)}
          total={mockPokemons.length}
          limit={10}
          offset={0}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.queryByText("wartortle")).not.toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  test("navigates to next page and back", async () => {
    render(
      <MemoryRouter>
        <PokemonList
          pokemons={mockPokemons.slice(10, mockPokemons.length)}
          total={mockPokemons.length}
          limit={10}
          offset={10}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
      expect(screen.getByText("wartortle")).toBeInTheDocument();
      expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });
  });
});
