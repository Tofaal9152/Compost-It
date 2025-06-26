import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/src/components/ui/select";
import { showToast } from "~/src/hooks/useToast";
import API from "~/src/lib/api";
import { useAuthStore } from "~/src/store/authStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RequestPickup() {
  const { id } = useAuthStore();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [loading, setLoading] = useState(false);
  const [wasteType, setWasteType] = useState("organic");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  const handleSubmit = async () => {
    if (!location) {
      Alert.alert("Location not available", "Please allow location access.");
      return;
    }

    const payload = {
      household_id: id,
      waste_type: wasteType,
      estimated_weight: parseFloat(estimatedWeight),
      pickup_location: {
        lat: location.lat,
        lng: location.lng,
        address,
        landmark,
        instructions,
      },
      preferred_time: preferredTime,
      notes,
    };

    try {
      setLoading(true);
      await API.post("api/pickup-requests", payload);

      showToast({
        title: "Success",
        description: "Pickup request submitted successfully!",
        type: "success",
      });

      setWasteType("organic");
      setEstimatedWeight("");
      setAddress("");
      setLandmark("");
      setInstructions("");
      setPreferredTime("");
      setNotes("");
      setLocation(null);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: "Failed to submit pickup request. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: preferredTime ? new Date(preferredTime) : new Date(),
      mode: "date",
      display: "default",
      onChange: (_event, date) => {
        if (date) {
          setPreferredTime(date.toISOString().slice(0, 16).replace("T", " "));
        }
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      className="bg-gray-50 dark:bg-gray-950"
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      {/* Waste Type Selector */}
      <View className="mb-4">
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="wasteType">
          Type of Waste
        </Label>
        <Select
          defaultValue={{ label: "Organic", value: "organic" }}
          className="dark:bg-gray-900 dark:border-gray-600"
          onValueChange={(
            option: { label: string; value: string } | undefined
          ) => {
            if (option) setWasteType(option.value);
          }}
        >
          <SelectTrigger className="bg-white dark:bg-gray-900 rounded p-3 mt-1 border border-gray-300 dark:border-gray-600">
            <SelectValue
              placeholder="Select Waste Type"
              className="text-gray-900 dark:text-gray-100"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className="dark:bg-gray-800">
            <SelectGroup>
              <SelectLabel className="text-gray-900 dark:text-gray-300">
                Waste Types
              </SelectLabel>
              <SelectItem
                value="organic"
                label="Organic"
                className="dark:text-gray-100"
              >
                Organic
              </SelectItem>
              <SelectItem
                value="plastic"
                label="Plastic"
                className="dark:text-gray-100"
              >
                Plastic
              </SelectItem>
              <SelectItem
                value="paper"
                label="Paper"
                className="dark:text-gray-100"
              >
                Paper
              </SelectItem>
              <SelectItem
                value="metal"
                label="Metal"
                className="dark:text-gray-100"
              >
                Metal
              </SelectItem>
              <SelectItem
                value="e-waste"
                label="E-Waste"
                className="dark:text-gray-100"
              >
                E-Waste
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>

      <View className="mb-4">
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="estimatedWeight"
        >
          Estimated Weight (kg)
        </Label>
        <Input
          id="estimatedWeight"
          keyboardType="numeric"
          value={estimatedWeight}
          onChangeText={setEstimatedWeight}
          placeholder="Enter weight in kg"
          className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-600"
          placeholderTextColor="#6B7280" // Tailwind's gray-500 color for placeholder
        />
      </View>

      <View className="mb-4">
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="address">
          Address
        </Label>
        <Input
          id="address"
          value={address}
          onChangeText={setAddress}
          placeholder="Pickup address"
          className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-600"
          placeholderTextColor="#6B7280"
        />
      </View>

      <View className="mb-4">
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="landmark">
          Landmark
        </Label>
        <Input
          id="landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Nearby landmark"
          className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-600"
          placeholderTextColor="#6B7280"
        />
      </View>

      <View className="mb-4">
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="instructions"
        >
          Instructions
        </Label>
        <Input
          id="instructions"
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Any special instructions"
          className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-600"
          placeholderTextColor="#6B7280"
        />
      </View>

      <View className="mb-4">
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="preferredTime"
        >
          Preferred Time
        </Label>
        <Button
          className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 flex-row items-center"
          onPress={showDatePicker}
        >
          <FontAwesome name="calendar" size={16} color="#047857" />
          <Text className="ml-2 text-gray-900 dark:text-gray-100">
            {preferredTime ? preferredTime : "Select Preferred Date"}
          </Text>
        </Button>
      </View>

      <View className="mb-5">
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="notes">
          Notes
        </Label>
        <Input
          id="notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra notes (optional)"
          multiline
          className="text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-600"
          placeholderTextColor="#6B7280"
        />
      </View>

      <Button
        disabled={loading}
        onPress={handleSubmit}
        className="bg-green-800 dark:bg-green-600 rounded-lg py-2 gap-2 flex-row items-center justify-center"
      >
        {loading && (
          <View>
            <FontAwesome
              name="spinner"
              size={16}
              color="#fff"
              className="animate-spin"
            />
          </View>
        )}
        <Text className="text-white">Request Pickup</Text>
      </Button>
    </KeyboardAwareScrollView>
  );
}
