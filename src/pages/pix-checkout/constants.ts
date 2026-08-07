import { ROUTE_SEGMENTS, ROUTES } from "~/constants";
import type { OrderResponse } from "../../services/orders/types";

const PATH_CART = (catalogClientName: string) =>
  `../${ROUTES.products.root}/${catalogClientName}/${ROUTE_SEGMENTS.products.carts}`;

const ORDER_ID_SEARCH_PARAM = "orderId";

function getIsPixExpired(expirationDate?: string | null) {
  if (!expirationDate) {
    return false;
  }

  const expirationTimestamp = new Date(expirationDate).getTime();

  if (Number.isNaN(expirationTimestamp)) {
    return false;
  }

  return Date.now() >= expirationTimestamp;
}

function getQrCodeImageSrc(encodedImageQrCode: string) {
  if (!encodedImageQrCode) {
    return "";
  }

  if (encodedImageQrCode.startsWith("data:image")) {
    return encodedImageQrCode;
  }

  return `data:image/png;base64,${encodedImageQrCode}`;
}

function getPurchaseDescription(order?: OrderResponse) {
  const items = order?.items ?? [];

  if (!items.length) {
    return "";
  }

  return items
    .map((item) => {
      const productName = item.product?.name ?? "Produto";

      return `${item.quantity}x ${productName}`;
    })
    .join(", ");
}

export {
  getPurchaseDescription,
  getQrCodeImageSrc,
  getIsPixExpired,
  PATH_CART,
  ORDER_ID_SEARCH_PARAM,
};
