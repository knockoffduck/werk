import { Pressable, ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "~/components/ui/button";
import WorkoutCard from "~/components/WorkoutCard";
import { Plus } from "~/lib/icons/plus";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Tab() {
  console.log(useColorScheme());
  return (
    <View className="flex p-5 gap-4">
      <Button className="flex flex-row gap-3">
        <Plus className="text-darkText"></Plus>
        <Text className="text-darkText font-semibold">Start Empty Workout</Text>
      </Button>
      <Text className="text-xl font-semibold text-text dark:text-darkText">
        Recent Workouts
      </Text>
      <ScrollView className="flex flex-col">
        <WorkoutCard></WorkoutCard>
        <WorkoutCard></WorkoutCard>
      </ScrollView>
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
