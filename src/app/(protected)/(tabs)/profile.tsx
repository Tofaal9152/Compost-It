import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import CustomImage from "~/src/components/CustomImage";
import DarkModeSwitch from "~/src/components/DarkModeSwitch";
import LogoutButton from "~/src/components/screens/auth/LogoutButton";
import { useFetchData } from "~/src/hooks/useFetchData";
const Profile = () => {
  const { data } = useFetchData<any>("api/auth/profile", "profile");

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100 dark:bg-gray-950">
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

        <Text className="mt-4 text-2xl font-semibold text-[#0F5329] dark:text-green-300">
          {data?.user?.email ?? "N/A"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-base">
          {data?.user?.userType ?? "N/A"}
        </Text>
      </View>

      {/* User Info */}
      <View className="gap-y-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md dark:shadow-none">
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
          value={new Date(data?.user?.createdAt).toLocaleDateString() ?? "N/A"}
        />
      </View>

      {/* Bottom Settings */}
      <View className="mt-6 gap-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-[#0F5329] dark:text-green-300">Dark Mode</Text>

          <DarkModeSwitch />
        </View>
        <LogoutButton />
      </View>
    </ScrollView>
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
  <View className="flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3">
    <Text className="text-[#0F5329] dark:text-gray-200">{label}</Text>
    <View className="flex-row items-center gap-2">
      {icon && <Ionicons name={icon} size={16} color={iconColor || "#aaa"} />}
      <Text className="font-medium text-[#0F5329] dark:text-white">
        {value}
      </Text>
    </View>
  </View>
);

export default Profile;
