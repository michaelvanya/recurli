import type {
  HOME_SUBSCRIPTIONS,
  UPCOMING_SUBSCRIPTIONS,
} from "../../constants/home_data/h.data";

export type HomeSubscription = (typeof HOME_SUBSCRIPTIONS)[number];
export type UpcomingSubscription = (typeof UPCOMING_SUBSCRIPTIONS)[number];
