
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView as RnSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RnSafeAreaView);

type ContractorStatus = "Active" | "Suspended" | "Blacklisted";

type Contractor = {
  id: string;
  name: string;
  services: string;
  location: string;
  registration: string;
  projects: number;
  staff: number;
  phone: string;
  status: ContractorStatus;
  logo: string;
  logoBg: string;
  logoColor: string;
};

const contractors: Contractor[] = [
  {
    id: "1",
    name: "ABC Construction Ltd.",
    services: "Roads, Bridges, Civil Works, Building Construction",
    location: "Port Harcourt, Rivers State",
    registration: "1234567",
    projects: 5,
    staff: 12,
    phone: "+234 803 123 4567",
    status: "Active",
    logo: "ABC",
    logoBg: "#FFFFFF",
    logoColor: "#0879E8",
  },
  {
    id: "2",
    name: "Rivers Built Contractors",
    services: "Drainage, Earthworks, Housing",
    location: "Portharcourt, Rivers State",
    registration: "7654321",
    projects: 3,
    staff: 8,
    phone: "+234 706 987 6543",
    status: "Active",
    logo: "RB",
    logoBg: "#FFFFFF",
    logoColor: "#08764F",
  },
  {
    id: "3",
    name: "Golden Link Construction Co.",
    services: "Roads, Bridges, Environmental Works",
    location: "Asaba, Delta State",
    registration: "9876543",
    projects: 4,
    staff: 15,
    phone: "+234 812 345 6789",
    status: "Active",
    logo: "GL",
    logoBg: "#10233F",
    logoColor: "#E9B94B",
  },
  {
    id: "4",
    name: "Greenfield Engineering Ltd.",
    services: "Water Projects, Building Construction",
    location: "Yenagoa, Bayelsa State",
    registration: "5432109",
    projects: 2,
    staff: 6,
    phone: "+234 805 111 2233",
    status: "Suspended",
    logo: "GF",
    logoBg: "#FFFFFF",
    logoColor: "#438044",
  },
  {
    id: "5",
    name: "Skyline Contractors Ltd.",
    services: "Roads, Bridges, Civil Works",
    location: "Warri, Delta State",
    registration: "1122334",
    projects: 1,
    staff: 4,
    phone: "+234 808 555 7788",
    status: "Blacklisted",
    logo: "SK",
    logoBg: "#FFFFFF",
    logoColor: "#D9363E",
  },
];

const filters = [
  { label: "All", count: 28 },
  { label: "Active", count: 22 },
  { label: "Suspended", count: 3 },
  { label: "Blacklisted", count: 3 },
];

const navigation = [
  { label: "Home", icon: "⌂" },
  { label: "Projects", icon: "▣" },
  { label: "Map", icon: "⌖" },
  { label: "Contractors", icon: "♟" },
  { label: "Chat", icon: "☏", badge: "3" },
  { label: "More", icon: "•••" },
];

