import { useQuery, useQueryClient } from "@tanstack/react-query";
import { View, Text, ScrollView, SectionList, FlatList } from "react-native";
import { ExerciseCard } from "~/components/ExerciseCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fetchExercises } from "~/lib/fetchData";
import { ExerciseProps } from "~/types/exercises";

const renderItem = ({ item }: { item: ExerciseProps }) => (
  <ExerciseCard
    exerciseId={item.exerciseId}
    name={item.name}
    category={item.category}
  />
);
export default function Tab() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  console.log(data);
  return (
    <View>
      <View className="p-5 border-b-[0.25px] border-[#3D3D3D]">
        <Input
          className="bg-secondary text-text"
          placeholderTextColor="#8D8D8E"
          placeholder="Search"
        ></Input>
      </View>
      {data && <FlatList data={data} renderItem={renderItem} />}
    </View>
  );
}
