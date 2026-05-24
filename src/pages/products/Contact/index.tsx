import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { WhatsAppIcon } from "../../../components/WhatsAppIcon";
import { ThemeColors } from "../../../constants/themeColors";
import { Container } from "../../../components/Container";

import { RedirectContact } from "../../../utils/redirectContact";

export function ContactPage() {
  return (
    <Container className="my-10 w-full flex justify-center max-md:px-6">
      <div className="flex flex-col gap-4">
        <div>
          <Typography variant="h1" align="center">
            Entre em contato
          </Typography>

          <Typography variant="body" align="center" color="muted">
            Fale com a gente pelo WhatsApp e tire suas dúvidas, peça orçamentos
            ou faça pedidos.
          </Typography>
        </div>

        <div className="shadow-xl inset-shadow-2xs rounded-2xl p-15 border border-border flex flex-col gap-4">
          <div className="flex justify-center">
            <WhatsAppIcon size={80} />
          </div>

          <Typography variant="h2" weight="medium" align="center">
            Fale conosco no WhatsApp
          </Typography>

          <Button
            variant="whatsapp"
            fullWidth
            className="cursor-pointer"
            leftIcon={<WhatsAppIcon color={ThemeColors.white} size={25} className="max-sm:hidden" />}
            size="lg"
            onClick={() => RedirectContact()}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </Container>
  );
}
