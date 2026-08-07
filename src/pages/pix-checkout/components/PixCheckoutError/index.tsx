import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useParams } from "react-router";

import { Button } from "../../../../components/ui/button";
import { Typography } from "../../../../components/ui/typography";
import type { IPixCheckoutErrorProps } from "./types";
import { PATH_CART } from "../../constants";

export function PixCheckoutError({
  error,
  isFetching,
  isMissingPaymentId,
  onRetry,
}: IPixCheckoutErrorProps) {
  const { catalogClientName = "" } = useParams();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <Link
        to={PATH_CART(catalogClientName)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary"
      >
        <ArrowLeft size={16} />
        Voltar para o carrinho
      </Link>

      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-danger">
          <AlertCircle size={26} />
        </div>

        <Typography className="mt-5" variant="h3">
          Nao foi possivel carregar o Pix
        </Typography>

        <Typography className="mt-2 max-w-lg" variant="bodySmall" color="muted">
          {isMissingPaymentId
            ? "O identificador do pagamento nao foi encontrado."
            : (error?.message ??
              "Tente novamente em instantes ou volte para o carrinho.")}
        </Typography>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!isMissingPaymentId && (
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              leftIcon={<RefreshCw size={18} />}
              onClick={onRetry}
              isLoading={isFetching}
            >
              Tentar novamente
            </Button>
          )}

          <Button type="button" className="cursor-pointer">
            <Link to={PATH_CART(catalogClientName)}>
              Voltar para o carrinho
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
