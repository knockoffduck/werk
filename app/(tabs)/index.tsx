import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal, ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import ActiveWorkout from "~/components/ActiveWorkout";
import { Button } from "~/components/ui/button";
import WorkoutCard from "~/components/WorkoutCard";
import { fetchWorkoutTemplates } from "~/lib/fetchData";
import { Plus } from "~/lib/icons/Plus";
import { v4 as uuidv4 } from "uuid";
import { getWorkouts, setWorkouts, Workout } from "~/lib/storage/storage";
import { storage } from "~/lib/storage/mmkv";

export default function Tab() {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);

  const startNewWorkout = () => {
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
    storage.set("currentWorkoutId", newWorkout.id);

    // Get existing workouts or initialize an empty array
    const existingWorkouts = getWorkouts();
    const updatedWorkouts = [...existingWorkouts, newWorkout];
    setWorkouts(updatedWorkouts);
    console.log("workouts", getWorkouts());
    setModalVisible(true);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["workoutTemplates"],
    queryFn: fetchWorkoutTemplates,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  console.log("here", data);

  return (
    <View className="flex p-5 gap-4">
      <Button className="flex flex-row gap-3" onPress={() => startNewWorkout()}>
        <Plus className="text-textWhite"></Plus>
        <Text className="text-textWhite font-semibold">
          Start Empty Workout
        </Text>
      </Button>
      <Text className="text-xl font-semibold text-text">Recent Workouts</Text>
      <ScrollView className="flex flex-col">
        {data &&
          data.map((workout: any) => (
            <WorkoutCard key={workout.id} workoutTemplateInfo={workout} />
          ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <ActiveWorkout
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        ></ActiveWorkout>
      </Modal>
    </View>
  );
}
