import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("pokemons", [
    index("routes/pokemons/list.tsx"),
    route("/:name", "routes/pokemons/details.tsx"),
  ]),
] satisfies RouteConfig;
