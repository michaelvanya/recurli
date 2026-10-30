import { memo } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import { user_name } from "../constants/home_data/h.data";
import { getInitials } from "./format";
import { handleAddSubscription } from "./actions";

// Computed once at load, not on every render.
const INITIALS = getInitials(user_name.name);
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const H_PADDING = IS_SMALL ? 16 : 24;
const V_PADDING_TOP = IS_SMALL ? 12 : 20;
const V_PADDING_BOTTOM = IS_SMALL ? 16 : 28;

type ProfileHeaderProps = {
  onAddSubscription?: () => void;
};

function ProfileHeaderBase({ onAddSubscription }: ProfileHeaderProps) {
  return (
    <View style={{ paddingHorizontal: H_PADDING, paddingTop: V_PADDING_TOP, paddingBottom: V_PADDING_BOTTOM, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-[#D8C6A0]">
          <Text className="font-roboto-bold text-base text-foreground">
            {INITIALS}
          </Text>
        </View>

        <View>
          <Text className="font-roboto-bold text-[21px] text-foreground">
            {user_name.name}
          </Text>
          <Text className="font-roboto-regular text-xs text-muted-foreground">
            Welcome back
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add subscription"
        className="h-14 w-14 items-center justify-center rounded-full border border-border"
        onPress={onAddSubscription ?? handleAddSubscription}
      >
        <Text className="font-roboto-light text-4xl text-foreground">+</Text>
      </Pressable>
    </View>
  );
}

export const ProfileHeader = memo(ProfileHeaderBase);
