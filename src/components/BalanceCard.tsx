import { memo } from "react";
import { Text, View } from "react-native";

import { balance } from "../constants/home_data/h.data";

function BalanceCardBase() {
  return (
    <View className="mx-6 mb-12 overflow-hidden rounded-[30px] bg-accent px-6 py-6">
      <Text className="font-roboto-medium text-lg text-white">
        {balance.name}
      </Text>

      <View className="my-3 h-px bg-white/20" />

      <View className="flex-row items-end justify-between">
        <Text className="font-roboto-bold text-[42px] tracking-tight text-white">
          {balance.amount}
        </Text>

        <Text className="mb-2 font-roboto-medium text-lg text-white">
          {balance.date}
        </Text>
      </View>
    </View>
  );
}

export const BalanceCard = memo(BalanceCardBase);
