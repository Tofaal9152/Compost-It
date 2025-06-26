import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoaderWrapper from "~/src/components/LoaderWrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/src/components/ui/select";
import { useInfiniteData } from "~/src/hooks/useInfiniteData";
const AllRidersSelect = ({ onSubmit }: any) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [_rider, setrider] = useState("organic");
  const AllRiderquery = useInfiniteData<any>(`api/rider`, ["allRiders"]);
  const allRiders =
    AllRiderquery.data && AllRiderquery.data.pages
      ? AllRiderquery.data.pages.flatMap((page: any) => page.requests)
      : [];

  return (
    <LoaderWrapper
      isLoading={AllRiderquery.isLoading}
      error={AllRiderquery.error}
      isError={AllRiderquery.isError}
    >
      <Select
        className="text-[#0F5329] dark:bg-white dark:border-gray-300"
        onValueChange={(
          option: { label: string; value: string } | undefined
        ) => {
          if (option) setrider(option.value);
        }}
      >
        <SelectTrigger className="bg-white dark:bg-gray-900">
          <SelectValue
            placeholder="Select rider"
            className="text-[#0F5329] dark:text-green-300"
          />
        </SelectTrigger>
        <SelectContent insets={contentInsets}>
          <SelectGroup>
            <SelectLabel>rider Types</SelectLabel>
            {allRiders.map((rider) => (
              <SelectItem
                key={rider.id}
                value={rider.id}
                label={rider.rider_name}
                onPress={() => onSubmit(rider.id)}
              >
                {rider.rider_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </LoaderWrapper>
  );
};

export default AllRidersSelect;
