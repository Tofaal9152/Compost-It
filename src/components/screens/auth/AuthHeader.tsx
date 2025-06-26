import { View, Text } from "react-native";
import CustomImage from "~/src/components/CustomImage";

const AuthHeader = ({ title }: { title: string }) => {
  return (
    <View className="items-center mb-10 mt-16">
      {/* <CustomImage
        source={require("~/src/assets/images/compost_it_logo")}
        style={{ width: 36, height: 36 }}
        contentFit="contain"
      /> */}
      <Text className="text-3xl font-bold mt-4 text-black dark:text-white">
        {title}
      </Text>
    </View>
  );
};

export default AuthHeader;
