import axios from "axios";
import { useRouter } from "expo-router";
import { useMutationHandler } from "~/src/hooks/useMutationHandler";

export function SignupAction() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: async (payload) => {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}api/auth/register`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/(auth)");
    },
    successMessage: {
      title: "Registration Successful",
      description: "Welcome aboard!",
    },
    errorMessage: {
      title: "Registration Failed",
      description: "Please check your details.",
    },
  });
}
