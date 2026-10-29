import { memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

import { formatDate, formatPrice } from "./format";
import { handleSelect } from "./actions";
import type { HomeSubscription } from "./types";

type Props = { item: HomeSubscription };

function SubscriptionRowBase({ item }: Props) {
  const onPress = useCallback(() => handleSelect(item.name), [item.name]);

  return (
    <View className="px-6">
      <Pressable
        className={`min-h-[132px] flex-row items-center rounded-[27px] ${item.color} px-5 py-5`}
        onPress={onPress}
      >
        <View
          className={`mr-4 h-[66px] w-[66px] items-center justify-center rounded-2xl ${item.iconBg}`}
        >
          <Text className="font-roboto-bold text-3xl text-foreground">
            {item.icon}
          </Text>
        </View>

        <View className="flex-1">
          <Text
            numberOfLines={1}
            className="font-roboto-bold text-[22px] text-foreground"
          >
            {item.name}
          </Text>
          <Text className="mt-2 font-roboto-medium text-sm text-foreground/60">
            {formatDate(item.renewalDate)}
          </Text>
        </View>

        <View className="items-end pl-2">
          <Text className="font-roboto-bold text-[21px] text-foreground">
            {formatPrice(item.price, item.currency)}
          </Text>
          <Text className="mt-2 font-roboto-medium text-sm text-foreground/60">
            {item.billing === "Monthly" ? "per month" : "per year"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export const SubscriptionRow = memo(SubscriptionRowBase);
