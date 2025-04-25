import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import ActiveWorkout from "~/components/ActiveWorkout";
import { Button } from "~/components/ui/button";
import WorkoutCard from "~/components/WorkoutCard";
import { fetchWorkoutTemplates } from "~/lib/fetchData";
import { Plus } from "~/lib/icons/Plus";
import { storage } from "~/lib/storage/mmkv";
import { useColorScheme } from "~/lib/useColorScheme";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
