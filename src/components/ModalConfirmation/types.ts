export interface IModalConfirmationProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  labelConfirm: string;
  labelCancel: string;
}
