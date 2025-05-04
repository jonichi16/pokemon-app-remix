import { render, waitFor, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { PokemonListPage } from "~/features/pokemon/pages";
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

describe("PokemonListPage test", () => {
  test("renders list of pokemons", async () => {
    setupRouterAndRender("/pokemons");

    await waitFor(() => {
      expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.queryByText("wartortle")).not.toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    });
  });

  test("navigates to next page and back", async () => {
    setupRouterAndRender("/pokemons");

    // wait for page to render
    await waitFor(() => screen.getByText("List of Pokemon"));

    await userEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("wartortle")).toBeInTheDocument();
      expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Previous"));

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.queryByText("wartortle")).not.toBeInTheDocument();
    });
  });
});
