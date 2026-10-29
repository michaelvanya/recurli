
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RnSafeAreaView);

const settingsSections = [
  {
    title: "Account",
    subtitle: "Personal information and security",
    icon: "♙",
    iconBg: "bg-emerald-100",
    iconColor: "#08764F",
    items: [
      ["♙", "Profile Information", "Update your personal details"],
      ["♙", "Change Password", "Keep your account safe"],
      ["⬡", "Two-Factor Authentication", "Add extra security to your account"],
    ],
  },
  {
    title: "App Preferences",
    subtitle: "Customize your experience",
    icon: "⚙",
    iconBg: "bg-blue-100",
    iconColor: "#1458BD",
    items: [
      ["♧", "Notifications", "Manage alerts and updates"],
      ["☼", "Appearance", "Light or dark mode"],
      ["◎", "Language", "Choose your preferred language"],
    ],
  },
  {
    title: "Data & Storage",
    subtitle: "Manage your data and cache",
    icon: "▤",
    iconBg: "bg-violet-100",
    iconColor: "#4030A5",
    items: [
      ["↓", "Offline Data", "View and manage downloaded data"],
      ["▤", "Clear Cache", "Free up storage space"],
    ],
  },
  {
    title: "Support & Help",
    subtitle: "Get help and send feedback",
    icon: "♧",
    iconBg: "bg-cyan-100",
    iconColor: "#07577D",
    items: [
      ["?", "Help Center", "FAQs and user guides"],
      ["✉", "Contact Support", "Reach out to our team"],
      ["☏", "Send Feedback", "Help us improve"],
    ],
  },
];

const accountDetails = [
  { icon: "⬡", title: "Account Type", value: "Administrator", color: "#08764F" },
  { icon: "▦", title: "Department", value: "Operations", color: "#0879E8" },
  { icon: "⌖", title: "Location", value: "Port Harcourt", color: "#102D56" },
  { icon: "▣", title: "Member Since", value: "Jan 2025", color: "#102D56" },
];

const navigation = [
  { label: "Home", icon: "⌂" },
  { label: "Projects", icon: "▣" },
  { label: "Map", icon: "⌖" },
  { label: "Chat", icon: "☏", badge: "3" },
  { label: "More", icon: "•••" },
];

