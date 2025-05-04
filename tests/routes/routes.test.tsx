import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "~/routes/home";
import PokemonListPage from "~/routes/pokemons/list";
import PokemonDetailsPage from "~/routes/pokemons/details";
import { mockPokemons } from "tests/__mock__/pokemon.mock";

const setupRouterAndRender = (initialUrl: string) => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: HomePage,
    },
    {
      path: "/pokemons",
      Component: PokemonListPage,
      HydrateFallback: () => <div>Loading...</div>,
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
    {
      path: "/pokemons/:name",
      Component: PokemonDetailsPage,
      HydrateFallback: () => <div>Loading...</div>,
      loader({ params }) {
        const { name } = params;
        return {
          name,
          sprite: "url",
        };
      },
    },
  ]);

  render(<Stub initialEntries={[initialUrl]} />);
};

describe("Navigation test", () => {
  describe("HomePage navigation", () => {
    beforeEach(() => {
      setupRouterAndRender("/");
    });

    test("navigate to pokemons list", async () => {
      await waitFor(() => screen.getByText("See Pokemons"));

      await userEvent.click(screen.getByText("See Pokemons"));

      await waitFor(() => {
        expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
      });
    });
  });

  describe("PokemonListPage navigation", () => {
    beforeEach(() => {
      setupRouterAndRender("/pokemons");
    });

    test("pokemon list navigates to next page and back", async () => {
      await waitFor(() => screen.getByText("Next"));

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

    test("navigates back to home when home button was clicked", async () => {
      await waitFor(() => screen.getByText("pikachu"));

      const home = screen.getByText("Home");
      await userEvent.click(home);

      await waitFor(() => {
        expect(screen.getByText("Welcome to Pokemon App!")).toBeInTheDocument();
      });
    });

    test("navigates to pokemon details and can navigate back", async () => {
      await waitFor(() => screen.getByText("pikachu"));

      await userEvent.click(screen.getByText("pikachu"));

      await waitFor(() => {
        expect(screen.getByText("Pokemon Details")).toBeInTheDocument();
        expect(screen.getByText("pikachu")).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText("Back"));

      await waitFor(() => {
        expect(screen.getByText("List of Pokemon")).toBeInTheDocument();
        expect(screen.getByText("pikachu")).toBeInTheDocument();
      });
    });
  });
});
