import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";

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
import { paymentService } from "../../../services";
import type { AsaasPaymentResponse } from "../../../services/payment/types";
import { getCurrentDate } from "../../../utils/dates";
import {
  formatPaymentStatus,
  SUCCESSFUL_CARD_PAYMENT_STATUSES,
} from "../../../utils/formatStatusAsaas";

async function createPayment(
  cart: ICartItem[],
  values: CartFormData,
  userId: string | number,
  userToken: string,
  totalPrice: number,
): Promise<AsaasPaymentResponse> {
  const description = cart
    .map((item) => `${item.quantity}x ${item.title}`)
    .join(", ")
    .slice(0, 500);

  const commonPaymentData = {
    userId,
    value: 200,
    dueDate: getCurrentDate(),
    description,
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

  return paymentService.createPixPayment(commonPaymentData, userToken);
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

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isSubmitting, isValid },
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
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const hasFormError = isSubmitted && !isValid;

  const handleDecreaseProductQuantity = (productTitle: string) => {
    removeCart(productTitle);
  };

  const handleIncreaseProductQuantity = (product: ICartItem) => {
    addCart(product);
  };

  const handleRemoveProduct = (productTitle: string) => {
    removeProductCart(productTitle);
  };

  const handleBuyWpp = handleSubmit(async (values) => {
    if (cart.length === 0) {
      return;
    }

    if (!user) {
      setError("root", {
        message: "Entre na sua conta antes de finalizar o pagamento.",
      });
      return;
    }

    try {
      const payment = await createPayment(
        cart,
        values,
        user.id,
        user.token,
        totalPrice,
      );

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
    } catch {
      setError("root", {
        message:
          "Não foi possível criar o pagamento. Verifique os dados e tente novamente.",
      });
    }
  });

  return {
    cart,
    totalItems,
    totalPrice,
    control,
    hasFormError,
    paymentError: errors.root?.message,
    isSubmitting,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  };
}
