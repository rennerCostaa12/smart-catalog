import { WHATSAPP_SELLER } from "../pages/products/Carts/constants";

export function RedirectContact(
  number = WHATSAPP_SELLER,
  messageWhatsApp?: string,
) {
  window.open(
    `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(messageWhatsApp ?? "")}`, "_blank"
  );
}
