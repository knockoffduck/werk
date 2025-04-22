import { Pressable } from "@rn-primitives/slot";
import React from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "./ui/button";
import { Link, useRouter } from "expo-router";
import ActiveWorkout from "./ActiveWorkout";

interface Props {}

const WorkoutCard: React.FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const router = useRouter();
  return (
    <Pressable className="bg-secondary dark:bg-[#1C1C1E] flex gap-2 p-5 rounded-lg mb-5">
      <View>
        <Text className="text-text font-semibold dark:text-darkText">Pull</Text>
        <Text className="text-text font-semibold dark:text-darkText opacity-40">
          Warm Up, Lat Pulldown (Cable), Seated Cable Row - V Grip (Cable)
        </Text>
        <Button onPress={() => setModalVisible(true)} className="mt-3">
          <Text className="text-darkText font-medium">Start Workout</Text>
        </Button>
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setModalVisible(false)}
        >
          <ActiveWorkout></ActiveWorkout>
        </Modal>
      </View>
    </Pressable>
  );
};

export default WorkoutCard;
