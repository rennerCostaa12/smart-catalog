import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useCart } from "../../../../context/cart/useCart";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Mask } from "../../../../utils/mask";
import { RedirectContact } from "../../../../utils/redirectContact";
import { DeliveryMethodEnum } from "../DeliveryMethod/types";
import { MethodPaymentEnum } from "../MethodPayment/types";
import { getOrderWhatsAppMessage } from "./constants";
import { modalListItemsSchema } from "./schema";
import type { IModalListItemsFormData } from "./types";

export function useModalListItems() {
  const { addCart, removeCart, removeProductCart, cart: items } = useCart();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IModalListItemsFormData>({
    resolver: yupResolver(
      modalListItemsSchema,
    ) as Resolver<IModalListItemsFormData>,
    defaultValues: {
      deliveryMethod: DeliveryMethodEnum.DELIVERY,
      addressValue: "",
      receiverNameValue: "",
      methodPayment: MethodPaymentEnum.CARD,
      cashChangeValue: "",
    },
    mode: "onChange",
  });

  const watchedMethodPayment = watch("methodPayment");
  const watchedCashChangeValue = watch("cashChangeValue");

  const cashChangeError =
    watchedMethodPayment === MethodPaymentEnum.MONEY &&
    watchedCashChangeValue &&
    Mask.parseCurrencyBRL(watchedCashChangeValue) < totalPrice
      ? "O troco nao pode ser menor que o valor total do pedido."
      : undefined;

  const handleDecreaseCart = (productTitle: string) => {
    removeCart(productTitle);
  };

  const handleIncreaseCart = (product: (typeof items)[number]) => {
    addCart(product);
  };

  const handleRemoveProductCart = (productTitle: string) => {
    removeProductCart(productTitle);
  };

  const handleBuyWpp = handleSubmit((values) => {
    if (
      values.methodPayment === MethodPaymentEnum.MONEY &&
      values.cashChangeValue &&
      Mask.parseCurrencyBRL(values.cashChangeValue) < totalPrice
    ) {
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

    RedirectContact(
      "5585989734951",
      getOrderWhatsAppMessage(
        items,
        brlFormatter.format(totalPrice),
        deliveryMethodLabel,
        deliveryDetails,
        values.methodPayment === MethodPaymentEnum.CARD ? "Cartão" : "Dinheiro",
        values.methodPayment === MethodPaymentEnum.MONEY
          ? values.cashChangeValue
          : undefined,
      ),
    );
  });

  return {
    control,
    errors,
    cashChangeError,
    totalPrice,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    items,
    handleBuyWpp,
  };
}
