import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("pokemons", [index("routes/pokemons/list.tsx")]),
] satisfies RouteConfig;
