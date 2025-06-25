import { View } from "react-native";
import CustomImage from "~/src/components/CustomImage";
import { Text } from "~/src/components/ui/text";

const LocationCardItem = ({ item }: any) => {
  return (
    <View
      className="bg-white rounded-lg border border-slate-200 p-2 m-1 flex-row items-center"
      style={{ width: 320, height: 80 }} // Set width and height here
    >
      <CustomImage
        uri={""}
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          marginRight: 8,
        }}
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.address}</Text>
        <Text className="text-sm text-gray-600">{item.landmark}</Text>
        <Text className="text-sm text-gray-600">{item.instructions}</Text>
      </View>
    </View>
  );
};

export default LocationCardItem;
