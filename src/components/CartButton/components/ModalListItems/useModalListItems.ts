import { useCart } from "../../../../context/cart/useCart";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { RedirectContact } from "../../../../utils/redirectContact";
import { getOrderWhatsAppMessage } from "./constants";

export function useModalListItems() {
  const { addCart, removeCart, removeProductCart, cart: items } = useCart();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
    RedirectContact(
      "5585989734951",
      getOrderWhatsAppMessage(items, brlFormatter.format(totalPrice)),
    );
  };

  return {
    totalPrice,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    items,
    handleBuyWpp,
  };
}
