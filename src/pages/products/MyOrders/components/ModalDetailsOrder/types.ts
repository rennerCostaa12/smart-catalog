import type { OrderProps } from "../OrderCard/types";

export interface IModalDetailsOrderProps {
  open: boolean;
  order: OrderProps | null;
  onClose: () => void;
}
