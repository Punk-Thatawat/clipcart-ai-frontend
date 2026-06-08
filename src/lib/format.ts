export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { notation: value > 999 ? "compact" : "standard" }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
