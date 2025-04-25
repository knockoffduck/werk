import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  View,
  Text,
  ScrollView,
  SectionList,
  FlatList,
  Pressable,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fetchExercises } from "~/lib/fetchData";
import { ExerciseProps } from "~/types/exercises";

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
          className="bg-secondary text-text border-0"
          placeholderTextColor="#8D8D8E"
          placeholder="Search"
        ></Input>
      </View>
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }: { item: ExerciseProps }) => (
            <View className="flex items-center border-[#3D3D3D] border-t-[0.25px]">
              <Pressable className="rounded-none w-full h-20 flex items-start justify-center px-5 bg-transparent active:bg-primary-40">
                <Text className="text-text font-semibold">{item.name}</Text>
                <Text className="text-text-50 font-medium">
                  {item.category}
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}
