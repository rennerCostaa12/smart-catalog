import type { Route } from "./+types/aboutus";
import { AboutUsPage } from "../../../src/pages/products/AboutUs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Sobre nós" },
    { name: "description", content: "Sobre nós" },
  ];
}

export default function AboutUs() {
  return <AboutUsPage />;
}
