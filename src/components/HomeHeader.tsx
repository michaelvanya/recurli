import { memo } from "react";
import { View } from "react-native";

import { handleViewAllSubscriptions } from "./actions";
import { BalanceCard } from "./BalanceCard";
import { ProfileHeader } from "./ProfileHeader";
import { SectionHeader } from "./SectionHeader";
import { UpcomingSection } from "./UpcomingSection";

type HomeHeaderProps = {
  onAddSubscription?: () => void;
};

function HomeHeaderBase({ onAddSubscription }: HomeHeaderProps) {
  return (
    <View>
      <ProfileHeader onAddSubscription={onAddSubscription} />
      <BalanceCard />
      <UpcomingSection />
      <SectionHeader
        title="All Subscriptions"
        onPressViewAll={handleViewAllSubscriptions}
        className="px-6"
      />
    </View>
  );
}

export const HomeHeader = memo(HomeHeaderBase);
