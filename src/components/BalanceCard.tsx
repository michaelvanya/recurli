import { memo } from "react";
import { Dimensions, Text, View } from "react-native";

import { balance } from "../constants/home_data/h.data";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const H_MARGIN = IS_SMALL ? 16 : 24;
const V_MARGIN = IS_SMALL ? 24 : 48;
const PADDING = IS_SMALL ? 16 : 24;
const AMOUNT_SIZE = IS_SMALL ? 32 : 42;

function BalanceCardBase() {
  return (
    <View style={{ marginHorizontal: H_MARGIN, marginBottom: V_MARGIN, overflow: 'hidden', borderRadius: 30, backgroundColor: '#ea7a53', padding: PADDING }}>
      <Text className="font-roboto-medium text-lg text-white">
        {balance.name}
      </Text>

      <View className="my-3 h-px bg-white/20" />

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: AMOUNT_SIZE, fontWeight: 'bold', letterSpacing: -1, color: 'white', fontFamily: 'Roboto-Bold' }}>
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
