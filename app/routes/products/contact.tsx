import type { Route } from "./+types/contact";
import { ContactPage } from "../../../src/pages/products/Contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Contato" },
    { name: "description", content: "Contato" },
  ];
}

export default function Contact() {
  return <ContactPage />;
}
