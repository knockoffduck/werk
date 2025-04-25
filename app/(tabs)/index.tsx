import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import ActiveWorkout from "~/components/ActiveWorkout";
import { Button } from "~/components/ui/button";
import WorkoutCard from "~/components/WorkoutCard";
import { Plus } from "~/lib/icons/Plus";
import { useColorScheme } from "~/lib/useColorScheme";

const fetchWorkoutTemplates = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/templates/workouts",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch workout templates");
  }
  const result = await response.json();

  if (!result.success || !result.data) throw new Error(result.message);

  return result.data;
};

export default function Tab() {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View className="flex p-5 gap-4">
      <Button
        className="flex flex-row gap-3"
        onPress={() => setModalVisible(true)}
      >
        <Plus className="text-textWhite"></Plus>
        <Text className="text-textWhite font-semibold">
          Start Empty Workout
        </Text>
      </Button>
      <Text className="text-xl font-semibold text-text">Recent Workouts</Text>
      <ScrollView className="flex flex-col">
        {data &&
          data.map((workout: any) => (
            <WorkoutCard
              key={workout.workoutTemplateId}
              workoutTemplateInfo={workout}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
