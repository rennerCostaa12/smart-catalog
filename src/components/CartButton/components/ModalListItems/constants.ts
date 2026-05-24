import type { ICartItem } from "../../../../context/cart/types";
import { brlFormatter } from "../../../../utils/brlFormatter";

const ORDER_WHATSAPP_MESSAGE_TEMPLATE = `Olá! Tenho interesse em comprar os seguintes produtos:

{products}

Total do pedido: {total}`;

export function getOrderWhatsAppMessage(items: ICartItem[], totalPrice: string)  {
  const products = items
    .map(
      (item) =>
        `- ${item.title} | Qtd: ${item.quantity} | Unitário: ${brlFormatter.format(item.price)} | Subtotal: ${brlFormatter.format(item.price * item.quantity)}`,
    )
    .join("\n");


  return ORDER_WHATSAPP_MESSAGE_TEMPLATE.replace(
    "{products}",
    products,
  ).replace("{total}", totalPrice);
}
