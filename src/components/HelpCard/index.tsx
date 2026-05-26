import { Bot, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { RedirectContact } from "../../utils/redirectContact";
import { WhatsAppIcon } from "../WhatsAppIcon";

export function HelpCard() {
  return (
    <div className="rounded-2xl bg-surface-soft p-4 flex flex-col gap-4 mt-10">
      <div className="flex items-center flex-row gap-3">
        <div className="bg-primary rounded-md w-[40px] h-[40px] flex justify-center items-center">
          <Bot size={30} className="text-surface" />
        </div>

        <div>
          <Typography>Precisa de ajuda?</Typography>
          <Typography variant="bodySmall" color="muted">
            Fale com a gente
          </Typography>
        </div>
      </div>

      <Button
        variant="outline"
        fullWidth
        leftIcon={<WhatsAppIcon size={20} />}
        className="cursor-pointer"
        onClick={() => RedirectContact()}
      >
        Chamar no WhatsApp
      </Button>
    </div>
  );
}
