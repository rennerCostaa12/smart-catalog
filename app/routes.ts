import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routesApplication = [
  index("routes/home.tsx"),
  route("/products", "routes/products.tsx"),
  route("/admin", "routes/admin.tsx"),
];

export default routesApplication satisfies RouteConfig;
