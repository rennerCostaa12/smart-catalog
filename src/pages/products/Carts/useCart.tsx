import { useState } from "react";

import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { getOrderWhatsAppMessage } from "../../../components/CartButton/components/ModalListItems/constants";
import { MethodPaymentEnum } from "../../../components/CartButton/components/MethodPayment/types";
import { useCart as useCartContext } from "../../../context/cart/useCart";
import type { ICartItem } from "../../../context/cart/types";
import { brlFormatter } from "../../../utils/brlFormatter";
import { Mask } from "../../../utils/mask";
import { RedirectContact } from "../../../utils/redirectContact";

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart } = useCartContext();
  const [deliveryMethod, setDeliveryMethod] = useState(
    DeliveryMethodEnum.DELIVERY,
  );
  const [addressValue, setAddressValue] = useState("");
  const [receiverNameValue, setReceiverNameValue] = useState("");
  const [methodPayment, setMethodPayment] = useState(MethodPaymentEnum.CARD);
  const [cashChangeValue, setCashChangeValue] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const addressError =
    showErrors &&
    deliveryMethod === DeliveryMethodEnum.DELIVERY &&
    !addressValue.trim()
      ? "Informe o endereco de entrega"
      : undefined;
  const receiverNameError =
    showErrors &&
    deliveryMethod === DeliveryMethodEnum.DELIVERY &&
    !receiverNameValue.trim()
      ? "Informe o nome do recebedor"
      : undefined;
  const cashChangeError =
    methodPayment === MethodPaymentEnum.MONEY
      ? showErrors && !cashChangeValue
        ? "Informe o valor do troco"
        : cashChangeValue && Mask.parseCurrencyBRL(cashChangeValue) < totalPrice
          ? "O troco nao pode ser menor que o valor total do pedido."
          : undefined
      : undefined;
  const hasFormError = Boolean(
    addressError || receiverNameError || cashChangeError,
  );

  const handleDecreaseProductQuantity = (productTitle: string) => {
    removeCart(productTitle);
  };

  const handleIncreaseProductQuantity = (product: ICartItem) => {
    addCart(product);
  };

  const handleRemoveProduct = (productTitle: string) => {
    removeProductCart(productTitle);
  };

  const handleBuyWpp = () => {
    setShowErrors(true);

    const hasDeliveryError =
      deliveryMethod === DeliveryMethodEnum.DELIVERY &&
      (!addressValue.trim() || !receiverNameValue.trim());
    const hasPaymentError =
      methodPayment === MethodPaymentEnum.MONEY &&
      (!cashChangeValue || Mask.parseCurrencyBRL(cashChangeValue) < totalPrice);

    if (cart.length === 0 || hasDeliveryError || hasPaymentError) {
      return;
    }

    const deliveryMethodLabel =
      deliveryMethod === DeliveryMethodEnum.DELIVERY ? "Entrega" : "Retirar";
    const deliveryDetails =
      deliveryMethod === DeliveryMethodEnum.DELIVERY
        ? `Endereco: ${addressValue}\nRecebedor: ${receiverNameValue}`
        : "Retirada no local";
    const methodPaymentLabel =
      methodPayment === MethodPaymentEnum.CARD ? "Cartão" : "Dinheiro";

    RedirectContact(
      "5585989734951",
      getOrderWhatsAppMessage(
        cart,
        brlFormatter.format(totalPrice),
        deliveryMethodLabel,
        deliveryDetails,
        methodPaymentLabel,
        methodPayment === MethodPaymentEnum.MONEY
          ? cashChangeValue
          : undefined,
      ),
    );
  };

  return {
    cart,
    totalItems,
    totalPrice,
    deliveryMethod,
    setDeliveryMethod,
    addressValue,
    setAddressValue,
    receiverNameValue,
    setReceiverNameValue,
    addressError,
    receiverNameError,
    methodPayment,
    setMethodPayment,
    cashChangeValue,
    setCashChangeValue,
    cashChangeError,
    hasFormError,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  };
}
