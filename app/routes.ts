import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  ...prefix("pokemons", [index("routes/pokemons/index.tsx")]),
] satisfies RouteConfig;
