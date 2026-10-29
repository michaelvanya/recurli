const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");

export const formatPrice = (price: number, currency: string) =>
  `${CURRENCY_SYMBOLS[currency] ?? ""}${price.toFixed(2)}`;

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${pad(d.getUTCDate())}, ${pad(
    d.getUTCHours()
  )}:${pad(d.getUTCMinutes())}`;
};

export const formatDaysLeft = (days: number) =>
  `${days} ${days === 1 ? "day" : "days"} left`;

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
