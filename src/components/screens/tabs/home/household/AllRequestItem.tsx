import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { useMutationHandler } from "~/src/hooks/useMutationHandler";
import { deleter } from "~/src/lib/request";

const AllRequestItem = ({ item }: { item: any }) => {
  const deleteRequest = useMutationHandler({
    mutationFn: () => deleter(`api/pickup-requests/${item?.id}`),
    queryKey: ["pickup-requests"],
  });
  const handleDelete = () => {
    alert("Are you sure you want to delete this request?");
    deleteRequest.mutate("");
  };

  const handleDeleteAlert = () => {
    Alert.alert(
      "Delete Request",
      "Are you sure you want to delete this request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handleDelete, style: "destructive" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex-row justify-between items-start">
      <View className="flex-1">
        <Text className="text-lg font-semibold capitalize">
          {item?.waste_type} Waste
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Estimated: {item?.estimated_weight} kg
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Address: {item?.pickup_location?.address}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Preferred: {new Date(item?.preferred_time).toLocaleString()}
        </Text>
        {item?.notes ? (
          <Text className="text-sm text-gray-600 dark:text-gray-300">
            Notes: {item?.notes}
          </Text>
        ) : null}
        <Text className="text-xs text-slate-500 mt-1">
          Created: {new Date(item?.created_at).toLocaleString()}
        </Text>
      </View>

      {/* Delete icon */}
      <TouchableOpacity onPress={handleDeleteAlert} className="ml-4 p-2">
        <Trash2 size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
};

export default AllRequestItem;
