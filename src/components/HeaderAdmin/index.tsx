import { Menu } from "lucide-react";
import { RedirectContact } from "../../utils/redirectContact";
import { Container } from "../Container";
import { LogoApp } from "../LogoApp";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { User } from "../User";

export function HeaderAdmin() {
  const onOpenMenu = () => {
    console.log("OPEN");
  };

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

        <div className="flex gap-3 max-sm:gap-1 max-md:w-full max-md:justify-end">
          <User
            className="cursor-pointer"
            name="Renner Costa"
          />
        </div>
      </Container>
    </header>
  );
}
