import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { WhatsAppIcon } from "../../../components/WhatsAppIcon";
import { colors } from "../../../constants/themeColors";

import { RedirectContact } from "../../../utils/redirectContact";

export function ContactPage() {
  return (
    <div className="my-10 w-full flex justify-center">
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
            <WhatsAppIcon size={100} />
          </div>

          <Typography variant="h2" weight="medium" align="center">
            Fale conosco no WhatsApp
          </Typography>

          <Button
            variant="whatsapp"
            fullWidth
            className="cursor-pointer"
            leftIcon={<WhatsAppIcon color={colors.white} size={30} />}
            size="lg"
            onClick={() => RedirectContact()}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
