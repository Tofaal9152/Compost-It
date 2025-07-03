import { Text, View } from "react-native";

const AuthHeader = ({ title }: { title: string }) => {
  return (
    <View className="items-center mb-10 mt-16  w-full p-4 rounded-lg">
      <Text className="text-2xl font-semibold mt-4 text-[#0F5329] ">
        {title}
      </Text>
    </View>
  );
};

export default AuthHeader;
