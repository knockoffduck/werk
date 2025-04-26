// app/modal.tsx
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Button } from "./ui/button";
import { Timer } from "~/lib/icons/Timer";
import { CalendarDays } from "~/lib/icons/CalendarDays";
import { Clock } from "~/lib/icons/Clock";
import React, { useEffect } from "react";
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
import { storage } from "~/lib/storage/mmkv";
import { ActiveWorkout as ActiveWorkoutType } from "~/types/workouts";
import { Scroll } from "lucide-react-native";

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
  const [seconds, setSeconds] = React.useState(0);
  const [currentWorkout, setCurrentWorkout] =
    React.useState<ActiveWorkoutType | null>(
      storage.getString("currentWorkout")
        ? JSON.parse(storage.getString("currentWorkout")!)
        : null,
    );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentWorkout, addExerciseModalVisible]);

  const handleCancelWorkout = () => {};

  const handleModalClose = () => {
    setAddExerciseModalVisible(false);
    setCurrentWorkout(
      storage.getString("currentWorkout")
        ? JSON.parse(storage.getString("currentWorkout")!)
        : null,
    );
  };

  const handleFinishWorkout = () => {
    const workoutInfo = JSON.parse(storage.getString("currentWorkout")!);
    console.log(workoutInfo);
  };

  const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View className="bg-background flex items-center  h-full pt-3">
      <Pressable
        onPress={() => setModalVisible(false)}
        className="h-1 w-12 bg-[#7E7E7E] rounded-xl mb-2"
      ></Pressable>
      <View className="flex w-full h-full">
        <View className="w-full flex flex-row justify-between px-5 mb-5">
          <Button className="bg-secondary rounded-lg">
            <Timer strokeWidth={2.5} className="text-text "></Timer>
          </Button>
          <Button
            onPress={() => handleFinishWorkout()}
            className="bg-primary rounded-lg"
          >
            <Text className="font-semibold text-textWhite">Finish</Text>
          </Button>
        </View>
        <ScrollView className="h-full">
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
                  {formatSeconds(seconds)}
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={currentWorkout?.exercises}
            renderItem={({ item }) => (
              <ExerciseTable
                id={item.id}
                name={item.name}
                sets={item.sets}
              ></ExerciseTable>
            )}
          ></FlatList>

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
          handleModalClose={handleModalClose}
        ></AddExercise>
      </View>
    </View>
  );
}
