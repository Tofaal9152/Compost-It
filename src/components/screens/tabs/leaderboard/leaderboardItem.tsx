import React from "react";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";

const LeaderboardItem = ({ item }: any) => {
  const { id } = useAuthStore();
  const isTopThree = item.rank <= 3;
  const emailPrefix = item.email?.split("@")[0] || "";

  return (
    <View
      className={`bg-white rounded-xl px-4 py-3 flex-row items-center justify-between ${
        isTopThree ? "border-l-4 border-[#0F5329] shadow-sm" : ""
      } ${item.id === id ? "bg-yellow-50 border-[#C0CC8A]" : ""}`}
    >
      {/* Rank */}
      <Text className=" font-bold text-gray-700">#{item.rank}</Text>

      {/* Email (before @) */}
      <Text className="font-medium text-gray-800 truncate">{emailPrefix}</Text>

      {/* Points */}

      <Text className=" text-right text-gray-600">{item.co2_saved}</Text>
      <Text className=" text-right text-gray-600">{item.total_waste}</Text>
    </View>
  );
};

export default LeaderboardItem;
