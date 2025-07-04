import { Text, View } from "react-native";
import InfiniteFlashListContent from "~/src/components/InfiniteFlashListContent";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import LeaderboardItem from "~/src/components/screens/tabs/leaderboard/leaderboardItem";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";

export default function Leaderboard() {
  const leaderboardQuery = useInfiniteData<any>(`api/leaderboard`, [
    "leaderboard",
  ]);

  return (
    <LoaderWrapper
      isLoading={leaderboardQuery.isLoading}
      error={leaderboardQuery.error}
      isError={leaderboardQuery.isError}
    >
      <View className="flex-1 bg-gray-100 dark:bg-gray-950 p-4">
        {/* Header Row */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2 flex-row justify-between items-center">
          <Text className="font-bold text-gray-500 dark:text-gray-300 text-center">
            Rank
          </Text>
          <Text className="font-bold text-gray-500 dark:text-gray-300">
            Username
          </Text>
          <Text className="font-bold text-gray-500 dark:text-gray-300 text-right">
            co2 Saved
          </Text>
          <Text className="font-bold text-gray-500 dark:text-gray-300 text-right">
            Waste
          </Text>
        </View>

        {/* List */}
        <InfiniteFlashListContent
          query={leaderboardQuery}
          extractItems={(data) =>
            data.pages.flatMap((page: any) => page.leaderboard)
          }
          renderItem={({ item }) => <LeaderboardItem item={item} />}
          estimatedItemSize={100}
          keyExtractor={(item: { id: string }) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          itemSeparatorHeight={12}
        />
      </View>
    </LoaderWrapper>
  );
}
