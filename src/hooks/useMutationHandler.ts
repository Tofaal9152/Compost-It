import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { showToast } from "~/src/hooks/useToast";

type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;
  queryKey?: QueryKey;
  successMessage?: { title: string; description?: string };
  errorMessage?: { title: string; description?: string };
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  queryKey,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) queryClient.invalidateQueries({ queryKey });
      if (successMessage) {
        showToast({ type: "success", ...successMessage });
      }
      if (onSuccess) onSuccess(data);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error?.response?.data?.error || error);

      showToast({
        type: "error",
        title: errorMessage?.title || "Update Failed",
        description:
          error?.response?.data?.message ||
          errorMessage?.description ||
          "An error occurred",
      });

      if (onError) onError(error);
    },
  });
}
