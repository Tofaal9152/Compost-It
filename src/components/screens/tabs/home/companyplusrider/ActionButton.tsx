import { Text } from "react-native";
import { Button } from "~/src/components/ui/button";
import { useMutationHandler } from "~/src/hooks/useMutationHandler";
import { showToast } from "~/src/hooks/useToast";
import { poster } from "~/src/lib/request";
import { useAuthStore } from "~/src/store/authStore";
import AllRidersSelect from "./AllRidersSelect";
const ActionButton = ({ item, activeTab }: any) => {
  // useauthstore
  const { role } = useAuthStore();

  // role
  const isCompany = role === "company";

  //  activeTab
  const pendingTab = activeTab === "pending";

  // endpoint
  const endpoint =
    isCompany && pendingTab
      ? `api/pickup-requests/${item.id}/assign-rider`
      : !isCompany && pendingTab
      ? `api/pickup-requests/${item.id}/collected`
      : `/api/pickup-requests/${item.id}/delivered`;

  // queryKey
  const queryKey =
    isCompany && pendingTab
      ? ["companyPickupRequests"]
      : !isCompany && pendingTab
      ? ["riderToCollectRequests"]
      : ["riderCollectedRequests"];

  const mutation = useMutationHandler({
    queryKey,
    mutationFn: (payload) =>
      poster(endpoint, {
        payload,
      }),
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Request Accepted",
        description: "Successfully done the request.",
      });
    },
    onError: (error: any) => {
      console.error("Error accepting request:", error);
      showToast({
        type: "error",
        title: "Request Acceptance Failed",
        description: error?.response?.data?.error || "An error occurred.",
      });
    },
  });

  // onSubmit function

  const onSubmit = () => {
    const rider_id = isCompany ? item.rider_id : null;
    mutation.mutate({ rider_id });
  };

  const BtnText = () => {
    if (pendingTab && isCompany) {
      return <AllRidersSelect onSubmit={onSubmit} />;
    }
    if (pendingTab && !isCompany) {
      return (
        <Button
          size={"sm"}
          onPress={onSubmit}
          className="bg-[#0F5329]"
          disabled={mutation.isPending}
        >
          <Text className="text-white">Collect</Text>
        </Button>
      );
    }
    return (
      <Button
        size={"sm"}
        onPress={onSubmit}
        className="bg-[#0F5329]"
        disabled={mutation.isPending}
      >
        <Text className="text-white">Delivered</Text>
      </Button>
    );
  };
  return <>{BtnText()}</>;
};

export default ActionButton;
