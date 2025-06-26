import { View } from "react-native";
import InfiniteFlashListContent from "~/src/components/InfiniteFlashListContent";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";
import { useAuthStore } from "~/src/store/authStore";
import PickupRequestsItem from "./PickupRequestsItem";

const CollectedRequest = ({ activeTab }: any) => {
  const { id } = useAuthStore();

  const query = useInfiniteData<any>(`api/rider/to-deliver?riderId=${id}`, [
    "riderCollectedRequests",
  ]);

  return (
    <LoaderWrapper
      isLoading={query.isLoading}
      error={query.error}
      isError={query.isError}
    >
      <View className="flex-1 bg-white dark:bg-gray-900 p-4">
        <InfiniteFlashListContent
          query={query}
          extractItems={(data) =>
            data.pages.flatMap((page: any) => page.requests)
          }
          renderItem={({ item }) => (
            <PickupRequestsItem item={item} activeTab={activeTab} />
          )}
          estimatedItemSize={200}
          keyExtractor={(item: { id: string }) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          itemSeparatorHeight={16}
        />
      </View>
    </LoaderWrapper>
  );
};

export default CollectedRequest;
