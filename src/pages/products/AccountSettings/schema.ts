import * as yup from "yup";

export const accountSettingsSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email().required("Campo obrigatório"),
  phone: yup.string().required("Campo obrigatório"),
});
