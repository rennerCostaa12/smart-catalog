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

  static document(value: string) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 14);

    if (digitsOnly.length <= 11) {
      return digitsOnly
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return digitsOnly
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  static parseDocument(value: string) {
    return value.replace(/\D/g, "");
  }

  static cardNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  static numeric(value: string, maxLength: number) {
    return value.replace(/\D/g, "").slice(0, maxLength);
  }

  static zipCode(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  static phone(value: string) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);

    if (digitsOnly.length <= 10) {
      return digitsOnly
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return digitsOnly
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
}
