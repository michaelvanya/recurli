import { memo } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  onPressViewAll: () => void;
  className?: string;
};

function SectionHeaderBase({ title, onPressViewAll, className = "" }: Props) {
  return (
    <View
      className={`mb-5 flex-row items-center justify-between ${className}`}
    >
      <Text className="font-roboto-bold text-[25px] text-foreground">
        {title}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View all ${title.toLowerCase()}`}
        className="rounded-full border border-border px-5 py-2.5"
        onPress={onPressViewAll}
      >
        <Text className="font-roboto-medium text-sm text-foreground">
          View all
        </Text>
      </Pressable>
    </View>
  );
}

export const SectionHeader = memo(SectionHeaderBase);
