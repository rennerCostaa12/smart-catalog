import { useState } from "react";
import { useCart } from "../../../../context/cart/useCart";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Mask } from "../../../../utils/mask";
import { RedirectContact } from "../../../../utils/redirectContact";
import { getOrderWhatsAppMessage } from "./constants";
import { MethodPaymentEnum } from "../MethodPayment/types";

export function useModalListItems() {
  const { addCart, removeCart, removeProductCart, cart: items } = useCart();
  const [methodPayment, setMethodPayment] = useState<MethodPaymentEnum>(
    MethodPaymentEnum.CARD,
  );
  const [cashChangeValue, setCashChangeValue] = useState("");

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const getMessageErrorCashChange = () => {
    if (methodPayment === MethodPaymentEnum.MONEY && cashChangeValue) {
      const hasIncorrectChangeAmount =
        Mask.parseCurrencyBRL(cashChangeValue) < totalPrice;

      if (hasIncorrectChangeAmount) {
        return "O troco nao pode ser menor que o valor total do pedido.";
      }
    }

    return undefined;
  };

  const cashChangeError = getMessageErrorCashChange();

  const handleDecreaseCart = (productTitle: string) => {
    removeCart(productTitle);
  };

  const handleIncreaseCart = (product: (typeof items)[number]) => {
    addCart(product);
  };

  const handleRemoveProductCart = (productTitle: string) => {
    removeProductCart(productTitle);
  };

  const handleBuyWpp = () => {
    if (cashChangeError) {
      return;
    }

    RedirectContact(
      "5585989734951",
      getOrderWhatsAppMessage(
        items,
        brlFormatter.format(totalPrice),
        methodPayment === "cartao" ? "Cartão" : "Dinheiro",
        methodPayment === MethodPaymentEnum.MONEY ? cashChangeValue : undefined,
      ),
    );
  };

  return {
    methodPayment,
    setMethodPayment,
    cashChangeValue,
    setCashChangeValue,
    cashChangeError,
    totalPrice,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    items,
    handleBuyWpp,
  };
}
