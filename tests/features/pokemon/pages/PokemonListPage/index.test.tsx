import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { mockPokemons } from "tests/__mock__/pokemon.mock";
import { PokemonList } from "~/features/pokemon/pages";

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
