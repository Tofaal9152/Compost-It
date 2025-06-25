import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
// import { Button } from "~/src/components/ui/button";
import { Input } from "../../ui/input";
// import { useAuthStore } from "~/src/store/authStore";
import AuthButton from "./AuthButton";

export default function SignupForm() {
  // const {  register } = useAuthStore();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    class: "",
    gender: "",
    promo_code: "",
    showPassword: false,
    rememberMe: true,
  });
  const updateForm = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  // const router = useRouter();

  const handleSignup = async () => {
    // const result = await register(form.full_name, form.email, form.password);
    // if (result.success) {
    //   Alert.alert("Registration Successful", result.message);
    // } else {
    //   Alert.alert("Registration Failed", result.message);
    // }
    Alert.alert("Registration pending", "Implementation pending");
  };
  return (
    <View className="gap-3">
      <Input
        placeholder="Full Name"
        placeholderTextColor="#6B7280"
        value={form.full_name}
        onChangeText={(text) => updateForm("full_name", text)}
      />

      <Input
        placeholder="Class"
        placeholderTextColor="#6B7280"
        value={form.class}
        onChangeText={(text) => updateForm("class", text)}
      />

      <Input
        placeholder="Gender"
        placeholderTextColor="#6B7280"
        value={form.gender}
        onChangeText={(text) => updateForm("gender", text)}
      />

      <Input
        placeholder="Email or Phone No"
        placeholderTextColor="#6B7280"
        value={form.email}
        onChangeText={(text) => updateForm("email", text)}
      />

      <View className="relative mb-4">
        <Input
          placeholder="Password"
          placeholderTextColor="#6B7280"
          value={form.password}
          onChangeText={(text) => updateForm("password", text)}
          secureTextEntry={!form.showPassword}
        />
        <TouchableOpacity
          onPress={() => updateForm("showPassword", !form.showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <Ionicons
            name={form.showPassword ? "eye-off" : "eye"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      <Input
        placeholder="Promo Code"
        placeholderTextColor="#6B7280"
        value={form.promo_code}
        onChangeText={(text) => updateForm("promo_code", text)}
      />

      <TouchableOpacity
        onPress={() => updateForm("rememberMe", !form.rememberMe)}
        className="flex-row items-center mb-4"
      >
        <FontAwesome
          name={form.rememberMe ? "toggle-on" : "toggle-off"}
          size={24}
          color="#7138ED"
        />
        <Text className="ml-2 text-gray-700 font-medium dark:text-gray-300">
          Remember Me
        </Text>
      </TouchableOpacity>

      <AuthButton btnText="Sign Up" handleOnpress={handleSignup} />
    </View>
  );
}
