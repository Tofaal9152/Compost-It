import { useEffect, useState } from "react";
import { useColorScheme as useNativewindColorScheme } from "nativewind";


export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();

  const [resolvedColorScheme, setResolvedColorScheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (colorScheme) {
      setResolvedColorScheme(colorScheme);
    }
  }, [colorScheme]);

  return {
    colorScheme: resolvedColorScheme,
    isDarkColorScheme: resolvedColorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
