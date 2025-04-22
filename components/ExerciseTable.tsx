import React from "react";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { Check } from "~/lib/icons/Check";
import { Plus } from "~/lib/icons/Plus";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

import { Box } from "./ui/box";
import { tv } from "tailwind-variants";
import { Button } from "./ui/button";

interface Props {}

const tableCell = tv({
  base: "flex items-center justify-center rounded-md",
  variants: {
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
  },
});

const tableCellText = tv({
  base: "text-text font-bold",
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

const widths = [40, 80, 15, 15, 15];

const ExerciseTable = ({}) => {
  return (
    <Box className="w-full overflow-hidden flex gap-4">
      <View className="flex flex-row justify-between px-5">
        <Text className="text-primary font-semibold text-xl">Bench Press</Text>
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
        <View>
          <View className="flex flex-row w-full justify-between bg-accent-30 py-3 px-5">
            <View className={tableCell({ size: "set" })}>
              <Text className={tableCellText()}>1</Text>
            </View>
            <View className={tableCell({ size: "previous" })}>
              <Text className={tableCellText()}>100 kg x 7</Text>
            </View>
            <View className={tableCell({ size: "kg" })}>
              <Text className={tableCellText()}>100</Text>
            </View>
            <View className={tableCell({ size: "reps" })}>
              <Text className={tableCellText()}>10</Text>
            </View>
            <Pressable className={tableCell({ size: "check" })}>
              <View className="bg-accent px-[0.30rem] py-[0.10rem] rounded-md">
                <Check
                  strokeWidth={3}
                  size={20}
                  className={tableCellText()}
                ></Check>
              </View>
            </Pressable>
          </View>
        </View>
        <View>
          <View className="flex flex-row w-full justify-between py-3 px-5">
            <View className={tableCell({ size: "set" })}>
              <Text className={tableCellText()}>1</Text>
            </View>
            <View className={tableCell({ size: "previous" })}>
              <Text className={tableCellText()}>100 kg x 7</Text>
            </View>
            <View className={tableCell({ size: "kg" })}>
              <Text className={tableCellText()}>100</Text>
            </View>
            <View className={tableCell({ size: "reps" })}>
              <Text className={tableCellText()}>10</Text>
            </View>
            <View className={tableCell({ size: "check" })}>
              <Check
                strokeWidth={3}
                size={20}
                className={tableCellText()}
              ></Check>
            </View>
          </View>
        </View>
        <View>
          <View className="flex flex-row w-full justify-between py-3 px-5">
            <View className={tableCell({ size: "set" })}>
              <Text className={tableCellText()}>1</Text>
            </View>
            <View className={tableCell({ size: "previous" })}>
              <Text className={tableCellText()}>No Previous</Text>
            </View>
            <View
              className={tableCell({ size: "kg", background: "secondary" })}
            >
              <Text className={tableCellText({ opacity: 50 })}>0</Text>
            </View>
            <View
              className={tableCell({ size: "reps", background: "secondary" })}
            >
              <Text className={tableCellText()}>8</Text>
            </View>
            <View className={tableCell({ size: "check" })}>
              <Check
                strokeWidth={3}
                size={20}
                className={tableCellText()}
              ></Check>
            </View>
          </View>
        </View>
      </View>
      <Button className="mx-5 bg-secondary">
        <Plus className="text-text"></Plus>
      </Button>
    </Box>
  );
};

export default ExerciseTable;