function ContractorCard({ item }: { item: Contractor }) {
  const statusStyle = {
    Active: {
      backgroundColor: "#D1F7E9",
      color: "#08764F",
    },
    Suspended: {
      backgroundColor: "#FFF2C7",
      color: "#B77900",
    },
    Blacklisted: {
      backgroundColor: "#FFE4E8",
      color: "#E32636",
    },
  }[item.status];

  return (
    <Pressable
      onPress={() => console.log("Open contractor:", item.id)}
      className="mb-3 overflow-hidden rounded-2xl border border-[#E3EEFC] bg-white"
    >
      <View className="flex-row items-start px-3 pt-3 pb-3">
        {/* Contractor logo */}
        <View
          style={{ backgroundColor: item.logoBg }}
          className="mr-3 h-[86px] w-[86px] shrink-0 items-center justify-center rounded-full border border-[#E4EAF1]"
        >
          <View
            style={{
              borderColor: item.logoColor,
              borderWidth: 2,
            }}
            className="h-[65px] w-[65px] items-center justify-center rounded-full"
          >
            <Text
              style={{ color: item.logoColor }}
              className="font-roboto-bold text-xl"
            >
              {item.logo}
            </Text>
            <Text
              style={{ color: item.logoColor }}
              className="font-roboto-medium text-[8px]"
            >
              CONTRACTORS
            </Text>
          </View>
        </View>

        {/* Contractor details */}
        <View className="flex-1">
          <View className="mb-2 flex-row flex-wrap items-center gap-2">
            <Text className="mr-1 flex-1 font-roboto-bold text-[15px] leading-5 text-[#102D56]">
              {item.name}
            </Text>

            <View
              style={{ backgroundColor: statusStyle.backgroundColor }}
              className="rounded-full px-3 py-1"
            >
              <Text
                style={{ color: statusStyle.color }}
                className="font-roboto-medium text-[11px]"
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text className="mb-1 font-roboto-regular text-[13px] leading-[18px] text-[#6B8BBB]">
            {item.services}
          </Text>

          <View className="mb-1 flex-row items-start">
            <Text className="mr-2 text-[15px] text-[#174777]">⌖</Text>
            <Text className="flex-1 font-roboto-regular text-[13px] text-[#6B8BBB]">
              {item.location}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="mr-2 text-[14px] text-[#174777]">▦</Text>
            <Text className="font-roboto-regular text-[13px] text-[#6B8BBB]">
              RC: {item.registration}
            </Text>
          </View>
        </View>

        <Text className="ml-1 text-2xl text-[#315C91]">›</Text>
      </View>

      {/* Contractor statistics */}
      <View className="min-h-[45px] flex-row items-center border-t border-[#E7EFFA] px-3">
        <View className="flex-1 flex-row items-center justify-center">
          <Text className="mr-2 text-[15px] text-[#174777]">▤</Text>
          <Text className="font-roboto-regular text-[12px] text-[#6B8BBB]">
            {item.projects} {item.projects === 1 ? "Project" : "Projects"}
          </Text>
        </View>

        <View className="h-5 w-px bg-[#E7EFFA]" />

        <View className="flex-1 flex-row items-center justify-center">
          <Text className="mr-2 text-[15px] text-[#174777]">♟</Text>
          <Text className="font-roboto-regular text-[12px] text-[#6B8BBB]">
            {item.staff} Staff
          </Text>
        </View>

        <View className="h-5 w-px bg-[#E7EFFA]" />

        <Pressable
          onPress={() => console.log("Call:", item.phone)}
          className="flex-[1.5] flex-row items-center justify-center"
        >
          <Text className="mr-2 text-[15px] text-[#174777]">☎</Text>
          <Text
            numberOfLines={1}
            className="shrink font-roboto-regular text-[11px] text-[#6B8BBB]"
          >
            {item.phone}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function ContractorsScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredContractors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contractors.filter((contractor) => {
      const matchesSearch =
        !query ||
        contractor.name.toLowerCase().includes(query) ||
        contractor.services.toLowerCase().includes(query) ||
        contractor.location.toLowerCase().includes(query) ||
        contractor.registration.toLowerCase().includes(query);

      const matchesStatus =
        activeFilter === "All" || contractor.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, activeFilter]);

  const listHeader = (
    <View>
      {/* Search */}
      <View className="mb-4 h-[49px] flex-row items-center rounded-2xl border border-[#DDEBFC] bg-[#F0F6FD] px-4">
        <Text className="mr-3 text-2xl text-[#6484B7]">⌕</Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search contractors by name, company, or registration no..."
          placeholderTextColor="#7895BF"
          returnKeyType="search"
          className="flex-1 py-0 font-roboto-regular text-[13px] text-[#102D56]"
        />
      </View>

      {/* Status filters */}
      <View className="mb-5 flex-row gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter.label;

          return (
            <Pressable
              key={filter.label}
              onPress={() => setActiveFilter(filter.label)}
              className={`min-h-[46px] flex-1 items-center justify-center rounded-2xl px-1 ${
                active ? "bg-[#07845B]" : "bg-[#F0F6FD]"
              }`}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color: active ? "#FFFFFF" : "#43699F",
                }}
                className="font-roboto-medium text-[12px]"
              >
                {filter.label} ({filter.count})
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#F7FAFE]"
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#03243D" />

      {/* Header */}
      <View className="bg-[#03243D] px-5 pb-4 pt-3">
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white bg-[#08764F]">
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
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Search"
              onPress={() => console.log("Search")}
            >
              <Text className="text-[29px] text-white">⌕</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              onPress={() => console.log("Notifications")}
              className="relative"
            >
              <Text className="text-[26px] text-white">♧</Text>
              <View className="absolute -right-2 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
                <Text className="font-roboto-bold text-[10px] text-white">
                  3
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-start">
          <Pressable
            onPress={() => console.log("Go back")}
            accessibilityLabel="Go back"
            className="mr-4"
          >
            <Text className="text-[36px] leading-10 text-white">‹</Text>
          </Pressable>

          <View className="flex-1">
            <Text className="font-roboto-bold text-[27px] text-white">
              Contractors
            </Text>
            <Text className="mt-1 font-roboto-regular text-[14px] leading-5 text-[#D9E7F7]">
              Manage and view all registered contractors{"\n"}
              for NDDC projects.
            </Text>
          </View>
        </View>
      </View>

      {/* Contractor list */}
      <View className="flex-1 bg-white px-5 pt-4">
        <FlatList
          data={filteredContractors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContractorCard item={item} />}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <View className="items-center px-5 py-12">
              <Text className="mb-2 text-3xl text-[#6484B7]">⌕</Text>
              <Text className="font-roboto-bold text-base text-[#102D56]">
                No contractors found
              </Text>
              <Text className="mt-1 text-center text-sm text-[#7390BD]">
                Try another search or choose a different status.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        />

        {/* Floating add button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add contractor"
          onPress={() => console.log("Add contractor")}
          className="absolute bottom-5 right-5 h-[74px] w-[74px] items-center justify-center rounded-full bg-[#07845B]"
          style={{
            elevation: 6,
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
          }}
        >
          <Text className="font-roboto-light text-[43px] leading-[48px] text-white">
            +
          </Text>
        </Pressable>
      </View>

      {/* Bottom navigation */}
      <View className="border-t border-[#E3EEFC] bg-white px-1 pt-2 pb-1">
        <View className="flex-row items-center justify-around">
          {navigation.map((item) => {
            const active = item.label === "Contractors";

            return (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                onPress={() => console.log("Navigate to:", item.label)}
                className="min-w-0 flex-1 items-center"
              >
                <View className="relative h-8 items-center justify-center">
                  <Text
                    style={{
                      color: active ? "#07845B" : "#7390BD",
                      fontSize: item.label === "More" ? 21 : 27,
                    }}
                  >
                    {item.icon}
                  </Text>

                  {"badge" in item && (
                    <View className="absolute -right-2 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
                      <Text className="font-roboto-bold text-[10px] text-white">
                        {item.badge}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  numberOfLines={1}
                  style={{ color: active ? "#07845B" : "#7390BD" }}
                  className="mt-1 font-roboto-regular text-[11px]"
                >
                  {item.label}
                </Text>

                <View
                  className={`mt-1 h-[3px] w-9 rounded-full ${
                    active ? "bg-[#07845B]" : "bg-transparent"
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
