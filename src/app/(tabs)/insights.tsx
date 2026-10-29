
import React, { useMemo, useState } from "react";
import {
  View,
  Text,

} from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RnSafeAreaView);

export const Insights = ()=> {
  return (

      <SafeAreaView className={'flex-1 bg-background p-5'}>
        <Text>Subscription</Text>
      </SafeAreaView>

  )
}

export default Insights;
