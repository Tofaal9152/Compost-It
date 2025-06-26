import { Link } from "expo-router";
import { default as React } from "react";
import { ScrollView, View } from "react-native";
import RoleBasedRender from "~/src/components/screens/tabs/home/RoleBasedRender";
import YourLocation from "~/src/components/screens/tabs/home/YourLocation";
import { Button } from "~/src/components/ui/button";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";

export default function HomePage() {
  const { role } = useAuthStore();

  return (
    <ScrollView
      style={{ padding: 20 }}
      contentContainerStyle={{ paddingBottom: 50 }}
      className="bg-[#F4F4F4] dark:bg-gray-950"
    >
      <View className="bg-white dark:bg-gray-900 p-5 rounded-2xl mb-6 shadow-md">
        <Text className="text-base font-bold text-[#0F5329] dark:text-green-300 mb-2">
          Current Location
        </Text>

        <YourLocation />

        {role !== "household" && (
          <Link href="/request-pickup" asChild push>
            <Button className="bg-[#0F5329] dark:bg-green-700 px-6 py-3 rounded-full shadow-lg mt-2">
              <Text className="text-white text-center text-base font-semibold tracking-wide">
                🚛 REQUEST A PICKUP
              </Text>
            </Button>
          </Link>
        )}
      </View>

      <RoleBasedRender />
    </ScrollView>
  );
}
