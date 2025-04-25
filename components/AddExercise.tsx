import React from "react";
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
import { ExerciseProps } from "~/types/exercises";
import { ExerciseCard } from "~/components/ExerciseCard";

type ComponentProps = {
  addExerciseModalVisible: boolean;
  setAddExerciseModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderItem = ({ item }: { item: ExerciseProps }) => (
  <ExerciseCard
    exerciseId={item.exerciseId}
    name={item.name}
    category={item.category}
  />
);

const AddExercise = ({
  addExerciseModalVisible,
  setAddExerciseModalVisible,
}: ComponentProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  const dataWithFooter = [
    ...data,
    { exerciseId: "999", name: " ", category: " " },
  ];
  console.log(data);

  return (
    <Modal className="relative" isVisible={addExerciseModalVisible}>
      <View className="flex flex-col  w-full items-center h-[44rem] bg-background rounded-lg">
        <View className="flex flex-row justify-between gap-3 w-full p-4">
          <Button
            className="bg-secondary px-2"
            onPress={() => setAddExerciseModalVisible(false)}
          >
            <Close strokeWidth={2} className="text-text p-0"></Close>
          </Button>
          <Button
            className="bg-secondary px-2"
            onPress={() => setAddExerciseModalVisible(false)}
          >
            <Text>Create</Text>
          </Button>
        </View>
        <View className="p-5 border-b-[0.25px] w-full">
          <Input
            className="bg-secondary text-text"
            placeholderTextColor="#8D8D8E"
            placeholder="Search"
          ></Input>
        </View>
        {data && (
          <FlatList
            className="w-full "
            data={dataWithFooter}
            renderItem={renderItem}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="absolute bottom-5"
        >
          <Pressable className="bg-primary px-24 py-4 rounded-lg">
            <Text className="text-lg font-semibold text-textWhite leading-5 ">
              Add 3 Exercises
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddExercise;
