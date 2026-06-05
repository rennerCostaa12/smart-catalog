import * as yup from "yup";

export const authModalSchema = yup.object({
  email: yup
    .string()
    .email("Informe um email valido")
    .required("Informe um email valido")
    .defined(),
});
