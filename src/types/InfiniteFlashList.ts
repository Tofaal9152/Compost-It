import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { JSX } from "react";
import {
    ViewStyle
} from "react-native";

export type InfiniteFlashListProps<T> = {
  query: UseInfiniteQueryResult<any>;
  extractItems: (data: any) => T[];
  renderItem: ({ item }: { item: T }) => JSX.Element;
  estimatedItemSize?: number;
  itemSeparatorHeight?: number;
  keyExtractor?: (item: T, index: number) => string;
  contentContainerStyle?: ViewStyle;
};
