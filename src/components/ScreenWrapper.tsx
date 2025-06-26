import { ReactNode } from "react";
import { Stack } from "expo-router";
import { Fragment } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "~/src/components/ui/text";

type ScreenWrapperProps = {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
};

const ScreenWrapper = ({
  title,
  children,
  isLoading,
  isError,
  error,
}: ScreenWrapperProps) => {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          title,
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#7138ED" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <ErrorMessage error={error} />
      ) : (
        children
      )}
    </Fragment>
  );
};

export default ScreenWrapper;

export const LoadingIndicator = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <ActivityIndicator size="large" color="#0F5329" />
    </View>
  );
};

export const ErrorMessage = ({ error }: { error: any }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black px-6">
      <Text className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
        Something went wrong
      </Text>
      <Text className="text-center text-gray-700 dark:text-gray-300">
        {error.message}
      </Text>
    </View>
  );
};
