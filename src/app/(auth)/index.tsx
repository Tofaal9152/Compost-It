import { Link } from "expo-router";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthHeader from "~/src/components/screens/auth/AuthHeader";
import SignInForm from "~/src/components/screens/auth/SignInForm";

export default function LoginScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
    >
      {/* header */}
      <AuthHeader title="Welcome to Up&Pro" />

      <SignInForm />

      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-700 dark:text-gray-300">
          Don&apos;t have an account?{" "}
        </Text>
        <Link href="/(auth)/register" push>
          <Text className="text-[#7138ED] font-semibold">Sign Up</Text>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
