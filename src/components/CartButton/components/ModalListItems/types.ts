import type { modalListItemsSchema } from "./schema";
import * as yup from "yup";
export interface IModalListItemsProps {
  closeModal?: () => void;
}

export type IModalListItemsFormData = yup.InferType<
  typeof modalListItemsSchema
>;
