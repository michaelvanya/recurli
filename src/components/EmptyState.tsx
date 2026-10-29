import { Text, View } from "react-native";

export function EmptyState() {
  return (
    <View className="items-center px-6 py-10">
      <Text className="font-roboto-medium text-sm text-muted-foreground">
        No subscriptions yet
      </Text>
    </View>
  );
}
