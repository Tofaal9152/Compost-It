import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Input } from "~/src/components/ui/input";
import { SignUpFormData, signUpSchema } from "~/src/schema/authSchema";
import { SignupAction } from "~/src/services/authService/SignupService";
import AuthButton from "./AuthButton";

const SignUpForm = () => {
  const signupMutation = SignupAction();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Form Data:", data);
    signupMutation.mutate({
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    reset();
  };

  return (
    <View className="gap-4">
      {/* Email */}
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="Enter your email"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className="text-sm bg-white border-0 text-black"
              placeholderTextColor="#6B7280"
            />
          )}
        />
        {errors.email && (
          <Text className="text-xs text-red-500 mt-1">
            {errors.email.message}
          </Text>
        )}
      </View>
      {/* phone */}
      <View>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="Enter your phone number"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className="text-sm bg-white border-0 text-black"
              placeholderTextColor="#6B7280"
            />
          )}
        />
        {errors.phone && (
          <Text className="text-xs text-red-500 mt-1">
            {errors.phone.message}
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
          <Text className="ml-1 text-xs text-gray-700 ">Remember Me</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-xs text-[#0F5329] font-medium">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <AuthButton
        btnText="Sign up"
        handleOnpress={handleSubmit(onSubmit)}
        isLoading={signupMutation.isPending}
      />
    </View>
  );
};

export default SignUpForm;
