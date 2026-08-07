import { AlertCircle, ArrowLeft } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Typography } from "../../../../components/ui/typography";
import type { PixCheckoutExpiredProps } from "./types";

export function PixCheckoutExpired({
  onBackPreviousPage,
}: PixCheckoutExpiredProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-danger">
          <AlertCircle size={26} />
        </div>

        <Typography className="mt-5" variant="h3">
          Pix expirou
        </Typography>

        <Typography className="mt-2 max-w-md" variant="bodySmall" color="muted">
          Este codigo Pix expirou e nao pode mais ser usado para pagamento.
        </Typography>

        <Button
          type="button"
          className="mt-6 cursor-pointer"
          leftIcon={<ArrowLeft size={18} />}
          onClick={onBackPreviousPage}
        >
          Voltar para pagina anterior
        </Button>
      </div>
    </div>
  );
}
