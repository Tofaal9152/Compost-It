import React from "react";
import { View } from "react-native";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import LocationContent from "~/src/components/screens/tabs/heatmap/LocationContent";
import MapComponent from "~/src/components/screens/tabs/heatmap/MapComponent";
import { useFetchData } from "~/src/hooks/useFetchData";

const HeatmapSection = () => {
  const { data, isLoading, error, isError } = useFetchData(
    "api/heatmap",
    "heatmap"
  );
  const markers: any[] = Array.isArray(data)
    ? data
        .map((item, index) => ({
          id: index.toString(),
          latitude: item?.location?.lat,
          longitude: item?.location?.lng,
          address: item?.location?.address,
          instructions: item?.location?.instructions,
          landmark: item?.location?.landmark,
        }))
        .filter(
          (marker) =>
            typeof marker.latitude === "number" &&
            typeof marker.longitude === "number"
        )
    : [];
  return (
    <LoaderWrapper isLoading={isLoading} error={error} isError={isError}>
      <View className="flex-1">
        <MapComponent markers={markers} />
        <LocationContent markers={markers} />
      </View>
    </LoaderWrapper>
  );
};

export default HeatmapSection;
