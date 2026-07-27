import * as yup from "yup";

import { accountSettingsSchema } from "./schema";

export type AccountSettingsSchemaProps = yup.InferType<
  typeof accountSettingsSchema
>;
