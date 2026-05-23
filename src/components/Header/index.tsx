import { Phone, Search } from "lucide-react";
import { Container } from "../Container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import pathLogo from "../../assets/images/logo-smart-catalog.png";
import { Typography } from "../ui/typography";
import { RedirectContact } from "../../utils/redirectContact";
import { WhatsAppIcon } from "../WhatsAppIcon";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-surface">
      <Container className="flex items-center gap-4 py-4 max-md:flex-col">
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

        <div className="max-md:w-full">
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
