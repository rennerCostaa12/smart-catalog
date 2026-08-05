import * as yup from "yup";

import { sectionAddressSchema } from "./schema";

export type AddressModalFormData = yup.InferType<typeof sectionAddressSchema>;

export interface AddressModalProps {
  open: boolean;
  initialValues?: AddressModalFormData | null;
  isEditing?: boolean;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (values: AddressModalFormData) => Promise<void> | void;
}

export interface UseAddressModalParams {
  open: boolean;
  initialValues?: AddressModalFormData | null;
  onSave: (values: AddressModalFormData) => Promise<void> | void;
}
