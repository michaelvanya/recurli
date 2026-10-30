import { memo } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { UPCOMING_SUBSCRIPTIONS } from "../constants/home_data/h.data";
import { handleViewAllUpcoming } from "./actions";
import { SectionHeader } from "./SectionHeader";
import { UpcomingCard } from "./UpcomingCard";
import type { UpcomingSubscription } from "./types";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const CARD_WIDTH = IS_SMALL ? 215 : 245;
const GAP = IS_SMALL ? 8 : 12;
const PADDING = IS_SMALL ? 16 : 24;
const BOTTOM_MARGIN = IS_SMALL ? 20 : 36;

const CONTENT_STYLE = { paddingHorizontal: PADDING } as const;
const SEPARATOR_STYLE = { width: GAP } as const;

const keyExtractor = (item: UpcomingSubscription) => item.id;

const getItemLayout = (_: unknown, index: number) => ({
  length: CARD_WIDTH,
  offset: PADDING + (CARD_WIDTH + GAP) * index,
  index,
});

const Separator = () => <View style={SEPARATOR_STYLE} />;

const renderItem = ({ item }: { item: UpcomingSubscription }) => (
  <UpcomingCard item={item} />
);

function UpcomingSectionBase() {
  return (
    <View style={{ marginBottom: BOTTOM_MARGIN }}>
      <SectionHeader
        title="Upcoming"
        onPressViewAll={handleViewAllUpcoming}
        className="px-6"
      />

      <FlatList
        horizontal
        data={UPCOMING_SUBSCRIPTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={CONTENT_STYLE}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

export const UpcomingSection = memo(UpcomingSectionBase);
