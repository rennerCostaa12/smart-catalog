import type { Route } from "./+types/accountsettings";

import { AccountSettingsPage } from "../../../src/pages/products/AccountSettings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Configurações da conta" },
    { name: "description", content: "Configurações da conta" },
  ];
}

export default function AccountSettings() {
  return <AccountSettingsPage />;
}
