import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "~/src/components/ui/button";
const HouseholdScreen = () => {
  const scrapItems = [
    {
      label: "PLASTIC",
      image: require("~/src/assets/images/sell_scrapes/plastic.png"),
    },
    {
      label: "PAPER",
      image: require("~/src/assets/images/sell_scrapes/paper.png"),
    },
    {
      label: "E-TRASH",
      image: require("~/src/assets/images/sell_scrapes/e-trash.png"),
    },
    {
      label: "ORGANIC",
      image: require("~/src/assets/images/sell_scrapes/organic.png"),
    },
  ];

  return (
    <View>
      <Text className="text-lg font-bold mb-3 text-[#0F5329]">Sell Scraps</Text>
      <View className="flex-row justify-between mb-6">
        {scrapItems.map((item, idx) => (
          <View key={idx} className="items-center">
            <TouchableOpacity className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden mb-2">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="text-xs">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Current Deals Section */}
      <Text className="text-lg font-bold mb-3 text-[#0F5329]">
        Current Deals
      </Text>
      <View className="flex-row flex-wrap  justify-between my-4  gap-2">
        {["PLASTIC", "PAPER", "E-TRASH", "ORGANIC"].map((deal, index) => (
          <View
            key={index}
            className="bg-[#E0E0D5] h-[6rem] rounded-lg shadow-md flex-1 items-center justify-center "
          >
            <Text className="text-[#0F5329] text-sm">{deal}</Text>
          </View>
        ))}
      </View>

      <Link href="/pickup-requests" asChild push>
        <Button className="bg-[#0F5329] mt-8">
          <Text className="text-white textsm">See All Pickup Request</Text>
        </Button>
      </Link>
    </View>
  );
};

export default HouseholdScreen;
