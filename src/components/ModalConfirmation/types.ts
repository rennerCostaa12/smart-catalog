import type { ButtonVariant } from "../ui/button/types";

export interface IModalConfirmationProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  labelConfirm: string;
  labelCancel: string;
  isLoading?: boolean;
  variantButtonConfirm?: ButtonVariant;
}
