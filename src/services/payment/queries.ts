import { queryOptions } from "@tanstack/react-query";
import { paymentService } from ".";

import type {} from "./types";

export const paymentsQueryKeys = {
  all: ["payments"],
  qrcode: (paymentId: string) => [
    ...paymentsQueryKeys.all,
    "qrcode",
    paymentId,
  ],
};

export function paymentsGetQRCodeQueryOptions(paymentId: string) {
  return queryOptions({
    queryKey: paymentsQueryKeys.qrcode(paymentId),
    queryFn: () => paymentService.getPixQrCode(paymentId),
    enabled: Boolean(paymentId),
  });
}
