import { Pressable } from "@rn-primitives/slot";
import React from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "./ui/button";
import { Link, useRouter } from "expo-router";
import ActiveWorkout from "./ActiveWorkout";

interface Props {
  workoutTemplateInfo: {
    workoutTemplateId: number;
    workoutName: string;
    exercises: { exerciseId: number; exerciseName: string }[];
  };
}

const WorkoutCard: React.FC<Props> = ({ workoutTemplateInfo }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const exercises = workoutTemplateInfo.exercises
    .map((exercise) => exercise.exerciseName)
    .join(", ");

  const router = useRouter();
  return (
    <Pressable className="bg-secondary flex gap-2 p-5 rounded-lg mb-5">
      <View>
        <Text className="text-text font-semibold">
          {workoutTemplateInfo.workoutName}
        </Text>
        <Text className="text-text font-semibold opacity-40">{exercises}</Text>
        <Button onPress={() => setModalVisible(true)} className="mt-3">
          <Text className="text-textWhite font-semibold">Start Workout</Text>
        </Button>
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setModalVisible(false)}
        >
          <ActiveWorkout
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          ></ActiveWorkout>
        </Modal>
      </View>
    </Pressable>
  );
};

export default WorkoutCard;
