import type { Route } from "./+types/home";
import { HomePage } from "../../src/pages/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Home" },
    { name: "description", content: "Bem vindo ao smart catalog." },
  ];
}

export default function Home() {
  return <HomePage />;
}
