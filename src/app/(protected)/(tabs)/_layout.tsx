import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabsLayout() {
  const insects = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0F5329",
        tabBarInactiveTintColor: "#0F5329B2",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          paddingTop: 5,
          paddingBottom: insects.bottom,
          height: 60 + insects.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          headerShown: true,
          headerTitle: "Eco-Friendly Shop",
          headerRight: () => (
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          ),
          headerTitleStyle: {
            fontWeight: "600",
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#0F5329",
            shadowColor: "transparent",
          },

          headerTitleAlign: "left",
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="store" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          headerShown: true,
          headerTitle: "Leaderboard",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "600",
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#0F5329",
            shadowColor: "transparent",
          },
          headerRight: () => (
            <Ionicons
              name="trophy-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          ),

          title: "Leaders",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="heatmap"
        options={{
          headerShown: false,
          headerTitleAlign: "left",
          popToTopOnBlur: true,
          headerTitleStyle: {
            fontWeight: "600",
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#0F5329",
            shadowColor: "transparent",
          },
          headerRight: () => (
            <Feather
              name="map-pin"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          ),

          title: "Heatmap",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="map" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
