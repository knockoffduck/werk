import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "./ui/button";
import { X as Close } from "../lib/icons/Close";
import { Input } from "./ui/input";
import { fetchExercises } from "~/lib/fetchData";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDB, ExerciseProps } from "~/types/exercises";
import AnimatedButton from "./AnimatedButton";
import { clsx } from "clsx";
import { storage } from "~/lib/storage/mmkv";

type ComponentProps = {
  addExerciseModalVisible: boolean;
  setAddExerciseModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: () => void;
};

const AddExercise = ({
  addExerciseModalVisible,
  setAddExerciseModalVisible,
  handleModalClose,
}: ComponentProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseProps[]>([]);

  useEffect(() => {
    console.log(selectedExercise);
  }, [selectedExercise]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["addExercises"],
    queryFn: fetchExercises,
  });
  if (error) {
    return <div>Error fetching exercises</div>;
  }

  if (isLoading) {
    return <div>Loading exercises...</div>;
  }

  const formattedData: ExerciseProps[] = data.map((exercise: ExerciseDB) => {
    return {
      id: exercise.id,
      name: exercise.name,
      category: exercise.category,
    };
  });

  const handleExerciseSelection = (exercise: ExerciseProps) => {
    setSelectedExercise([...selectedExercise, exercise]);
    // if exercise is already selected remove it
    console.log("Exercise selected:", exercise);
    console.log("Selected exercises:", selectedExercise);
    console.log(selectedExercise.some((e) => e.id === exercise.id));

    if (selectedExercise.some((e) => e.id === exercise.id)) {
      setSelectedExercise(selectedExercise.filter((e) => e.id !== exercise.id));
    }
  };

  const checkIfExerciseIsSelected = (exercise: ExerciseProps) => {
    return selectedExercise.some((e) => e.id === exercise.id);
  };

  const handleAddExercise = () => {
    console.log("Adding exercise");

    const formattedExercises = selectedExercise.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      sets: [],
    }));

    const currentWorkout = storage.getString("currentWorkout");

    if (!currentWorkout) {
      console.error("No current workout found");
      return;
    }

    const workout = JSON.parse(currentWorkout);

    const updatedWorkout = {
      ...workout,
      exercises: [...workout.exercises, ...formattedExercises],
    };

    storage.set("currentWorkout", JSON.stringify(updatedWorkout));

    setSelectedExercise([]);
    handleModalClose();
    console.log(
      "Exercise added successfully",
      storage.getString("currentWorkout"),
    );
  };

  return (
    <Modal
      useNativeDriver={true}
      className="relative"
      isVisible={addExerciseModalVisible}
    >
      <View className="flex flex-col w-full items-center h-[44rem] bg-background rounded-lg">
        <View className="flex flex-row justify-between gap-3 w-full p-4">
          <Pressable
            className="bg-secondary p-2 flex items-center justify-center rounded-lg"
            onPress={() => setAddExerciseModalVisible(false)}
          >
            <Close strokeWidth={2} className="text-text p-0 leading-5"></Close>
          </Pressable>
          <Pressable
            className="bg-secondary p-3 flex items-center justify-center rounded-lg"
            onPress={() => setAddExerciseModalVisible(false)}
          >
            <Text className="text-textWhite font-semibold">Create</Text>
          </Pressable>
        </View>
        <View className="p-5 w-full">
          <Input
            className="bg-secondary text-text font-semibold text-lg leading-5"
            placeholderTextColor="#8D8D8E"
            placeholder="Search"
          ></Input>
        </View>
        {formattedData && (
          <FlatList
            className="w-full "
            data={formattedData}
            renderItem={({ item }: { item: ExerciseProps }) => (
              <View
                className={clsx(
                  "flex",
                  "items-center",
                  "border-[#3D3D3D]",
                  "border-t-[0.25px]",
                  checkIfExerciseIsSelected(item)
                    ? "bg-primary-40"
                    : "bg-transparent",
                )}
              >
                <Pressable
                  onPress={() => handleExerciseSelection(item)}
                  className="rounded-none w-full h-20 flex items-start justify-center px-5 bg-transparent active:bg-primary-40"
                >
                  <Text className="text-text font-semibold">{item.name}</Text>
                  <Text className="text-text-50 font-medium">
                    {item.category}
                  </Text>
                </Pressable>
              </View>
            )}
            ListFooterComponent={<View style={{ height: 95 }} />}
          />
        )}
        {selectedExercise.length > 0 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="absolute bottom-5"
          >
            <Pressable
              onPress={() => handleAddExercise()}
              className="bg-primary px-24 py-4 active:opacity-90 rounded-lg"
            >
              <Text className="text-textWhite font-semibold text-lg leading-5">
                Add {selectedExercise.length} Exercises
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        )}
      </View>
    </Modal>
  );
};

export default AddExercise;
