import { Text } from "react-native";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/src/components/ui/tabs";

import { useState } from "react";
import CompletedRequest from "./CompletedRequest";
import PendingRequests from "./PendingRequests";
import { useAuthStore } from "~/src/store/authStore";
import CollectedRequest from "./CollectedRequest";
const CompanyPlusRiderScreen = () => {
  const { role } = useAuthStore();
  const isRider = role === "rider";
  const [value, setValue] = useState("pending");
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      {/* Tab List */}
      <TabsList className="flex-row w-full dark:bg-white mb-4 rounded-md">
        <TabsTrigger className="flex-1 dark:bg-white" value="pending">
          <Text className="text-lg font-bold text-[#0F5329]">Pending</Text>
        </TabsTrigger>
        {isRider && (
          <TabsTrigger className="flex-1 dark:bg-white" value="collected">
            <Text className="text-lg font-bold text-[#0F5329]">Collected</Text>
          </TabsTrigger>
        )}
        <TabsTrigger className="flex-1 dark:bg-gray-100" value="completed">
          <Text className="text-lg font-bold text-[#0F5329]">Completed</Text>
        </TabsTrigger>
      </TabsList>
      {/* Tab Content */}
      <TabsContent value="pending">
        <PendingRequests activeTab={value} />
      </TabsContent>
      {isRider && (
        <TabsContent value="collected">
          <CollectedRequest activeTab={value} />
        </TabsContent>
      )}
      <TabsContent value="completed">
        <CompletedRequest activeTab={value} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyPlusRiderScreen;
