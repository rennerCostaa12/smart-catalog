import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { ROUTE_SEGMENTS } from "../../../../app/constants";
import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { getOrderWhatsAppMessage } from "../../../components/CartButton/components/ModalListItems/constants";
import { MethodPaymentEnum } from "../../../components/CartButton/components/MethodPayment/types";
import { useCart as useCartContext } from "../../../context/cart/useCart";
import type { ICartItem } from "../../../context/cart/types";
import { brlFormatter } from "../../../utils/brlFormatter";
import { Mask } from "../../../utils/mask";
import { RedirectContact } from "../../../utils/redirectContact";
import { initialCartFormValues, WHATSAPP_SELLER } from "./constants";
import { cartSchema } from "./schema";
import type { CartFormData } from "./types";
import { useAuth } from "../../../context/auth/useAuth";
import { paymentService, type CatalogClient } from "../../../services";
import type { AsaasPaymentResponse } from "../../../services/payment/types";
import { getCurrentDate } from "../../../utils/dates";
import {
  formatPaymentStatus,
  SUCCESSFUL_CARD_PAYMENT_STATUSES,
} from "../../../utils/formatStatusAsaas";
import { useCatalogClient } from "../../../context/catalogClient/useCatalogClient";
import { ordersService } from "../../../services/orders";
import { createOrderPayload } from "../../../services/orders/createOrderPayload";
import {
  getOrderDeliveryMethod,
  getOrderMethodPayment,
} from "../../../utils/orderMethods";
import { QrCode } from "lucide-react";
import { WhatsAppIcon } from "../../../components/WhatsAppIcon";
import { ThemeColors } from "../../../constants/themeColors";

async function createPayment(
  cart: ICartItem[],
  values: CartFormData,
  userId: string | number,
  totalPrice: number,
  userName: string,
  catalogClient: CatalogClient | undefined,
): Promise<AsaasPaymentResponse> {
  const description = cart
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ")
    .slice(0, 500);

  const commonPaymentData = {
    userId,
    value: totalPrice,
    dueDate: getCurrentDate(),
    description,
    catalogClientId: catalogClient?.id,
  };

  if (values.methodPayment === MethodPaymentEnum.CARD) {
    const responseMethodPaymentCard =
      await paymentService.createCreditCardPayment({
        ...commonPaymentData,
        creditCard: {
          holderName: values.cardHolderName.trim(),
          number: Mask.parseDocument(values.cardNumber),
          expiryMonth: values.expirationMonth,
          expiryYear: values.expirationYear,
          ccv: values.cvv,
        },
        creditCardHolderInfo: {
          name: values.holderName.trim(),
          email: values.holderEmail.trim(),
          cpfCnpj: Mask.parseDocument(values.holderDocument),
          postalCode: Mask.parseDocument(values.holderZipCode),
          addressNumber: values.holderAddressNumber.trim(),
          phone: Mask.parseDocument(values.holderPhone),
        },
        remoteIp: window.location.hostname,
      });

    return responseMethodPaymentCard;
  }

  const payloadPix = {
    ...commonPaymentData,
    customerData: {
      name: userName,
      cpfCnpj: values?.documentValue,
      externalReference: userId as string,
    },
  };

  return paymentService.createPixPayment(payloadPix);
}

