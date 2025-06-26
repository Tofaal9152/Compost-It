import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
import ActionButton from "./ActionButton";

const PickupRequestsItem = ({ item, activeTab }: any) => {
  return (
    <View className="mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
      <Text className="font-semibold text-[#0F5329] dark:text-green-300">
        Waste Type:
      </Text>
      <Text className="text-black dark:text-gray-100">{item.waste_type}</Text>

      <Text className="font-semibold text-[#0F5329] dark:text-green-300 mt-2">
        Estimated Weight:
      </Text>
      <Text className="text-black dark:text-gray-100">
        {item.estimated_weight} kg
      </Text>

      <Text className="font-semibold text-[#0F5329] dark:text-green-300 mt-2">
        Pickup Address:
      </Text>
      <Text className="text-black dark:text-gray-100">
        {item.pickup_location?.address}
      </Text>

      <Text className="font-semibold text-[#0F5329] dark:text-green-300 mt-2">
        Preferred Time:
      </Text>
      <Text className="text-black dark:text-gray-100">
        {new Date(item.preferred_time).toLocaleString()}
      </Text>

      <Text className="font-semibold text-[#0F5329] dark:text-green-300 mt-2">
        Notes:
      </Text>
      <Text className="text-black dark:text-gray-100">{item.notes}</Text>

      {activeTab === "completed" ? (
        ""
      ) : (
        <View className="flex-row justify-between mt-4">
          <ActionButton item={item} activeTab={activeTab} />
        </View>
      )}
    </View>
  );
};

export default PickupRequestsItem;
