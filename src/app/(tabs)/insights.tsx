import React, { useMemo, useState } from "react";
import { ListRenderItem } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from "../../constants/tw";

/* ----------------------------- Types & data ----------------------------- */

type Status = "Completed" | "Scheduled" | "Pending";
type Filter = "All" | Status;

type Inspection = {
  id: string;
  project: string;
  location: string;
  contractor: string;
  date: string;
  time: string;
  inspector: string;
  status: Status;
  image: string;
};

// Placeholder photos (keyword-based). Swap with your real project image URLs.
const INSPECTIONS: Inspection[] = [
  {
    id: "1",
    project: "Rumuola Road Rehabilitation",
    location: "Rivers State, Port Harcourt",
    contractor: "ABC Construction Ltd.",
    date: "Jan 12, 2025",
    time: "10:30 AM",
    inspector: "Engr. A. Okafor",
    status: "Completed",
    image: "https://loremflickr.com/240/240/road,construction?lock=11",
  },
  {
    id: "2",
    project: "Bonny Bridge Rehabilitation",
    location: "Rivers State, Bonny",
    contractor: "Rivers Built Contractors",
    date: "Jan 15, 2025",
    time: "09:00 AM",
    inspector: "Engr. S. Williams",
    status: "Scheduled",
    image: "https://loremflickr.com/240/240/bridge,river?lock=12",
  },
  {
    id: "3",
    project: "Water Supply Project - Ogbakiri",
    location: "Bayelsa State, Ogbakiri",
    contractor: "Greenfield Engineering Ltd.",
    date: "Jan 18, 2025",
    time: "11:00 AM",
    inspector: "Engr. T. Nwosu",
    status: "Pending",
    image: "https://loremflickr.com/240/240/water,tank?lock=13",
  },
  {
    id: "4",
    project: "Community School Renovation",
    location: "Delta State, Warri",
    contractor: "Skyline Contractors Ltd.",
    date: "Jan 10, 2025",
    time: "02:00 PM",
    inspector: "Engr. R. Eze",
    status: "Completed",
    image: "https://loremflickr.com/240/240/school,building?lock=14",
  },
  {
    id: "5",
    project: "Coastal Erosion Control",
    location: "Akwa Ibom State, Uyo",
    contractor: "Golden Link Construction",
    date: "Jan 20, 2025",
    time: "08:30 AM",
    inspector: "Engr. M. Bello",
    status: "Scheduled",
    image: "https://loremflickr.com/240/240/coast,rocks?lock=15",
  },
];

const STATUS_STYLE: Record<
  Status,
  { icon: keyof typeof Ionicons.glyphMap; color: string; pill: string; text: string }
> = {
  Completed: {
    icon: "checkmark-circle",
    color: "#15803d",
    pill: "bg-[#e0f5e8]",
    text: "text-[#15803d]",
  },
  Scheduled: {
    icon: "time-outline",
    color: "#1d6fe0",
    pill: "bg-[#e3eeff]",
    text: "text-[#1d6fe0]",
  },
  Pending: {
    icon: "hourglass-outline",
    color: "#d98a00",
    pill: "bg-[#fff2d6]",
    text: "text-[#d98a00]",
  },
};

const TABS: { key: Filter; label: string }[] = [
  { key: "All", label: "All Inspections" },
  { key: "Scheduled", label: "Scheduled" },
  { key: "Completed", label: "Completed" },
  { key: "Pending", label: "Pending" },
];

const NAV = [
  { key: "home", label: "Home", icon: "home-outline" },
  { key: "projects", label: "Projects", icon: "folder-open-outline" },
  { key: "map", label: "Map", icon: "location-outline" },
  { key: "chat", label: "Chat", icon: "chatbubble-ellipses-outline", badge: 3 },
  { key: "inspections", label: "Inspections", icon: "clipboard", active: true },
] as const;

/* ------------------------------- Card row ------------------------------- */

const InspectionCard = React.memo(function InspectionCard({
  item,
  onPress,
}: {
  item: Inspection;
  onPress?: (i: Inspection) => void;
}) {
  const s = STATUS_STYLE[item.status];

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      className="flex-row items-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
    >
      <Image
        source={{ uri: item.image }}
        className="h-[76px] w-[76px] rounded-xl bg-slate-200"
        resizeMode="cover"
      />

      <View className="ml-3 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            numberOfLines={1}
            className="mr-2 flex-1 text-[15px] font-bold text-[#0a2a4f]"
          >
            {item.project}
          </Text>
          <View
            className={`flex-row items-center rounded-full px-2.5 py-1 ${s.pill}`}
          >
            <Ionicons name={s.icon} size={13} color={s.color} />
            <Text className={`ml-1 text-xs font-medium ${s.text}`}>
              {item.status}
            </Text>
          </View>
        </View>

        <View className="mt-1 flex-row items-center">
          <Ionicons name="location-outline" size={14} color="#1e4a86" />
          <Text numberOfLines={1} className="ml-1.5 text-[13px] text-[#3a5f94]">
            {item.location}
          </Text>
        </View>

        <View className="mt-1 flex-row items-center">
          <Ionicons name="business-outline" size={14} color="#1e4a86" />
          <Text numberOfLines={1} className="ml-1.5 text-[13px] text-[#3a5f94]">
            {item.contractor}
          </Text>
        </View>

        <View className="mt-2 flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#1e4a86" />
          <Text className="ml-1 text-xs text-[#3a5f94]">{item.date}</Text>

          <Ionicons
            name="time-outline"
            size={14}
            color="#1e4a86"
            style={{ marginLeft: 10 }}
          />
          <Text className="ml-1 text-xs text-[#3a5f94]">{item.time}</Text>

          <View className="mx-2 h-3.5 w-px bg-slate-300" />

          <Ionicons name="person-outline" size={14} color="#1e4a86" />
          <Text numberOfLines={1} className="ml-1 flex-1 text-xs text-[#3a5f94]">
            {item.inspector}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#6b7f99"
        style={{ marginLeft: 4 }}
      />
    </Pressable>
  );
});

