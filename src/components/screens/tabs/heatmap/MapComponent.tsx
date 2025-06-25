import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const MapComponent = ({ markers }: any) => {
  const markerJS = markers
    .map(
      (m: any) =>
        `L.marker([${m.latitude}, ${m.longitude}]).addTo(map)
          .bindPopup("${m.address?.replace(/"/g, "") || "Location"}");`
    )
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
      <style>
        #map { height: 100vh; width: 100vw; }
        body { margin: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([${markers[0]?.latitude || 0}, ${
    markers[0]?.longitude || 0
  }], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);
        ${markerJS}
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView originWhitelist={["*"]} source={{ html }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height / 2,
    width: "100%",
  },
});

export default MapComponent;