export default function settings() {
  return (
    <SafeAreaView
      className="flex-1 bg-[#F7FAFE]"
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#03243D" />

      {/* Header */}
      <View className="bg-[#03243D] px-5 pb-4 pt-3">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-emerald-700">
              <Text className="text-2xl">🌿</Text>
            </View>

            <View>
              <Text className="font-roboto-bold text-[17px] leading-5 text-white">
                NDDC
              </Text>
              <Text className="font-roboto-bold text-[17px] leading-5 text-white">
                ProjectWatch
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-5">
            <Pressable onPress={() => console.log("Notifications")}>
              <View className="relative">
                <Text className="text-2xl text-white">♧</Text>
                <View className="absolute -right-2 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
                  <Text className="text-[10px] text-white">3</Text>
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => console.log("More options")}>
              <Text className="text-3xl text-white">⋮</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-start">
          <Text className="mr-4 text-3xl text-white">‹</Text>
          <View className="flex-1">
            <Text className="font-roboto-bold text-[27px] text-white">
              Settings
            </Text>
            <Text className="mt-1 font-roboto-regular text-sm text-[#D9E7F7]">
              Manage your account, preferences and app settings.
            </Text>
          </View>
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <Pressable
          onPress={() => console.log("Edit profile")}
          className="mb-3 flex-row items-center rounded-2xl border border-[#E3EEFC] bg-white p-3"
        >
          <View className="mr-3 h-[65px] w-[65px] items-center justify-center rounded-full bg-emerald-700">
            <Text className="font-roboto-medium text-2xl text-white">
              MF
            </Text>
          </View>

          <View className="flex-1">
            <Text className="font-roboto-bold text-base text-[#102D56]">
              Michael Finecountry
            </Text>
            <Text className="mt-1 font-roboto-medium text-sm text-[#6484B7]">
              Admin
            </Text>
            <Text className="mt-1 font-roboto-regular text-xs text-[#6484B7]">
              michael@example.com
            </Text>
          </View>

          <View className="items-center">
            <View className="rounded-xl bg-[#EDF4FC] px-3 py-2">
              <Text className="font-roboto-medium text-xs text-[#123A70]">
                ✎ Edit Profile
              </Text>
            </View>
            <Text className="mt-1 self-end text-xl text-[#6484B7]">›</Text>
          </View>
        </Pressable>

        {/* Account details */}
        <View className="mb-3 flex-row gap-2">
          {accountDetails.map((detail) => (
            <View
              key={detail.title}
              className="min-h-[100px] flex-1 rounded-2xl bg-[#EEF5FC] p-2.5"
            >
              <Text className="text-xl text-[#123A70]">{detail.icon}</Text>
              <Text className="mt-2 text-[10px] text-[#6484B7]">
                {detail.title}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: detail.color }}
                className="mt-1 font-roboto-medium text-xs"
              >
                {detail.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings sections */}
        {settingsSections.map((section) => (
          <View
            key={section.title}
            className="mb-3 rounded-2xl border border-[#E3EEFC] bg-white px-3 pt-3 pb-2"
          >
            <View className="mb-2 flex-row items-center gap-3">
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${section.iconBg}`}
              >
                <Text style={{ color: section.iconColor }} className="text-2xl">
                  {section.icon}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="font-roboto-bold text-base text-[#102D56]">
                  {section.title}
                </Text>
                <Text className="mt-0.5 text-xs text-[#7390BD]">
                  {section.subtitle}
                </Text>
              </View>
            </View>

            {section.items.map((item, index) => (
              <View key={item[1]}>
                <Pressable
                  onPress={() => console.log("Selected setting:", item[1])}
                  className="min-h-[52px] flex-row items-center"
                >
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#F1F6FC]">
                    <Text className="text-xl text-[#123A70]">{item[0]}</Text>
                  </View>

                  <View className="flex-1 py-2">
                    <Text className="font-roboto-medium text-sm text-[#102D56]">
                      {item[1]}
                    </Text>
                    <Text className="mt-0.5 text-xs text-[#7390BD]">
                      {item[2]}
                    </Text>
                  </View>

                  <Text className="ml-2 text-2xl text-[#6587BA]">›</Text>
                </Pressable>

                {index !== section.items.length - 1 && (
                  <View className="ml-[52px] h-px bg-[#E6EFFB]" />
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Log out */}
        <Pressable
          onPress={() => console.log("Log out")}
          className="mb-2 mt-1 h-12 flex-row items-center justify-center rounded-2xl bg-[#FDECEF]"
        >
          <Text className="mr-3 text-lg text-[#E32636]">⇥</Text>
          <Text className="font-roboto-medium text-sm text-[#E32636]">
            Log Out
          </Text>
        </Pressable>
      </ScrollView>

      {/* Bottom navigation */}
      <View className="border-t border-[#E3EEFC] bg-white px-2 pt-2 pb-1">
        <View className="flex-row items-center justify-around">
          {navigation.map((item) => {
            const active = item.label === "More";

            return (
              <Pressable
                key={item.label}
                onPress={() => console.log("Navigate to:", item.label)}
                className="min-w-0 flex-1 items-center"
              >
                <View className="relative h-8 items-center justify-center">
                  <Text
                    style={{
                      color: active ? "#08764F" : "#7390BD",
                      fontSize: item.label === "More" ? 20 : 27,
                    }}
                  >
                    {item.icon}
                  </Text>

                  {"badge" in item && (
                    <View className="absolute -right-2 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
                      <Text className="text-[10px] text-white">
                        {item.badge}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  style={{ color: active ? "#08764F" : "#7390BD" }}
                  className="mt-1 text-xs"
                >
                  {item.label}
                </Text>

                <View
                  className={`mt-1 h-[3px] w-10 rounded-full ${
                    active ? "bg-[#08764F]" : "bg-transparent"
                  }`}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
