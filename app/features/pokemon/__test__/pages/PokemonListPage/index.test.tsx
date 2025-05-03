import { createRoutesStub, redirect } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { PokemonListPage } from "~/features/pokemon/pages";

// const mockPokemons = [
//   { name: "pikachu", url: "url1" },
//   { name: "bulbasuar", url: "url2" },
//   { name: "charmander", url: "url1" },
//   { name: "squirtle", url: "url2" },
//   { name: "moltres", url: "url1" },
//   { name: "articuno", url: "url2" },
//   { name: "zapdos", url: "url1" },
//   { name: "lapras", url: "url2" },
//   { name: "jigglypuff", url: "url1" },
//   { name: "meowth", url: "url2" },
//   { name: "caterpie", url: "url1" },
//   { name: "wartortle", url: "url2" },
// ];

const setupRouterAndRender = (initialUrl: string) => {
  const Stub = createRoutesStub([
    {
      path: "/",
      loader() {
        return redirect("/pokemons");
      },
    },
    {
      path: "/pokemons",
      Component: PokemonListPage,
    },
  ]);

  render(<Stub initialEntries={[initialUrl]} />);
};

describe("PokemonListPage", () => {
  test("redirect to pokemons list and render the correct page", async () => {
    setupRouterAndRender("/");

    await waitFor(() => {
      expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
    });
  });
});
