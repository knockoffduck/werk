// app/modal.tsx
import { View, Text } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { Button } from "./ui/button";
import { Timer } from "~/lib/icons/Timer";

export default function ActiveWorkout() {
  return (
    <View className="bg-background flex items-center w-full h-full px-5 pt-3 dark:bg-darkBackground">
      <View className="h-2 w-12 bg-[#7E7E7E] rounded-xl"></View>
      <View className="w-full flex flex-row items-stretch">
        <Button>
          <Timer fontWeight="" className="text-darkText"></Timer>
        </Button>
      </View>
    </View>
  );
}