function formatTemplateMessage(
  values: CartFormData,
  payment: AsaasPaymentResponse,
) {
  const deliveryMethodLabel =
    values.deliveryMethod === DeliveryMethodEnum.DELIVERY
      ? "Entrega"
      : "Retirar";

  const deliveryDetails =
    values.deliveryMethod === DeliveryMethodEnum.DELIVERY
      ? `Endereco: ${values.addressValue}\nRecebedor: ${values.receiverNameValue}`
      : "Retirada no local";

  const methodPaymentLabel =
    values.methodPayment === MethodPaymentEnum.CARD ? "Cartão" : "Pix";

  const paymentLink = payment?.data?.paymentLink ?? payment?.data?.invoiceUrl;

  const cardReceipt =
    values.methodPayment === MethodPaymentEnum.CARD &&
    SUCCESSFUL_CARD_PAYMENT_STATUSES.has(payment?.data?.status) &&
    payment?.data?.transactionReceiptUrl
      ? `Comprovante: ${payment?.data?.transactionReceiptUrl}`
      : "";

  const paymentDetails = [
    `Pagamento criado: ${payment?.data?.id}`,
    `Status: ${formatPaymentStatus(payment?.data?.status)}`,
    paymentLink ? `Link de pagamento: ${paymentLink}` : "",
    cardReceipt,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    deliveryMethodLabel,
    deliveryDetails,
    methodPaymentLabel,
    paymentDetails,
  };
}

