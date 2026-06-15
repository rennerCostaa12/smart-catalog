import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { getOrderWhatsAppMessage } from "../../../components/CartButton/components/ModalListItems/constants";
import { MethodPaymentEnum } from "../../../components/CartButton/components/MethodPayment/types";
import { useCart as useCartContext } from "../../../context/cart/useCart";
import type { ICartItem } from "../../../context/cart/types";
import { brlFormatter } from "../../../utils/brlFormatter";
import { Mask } from "../../../utils/mask";
import { RedirectContact } from "../../../utils/redirectContact";
import { initialCartFormValues } from "./constants";
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

async function createPayment(
  cart: ICartItem[],
  values: CartFormData,
  userId: string | number,
  userToken: string,
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
      await paymentService.createCreditCardPayment(
        {
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
        },
        userToken,
      );

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

  return paymentService.createPixPayment(payloadPix, userToken);
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

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart } = useCartContext();
  const { user } = useAuth();

  const { getInfoCatalogClient } = useCatalogClient();

  const {
    control,
    handleSubmit,
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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.value * item.quantity,
    0,
  );
  const hasFormError = isSubmitted && !isValid;

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
        user.token,
        totalPrice,
        user.name,
        catalogClient,
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

    if (!user) {
      toast.error("Entre na sua conta antes de finalizar o pagamento.");
      return;
    }

    try {
      const payment = await paymentMutation.mutateAsync(values);

      const {
        deliveryDetails,
        deliveryMethodLabel,
        methodPaymentLabel,
        paymentDetails,
      } = formatTemplateMessage(values, payment);

      RedirectContact(
        "5585989734951",
        getOrderWhatsAppMessage(
          cart,
          brlFormatter.format(totalPrice),
          deliveryMethodLabel,
          deliveryDetails,
          values.documentValue,
          methodPaymentLabel,
          paymentDetails,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível criar o pagamento. Verifique os dados e tente novamente.",
      );
    }
  });

  return {
    cart,
    totalItems,
    totalPrice,
    control,
    hasFormError,
    isSubmitting: isFormSubmitting || paymentMutation.isPending,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  };
}
