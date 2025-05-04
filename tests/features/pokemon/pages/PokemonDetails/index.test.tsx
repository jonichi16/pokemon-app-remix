import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PokemonDetails } from "~/features/pokemon/pages";

describe("PokemonDetails tests", () => {
  test("renders pokemons details passed to the component", async () => {
    const pokemon = {
      name: "pikachu",
      sprite: "url",
    };

    render(
      <MemoryRouter>
        <PokemonDetails pokemon={pokemon} />
      </MemoryRouter>
    );

    expect(screen.getByText("Pokemon Details")).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: "pikachu sprite" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "url");
    expect(screen.getByText("Back")).toBeInTheDocument();
  });
});