function getStockBlockingMessage(cart: ICartItem[]) {
  const itemsWithInsufficientStock = cart.filter(
    (item) => item.quantity > item.stock,
  );

  if (!itemsWithInsufficientStock.length) {
    return "";
  }

  if (itemsWithInsufficientStock.length === 1) {
    const [item] = itemsWithInsufficientStock;

    return `Nao e possivel finalizar a compra: ${item.name} tem ${item.stock} unidade(s) em estoque, mas ha ${item.quantity} no carrinho.`;
  }

  const productNames = itemsWithInsufficientStock
    .map((item) => item.name)
    .join(", ");

  return `Nao e possivel finalizar a compra: os produtos ${productNames} estao com quantidade acima do estoque disponivel.`;
}

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart, resetCart } =
    useCartContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { getInfoCatalogClient } = useCatalogClient();

  const [openModalConfirmCheckout, setOpenModalConfirmCheckout] =
    useState<boolean>(false);

  const { catalogClientName = "" } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitted, isSubmitting: isFormSubmitting, isValid },
  } = useForm<CartFormData>({
    resolver: yupResolver(cartSchema) as Resolver<CartFormData>,
    defaultValues: {
      ...initialCartFormValues,
      holderEmail: user?.email ?? "",
      holderPhone: user?.phone ?? "",
    },
    mode: "onChange",
  });

  const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart?.reduce(
    (total, item) => total + item.value * item.quantity,
    0,
  );
  const methodPayment = watch("methodPayment");
  const hasFormError = isSubmitted && !isValid;
  const stockBlockingMessage = useMemo(
    () => getStockBlockingMessage(cart),
    [cart],
  );
  const hasInsufficientStock = Boolean(stockBlockingMessage);

  const catalogClient = getInfoCatalogClient();

  const paymentMutation = useMutation({
    mutationFn: (values: CartFormData) => {
      if (!user) {
        throw new Error("Entre na sua conta antes de finalizar o pagamento.");
      }

      return createPayment(
        cart,
        values,
        user.id,
        totalPrice,
        user.name,
        catalogClient,
      );
    },
  });

  const orderMutation = useMutation({
    mutationFn: (values: CartFormData) => {
      if (!user) {
        throw new Error("Entre na sua conta antes de finalizar o pedido.");
      }

      if (!catalogClient?.id) {
        throw new Error("Não foi possível identificar o catálogo do pedido.");
      }

      return ordersService.createOrders(
        createOrderPayload(
          cart,
          catalogClient.id,
          totalPrice,
          getOrderMethodPayment(values.methodPayment),
          getOrderDeliveryMethod(values.deliveryMethod),
          Number(values?.paymentId),
          Number(values?.userAddressId),
        ),
        String(user?.id),
      );
    },
  });

  const handleDecreaseProductQuantity = (productId: number) => {
    removeCart(productId);
  };

  const handleIncreaseProductQuantity = (product: ICartItem) => {
    addCart(product);
  };

  const handleRemoveProduct = (productId: number) => {
    removeProductCart(productId);
  };

  const handleBuyWpp = handleSubmit(async (values) => {
    if (cart.length === 0) {
      return;
    }

    if (hasInsufficientStock) {
      return;
    }

    if (!user) {
      toast.error("Entre na sua conta antes de finalizar o pagamento.");
      return;
    }

    try {
      const payment = await paymentMutation.mutateAsync(values);
      const order = await orderMutation.mutateAsync({
        ...values,
        paymentId: payment.data.paymentId,
      });
      await queryClient.invalidateQueries({
        queryKey: ["orders", "list", String(user.id)],
      });

      const {
        deliveryDetails,
        deliveryMethodLabel,
        methodPaymentLabel,
        paymentDetails,
      } = formatTemplateMessage(values, payment);

      RedirectContact(
        WHATSAPP_SELLER,
        getOrderWhatsAppMessage(
          cart,
          brlFormatter.format(totalPrice),
          deliveryMethodLabel,
          deliveryDetails,
          values.documentValue,
          methodPaymentLabel,
          [`Pedido criado: #${order?.data?.id}`, paymentDetails]
            .filter(Boolean)
            .join("\n"),
        ),
      );

      setOpenModalConfirmCheckout(false);
      resetCart();
      navigate(`../${ROUTE_SEGMENTS.products.myOrders}`);
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível criar o pagamento. Verifique os dados e tente novamente.",
      );
    }
  });

  const handleOpenModalConfirmation = handleSubmit(async (values) => {
    if (hasInsufficientStock) {
      return;
    }

    if (values.methodPayment === MethodPaymentEnum.PIX) {
      if (cart.length === 0) {
        return;
      }

      if (!user) {
        toast.error("Entre na sua conta antes de finalizar o pagamento.");
        return;
      }

      try {
        const payment = await paymentMutation.mutateAsync(values);
        const pixPaymentId = payment.data.paymentId;

        if (!pixPaymentId) {
          throw new Error("Nao foi possivel identificar o pagamento Pix.");
        }

        const userAddressId =
          values?.userAddressId === 0 ? null : values?.userAddressId;

        const order = await orderMutation.mutateAsync({
          ...values,
          paymentId: pixPaymentId,
          userAddressId: userAddressId ?? null,
        });

        await queryClient.invalidateQueries({
          queryKey: ["orders", "list", String(user.id)],
        });

        const orderIdSearchParam = order?.data?.id
          ? `?orderId=${encodeURIComponent(order.data.id)}`
          : "";

        navigate(
          `/${catalogClientName}/${ROUTE_SEGMENTS.pixCheckout}/${payment?.data?.id}${orderIdSearchParam}`,
        );
      } catch (error) {
        console.error(error);
        toast.error(
          (error instanceof Error ? error.message : undefined) ??
            "Não foi possível criar o pagamento Pix. Verifique os dados e tente novamente.",
        );
      }

      return;
    }

    setOpenModalConfirmCheckout(true);
  });

  const variantBtnCheckout =
    methodPayment === MethodPaymentEnum.PIX ? "primary" : "whatsapp";

  const iconBtnCheckout =
    methodPayment === MethodPaymentEnum.PIX ? (
      <QrCode size={18} />
    ) : (
      <WhatsAppIcon color={ThemeColors.white} />
    );

  const labelBtnCheckout =
    methodPayment === MethodPaymentEnum.PIX
      ? "Pagar com Pix"
      : "Finalizar Pedido";

  return {
    cart,
    totalItems,
    totalPrice,
    control,
    hasFormError,
    isSubmitting:
      isFormSubmitting ||
      paymentMutation?.isPending ||
      orderMutation?.isPending,
    hasInsufficientStock,
    stockBlockingMessage,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
    openModalConfirmCheckout,
    setOpenModalConfirmCheckout,
    handleOpenModalConfirmation,
    variantBtnCheckout,
    iconBtnCheckout,
    labelBtnCheckout,
  };
}
