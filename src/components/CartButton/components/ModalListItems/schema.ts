import * as yup from "yup";
import { DeliveryMethodEnum } from "../DeliveryMethod/types";
import { MethodPaymentEnum } from "../MethodPayment/types";
import { Mask } from "../../../../utils/mask";

const modalListItemsSchema = yup
  .object({
    deliveryMethod: yup
      .mixed<DeliveryMethodEnum>()
      .oneOf(Object.values(DeliveryMethodEnum))
      .required(),
    addressValue: yup.string().when("deliveryMethod", {
      is: DeliveryMethodEnum.DELIVERY,
      then: (schema) =>
        schema.trim().required("Informe o endereco de entrega").defined(),
      otherwise: (schema) => schema.default("").defined(),
    }),
    receiverNameValue: yup.string().when("deliveryMethod", {
      is: DeliveryMethodEnum.DELIVERY,
      then: (schema) =>
        schema.trim().required("Informe o nome do recebedor").defined(),
      otherwise: (schema) => schema.default("").defined(),
    }),
    methodPayment: yup
      .mixed<MethodPaymentEnum>()
      .oneOf(Object.values(MethodPaymentEnum))
      .required(),
    cashChangeValue: yup.string().when("methodPayment", {
      is: MethodPaymentEnum.MONEY,
      then: (schema) =>
        schema
          .required("Informe o valor do troco")
          .defined()
          .test("cash-change-positive", "Informe o valor do troco", (value) =>
            Boolean(value && Mask.parseCurrencyBRL(value) > 0),
          ),
      otherwise: (schema) => schema.default("").defined(),
    }),
  })
  .required();

export { modalListItemsSchema };
