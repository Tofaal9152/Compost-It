import { Text, View } from "react-native";

const LocationCardItem = ({ item }: any) => {
  return (
    <View className="w-64 bg-white dark:bg-gray-800 rounded-xl p-4 mr-3 shadow-md">
      <Text className="text-lg font-semibold text-[#0F5329] dark:text-green-400">
        {item?.address || "Unknown Location"}
      </Text>
      {item?.landmark && (
        <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Landmark: {item.landmark}
        </Text>
      )}
      {item?.instructions && (
        <Text className="text-xs text-gray-500 dark:text-gray-300 mt-2">
          {item.instructions}
        </Text>
      )}
    </View>
  );
};

export default LocationCardItem;
