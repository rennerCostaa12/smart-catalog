import { useState } from "react";

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

const initialCardValues: ICardPaymentValues = {
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
};

function getCardPaymentErrors(cardValues: ICardPaymentValues) {
  const cardNumberDigits = Mask.parseDocument(cardValues.cardNumber);
  const holderDocumentDigits = Mask.parseDocument(cardValues.holderDocument);
  const holderZipCodeDigits = Mask.parseDocument(cardValues.holderZipCode);
  const holderPhoneDigits = Mask.parseDocument(cardValues.holderPhone);
  const expirationMonthNumber = Number(cardValues.expirationMonth);

  return {
    cardHolderName: !cardValues.cardHolderName.trim()
      ? "Informe o nome do titular"
      : undefined,
    cardNumber:
      cardNumberDigits.length < 13 ? "Informe o numero do cartao" : undefined,
    expirationMonth:
      !cardValues.expirationMonth ||
      expirationMonthNumber < 1 ||
      expirationMonthNumber > 12
        ? "Informe o mes de expiracao"
        : undefined,
    expirationYear:
      cardValues.expirationYear.length !== 4
        ? "Informe o ano de expiracao"
        : undefined,
    cvv: cardValues.cvv.length < 3 ? "Informe o CVV" : undefined,
    holderName: !cardValues.holderName.trim()
      ? "Informe o nome do titular"
      : undefined,
    holderEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardValues.holderEmail)
      ? undefined
      : "Informe um email valido",
    holderDocument:
      holderDocumentDigits.length !== 11 && holderDocumentDigits.length !== 14
        ? "Informe um documento valido"
        : undefined,
    holderZipCode:
      holderZipCodeDigits.length !== 8 ? "Informe o CEP" : undefined,
    holderAddressNumber: !cardValues.holderAddressNumber.trim()
      ? "Informe o numero"
      : undefined,
    holderPhone:
      holderPhoneDigits.length < 10 ? "Informe o telefone" : undefined,
  } satisfies ICardPaymentErrors;
}

export function useCart() {
  const { cart, addCart, removeCart, removeProductCart } = useCartContext();
  const [deliveryMethod, setDeliveryMethod] = useState(
    DeliveryMethodEnum.DELIVERY,
  );
  const [addressValue, setAddressValue] = useState("");
  const [receiverNameValue, setReceiverNameValue] = useState("");
  const [documentValue, setDocumentValue] = useState("");
  const [methodPayment, setMethodPayment] = useState(MethodPaymentEnum.CARD);
  const [cardValues, setCardValues] =
    useState<ICardPaymentValues>(initialCardValues);
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
  const documentDigits = Mask.parseDocument(documentValue);
  const documentError =
    showErrors && !documentDigits
      ? "Informe o CPF/CNPJ"
      : showErrors &&
          documentDigits.length !== 11 &&
          documentDigits.length !== 14
        ? "Informe um CPF/CNPJ valido"
        : undefined;
  const shouldValidateCard =
    showErrors && methodPayment === MethodPaymentEnum.CARD;
  const cardErrors: ICardPaymentErrors = shouldValidateCard
    ? getCardPaymentErrors(cardValues)
    : {};
  const hasCardError = Object.values(cardErrors).some(Boolean);
  const hasFormError = Boolean(
    addressError || receiverNameError || documentError || hasCardError,
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

  const handleCardValueChange = (
    field: keyof ICardPaymentValues,
    value: string,
  ) => {
    setCardValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleBuyWpp = () => {
    setShowErrors(true);

    const hasDeliveryError =
      deliveryMethod === DeliveryMethodEnum.DELIVERY &&
      (!addressValue.trim() || !receiverNameValue.trim());
    const hasDocumentError =
      !documentDigits ||
      (documentDigits.length !== 11 && documentDigits.length !== 14);
    const currentCardErrors =
      methodPayment === MethodPaymentEnum.CARD
        ? getCardPaymentErrors(cardValues)
        : {};
    const hasCurrentCardError = Object.values(currentCardErrors).some(Boolean);

    if (
      cart.length === 0 ||
      hasDeliveryError ||
      hasDocumentError ||
      hasCurrentCardError
    ) {
      return;
    }

    const deliveryMethodLabel =
      deliveryMethod === DeliveryMethodEnum.DELIVERY ? "Entrega" : "Retirar";
    const deliveryDetails =
      deliveryMethod === DeliveryMethodEnum.DELIVERY
        ? `Endereco: ${addressValue}\nRecebedor: ${receiverNameValue}`
        : "Retirada no local";
    const methodPaymentLabel =
      methodPayment === MethodPaymentEnum.CARD ? "Cartão" : "Pix";
    const cardNumberDigits = Mask.parseDocument(cardValues.cardNumber);
    const cardLastDigits = cardNumberDigits.slice(-4);
    const paymentDetails =
      methodPayment === MethodPaymentEnum.CARD
        ? [
            "Dados do pagamento:",
            `Cartão final: **** ${cardLastDigits}`,
            `Nome impresso no cartão: ${cardValues.cardHolderName}`,
            `Titular: ${cardValues.holderName}`,
            `Email: ${cardValues.holderEmail}`,
            `Documento do titular: ${cardValues.holderDocument}`,
            `CEP: ${cardValues.holderZipCode}`,
            `Número de endereço: ${cardValues.holderAddressNumber}`,
            `Telefone: ${cardValues.holderPhone}`,
          ].join("\n")
        : "";

    RedirectContact(
      "5585989734951",
      getOrderWhatsAppMessage(
        cart,
        brlFormatter.format(totalPrice),
        deliveryMethodLabel,
        deliveryDetails,
        documentValue,
        methodPaymentLabel,
        paymentDetails,
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
    documentValue,
    setDocumentValue,
    addressError,
    receiverNameError,
    documentError,
    methodPayment,
    setMethodPayment,
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
