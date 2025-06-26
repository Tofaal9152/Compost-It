import { Text, TouchableOpacity, View } from "react-native";
import CustomImage from "~/src/components/CustomImage";

const ShopItem = ({ item }: { item: any }) => (
  <View
    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mx-2 mb-4"
    style={{ width: "48%" }}
  >
    <CustomImage
      uri={item.image}
      style={{ width: "100%", height: 100, borderRadius: 12 }}
    />
    <Text className="mt-2 text-base font-semibold text-[#0F5329] dark:text-white">
      {item.name}
    </Text>
    <Text className="text-sm text-gray-500 dark:text-gray-400  mb-2">{item.price}</Text>
    <TouchableOpacity className="bg-[#0F5329] py-2 rounded-lg mt-auto">
      <Text className="text-white text-center font-medium">Add to Cart</Text>
    </TouchableOpacity>
  </View>
);

export default ShopItem;
