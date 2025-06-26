import { useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { FlashList } from "~/src/lib/Flashlist";
import { InfiniteFlashListProps } from "../types/InfiniteFlashList";
import { Text } from "./ui/text";

const InfiniteFlashListContent = <T,>({
  query,
  extractItems,
  renderItem,
  estimatedItemSize = 80,
  itemSeparatorHeight = 16,
  keyExtractor = (item: any) => item.id.toString(),
  contentContainerStyle,
}: InfiniteFlashListProps<T>) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    query;

  const [refreshing, setRefreshing] = useState(false);
  const items = extractItems(data);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const ListFooterComponent = () => (
    <View>
      {isFetchingNextPage ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View className="flex items-center justify-center">
          <Text>{hasNextPage ? "Loading more..." : "No more data"}</Text>
        </View>
      )}
    </View>
  );

  const ItemSeparatorComponent = () => (
    <View style={{ height: itemSeparatorHeight }} />
  );

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={estimatedItemSize}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={<ListFooterComponent />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default InfiniteFlashListContent;
