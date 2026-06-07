import { LogOut, Menu, UserCircle } from "lucide-react";
import { Container } from "../Container";
import { Button } from "../ui/button";

import { RedirectContact } from "../../utils/redirectContact";
import { WhatsAppIcon } from "../WhatsAppIcon";

import { CartButton } from "../CartButton";
import { useCart } from "../../context/cart/useCart";
import { useAuth } from "../../context/auth/useAuth";
import { LogoApp } from "../LogoApp";
import type { IHeaderProps } from "./types";
import { Typography } from "../ui/typography";
import { MenuUserDesktop } from "./components/MenuUserDesktop";

export function Header({ onOpenMenu }: IHeaderProps) {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const username = user?.name || user?.email;

  return (
    <header className="w-full border-b border-border bg-surface">
      <Container className="flex items-center gap-4 py-4 px-4 max-sm:px-2">
        <div className="hidden max-lg:block">
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenMenu}
            aria-label="Abrir menu lateral"
          >
            <Menu size={20} />
          </Button>
        </div>

        <div className="flex w-full flex-row items-center max-md:justify-between">
          <LogoApp width={200} className="max-lg:hidden" />
        </div>

        <div className="flex items-center gap-3 max-sm:gap-1 max-md:w-full max-md:justify-end">
          <div className="relative">
            <CartButton itemsCart={cart ?? []} />
          </div>

          {user && <MenuUserDesktop logout={logout} username={username} />}

          {/* <div>
            <div className="hidden max-lg:block">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => RedirectContact()}
              >
                <WhatsAppIcon />
              </Button>
            </div>
            <Button
              leftIcon={<WhatsAppIcon />}
              className="w-[200px] cursor-pointer max-lg:hidden"
              variant="outline"
              onClick={() => RedirectContact()}
            >
              Fale conosco
            </Button>
          </div> */}
        </div>
      </Container>
    </header>
  );
}
