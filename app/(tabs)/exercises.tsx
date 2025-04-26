import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  View,
  Text,
  ScrollView,
  SectionList,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fetchExercises } from "~/lib/fetchData";
import { storage } from "~/lib/storage/mmkv";
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

  const handleSync = () => {
    storage.set("exercises", JSON.stringify(data));
    console.log(
      "Exercises synced successfully",
      storage.getString("exercises"),
    );
  };

  return (
    <View className="relative h-full">
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-5 w-full flex items-center"
      >
        <Pressable
          className="bg-primary px-24 py-4 active:opacity-90 rounded-lg"
          onPress={() => handleSync()}
        >
          <Text className="text-textWhite font-semibold text-lg leading-5">
            Sync Exercises
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
