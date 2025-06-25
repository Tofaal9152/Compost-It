import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  ScrollView,
  // Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomImage from "~/src/components/CustomImage";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import { Button } from "~/src/components/ui/button";
import { useFetchData } from "~/src/hooks/useFetchData";
import { showToast } from "~/src/hooks/useToast";
import { useAuthStore } from "~/src/store/authStore";

const Profile = () => {
  // const [darkMode, setDarkMode] = useState(false);

  const { data, isLoading, isError, error } = useFetchData<any>(
    "api/auth/profile",
    "profile"
  );
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
    <LoaderWrapper isLoading={isLoading} isError={isError} error={error}>
      <ScrollView className="flex-1 p-4 bg-white dark:bg-gray-900">
        {/* Avatar + Name Section */}

        <View className="items-center mb-10">
          <CustomImage
            uri={
              data?.user?.profile ??
              "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
            }}
          />

          <Text className="mt-4 text-2xl font-semibold text-[#0F5329]">
            {data?.user?.email ?? "N/A"}
          </Text>
          <Text className="text-gray-500 text-base">
            {data?.user?.userType ?? "N/A"}
          </Text>
        </View>

        {/* User Info */}
        <View className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <InfoRow label="Phone" value={data?.user?.phone ?? "N/A"} />
          <InfoRow label="Email" value={data?.user?.email ?? "N/A"} />
          <InfoRow label="Role" value={data?.user?.currentRole ?? "N/A"} />
          <InfoRow
            label="Verified"
            value={data?.user?.isVerified ? "Yes" : "No"}
            icon={data?.user?.isVerified ? "checkmark-circle" : "close-circle"}
            iconColor={data?.user?.isVerified ? "#4CAF50" : "#F44336"}
          />
          <InfoRow
            label="Member Since"
            value={new Date(data?.user?.createdAt).toLocaleDateString()}
          />
        </View>

        {/* Bottom Settings */}
        <View className="mt-10  border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          {/* <View className="flex-row justify-between items-center">
            <Text className="text-[#0F5329]  font-medium">Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
              trackColor={{ false: "#ccc", true: "#949D6A" }}
              thumbColor={darkMode ? "#0F5329" : "#f4f3f4"}
            />
          </View> */}

          <TouchableOpacity className="flex-row items-center gap-2">
            <Ionicons name="settings-outline" size={20} color="#0F5329" />
            <Text className="text-[#0F5329]  font-medium">Settings</Text>
          </TouchableOpacity>
          {/* Edit Profile */}
          {/* <EditProfile user={user} /> */}
          {/* Logout */}
          <Button
            onPress={handleLogoutAlert}
            className="mt-4 bg-[#0F5329] px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </LoaderWrapper>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
  iconColor,
}: {
  label: string;
  value: string;
  icon?: any;
  iconColor?: string;
}) => (
  <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-800 py-3">
    <Text className="text-[#0F5329]">{label}</Text>
    <View className="flex-row items-center gap-2">
      {icon && <Ionicons name={icon} size={16} color={iconColor || "#555"} />}
      <Text className="font-medium text-[#0F5329] ">{value}</Text>
    </View>
  </View>
);

export default Profile;
