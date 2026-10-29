import { memo, useCallback } from "react";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

import {
  HOME_SUBSCRIPTIONS,
  UPCOMING_SUBSCRIPTIONS,
  balance,
  user_name,
} from "@/constants/home_data/h.data";




import { EmptyState } from "@/components/EmptyState";
import { HomeHeader } from "@/components/HomeHeader";
import { SubscriptionRow } from "@/components/SubscriptionRow";
import type { HomeSubscription } from "@/components/types";

const SafeAreaView = styled(RnSafeAreaView);

const CONTENT_STYLE = { paddingBottom: 24 } as const;

const keyExtractor = (item: HomeSubscription) => item.id;
const renderItem = ({ item }: { item: HomeSubscription }) => (
  <SubscriptionRow item={item} />
);
const Separator = () => <View className="h-4" />;

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9E3" />

      <FlatList
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={HomeHeader}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={CONTENT_STYLE}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}
