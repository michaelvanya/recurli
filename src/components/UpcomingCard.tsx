import { memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

import { formatDaysLeft, formatPrice } from "./format";
import { handleSelect } from "./actions";
import type { UpcomingSubscription } from "./types";

type Props = { item: UpcomingSubscription };

// NOTE: the w-[245px] class must match UPCOMING_CARD_WIDTH in UpcomingSection.
function UpcomingCardBase({ item }: Props) {
  const onPress = useCallback(() => handleSelect(item.name), [item.name]);

  return (
    <Pressable
      className="w-[245px] rounded-[26px] border border-border bg-card p-5"
      onPress={onPress}
    >
      <View className="mb-5 flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Text className="font-roboto-bold text-2xl text-foreground">
            {item.icon}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="font-roboto-bold text-[23px] text-foreground">
            {formatPrice(item.price, item.currency)}
          </Text>
          <Text className="mt-1 font-roboto-regular text-sm text-muted-foreground">
            {formatDaysLeft(item.daysLeft)}
          </Text>
        </View>
      </View>

      <Text
        numberOfLines={1}
        className="font-roboto-bold text-xl text-foreground"
      >
        {item.name}
      </Text>
    </Pressable>
  );
}

export const UpcomingCard = memo(UpcomingCardBase);
