import React from "react";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";

const LeaderboardItem = ({ item }: any) => {
  const { id } = useAuthStore();
  const isTopThree = item.rank <= 3;
  const emailPrefix = item.email?.split("@")[0] || "";

  const baseClasses =
    "rounded-xl px-4 py-3 flex-row items-center justify-between";
  const bgClass =
    item.id === id
      ? "bg-yellow-50 dark:bg-yellow-900 border-l-4 border-[#C0CC8A]"
      : isTopThree
      ? "border-l-4 border-[#0F5329] bg-white dark:bg-gray-800 shadow-sm"
      : "bg-white dark:bg-gray-800";

  return (
    <View className={`${baseClasses} ${bgClass}`}>
      {/* Rank */}
      <Text className="font-bold text-gray-700 dark:text-gray-200">
        #{item.rank}
      </Text>

      {/* Email */}
      <Text className="font-medium text-gray-800 dark:text-gray-100 truncate">
        {emailPrefix}
      </Text>

      {/* CO2 Saved */}
      <Text className="text-right text-gray-600 dark:text-gray-300">
        {item.co2_saved}
      </Text>

      {/* Waste */}
      <Text className="text-right text-gray-600 dark:text-gray-300">
        {item.total_waste}
      </Text>
    </View>
  );
};

export default LeaderboardItem;
