export const ROUTE_SEGMENTS = {
  products: {
    listProducts: "listar-produtos",
    carts: "carrinhos",
    myOrders: "meus-pedidos",
    aboutUs: "sobre-nos",
    contact: "contato",
  },
  admin: {
    listProducts: "lista-produtos",
    products: "produtos",
    settings: "configuracoes",
  },
};

export const ROUTES = {
  home: "/",
  products: {
    root: "/produtos",
    listProducts: `/produtos/${ROUTE_SEGMENTS.products.listProducts}`,
    carts: `/produtos/${ROUTE_SEGMENTS.products.carts}`,
    myOrders: `/produtos/${ROUTE_SEGMENTS.products.myOrders}`,
    aboutUs: `/produtos/${ROUTE_SEGMENTS.products.aboutUs}`,
    contact: `/produtos/${ROUTE_SEGMENTS.products.contact}`,
  },
  admin: {
    root: "/admin",
    listProducts: `/admin/${ROUTE_SEGMENTS.admin.listProducts}`,
    products: `/admin/${ROUTE_SEGMENTS.admin.products}`,
    settings: `/admin/${ROUTE_SEGMENTS.admin.settings}`,
  },
};
