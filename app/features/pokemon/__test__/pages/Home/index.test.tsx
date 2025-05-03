import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "~/routes/home";

const setupRouterAndRender = (initialUrl: string) => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Home,
    },
  ]);

  render(<Stub initialEntries={[initialUrl]} />);
};

describe("Home test", () => {
  test("renders titles and include button to navigate", async () => {
    setupRouterAndRender("/");

    await waitFor(() => {
      expect(screen.getByText("Welcome to Pokemon App!")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "See Pokemons" })
      ).toBeInTheDocument();
    });
  });
});
