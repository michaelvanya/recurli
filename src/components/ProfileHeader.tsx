import { memo } from "react";
import { Pressable, Text, View } from "react-native";

import { user_name } from "../constants/home_data/h.data";
import { getInitials } from "./format";
import { handleAddSubscription } from "./actions";

// Computed once at load, not on every render.
const INITIALS = getInitials(user_name.name);

type ProfileHeaderProps = {
  onAddSubscription?: () => void;
};

function ProfileHeaderBase({ onAddSubscription }: ProfileHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-5 pb-7">
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
