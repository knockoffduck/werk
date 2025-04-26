import React, { useEffect, useState, useCallback } from "react";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { Check } from "~/lib/icons/Check";
import { Plus } from "~/lib/icons/Plus";
import { v4 as uuidv4 } from "uuid";
import {
  Pressable,
  Text,
  TextInput, // Keep TextInput for type hinting if needed, but use your Input component
  useWindowDimensions,
  View,
  FlatList,
} from "react-native";

import { Box } from "./ui/box";
import { tv } from "tailwind-variants";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Your custom Input component
import { Set } from "~/types/exercises";
import clsx from "clsx";
import { storage } from "~/lib/storage/mmkv";
import { debounce } from "lodash"; // Import debounce
import { ActiveWorkout } from "~/types/workouts";

interface Props {}

const tableCell = tv({
  base: "flex items-center justify-center rounded-md text-text text-lg font-bold text-center",
  variants: {
    opacity: {
      100: "opacity-100",
      75: "opacity-75",
      50: "opacity-50",
      25: "opacity-25",
    },
    size: {
      set: "w-10",
      previous: "w-28",
      kg: "w-16",
      reps: "w-16",
      check: "w-12",
    },
    background: {
      none: "bg-transparent",
      secondary: "bg-secondary",
    },
  },
  defaultVariants: {
    background: "none",
    opacity: 100,
  },
});

const tableCellText = tv({
  base: "text-text font-bold w-full flex items-start justify-center text-center p-0 pt-0 bg-transparent border-0",
  variants: {
    size: {
      small: "text-sm",
      medium: "text-md",
      large: "text-lg",
    },
    opacity: {
      100: "opacity-100",
      75: "opacity-75",
      50: "opacity-50",
      25: "opacity-25",
    },
  },
  defaultVariants: {
    size: "large",
    opacity: 100,
  },
});

const widths = [40, 80, 15, 15, 15]; // Consider if these are still needed with your current layout

type ExerciseTableProps = {
  id: string;
  name: string;
  sets: Set[];
};

// Debounce the storage save function
const saveExerciseSetsToStorage = debounce(
  (exerciseId: string, data: Set[]) => {
    console.log("Saving to storage");
    storage.set("exerciseSets", JSON.stringify(data));
    const currentWorkout: ActiveWorkout = JSON.parse(
      storage.getString("currentWorkout")!,
    );

    console.log(currentWorkout);
    const exercise = currentWorkout.exercises.find(
      (exercise) => exercise.id === exerciseId,
    );

    if (exercise) {
      exercise.sets = data;
      storage.set("currentWorkout", JSON.stringify(currentWorkout));
    }
  },
  500,
); // Adjust debounce delay as needed (e.g., 500ms)

