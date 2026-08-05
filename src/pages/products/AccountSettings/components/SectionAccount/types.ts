import * as yup from "yup";

import { sectionAccountSchema } from "./schema";

export type SectionAccountFormData = yup.InferType<
  typeof sectionAccountSchema
>;
