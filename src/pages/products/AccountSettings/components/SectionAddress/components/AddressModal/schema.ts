import * as yup from "yup";

export const sectionAddressSchema = yup.object({
  label: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup.number().required("Campo obrigatório"),
  complement: yup.string().optional(),
  neighborhood: yup.string().required("Campo obrigatório"),
  city: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
  zipCode: yup.string().required("Campo obrigatório"),
});
