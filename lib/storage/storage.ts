import { storage } from "./mmkv";
import { v4 as uuidv4 } from "uuid";

export const StorageKeys = {
  WORKOUTS: "workouts", // Key for storing the array of workouts
  // Add more keys as needed
};

// Interface for a workout object (matches your Drizzle schema loosely)
export interface Workout {
  id: string; // Use string for UUID
  templateId: number | null;
  name: string | null;
  startTime: string; // Store as ISO string
  endTime: string | null;
  durationSeconds: number | null;
  totalVolumeKg: number | null;
  prsAchieved: number;
  isSynced: boolean; // Flag to track sync status
  isDeleted: boolean; // Flag for soft deletion
  // Add other fields as needed
}

// Helper function to get all workouts from MMKV
export const getWorkouts = (): Workout[] => {
  const workoutsString = storage.getString(StorageKeys.WORKOUTS);
  if (workoutsString) {
    try {
      return JSON.parse(workoutsString) as Workout[];
    } catch (e) {
      console.error("Error parsing workouts from MMKV:", e);
      return []; // Return empty array on error
    }
  }
  return []; // Return empty array if no workouts are stored
};

// Helper function to set all workouts in MMKV
export const setWorkouts = (workouts: Workout[]): void => {
  try {
    storage.set(StorageKeys.WORKOUTS, JSON.stringify(workouts));
  } catch (e) {
    console.error("Error setting workouts in MMKV:", e);
  }
};

// Function to create a new workout locally
export const createLocalWorkout = (initialData: Partial<Workout>): Workout => {
  const newWorkout: Workout = {
    id: uuidv4(), // Generate UUID on client
    templateId: initialData.templateId || null,
    name: initialData.name || null,
    startTime: initialData.startTime || new Date().toISOString(),
    endTime: initialData.endTime || null,
    durationSeconds: initialData.durationSeconds || null,
    totalVolumeKg: initialData.totalVolumeKg || null,
    prsAchieved: initialData.prsAchieved || 0,
    isSynced: false, // Initially not synced
    isDeleted: false, // Not deleted initially
    ...initialData, // Allow overriding initial data
  };

  const workouts = getWorkouts();
  const updatedWorkouts = [...workouts, newWorkout];
  setWorkouts(updatedWorkouts);

  return newWorkout;
};

// Function to update a workout locally
export const updateLocalWorkout = (
  workoutId: string,
  updatedData: Partial<Workout>,
): void => {
  const workouts = getWorkouts();
  const workoutIndex = workouts.findIndex((w) => w.id === workoutId);

  if (workoutIndex > -1) {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex] = {
      ...updatedWorkouts[workoutIndex],
      ...updatedData,
      isSynced: false, // Mark as unsynced when updated
    };
    setWorkouts(updatedWorkouts);
  } else {
    console.warn(`Workout with ID ${workoutId} not found in local storage.`);
  }
};

// Function to mark a workout for deletion locally
export const deleteLocalWorkout = (workoutId: string): void => {
  const workouts = getWorkouts();
  const workoutIndex = workouts.findIndex((w) => w.id === workoutId);

  if (workoutIndex > -1) {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex] = {
      ...updatedWorkouts[workoutIndex],
      isDeleted: true, // Mark as deleted
      isSynced: false, // Mark as unsynced for deletion sync
    };
    setWorkouts(updatedWorkouts);
  } else {
    console.warn(
      `Workout with ID ${workoutId} not found in local storage for deletion.`,
    );
  }
};

// Function to get all unsynced workouts
export const getUnsyncedWorkouts = (): Workout[] => {
  const workouts = getWorkouts();
  return workouts.filter((w) => !w.isSynced || w.isDeleted);
};

// Function to mark workouts as synced after a successful server sync
export const markWorkoutsAsSynced = (syncedWorkoutIds: string[]): void => {
  const workouts = getWorkouts();
  const updatedWorkouts = workouts.map((w) => {
    if (syncedWorkoutIds.includes(w.id)) {
      return { ...w, isSynced: true, isDeleted: false }; // Reset isDeleted after successful sync
    }
    return w;
  });
  // Filter out successfully deleted workouts
  const filteredWorkouts = updatedWorkouts.filter(
    (w) => !(w.isDeleted && w.isSynced),
  );

  setWorkouts(filteredWorkouts);
};

// Function to remove successfully deleted workouts from MMKV
export const removeDeletedWorkouts = (deletedWorkoutIds: string[]): void => {
  const workouts = getWorkouts();
  const filteredWorkouts = workouts.filter(
    (w) => !deletedWorkoutIds.includes(w.id),
  );
  setWorkouts(filteredWorkouts);
};
