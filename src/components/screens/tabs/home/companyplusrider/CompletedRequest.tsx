import { View } from "react-native";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import InfiniteFlashListContent from "~/src/components/InfiniteFlashListContent";
import { useAuthStore } from "~/src/store/authStore";
import PickupRequestsItem from "./PickupRequestsItem";

const CompletedRequest = ({ activeTab }: any) => {
  const { role, id } = useAuthStore();

  const endpoint =
    role === "company"
      ? `api/pickup-requests?status=delivered&company_id=${id}`
      : `api/rider/completed?riderId=${id}`;

  const queryKey =
    role === "company"
      ? ["successfullyDeliveredRequests"]
      : ["riderDeliveredRequests"];

  const query = useInfiniteData<any>(endpoint, queryKey);

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

export default CompletedRequest;
