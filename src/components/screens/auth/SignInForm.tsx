import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TouchableOpacity, View } from "react-native";
import { Input } from "~/src/components/ui/input";
import AuthButton from "./AuthButton";
import { SignInFormData, signInSchema } from "~/src/schema/authSchema";
import { LoginAction } from "~/src/services/authService/LoginService";

const SignInForm = () => {
  const loginMutation = LoginAction();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Form Data:", data);
    loginMutation.mutate({
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    });
  };

  return (
    <View className="gap-4">
      {/* Email */}
      <View>
        <Controller
          control={control}
          name="emailOrPhone"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="Email or Phone"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className="text-sm bg-white border-0 text-black"
              placeholderTextColor="#6B7280"
            />
          )}
        />
        {errors.emailOrPhone && (
          <Text className="text-xs text-red-500 mt-1">
            {errors.emailOrPhone.message}
          </Text>
        )}
      </View>

      {/* Password */}
      <View className="relative">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              className="text-sm bg-white border-0 text-black"
              placeholderTextColor="#6B7280"
            />
          )}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={18}
            color="#6B7280"
          />
        </TouchableOpacity>
        {errors.password && (
          <Text className="text-xs text-red-500 mt-1">
            {errors.password.message}
          </Text>
        )}
      </View>

      {/* Remember Me & Forgot Password */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          className="flex-row items-center"
        >
          <FontAwesome
            name={rememberMe ? "toggle-on" : "toggle-off"}
            size={20}
            color="#0F5329"
          />
          <Text className="ml-1 text-xs text-gray-700">
            Remember Me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-xs text-[#0F5329] font-medium">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <AuthButton
        btnText="Sign In"
        handleOnpress={handleSubmit(onSubmit)}
        isLoading={loginMutation.isPending}
      />
    </View>
  );
};

export default SignInForm;
