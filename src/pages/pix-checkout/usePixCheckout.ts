import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
import { ordersGetByIdQueryOptions } from "../../services/orders/queries";
import { paymentsGetQRCodeQueryOptions } from "../../services/payment/queries";
import { brlFormatter } from "../../utils/brlFormatter";
import {
  getIsPixExpired,
  getPurchaseDescription,
  getQrCodeImageSrc,
  ORDER_ID_SEARCH_PARAM,
} from "./constants";

export function usePixCheckout() {
  const { paymentId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const { user, isLoadingUserData } = useAuth();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const orderId = searchParams.get(ORDER_ID_SEARCH_PARAM) ?? "";

  const userId = user?.id ? String(user.id) : "";

  const {
    data: dataQrCode,
    isPending: isLoadingQrCode,
    isFetching: isFetchingQrCode,
    isError: isErrorQrCode,
    error: errorQrCode,
    refetch: refetchQrCode,
  } = useQuery(paymentsGetQRCodeQueryOptions(paymentId));

  const {
    data: order,
    isPending: isPendingOrder,
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
  } = useQuery(ordersGetByIdQueryOptions(userId, orderId));

  const expirationPix = dataQrCode?.data?.expirationDate ?? null;
  const payloadQrCode = dataQrCode?.data?.payload ?? "";
  const encodeImageQrCode = dataQrCode?.data?.encodedImage ?? "";
  const isMissingPaymentId = !paymentId;
  const isExpired = getIsPixExpired(expirationPix);

  const formattedExpirationDate = useMemo(() => {
    if (!expirationPix) {
      return "";
    }

    return new Date(expirationPix).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [expirationPix]);

  const purchaseDescription = getPurchaseDescription(order?.data);
  const formattedOrderTotal =
    typeof order?.data?.total === "number"
      ? brlFormatter.format(order?.data?.total)
      : "";

  const isLoadingOrder =
    Boolean(orderId) &&
    (isLoadingUserData || (Boolean(userId) && isPendingOrder));

  const handleCopyPixCode = async () => {
    try {
      if (!payloadQrCode || isExpired) {
        return false;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(payloadQrCode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = payloadQrCode;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      toast.success("Codigo Pix copiado.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Nao foi possivel copiar o codigo Pix.");
    }
  };

  const handleBackPreviousPage = () => {
    navigate(-1);
  };

  const qrCodeImageSrc = getQrCodeImageSrc(encodeImageQrCode);
  const hasError = isMissingPaymentId || isErrorQrCode;

  return {
    copied,
    isExpired,
    payloadQrCode,
    expirationPix,
    formattedExpirationDate,
    isMissingPaymentId,
    errorQrCode,
    isLoadingQrCode,
    isFetchingQrCode,
    isLoadingOrder,
    isFetchingOrder,
    isErrorOrder,
    purchaseDescription,
    formattedOrderTotal,
    qrCodeImageSrc,
    hasError,
    refetchQrCode,
    handleCopyPixCode,
    handleBackPreviousPage,
  };
}
