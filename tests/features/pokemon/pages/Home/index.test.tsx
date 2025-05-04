import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Home } from "~/features/pokemon/pages";

describe("Home test", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  test("renders titles and include button to navigate", async () => {
    await waitFor(() => {
      expect(screen.getByText("Welcome to Pokemon App!")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "See Pokemons" })
      ).toBeInTheDocument();
    });
  });
});
