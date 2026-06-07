export const SUCCESSFUL_CARD_PAYMENT_STATUSES = new Set([
  "CONFIRMED",
  "RECEIVED",
  "RECEIVED_IN_CASH",
]);

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado",
  OVERDUE: "Vencido",
  REFUNDED: "Estornado",
  RECEIVED_IN_CASH: "Recebido em dinheiro",
  REFUND_REQUESTED: "Estorno solicitado",
  REFUND_IN_PROGRESS: "Estorno em processamento",
  CHARGEBACK_REQUESTED: "Contestação solicitada",
  CHARGEBACK_DISPUTE: "Contestação em análise",
  AWAITING_CHARGEBACK_REVERSAL: "Aguardando reversão da contestação",
  DUNNING_REQUESTED: "Negativação solicitada",
  DUNNING_RECEIVED: "Negativação recebida",
  AWAITING_RISK_ANALYSIS: "Aguardando análise de risco",
};


export function formatPaymentStatus(status?: string) {
  if (!status) {
    return "Não informado";
  }

  return (
    PAYMENT_STATUS_LABELS[status] ??
    status
      .toLocaleLowerCase("pt-BR")
      .replaceAll("_", " ")
      .replace(/^./, (firstLetter) => firstLetter.toLocaleUpperCase("pt-BR"))
  );
}