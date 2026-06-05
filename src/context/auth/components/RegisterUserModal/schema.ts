import * as yup from "yup";

import { Mask } from "../../../../utils/mask";

export const registerUserModalSchema = yup.object({
  name: yup.string().trim().required("Informe seu nome").defined(),
  email: yup
    .string()
    .email("Informe um email valido")
    .required("Informe um email valido")
    .defined(),
  phone: yup
    .string()
    .required("Informe um telefone valido")
    .defined()
    .test("phone-length", "Informe um telefone valido", (value) => {
      return Mask.parseDocument(value ?? "").length >= 10;
    }),
});
