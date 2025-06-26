import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack } from "expo-router";
import { ListCheckIcon, UserCircle2Icon } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
import { useColorScheme } from "~/src/lib/useColorScheme";

const HomeLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  const headerBg = isDarkColorScheme ? "#0f172a" : "#ffffff"
  const headerText = isDarkColorScheme ? "#ffffff" : "#0F5329";
  const borderColor = headerText;
  const iconColor = isDarkColorScheme ? "#ffffff" : "#0F5329";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Welcome User!",
          headerTitleAlign: "left",
          headerBackground: () => (
            <View style={{ backgroundColor: headerBg }} />
          ),
          headerTitleStyle: {
            fontWeight: "600",
            color: headerText,
          },
          headerStyle: {
            backgroundColor: headerBg,
          },
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderWidth: 2,
                borderColor: borderColor,
                borderRadius: 8,
                padding: 6,
                marginRight: 16,
              }}
            >
              <UserCircle2Icon color={iconColor} size={16} />
              <Text style={{ color: headerText }}>360D</Text>
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
            color: headerText,
          },
          headerStyle: {
            backgroundColor: headerBg,
          },
          headerRight: () => (
            <FontAwesome5 name="motorcycle" size={24} color={iconColor} />
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
            color: headerText,
          },
          headerStyle: {
            backgroundColor: headerBg,
          },
          headerRight: () => <ListCheckIcon size={24} color={iconColor} />,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