const ExerciseTable = ({ id, name, sets }: ExerciseTableProps) => {
  const [exerciseSets, setExerciseSets] = useState(sets);

  // Use a useEffect to trigger storage save when exerciseSets changes,
  // but rely on the debounced function.
  useEffect(() => {
    saveExerciseSetsToStorage(id, exerciseSets);
    // Clean up the debounce on unmount
    return () => {
      saveExerciseSetsToStorage.cancel();
    };
  }, [exerciseSets]);

  const handleAddSet = () => {
    console.log("Add set");

    setExerciseSets([
      ...exerciseSets,
      {
        id: uuidv4(),
        setNumber: exerciseSets.length + 1,
        weightKg: 0,
        reps: 0,
        restTime: 0, // Assuming default rest time
        completed: false,
      },
    ]);
  };

  // Use useCallback to memoize modifySet if it's passed to child components
  const modifySet = useCallback(
    (setId: string, key: keyof Set, value: any) => {
      console.log("Modify set", setId, key, value);

      setExerciseSets(
        exerciseSets.map((exerciseSet) =>
          exerciseSet.id === setId
            ? { ...exerciseSet, [key]: value }
            : exerciseSet,
        ),
      );
      // The storage saving is now handled by the useEffect and debounced function
    },
    [exerciseSets], // Depend on exerciseSets so the latest state is captured
  );

  const toggleSetCompletion = useCallback(
    (setId: string) => {
      // Find the current completed status safely
      const currentSet = exerciseSets.find((set) => set.id === setId);
      if (currentSet) {
        modifySet(setId, "completed", !currentSet.completed);
      }
    },
    [exerciseSets, modifySet], // Depend on exerciseSets and modifySet
  );

  return (
    <Box className="w-full overflow-hidden flex gap-4 mb-10">
      <View className="flex flex-row justify-between px-5">
        <Text className="text-primary font-semibold text-xl">{name}</Text>
        <Pressable className="flex items-center justify-center h-8 w-12 bg-primary-50 rounded-md">
          <Ellipsis className="text-textWhite"></Ellipsis>
        </Pressable>
      </View>

      <View className="w-full flex flex-col">
        <View className="flex flex-row w-full justify-between px-5 mb-3">
          <View className={tableCell({ size: "set" })}>
            <Text className={tableCellText()}>Set</Text>
          </View>
          <View className={tableCell({ size: "previous" })}>
            <Text className={tableCellText()}>Previous</Text>
          </View>
          <View className={tableCell({ size: "kg" })}>
            <Text className={tableCellText()}>kg</Text>
          </View>
          <View className={tableCell({ size: "reps" })}>
            <Text className={tableCellText()}>Reps</Text>
          </View>
          <View className={tableCell({ size: "check" })}>
            <Check
              size={20}
              strokeWidth={3}
              className={tableCellText({ size: "small" })}
            ></Check>
          </View>
        </View>
        <FlatList
          data={exerciseSets}
          keyExtractor={(item) => item.id} // Add a key extractor for FlatList
          renderItem={({ item }) => (
            <View
              className={clsx(
                `flex`,
                `flex-row`,
                `w-full`,
                `justify-between`,
                item.completed ? `bg-accent-30` : `bg-transparent`,
                `py-3`,
                `px-5`,
              )}
            >
              <View className={tableCell({ size: "set" })}>
                <Text className={tableCellText()}>{item.setNumber}</Text>
              </View>
              <View className={tableCell({ size: "previous" })}>
                <Text className={tableCellText({ opacity: 50 })}>
                  No Previous
                </Text>
              </View>
              <View className={tableCell({ size: "kg" })}>
                <Input
                  className={tableCellText()}
                  value={String(item.weightKg)} // Bind value to state
                  onChangeText={(text) =>
                    // Convert text to number, handle potential non-numeric input
                    modifySet(item.id, "weightKg", Number(text) || 0)
                  }
                  keyboardType="numeric" // Ensure numeric keyboard
                  selectTextOnFocus={true}
                ></Input>
              </View>
              <View className={tableCell({ size: "reps" })}>
                <Input
                  className={tableCellText()}
                  value={String(item.reps)} // Bind value to state
                  onChangeText={(text) =>
                    // Convert text to number, handle potential non-numeric input
                    modifySet(item.id, "reps", Number(text) || 0)
                  }
                  keyboardType="numeric" // Ensure numeric keyboard
                  selectTextOnFocus={true}
                ></Input>
              </View>
              <Pressable
                onPress={() => toggleSetCompletion(item.id)}
                className={tableCell({ size: "check" })}
              >
                <View
                  className={clsx(
                    item.completed ? "bg-accent" : "bg-transparent",
                    `px-[0.30rem]`,
                    `py-[0.10rem]`,
                    `rounded-md`,
                  )}
                >
                  <Check
                    strokeWidth={3}
                    size={20}
                    className={tableCellText()}
                  ></Check>
                </View>
              </Pressable>
            </View>
          )}
        ></FlatList>
      </View>
      <Button onPress={() => handleAddSet()} className="mx-5 bg-secondary">
        <Plus className="text-text"></Plus>
      </Button>
    </Box>
  );
};

export default ExerciseTable;
