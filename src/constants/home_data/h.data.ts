// constants/home_data/h.data.ts

/* ---------- Types ---------- */
export type UpcomingSubscription = {
  id: string;
  icon: string;
  name: string;
  price: number;
  currency: string;
  daysLeft: number;
};

export type Subscription = {
  id: string;
  icon: string;
  name: string;
  plan: string;
  category: string;
  paymentMethod: string;
  status: "active" | "paused" | "cancelled";
  startDate: string;
  price: number;
  currency: string;
  billing: "Monthly" | "Yearly";
  renewalDate: string;
  // UI-only styling (used by the existing component)
  color: string;
  iconBg: string;
};

/* ---------- Icons (text glyphs, since the component renders <Text>) ---------- */
export const icons = {
  notion: "N",
  figma: "F",
  adobe: "✦",
  openai: "◎",
  medium: "M",
  spotify: "♫",
};

/* ---------- Helpers ---------- */
const CURRENCY_SYMBOLS: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };

const formatPrice = (price: number, currency: string) =>
  `${CURRENCY_SYMBOLS[currency] ?? ""}${price.toFixed(2)}`;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${MONTHS[d.getUTCMonth()]} ${day}, ${hh}:${mm}`;
};

/* ---------- Raw data (matches the screenshots) ---------- */
export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
  {
    id: "notion",
    icon: icons.notion,
    name: "Notion",
    price: 12.0,
    currency: "USD",
    daysLeft: 4,
  },
  {
    id: "figma",
    icon: icons.figma,
    name: "Figma",
    price: 15.0,
    currency: "USD",
    daysLeft: 6,
  },
];

export const HOME_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "adobe-creative-cloud",
    icon: icons.adobe,
    name: "Adobe Creative Cloud",
    plan: "Teams Plan",
    category: "Design",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: "2025-03-20T10:00:00.000Z",
    price: 77.49,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-03-20T10:00:00.000Z",
    color: "bg-[#FFDA4D]",
    iconBg: "bg-[#FFF0A7]",
  },
  {
    id: "openai",
    icon: icons.openai,
    name: "OpenAI",
    plan: "Plus Plan",
    category: "AI Tools",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: "2025-06-05T18:00:00.000Z",
    price: 42.25,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-06-05T18:00:00.000Z",
    color: "bg-[#9BB9E0]",
    iconBg: "bg-[#B7D0ED]",
  },
  {
    id: "medium",
    icon: icons.medium,
    name: "Medium",
    plan: "Member Plan",
    category: "Reading",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: "2025-07-02T09:00:00.000Z",
    price: 13.08,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-07-02T09:00:00.000Z",
    color: "bg-subscription",
    iconBg: "bg-[#B4E0D3]",
  },
  {
    id: "spotify",
    icon: icons.spotify,
    name: "Spotify",
    plan: "Premium Individual",
    category: "Music",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: "2025-07-12T10:00:00.000Z",
    price: 10.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-07-12T10:00:00.000Z",
    color: "bg-[#C7DDA5]",
    iconBg: "bg-[#DDEBC7]",
  },
];

/* ---------- Exports consumed by the existing component (unchanged) ---------- */
export const balance = {
  name: "Balance",
  amount: "$198.53",
  date: "04/21",
};

export const user_name = {
  name: " Adrian Hajdin",
};

export const upcomingSubscriptions = UPCOMING_SUBSCRIPTIONS.map((s) => ({
  ...s,
  price: formatPrice(s.price, s.currency),
  days: `${s.daysLeft} days left`,
}));

export const subscriptions = HOME_SUBSCRIPTIONS.map((s) => ({
  ...s,
  price: formatPrice(s.price, s.currency),
  date: formatDate(s.renewalDate),
}));