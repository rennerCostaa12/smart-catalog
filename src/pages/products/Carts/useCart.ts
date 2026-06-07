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

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart } = useCartContext();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isValid },
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
    hasFormError,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  };
}
