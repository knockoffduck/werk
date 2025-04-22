// app/modal.tsx
import { View, Text, Pressable, ScrollView } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { Button } from "./ui/button";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { Timer } from "~/lib/icons/Timer";
import React from "react";
import ExerciseTable from "~/components/ExerciseTable";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveWorkout({
  modalVisible,
  setModalVisible,
}: Props) {
  return (
    <View className="bg-background flex items-center w-full h-full pt-3">
      <Pressable
        onPress={() => setModalVisible(false)}
        className="h-1 w-12 bg-[#7E7E7E] rounded-xl mb-2"
      ></Pressable>
      <View className="flex">
        <View className="w-full flex flex-row justify-between px-5 mb-5">
          <Button className="bg-secondary rounded-lg">
            <Timer strokeWidth={2.5} className="text-text "></Timer>
          </Button>
          <Button className="bg-primary rounded-lg">
            <Text className="font-semibold text-textWhite">Finish</Text>
          </Button>
        </View>
        <ScrollView>
          <View className="flex w-full px-5 mb-5">
            <View>
              <Text className="text-text text-3xl font-bold dark:text-darkText">
                Monday Session
              </Text>
              <Text className="text-text text-xl font-medium dark:text-darkText opacity-50 mt-1">
                Morning Pull Routine
              </Text>
              <Text className="text-text text-xl font-semibold dark:text-darkText mt-1">
                00:11:11
              </Text>
              <Text className="text-text text-xl font-medium dark:text-darkText mt-1">
                Just a standard Monday workout. Felt weaker than last week.
              </Text>
            </View>
          </View>

          <View>
            <ExerciseTable></ExerciseTable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
