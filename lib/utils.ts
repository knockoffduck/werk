import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { ExerciseProps } from "~/types/exercises";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the interface for the store's state
interface SelectedExerciseStore {
  selectedExercises: ExerciseProps[];
  setSelectedExercises: (exercises: ExerciseProps[]) => void;
  removeSelectedExercise: (exerciseId: string) => void;
  clearSelectedExercises: () => void; // Added for convenience
}

// Create the Zustand store
export const useSelectedExerciseStore = create<SelectedExerciseStore>(
  (set) => ({
    selectedExercises: [], // Initial state: an empty array of selected exercises

    // Action to set the entire list of selected exercises
    setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),

    // Action to remove a selected exercise by ID
    removeSelectedExercise: (exerciseIdToRemove) =>
      set((state) => ({
        selectedExercises: state.selectedExercises.filter(
          (exercise) => exercise.id !== exerciseIdToRemove,
        ),
      })),

    // Action to clear all selected exercises
    clearSelectedExercises: () => set({ selectedExercises: [] }),
  }),
);
