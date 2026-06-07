import * as yup from "yup";

import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { MethodPaymentEnum } from "../../../components/CartButton/components/MethodPayment/types";
import { Mask } from "../../../utils/mask";

export const cartSchema = yup.object({
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
  documentValue: yup
    .string()
    .required("Informe o CPF")
    .defined()
    .test("document-length", "Informe um CPF valido", (value) => {
      const documentDigits = Mask.parseDocument(value ?? "");

      return documentDigits.length === 11 || documentDigits.length === 14;
    }),
  methodPayment: yup
    .mixed<MethodPaymentEnum>()
    .oneOf(Object.values(MethodPaymentEnum))
    .required(),
  cardHolderName: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema.trim().required("Informe o nome do titular").defined(),
    otherwise: (schema) => schema.default("").defined(),
  }),
  cardNumber: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe o numero do cartao")
        .defined()
        .test("card-number", "Informe o numero do cartao", (value) => {
          return Mask.parseDocument(value ?? "").length >= 13;
        }),
    otherwise: (schema) => schema.default("").defined(),
  }),
  expirationMonth: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe o mes de expiracao")
        .defined()
        .test("expiration-month", "Informe o mes de expiracao", (value) => {
          const month = Number(value);

          return month >= 1 && month <= 12;
        }),
    otherwise: (schema) => schema.default("").defined(),
  }),
  expirationYear: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe o ano de expiracao")
        .defined()
        .length(4, "Informe o ano de expiracao"),
    otherwise: (schema) => schema.default("").defined(),
  }),
  cvv: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema.required("Informe o CVV").defined().min(3, "Informe o CVV"),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderName: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema.trim().required("Informe o nome do titular").defined(),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderEmail: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .email("Informe um email valido")
        .required("Informe um email valido")
        .defined(),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderDocument: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe um documento valido")
        .defined()
        .test("holder-document", "Informe um documento valido", (value) => {
          const documentDigits = Mask.parseDocument(value ?? "");

          return documentDigits.length === 11 || documentDigits.length === 14;
        }),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderZipCode: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe o CEP")
        .defined()
        .test("holder-zip-code", "Informe o CEP", (value) => {
          return Mask.parseDocument(value ?? "").length === 8;
        }),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderAddressNumber: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) => schema.trim().required("Informe o numero").defined(),
    otherwise: (schema) => schema.default("").defined(),
  }),
  holderPhone: yup.string().when("methodPayment", {
    is: MethodPaymentEnum.CARD,
    then: (schema) =>
      schema
        .required("Informe o telefone")
        .defined()
        .test("holder-phone", "Informe o telefone", (value) => {
          return Mask.parseDocument(value ?? "").length >= 10;
        }),
    otherwise: (schema) => schema.default("").defined(),
  }),
});
