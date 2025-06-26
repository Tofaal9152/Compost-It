import { Slot, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthLayout() {
  return (
    <LinearGradient
      colors={["rgba(255, 250, 255, 0.8)", "#949D6A"]}
      start={{ x: 1.14, y: 0.21 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <Slot />
    </LinearGradient>
  );
}
