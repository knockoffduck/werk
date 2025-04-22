import { Pressable } from "@rn-primitives/slot";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Link, useRouter } from "expo-router";

interface Props {}

const WorkoutCard: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <Pressable className="bg-secondary dark:bg-[#1C1C1E] flex gap-2 p-5 rounded-lg mb-5">
      <View>
        <Text className="text-black font-semibold dark:text-text">Pull</Text>
        <Text className="text-black font-semibold dark:text-text opacity-40">
          Warm Up, Lat Pulldown (Cable), Seated Cable Row - V Grip (Cable)
        </Text>
        <Button onPress={() => router.push("/ActiveWorkout")} className="mt-3">
          <Text className="text-text font-medium">Start Workout</Text>
        </Button>
      </View>
    </Pressable>
  );
};

export default WorkoutCard;
