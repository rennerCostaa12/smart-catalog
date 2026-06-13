import { type RouteConfig, index, route } from "@react-router/dev/routes";

import { ROUTES, ROUTE_SEGMENTS } from "./constants";

export const routesApplication = [
  index("routes/home.tsx"),
  route(ROUTES.products.root, "routes/products.tsx", [
    index("routes/products/index.tsx"),
    route(
      ROUTE_SEGMENTS.products.listProducts,
      "routes/products/listproducts.tsx",
    ),
    route(ROUTE_SEGMENTS.products.carts, "routes/products/carts.tsx"),
    route(ROUTE_SEGMENTS.products.myOrders, "routes/products/myorders.tsx"),
    route(ROUTE_SEGMENTS.products.aboutUs, "routes/products/aboutus.tsx"),
    route(ROUTE_SEGMENTS.products.contact, "routes/products/contact.tsx"),
  ]),
  route(ROUTES.admin.root, "routes/admin.tsx", [
    index("routes/admin/index.tsx"),
    route(ROUTE_SEGMENTS.admin.listProducts, "routes/admin/listproducts.tsx"),
    route(ROUTE_SEGMENTS.admin.products, "routes/admin/products.tsx"),
    route(ROUTE_SEGMENTS.admin.settings, "routes/admin/settings.tsx"),
  ]),
];

export default routesApplication satisfies RouteConfig;
