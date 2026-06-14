import type { ICartItem } from "../../../../context/cart/types";
import { brlFormatter } from "../../../../utils/brlFormatter";

const ORDER_WHATSAPP_MESSAGE_TEMPLATE = `Olá! Tenho interesse em comprar os seguintes produtos:

{products}

Entrega: {deliveryMethod}
{deliveryDetails}
Documento: {document}

Forma de pagamento: {methodPayment}
{paymentDetails}

Total do pedido: {total}`;

export function getOrderWhatsAppMessage(
  items: ICartItem[],
  totalPrice: string,
  deliveryMethod: string,
  deliveryDetails: string,
  document: string,
  methodPayment: string,
  paymentDetails = "",
) {
  const products = items
    .map(
      (item) =>
        `- ${item.name} | Qtd: ${item.quantity} | Unitário: ${brlFormatter.format(item.value)} | Subtotal: ${brlFormatter.format(item.value * item.quantity)}`,
    )
    .join("\n");

  return ORDER_WHATSAPP_MESSAGE_TEMPLATE.replace("{products}", products)
    .replace("{deliveryMethod}", deliveryMethod)
    .replace("{deliveryDetails}", deliveryDetails)
    .replace("{document}", document)
    .replace("{methodPayment}", methodPayment)
    .replace("{paymentDetails}", paymentDetails)
    .replace("{total}", totalPrice);
}
