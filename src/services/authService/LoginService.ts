import axios from "axios";
import { useMutationHandler } from "~/src/hooks/useMutationHandler";
import { useAuthStore } from "~/src/store/authStore";

export function LoginAction() {
  const { setToken, setRole, setIsLoggedIn, setId } = useAuthStore();

  return useMutationHandler({
    mutationFn: async (payload) => {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}api/auth/login/`,
        payload
      );
      return response.data;
    },
    successMessage: {
      title: "Login Successful",
      description: "Welcome back!",
    },
    errorMessage: {
      title: "Login Failed",
      description: "Please check your credentials.",
    },
    onSuccess: (data) => {
      setToken(data.token);
      setRole(data.user.userType);
      setIsLoggedIn(true);
      setId(data.user.id);
    },
  });
}
