import { View } from "react-native";
import InfiniteFlashListContent from "~/src/components/InfiniteFlashListContent";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import AllRequestItem from "~/src/components/screens/tabs/home/household/AllRequestItem";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";
import { useAuthStore } from "~/src/store/authStore";

export default function PickupRequests() {
  const { id } = useAuthStore();
  const pickupRequestsQuery = useInfiniteData<any>(
    `api/pickup-requests?status=pending&household_id=${id}`,
    ["pickup-requests"]
  );
  console.log(
    "PickupRequests component rendered",
    pickupRequestsQuery.data?.pages.map((page) => page.requests)
  );
  return (
    <LoaderWrapper
      isLoading={pickupRequestsQuery.isLoading}
      error={pickupRequestsQuery.error}
      isError={pickupRequestsQuery.isError}
    >
      <View className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
        <InfiniteFlashListContent
          query={pickupRequestsQuery}
          extractItems={(data) =>
            data.pages.flatMap((page: any) => page.requests)
          }
          renderItem={({ item }) => <AllRequestItem item={item} />}
          estimatedItemSize={100}
          keyExtractor={(item: { id: string }) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          itemSeparatorHeight={12}
        />
      </View>
    </LoaderWrapper>
  );
}
