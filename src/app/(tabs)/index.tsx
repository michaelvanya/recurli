import { useCallback, useState } from "react";
import { Dimensions, FlatList, StatusBar, View } from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

import { CreateSubscriptionModal, type NewSubscriptionData } from "@/components/CreateSubscriptionModal";
import { EmptyState } from "@/components/EmptyState";
import { HomeHeader } from "@/components/HomeHeader";
import { SubscriptionRow } from "@/components/SubscriptionRow";
import { useSubscriptions } from "@/contexts/SubscriptionContext";
import type { HomeSubscription } from "@/components/types";

const SafeAreaView = styled(RnSafeAreaView);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const BOTTOM_PADDING = IS_SMALL ? 80 : 100;

const CONTENT_STYLE = { paddingBottom: BOTTOM_PADDING } as const;

const keyExtractor = (item: HomeSubscription) => item.id;
const renderItem = ({ item }: { item: HomeSubscription }) => (
  <SubscriptionRow item={item} />
);
const Separator = () => <View className="h-4" />;

export default function Index() {
  const { subscriptions, addSubscription } = useSubscriptions();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleAddSubscriptionPress = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const handleCreateSubscription = useCallback((newSub: NewSubscriptionData) => {
    addSubscription(newSub as HomeSubscription);
    setShowCreateModal(false);
  }, [addSubscription]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9E3" />

      <FlatList
        data={subscriptions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <HomeHeader onAddSubscription={handleAddSubscriptionPress} />
        )}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={CONTENT_STYLE}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
      />

      <CreateSubscriptionModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateSubscription}
      />
    </SafeAreaView>
  );
}
