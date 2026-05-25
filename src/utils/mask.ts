export class Mask {
  static currencyBRL(value: string) {
    const digitsOnly = value.replace(/\D/g, "");

    if (!digitsOnly) {
      return "";
    }

    const numericValue = Number(digitsOnly) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }

  static parseCurrencyBRL(value: string) {
    const digitsOnly = value.replace(/\D/g, "");

    if (!digitsOnly) {
      return 0;
    }

    return Number(digitsOnly) / 100;
  }
}
