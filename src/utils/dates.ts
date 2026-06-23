function getCurrentDate() {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset).toISOString().split("T")[0];
}

function formatOrderDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export { getCurrentDate, formatOrderDate };