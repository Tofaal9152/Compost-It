import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "../../ui/button";

const AuthButton = ({
  btnText,
  handleOnpress,
  isLoading,
}: {
  btnText: string;
  handleOnpress?: () => Promise<void>;
  isLoading?: boolean;
}) => {
  return (
    <Button
      disabled={isLoading}
      onPress={handleOnpress}
      className="bg-[#7138ED] rounded-lg py-2 gap-2 flex-row items-center justify-center"
    >
      {isLoading && (
        <View>
          <FontAwesome
            name="spinner"
            size={16}
            color="#fff"
            className="animate-spin"
          />
        </View>
      )}
      <Text className="text-white text-sm">{btnText}</Text>
    </Button>
  );
};

export default AuthButton;
