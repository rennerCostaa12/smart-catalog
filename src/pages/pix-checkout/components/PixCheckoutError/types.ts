export interface IPixCheckoutErrorProps {
  error: Error | null;
  isFetching: boolean;
  isMissingPaymentId: boolean;
  onRetry: () => void;
}
