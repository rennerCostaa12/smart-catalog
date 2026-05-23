import { Phone, Search, ShoppingCart } from "lucide-react";
import { Container } from "../Container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import pathLogo from "../../assets/images/logo-smart-catalog.png";
import { Typography } from "../ui/typography";
import { RedirectContact } from "../../utils/redirectContact";
import { WhatsAppIcon } from "../WhatsAppIcon";

import { CartButton } from "../CartButton";
import { useCart } from "../../context/cart/useCart";

export function Header() {
  const { cart } = useCart();

  return (
    <header className="w-full border-b border-border bg-surface">
      <Container className="flex items-center gap-4 py-4 max-md:flex-col px-4">
        <div className="flex w-full flex-row items-center max-md:justify-between">
          <img src={pathLogo} width={200} height={200} />

          <div className="w-full max-w-xl max-md:hidden">
            <Input placeholder="Buscar produtos" rightIcon={<Search />} />
          </div>

          <div className="hidden flex-col items-end max-md:block">
            <Typography>Olá visitante! 👋</Typography>
            <Typography variant="bodySmall" color="muted">
              Bem-vindo a nossa loja
            </Typography>
          </div>
        </div>

        <div className="flex gap-3 max-md:w-full">
          <div className="relative">
            <CartButton itemsCart={cart ?? []} />
          </div>

          <Button
            leftIcon={<WhatsAppIcon />}
            className="w-[200px] cursor-pointer max-md:hidden"
            variant="outline"
            onClick={() => RedirectContact()}
          >
            Fale conosco
          </Button>

          <div className="hidden w-full max-md:block">
            <Input
              placeholder="Buscar produtos"
              leftIcon={<Search />}
              fullWidth
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
