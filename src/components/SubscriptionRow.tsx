import { memo, useCallback } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import { formatDate, formatPrice } from "./format";
import { handleSelect } from "./actions";
import type { HomeSubscription } from "./types";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const H_PADDING = IS_SMALL ? 16 : 24;
const MIN_HEIGHT = IS_SMALL ? 110 : 132;
const ICON_SIZE = IS_SMALL ? 54 : 66;
const NAME_SIZE = IS_SMALL ? 18 : 22;
const PRICE_SIZE = IS_SMALL ? 17 : 21;

type Props = { item: HomeSubscription };

function SubscriptionRowBase({ item }: Props) {
  const onPress = useCallback(() => handleSelect(item.name), [item.name]);

  return (
    <View style={{ paddingHorizontal: H_PADDING }}>
      <Pressable
        style={{ minHeight: MIN_HEIGHT, borderRadius: 27, backgroundColor: item.color.replace('bg-[', '').replace(']', ''), paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}
        onPress={onPress}
      >
        <View
          style={{ marginRight: 16, width: ICON_SIZE, height: ICON_SIZE, borderRadius: 12, backgroundColor: item.iconBg.replace('bg-[', '').replace(']', ''), justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#081126', fontFamily: 'Roboto-Bold' }}>
            {item.icon}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: NAME_SIZE, fontWeight: 'bold', color: '#081126', fontFamily: 'Roboto-Bold' }}
          >
            {item.name}
          </Text>
          <Text style={{ marginTop: 8, fontSize: 13, color: 'rgba(0,0,0,0.6)', fontFamily: 'Roboto-Medium' }}>
            {formatDate(item.renewalDate)}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', paddingLeft: 8 }}>
          <Text style={{ fontSize: PRICE_SIZE, fontWeight: 'bold', color: '#081126', fontFamily: 'Roboto-Bold' }}>
            {formatPrice(item.price, item.currency)}
          </Text>
          <Text style={{ marginTop: 8, fontSize: 13, color: 'rgba(0,0,0,0.6)', fontFamily: 'Roboto-Medium' }}>
            {item.billing === "Monthly" ? "per month" : "per year"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export const SubscriptionRow = memo(SubscriptionRowBase);
