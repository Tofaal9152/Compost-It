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
    console.log("Submitting pickup request with payload:", payload);
    try {
      setLoading(true);
      await API.post("/api/pickup-requests", payload);

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
      className="bg-[#F4F4F4]"
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      {/* Preferred Time Picker Button */}

      {/* Waste Type Selector */}
      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="wasteType">
          Type of Waste
        </Label>
        <Select
          defaultValue={{ label: "Organic", value: "organic" }}
          className="text-[#0F5329] dark:bg-white dark:border-gray-300"
          onValueChange={(
            option: { label: string; value: string } | undefined
          ) => {
            if (option) setWasteType(option.value);
          }}
        >
          <SelectTrigger className="bg-white rounded p-3 mt-1">
            <SelectValue placeholder="Select Waste Type" />
          </SelectTrigger>
          <SelectContent insets={contentInsets}>
            <SelectGroup>
              <SelectLabel>Waste Types</SelectLabel>
              <SelectItem value="organic" label="Organic">
                Organic
              </SelectItem>
              <SelectItem value="plastic" label="Plastic">
                Plastic
              </SelectItem>
              <SelectItem value="paper" label="Paper">
                Paper
              </SelectItem>
              <SelectItem value="metal" label="Metal">
                Metal
              </SelectItem>
              <SelectItem value="e-waste" label="E-Waste">
                E-Waste
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="estimatedWeight">
          Estimated Weight (kg)
        </Label>
        <Input
          id="estimatedWeight"
          keyboardType="numeric"
          value={estimatedWeight}
          onChangeText={setEstimatedWeight}
          placeholder="Enter weight in kg"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="address">
          Address
        </Label>
        <Input
          id="address"
          value={address}
          onChangeText={setAddress}
          placeholder="Pickup address"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="landmark">
          Landmark
        </Label>
        <Input
          id="landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Nearby landmark"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="instructions">
          Instructions
        </Label>
        <Input
          id="instructions"
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Any special instructions"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="preferredTime">
          Preferred Time
        </Label>
        <Button
          className=" bg-white border border-gray-300 rounded p-3 flex-row items-center"
          onPress={showDatePicker}
        >
          <FontAwesome name="calendar" size={16} color="#0F5329" />
          <Text className="ml-2 text-[#0F5329]">
            {preferredTime ? preferredTime : "Select Preferred Date"}
          </Text>
        </Button>
      </View>

      <View className="mb-5">
        <Label className="text-[#0F5329]" htmlFor="notes">
          Notes
        </Label>
        <Input
          id="notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra notes (optional)"
          multiline
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>
      <Button
        disabled={loading}
        onPress={handleSubmit}
        className="bg-[#0F5329] rounded-lg py-2 gap-2 flex-row items-center justify-center"
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
        <Text className="text-white ">Request Pickup</Text>
      </Button>
    </KeyboardAwareScrollView>
  );
}
