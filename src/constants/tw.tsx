/**
 * NativeWind v5 component wrappers.
 *
 * v5 is built on `react-native-css` and no longer exports `styled()`.
 * Instead, wrap each component once with `useCssElement` and import the
 * wrapped versions (View, Text, FlatList...) from this file everywhere.
 */
import React from "react";
import {
  View as RNView,
  Text as RNText,
  Pressable as RNPressable,
  TextInput as RNTextInput,
  FlatList as RNFlatList,
  Image as RNImage,
  type FlatListProps,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useCssElement } from "react-native-css";

type WithClass<P> = P & { className?: string };

export const View = (props: WithClass<React.ComponentProps<typeof RNView>>) =>
  useCssElement(RNView, props, { className: "style" });

export const Text = (props: WithClass<React.ComponentProps<typeof RNText>>) =>
  useCssElement(RNText, props, { className: "style" });

export const Pressable = (
  props: WithClass<React.ComponentProps<typeof RNPressable>>
) => useCssElement(RNPressable, props, { className: "style" });

export const TextInput = (
  props: WithClass<React.ComponentProps<typeof RNTextInput>>
) => useCssElement(RNTextInput, props, { className: "style" });

export const Image = (props: WithClass<React.ComponentProps<typeof RNImage>>) =>
  useCssElement(RNImage, props, { className: "style" });

// This is the replacement for:
//   const SafeAreaView = styled(RnSafeAreaView);
export const SafeAreaView = (
  props: WithClass<React.ComponentProps<typeof RNSafeAreaView>>
) => useCssElement(RNSafeAreaView, props, { className: "style" });

export function FlatList<T>(
  props: WithClass<FlatListProps<T>> & {
    contentContainerClassName?: string;
    columnWrapperClassName?: string;
  }
) {
  return useCssElement(RNFlatList as any, props, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
    columnWrapperClassName: "columnWrapperStyle",
  }) as React.ReactElement;
}