/* -------------------------------- Screen -------------------------------- */

export default function insights() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      All: INSPECTIONS.length,
      Scheduled: 0,
      Completed: 0,
      Pending: 0,
    };
    INSPECTIONS.forEach((i) => (c[i.status] += 1));
    return c;
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INSPECTIONS.filter((i) => {
      const matchTab = filter === "All" || i.status === filter;
      const matchQuery =
        !q ||
        i.project.toLowerCase().includes(q) ||
        i.contractor.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q);
      return matchTab && matchQuery;
    });
  }, [filter, query]);

  const renderItem: ListRenderItem<Inspection> = ({ item }) => (
    <InspectionCard item={item} />
  );

  const ListHeader = (
    <View className="pb-3">
      {/* Filter tabs */}
      <FlatList
        horizontal
        className="-mx-4"
        data={TABS}
        keyExtractor={(t) => t.key}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-4 pt-4"
        renderItem={({ item }) => {
          const active = item.key === filter;
          return (
            <Pressable
              onPress={() => setFilter(item.key)}
              className={`rounded-full px-5 py-3 ${
                active ? "bg-[#0b7a3e]" : "bg-[#eef3fb]"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  active ? "text-white" : "text-[#1e4a86]"
                }`}
              >
                {item.label} ({counts[item.key]})
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Search */}
      <View className="mt-4 flex-row items-center rounded-xl bg-[#e8f0fc] px-4">
        <Ionicons name="search-outline" size={20} color="#2563c9" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by project, contractor, or location..."
          placeholderTextColor="#6f8bb5"
          className="ml-3 flex-1 py-3.5 text-sm text-[#0a2a4f]"
        />
      </View>

      {/* Dropdown filters (wire these to modals / bottom sheets) */}
      <View className="mt-3 flex-row gap-2">
        {[
          { label: "Date Range", icon: "calendar-outline" },
          { label: "Location", icon: "location-outline" },
          { label: "Status", icon: "filter-outline" },
        ].map((f) => (
          <Pressable
            key={f.label}
            className="flex-1 flex-row items-center justify-between rounded-full bg-[#f1f5fb] px-3 py-3"
          >
            <View className="flex-row items-center">
              <Ionicons name={f.icon as any} size={18} color="#1e4a86" />
              <Text className="ml-1.5 text-[13px] text-[#3a5f94]">{f.label}</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#1e4a86" />
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#06284a]">
      {/* ------------------------------ Header ------------------------------ */}
      <SafeAreaView edges={["top"]} className="bg-[#06284a] px-4 pb-4">
        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#0b7a3e]">
              <Ionicons name="leaf" size={22} color="#fff" />
            </View>
            <View className="ml-3">
              <Text className="text-[17px] font-bold leading-5 text-white">
                NDDC
              </Text>
              <Text className="text-[17px] font-bold leading-5 text-white">
                ProjectWatch
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-5">
            <Pressable>
              <Ionicons name="search-outline" size={26} color="#fff" />
            </Pressable>
            <Pressable>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
              <View className="absolute -right-1.5 -top-1.5 h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                <Text className="text-[10px] font-bold text-white">3</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="mt-4 flex-row items-center">
          <Pressable hitSlop={10}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </Pressable>
          <Text className="ml-4 text-[28px] font-bold text-white">
            Inspections
          </Text>
        </View>
        <Text className="mt-1 max-w-[300px] pl-10 text-sm leading-5 text-slate-200">
          View and manage all project inspections across the Niger Delta region.
        </Text>
      </SafeAreaView>

      {/* ------------------------------- List ------------------------------- */}
      <View className="flex-1 bg-white">
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListEmptyComponent={
            <Text className="mt-10 text-center text-sm text-slate-500">
              No inspections match your search.
            </Text>
          }
          contentContainerClassName="px-4 pb-28"
          className="flex-1"
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          windowSize={7}
        />

        {/* Floating action button */}
        <Pressable className="absolute bottom-5 right-4 h-14 w-14 items-center justify-center rounded-full bg-[#0b7a3e] shadow-lg">
          <Ionicons name="add" size={32} color="#fff" />
        </Pressable>
      </View>

      {/* ---------------------------- Bottom nav ---------------------------- */}
      <SafeAreaView
        edges={["bottom"]}
        className="border-t border-slate-100 bg-white"
      >
        <View className="flex-row items-center justify-around pb-1 pt-2">
          {NAV.map((n) => {
            const active = "active" in n && n.active;
            return (
              <Pressable
                key={n.key}
                className={`items-center px-3 pb-2 pt-1 ${
                  active ? "border-b-2 border-[#0b7a3e]" : ""
                }`}
              >
                <View>
                  <Ionicons
                    name={n.icon as any}
                    size={26}
                    color={active ? "#0b7a3e" : "#6b86b3"}
                  />
                  {"badge" in n && (
                    <View className="absolute -right-2 -top-1.5 h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                      <Text className="text-[10px] font-bold text-white">
                        {n.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  className={`mt-0.5 text-xs ${
                    active ? "font-semibold text-[#0b7a3e]" : "text-[#6b86b3]"
                  }`}
                >
                  {n.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
