import {
  ArrowLeft,
  Check,
  Clipboard,
  Clock,
  Copy,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router";
import QRCode from "react-qr-code";
import { useParams } from "react-router";

import { Button } from "../../components/ui/button";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Typography } from "../../components/ui/typography";

import { PixCheckoutError, PixCheckoutExpired } from "./components";
import { usePixCheckout } from "./usePixCheckout";
import { PATH_CART } from "./constants";

export function PixCheckoutPage() {
  const {
    copied,
    isExpired,
    payloadQrCode,
    formattedExpirationDate,
    isMissingPaymentId,
    errorQrCode,
    isLoadingQrCode,
    isFetchingQrCode,
    isLoadingOrder,
    isErrorOrder,
    purchaseDescription,
    formattedOrderTotal,
    hasError,
    qrCodeImageSrc,
    refetchQrCode,
    handleCopyPixCode,
    handleBackPreviousPage,
  } = usePixCheckout();

  const { catalogClientName = "" } = useParams();

  if (isLoadingQrCode) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
          <LoadingSpinner size={42} />
          <Typography className="mt-5" weight="bold">
            Gerando QR Code Pix
          </Typography>
          <Typography
            className="mt-2 max-w-md"
            variant="bodySmall"
            color="muted"
          >
            Aguarde enquanto buscamos os dados de pagamento.
          </Typography>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <PixCheckoutError
        error={errorQrCode instanceof Error ? errorQrCode : null}
        isFetching={isFetchingQrCode}
        isMissingPaymentId={isMissingPaymentId}
        onRetry={() => refetchQrCode()}
      />
    );
  }

  if (isExpired) {
    return <PixCheckoutExpired onBackPreviousPage={handleBackPreviousPage} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <Link
        to={PATH_CART(catalogClientName)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary"
      >
        <ArrowLeft size={16} />
        Voltar para o carrinho
      </Link>

      <div className="flex flex-col gap-2">
        <Typography variant="h1">Checkout Pix</Typography>
        <Typography variant="body" color="muted">
          Escaneie o QR Code ou copie o codigo Pix para concluir o pagamento.
        </Typography>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
            <div className="flex flex-col items-center rounded-2xl border border-border bg-surface-soft p-4">
              <div className="relative flex aspect-square w-full max-w-72 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border">
                {qrCodeImageSrc ? (
                  <img
                    src={qrCodeImageSrc}
                    alt="QR Code Pix"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <QRCode
                    value={payloadQrCode || "pix-indisponivel"}
                    className="h-full w-full"
                  />
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-primary shadow-sm">
                <Clock size={16} />
                <Typography variant="caption" color="primary" weight="bold">
                  Expira em: {formattedExpirationDate}
                </Typography>
              </div>
            </div>

            <div className="min-w-0">
              <Typography variant="h3">Pagamento gerado</Typography>
              <Typography className="mt-2" variant="bodySmall" color="muted">
                O codigo fica disponivel ate {formattedExpirationDate}.
              </Typography>

              <div className="mt-6">
                <label
                  htmlFor="pix-code"
                  className="block text-sm font-medium text-slate-700"
                >
                  Codigo Pix copia e cola
                </label>

                <textarea
                  id="pix-code"
                  readOnly
                  value={payloadQrCode}
                  className="mt-2 min-h-32 w-full resize-none rounded-xl border border-border bg-surface-soft p-3 text-sm leading-6 text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isExpired}
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  className="cursor-pointer"
                  leftIcon={copied ? <Check size={18} /> : <Copy size={18} />}
                  onClick={handleCopyPixCode}
                  disabled={isExpired}
                >
                  {copied ? "Copiado" : "Copiar codigo"}
                </Button>

                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="outline"
                  leftIcon={<RefreshCw size={18} />}
                  onClick={() => refetchQrCode()}
                  isLoading={isFetchingQrCode}
                >
                  Atualizar QR Code
                </Button>
              </div>
            </div>
          </div>
        </section>

        <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-light text-primary">
            <Clipboard size={22} />
          </div>

          <div>
            <Typography weight="bold">Resumo da compra</Typography>
            <Typography className="mt-1" variant="bodySmall" color="muted">
              {isLoadingOrder
                ? "Carregando os itens do pedido."
                : purchaseDescription ||
                  "Nao foi possivel carregar os itens do pedido."}
            </Typography>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-4">
              <Typography variant="bodySmall" color="muted">
                Status
              </Typography>
              <Typography
                variant="bodySmall"
                weight="bold"
                color={isExpired ? "danger" : "warning"}
              >
                {isExpired ? "Expirado" : "Aguardando pagamento"}
              </Typography>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Typography variant="bodySmall" color="muted">
                Total
              </Typography>
              <Typography variant="price" color="primary">
                {isLoadingOrder
                  ? "Carregando..."
                  : formattedOrderTotal || "Indisponivel"}
              </Typography>
            </div>

            {isErrorOrder ? (
              <Typography variant="caption" color="danger">
                Nao foi possivel atualizar o resumo da compra.
              </Typography>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
