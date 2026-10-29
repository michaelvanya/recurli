import { memo } from "react";
import { View } from "react-native";

import { handleViewAllSubscriptions } from "./actions";
import { BalanceCard } from "./BalanceCard";
import { ProfileHeader } from "./ProfileHeader";
import { SectionHeader } from "./SectionHeader";
import { UpcomingSection } from "./UpcomingSection";

function HomeHeaderBase() {
  return (
    <View>
      <ProfileHeader />
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
