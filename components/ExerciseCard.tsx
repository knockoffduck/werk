import { Text, View } from "react-native";
import { ExerciseProps } from "~/types/exercises";
import { Button } from "./ui/button";

export const ExerciseCard = ({ exerciseId, name, category }: ExerciseProps) => {
  return (
    <View className="flex items-center">
      <Button
        variant="outline"
        className="rounded-none w-full h-24 flex items-start bg-transparent border-none"
      >
        <Text className="text-text font-semibold">{name}</Text>
        <Text className="text-text-50 font-medium">{category}</Text>
      </Button>
      <View className="bg-[#3D3D3D] w-full h-[0.25px] mx-5"></View>
    </View>
  );
};
