import { FlatList, View } from "react-native";
import ShopItem from "~/src/components/screens/tabs/shop/ShopItem";
import { ecoProducts } from "~/src/constants/Shoplists";

const Shop = () => {
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900 px-4 pt-6">
      <FlatList
        data={ecoProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ShopItem item={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperClassName="justify-between"
      />
    </View>
  );
};

export default Shop;
