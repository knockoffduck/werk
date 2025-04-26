// app/modal.tsx
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { Button } from "./ui/button";
import { Timer } from "~/lib/icons/Timer";
import { CalendarDays } from "~/lib/icons/CalendarDays";
import { Clock } from "~/lib/icons/Clock";
import React from "react";
import ExerciseTable from "~/components/ExerciseTable";
import AddExercise from "./AddExercise";
import { v4 as uuidv4 } from "uuid";
import { template } from "@babel/core";
import {
  getWorkouts,
  setWorkouts,
  StorageKeys,
  Workout,
} from "~/lib/storage/storage";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveWorkout({
  modalVisible,
  setModalVisible,
}: Props) {
  const [addExerciseModalVisible, setAddExerciseModalVisible] =
    React.useState(false);

  const newWorkout: Workout = {
    id: uuidv4(),
    templateId: null,
    name: "",
    startTime: new Date().toISOString(),
    endTime: null,
    durationSeconds: null,
    totalVolumeKg: 0,
    prsAchieved: 0,
    isSynced: false,
    isDeleted: false,
  };

  // Get existing workouts or initialize an empty array
  const existingWorkouts = getWorkouts();
  const updatedWorkouts = [...existingWorkouts, newWorkout];
  setWorkouts(updatedWorkouts);
  console.log("workouts", getWorkouts());

  const handleCancelWorkout = () => {
    setWorkouts(existingWorkouts);
    console.log(getWorkouts());
  };

  return (
    <View className="bg-background flex items-center w-full h-full pt-3">
      <Pressable
        onPress={() => setModalVisible(false)}
        className="h-1 w-12 bg-[#7E7E7E] rounded-xl mb-2"
      ></Pressable>
      <View className="flex w-full">
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
              <TextInput
                placeholder="Workout Name"
                className="text-text text-3xl font-bold border-0 border-transparent ring-0 focus:border-transparent focus:ring-0 "
              ></TextInput>
              <View className="flex flex-row items-center gap-3 mt-2">
                <CalendarDays
                  strokeWidth={1.5}
                  className="text-text-80 "
                ></CalendarDays>
                <Text className="text-text-80 text-lg font-medium">
                  {new Date().toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3 mt-2">
                <Clock strokeWidth={1.5} className="text-text-80 "></Clock>
                <Text className="text-text-80 text-lg font-medium">
                  00:11:11
                </Text>
              </View>
            </View>
          </View>

          <View>{/* <ExerciseTable></ExerciseTable> */}</View>

          <View className="flex flex-col gap-6 px-5">
            <Button
              className="mt-16 bg-primary-30"
              onPress={() => setAddExerciseModalVisible(true)}
            >
              <Text className="text-primary text-lg font-semibold leading-[20px]">
                Add Exercises
              </Text>
            </Button>
            <Button
              className="bg-error-30"
              onPress={() => handleCancelWorkout()}
            >
              <Text className="text-error text-lg font-semibold leading-[20px]">
                Cancel Workout
              </Text>
            </Button>
          </View>
        </ScrollView>
        <AddExercise
          addExerciseModalVisible={addExerciseModalVisible}
          setAddExerciseModalVisible={setAddExerciseModalVisible}
        ></AddExercise>
      </View>
    </View>
  );
}
