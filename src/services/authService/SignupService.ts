import axios from "axios";
import { useMutationHandler } from "~/src/hooks/useMutationHandler";

export function SignupAction() {
  return useMutationHandler({
    mutationFn: async (payload) => {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}api/auth/register`,
        payload
      );
      return response.data;
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
