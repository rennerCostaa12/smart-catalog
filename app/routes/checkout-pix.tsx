import type { Route } from "./+types/checkout-pix";
import { PixCheckoutPage } from "../../src/pages/pix-checkout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Checkout Pix" },
    { name: "description", content: "Checkout de pagamento Pix" },
  ];
}

export default function PixCheckout() {
  return <PixCheckoutPage />;
}
