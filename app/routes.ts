import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const routesApplication = [
  index("routes/home.tsx"),
  route("/produtos", "routes/products.tsx", [
    index("routes/products/index.tsx"),
    route("listar-produtos", "routes/products/listproducts.tsx"),
    route("sobre-nos", "routes/products/aboutus.tsx"),
    route("contato", "routes/products/contact.tsx"),
  ]),
  route("/admin", "routes/admin.tsx"),
];

export default routesApplication satisfies RouteConfig;
