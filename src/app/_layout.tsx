import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import "~/global.css";
import { useColorScheme } from "~/src/lib/useColorScheme";
import { DARK_THEME, LIGHT_THEME } from "../lib/themes";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { useAuthStore } from "../store/authStore";
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { isLoggedIn } = useAuthStore();

  return (
    <ReactQueryProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar backgroundColor="#0F5329" barStyle="light-content" />
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen
              name="(protected)"
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack.Protected>
        </Stack>
        <Toast />
        <PortalHost />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
