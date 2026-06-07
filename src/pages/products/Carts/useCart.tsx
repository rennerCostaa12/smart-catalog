import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";

import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { getOrderWhatsAppMessage } from "../../../components/CartButton/components/ModalListItems/constants";
import {
  MethodPaymentEnum,
  type ICardPaymentErrors,
  type ICardPaymentValues,
} from "../../../components/CartButton/components/MethodPayment/types";
import { useCart as useCartContext } from "../../../context/cart/useCart";
import type { ICartItem } from "../../../context/cart/types";
import { brlFormatter } from "../../../utils/brlFormatter";
import { Mask } from "../../../utils/mask";
import { RedirectContact } from "../../../utils/redirectContact";
import { initialCartFormValues } from "./constants";
import { cartSchema } from "./schema";
import type { CartFormData } from "./types";

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart } = useCartContext();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted, isValid },
  } = useForm<CartFormData>({
    resolver: yupResolver(cartSchema) as Resolver<CartFormData>,
    defaultValues: initialCartFormValues,
    mode: "onChange",
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cardValues: ICardPaymentValues = {
    cardHolderName: watch("cardHolderName") ?? "",
    cardNumber: watch("cardNumber") ?? "",
    expirationMonth: watch("expirationMonth") ?? "",
    expirationYear: watch("expirationYear") ?? "",
    cvv: watch("cvv") ?? "",
    holderName: watch("holderName") ?? "",
    holderEmail: watch("holderEmail") ?? "",
    holderDocument: watch("holderDocument") ?? "",
    holderZipCode: watch("holderZipCode") ?? "",
    holderAddressNumber: watch("holderAddressNumber") ?? "",
    holderPhone: watch("holderPhone") ?? "",
  };
  const cardErrors: ICardPaymentErrors = {
    cardHolderName: errors.cardHolderName?.message,
    cardNumber: errors.cardNumber?.message,
    expirationMonth: errors.expirationMonth?.message,
    expirationYear: errors.expirationYear?.message,
    cvv: errors.cvv?.message,
    holderName: errors.holderName?.message,
    holderEmail: errors.holderEmail?.message,
    holderDocument: errors.holderDocument?.message,
    holderZipCode: errors.holderZipCode?.message,
    holderAddressNumber: errors.holderAddressNumber?.message,
    holderPhone: errors.holderPhone?.message,
  };
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

  const handleCardValueChange = (
    field: keyof ICardPaymentValues,
    value: string,
  ) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleBuyWpp = handleSubmit((values) => {
    if (cart.length === 0) {
      return;
    }

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
    const cardNumberDigits = Mask.parseDocument(values.cardNumber);
    const cardLastDigits = cardNumberDigits.slice(-4);
    const paymentDetails =
      values.methodPayment === MethodPaymentEnum.CARD
        ? [
            "Dados do pagamento:",
            `Cartão final: **** ${cardLastDigits}`,
            `Nome impresso no cartão: ${values.cardHolderName}`,
            `Titular: ${values.holderName}`,
            `Email: ${values.holderEmail}`,
            `Documento do titular: ${values.holderDocument}`,
            `CEP: ${values.holderZipCode}`,
            `Número de endereço: ${values.holderAddressNumber}`,
            `Telefone: ${values.holderPhone}`,
          ].join("\n")
        : "";

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
  });

  return {
    cart,
    totalItems,
    totalPrice,
    control,
    errors,
    cardValues,
    cardErrors,
    handleCardValueChange,
    hasFormError,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  };
}
