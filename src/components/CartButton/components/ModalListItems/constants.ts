import type { ICartItem } from "../../../../context/cart/types";
import { brlFormatter } from "../../../../utils/brlFormatter";

const ORDER_WHATSAPP_MESSAGE_TEMPLATE = `Olá! Tenho interesse em comprar os seguintes produtos:

{products}

Entrega: {deliveryMethod}
{deliveryDetails}

Forma de pagamento: {methodPayment}
{cashChange}

Total do pedido: {total}`;

export function getOrderWhatsAppMessage(
  items: ICartItem[],
  totalPrice: string,
  deliveryMethod: string,
  deliveryDetails: string,
  methodPayment: string,
  cashChangeValue?: string,
) {
  const products = items
    .map(
      (item) =>
        `- ${item.title} | Qtd: ${item.quantity} | Unitário: ${brlFormatter.format(item.price)} | Subtotal: ${brlFormatter.format(item.price * item.quantity)}`,
    )
    .join("\n");

  const cashChange = cashChangeValue ? `Troco para: ${cashChangeValue}` : "";

  return ORDER_WHATSAPP_MESSAGE_TEMPLATE.replace("{products}", products)
    .replace("{deliveryMethod}", deliveryMethod)
    .replace("{deliveryDetails}", deliveryDetails)
    .replace("{methodPayment}", methodPayment)
    .replace("{cashChange}", cashChange)
    .replace("{total}", totalPrice);
}
