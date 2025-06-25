import { FlatList, View } from "react-native";

import LocationCardItem from "~/src/components/screens/tabs/heatmap/LocationCardItem";

const LocationContent = ({ markers }: any) => {
  return (
    <View className="absolute bottom-10 px-2">
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={markers}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <LocationCardItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default LocationContent;
