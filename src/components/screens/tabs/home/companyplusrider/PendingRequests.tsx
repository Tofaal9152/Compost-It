import { View } from "react-native";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";
import InfiniteFlashListContent from "~/src/components/InfiniteFlashListContent";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import PickupRequestsItem from "./PickupRequestsItem";
import { useAuthStore } from "~/src/store/authStore";

const PendingRequests = ({ activeTab }: any) => {
  const { role, id } = useAuthStore();

  const endpoint =
    role === "company"
      ? "api/all-pickup"
      : `api/rider/to-collect?riderId=${id}`;

  const queryKey =
    role === "company" ? ["companyPickupRequests"] : ["riderToCollectRequests"];

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

export default PendingRequests;
