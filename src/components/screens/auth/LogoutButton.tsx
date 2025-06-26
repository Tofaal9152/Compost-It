import React from "react";
import { Alert, Text } from "react-native";
import { Button } from "~/src/components/ui/button";
import { showToast } from "~/src/hooks/useToast";
import { useAuthStore } from "~/src/store/authStore";
const LogoutButton = () => {
  const { reset } = useAuthStore();

  const handleLogoutAlert = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: handleLogout, style: "destructive" },
      ],
      { cancelable: true }
    );
  };
  const handleLogout = () => {
    reset();
    showToast({
      type: "success",
      title: "Logout Successful",
      description: "You have been logged out.",
    });
  };
  return (
    <Button
      onPress={handleLogoutAlert}
      className="mt-4 bg-[#0F5329] px-4 py-2 rounded-lg"
    >
      <Text className="text-white font-semibold">Logout</Text>
    </Button>
  );
};

export default LogoutButton;
