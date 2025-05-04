import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { Home, PokemonListPage } from "~/features/pokemon/pages";
import userEvent from "@testing-library/user-event";

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

const setupRouterAndRender = (initialUrl: string) => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/pokemons",
      Component: PokemonListPage,
      loader({ request }) {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get("limit") ?? 10);
        const offset = Number(url.searchParams.get("offset") ?? 0);

        const paginated = mockPokemons.slice(offset, offset + limit);
        return {
          pokemons: paginated,
          total: mockPokemons.length,
          limit,
          offset,
        };
      },
    },
  ]);

  render(<Stub initialEntries={[initialUrl]} />);
};

describe("Home test", () => {
  beforeEach(() => {
    setupRouterAndRender("/");
  });

  test("renders titles and include button to navigate", async () => {
    await waitFor(() => {
      expect(screen.getByText("Welcome to Pokemon App!")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "See Pokemons" })
      ).toBeInTheDocument();
    });
  });

  test("navigate to pokemons list", async () => {
    await waitFor(() => screen.getByText("See Pokemons"));

    await userEvent.click(screen.getByText("See Pokemons"));

    await waitFor(() => {
      expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
    });
  });
});
