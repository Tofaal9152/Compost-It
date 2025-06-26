import { Link } from "expo-router";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthHeader from "~/src/components/screens/auth/AuthHeader";
import SignupForm from "~/src/components/screens/auth/SignupForm";
export default function SignupByRole() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <AuthHeader title={`Student Registration`} />

      <SignupForm />

      <View className="flex-row items-center justify-center my-4">
        <View className="flex-1 border-t border-gray-300" />
        <Text className="mx-4 text-gray-500">OR</Text>
        <View className="flex-1 border-t border-gray-300" />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-700">Already have an account? </Text>
        <Link href="/(auth)" dismissTo>
          <Text className="text-[#0F5329] font-semibold">Login</Text>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
