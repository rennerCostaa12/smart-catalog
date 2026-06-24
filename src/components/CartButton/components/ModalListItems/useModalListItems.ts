import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCart } from "../../../../context/cart/useCart";
import { useAuth } from "../../../../context/auth/useAuth";
import { useCatalogClient } from "../../../../context/catalogClient/useCatalogClient";
import { ordersService } from "../../../../services/orders";
import { createOrderPayload } from "../../../../services/orders/createOrderPayload";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Mask } from "../../../../utils/mask";
import { RedirectContact } from "../../../../utils/redirectContact";
import { DeliveryMethodEnum } from "../DeliveryMethod/types";
import {
  MethodPaymentEnum,
  type ICardPaymentErrors,
  type ICardPaymentValues,
} from "../MethodPayment/types";
import { getOrderWhatsAppMessage } from "./constants";
import { modalListItemsSchema } from "./schema";
import type { IModalListItemsFormData } from "./types";

export function useModalListItems() {
  const { addCart, removeCart, removeProductCart, cart: items } = useCart();
  const { user } = useAuth();
  const { getInfoCatalogClient } = useCatalogClient();
  const catalogClient = getInfoCatalogClient();

  const totalPrice = items.reduce(
    (total, item) => total + item.value * item.quantity,
    0,
  );

  const {
    control,
    handleSubmit,
    setValue,
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
      documentValue: "",
      methodPayment: MethodPaymentEnum.CARD,
      cardHolderName: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
      holderName: "",
      holderEmail: "",
      holderDocument: "",
      holderZipCode: "",
      holderAddressNumber: "",
      holderPhone: "",
    },
    mode: "onChange",
  });

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

  const handleCardValueChange = (
    field: keyof ICardPaymentValues,
    value: string,
  ) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleDecreaseCart = (productId: number) => {
    removeCart(productId);
  };

  const handleIncreaseCart = (product: (typeof items)[number]) => {
    addCart(product);
  };

  const handleRemoveProductCart = (productId: number) => {
    removeProductCart(productId);
  };

  const orderMutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error("Entre na sua conta antes de finalizar o pedido.");
      }

      if (!catalogClient?.id) {
        throw new Error("Não foi possível identificar o catálogo do pedido.");
      }

      return ordersService.createOrders(
        createOrderPayload(items, catalogClient.id, totalPrice),
        String(user.id),
        user.token,
      );
    },
  });

  const handleBuyWpp = handleSubmit(async (values) => {
    if (items.length === 0) {
      return;
    }

    try {
      const order = await orderMutation.mutateAsync();

      const deliveryMethodLabel =
        values.deliveryMethod === DeliveryMethodEnum.DELIVERY
          ? "Entrega"
          : "Retirar";

      const deliveryDetails =
        values.deliveryMethod === DeliveryMethodEnum.DELIVERY
          ? `Endereco: ${values.addressValue}\nRecebedor: ${values.receiverNameValue}`
          : "Retirada no local";
      const cardLastDigits = Mask.parseDocument(values.cardNumber ?? "").slice(
        -4,
      );
      const paymentDetails =
        values.methodPayment === MethodPaymentEnum.CARD
          ? [
              "Dados do pagamento:",
              `Cartão final: **** ${cardLastDigits}`,
              `Nome impresso no cartão: ${values.cardHolderName ?? ""}`,
              `Titular: ${values.holderName ?? ""}`,
              `Email: ${values.holderEmail ?? ""}`,
              `Documento do titular: ${values.holderDocument ?? ""}`,
              `CEP: ${values.holderZipCode ?? ""}`,
              `Número de endereço: ${values.holderAddressNumber ?? ""}`,
              `Telefone: ${values.holderPhone ?? ""}`,
            ].join("\n")
          : "";

      RedirectContact(
        "5585989734951",
        getOrderWhatsAppMessage(
          items,
          brlFormatter.format(totalPrice),
          deliveryMethodLabel,
          deliveryDetails,
          values.documentValue,
          values.methodPayment === MethodPaymentEnum.CARD ? "Cartão" : "Pix",
          [`Pedido criado: #${order.id}`, paymentDetails]
            .filter(Boolean)
            .join("\n"),
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível criar o pedido. Verifique os dados e tente novamente.",
      );
    }
  });

  return {
    control,
    errors,
    cardValues,
    cardErrors,
    totalPrice,
    handleCardValueChange,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    items,
    handleBuyWpp,
    isSubmitting: orderMutation.isPending,
  };
}
