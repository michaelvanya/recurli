import { memo } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL = SCREEN_WIDTH < 375;
const TITLE_SIZE = IS_SMALL ? 20 : 25;

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
      <Text style={{ fontSize: TITLE_SIZE }} className="font-roboto-bold text-foreground">
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
