import * as Location from "expo-location";
import { default as React, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";

const YourLocation = () => {
  const [location, setLocation] = useState<string>("Loading...");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geo.length > 0) {
        const place = geo[0];
        const fullAddress = [
          place.name,
          place.street,
          place.postalCode,
          place.city || place.region,
          place.district,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");

        const latLong = `Lat: ${loc.coords.latitude.toFixed(
          4
        )}, Lon: ${loc.coords.longitude.toFixed(4)}`;

        setLocation(`${fullAddress}\n${latLong}`);
      } else {
        setLocation("Location not found");
      }
    })();
  }, []);

  return (
    <View className="bg-[#F4F4F4] dark:bg-gray-900 p-3 rounded-lg mb-4">
      {(() => {
        const [address = "", latLong = ""] = location.split("\n");
        const addressParts = address.split(",").map((part) => part.trim());
        const labels = [
          "Place",
          "Street",
          "Postal Code",
          "City/Region",
          "District",
          "Country",
        ];

        return (
          <>
            {["Loading...", "Permission denied", "Location not found"].includes(
              address
            ) ? (
              <Text className="text-sm font-semibold text-[#0F5329] dark:text-green-300">
                {address}
              </Text>
            ) : (
              <>
                {addressParts.map((part, i) =>
                  part ? (
                    <View key={i} className="flex-row mb-1">
                      <Text className="text-xs font-semibold text-[#0F5329] dark:text-green-300 w-24">
                        {labels[i]}:
                      </Text>
                      <Text className="text-xs text-gray-800 dark:text-gray-100 flex-1">
                        {part}
                      </Text>
                    </View>
                  ) : null
                )}
                {latLong && (
                  <View className="flex-row mt-1">
                    <Text className="text-xs font-semibold text-[#0F5329] dark:text-green-300 w-24">
                      Coordinates:
                    </Text>
                    <Text
                      className="text-xs text-gray-800 dark:text-gray-100 flex-1"
                      style={{ fontFamily: "monospace" }}
                    >
                      {latLong}
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        );
      })()}
    </View>
  );
};

export default YourLocation;
