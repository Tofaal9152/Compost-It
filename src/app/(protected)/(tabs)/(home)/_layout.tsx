import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack } from "expo-router";
import { ListCheckIcon, UserCircle2Icon } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Welcome User!",
          headerTitleAlign: "left",
          headerBackground: () => <View className="bg-[#f3f4f6]" />,
          headerTitleStyle: {
            fontWeight: "600",
            color: "#0F5329",
          },

          headerStyle: {
            backgroundColor: "#f3f4f6",
          },
          headerRight: () => (
            <View className="flex-row items-center gap-2 border-2 border-[#0F5329] rounded-lg p-2 mr-4">
              <UserCircle2Icon color="#0F5329" size={16} />
              <Text className="text-[#0F5329]">360D</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="request-pickup"
        options={{
          headerTitle: "Request Pickup",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "600",
            color: "#0F5329",
          },
          headerStyle: {
            backgroundColor: "#f3f4f6",
          },
          headerRight: () => (
            <FontAwesome5 name="motorcycle" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="pickup-requests"
        options={{
          headerTitle: "Pickup Requests",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "600",
            color: "#0F5329",
          },
          headerStyle: {
            backgroundColor: "#f3f4f6",
          },
          headerRight: () => <ListCheckIcon size={24} color="black" />,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
